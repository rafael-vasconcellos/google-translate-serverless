# About

### Resume

- Serverless function for translating text using `google-translate-api-x`.
- Built following [Vercel's documentation](https://vercel.com/docs/functions/quickstart).

### Deploy it yourself

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/rafael-vasconcellos/google-translate-serverless)

### Endpoints

- {POST} /api/translate
- {POST} /api/translate/batch

### Translate
- See below the request and response respective interfaces.

```ts
interface ITranslateOptions {
  text: string
  from?: string // default 'auto'
  to?: string // default 'en'
}

interface ITranslateResponse {
  from: string
  to: string
  text: string
  raw: IRawResult
}

interface IRawResult {
  confidence: number
  src: string
  spell: Record<String, String>
  sentences: (Record<String, String>)[]
  ld_result: { 
      extended_srclangs: string[]
      srclangs: string[]
      srclangs_confidences: number[]
  }
}

interface ISentence { 
  backend: number
  model_specification: (Record<String, String>)[]
  orig: string
  trans: string
  translation_engine_debug_info: { 
    model_tracking: { 
        checkpoint_md5: string
        launch_doc: string
    }
  }[]
}
```

- Examples:

```js
fetch('https://your-deploy.vercel.app/api/translate', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Translate me now!',
    from: 'en',
    to: 'pt',
  }),
})
  .then((data) => data.json())
  .then((response) => {
    console.log(response)
  })
  .catch((err) => {
    console.log(err)
  })
```

```sh
curl --request POST \
  --url https://translate-serverless.vercel.app/api/translate \
  --header 'content-type: application/json' \
  --data '{
	"text": "Translate me now!",
	"from": "en",
	"to": "pt"
}'
```

### Current supported languages abbreviations

```js
const languages = {
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)',
  af: 'Afrikaans',
  am: 'Amharic',
  ar: 'Arabic',
  auto: 'Automatic',
  az: 'Azerbaijani',
  be: 'Belarusian',
  bg: 'Bulgarian',
  bn: 'Bengali',
  bs: 'Bosnian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  co: 'Corsican',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  en: 'English',
  eo: 'Esperanto',
  es: 'Spanish',
  et: 'Estonian',
  eu: 'Basque',
  fa: 'Persian',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  ga: 'Irish',
  gd: 'Scots Gaelic',
  gl: 'Galician',
  gu: 'Gujarati',
  ha: 'Hausa',
  haw: 'Hawaiian',
  he: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hr: 'Croatian',
  ht: 'Haitian Creole',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  ig: 'Igbo',
  is: 'Icelandic',
  it: 'Italian',
  iw: 'Hebrew',
  ja: 'Japanese',
  jw: 'Javanese',
  ka: 'Georgian',
  kk: 'Kazakh',
  km: 'Khmer',
  kn: 'Kannada',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  la: 'Latin',
  lb: 'Luxembourgish',
  lo: 'Lao',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mg: 'Malagasy',
  mi: 'Maori',
  mk: 'Macedonian',
  ml: 'Malayalam',
  mn: 'Mongolian',
  mr: 'Marathi',
  ms: 'Malay',
  mt: 'Maltese',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  nl: 'Dutch',
  no: 'Norwegian',
  ny: 'Chichewa',
  pa: 'Punjabi',
  pl: 'Polish',
  ps: 'Pashto',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  sm: 'Samoan',
  sn: 'Shona',
  so: 'Somali',
  sq: 'Albanian',
  sr: 'Serbian',
  st: 'Sesotho',
  su: 'Sundanese',
  sv: 'Swedish',
  sw: 'Swahili',
  ta: 'Tamil',
  te: 'Telugu',
  tg: 'Tajik',
  th: 'Thai',
  tl: 'Filipino',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
}
```

