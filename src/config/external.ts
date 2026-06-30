export const EXTERNAL_URLS = {
  government: {
    indiaGov: 'https://www.india.gov.in/',
    digitalIndia: 'https://digitalindia.gov.in/',
    yas: 'https://yas.gov.in/',
  },
  support: {
    phones: ['14472', '18002122729'] as const,
    tel: '18002122729',
    label: 'support.mybharat.gov.in',
  },
  social: {
    twitter: 'https://x.com/MYBharatHQ',
    instagram: 'https://www.instagram.com/mybharatgov/',
    facebook: 'https://www.facebook.com/mybharathq/',
    linkedin: 'https://www.linkedin.com/company/mybharatgov/',
    whatsapp: 'https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h',
    youtube: 'https://www.youtube.com/@MyBharatHQ',
  },
  thirdParty: {
    bhashiniScript:
      'https://translation-plugin.bhashini.co.in/v3/website_translation_utility.js',
    bhashiniLanguages: 'en,as,bn,brx,gom,gu,hi,ml,or,pa,te,ur',
    recaptchaApi: 'https://www.google.com/recaptcha/api.js',
    ipLookup: [
      'https://api.ipify.org?format=json',
      'https://api64.ipify.org?format=json',
    ] as const,
    cloudflareTrace: 'https://www.cloudflare.com/cdn-cgi/trace',
  },
} as const;
