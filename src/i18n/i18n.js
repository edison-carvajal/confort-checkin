import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar archivos de traducción
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

// Configuración de i18next
i18n
  // Uso del detector de idioma del navegador
  .use(LanguageDetector)
  // Integración con React
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      }
    },
    fallbackLng: 'es', // Idioma por defecto si no se detecta uno
    debug: false, // Deshabilitar en producción

    interpolation: {
      escapeValue: false, // No es necesario para React
    },

    // Opciones de detección
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
