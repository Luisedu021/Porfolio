type ContactInfoProps = {
  icon: string
  label: string
  value: string
  href: string
}

/** Figma: Contact Info — ícone em bloco azul-claro + rótulo e valor. */
export function ContactInfo({ icon, label, value, href }: ContactInfoProps) {
  return (
    <a href={href} className="group flex items-center gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-subtle">
        <img src={icon} alt="" className="size-5 dark:invert dark:hue-rotate-180" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="type-caption text-body">{label}</span>
        <span className="type-body-md break-all text-title group-hover:underline">{value}</span>
      </span>
    </a>
  )
}
