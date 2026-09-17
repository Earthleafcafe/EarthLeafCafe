/**
 * Locale-independent configuration: contact details, external links.
 *
 * This is the ONE file to edit for any of these facts — content/en.ts and
 * content/si.ts reference `site.*` rather than repeating them, so there is
 * exactly one place to update (docs/REACT-MIGRATION-PLAN.md §4.4).
 */
export const site = {
  /**
   * WhatsApp number in international format for wa.me links: digits only,
   * country code, no `+` and no leading zero.
   * Local form 072 111 1010 → drop the 0, prepend Sri Lanka's 94.
   */
  whatsapp: '94721111010',
  /** Human-readable form shown in the Visit section — update alongside `whatsapp`. */
  whatsappDisplay: '+94 72 111 1010',
  email: 'earthleafcafe@gmail.com',
  mapsUrl: 'https://maps.app.goo.gl/Wd9WjKsbCyMfaVsV7',
  domain: 'earthleaf.lk',
  facebookUrl: 'https://www.facebook.com/profile.php?id=615891114689',
  // The owner's link carried a `?stkn=` share token (2026-09-17) —
  // dropped here since that's a temporary sharing parameter, not part
  // of the profile's permanent address.
  instagramUrl: 'https://www.instagram.com/earth_leaf_cafe',

  /**
   * The physical address, structured for JSON-LD's PostalAddress (phase
   * 13) rather than the free-text display rows in content/{en,si}.ts's
   * `visit.cards` — those stay locale-translated ("57 Aththidiya Road"
   * vs "57 අත්තිඩිය පාර") since they're user-facing copy, while this is
   * the one canonical postal form structured data expects. Same facts,
   * different shape.
   */
  address: {
    street: '57 Aththidiya Road',
    locality: 'Ratmalana',
    postalCode: '10370',
    country: 'LK',
  },

  /**
   * Opening hours. `iso` feeds the JSON-LD openingHoursSpecification in
   * phase 13; the human-readable strings are localized in content/{en,si}.ts
   * because the day names differ per locale.
   */
  hours: {
    opens: '10:00',
    closes: '17:00',
    /** schema.org dayOfWeek values for the open days. */
    openDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    closedDays: ['Sunday'],
  },
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}`;
export const mailtoUrl = `mailto:${site.email}`;

/** Display range, e.g. "11.00 – 16.00". Locale-independent (digits only). */
export const hoursRange = `${site.hours.opens.replace(':', '.')} – ${site.hours.closes.replace(':', '.')}`;
