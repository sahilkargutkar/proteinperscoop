# Protein Per Scoop

Find, compare, and track the best protein supplement deals. Focus on real value: price per scoop, freshness of discount, and category insights. Open to community contributions.

---

## Key Features
- Real‑time deal aggregation (category: Protein / Health / Performance / General)
- Price, original price, discount %, freshness bar
- Per-scoop (value) oriented UI copy
- Image optimization (proxy + fallbacks)
- SEO metadata + structured data + sitemap
- Google Analytics / Tag Manager integration
- Auth (local demo: register, login, logout via localStorage)
- Extensible helper + API route patterns
- Donation (support) floating button component
- Robust fallback images and error handling

---

## Tech Stack
| Layer | Tech |
|-------|------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Fonts | next/font (Inter) |
| Images | next/image + custom proxy |
| Auth (demo) | Client context + localStorage |
| Analytics | GA4 / GTM environment variable based |
| Deployment | Vercel (optimized for) |

---

## Directory Structure (Condensed)
```
app/
  api/
    getDeals/
    getDealByCategory/
    image-proxy/
    auth/login/
    auth/register/
  category/[category]/
  components/
    card/
    donate/
    auth/
    seo/
    ui/OptimizedImage.jsx
  login/
  register/
public/
  images/ (fallback + brand svgs)
.env.example
next.config.mjs
```

---

## Getting Started (Windows)

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
git clone https://github.com/your-org/proteinperscoop.git
cd proteinperscoop
npm install
```

### Environment
Create `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # or GTM-XXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code
```
(Refer to `.env.example` for more.)

### Run Dev
```bash
npm run dev
```
Visit: http://localhost:3000

### Build / Start
```bash
npm run build
npm start
```

---

## Image Optimization
- External images routed via `/api/image-proxy`
- WebP requested when possible (width capped, quality tuned)
- Fallback SVG served when errors occur
- Local assets bypass proxy

---

## Auth (Demo Only)
- Client-side context (`AuthProvider`)
- Persists simple token + email in `localStorage`
- Replace with real backend (JWT / sessions) before production
- Forms: `/login`, `/register`
- Logout available via `useAuth().logout`

---

## Analytics
- GA4 / GTM loaded if `NEXT_PUBLIC_GA_ID` present
- Automatic page view tracking
- Custom events (deal click, category view, donation)

---

## SEO
- `generateMetadata` on category pages
- Structured data component (`StructuredData`)
- Robots + sitemap + Open Graph + canonical URLs

---

## Contributing

### Workflow
1. Fork repo
2. Create feature branch: `feat/short-description`
3. Commit (conventional commits): `feat(card): add rating hover`
4. Open PR (link related issue)

### Issues
- Bug report: steps to reproduce + expected vs actual + screenshots
- Feature request: problem → proposed solution → alternatives
- Security: email (replace with contact) do not open public issue

### Code Style
- Prefer functional components
- Keep components small & composable
- Use hooks over class patterns
- No inline `await` in client component bodies (only in effects or server)
- Prefer descriptive alt text on images

### Testing (Future)
- Planned: Jest + React Testing Library
- Priority: helpers, category data transformation, image proxy edge cases

---

## Roadmap (High-Level)
- Real persistent auth (JWT or session cookies)
- User deal alerts (email/push)
- Per-scoop calculator enhancements
- Brand / ingredient filters
- Admin dashboard for deal ingestion QA
- Mobile app (React Native / Expo)
- Multi-region currency support
- Accessibility audit (WCAG compliance)
- Automated visual regression

---

## Security Notes
Current auth & proxy layers are demo-grade. Before production:
- Add rate limiting
- Sanitize and validate all external URLs
- Use secure httpOnly cookies for auth
- Implement CSRF protections on mutating endpoints

---

## License
MIT. See `LICENSE` (add if missing).

---

## How to Propose a Deal Source
Open an issue with:
- Source URL
- API or scraping feasibility
- Update frequency
- Typical discount value

---

## Maintainer Guidelines
- Keep bundle size lean (warn > 300KB first load)
- Monitor Lighthouse / Web Vitals
- Avoid vendor lock in without justification

---

## Quick Scripts
```bash
npm run dev      # start development
npm run build    # production build
npm run lint     # (add ESLint config if missing)
```

---

## Questions / Support
Open an issue or start a discussion thread. PRs welcome.

---

Scoop more, spend less. Contributions make the platform stronger. Thanks.
