# Pedro Moratelli - Personal Portfolio & Blog

A modern, performant portfolio website built with React 19, TypeScript, and Vite. Features a multilingual blog platform with markdown support, syntax highlighting, and tag-based filtering.

🔗 **Live Site:** [pedromoratelli.com](https://pedromoratelli.com)

## Tech Stack & Architecture

### Core Technologies

- **React 19.2** with TypeScript 5.9 for type-safe component development
- **Vite 7.2** for blazing-fast builds and HMR
- **React Router Dom** for client-side routing with SPA support
- **Sass/SCSS** with custom mixins for maintainable styling

### Key Features

- **Internationalization (i18n):** Multi-language support (EN/PT-BR/FR-CA) using i18next with browser language detection
- **Blog Platform:** Markdown-based blog with frontmatter, syntax highlighting (Prism), and tag filtering
- **State Management:** Jotai for lightweight atomic state management
- **Analytics:** Vercel Analytics & Speed Insights for performance monitoring
- **CI/CD:** GitHub Actions pipeline with linting, formatting, type-checking, and security audits

### Architecture Highlights

**Custom Markdown Parser**

- Browser-compatible frontmatter parser (no Node.js dependencies)
- Dynamic markdown imports using Vite's `import.meta.glob`
- Type-safe blog post metadata with TypeScript interfaces

**Reusable Component Patterns**

- Atomic design with shared mixins (`tag-button`, `link-blue`, `text-gradient`)
- Context-aware styling (parent-controlled component variants)
- Responsive design with mobile-first breakpoints

**Code Quality**

- ESLint + Prettier with organized imports and strict type checking
- GitHub Actions CI running on every PR (lint, format, type-check, build, security audit)
- React Compiler enabled for automatic optimization

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/moratelli/site.git
cd site

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Blog/           # Blog-specific components
│   ├── Footer/         # Site footer
│   ├── Introduction/   # Hero section
│   ├── MyJourney/      # Timeline components
│   ├── Skills/         # Skills showcase
│   └── ...
├── content/blog/       # Markdown blog posts (EN/PT-BR)
├── i18n/              # Translation files
├── css/               # Global styles and mixins
├── types/             # TypeScript type definitions
└── utils/             # Utility functions (markdown parser, etc.)
```

## Blog System

The blog platform supports:

- **Frontmatter metadata** (title, date, tags, description)
- **Syntax highlighting** for code blocks (Prism theme)
- **Tag-based filtering** with URL state management
- **GitHub Flavored Markdown** (tables, strikethrough, etc.)
- **Multi-language content** with automatic routing

### Adding a Blog Post

Create a new `.md` file in `src/content/blog/en/` (or `pt_BR/`):

```markdown
---
title: 'Your Post Title'
date: '2025-11-24'
tags: ['react', 'typescript']
description: 'Brief description for SEO'
---

Your markdown content here...
```

## Deployment

The site is deployed on Vercel with automatic deployments from the `master` branch.

**SPA Routing Configuration:** The `vercel.json` file includes rewrites to ensure client-side routing works correctly for direct URL access.

## Contributing

While this is primarily a personal portfolio, I welcome feedback and suggestions! Please open an issue to discuss potential improvements.

**Note:** All PRs require review and approval before merging (see branch protection rules).

## License

MIT License - Feel free to reference the code structure and patterns, but please don't copy the content verbatim.

---

Built with ❤️ by [Pedro Moratelli](https://pedromoratelli.com) | [LinkedIn](https://www.linkedin.com/in/pedromoratelli) | [GitHub](https://github.com/moratelli)
