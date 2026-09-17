import { site, whatsappUrl, mailtoUrl, hoursRange } from '../config/site';
import { homeAnchor, localeRoute } from '../lib/routes';
import type { SiteContent } from './types';

export const si: SiteContent = {
  meta: {
    home: {
      title: 'Earth Leaf | රත්මලානේ සෞඛ්‍ය සම්පන්න දිවා ආහාර',
      description:
        'Earth Leaf (රත්මලාන) — කෘත්‍රිම අමුද්‍රව්‍ය සහ එකතු කළ සීනි නොමැතිව දිනපතා නැවුම්ව සකස් කරන සෞඛ්‍ය සම්පන්න ශ්‍රී ලාංකික දිවා ආහාර.',
    },
    // Title/description reuse menu.heading and menu.sub verbatim rather
    // than composing new Sinhala sentences — see the project rule
    // against inventing Sinhala (docs/CLAUDE.md).
    menu: {
      title: 'අපි සපයන දේ | Earth Leaf',
      description: 'සෘතුමය බෝල්, පාන, සහ දිවා ආහාර පැකේජ දිනපතා නැවුම්ව සකස් කරයි.',
    },
    // Same approach: reuses gallery.heading and gallery.sub verbatim.
    events: {
      title: 'ඡායාරූප | Earth Leaf',
      description: 'අපගේ අවකාශය පිළිබඳ කෙටි දසුනක් — විශාල කර බැලීමට තට්ටු කරන්න.',
    },
  },

  skipLink: 'ප්‍රධාන අන්තර්ගතයට යන්න',

  header: {
    brandName: 'Earth Leaf',
    brandSub: 'රත්මලාන • සෞඛ්‍ය සම්පන්න දිවා ආහාර',
    brandHomeAriaLabel: 'Earth Leaf මුල් පිටුව',
    logoAlt: 'Earth Leaf ලාංඡනය',
    navOpenLabel: 'මෙනුව විවෘත කරන්න',
    // Source never translates this (main.js hardcodes English) — see
    // content/types.ts SiteContent['header']['navCloseLabel'].
    navCloseLabel: 'මෙනුව වසන්න',
    nav: [
      { href: localeRoute('si', 'events'), label: 'ඡායාරූප' },
      { href: localeRoute('si', 'menu'), label: 'අපි සපයන දේ' },
      { href: homeAnchor('si', 'visit'), label: 'අප වෙත එන්න' },
    ],
    orderCta: 'ඇණවුම් කරන්න',
    langSwitchAriaLabel: 'භාෂාව තෝරන්න',
    langCurrentLabel: '🇱🇰 සිංහල',
    otherLangLabel: 'English',
    // Source has no aria-label on this link at all — added as an
    // accessibility fix (see content/types.ts).
    otherLangAriaLabel: 'Switch to English',
    // Source leaves this untranslated on the Sinhala page too; kept
    // as-is rather than guessing an unreviewed translation.
    themeSwitchAriaLabel: 'Theme choice',
  },

  hero: {
    eyebrow: 'නැවුම් • අවංක • පෝෂ්‍යදායී',
    title: {
      lead: 'දිනපතා පිසින සෞඛ්‍ය සම්පන්න දිවා ආහාර —',
      highlight: 'කෘත්‍රිම අමුද්‍රව්‍ය නොමැතිව',
      tail: '.',
    },
    lead: 'Earth Leaf යනු රත්මලානේ පිහිටි කුඩා, මිත්‍රශීලී දිවා ආහාර ස්ථානයකි. අපි සැහැල්ලු, පිරිසිදු සහ තෘප්තිමත් බවක් දැනෙන ශ්‍රී ලාංකික ආහාර සපයමු. කොළ වර්ග, ප්‍රෝටීන් සහ රසය — අනවශ්‍ය සීනි වැඩිවීම් නොමැතිව.',
    ctaPrimary: 'අපි සපයන දේ බලන්න',
    // Owner-supplied, used verbatim. Two things worth a native-speaker
    // check: "කරපු" is the colloquial form of written "කළ", and the
    // phrase carries no noun, so it reads as a trailing "organised …"
    // rather than the English's "Events Organised".
    ctaSecondary: 'සංවිධානය කරපු',
    chipsAriaLabel: 'අපගේ ප්‍රධාන පොරොන්දු',
    chips: ['කෘත්‍රිම අමුද්‍රව්‍ය නැත', 'එකතු කළ සීනි නැත', 'අඩු පිෂ්ඨය', 'කොළ වර්ග + ප්‍රෝටීන්', 'හොඳ වටිනාකම'],
    imageAlt: 'Earth Leaf කවුන්ටරය සහ ඇතුළත',
    floatingCard: {
      title: 'රත්මලාන',
      sub: 'සෞඛ්‍ය සම්පන්න දිවා ආහාර • රැගෙන යාමට පහසුයි',
    },
  },

  gallery: {
    eyebrow: 'Earth Leaf ඇතුළත',
    heading: 'ඡායාරූප',
    sub: 'අපගේ අවකාශය පිළිබඳ කෙටි දසුනක් — විශාල කර බැලීමට තට්ටු කරන්න.',
    items: [
      { id: 'counter-2', alt: 'Earth Leaf කවුන්ටරය සහ ඇතුළත', openLabel: 'ඡායාරූපය 1 විවෘත කරන්න' },
      // Best-effort translation, not owner-supplied — see the menu
      // block's comment further down for the same caveat.
      { id: 'interior-counter', alt: 'Earth Leaf ඉදිරි කවුන්ටරය, ප්‍රදර්ශන කැබිනට්ටුව සහ වාඩිවීමේ ප්‍රදේශය', openLabel: 'ඡායාරූපය 2 විවෘත කරන්න' },
      { id: 'interior-seating', alt: 'ජනේලය අසල Earth Leaf වාඩිවීමේ ස්ථානය', openLabel: 'ඡායාරූපය 3 විවෘත කරන්න' },
    ],
    lightboxAriaLabel: 'ඡායාරූප නරඹනය',
    lightboxCloseLabel: 'වසන්න',
  },

  // Item names and category titles below are a best-effort translation
  // of the owner's English WhatsApp order-form text (2026-09-15), not
  // owner-supplied Sinhala — worth a native-speaker check, particularly
  // the drink names, which are transliterations of loanwords (e.g.
  // "ලැටේ" for "Latte") rather than translations.
  menu: {
    eyebrow: 'දිනපතා නැවුම්',
    heading: 'අපි සපයන දේ',
    sub: 'බත් වර්ග, ෆ්‍රයිඩ් රයිස්, සහ කෝපි දිනපතා නැවුම්ව සකස් කරයි.',
    cards: [
      {
        id: 'rice-curry',
        title: 'බත් සහ ව්‍යංජන (දිවා ආහාරය)',
        items: [
          { id: 'chicken-rice-curry', name: 'කුකුල් මස් බත් සහ ව්‍යංජන' },
          { id: 'fish-rice-curry', name: 'මාළු බත් සහ ව්‍යංජන' },
          { id: 'egg-rice-curry', name: 'බිත්තර බත් සහ ව්‍යංජන' },
          { id: 'vegetable-rice-curry', name: 'එළවළු බත් සහ ව්‍යංජන' },
        ],
      },
      {
        id: 'fried-rice',
        title: 'ෆ්‍රයිඩ් රයිස්',
        items: [{ id: 'fried-rice', name: 'ෆ්‍රයිඩ් රයිස්' }],
      },
      {
        id: 'hot-drinks',
        title: 'උණුසුම් කෝපි සහ පාන',
        items: [
          { id: 'espresso', name: 'එස්ප්‍රෙසෝ' },
          { id: 'americano', name: 'අමෙරිකානෝ' },
          { id: 'flat-white', name: 'ෆ්ලැට් වයිට්' },
          { id: 'cappuccino', name: 'කැපුචිනෝ' },
          { id: 'latte', name: 'ලැටේ' },
          { id: 'hot-chocolate', name: 'උණුසුම් චොකලට්' },
        ],
      },
      {
        id: 'iced-drinks',
        title: 'අයිස් සහිත සහ නැවුම්',
        items: [
          { id: 'iced-latte', name: 'අයිස් ලැටේ' },
          { id: 'iced-coffee', name: 'අයිස් කෝපි' },
          { id: 'iced-green-tea', name: 'අයිස් හරිත තේ' },
          { id: 'iced-lemon-tea', name: 'අයිස් දෙහි තේ' },
          { id: 'iced-milo', name: 'අයිස් මයිලෝ' },
        ],
      },
      {
        id: 'sweets',
        title: 'රසකැවිලි',
        items: [
          { id: 'butter-cake', name: 'බටර් කේක්' },
          { id: 'coffee-cake', name: 'කෝපි කේක්' },
          { id: 'cookie', name: 'කුකී' },
        ],
      },
      {
        id: 'snacks',
        title: 'කෙටි ආහාර',
        items: [
          { id: 'hot-dog', name: 'හොට් ඩෝග්' },
          { id: 'chicken-burger', name: 'චිකන් බර්ගර්' },
          { id: 'chicken-cheese-burger', name: 'චිකන් චීස් බර්ගර්' },
          { id: 'tuna-sandwich', name: 'ටූනා සැන්ඩ්විච්' },
        ],
      },
    ],
  },

  order: {
    eyebrow: 'පහසු දිවා ආහාර',
    heading: 'කලින් ඇණවුම් කරන්න',
    body: 'රැඳී සිටීම අඩු කරගන්න — කලින් ඇණවුම් කර දිවා ආහාර වේලාවේ ලබාගන්න.',
    ctaLabel: 'WhatsApp මඟින් ඇණවුම් කරන්න',
    // Also a best-effort translation, not owner-supplied — see the menu
    // block's comment above.
    form: {
      title: 'Earth Leaf - දැන් ඇණවුම් කරන්න',
      welcome: 'Earth Leaf වෙත සාදරයෙන් පිළිගනිමු! කරුණාකර පහත ඇණවුම සම්පූර්ණ කරන්න:',
      nameLabel: 'ඔබේ නම:',
      deliveryLabel: 'බෙදාහැරීමේ ලිපිනය / ලබාගැනීමේ වේලාව:',
    },
  },

  visit: {
    eyebrow: 'දිවා ආහාරයට අප වෙත එන්න',
    heading: 'Earth Leaf වෙත පැමිණෙන්න',
    sub: 'රත්මලාන, ශ්‍රී ලංකාව — ඉක්මන් දිවා ආහාරයක් සඳහාත් රැගෙන යාම සඳහාත් පහසුයි.',
    cards: [
      {
        kicker: '01',
        title: 'ස්ථානය',
        rows: [
          // "අත්තිඩිය පාර" (Aththidiya Road) is new; "රත්මලාන" and "කොළඹ"
          // are the source's own spellings. Worth a native-speaker check.
          { label: '57 අත්තිඩිය පාර', value: '' },
          { label: '', value: 'රත්මලාන, කොළඹ 10370' },
          { label: '', value: 'Google සිතියමේ බලන්න', href: site.mapsUrl },
        ],
      },
      {
        kicker: '02',
        title: 'විවෘත වේලාවන්',
        rows: [
          { label: 'සඳුදා–සෙනසුරාදා:', value: hoursRange },
          // "වසා ඇත" reuses the source's own "වසා ඇති" (closed).
          { label: 'ඉරිදා:', value: 'වසා ඇත' },
        ],
      },
      {
        kicker: '03',
        title: 'සම්බන්ධ වන්න',
        rows: [
          { label: 'WhatsApp:', value: site.whatsappDisplay, href: whatsappUrl },
          { label: 'ඊමේල්:', value: site.email, href: mailtoUrl },
          { label: '', value: 'Facebook', href: site.facebookUrl },
          { label: '', value: 'Instagram', href: site.instagramUrl },
        ],
      },
    ],
    callout: {
      heading: 'නිතිපතා කාර්යාල දිවා ආහාර අවශ්‍යද?',
      body: 'අසළ වැඩබිම් සඳහා නැවත නැවත ඇණවුම් හෝ කණ්ඩායම් පැකේජ ගැන විමසන්න.',
      ctaLabel: 'අප අමතන්න',
    },
  },

  footer: {
    brandName: 'Earth Leaf',
    brandSub: 'රත්මලාන • සෞඛ්‍ය සම්පන්න දිවා ආහාර',
    logoAlt: 'Earth Leaf ලාංඡනය',
    links: [
      { href: localeRoute('si', 'events'), label: 'ඡායාරූප' },
      { href: localeRoute('si', 'menu'), label: 'අපි සපයන දේ' },
      { href: homeAnchor('si', 'visit'), label: 'අප වෙත එන්න' },
    ],
    // Brand names — same as "WhatsApp" above, left untranslated.
    social: [
      { href: site.facebookUrl, label: 'Facebook' },
      { href: site.instagramUrl, label: 'Instagram' },
    ],
    copyright: (year) => `© ${year} Earth Leaf, රත්මලාන • ${site.domain}`,
    backToTop: 'ඉහළට යන්න ↑',
  },

  // New copy, not in the source — needs a native-speaker check like the
  // other owner/AI-supplied Sinhala strings in this file.
  notFound: {
    eyebrow: 'පිටුව හමු නොවීය',
    heading: 'මෙම පිටුව නොපවතී',
    body: 'සබැඳිය බිඳී ඇති හෝ පිටුව වෙනත් තැනකට ගෙන ගොස් ඇත. මුල් පිටුවට ගොස් නැවත උත්සාහ කරන්න.',
    backHomeLabel: 'මුල් පිටුවට',
  },
};
