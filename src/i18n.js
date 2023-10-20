import {createI18n} from "vue-i18n";
import enMessage from "./locales/en.json";
import vnMessage from "./locales/vn.json";

function loadLocaleMessages() {
    return {
        en: enMessage,
        vn: vnMessage,
    };
}

const i18n = createI18n({
    // Use English by default language
    locale: navigator.language === "vn" ? navigator.language : "en",
    allowComposition: true, // you need to specify that!
    fallbackLocale: "en",
    globalInjection: true,
    messages: loadLocaleMessages()
});

export default i18n;