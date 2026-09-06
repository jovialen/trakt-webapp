import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

const I18N_LOCAL_STORAGE_KEY = 'i18n-current-locale'

export const SUPPORTED_LOCALES = ['nb', 'nn', 'en']
export const DEFAULT_LOCALE = 'nb'
export const FALLBACK_LOCALE = 'en'

export const getLocale = () => {
  return localStorage.getItem(I18N_LOCAL_STORAGE_KEY) || DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'en',
})

const hasLocale = i18n.global.availableLocales.includes

const loadLocale = async (locale: string) => {
  const messages = await import(`./locale-${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}

export const setLocale = async (locale: string) => {
  if (!hasLocale(locale)) {
    await loadLocale(locale)
  }

  i18n.global.locale.value = locale
  document.documentElement.setAttribute('lang', locale)
  localStorage.setItem(I18N_LOCAL_STORAGE_KEY, locale)
}

await loadLocale(i18n.global.locale.value)
await loadLocale(FALLBACK_LOCALE)
