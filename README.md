# Superadmin Control Center - Multi-Tenant Student Counseling & Cognitive Profiling Platform

An enterprise-grade, high-security Superadmin Control Center built with **Next.js 14**, **Tailwind CSS**, **Node.js / Express**, and **PostgreSQL (Prisma ORM)**.

Designed for multi-tenant K-12 institutional oversight, cognitive profiling calibration (CHC factor scoring), CBT chatbot safety guardrails, and real-time distress safety escalations.

---

## 🌟 Key Features

- **6 KPI Metric Cards**: Total Schools, Active Students, Active Teachers, Active Subscriptions, Monthly Revenue, and AI Sessions with dynamic SVG micro-sparklines.
- **Visual Growth Analytics**: Multi-line area chart tracking platform expansion across **7D**, **30D**, and **1Y** time horizons.
- **Subscription License Donut Gauge**: Real-time visualization of active paid licenses vs. pending renewals.
- **Multi-Tenant School Provisioning**: Institutional tenant management with student limits and instant activation/suspension toggles.
- **Woodcock-Johnson / CHC Cognitive Studio**: Interactive scoring weight calibrator for Fluid Reasoning ($G_f$), Visual-Spatial ($G_v$), Working Memory ($G_{wm}$), and Processing Speed ($G_s$).
- **CBT AI Safety Guardrails**: Guardrail threshold controls, system prompt template editor, and distress trigger keywords.
- **FERPA & COPPA Immutable Audit Trail**: Detailed access logs with actor emails, roles, IP addresses, categories, and timestamps.
- **Real-Time Safety & Crisis Feed**: High-distress chatbot trigger monitor with manual Superadmin override controls.

---

## 🔒 Security Architecture & RBAC

- **Strict Middleware Protection**: Only users with `role === 'SUPERADMIN'` can access `/api/v1/superadmin/*` endpoints (returns `403 Forbidden` for unauthorized requests).
- **Tenant Isolation**: Strict `school_id` scoping for standard tenants with cross-tenant Superadmin oversight.
- **HTTP Security Headers**: Enforces HSTS, Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and Referrer Policy via `next.config.js` and `helmet`.
- **Secret Management**: Environment variables isolated via `.env` (excluded from Git).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.x or higher)
- npm or yarn
- PostgreSQL Database

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/student-counseling-superadmin.git
cd student-counseling-superadmin
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/counseling_db?schema=public"
JWT_SECRET="your_secure_jwt_secret_here"
SUPERADMIN_API_KEY="your_superadmin_api_key_here"
CORS_ORIGIN="http://localhost:3000"
```

### 4. Running locally

#### Start Frontend (Next.js Dashboard)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Start Backend Engine (Node / Express API)
In a separate terminal window:
```bash
npm run server
```
Express API will listen at [http://localhost:5000](http://localhost:5000).

#### Database Schema Generation (Prisma)
```bash
npx prisma generate
```

---

## 📁 Repository Structure

```
├── app/
│   ├── layout.tsx         # Next.js Root Layout with metadata & hydration safety
│   ├── page.tsx           # Complete Superadmin Control Center UI & Modules
│   └── globals.css        # Tailwind CSS directives & sparkline animations
├── prisma/
│   └── schema.prisma      # Multi-tenant PostgreSQL database models & relations
├── server/
│   ├── index.js           # Express app entry point with Helmet & CORS security
│   ├── middleware/
│   │   └── requireSuperadmin.js  # RBAC & secret authorization middleware
│   └── routes/
│       └── superadmin.js  # Protected Superadmin API endpoint router
├── .env.example           # Environment template (secrets omitted)
├── .gitignore              # Git ignore rules for node_modules, .env & .next
├── next.config.js         # Security headers & Next.js config
├── package.json           # Dependencies and run scripts
└── tailwind.config.js     # Design system tokens and custom shadows
```

---

## 📜 License
This project is licensed under the MIT License.
