//Por Diego Chourio

const LANGUAGE_KEY = 'settings:language';
const TIME_FORMAT_KEY = 'settings:timeFormat';

export type Language = 'en' | 'es';
export type TimeFormat = '12h' | '24h';

export class SettingsService {
  static getLanguage(): Language {
    return (localStorage.getItem(LANGUAGE_KEY) as Language) ?? 'en';
  }

  static setLanguage(language: Language): void {
    localStorage.setItem(LANGUAGE_KEY, language);
  }

  static getTimeFormat(): TimeFormat {
    return (localStorage.getItem(TIME_FORMAT_KEY) as TimeFormat) ?? '24h';
  }

  static setTimeFormat(format: TimeFormat): void {
    localStorage.setItem(TIME_FORMAT_KEY, format);
  }

  static clearHistory(): void {
    localStorage.removeItem('piniaState');
  }
}