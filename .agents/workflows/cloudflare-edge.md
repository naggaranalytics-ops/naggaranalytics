---
description: Ensure Cloudflare Edge Runtime is added to routes
---

# Cloudflare Edge Runtime Checks

This workflow ensures that any new route added to the application is compatible with Cloudflare Pages, which requires the Edge runtime for dynamic server-rendering.

1. **Identify Route Type**: Determine if the `page.tsx`, `layout.tsx`, or `route.ts` you are working on uses dynamic functions like `cookies()`, `headers()`, or server-side data fetching.
2. **Add Edge Runtime Export**: If the route is dynamic, you MUST add this exact line to the top of the file (after imports, before the component/handler definition):
   `export const runtime = 'edge';`
3. **Verify Build**: Always run `npm run lint` and verify no build warnings exist.
4. **API Routes**: ALL API routes in `app/api/` must also export this runtime to work on Cloudflare Pages.
