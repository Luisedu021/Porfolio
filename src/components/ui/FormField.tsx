import { cn } from '../../lib/cn'

type FormFieldProps = {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  multiline?: boolean
  autoComplete?: string
}

/**
 * Figma: Form Field. O estado "Active" do design é o foco: borda azul de 2px
 * e rótulo azul. O rótulo visível é o placeholder; o <label> fica para leitores de tela.
 */
export function FormField({ label, name, type = 'text', required, multiline, autoComplete }: FormFieldProps) {
  const id = `field-${name}`
  const placeholder = required ? `${label}*` : label
  const fieldClass = cn(
    'w-full resize-none border-b border-line bg-transparent pb-3 type-body-md text-ink outline-none transition-colors',
    'placeholder:text-body focus:border-b-2 focus:border-brand focus:pb-[11px] focus:placeholder:text-brand',
  )

  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={1}
          required={required}
          placeholder={placeholder}
          className={cn(fieldClass, 'field-sizing-content')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={fieldClass}
        />
      )}
    </div>
  )
}
