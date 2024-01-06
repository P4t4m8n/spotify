
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    header: {
                       
                    }

                }
            },
            he: {
                translation: {
                    header: {
                     
                    }

                }
            }
        }
    })


export const i18Service = {
    getLanguages,
}

function getLanguages() {
    return {
        en: { nativeName: 'us' },
        he: { nativeName: 'il' }
    }
}