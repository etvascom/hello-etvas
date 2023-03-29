import { I18nService } from '@etvas/i18n'
import languages from './languages'
import en from './dictionaries/en'
import storage from '@shared/storage'

export const i18nService = new I18nService(languages, {
  defaultLanguage: 'en',
  sessionKey: 'etvas.language',
  dictionaryUrl: '/static/i18n/{lang}.json',
  storage,
})

i18nService.loadDictionary('en', en)
