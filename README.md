# EduManage – Enterprise School ERP Platform

<div align="center">

![EduManage Banner](docs/assets/banner.png)

**The Intelligent School ERP Platform for Modern Educational Institutions**

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Demo](#demo) • [Documentation](#documentation) • [Features](#features) • [Getting Started](#getting-started)

</div>

---

## 📋 Overview

EduManage is an enterprise-grade School ERP (Enterprise Resource Planning) platform designed to streamline educational institution management through automation, data-driven insights, and modern cloud-native architecture.

### Key Highlights

- 🎯 **Conversion-Optimized Landing Page** - Enterprise SaaS layout with strategic CTAs
- 🏗️ **Component-Driven Architecture** - Atomic design pattern with reusable components
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Performance Optimized** - Lighthouse score 90+
- 🔒 **Security First** - Form validation, CSRF protection, secure API endpoints
- ♿ **Accessible** - WCAG 2.1 AA compliant

---

## 🚀 Features

### Core Modules

| Module | Description |
|--------|-------------|
| 👥 **Student Information System** | Comprehensive student data management |
| 📅 **Attendance & Timetable** | Automated scheduling and tracking |
| 📝 **Exams & Gradebook** | Grade management and report generation |
| 💰 **Fees & Finance Management** | Complete financial operations |
| 👔 **HR & Payroll** | Staff management and payroll processing |
| 🔗 **Parent & Teacher Portal** | Real-time communication platform |
| 🔔 **Real-time Notifications** | Instant alerts and updates |
| 📊 **Analytics Dashboard** | Data-driven insights and reporting |

### Enterprise Benefits

- ☁️ Cloud-native architecture with 99.9% uptime SLA
- 🔒 Secure data encryption (AES-256)
- 👥 Role-based permissions and access control
- 🏫 Multi-campus support
- 📈 Scalable infrastructure with auto-scaling

---

## 🏗️ Technical Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18+ | UI Framework |
| Next.js 14+ | Full-Stack Framework (App Router) |
| TypeScript | Type Safety |
| Tailwind CSS | Utility-First Styling |
| ShadCN UI | Component Library |
| Framer Motion | Animations |
| React Hook Form | Form Management |
| Zod | Schema Validation |

### Backend (Recommended)

| Technology | Purpose |
|------------|---------|
| Node.js 20+ | Runtime Environment |
| Express / NestJS | API Framework |
| PostgreSQL | Primary Database |
| Prisma ORM | Database ORM |
| JWT | Authentication |

### DevOps

- 🐳 Docker containerization
- 🔄 CI/CD ready structure
- 🔐 Environment variable management
- ⚡ Production-ready build optimization

---

## 📁 Project Structure

```
edumanage/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (marketing)/              # Marketing pages
│   ├── (dashboard)/              # Protected dashboard
│   ├── api/                      # API routes
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── ui/                       # ShadCN UI components
│   ├── features/                 # Feature components
│   ├── layouts/                  # Layout components
│   └── shared/                   # Shared components
│
├── features/                     # Feature modules
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and helpers
├── services/                     # API services
├── types/                        # TypeScript definitions
├── styles/                       # Global styles
│
├── docs/                         # Documentation
│   ├── TECHNICAL_SPECIFICATION.md
│   ├── ARCHITECTURE.md
│   └── COMPONENT_GUIDELINES.md
│
└── public/                       # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/edumanage.git
   cd edumanage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---

## 📖 Documentation

- [Technical Specification](docs/TECHNICAL_SPECIFICATION.md) - Complete technical requirements
- [Architecture Guide](docs/ARCHITECTURE.md) - System architecture overview
- [Component Guidelines](docs/COMPONENT_GUIDELINES.md) - Component development standards

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#4f46e5` | Brand, CTAs, Links |
| Primary Light | `#6366f1` | Hover states |
| Background | `#f8fafc` | Page backgrounds |
| Text | `#0f172a` | Primary text |
| Muted | `#64748b` | Secondary text |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 800 weight
- **Body**: 400 weight
- **Code**: JetBrains Mono

---

## 🌐 Website Sections

### Navigation Structure

```
├── Product
│   ├── Feature Tour
│   ├── Modules Overview
│   ├── Multi-School Management
│   ├── Integrations
│   ├── Mobile App
│   └── Security & Compliance
├── Partner
│   ├── Why Partner with EduManage
│   ├── OEM Program
│   └── Affiliate Program
├── Pricing
│   ├── Plan Comparison
│   └── FAQ
├── Resources
│   ├── Blog
│   ├── Case Studies
│   ├── eBooks
│   └── Documentation
├── About
│   ├── Our Story
│   ├── Leadership Team
│   ├── Careers
│   └── Press & Media
└── Contact
    ├── Contact Form
    ├── Sales Inquiry
    └── Support
```

### Landing Page Sections

1. **Hero Section** - Primary conversion point
2. **Core Features** - Modular feature cards
3. **Enterprise Benefits** - Key differentiators
4. **Social Proof** - Testimonials and statistics
5. **Integrations** - Third-party connections
6. **Pricing** - Plan comparison table
7. **Final CTA** - Conversion-focused closing

---

## 🔒 Security

- Form validation with Zod schemas
- CSRF protection implementation
- XSS prevention
- Secure token storage
- Rate limiting (backend)
- Input sanitization

---

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- Full keyboard navigation
- Screen reader support
- Color contrast compliance (4.5:1 minimum)

---

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.8s |
| Cumulative Layout Shift | < 0.1 |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- 📧 Email: support@edumanage.com
- 📚 Documentation: [docs.edumanage.com](https://docs.edumanage.com)
- 💬 Discord: [Join our community](https://discord.gg/edumanage)

---

<div align="center">

**Built with ❤️ by the EduManage Team**

[⬆ Back to Top](#edumanage--enterprise-school-erp-platform)

</div>
