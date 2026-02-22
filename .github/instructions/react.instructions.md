---
description: "React 18, TypeScript, and Vite frontend conventions"
applyTo: "frontend/**"
---

# React Frontend Conventions

## Runtime

- React 18.x with TypeScript (strict mode enabled)
- Vite as the build tool

## Vite Configuration

- `vite.config.ts` must set `server.port: 3000`
- Configure `server.proxy` to forward `/api` requests to `http://localhost:8080`

## Component Architecture

- Functional components with hooks only — no class components
- State management: React hooks (`useState`, `useEffect`, `useContext`) — no Redux
- Routing: `react-router-dom` v6 with `<BrowserRouter>`
- HTTP client: axios with a shared instance configured with the base URL

## Internationalization

- Use `i18next` and `react-i18next` for bilingual support
- Maintain English (`en.json`) and French (`fr.json`) translation files in `frontend/src/locales/`
- All user-facing text must use translation keys, never hardcoded strings

## UI Framework

- Apply [Ontario Design System](https://designsystem.ontario.ca/) CSS classes for all components
- Follow the Ontario.ca visual identity for layout, typography, and color

## Accessibility (WCAG 2.2 Level AA)

- Use `aria-*` attributes on interactive elements
- Use semantic HTML elements: `<main>`, `<nav>`, `<header>`, `<footer>`, `<form>`, `<section>`
- Ensure full keyboard navigation support
- Set the `lang` attribute on `<html>` and update it when the language changes
- Provide visible focus indicators on all interactive elements

## Project Structure

- `frontend/src/components/` — shared/reusable components
- `frontend/src/pages/` — route-level page components
- `frontend/src/locales/` — translation JSON files
- `frontend/src/services/` — API service modules

## Testing

- Vitest as the test runner
- React Testing Library for component tests
- Test files co-located with components using `.test.tsx` suffix

## Linting

- ESLint with TypeScript rules
- Prettier for code formatting
