export default function Fabs({ onOpen }) {
  return (
    <div
      className="fixed right-[18px] z-40 flex flex-col gap-2.5 items-end no-print"
      style={{ bottom: 'calc(78px + env(safe-area-inset-bottom, 0px))' }}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpen('ai')}
        className="flex items-center gap-2 border-0 rounded-[28px] py-[11px] pl-[13px] pr-4 font-bold text-[.95rem] cursor-pointer shadow-[0_6px_18px_rgba(16,35,59,.22)] transition-transform hover:-translate-y-0.5 bg-navy text-onnavy border-2 border-[#4fb488] xs:px-3"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
          <path
            d="M4 5h16v11H9l-5 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="10.5" r="1.3" fill="currentColor" />
          <circle cx="12" cy="10.5" r="1.3" fill="currentColor" />
          <circle cx="15" cy="10.5" r="1.3" fill="currentColor" />
        </svg>
        <span className="max-xs:hidden">Discuter</span>
      </button>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpen('wa')}
        className="flex items-center gap-2 border-0 rounded-[28px] py-[11px] pl-[13px] pr-4 font-bold text-[.95rem] cursor-pointer shadow-[0_6px_18px_rgba(16,35,59,.22)] transition-transform hover:-translate-y-0.5 bg-[#1fa855] text-white xs:px-3"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
          <path
            d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 8.2c.2-.4.5-.4.8-.4h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.3.2.1.4.1.6-.1l.6-.7c.2-.2.4-.3.7-.2l1.6.7c.4.2.4.4.4.6 0 .9-.6 1.8-1.6 1.9-1 .2-2.4-.2-4-1.4-1.7-1.3-2.9-3-3.2-4.2-.3-1 .1-1.9.5-2.5z"
            fill="currentColor"
          />
        </svg>
        <span className="max-xs:hidden">WhatsApp</span>
      </button>
    </div>
  )
}
