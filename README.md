# Bazzan Essentials

Full-stack Nigerian e-commerce store built with **Bun**, **Next.js 16**, **Tailwind CSS v4**, **MongoDB**.

## Quick Start

```bash
# 1. Install
bun install

# 2. Configure
cp .env.local.example .env.local
# Edit .env.local with your MongoDB URI

# 3. Run
bun dev

# 4. Seed database
# Visit http://localhost:3000/api/seed
```

## Routes

### Store
- `/` — Homepage (hero, categories, featured products)
- `/shop` — All products with filters & search
- `/shop?category=Kitchen` — Category filter
- `/product/[slug]` — Product detail
- `/cart` — Cart + checkout

### Admin (default login: admin / bazzan2024)
- `/admin/login` — Login
- `/admin` — Dashboard with stats
- `/admin/products` — Manage products
- `/admin/products/new` — Add product
- `/admin/products/edit/[id]` — Edit product
- `/admin/orders` — Manage orders + update status

## Stack
- Runtime: Bun
- Framework: Next.js 16 App Router (JavaScript)
- Styling: Tailwind CSS v4
- Database: MongoDB + Mongoose
- Auth: JWT via httpOnly cookies
# quince-s-hub
