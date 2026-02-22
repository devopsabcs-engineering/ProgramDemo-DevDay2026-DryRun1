# OPS Program Approval System

## Project Overview

This is a full-stack web application for Ontario citizens to submit program requests and Ministry employees to review them. Built as a live GitHub Copilot demo for OPS Developer Day 2026.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Backend | Java 21 + Spring Boot 3.x |
| Database | Azure SQL |
| Hosting | Azure App Services |
| CI/CD | GitHub Actions |
| Security | GitHub Advanced Security (Dependabot, Secret Scanning) |
| Project Management | Azure DevOps |

## Bilingual Requirement

All user-facing text must be available in English and French using `i18next` and `react-i18next`. Translation files are stored as JSON in `frontend/src/locales/`.

## Accessibility

All screens must meet [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA compliance. Use semantic HTML, `aria-*` attributes, keyboard navigation, and set the `lang` attribute on `<html>`.

## UI Framework

Follow the [Ontario Design System](https://designsystem.ontario.ca/) for all user interface components.

## Commit Message Format

Use the ADO work item ID in every commit message:

```text
AB#{id} descriptive message
```

## Branch Naming

Create a feature branch from `main` for each user story:

```text
feature/{id}-description
```

## Pull Request Body

Include this line in every PR body to auto-close the linked ADO work item:

```text
Fixes AB#{id}
```

## Azure DevOps

- Organization: `MngEnvMCAP675646`
- Project: `ProgramDemo-DevDay2026-DryRun1`

## Azure

- Resource Group: `rg-dev-125`

## Repository Structure

- `backend/` — Java 21 + Spring Boot 3.x API
- `frontend/` — React 18 + TypeScript + Vite application
- `database/` — Flyway SQL migration scripts

## CI Test Reporting

All CI workflows must publish test results to the GitHub Actions workflow summary using `dorny/test-reporter@v1` with `java-junit` reporter. Each test job must include a reporting step with `if: always()` so results appear even when tests fail. Report names must follow `{Layer} Test Results` (for example, `Backend Test Results`, `Frontend Test Results`). Vitest must output JUnit XML via the `junit` reporter configured in `vitest.config.ts`.
