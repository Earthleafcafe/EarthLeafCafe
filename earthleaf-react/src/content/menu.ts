/**
 * The menu's structure and prices — locale-independent, matched to
 * content/{en,si}.ts's translated item names by `id` the same way
 * content/assets.ts's gallery items are matched by `id` (see that
 * file's comment).
 *
 * `image` is left unset per item until a real food photo is supplied;
 * components/sections/Menu/Menu.tsx only renders an item's image when
 * one is present, so cards render text-only until then. Photos live
 * under public/assets/menu/<item-id>/, per CLAUDE.md's documented
 * layout — one folder per item, ready for phase 17's eventual
 * exactly-2-photos-per-item design, even though only one file
 * (`01.jpg`) is actually referenced today.
 *
 * ⚠️ These are owner photos at roughly camera resolution (960–1600px
 * wide — the vegetable-rice-curry original was 2832×3396 / 4.5MB and
 * was downsized to 1600px here purely to match its siblings' scale, not
 * as real responsive sizing). Real responsive sizing (srcset, multiple
 * widths) is phase 12's job, not fixed here.
 *
 * Prices are the owner's own WhatsApp order-form text, 2026-09-15,
 * except vegetable-rice-curry (Rs. 400, added 2026-09-17 once its photo
 * was supplied), the hot/iced drinks section (repriced in full plus a
 * new iced-milo item, 2026-09-18), and the sweets/snacks categories
 * (new, 2026-09-18).
 */

// Same import.meta.env.BASE_URL reasoning as content/assets.ts's `path` helper.
const menuPhoto = (itemId: string, file: string) => `${import.meta.env.BASE_URL}assets/menu/${itemId}/${file}`;

export interface MenuConfigItem {
  id: string;
  /** Price in LKR. */
  price: number;
  image?: string;
}

export interface MenuConfigCategory {
  id: string;
  /** Emoji icon — not translated, so it lives here rather than content/{en,si}.ts. */
  icon: string;
  items: MenuConfigItem[];
}

export const menu: MenuConfigCategory[] = [
  {
    id: 'rice-curry',
    icon: '🍲',
    items: [
      { id: 'chicken-rice-curry', price: 600, image: menuPhoto('chicken-rice-curry', '01.jpg') },
      { id: 'fish-rice-curry', price: 600 },
      { id: 'egg-rice-curry', price: 500, image: menuPhoto('egg-rice-curry', '01.jpg') },
      { id: 'vegetable-rice-curry', price: 400, image: menuPhoto('vegetable-rice-curry', '01.jpg') },
    ],
  },
  {
    id: 'fried-rice',
    icon: '🍳',
    items: [{ id: 'fried-rice', price: 800 }],
  },
  {
    id: 'hot-drinks',
    icon: '☕',
    items: [
      { id: 'espresso', price: 450 },
      { id: 'americano', price: 500 },
      { id: 'flat-white', price: 450 },
      { id: 'cappuccino', price: 600 },
      { id: 'latte', price: 700 },
      { id: 'hot-chocolate', price: 450 },
    ],
  },
  {
    id: 'iced-drinks',
    icon: '🥤',
    items: [
      { id: 'iced-latte', price: 700 },
      { id: 'iced-coffee', price: 500 },
      { id: 'iced-green-tea', price: 300 },
      { id: 'iced-lemon-tea', price: 300 },
      { id: 'iced-milo', price: 450 },
    ],
  },
  {
    id: 'sweets',
    icon: '🍰',
    items: [
      { id: 'butter-cake', price: 150 },
      { id: 'coffee-cake', price: 180 },
      { id: 'cookie', price: 25 },
    ],
  },
  {
    id: 'snacks',
    icon: '🍔',
    items: [
      { id: 'hot-dog', price: 300 },
      { id: 'chicken-burger', price: 450 },
      { id: 'chicken-cheese-burger', price: 500 },
      { id: 'tuna-sandwich', price: 200 },
    ],
  },
];

export function formatPrice(price: number): string {
  return `Rs. ${price}`;
}
