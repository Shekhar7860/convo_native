// import RNLanguages from 'react-native-languages';
import I18n from 'i18n-js';
import ReactNative from 'react-native';

import en from './translations/en.json';
import ar from './translations/ar.json';

 I18n.locale = 'en';
I18n.fallbacks = true;
I18n.translations = { en, ar };

const currentLocale = I18n.currentLocale();
export const isRTL = currentLocale.indexOf('ar') === 0;
ReactNative.I18nManager.allowRTL(isRTL);

export function string(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
