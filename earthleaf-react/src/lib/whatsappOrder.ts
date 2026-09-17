import { site } from '../config/site';
import { formatPrice, menu } from '../content/menu';
import type { SiteContent } from '../content/types';

/**
 * The pre-filled `wa.me` order link OrderBand's button uses: a checkbox
 * line per menu item (name from content.menu, price from content/menu.ts,
 * matched by `id`) grouped under each category, followed by name/delivery
 * prompts — the same shape as the owner's own WhatsApp order-form text
 * (2026-09-15), rebuilt from content instead of hardcoded so it stays in
 * sync with the Menu page.
 */
export function buildWhatsappOrderUrl(content: SiteContent): string {
  const { form } = content.order;
  const lines: string[] = [`*✨ ${form.title} ✨*`, '', form.welcome];

  for (const card of content.menu.cards) {
    const category = menu.find((c) => c.id === card.id);
    if (!category) continue;

    lines.push('', `*${category.icon} ${card.title.toUpperCase()}*`);

    for (const item of card.items) {
      const configItem = category.items.find((i) => i.id === item.id);
      if (!configItem) continue;
      lines.push(`[  ] ${item.name} - ${formatPrice(configItem.price)}`);
    }
  }

  lines.push('', `*👤 ${form.nameLabel}* `, `*📍 ${form.deliveryLabel}* `);

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
