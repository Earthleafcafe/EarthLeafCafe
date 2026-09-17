/**
 * Now that Menu and the gallery have their own routes, a `href` in
 * content can be one of three things, and the component rendering it
 * needs a different element for each:
 *
 * | Form                  | Element                      |
 * |-----------------------|------------------------------|
 * | `/menu`, `/si/events` | react-router `<Link to>`     |
 * | `#visit`              | plain `<a href>` (anchor)    |
 * | `https://…`, `mailto:`| plain `<a href>` (external)  |
 *
 * Routing on the leading `/` keeps that decision in one place instead of
 * three, so Nav, Footer and Button can't drift apart on it. In-app
 * routes must be absolute (`/si/menu`, never `si/menu`) — a relative
 * path would resolve against the current route and silently break.
 */
export function isRouteHref(href: string): boolean {
  return href.startsWith('/');
}
