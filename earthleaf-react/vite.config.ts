import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed at https://earthleafcafe.github.io/EarthLeafCafe/ (a GitHub
// Pages *project* page, not a custom domain or a user/org root page) --
// every asset reference needs this prefix or it 404s against the domain
// root instead. See content/assets.ts and content/menu.ts, which read
// this back via import.meta.env.BASE_URL, and entry-client.tsx /
// entry-server.tsx's Router `basename`. Revert to '/' if this ever
// moves to a custom domain or a user/org root page instead.
export default defineConfig({
  base: '/EarthLeafCafe/',
  plugins: [react()],
})
