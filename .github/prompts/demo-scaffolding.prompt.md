---
description: "Researches all scaffolding files needed for the 130-minute OPS GitHub Copilot demo — produces a comprehensive research document for implementation planning"
agent: Task Researcher
argument-hint: "topic=demo-scaffolding"
---

# Demo Scaffolding Research

## Inputs

* ${input:topic:demo-scaffolding}: Primary research topic — scaffolding files for the OPS Developer Day 2026 demo.

## Context

This research supports a **130-minute live demo** for the Ontario Public Sector (Developer Day 2026 — Dry Run 1) showcasing GitHub Copilot building a full-stack Program Approval web application from scratch.

### Starting State

Only two files exist in the repository when the demo begins:

1. `README.md` — the single source of truth for the business problem and tech stack.
2. `.github/prompts/bootstrap-demo.prompt.md` — the prompt that generated these scaffolding prompts.

**Nothing else exists** — no code, no documentation, no configuration files, no scripts, and **no ADO work items** (no Epic, no Features, no User Stories). All must be created during the demo.

### Key References

* **Azure**: Resources pre-deployed in resource group `rg-dev-125`
* **ADO**: Organization `MngEnvMCAP675646`, Project `ProgramDemo-DevDay2026-DryRun1`
* **Application**: OPS Program Approval System as defined in `README.md`

## Requirements

Read `README.md` and produce a comprehensive research document in `.copilot-tracking/research/` covering every scaffolding file listed below. Each section must contain enough detail that `/task-plan` can produce a file-by-file implementation plan without further clarification.

### Files to Research

#### Configuration Layer (7 files)

| File | Purpose |
|------|---------|
| `.gitignore` | Java + Node + IDE + OS ignore rules |
| `.vscode/mcp.json` | ADO MCP server config — `npx -y azure-devops-mcp --organization MngEnvMCAP675646 --project ProgramDemo-DevDay2026-DryRun1` |
| `.github/copilot-instructions.md` | Global Copilot context: project overview, tech stack, bilingual EN/FR, WCAG 2.2, Ontario DS, commit format `AB#{id}`, branch format `feature/{id}-description` |
| `.github/instructions/ado-workflow.instructions.md` | `applyTo: **` — branching, commit, PR conventions for ADO |
| `.github/instructions/java.instructions.md` | `applyTo: backend/**` — Java 21, Spring Boot 3.x, Spring Data JPA, constructor injection, `@Valid` + Bean Validation, `ResponseEntity`, `ProblemDetail` (RFC 7807), Flyway, H2 local profile with `MODE=MSSQLServer`, package `com.ontario.program` |
| `.github/instructions/react.instructions.md` | `applyTo: frontend/**` — React 18 + TypeScript + Vite (`server.port: 3000`), functional components with hooks, i18next for EN/FR, Ontario DS CSS classes, WCAG 2.2 Level AA (`aria-*`, semantic HTML, keyboard nav, `lang` attribute), `react-router-dom`, axios |
| `.github/instructions/sql.instructions.md` | `applyTo: database/**` — Azure SQL target, Flyway versioned migrations `V001__description.sql`, `NVARCHAR` for bilingual text, `IF NOT EXISTS` guards, `INT IDENTITY(1,1)` PKs, `DATETIME2` timestamps, seed data via `INSERT ... WHERE NOT EXISTS` (never MERGE), audit columns |

#### Documentation Layer (3 files)

| File | Purpose |
|------|---------|
| `docs/architecture.md` | Mermaid C4/flowchart: browsers → React App Service → Java API App Service → Azure SQL; also shows Durable Functions, Logic Apps, AI Foundry |
| `docs/data-dictionary.md` | Mermaid ER diagram, 3 tables (`program_type`, `program`, `notification`), seed data (5 program types EN/FR) |
| `docs/design-document.md` | 5 API endpoints, request/response DTOs with validation, RFC 7807 error handling, frontend component hierarchy |

#### Operational Layer (3 files)

| File | Purpose |
|------|---------|
| `TALK-TRACK.md` | 130-minute minute-by-minute demo script at the **repository root** (not in `docs/`) |
| `scripts/Start-Local.ps1` | PowerShell with `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql` params; backend port 8080, frontend port 3000 |
| `scripts/Stop-Local.ps1` | Kill processes on ports 8080 and 3000 |

### Required Sections in the Research Document

The research document must include these sections with full implementation-ready detail:

1. **Copilot Instructions Specification** — Table of all instruction files with `applyTo` patterns and complete content summaries. Each instruction file must specify its YAML frontmatter (`description`, `applyTo`) and the conventions/rules it encodes.

2. **MCP Configuration** — Full `.vscode/mcp.json` content spec including the `npx -y azure-devops-mcp` command, organization, and project arguments.

3. **ADO Work Item Creation Plan** — Full hierarchy of work items to create via MCP during Act 1 of the demo. No work items exist beforehand. The hierarchy is:
   * **Epic**: OPS Program Approval System
     * **Feature**: Infrastructure Setup (pre-deployed in `rg-dev-125`, close immediately)
     * **Feature**: Database Layer — Stories: program_type table, program table, notification table, seed data
     * **Feature**: Backend API — Stories: Spring Boot scaffolding, submit endpoint, list/get endpoints, review endpoint, program-types endpoint
     * **Feature**: Citizen Portal — Stories: React scaffolding, Ontario DS layout, submission form, confirmation page, search page, bilingual EN/FR
     * **Feature**: Ministry Portal — Stories: review dashboard, review detail page, approve/reject actions
     * **Feature**: Quality Assurance — Stories: backend controller tests, frontend component tests, accessibility tests, bilingual verification
     * **Feature**: CI/CD Pipeline — Stories: CI workflow, Dependabot config, secret scanning
     * **Feature**: Live Change Demo — Stories: add program_budget field end-to-end, update tests for new field

4. **Documentation Specifications** — Complete specs for all 3 documentation files:
   * Architecture: Mermaid C4/flowchart diagram spec showing browsers → React App Service → Java API App Service → Azure SQL, plus Durable Functions, Logic Apps, AI Foundry
   * Data Dictionary: Mermaid ER diagram with all 3 tables and every column detailed below, plus seed data
   * Design Document: All 5 API endpoints with request/response DTOs, validation rules, RFC 7807 error handling, and the frontend component hierarchy

5. **Talk Track** — Complete 130-minute structure with all acts, roles, minute-by-minute breakdown, cliffhanger at minute 70, and formatting rules (blockquotes for dialogue, `Demo actions:` bullets, `Key beat:` callouts, tagged commit checkpoints v0.1.0–v1.0.0, risk mitigation table, key numbers summary table)

6. **Local Development Scripts** — `Start-Local.ps1` with `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql` params (backend port 8080, frontend port 3000); `Stop-Local.ps1` to kill processes on those ports

7. **`.gitignore`** — Combined Java + Node + IDE + OS rules

Plus an **Out of Scope** section and **Success Criteria** section.

### Critical Technical Details

These details are NOT in `README.md` but must appear in the research document.

#### Database Schema

* **`program_type`** — simple lookup table:
  * `id` INT IDENTITY(1,1) PK
  * `type_name` NVARCHAR(100)
  * `type_name_fr` NVARCHAR(100)
  * No audit columns (static reference data)

* **`program`** — main entity:
  * `id` INT IDENTITY(1,1) PK
  * `program_name` NVARCHAR(200)
  * `program_description` NVARCHAR(MAX)
  * `program_type_id` INT FK → `program_type.id`
  * `status` NVARCHAR(20) DEFAULT 'DRAFT'
  * `reviewer_comments` NVARCHAR(MAX)
  * `submitted_at` DATETIME2
  * `reviewed_at` DATETIME2
  * `created_at` DATETIME2
  * `updated_at` DATETIME2
  * `created_by` NVARCHAR(100)

* **`notification`** — system-generated:
  * `id` INT IDENTITY(1,1) PK
  * `program_id` INT FK → `program.id`
  * `notification_type` NVARCHAR(50)
  * `recipient_email` NVARCHAR(200)
  * `subject` NVARCHAR(500)
  * `body` NVARCHAR(MAX)
  * `sent_at` DATETIME2
  * `created_at` DATETIME2
  * `updated_at` DATETIME2 DEFAULT GETDATE()
  * `status` NVARCHAR(20)
  * No `created_by` — notifications are system-generated

* **Seed Data** — 5 program types (EN/FR) using `INSERT ... WHERE NOT EXISTS` pattern (never MERGE):
  1. Community Services / Services communautaires
  2. Health & Wellness / Santé et bien-être
  3. Education & Training / Éducation et formation
  4. Environment & Conservation / Environnement et conservation
  5. Economic Development / Développement économique

* H2 local profile must use `MODE=MSSQLServer` for Azure SQL compatibility

#### API Endpoints (5)

1. `POST /api/programs` — submit a program
2. `GET /api/programs` — list programs
3. `GET /api/programs/{id}` — get single program
4. `PUT /api/programs/{id}/review` — approve/reject
5. `GET /api/program-types` — dropdown values

#### Frontend

* Vite default port is 5173 — `vite.config.ts` must set `server.port: 3000`
* Component hierarchy: Layout (Header, Footer, LanguageToggle) → pages (SubmitProgram, SubmitConfirmation, SearchPrograms, ReviewDashboard, ReviewDetail)

### Talk Track Structure (130 Minutes)

#### Part 1: "Building From Zero" (Minutes 0–70)

| Minutes | Act | Role | Content |
|---------|-----|------|---------|
| 0–8 | Opening | Presenter | The Problem — show empty repo, Azure portal (`rg-dev-125`), empty ADO board |
| 8–20 | Act 1: The Architect | Architect | Run scaffolding prompts, configure MCP, **create ADO Epic/Features/Stories via MCP** |
| 20–32 | Act 2: The DBA | DBA | 4 Flyway SQL migrations: program_type, program, notification, seed data |
| 32–52 | Act 3: The Backend Developer | Backend Dev | Spring Boot scaffolding + 5 API endpoints + live curl tests |
| 52–70 | Act 4: The Frontend Developer | Frontend Dev | React + Ontario DS + bilingual citizen portal + live form submission |

#### Cliffhanger (Minute 70)

Citizen can submit programs but Ministry Portal is empty — nobody can approve. Show ADO board with unstarted Ministry stories.

#### Part 2: "Closing the Loop" (Minutes 70–130)

| Minutes | Act | Role | Content |
|---------|-----|------|---------|
| 70–73 | Recap | Presenter | Quick recap, show database with submissions |
| 73–87 | Act 5: Completing the Story | Frontend Dev | Ministry review dashboard, detail, approve/reject |
| 87–100 | Act 6: The QA Engineer | QA | Backend controller tests, frontend component tests, accessibility |
| 100–107 | Act 7: The DevOps Engineer | DevOps | CI pipeline, Dependabot, secret scanning, GHAS |
| 107–120 | Act 8: The Full Stack Change | Full Stack | Add `program_budget` field: migration → entity → DTO → API → form → tests |
| 120–130 | Closing | Presenter | Summary stats, ADO board all done, Q&A |

### Talk Track Formatting Requirements

* Scripted presenter dialogue in blockquotes
* `Demo actions:` bullet lists with minute markers
* `Key beat:` and `Audience engagement point:` callouts
* Tagged commit checkpoints (v0.1.0 through v1.0.0) with fast-forward recovery strategy
* Risk mitigation table (Copilot errors, Azure failures, time overruns, connectivity)
* Key numbers summary table at the end

### Out of Scope

The research document must include an Out of Scope section listing:

* Document upload functionality (README.md marks as optional)
* `.devcontainer/devcontainer.json`
* Azure Durable Functions orchestration code
* Logic Apps connector configuration
* AI Foundry integration code
* CD deployment workflow
