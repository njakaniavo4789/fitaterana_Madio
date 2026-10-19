import { useReveal, useCountUp } from './lib.js'

export function Wrap({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1160px] px-[22px] ${className}`}>{children}</div>
}

export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

const BTN_BASE =
  'inline-flex items-center gap-2 font-bold text-[1rem] leading-none px-[22px] py-[13px] rounded-lg border-2 border-transparent cursor-pointer no-underline transition-[filter] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed'

export function Btn({ variant = 'go', size, className = '', children, ...rest }) {
  const color =
    variant === 'go'
      ? 'bg-line border-line text-white'
      : variant === 'wa'
        ? 'bg-[#1fa855] border-[#1fa855] text-white'
        : variant === 'navy'
          ? 'bg-navy border-navy text-onnavy'
          : 'bg-transparent border-current text-current'
  const sizing = size === 'small' ? 'px-[14px] py-2 text-[.92rem]' : ''
  return (
    <button type="button" className={`${BTN_BASE} ${color} ${sizing} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function LinkBtn({ variant = 'go', size, className = '', children, ...rest }) {
  const color =
    variant === 'go'
      ? 'bg-line border-line text-white'
      : variant === 'wa'
        ? 'bg-[#1fa855] border-[#1fa855] text-white'
        : 'bg-transparent border-current text-current'
  const sizing = size === 'small' ? 'px-[14px] py-2 text-[.92rem]' : ''
  return (
    <a className={`${BTN_BASE} ${color} ${sizing} ${className}`} {...rest}>
      {children}
    </a>
  )
}

export function Chip({ active, children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active ? 'true' : 'false'}
      className={`border px-[14px] py-[7px] rounded-full font-semibold text-[.9rem] cursor-pointer ${
        active ? 'bg-ink text-paper border-ink' : 'bg-surface text-ink border-rule'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Counter({ value, live = false, label, className = '' }) {
  const [ref, text] = useCountUp(value)
  return (
    <div className={`px-[18px] py-[22px] ${className}`}>
      <b
        ref={ref}
        className={`block font-display font-extrabold text-[2.2rem] leading-[1.05] tabular-nums ${
          live ? 'text-line' : 'text-ink'
        }`}
        style={{ fontVariationSettings: '"wdth" 112' }}
      >
        {text}
      </b>
      <span className={`text-muted text-[.95rem] ${live ? 'live-dot' : ''}`}>{label}</span>
    </div>
  )
}

export function SectionHead({ title, children }) {
  return (
    <Reveal className="grid md:grid-cols-[1fr_1.4fr] gap-10 mb-9">
      <h2>{title}</h2>
      <div className="measure">{children}</div>
    </Reveal>
  )
}

export function Card({ className = '', children }) {
  return <div className={`bg-surface border border-rule rounded-[10px] ${className}`}>{children}</div>
}
