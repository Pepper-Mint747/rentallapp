import moment from 'moment';

const localeDict = {
    'en-US': 'English',
    'es': 'Español',
    'it-IT': 'Italiano',
    'fr-FR': 'Français',
    'pt-PT': 'Português',
    'cs-CZ': 'Czech',
    'ar': 'العربية',
    'he': 'ישראל'
};

const rtlLocateDict = ['he', 'ar'];

export function formatLocale(locale) {
    return localeDict[locale] || 'English';
}

export function isRTL(locale) {
    return locale && rtlLocateDict.indexOf(locale) >=0;
}

export function generateMomentLocaleSettings(locale) {
    var localeData = moment.localeData('en');
    let response = { 
        ordinal: localeData.ordinal()
    };
    return response;
}