// AI Configuration
export const AI_CONFIG = {
  API_KEY: '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',
  API_URL: 'https://api.perplexity.ai/chat/completions',
  MODEL: 'llama-3.1-8b-instant',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
}

// 22 Official Languages of India with native names
export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'bo', name: 'Bodo', native: 'बड़ो' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'ks', name: 'Kashmiri', native: 'کٲشُر' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' }
]

// Language-specific greetings and responses
export const LANGUAGE_GREETINGS = {
  'en': "Hello! How are you feeling today?",
  'hi': "नमस्ते! आज आप कैसा महसूस कर रहे हैं?",
  'bn': "হ্যালো! আজ আপনি কেমন অনুভব করছেন?",
  'te': "నమస్కారం! ఈరోజు మీరు ఎలా ఉన్నారు?",
  'mr': "नमस्कार! आज तुम्हाला कसे वाटत आहे?",
  'ta': "வணக்கம்! இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?",
  'gu': "નમસ્તે! આજે તમે કેવી રીતે અનુભવો છો?",
  'kn': "ನಮಸ್ಕಾರ! ಇಂದು ನೀವು ಹೇಗೆ ಭಾವಿಸುತ್ತಿದ್ದೀರಿ?",
  'ml': "നമസ്കാരം! ഇന്ന് നിങ്ങൾ എങ്ങനെ അനുഭവിക്കുന്നു?",
  'pa': "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?",
  'or': "ନମସ୍କାର! ଆଜି ଆପଣ କିପରି ଅନୁଭବ କରୁଛନ୍ତି?",
  'as': "নমস্কাৰ! আজি আপুনি কেনেকৈ অনুভৱ কৰিছে?",
  'bo': "नमस्कार! आजि आपनि कैनै अनुभव करथे?",
  'doi': "नमस्कार! आज तुसी किवें महसूस कर रहे हो?",
  'ks': "سلام! اَزۍ تہِ کیٚنہِ محسوس کران چھہِ?",
  'kok': "नमस्कार! आजि तुमकां कशें जायता?",
  'mai': "प्रणाम! आजहि तहाँ कहाँ लगैत छथि?",
  'mni': "ꯍꯥꯌ! ꯉꯁꯤ ꯑꯁꯤ ꯑꯗꯨꯕꯨ ꯑꯩꯕꯨ ꯀꯔꯤ ꯐꯥꯎꯕ ꯐꯥꯎꯔꯤꯕꯔꯤ?",
  'ne': "नमस्ते! आज तपाईं कसरी महसुस गर्दै हुनुहुन्छ?",
  'sa': "नमः! अद्य भवान् कथं अनुभवति?",
  'sat': "ᱡᱷᱟᱞᱟᱠ! ᱚᱱᱰᱮ ᱟᱢ ᱫᱚ ᱚᱠᱚᱭ ᱞᱮᱠᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱮᱫᱟ?",
  'sd': "سلام! اڄ توهان ڪيئن محسوس ڪري رهيا آهيو؟"
}

// Mental health specific prompts and context with multilingual support
export const MENTAL_HEALTH_CONTEXT = `
You are a compassionate AI mental health assistant designed to provide supportive guidance to college students in India. 
You can communicate in multiple Indian languages.

Your role is to:
- Offer empathetic listening and validation
- Provide evidence-based coping strategies
- Suggest appropriate resources and referrals
- Recognize crisis situations and provide emergency guidance
- Maintain appropriate boundaries (you are not a replacement for professional help)
- Respond in the same language as the user's message when possible
- Be culturally sensitive to Indian contexts and mental health challenges

Always prioritize safety and refer to crisis resources when needed.
Be warm, supportive, and non-judgmental in your responses.
Provide responses that are relevant to Indian college students and available resources.
`
