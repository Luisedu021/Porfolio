import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

type Three = typeof import('three')

const SPACING = 32 // distância entre os pontos da grade (px)
const RADIUS = 170 // raio de influência do cursor (px)
const ANCHOR_GAP = 2.5 // nova âncora a cada ~2,5 células percorridas
const MAX_ANCHORS = 7
const ANCHOR_LIFE = 1.8 // segundos até a âncora sumir
const SAMPLES_PER_SEGMENT = 14
const PATH_WIDTH = 1.5
const HANDLE_LENGTH = 26

/**
 * Fundo do hero: grade de pontos como o canvas do Figma (Three.js).
 * Perto do cursor os pontos acendem e viram âncoras; ao mover o mouse, um caminho
 * vetorial se desenha preso à grade, com as alças da última âncora (como a Pen do Figma).
 * O Three.js só é baixado depois que a página abre.
 */
export function AnchorGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    let cancelled = false
    let stop: (() => void) | undefined
    import('three').then((THREE) => {
      if (!cancelled) stop = startAnchorGrid(THREE, canvas, host)
    })
    return () => {
      cancelled = true
      stop?.()
    }
  }, [])

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 size-full', className)} />
  )
}

const gridVertex = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uPixelRatio;
  uniform float uIntro;
  uniform vec2 uOrigin;
  uniform float uMaxDist;
  varying float vInfluence;
  varying float vReveal;
  void main() {
    vec2 p = position.xy;
    float d = distance(p, uMouse);
    float f = (1.0 - smoothstep(0.0, uRadius, d)) * uStrength;
    vec2 dir = d > 0.001 ? (uMouse - p) / d : vec2(0.0);
    p += dir * f * 5.0;
    float r = distance(position.xy, uOrigin) / uMaxDist;
    vReveal = smoothstep(r, r + 0.12, uIntro);
    vInfluence = f;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
    gl_PointSize = mix(2.2, 9.0, f * f) * uPixelRatio;
  }
`

const gridFragment = /* glsl */ `
  uniform vec3 uDot;
  uniform vec3 uActive;
  uniform vec3 uFill;
  uniform float uDotAlpha;
  varying float vInfluence;
  varying float vReveal;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float f = vInfluence;
    float disc = 1.0 - smoothstep(0.6, 1.0, length(uv));
    vec3 dotColor = mix(uDot, uActive, smoothstep(0.05, 0.5, f));
    float dotAlpha = disc * mix(uDotAlpha, 0.85, smoothstep(0.0, 0.55, f));
    float square = max(abs(uv.x), abs(uv.y));
    vec3 anchorColor = mix(uFill, uActive, step(0.55, square));
    float anchor = smoothstep(0.55, 0.7, f);
    vec3 color = mix(dotColor, anchorColor, anchor);
    float alpha = mix(dotAlpha, 1.0, anchor) * vReveal;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

const ribbonVertex = /* glsl */ `
  attribute float aAlpha;
  attribute float aDist;
  attribute float aDashed;
  varying float vAlpha;
  varying float vDist;
  varying float vDashed;
  void main() {
    vAlpha = aAlpha;
    vDist = aDist;
    vDashed = aDashed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const ribbonFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vDist;
  varying float vDashed;
  void main() {
    float a = vAlpha;
    if (vDashed > 0.5 && mod(vDist, 9.0) > 5.0) a = 0.0;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`

const markerVertex = /* glsl */ `
  attribute float aAlpha;
  attribute float aSize;
  attribute float aShape;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vShape;
  void main() {
    vAlpha = aAlpha;
    vShape = aShape;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`

const markerFragment = /* glsl */ `
  uniform vec3 uActive;
  uniform vec3 uFill;
  varying float vAlpha;
  varying float vShape;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d = vShape > 0.5 ? length(uv) : max(abs(uv.x), abs(uv.y));
    if (d > 1.0 || vAlpha < 0.01) discard;
    gl_FragColor = vec4(mix(uFill, uActive, step(0.55, d)), vAlpha);
  }
`

type Sample = { x: number; y: number; alpha: number; dashed: boolean }

/** Faixa (dois triângulos por trecho) que desenha uma linha com espessura e transparência por ponto. */
function createRibbon(THREE: Three, maxPoints: number, color: InstanceType<Three['Color']>) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(maxPoints * 6)
  const alphas = new Float32Array(maxPoints * 2)
  const dists = new Float32Array(maxPoints * 2)
  const dashes = new Float32Array(maxPoints * 2)
  const index: number[] = []
  for (let i = 0; i < maxPoints - 1; i++) {
    const a = i * 2
    index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
  }
  geometry.setIndex(index)
  const attr = (array: Float32Array, size: number) =>
    new THREE.BufferAttribute(array, size).setUsage(THREE.DynamicDrawUsage)
  geometry.setAttribute('position', attr(positions, 3))
  geometry.setAttribute('aAlpha', attr(alphas, 1))
  geometry.setAttribute('aDist', attr(dists, 1))
  geometry.setAttribute('aDashed', attr(dashes, 1))
  geometry.setDrawRange(0, 0)
  const material = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: color } },
    vertexShader: ribbonVertex,
    fragmentShader: ribbonFragment,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.frustumCulled = false

  function update(points: Sample[], width: number) {
    const n = Math.min(points.length, maxPoints)
    let dist = 0
    for (let i = 0; i < n; i++) {
      const p = points[i]
      const prev = points[Math.max(i - 1, 0)]
      const next = points[Math.min(i + 1, n - 1)]
      let tx = next.x - prev.x
      let ty = next.y - prev.y
      const len = Math.hypot(tx, ty) || 1
      tx /= len
      ty /= len
      const nx = (-ty * width) / 2
      const ny = (tx * width) / 2
      if (i > 0) dist += Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)
      positions.set([p.x + nx, p.y + ny, 0, p.x - nx, p.y - ny, 0], i * 6)
      alphas[i * 2] = alphas[i * 2 + 1] = p.alpha
      dists[i * 2] = dists[i * 2 + 1] = dist
      dashes[i * 2] = dashes[i * 2 + 1] = p.dashed ? 1 : 0
    }
    geometry.setDrawRange(0, Math.max(0, n - 1) * 6)
    for (const name of ['position', 'aAlpha', 'aDist', 'aDashed']) geometry.getAttribute(name).needsUpdate = true
  }

  return { mesh, update, dispose: () => (geometry.dispose(), material.dispose()) }
}

function startAnchorGrid(THREE: Three, canvas: HTMLCanvasElement, host: HTMLElement) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  const touchOnly = matchMedia('(hover: none)').matches
  // Cores vêm das variáveis CSS já em sRGB: sem conversão de espaço de cor.
  THREE.ColorManagement.enabled = false

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.setClearColor(0x000000, 0)
  const scene = new THREE.Scene()
  // Câmera em pixels, com y para baixo (igual ao CSS)
  const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -10, 10)

  const colors = { dot: new THREE.Color(), active: new THREE.Color(), fill: new THREE.Color() }

  // Grade
  const gridGeometry = new THREE.BufferGeometry()
  const gridUniforms = {
    uMouse: { value: new THREE.Vector2(-9999, -9999) },
    uRadius: { value: RADIUS },
    uStrength: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uIntro: { value: reduceMotion ? 2 : 0 },
    uOrigin: { value: new THREE.Vector2() },
    uMaxDist: { value: 1 },
    uDot: { value: colors.dot },
    uActive: { value: colors.active },
    uFill: { value: colors.fill },
    uDotAlpha: { value: 0.2 },
  }
  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: gridUniforms,
    vertexShader: gridVertex,
    fragmentShader: gridFragment,
    transparent: true,
    depthTest: false,
  })
  const grid = new THREE.Points(gridGeometry, gridMaterial)
  grid.frustumCulled = false
  scene.add(grid)

  // Caminho (Pen) + alças
  const maxSamples = MAX_ANCHORS * SAMPLES_PER_SEGMENT + 1
  const path = createRibbon(THREE, maxSamples, colors.active)
  const handles = createRibbon(THREE, 3, colors.active)
  scene.add(path.mesh, handles.mesh)

  // Quadradinhos das âncoras e bolinhas das alças
  const maxMarkers = MAX_ANCHORS + 2
  const markerGeometry = new THREE.BufferGeometry()
  const markerPos = new Float32Array(maxMarkers * 3)
  const markerAlpha = new Float32Array(maxMarkers)
  const markerSize = new Float32Array(maxMarkers)
  const markerShape = new Float32Array(maxMarkers)
  const dyn = (array: Float32Array, size: number) =>
    new THREE.BufferAttribute(array, size).setUsage(THREE.DynamicDrawUsage)
  markerGeometry.setAttribute('position', dyn(markerPos, 3))
  markerGeometry.setAttribute('aAlpha', dyn(markerAlpha, 1))
  markerGeometry.setAttribute('aSize', dyn(markerSize, 1))
  markerGeometry.setAttribute('aShape', dyn(markerShape, 1))
  const markerMaterial = new THREE.ShaderMaterial({
    uniforms: { uActive: { value: colors.active }, uFill: { value: colors.fill }, uPixelRatio: { value: pixelRatio } },
    vertexShader: markerVertex,
    fragmentShader: markerFragment,
    transparent: true,
    depthTest: false,
  })
  const markers = new THREE.Points(markerGeometry, markerMaterial)
  markers.frustumCulled = false
  scene.add(markers)

  let width = 1
  let height = 1
  let offsetX = 0
  let offsetY = 0

  function readColors() {
    const style = getComputedStyle(document.documentElement)
    const css = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback
    colors.dot.set(css('--color-title', '#07204b'))
    colors.active.set(css('--color-brand', '#003ea6'))
    colors.fill.set(css('--color-surface', '#ffffff'))
    gridUniforms.uDotAlpha.value = document.documentElement.classList.contains('dark') ? 0.16 : 0.2
  }

  function buildGrid() {
    const cols = Math.ceil(width / SPACING) + 1
    const rows = Math.ceil(height / SPACING) + 1
    offsetX = (width - (cols - 1) * SPACING) / 2
    offsetY = (height - (rows - 1) * SPACING) / 2
    const positions = new Float32Array(cols * rows * 3)
    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i++] = offsetX + c * SPACING
        positions[i++] = offsetY + r * SPACING
        positions[i++] = 0
      }
    }
    gridGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }

  function resize() {
    const rect = host.getBoundingClientRect()
    width = Math.max(1, rect.width)
    height = Math.max(1, rect.height)
    renderer.setSize(width, height, false)
    camera.right = width
    camera.bottom = height
    camera.updateProjectionMatrix()
    gridUniforms.uOrigin.value.set(width * 0.72, height * 0.45)
    gridUniforms.uMaxDist.value = Math.hypot(width, height)
    buildGrid()
  }

  // Cursor (real ou o "fantasma" da demonstração)
  type Anchor = { x: number; y: number; born: number }
  const anchors: Anchor[] = []
  const target = { x: 0, y: 0, active: false }
  const smooth = new THREE.Vector2(-9999, -9999)
  let clock = 0
  let ghostStart: number | null = null
  let nextGhost = reduceMotion ? Infinity : 1.4

  const snap = (value: number, offset: number) => offset + Math.round((value - offset) / SPACING) * SPACING

  function moveTo(x: number, y: number) {
    target.x = x
    target.y = y
    if (!target.active) smooth.set(x, y)
    target.active = true
    if (reduceMotion) return
    const sx = snap(x, offsetX)
    const sy = snap(y, offsetY)
    const last = anchors[anchors.length - 1]
    if (!last || Math.hypot(sx - last.x, sy - last.y) >= SPACING * ANCHOR_GAP) {
      anchors.push({ x: sx, y: sy, born: clock })
      if (anchors.length > MAX_ANCHORS) anchors.shift()
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch') return
    const rect = canvas.getBoundingClientRect()
    ghostStart = null
    nextGhost = Infinity
    moveTo(event.clientX - rect.left, event.clientY - rect.top)
  }
  function onPointerLeave() {
    target.active = false
  }
  host.addEventListener('pointermove', onPointerMove)
  host.addEventListener('pointerleave', onPointerLeave)

  function runGhost() {
    if (ghostStart === null) return
    const t = (clock - ghostStart) / 2.6
    if (t > 1) {
      ghostStart = null
      target.active = false
      if (touchOnly) nextGhost = clock + 9
      return
    }
    // Desktop: faixa livre abaixo dos botões. Celular: faixa no alto, acima do título.
    const wide = width >= 1024
    const x = width * (wide ? 0.06 + 0.4 * t : 0.08 + 0.84 * t)
    const y = wide ? height * (0.88 + 0.04 * Math.sin(t * Math.PI * 2.2)) : 26 + 10 * Math.sin(t * Math.PI * 2)
    moveTo(x, y)
  }

  const anchorAlpha = (a: Anchor) => {
    const age = clock - a.born
    return Math.max(0, Math.min(1, (ANCHOR_LIFE - age) / 0.8))
  }

  function updatePath() {
    while (anchors.length && clock - anchors[0].born > ANCHOR_LIFE) anchors.shift()
    const nodes = anchors.map((a) => ({ x: a.x, y: a.y, alpha: anchorAlpha(a) }))
    const live = target.active && nodes.length > 0
    if (live) nodes.push({ x: smooth.x, y: smooth.y, alpha: 0.9 })

    let markerCount = 0
    const addMarker = (x: number, y: number, alpha: number, size: number, shape: number) => {
      markerPos.set([x, y, 0], markerCount * 3)
      markerAlpha[markerCount] = alpha
      markerSize[markerCount] = size
      markerShape[markerCount] = shape
      markerCount++
    }

    if (nodes.length >= 2) {
      const curve = new THREE.CatmullRomCurve3(
        nodes.map((n) => new THREE.Vector3(n.x, n.y, 0)),
        false,
        'centripetal',
      )
      const segments = nodes.length - 1
      const count = Math.min(segments * SAMPLES_PER_SEGMENT + 1, maxSamples)
      const samples: Sample[] = []
      for (let i = 0; i < count; i++) {
        const u = i / (count - 1)
        const p = curve.getPoint(u)
        const s = u * segments
        const i0 = Math.floor(s)
        const i1 = Math.min(i0 + 1, segments)
        const alpha = nodes[i0].alpha + (nodes[i1].alpha - nodes[i0].alpha) * (s - i0)
        samples.push({ x: p.x, y: p.y, alpha: alpha * 0.9, dashed: live && s >= segments - 1 })
      }
      path.update(samples, PATH_WIDTH)

      // Alças da última âncora fixa (tangente da curva naquele ponto)
      const last = anchors[anchors.length - 1]
      const lastIndex = anchors.length - 1
      const alpha = anchorAlpha(last)
      const tangent = curve.getTangent(lastIndex / segments)
      const hx = tangent.x * HANDLE_LENGTH
      const hy = tangent.y * HANDLE_LENGTH
      handles.update(
        [
          { x: last.x - hx, y: last.y - hy, alpha: alpha * 0.7, dashed: false },
          { x: last.x, y: last.y, alpha: alpha * 0.7, dashed: false },
          { x: last.x + hx, y: last.y + hy, alpha: alpha * 0.7, dashed: false },
        ],
        1,
      )
      addMarker(last.x - hx, last.y - hy, alpha, 7, 1)
      addMarker(last.x + hx, last.y + hy, alpha, 7, 1)
    } else {
      path.update([], PATH_WIDTH)
      handles.update([], 1)
    }

    anchors.forEach((a, i) => {
      const age = clock - a.born
      const pop = Math.min(1, age / 0.15)
      addMarker(a.x, a.y, anchorAlpha(a), (i === anchors.length - 1 ? 10 : 8) * pop, 0)
    })
    markerGeometry.setDrawRange(0, markerCount)
    for (const name of ['position', 'aAlpha', 'aSize', 'aShape']) markerGeometry.getAttribute(name).needsUpdate = true
  }

  // Só anima com o hero visível e a aba aberta
  let visible = true
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  io.observe(host)
  // Cena parada não é redesenhada; tamanho ou tema novos pedem um quadro.
  let dirty = true
  let wasIdle = false
  const ro = new ResizeObserver(() => {
    resize()
    dirty = true
  })
  ro.observe(host)
  const themeObserver = new MutationObserver(() => {
    readColors()
    dirty = true
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  readColors()
  resize()

  let raf = 0
  let last = performance.now()
  function frame(now: number) {
    raf = requestAnimationFrame(frame)
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    if (!visible || document.hidden) return
    clock += dt

    if (gridUniforms.uIntro.value < 1.3) gridUniforms.uIntro.value += dt / 1.6
    if (ghostStart === null && clock >= nextGhost) {
      ghostStart = clock
      nextGhost = Infinity
    }
    runGhost()

    const follow = 1 - Math.pow(0.0005, dt)
    smooth.x += (target.x - smooth.x) * follow
    smooth.y += (target.y - smooth.y) * follow
    gridUniforms.uMouse.value.copy(smooth)
    const strength = gridUniforms.uStrength.value
    gridUniforms.uStrength.value = strength + ((target.active ? 1 : 0) - strength) * Math.min(1, dt * 6)

    // Sem cursor, sem demonstração, sem âncoras e com a intro pronta: nada muda na tela.
    const idle =
      gridUniforms.uIntro.value >= 1.3 &&
      !target.active &&
      ghostStart === null &&
      anchors.length === 0 &&
      gridUniforms.uStrength.value < 0.002
    // Desenha ainda o primeiro quadro parado, para limpar o último rastro.
    if (idle && wasIdle && !dirty) return
    wasIdle = idle
    dirty = false

    updatePath()
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    themeObserver.disconnect()
    host.removeEventListener('pointermove', onPointerMove)
    host.removeEventListener('pointerleave', onPointerLeave)
    gridGeometry.dispose()
    gridMaterial.dispose()
    markerGeometry.dispose()
    markerMaterial.dispose()
    path.dispose()
    handles.dispose()
    renderer.dispose()
  }
}
