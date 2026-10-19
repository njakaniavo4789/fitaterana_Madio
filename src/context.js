import { createContext, useContext } from 'react'

export const NavContext = createContext({ go: () => {}, view: 'home' })
export const I18nContext = createContext({ t: (k) => k, lang: 'fr', setLang: () => {} })

export function useNav() {
  return useContext(NavContext)
}

export function useT() {
  return useContext(I18nContext)
}
