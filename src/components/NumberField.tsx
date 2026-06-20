import { useEffect, useState } from 'react'

interface NumberFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit?: string
  min?: number
  max?: number
  step?: number
  hint?: string
  id: string
}

/**
 * A labelled numeric input that keeps a local text buffer so the field can be
 * cleared and retyped without snapping back to a number on every keystroke.
 */
export function NumberField({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step,
  hint,
  id,
}: NumberFieldProps) {
  const [text, setText] = useState(String(value))

  // Keep the buffer in sync when the value changes from outside (e.g. picking a
  // vehicle), but not while the user is mid-edit on the same numeric value.
  useEffect(() => {
    if (Number(text) !== value) {
      setText(String(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <span className="field-input">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={text}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const next = e.target.value
            setText(next)
            if (next.trim() !== '' && !Number.isNaN(Number(next))) {
              onChange(Number(next))
            }
          }}
          onBlur={() => {
            if (text.trim() === '' || Number.isNaN(Number(text))) {
              setText(String(value))
            }
          }}
        />
        {unit && <span className="field-unit">{unit}</span>}
      </span>
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  )
}
