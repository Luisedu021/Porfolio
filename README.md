# Portfólio — Luís Eduardo

Portfólio pessoal em **React 19 + Vite + TypeScript + Tailwind CSS 4**, implementado a partir do Figma
(arquivo `Portfolio`, página **Portfolio v2**).

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # serve o build localmente
```

## Estrutura

```
src/
  index.css               tokens (cores claro/escuro, fontes, raios) e estilos de texto do Figma
  i18n/pt.ts, i18n/en.ts  TODOS os textos do site, em português e inglês
  data/content.ts         dados fixos: links, imagens, email, telefone, redes sociais
  components/ui/          componentes do design (Button, Tag, ServiceRow, TimelineRow, ProjectCard...)
  components/sections/    seções da página (Header, Hero, Services, About, Experience, Projects, Contact, Footer)
  hooks/                  seção ativa no menu e tema claro/escuro
  assets/                 imagens e ícones exportados do Figma
```

## Editando

- **Textos:** `src/i18n/pt.ts` e `src/i18n/en.ts`. Os dois arquivos têm a mesma estrutura; o TypeScript
  avisa se faltar algum texto em um deles.
- **Links, projetos e contatos:** `src/data/content.ts` (procure os `TODO` para colocar os links reais).
- **Cores e tipografia:** `src/index.css`. Os nomes batem com as variáveis "Tokens" e os estilos de texto do Figma,
  então uma mudança no Figma vira uma mudança de uma linha aqui. As cores do modo escuro ficam no bloco `.dark`.
- **Idioma e tema:** começam pelo idioma do navegador e pelo tema do sistema; a escolha do visitante fica salva
  no navegador (`localStorage`).
- **Formulário de contato:** sem backend por enquanto; ao enviar, abre o app de email do visitante com a mensagem
  preenchida (`src/components/sections/Contact.tsx`).
