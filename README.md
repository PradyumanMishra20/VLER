# VELR — Premium Streetwear Ecommerce

Contemporary streetwear focused on layered silhouettes, neutral palettes, and functional construction.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **shadcn/ui** (Radix primitives)
- **Zustand** (cart state, persisted)
- **Stripe** (checkout-ready)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Stripe

Copy `.env.example` to `.env.local` and add your Stripe publishable key.

### Promo Codes

- `VELR10` — 10% off
- `ARCHIVE15` — 15% off

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, drops, lookbook preview, philosophy |
| `/shop` | Product catalog with filters & pagination |
| `/product/[slug]` | Product detail with gallery & variants |
| `/collections` | Seasonal collection editorials |
| `/lookbook` | Fullscreen editorial lookbook |
| `/journal` | Editorial articles (SEO) |
| `/about` | Brand story |
| `/contact` | Contact form |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/account` | User dashboard |
| `/admin` | Admin dashboard |

## Brand

**VELR** — Clothing designed around form, movement, and long-term wearability rather than trend cycles.
