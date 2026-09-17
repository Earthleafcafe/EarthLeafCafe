import { site, whatsappUrl, mailtoUrl, hoursRange } from '../config/site';
import { homeAnchor, localeRoute } from '../lib/routes';
import type { SiteContent } from './types';

export const en: SiteContent = {
  meta: {
    home: {
      title: 'Earth Leaf | Healthy Lunch in Ratmalana',
      description:
        'Earth Leaf (Ratmalana) — healthy Sri Lankan lunch bowls made fresh with no artificial ingredients and no added sugar.',
    },
    menu: {
      title: 'Menu | Earth Leaf',
      description:
        'Seasonal bowls, drinks, and lunch packs made fresh each day at Earth Leaf in Ratmalana — no artificial ingredients, no added sugar.',
    },
    events: {
      title: 'Photos | Earth Leaf',
      description: 'A look inside Earth Leaf in Ratmalana — tap any photo to enlarge.',
    },
  },

  skipLink: 'Skip to content',

  header: {
    brandName: 'Earth Leaf',
    brandSub: 'Ratmalana • Healthy Lunch',
    brandHomeAriaLabel: 'Earth Leaf home',
    logoAlt: 'Earth Leaf logo',
    navOpenLabel: 'Open menu',
    navCloseLabel: 'Close menu',
    nav: [
      { href: localeRoute('en', 'events'), label: 'Photos' },
      { href: localeRoute('en', 'menu'), label: 'What we serve' },
      { href: homeAnchor('en', 'visit'), label: 'Visit' },
    ],
    orderCta: 'Order',
    langSwitchAriaLabel: 'Language choice',
    langCurrentLabel: 'EN',
    otherLangLabel: 'සිංහල',
    otherLangAriaLabel: 'සිංහල භාෂාවට මාරු වන්න',
    themeSwitchAriaLabel: 'Theme choice',
  },

  hero: {
    eyebrow: 'Fresh • Honest • Filling',
    title: {
      lead: 'Healthy lunch, cooked daily —',
      highlight: 'no artificial ingredients',
      tail: '.',
    },
    lead: 'Earth Leaf is a small, friendly lunch spot in Ratmalana serving Sri Lankan meals designed to feel light, clean and satisfying. Think greens, proteins, and flavour — without the sugar spikes.',
    ctaPrimary: 'See what we serve',
    // Owner supplied "Event's Organised"; the apostrophe is corrected here
    // (plural, not possessive) since this is public-facing copy.
    ctaSecondary: 'Events Organised',
    chipsAriaLabel: 'Key promises',
    chips: ['No artificial ingredients', 'No added sugar', 'Less starch', 'Greens + proteins', 'Great value'],
    imageAlt: 'Earth Leaf counter area and interior',
    floatingCard: {
      title: 'Ratmalana',
      sub: 'Healthy lunch • takeaway-friendly',
    },
  },

  gallery: {
    eyebrow: 'Inside Earth Leaf',
    heading: 'Photos',
    sub: 'A quick peek at the space (tap to enlarge).',
    items: [
      { id: 'counter-2', alt: 'Earth Leaf counter area and interior', openLabel: 'Open photo 1' },
      { id: 'interior-counter', alt: 'Earth Leaf front counter, display case, and seating area', openLabel: 'Open photo 2' },
      { id: 'interior-seating', alt: 'Earth Leaf seating nook by the window', openLabel: 'Open photo 3' },
    ],
    lightboxAriaLabel: 'Image viewer',
    lightboxCloseLabel: 'Close',
  },

  menu: {
    eyebrow: 'Fresh every day',
    heading: 'What we serve',
    sub: 'Rice & curry, fried rice, and coffee — made fresh each day.',
    cards: [
      {
        id: 'rice-curry',
        title: 'Rice & Curry (Lunch)',
        items: [
          { id: 'chicken-rice-curry', name: 'Chicken Rice & Curry' },
          { id: 'fish-rice-curry', name: 'Fish Rice & Curry' },
          { id: 'egg-rice-curry', name: 'Egg Rice & Curry' },
          { id: 'vegetable-rice-curry', name: 'Vegetable Rice & Curry' },
        ],
      },
      {
        id: 'fried-rice',
        title: 'Fried Rice',
        items: [{ id: 'fried-rice', name: 'Fried Rice' }],
      },
      {
        id: 'hot-drinks',
        title: 'Hot Coffee & Drinks',
        items: [
          { id: 'espresso', name: 'Espresso' },
          { id: 'americano', name: 'Americano' },
          { id: 'flat-white', name: 'Flat White' },
          { id: 'cappuccino', name: 'Cappuccino' },
          { id: 'latte', name: 'Latte' },
          { id: 'hot-chocolate', name: 'Hot Chocolate' },
        ],
      },
      {
        id: 'iced-drinks',
        title: 'Iced & Refreshing',
        items: [
          { id: 'iced-latte', name: 'Iced Latte' },
          { id: 'iced-coffee', name: 'Iced Coffee' },
          { id: 'iced-green-tea', name: 'Iced Green Tea' },
          { id: 'iced-lemon-tea', name: 'Iced Lemon Tea' },
          { id: 'iced-milo', name: 'Iced Milo' },
        ],
      },
      {
        id: 'sweets',
        title: 'Sweets',
        items: [
          { id: 'butter-cake', name: 'Butter Cake' },
          { id: 'coffee-cake', name: 'Coffee Cake' },
          { id: 'cookie', name: 'Cookie' },
        ],
      },
      {
        id: 'snacks',
        title: 'Snacks',
        items: [
          { id: 'hot-dog', name: 'Hot Dog' },
          { id: 'chicken-burger', name: 'Chicken Burger' },
          { id: 'chicken-cheese-burger', name: 'Chicken Cheese Burger' },
          { id: 'tuna-sandwich', name: 'Tuna Sandwich' },
        ],
      },
    ],
  },

  order: {
    eyebrow: 'Easy lunch',
    heading: 'Order ahead',
    body: 'Skip the wait — pre-order and pick up at lunch time.',
    ctaLabel: 'WhatsApp order',
    form: {
      title: 'Earth Leaf - Order Now',
      welcome: 'Welcome to Earth Leaf! Please fill out your order below:',
      nameLabel: 'Your Name:',
      deliveryLabel: 'Delivery Address / Pickup Time:',
    },
  },

  visit: {
    eyebrow: 'Come by for lunch',
    heading: 'Visit Earth Leaf',
    sub: 'Ratmalana, Sri Lanka — quick lunch stop, takeaway-friendly.',
    cards: [
      {
        kicker: '01',
        title: 'Location',
        rows: [
          { label: '57 Aththidiya Road', value: '' },
          { label: '', value: 'Ratmalana, Colombo 10370' },
          { label: '', value: 'View on Google Maps', href: site.mapsUrl },
        ],
      },
      {
        kicker: '02',
        title: 'Hours',
        rows: [
          { label: 'Mon–Sat:', value: hoursRange },
          { label: 'Sun:', value: 'Closed' },
        ],
      },
      {
        kicker: '03',
        title: 'Contact',
        rows: [
          { label: 'WhatsApp:', value: site.whatsappDisplay, href: whatsappUrl },
          { label: 'Email:', value: site.email, href: mailtoUrl },
          { label: '', value: 'Facebook', href: site.facebookUrl },
          { label: '', value: 'Instagram', href: site.instagramUrl },
        ],
      },
    ],
    callout: {
      heading: 'Need regular office lunches?',
      body: 'Ask about recurring orders or team lunch packs for nearby workplaces.',
      ctaLabel: 'Get in touch',
    },
  },

  footer: {
    brandName: 'Earth Leaf',
    brandSub: 'Ratmalana • Healthy Lunch',
    logoAlt: 'Earth Leaf logo',
    links: [
      { href: localeRoute('en', 'events'), label: 'Photos' },
      { href: localeRoute('en', 'menu'), label: 'What we serve' },
      { href: homeAnchor('en', 'visit'), label: 'Visit' },
    ],
    social: [
      { href: site.facebookUrl, label: 'Facebook' },
      { href: site.instagramUrl, label: 'Instagram' },
    ],
    copyright: (year) => `© ${year} Earth Leaf, Ratmalana • ${site.domain}`,
    backToTop: 'Back to top ↑',
  },

  notFound: {
    eyebrow: 'Page not found',
    heading: "This page doesn't exist",
    body: 'The link may be broken, or the page may have moved. Head back to the homepage to find your way.',
    backHomeLabel: 'Back to homepage',
  },
};
