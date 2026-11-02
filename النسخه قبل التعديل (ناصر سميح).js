'use strict';
/* ================================================================
   NASSER SAMEH — PORTFOLIO  |  main.js
   ----------------------------------------------------------------
   Table of contents
     1) DATA        → every editable string lives here
     2) HELPERS     → tiny single-purpose utilities + icons
     3) RENDER      → every section is built from DATA
     4) COMPONENTS  → modal, accordion, counters, reveals, events
     5) I18N        → switch Arabic / English (and layout direction)
     6) INIT        → first render
================================================================ */


/* ================================================================
   1) DATA  — every editable string lives here.
      Rules:
      • { ar, en } pairs power the language switch.
      • null / empty values are hidden by the renderer (no "undefined").
      • Add a client or project = add one object to the matching array.
      // TODO: WhatsApp number (not provided — do not invent one)
================================================================ */
const DATA = {

  /* ---------- links ---------- */
  links: {
    tally:     'https://tally.so/r/kdd7br',
    instagram: 'https://www.instagram.com/cnasser_sameh/',
    tiktok:    'https://www.tiktok.com/@cnasser_sameh',
    youtube:   'https://youtube.com/@cnasser_sameh'
  },

  /* ---------- animated counters ---------- */
  stats: [
    { value: 4,    suffix: '+',                      label: { ar: 'سنوات خبرة',      en: 'Years experience' } },
    { value: 1000, suffix: '+',                      label: { ar: 'قطعة محتوى',      en: 'Content pieces' } },
    { value: 30,   suffix: '+',                      label: { ar: 'خطة واستراتيجية', en: 'Strategies built' } },
    { value: 2500, suffix: '+',                      label: { ar: 'عميل',            en: 'Clients' } },
    { value: 50,   suffix: { ar: ' مليون', en: 'M' }, label: { ar: 'مشاهدة',          en: 'Views' } }
  ],

  /* ---------- bio ---------- */
  bio: {
    ar: [
      'أنا ناصر سامح، سكريبت رايتر ومخطط واستراتيجي تسويقي، خبرة أكتر من 4 سنين في تحقيق أهداف تسويقية وبيعية من خلال الخطط والمحتوى الكتابي.',
      'بقدر أتعامل مع عملائي بداية من عمل الخطط والاستراتيجيات التسويقية للبزنس والمحتوى، لحد كتابة المحتوى وشرح طريقة التصوير والتعديلات والتنزيل والإشراف عليه، والتحليل والتطوير الدائم.',
      'بقدر أعمل رابط بين تحقيق أهداف المبيعات والأهداف التسويقية من خلال أساس المحتوى (السكريبت رايتنج).'
    ],
    en: [
      "I'm Nasser Sameh, a script writer and marketing planner & strategist with 4+ years of experience hitting marketing and sales goals through plans and written content.",
      'I work with clients end-to-end: from building the business & content marketing strategy, to writing the content, explaining filming, edits, publishing and supervision, plus constant analysis and improvement.',
      'I connect sales targets with marketing goals through the foundation of it all: script writing.'
    ]
  },

  why: [
    { ar: 'شغفي بكل ما يخص التسويق، مش بس كتابة السوشيال ميديا.', en: 'Passionate about all of marketing, not just social writing.' },
    { ar: 'كتبت +1000 قطعة محتوى وبنيت +30 خطة واستراتيجية لأصحاب بزنس ومشاريع وصنّاع محتوى.', en: 'Wrote 1000+ content pieces and built 30+ strategies for owners, projects and creators.' },
    { ar: 'كل نجاح بيبدأ بكلمة — الرسالة الصح بتبني الثقة والوعي والاهتمام والإعجاب بين البراند وجمهوره.', en: 'Every success starts with a word — the right message builds trust, awareness, interest and admiration.' },
    { ar: 'مع عملائي، الكتابة كأساس حققت مبيعات عالية، تحقيق تارجت، ونمو في المتابعين والمشاهدات والوعي بالبراند.', en: 'With clients, writing as the foundation drove high sales, hit targets, and grew followers, views and awareness.' },
    { ar: 'بتعلم دايماً وبتابع تريندات الكتابة والسوشيال والتسويق.', en: 'Always learning and tracking content, social and marketing trends.' }
  ],

  skills: [
    { ar: 'خطط واستراتيجيات تسويق', en: 'Marketing strategy' },
    { ar: 'مبيعات',                 en: 'Sales' },
    { ar: 'براندينج شخصي',          en: 'Personal branding' },
    { ar: 'ستوري تيلينج',           en: 'Storytelling' },
    { ar: 'تفاوض',                  en: 'Negotiation' },
    { ar: 'تصوير',                  en: 'Filming' },
    { ar: 'مونتاج',                 en: 'Video editing' },
    { ar: 'تسويق سوشيال ميديا',     en: 'Social media marketing' }
  ],

  /* ---------- services ---------- */
  services: [
    { title: { ar: 'Content Plan & Strategy', en: 'Content Plan & Strategy' },
      text: { ar: 'أفكار محتوى لـ3 شهور، أهداف تسويقية، كالندر، tone of voice، شكل المحتوى والجمهور المستهدف، تحليل منافسين وريسيرش وتحديد نيش. صالحة من 3 لـ6 شهور وبعدها بنطورها مش بنعيدها من الأول.',
              en: '3 months of content ideas, marketing goals, calendar, tone of voice, format, audience, competitor analysis, research and niche. Usable 3–6 months, then developed — not rebuilt.' },
      meta: { ar: 'التسليم: خلال <b>15 يوم</b>', en: 'Delivery: within <b>15 days</b>' } },

    { title: { ar: 'Script Writing', en: 'Script Writing' },
      text: { ar: 'كل سكريبت معاه caption، نوع التصوير، ملاحظات المونتاج، الهدف وشرح سريع — وكل جملة بتتشرح بالتفصيل: الإلقاء والتصوير والمونتاج.',
              en: 'Every script ships with a caption, filming type, editing notes, its goal and a quick explanation — and every sentence explained in detail.' },
      meta: { ar: 'التسليم: من <b>يوم ليومين</b> حسب موضوع الفيديو', en: 'Delivery: <b>1–2 days</b> depending on topic' } },

    { title: { ar: 'Mentorship / استشارة', en: 'Mentorship / Consultation' },
      text: { ar: 'جلسة مجانية كل 10 لـ15 يوم كـ mentor في صناعة المحتوى، مش السكريبت بس.',
              en: 'A free session every 10–15 days as a content creation mentor, not just scripts.' },
      meta: null },

    { title: { ar: 'تحليل المحتوى والمنصات', en: 'Monthly content analysis' },
      text: { ar: 'تحليل شهري مجاني لاكتشاف أنواع المحتوى الأفضل أداءً وتطويرها.',
              en: 'Free monthly analysis to find the best-performing content types and improve.' },
      meta: null },

    { title: { ar: 'Content supervision', en: 'Content supervision' },
      text: { ar: 'توجيه في التصوير والتعديلات والنشر والمتابعة.',
              en: 'Filming guidance, edits, publishing and follow-up.' },
      meta: null },

    { title: { ar: 'متابعة 24 ساعة', en: '24h WhatsApp follow-up' },
      text: { ar: 'فريقه متاح على واتساب لأي سؤال يخص المحتوى.',
              en: 'The team is available 24h on WhatsApp for any content question.' },
      meta: null },

    { title: { ar: 'Ideas Bank', en: 'Ideas Bank' },
      text: { ar: 'مساحة شخصية ترمي فيها كل أفكارك ونطورها سوا.',
              en: 'A personal space to drop every idea, then we develop it together.' },
      meta: null }
  ],

  /* ---------- process (6 steps) ---------- */
  process: [
    { title: { ar: 'Brief', en: 'Brief' },
      text: { ar: 'تملى فورم بالهدف والميزانية والمتطلبات والرؤية.', en: 'You fill a form: goal, budget, requirements, vision.' } },
    { title: { ar: 'Custom package', en: 'Custom package' },
      text: { ar: 'توصلك رسالة تأكيد وباكدج مناسبة للفورم، وبعدها التحويل.', en: 'You get a confirmation with a custom package, then transfer.' } },
    { title: { ar: 'Your system', en: 'Your system' },
      text: { ar: 'بعد الدفع تستلم سيستم خاص للتعاون والمواعيد والتعديلات والطلبات، بدل رسايل واتساب المتلخبطة.', en: 'After payment: a dedicated system for deadlines, revisions and requests — no messy WhatsApp.' } },
    { title: { ar: 'Strategy', en: 'Strategy' },
      text: { ar: 'نبدأ بتأسيس البراند بخطة واستراتيجية محتوى عشان مفيش حاجة تبقى عشوائية.', en: 'We start with the content plan & strategy so nothing is random.' } },
    { title: { ar: 'Scripts + explanation', en: 'Scripts + explanation' },
      text: { ar: 'سكريبت مع caption وتصوير ومونتاج وهدف وشرح كل جملة بالتفصيل.', en: 'Scripts with caption, filming, editing, goal and a sentence-by-sentence explanation.' } },
    { title: { ar: 'Follow-up & analysis', en: 'Follow-up & analysis' },
      text: { ar: 'متابعة واتساب 24 ساعة، استشارة مجانية كل 15 يوم، فورم رضا كل 10 أيام، تحليل شهري وبنك أفكار.', en: '24h WhatsApp, free consultation every 15 days, satisfaction form every 10 days, monthly analysis + Ideas Bank.' } }
  ],

  /* ---------- clients ----------
     كل حقل هنا مأخوذ من سكرين شوت البروفايل نفسه.
     verified:false → الأرقام مقروءة من صورة (تقريبية) // TODO: verify
     featured:true  → rendered as a wide highlight card
     photo          → صورة البروفايل الحقيقية، لو null يترسم لوجو الحساب
     bio            → النص الظاهر في البروفايل (بدون أي إضافة)
  ---------------------------------------------------------------- */
  clients: [
    { id: 'waleed',
      name: { ar: 'الدوك وليد | the doc waleed', en: 'thedocwaleed' },
      handle: '@thedocwaleed', platform: 'TikTok',
      category: { ar: 'رائد أعمال وصانع محتوى', en: 'Entrepreneur & content creator' },
      following: '396', followers: '1.3M', likes: '14.2M',
      photo: 'assets/images/clients/waleed.jpg',
      bio: {
        ar: ['طبيب تحوّل إلى رائد أعمال وصانع محتوى.'],
        en: ['A doctor turned entrepreneur and content creator.']
      },
      link: 'thedocwaleed.com/shop/',
      caseStudy: {
        ar: [
          'د. عبد الرحمن وليد: صانع محتوى بيساعد جمهوره بقيمة حقيقية من خلال المحتوى والورش وقناة واتساب بمحتوى مخصوص.',
          'كان من أوائل من اتكلموا في الشرق الأوسط عن passion diversity وعمل ورش ليها.',
          'اشتغلت معاه على آخر ورشتين عن passion diversity وعلى قناة الواتساب من أول إطلاقها.',
          'بعد أول شهر أشرفت على القناة بشكل شخصي: متابعة مستمرة، كتابة المحتوى بتعديلاته، ونشره كمحتوى تسويقي يدعم المبيعات.'
        ],
        en: [
          'Dr. Abdelrahman Waleed: a creator helping his audience with real value through content, workshops and a WhatsApp channel.',
          'Among the first in the Middle East to talk about passion diversity and run workshops for it.',
          'Nasser worked on his last two passion diversity workshops and on the WhatsApp channel from its first launch.',
          'After month one, Nasser personally supervised the channel: continuous follow-up, writing & editing content, publishing it as marketing content supporting sales.'
        ]
      },
      did: ['Script Writing', 'Channel Supervision', 'Marketing Content', 'Workshops'],
      verified: true, featured: true,
      photo: 'https://yt3.googleusercontent.com/XYHccgly2_qROc6j6RrvtvahT8eOeajrS5zXzj5_o2XMfs82v0NksZJawysn1Sg-Hq5QqlmZdw=s900-c-k-c0x00ffffff-no-rj' },

    { id: 'bahaa',
      name: { ar: 'Bahaa Henish', en: 'Bahaa Henish' },
      handle: '@bahaa.henish', platform: 'TikTok',
      category: { ar: 'صانع محتوى', en: 'Content creator' },
      following: '411', followers: '1.3M', likes: '23.8M',
      photo: 'assets/images/clients/bahaa.jpg',
      link: 'www.odoo.com/r/sveS',
      bio: { ar: ['جرب اودو 👇👇'], en: ['Try Odoo 👇👇'] },
      verified: true, featured: true },

    { id: 'naiftalks',
      name: { ar: 'نايف المحمود | naiftalks', en: 'Naif Almahmoud — naiftalks' },
      handle: '@naiftalks', platform: 'Instagram',
      category: { ar: 'صانع ريلز', en: 'Reel creator' },
      posts: '472', followers: '232K', following: '579',
      photo: 'assets/images/clients/naiftalks.jpg',
      bio: {
        ar: ['1.3 مليون متابع على السوشيال ميديا.', 'naiftalks92@gmail.com'],
        en: ['1.3 Million followers on social media.', 'naiftalks92@gmail.com']
      },
      verified: false, featured: false },

    { id: 'vidamedia',
      name: { ar: 'Vida Media | vidamediaa', en: 'Vida Media' },
      handle: '@vidamediaa', platform: 'Instagram',
      category: { ar: 'وكالة تسويق', en: 'Marketing Agency' },
      posts: '39', followers: '53.7K', following: '1',
      photo: 'assets/images/clients/vidamedia.jpg',
      bio: {
        ar: ['نبني البراندات الشخصية للخبراء.', 'المدير التنفيذي: @jamalkaa128', 'إنت بتستثمر فينا، مش بتدفع لينا.', 'مصر | السعودية'],
        en: ['We build personal brands for experts.', 'CEO: @jamalkaa128', "You're investing in us, not paying us.", 'EG | KSA']
      },
      link: 'applyvidamedia.com',
      verified: false, featured: false },

    { id: 'wekala',
      name: { ar: 'Wekala Agency | wekala.agency', en: 'Wekala Agency' },
      handle: '@wekala.agency', platform: 'Instagram',
      category: { ar: 'وكالة تسويق', en: 'Marketing Agency' },
      posts: '41', followers: '35.7K', following: '6',
      photo: 'assets/images/clients/wekala.jpg',
      bio: {
        ar: ['بساعد البراندات الشخصية والبزنس يوصلوا لجمهور أوسع ويبيعوا أكتر.', 'من 0 لـ10 آلاف متابع في 30 يوم بدون إعلانات مدفوعة.'],
        en: ['We help personal brands & Businesses go viral & sell more.', '0 to 10k followers in 30 days with ZERO ads.']
      },
      verified: false, featured: false },

    { id: 'mashal',
      name: { ar: 'مشعل. | 665s', en: '665s' },
      handle: '@665s', platform: 'Instagram',
      category: { ar: 'تعليم', en: 'School' },
      posts: '49', followers: '38.1K', following: '428',
      photo: 'assets/images/clients/mashal.jpg',
      /* TODO: السطر الأول في البايو غير واضح في السكرين شوت — أضفه لما تتأكد منه */
      bio: {
        ar: ['طالب في كلية التربيه - جامعة الكويت.'],
        en: ['Student at the College of Education — Kuwait University.']
      },
      verified: false, featured: false }
  ],

  /* ---------- case studies ----------
     video / results / details = null → the block is simply not rendered
  ---------------------------------------------------------------- */
  projects: [
    { title: { ar: 'قناة واتساب د. عبد الرحمن وليد', en: 'Doc Waleed — WhatsApp channel' },
      handle: '@thedocwaleed', platform: 'WhatsApp', tags: ['Content Creation', 'Business'],
      desc: { ar: 'محتوى يضيف قيمة ويدعم رحلة ورش passion diversity.', en: 'Value-driven content supporting the passion diversity workshops journey.' },
      details: {
        ar: [
          'د. عبد الرحمن وليد: صانع محتوى بيساعد جمهوره بقيمة حقيقية من خلال المحتوى والورش وقناة واتساب بمحتوى مخصوص.',
          'كان من أوائل من اتكلموا في الشرق الأوسط عن passion diversity وعمل ورش ليها.',
          'اشتغلت معاه على آخر ورشتين عن passion diversity وعلى قناة الواتساب من أول إطلاقها.',
          'بعد أول شهر أشرفت على القناة بشكل شخصي: متابعة مستمرة، كتابة المحتوى بتعديلاته، ونشره كمحتوى تسويقي يدعم المبيعات.'
        ],
        en: [
          'Dr. Abdelrahman Waleed: a creator helping his audience with real value through content, workshops and a WhatsApp channel.',
          'Among the first in the Middle East to talk about passion diversity and run workshops for it.',
          'Nasser worked on his last two passion diversity workshops and on the WhatsApp channel from its first launch.',
          'After month one, Nasser personally supervised the channel: continuous follow-up, writing & editing content, publishing it as marketing content supporting sales.'
        ]
      },
      did: ['Script Writing', 'Channel Supervision', 'Marketing Content', 'Workshops'],
      video: null,     // TODO: add video URL (YouTube / TikTok / Instagram)
      results: null }, // TODO: views / sales numbers

    { title: { ar: 'Vida Media',     en: 'Vida Media' },     handle: '@vidamediaa',    platform: 'Instagram', tags: ['Marketing', 'Business'],        desc: null, details: null, did: null, video: null, results: null },
    { title: { ar: 'Wekala Agency',  en: 'Wekala Agency' },  handle: '@wekala.agency', platform: 'Instagram', tags: ['Marketing', 'Business'],        desc: null, details: null, did: null, video: null, results: null },
    { title: { ar: 'نايف المحمود',    en: 'Naif Almahmoud' }, handle: '@naiftalks',     platform: 'Instagram', tags: ['Content Creation'],             desc: null, details: null, did: null, video: null, results: null },
    { title: { ar: 'مشعل.',           en: '665s' },           handle: '@665s',          platform: 'Instagram', tags: ['Education'],                    desc: null, details: null, did: null, video: null, results: null },
    { title: { ar: 'Bahaa Henish',   en: 'Bahaa Henish' },   handle: '@bahaa.henish',  platform: 'TikTok',    tags: ['Content Creation'],             desc: null, details: null, did: null, video: null, results: null },
    { title: { ar: 'الدوك وليد',      en: 'Doc Waleed' },     handle: '@thedocwaleed',  platform: 'TikTok',    tags: ['Content Creation', 'Business'], desc: null, details: null, did: null, video: null, results: null }
  ],

  contentTypes: ['Vlogs','Storytelling','Long Videos','Content Writing','Educational','Challenges','Sketches','Creative Content','Sales Content','Copywriting','Comparisons','Interviews','React Content','Transformation'],

  industries: ['Technology','Sales','Education','Teaching','Content Creation','Marketing','Business','Gym / Health / Nutrition','Freelance','Real Estate','Life Coaching','Restaurants','Medicine','Photography','English','Engineering','Conferences','Local Brands: accessories, hair, clothes, shoes, lifestyle'],

  /* testimonials: the whole section hides itself when this array is empty
     // TODO: replace with real client feedback                          */
  testimonials: [
    // { placeholder: true, name: 'TODO', handle: '@todo', quote: { ar: 'TODO: replace with real client feedback', en: 'TODO: replace with real client feedback' } }
  ],

  /* ---------- FAQ (Arabic kept as provided) ---------- */
  faq: [
    { q: { ar: 'ليه مهم أعمل كونتنت بلان واستراتيجي قبل السكريبتات؟', en: 'Why build a content plan & strategy before scripts?' },
      a: { ar: 'بيضمن نتائج أفضل ويخلي المحتوى مش عشوائي ومتأسس صح. أهم العناصر: أفكار 3 شهور، أهداف تسويقية، كالندر، tone of voice، شكل المحتوى، الجمهور المستهدف، تحليل المنافسين، ريسيرش، والنيش. بتستخدمها من 3 لـ6 شهور وبعدها بيتم التطوير مش البناء من جديد.',
           en: 'It guarantees better results and keeps content from being random. Key elements: 3 months of ideas, marketing goals, calendar, tone of voice, format, audience, competitor analysis, research and niche. Usable for 3–6 months, then developed — not rebuilt.' } },
    { q: { ar: 'إيه مدة تسليم الشغل؟', en: 'What are the delivery times?' },
      a: { ar: 'Content plan & strategy خلال 15 يوم. السكريبت من يوم ليومين حسب موضوع الفيديو.',
           en: 'Content plan & strategy: within 15 days. Scripts: 1–2 days depending on the video topic.' } },
    { q: { ar: 'هل التعامل بينتهي عند كتابة السكريبت؟', en: 'Does the work end at writing the script?' },
      a: { ar: 'لا. السكريبت بيتشرح جملة جملة (طريقة، تصوير، مونتاج)، واستشارة مجانية كل 10 لـ15 يوم كـ mentor، وتحليل شهري للمحتوى.',
           en: 'No. Every script is explained sentence by sentence (delivery, filming, editing), plus a free mentorship session every 10–15 days and monthly content analysis.' } },
    { q: { ar: 'هل ممكن يحصل تأخير؟', en: 'Can delays happen?' },
      a: { ar: 'مستحيل بسبب السيستم المعمول، ولحد دلوقتي مفيش شكوى تأخير من أي عميل، وغالباً الشغل بيتسلم قبل المعاد.',
           en: 'No — thanks to the system in place. Zero delay complaints so far, and work usually ships before the deadline.' } },
    { q: { ar: 'أقدر أشتغل معاك إنت بس في صناعة المحتوى؟', en: 'Can I work with you alone on content creation?' },
      a: { ar: 'أكيد، بنعمل المحتوى بأسس تسويقية صح، وبيتشرح التصوير والمونتاج سواء عندك فريق أو لا، وبدخل معاك استشارة دورية.',
           en: 'Absolutely. We build content on proper marketing foundations, with filming & editing explained whether you have a team or not, plus regular consultations.' } },
    { q: { ar: 'هل فيه ضمان على الشغل والنتايج؟', en: 'Is there a guarantee on work and results?' },
      a: { ar: 'جودة المحتوى واستراتيجية الكتابة مضمونين 100%. النتايج بتعتمد على التعاون المشترك ومدة التعامل وتنفيذ خطوات المحتوى، ولو النتايج ضعيفة بنراجع ونعدّل.',
           en: 'Content quality and writing strategy are 100% guaranteed. Results depend on collaboration, duration and execution — if results are weak, we review and adjust.' } },
    { q: { ar: 'لو اشتغلت معاك ومحققتش تطور؟', en: 'What if I see no progress?' },
      a: { ar: 'في باكدج الـ3 شهور، لو التزمت بالمحتوى وتابعت التعليمات ومفيش تطور واضح، بكمل معاك مجاناً لحد ما نحقق نتايج تليق بالبراند.',
           en: 'In the 3-month package: if you commit, follow instructions and still see no clear progress, I keep working with you for free until we hit results worthy of the brand.' } },
    { q: { ar: 'مش قادر أدفع المبلغ كله مرة واحدة؟', en: "Can't pay the full amount at once?" },
      a: { ar: 'متاح نظام تقسيط (مثلاً باكدج 3 شهور: تدفع كل شهر بعد ما نخلصه)، وبعمل أي باكدج مخصوص حسب الميزانية والوقت.',
           en: 'Installments are available (e.g. 3-month package: pay after each month), and I build custom packages for any budget and timeline.' } },
    { q: { ar: 'هتقدر تشتغل على الـ industry بتاعتي؟', en: 'Can you work in my industry?' },
      a: { ar: 'أكيد، بأخد منك أهم الداتا وبتعديلات واستشارات مستمرة علشان أفهم رؤيتك بالتفصيل — شوف قائمة المجالات اللي اشتغلت فيها فوق.',
           en: "Definitely. I take the key data from you, with ongoing edits and consultations to understand your vision in detail — see the industries list above." } }
  ],

  /* ---------- static UI strings (bound to [data-i18n]) ---------- */
  ui: {
    skip:          { ar: 'تخطَّ إلى المحتوى', en: 'Skip to content' },
    brandName:     { ar: 'ناصر سامح', en: 'Nasser Sameh' },
    navAbout:      { ar: 'عنّي', en: 'About' },
    navServices:   { ar: 'الخدمات', en: 'Services' },
    navClients:    { ar: 'العملاء', en: 'Clients' },
    navProjects:   { ar: 'المشاريع', en: 'Projects' },
    navFaq:        { ar: 'الأسئلة', en: 'FAQ' },
    ctaBook:       { ar: 'احجز الأوفر المناسب', en: 'Book your offer' },
    ctaBookShort:  { ar: 'احجز دلوقتي', en: 'Book now' },
    ctaProjects:   { ar: 'شوف المشاريع', en: 'See projects' },
    heroEyebrow:   { ar: 'كاتب سكريبت / استراتيجي تسويقي', en: 'Script writer / Marketing strategist' },
    heroName:      { ar: 'ناصر سامح', en: 'Nasser Sameh' },
    heroBig:       { ar: 'الكلمة بتفرق.', en: 'Words move.' },
    heroGhost:     { ar: 'في كل حاجة.', en: 'Everything.' },
    heroSub:       { ar: 'سكريبت رايتر ومخطط واستراتيجي تسويقي', en: 'Script writer, marketing planner & strategist' },
    aboutEyebrow:  { ar: 'الشخص وراء الكلمات', en: 'The person behind the words' },
    skillsTitle:   { ar: '٨ مهارات في كل قطعة محتوى', en: '8 skills in every piece' },
    svcEyebrow:    { ar: 'الخدمات', en: 'Services' },
    svcTitle:      { ar: 'الكلمة الصح وراها شغل كتير.', en: 'The right word takes real work.' },
    svcSub:        { ar: 'من الاستراتيجية لحد آخر تفصيلة في التصوير والنشر — كل خدمة ليها دور واضح.', en: 'From strategy to the last filming & publishing detail — every service has a clear role.' },
    prcEyebrow:    { ar: 'طريقة الشغل', en: 'Process' },
    prcTitle:      { ar: 'خطوات واضحة. مساحة للإبداع.', en: 'Clear steps. Room for creativity.' },
    prcSub:        { ar: 'نظام يخلي كل مرحلة مفهومة، وكل طلب له مكانه.', en: 'A system that makes every stage clear, and every request has its place.' },
    clEyebrow:     { ar: 'العملاء', en: 'Clients' },
    clTitle:       { ar: 'علاقات بدأت بكلمة.', en: 'Relationships that started with a word.' },
    clSub:         { ar: 'مجموعة من صنّاع المحتوى وأصحاب الأعمال من مجالات ومنصات مختلفة. الأرقام التقريبية غير مُتحقق منها.', en: 'Creators and business owners across industries and platforms. Approximate numbers are unverified.' },
    clNote:        { ar: '* الأرقام مأخوذة من لقطات شاشة وقت التعاون — تقريبية وقابلة للتحديث.', en: '* Numbers come from screenshots at collaboration time — approximate and updatable.' },
    prjEyebrow:    { ar: 'حالات مختارة', en: 'Case studies' },
    prjTitle:      { ar: 'المشروع هو أكتر من رقم.', en: 'A project is more than a number.' },
    prjSub:        { ar: 'التفاصيل المتاحة فقط — من غير نتائج مفترضة أو قصص ناقصة متخفية.', en: 'Only available details — no invented results, no hidden gaps.' },
    indEyebrow:    { ar: 'المحتوى / المجال', en: 'Content / Industry' },
    indTitle:      { ar: 'كل مجال له حكاية.', en: 'Every industry has a story.' },
    indSub:        { ar: 'أنواع محتوى ومجالات متنوعة — الفكرة دايماً هي فهم الجمهور والرسالة.', en: 'Diverse content types and industries — it is always about audience and message.' },
    indTypes:      { ar: 'أنواع المحتوى', en: 'Content types' },
    indFields:     { ar: 'المجالات', en: 'Industries' },
    tstEyebrow:    { ar: 'آراء العملاء', en: 'Testimonials' },
    tstTitle:      { ar: 'كلامهم عن الشغل.', en: 'What clients say.' },
    tstSub:        { ar: 'قريباً — ملاحظات حقيقية من العملاء هتظهر هنا.', en: 'Coming soon — real client feedback will appear here.' },
    faqEyebrow:    { ar: 'قبل ما نبدأ', en: 'Before we start' },
    faqTitle:      { ar: 'أسئلة مهمة.', en: 'Important questions.' },
    faqSub:        { ar: 'إجابات مباشرة عشان نبدأ على أساس واضح.', en: 'Straight answers so we start on a clear basis.' },
    finalTitle:    { ar: 'أنا وفريقي جاهزين نشتغل مع بعض حسب احتياجاتك ونحقق هدفك في وقت قياسي. نحدد معاد للاجتماع وتسأل كل الأسئلة اللي تحبها.', en: 'I and my team are ready to work together according to your service needs and achieve your goal in record time. Let’s set a meeting time and ask all the questions you want.' },
    finalSub:      { ar: 'خلال 24 ساعة من التسجيل في الفورم بتواصل معاك بالأوفر المناسب ليك.', en: 'Within 24h of submitting the form, I’ll contact you with the right offer.' },
    rights:        { ar: 'كل الحقوق محفوظة.', en: 'All rights reserved.' },
    filterAll:     { ar: 'الكل', en: 'All' },
    noDetails:     { ar: 'تفاصيل إضافية لم تُقدَّم بعد.', en: 'More details not provided yet.' },
    approx:        { ar: 'تقريبي — غير مُتحقق', en: 'approx. — unverified' },
    whatDid:       { ar: 'إيه اللي اتعمل', en: 'What was done' },
    watchVideo:    { ar: 'شغّل الفيديو', en: 'Play video' },
    seeMore:       { ar: 'اضغط للتفاصيل', en: 'Click for details' },
    posts:         { ar: 'منشور', en: 'posts' },
    followers:     { ar: 'متابع', en: 'followers' },
    following:     { ar: 'يتابع', en: 'following' },
    likes:         { ar: 'إعجاب', en: 'likes' },
    aboutAccount:  { ar: 'عن الحساب', en: 'About the account' }
  }
};


/* ================================================================
   2) HELPERS — tiny single-purpose utilities
================================================================ */
let lang = 'ar';                                     // active language

/** Returns the string for the active language (falls back to Arabic). */
const t = (obj) => (typeof obj === 'string' ? obj : (obj && (obj[lang] || obj.ar)) || '');

/** querySelector shorthand */
const $ = (sel) => document.querySelector(sel);

/** Escapes HTML special characters before injecting user-ish data. */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

/** First letters of a latin name → used for the initials avatar fallback. */
const initials = (name) => {
  const words = String(name).match(/[A-Za-z]+/g);
  return words ? words.slice(0, 2).map(w => w[0].toUpperCase()).join('') : String(name).trim().slice(0, 2);
};

/** Social icon SVGs (inline, no icon font). */
const ICONS = {
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.3.8-.3 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.8.3 1.8.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.3-.8.3-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.8-.3-1.8-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.2-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z"/></svg>',
  TikTok:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 7.3a5.4 5.4 0 0 1-3.2-1 5.4 5.4 0 0 1-2.1-3.1h-3.3v12.6a2.9 2.9 0 1 1-2-2.8V9.6a6.3 6.3 0 1 0 5.3 6.2V9.5a8.6 8.6 0 0 0 5.3 1.8z"/></svg>',
  YouTube:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.6s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 4 12 4 12 4s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1C1.2 6 1 7.6 1 7.6S.8 9.5.8 11.4v1.7c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.7c0-1.9-.2-3.8-.2-3.8zM9.8 15.2V8.7l6.1 3.3z"/></svg>'
};


/* ================================================================
   3) RENDER — every section is built from DATA
================================================================ */

/** Social links (hero + footer). */
function renderSocials() {
  const html = `
    <a href="${DATA.links.instagram}" target="_blank" rel="noopener">${ICONS.Instagram} Instagram <span aria-hidden="true">↗</span></a>
    <a href="${DATA.links.tiktok}"    target="_blank" rel="noopener">${ICONS.TikTok} TikTok <span aria-hidden="true">↗</span></a>
    <a href="${DATA.links.youtube}"   target="_blank" rel="noopener">${ICONS.YouTube} YouTube <span aria-hidden="true">↗</span></a>`;
  $('#heroSocials').innerHTML = html;
  $('#footerSocials').innerHTML = html;
}

/** Stats strip with animated numbers. */
function renderStats() {
  $('#statsGrid').innerHTML = DATA.stats.map(s => {
    const suffix = esc(t(s.suffix));
    return `
    <div class="stat reveal">
      <div class="stat__num" data-target="${s.value}" data-suffix="${suffix}">0${suffix}</div>
      <div class="stat__label">${esc(t(s.label))}</div>
    </div>`;
  }).join('');
}

/** About: bio paragraphs, "why me" list and the 8 skill chips. */
function renderAbout() {
  $('#aboutBio').innerHTML   = DATA.bio[lang].map(p => `<p>${esc(p)}</p>`).join('');
  $('#aboutWhy').innerHTML   = DATA.why.map(w => `<li>${esc(t(w))}</li>`).join('');
  $('#skillChips').innerHTML = DATA.skills.map(s => `<span class="chip">${esc(t(s))}</span>`).join('');
}

/** Services grid (numbered cards). */
function renderServices() {
  $('#servicesGrid').innerHTML = DATA.services.map((s, i) => `
    <article class="card reveal">
      <span class="card__num en">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="card__title">${esc(t(s.title))}</h3>
      <p class="card__text">${esc(t(s.text))}</p>
      ${s.meta ? `<p class="card__meta">${t(s.meta)}</p>` : ''}
    </article>`).join('');
}

/** Process steps. */
function renderProcess() {
  $('#processGrid').innerHTML = DATA.process.map((p, i) => `
    <article class="card reveal">
      <span class="card__num en">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="card__title">${esc(t(p.title))}</h3>
      <p class="card__text">${esc(t(p.text))}</p>
    </article>`).join('');
}

/**
 * Avatar for one client: real photo when available, otherwise a drawn
 * brand mark / portrait that matches the profile screenshot.
 */
function clientAvatar(c) {
  if (c.photo) {
    return `<img src="${esc(c.photo)}" alt="${esc(c.name.en)}" width="66" height="66" loading="lazy" decoding="async">`;
  }
  /* لوجوهات مرسومة بنفس ألوان الحساب الأصلي من السكرين شوت */
  const marks = {
    /* Vida Media — zigzag برتقالي على أسود */
    vidamedia: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" fill="#080808"/><path d="M20 30l8 20 8-20" fill="none" stroke="#F0872A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 30l8 20 8-20" fill="none" stroke="#F0872A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="63" cy="22" r="2" fill="#F0872A"/></svg>`,
    /* Wekala — مدار بنفسجي + كرة على أسود */
    wekala: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" fill="#080808"/><ellipse cx="40" cy="42" rx="26" ry="16" fill="none" stroke="#7C3AED" stroke-width="4" transform="rotate(-18 40 42)"/><ellipse cx="40" cy="46" rx="22" ry="12" fill="none" stroke="#A855F7" stroke-width="3" transform="rotate(-14 40 46)"/><circle cx="34" cy="30" r="9" fill="#8B5CF6"/><circle cx="34" cy="30" r="5" fill="#0a0a12"/></svg>`,
    /* مشعل. — خط أبيض على كحلي غامق */
    mashal: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" fill="#0e1620"/><text x="40" y="50" text-anchor="middle" font-size="26" font-weight="700" font-family="Cairo, sans-serif" fill="#f4f0ee">مشعل</text><circle cx="16" cy="52" r="2.4" fill="#f4f0ee"/></svg>`
  };
  return marks[c.id] || `<span>${esc(initials(c.name.en))}</span>`;
}

/** Builds the compact stats line shown on each client card. */
function clientStatsLine(c) {
  const parts = [];
  if (c.posts)     parts.push(`${esc(c.posts)} ${esc(t(DATA.ui.posts))}`);
  if (c.followers) parts.push(`<b>${esc(c.followers)}</b> ${esc(t(DATA.ui.followers))}`);
  if (c.likes)     parts.push(`<b>${esc(c.likes)}</b> ${esc(t(DATA.ui.likes))}`);
  if (c.following && !c.posts) parts.push(`${esc(c.following)} ${esc(t(DATA.ui.following))}`);
  return parts.join(' · ');
}

/** Clients grid; featured clients are sorted first and rendered wider. */
function renderClients() {
  const sorted = [...DATA.clients].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  $('#clientsGrid').innerHTML = sorted.map((c, i) => {
    const approx = c.followers && !c.verified ? ` <span>(${esc(t(DATA.ui.approx))})</span>` : '';
    return `
    <button class="client reveal ${c.featured ? 'client--featured' : ''}"
            data-client="${i}" aria-haspopup="dialog" aria-label="${esc(t(c.name))}">
      <span class="client__avatar" aria-hidden="true">${clientAvatar(c)}</span>
        <span class="client__info" style="display:block">
        <span class="client__cat">${esc(t(c.category))}</span>
        <span class="client__name">${esc(t(c.name))}</span>
        <span class="client__handle">${esc(c.handle)}</span>
        <span class="client__stats">${clientStatsLine(c)}${approx}</span>
        <span class="client__more">${esc(t(DATA.ui.seeMore))} ↗</span>
      </span>
    </button>`;
  }).join('');
}

/** Content types + industries chips. */
function renderIndustries() {
  $('#contentTypesChips').innerHTML = DATA.contentTypes.map(x => `<span class="chip">${esc(x)}</span>`).join('');
  $('#industriesChips').innerHTML   = DATA.industries.map(x => `<span class="chip">${esc(x)}</span>`).join('');
}

/* ---------------- projects: filter + grid ---------------- */
let activeFilter = 'All';

/** Builds the filter buttons from the platforms + tags found in DATA.projects. */
function renderFilter() {
  const cats = new Set(['All']);
  DATA.projects.forEach(p => { cats.add(p.platform); (p.tags || []).forEach(tag => cats.add(tag)); });
  $('#filterBar').innerHTML = [...cats].map(c => `
    <button class="filter__btn ${c === activeFilter ? 'is-on' : ''}"
            data-filter="${esc(c)}" role="tab" aria-selected="${c === activeFilter}">
      ${c === 'All' ? esc(t(DATA.ui.filterAll)) : esc(c)}
    </button>`).join('');
}

/** Renders only the projects matching the active filter. */
function renderProjects() {
  const list = DATA.projects.filter(p =>
    activeFilter === 'All' || p.platform === activeFilter || (p.tags || []).includes(activeFilter));

  $('#projectsGrid').innerHTML = list.map(p => {
    const index = DATA.projects.indexOf(p);
    return `
    <button class="project reveal is-in" data-project="${index}" aria-haspopup="dialog">
      <span class="project__badge">${esc(p.platform)}</span>
      <span class="project__title">${esc(t(p.title))}</span>
      <span class="project__desc">${p.desc ? esc(t(p.desc)) : esc(t(DATA.ui.noDetails))}</span>
      <span class="project__arrow" aria-hidden="true">↗</span>
    </button>`;
  }).join('');
}

/** Testimonials — hides the whole section when the array is empty. */
function renderTestimonials() {
  const section = $('#testimonials');
  if (!DATA.testimonials.length) { section.hidden = true; return; }
  section.hidden = false;
  $('#tstGrid').innerHTML = DATA.testimonials.map(item => `
    <figure class="tst reveal">
      ${item.placeholder ? '<span class="tst__todo">PLACEHOLDER — TODO</span>' : ''}
      <blockquote class="tst__quote">"${esc(t(item.quote))}"</blockquote>
      <figcaption class="tst__who">
        <span class="client__avatar">${esc(initials(item.name))}</span>
        <span><b>${esc(item.name)}</b><br><span class="client__handle">${esc(item.handle || '')}</span></span>
      </figcaption>
    </figure>`).join('');
}

/** FAQ accordion markup. */
function renderFaq() {
  $('#faqList').innerHTML = DATA.faq.map((item, i) => `
    <div class="faq__item">
      <button class="faq__q" aria-expanded="false" aria-controls="faqA${i}">
        <span>${esc(t(item.q))}</span><span class="faq__icon" aria-hidden="true">+</span>
      </button>
      <div class="faq__a" id="faqA${i}" role="region">
        <div class="faq__a-inner">${esc(t(item.a))}</div>
      </div>
    </div>`).join('');
}


/* ================================================================
   4) COMPONENTS — modal, accordion, counters, reveals
================================================================ */

/* ---------------- modal ---------------- */
let lastFocused = null;

/** Opens the case-study modal for a project index. */
function openModal(index) {
  const p = DATA.projects[index];
  const details = p.details ? (p.details[lang] || p.details.ar) : null;

  $('#modalContent').innerHTML = `
    <span class="modal__badge">${esc(p.platform)}</span>
    <h3 class="modal__title" id="modalTitle">${esc(t(p.title))}</h3>
    <span class="modal__handle">${esc(p.handle || '')}</span>
    <div class="modal__body">
      ${details ? details.map(d => `<p>${esc(d)}</p>`).join('') : `<p>${esc(t(DATA.ui.noDetails))}</p>`}
    </div>
    ${p.did ? `<p style="font-weight:800;margin-top:6px">${esc(t(DATA.ui.whatDid))}:</p>
      <div class="modal__tags">${p.did.map(d => `<span class="chip">${esc(d)}</span>`).join('')}</div>` : ''}
    ${p.results ? `<div class="modal__results">${p.results.map(r =>
        `<div class="modal__result"><b>${esc(r.value)}</b><span>${esc(t(r.label))}</span></div>`).join('')}</div>` : ''}
    ${p.video ? `<div class="video-facade" data-video="${esc(p.video)}" role="button" tabindex="0" aria-label="${esc(t(DATA.ui.watchVideo))}">
        <span class="video-facade__play" aria-hidden="true">▶</span></div>` : ''}`;

  lastFocused = document.activeElement;
  $('#modal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
  $('#modal .modal__close').focus();
}

/** Opens the profile modal for a client index. */
function openClientModal(index) {
  const c = DATA.clients[index];
  const bio = c.bio ? c.bio[lang] || c.bio.ar : null;
  const stats = [
    c.posts     ? { value: c.posts,     label: DATA.ui.posts }     : null,
    c.followers ? { value: c.followers, label: DATA.ui.followers } : null,
    c.likes     ? { value: c.likes,     label: DATA.ui.likes }     : null,
    c.following ? { value: c.following, label: DATA.ui.following } : null
  ].filter(Boolean);

  $('#modalContent').innerHTML = `
    <span class="modal__badge">${esc(c.platform)}${c.verified ? ' ✓' : ''}</span>
    <div style="display:flex;align-items:center;gap:14px;margin-top:10px">
      <span class="client__avatar" style="width:64px;height:64px" aria-hidden="true">${clientAvatar(c)}</span>
      <h3 class="modal__title" id="modalTitle" style="margin:0">${esc(t(c.name))}</h3>
    </div>
    <span class="modal__handle">${esc(c.handle)}</span>
    ${c.category ? `<p style="color:var(--text-faint);font-size:.9rem;margin-top:6px">${esc(t(c.category))}</p>` : ''}
    <div class="modal__meta">
      ${stats.map(s => `<div><b>${esc(s.value)}</b><span>${esc(t(s.label))}</span></div>`).join('')}
    </div>
    ${bio ? `<p style="font-weight:800;margin-top:20px">${esc(t(DATA.ui.aboutAccount))}:</p>
      <div class="modal__body">${bio.map(line => `<p>${esc(line)}</p>`).join('')}</div>` : ''}
    ${c.link ? `<span class="modal__link">🔗 ${esc(c.link)}</span>` : ''}
    ${c.caseStudy ? `<p style="font-weight:800;margin-top:22px">${esc(t(DATA.ui.whatDid))}:</p>
      <div class="modal__body">${c.caseStudy[lang].map(d => `<p>${esc(d)}</p>`).join('')}</div>
      <div class="modal__tags">${c.did.map(d => `<span class="chip">${esc(d)}</span>`).join('')}</div>` : ''}`;

  lastFocused = document.activeElement;
  $('#modal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
  $('#modal .modal__close').focus();
}

/** Closes the modal and restores focus + scroll. */
function closeModal() {
  $('#modal').classList.remove('is-open');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

/** Click-to-load video facade: the iframe is only injected on demand. */
function loadVideo(facade) {
  const url = facade.dataset.video;
  const yt = url.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
  const embed = yt ? `https://www.youtube.com/embed/${yt[1]}?autoplay=1` : url;
  facade.innerHTML = `<iframe src="${embed}" title="Project video" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>`;
}

/* ---------------- counters ---------------- */

/** Animates the stat numbers once they scroll into view. */
function startCounters() {
  const nodes = document.querySelectorAll('.stat__num');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 1400;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix;

      if (reduced) { el.textContent = target.toLocaleString('en') + suffix; return; }

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .4 });

  nodes.forEach(n => io.observe(n));
}

/* ---------------- scroll reveal ---------------- */

/** Fades sections in the first time they appear. */
function observeReveals() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      obs.unobserve(e.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal:not(.is-in)').forEach(el => io.observe(el));
}

/* ---------------- delegated events (re-bound after re-render) -------------- */

/** Wires up filter buttons, project cards and the FAQ accordion. */
function bindDynamic() {
  document.querySelectorAll('#filterBar .filter__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      renderFilter(); renderProjects(); bindDynamic();
    });
  });
  document.querySelectorAll('#projectsGrid [data-project]').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.project));
  });
  document.querySelectorAll('#clientsGrid [data-client]').forEach(card => {
    card.addEventListener('click', () => openClientModal(+card.dataset.client));
  });
  document.querySelectorAll('#faqList .faq__q').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq__a');
      const open = item.classList.toggle('is-open');
      question.setAttribute('aria-expanded', String(open));
      answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0';
    });
  });
}

/* ---------------- static events (bound once) -------------- */
$('#modal').addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeModal();
  const facade = e.target.closest('.video-facade');
  if (facade && !facade.querySelector('iframe')) loadVideo(facade);
});

document.addEventListener('keydown', (e) => {
  const modal = $('#modal');
  if (!modal.classList.contains('is-open')) return;
  if (e.key === 'Escape') { closeModal(); return; }
  if (e.key !== 'Tab') return;
  /* simple focus trap */
  const focusables = modal.querySelectorAll('button,[tabindex="0"],a,iframe');
  if (!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
  else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
});

const burger = $('#burger'), navLinks = $('#navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
navLinks.addEventListener('click', (e) => { if (e.target.tagName === 'A') navLinks.classList.remove('is-open'); });

/* highlight the nav link of the section in view */
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.querySelectorAll('a').forEach(a =>
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
['about', 'services', 'clients', 'projects', 'faq']
  .forEach(id => { const el = document.getElementById(id); if (el) navObserver.observe(el); });


/* ================================================================
   5) I18N — switch Arabic / English (and layout direction)
================================================================ */
function applyLang(next) {
  lang = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';

  $('#btnAr').classList.toggle('is-on', next === 'ar');
  $('#btnEn').classList.toggle('is-on', next === 'en');
  $('#btnAr').setAttribute('aria-pressed', String(next === 'ar'));
  $('#btnEn').setAttribute('aria-pressed', String(next === 'en'));

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (DATA.ui[key]) el.textContent = t(DATA.ui[key]);
  });

  renderStats(); renderAbout(); renderServices(); renderProcess();
  renderClients(); renderIndustries(); renderFilter(); renderProjects();
  renderTestimonials(); renderFaq();
  bindDynamic(); observeReveals(); startCounters();
}

$('#btnAr').addEventListener('click', () => applyLang('ar'));
$('#btnEn').addEventListener('click', () => applyLang('en'));


/* ================================================================
   6) INIT
================================================================ */
$('#year').textContent = new Date().getFullYear();

renderSocials();
renderStats(); renderAbout(); renderServices(); renderProcess();
renderClients(); renderIndustries(); renderFilter(); renderProjects();
renderTestimonials(); renderFaq();
bindDynamic(); observeReveals(); startCounters();
