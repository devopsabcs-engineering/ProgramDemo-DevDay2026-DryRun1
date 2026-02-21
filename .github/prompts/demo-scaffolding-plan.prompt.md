---
description: "Creates a 4-phase implementation plan for all demo scaffolding files from the research document"
agent: Task Planner
argument-hint: "[chat={true|false}]"
---

# Demo Scaffolding Plan

## Inputs

* ${input:chat:true}: (Optional, defaults to true) Include conversation context for planning analysis.

## Context

This plan covers the generation of all scaffolding files for the 130-minute OPS Developer Day 2026 demo. The research document in `.copilot-tracking/research/` contains comprehensive specifications for every file. The plan must produce a file-by-file implementation checklist organized into 4 phases with commit checkpoints.

### Starting State

Only two files exist in the repository:

1. `README.md` — business problem and tech stack
2. `.github/prompts/bootstrap-demo.prompt.md` — the bootstrap prompt

All scaffolding is generated during the live demo. No ADO work items exist.

## Requirements

1. Locate the demo-scaffolding research document in `.copilot-tracking/research/` and use it as the primary input for planning.
2. Create a **4-phase implementation plan** with commit checkpoints at each phase boundary.
3. Organize phases as specified below with exact file listings.

### Phase 1: Configuration Files (7 files, commit checkpoint)

Create these files in order:

1. `.gitignore` — Combined Java + Node + IDE + OS ignore rules
2. `.vscode/mcp.json` — ADO MCP server config with `npx -y azure-devops-mcp --organization MngEnvMCAP675646 --project ProgramDemo-DevDay2026-DryRun1`
3. `.github/copilot-instructions.md` — Global Copilot context covering project overview, tech stack, bilingual EN/FR, WCAG 2.2, Ontario DS, commit format `AB#{id}`, branch format `feature/{id}-description`
4. `.github/instructions/ado-workflow.instructions.md` — `applyTo: **` — branching, commit, PR conventions for ADO
5. `.github/instructions/java.instructions.md` — `applyTo: backend/**` — Java 21, Spring Boot 3.x conventions
6. `.github/instructions/react.instructions.md` — `applyTo: frontend/**` — React 18 + TypeScript + Vite conventions
7. `.github/instructions/sql.instructions.md` — `applyTo: database/**` — Azure SQL, Flyway migration conventions

### Phase 2: Documentation Files (3 files, commit checkpoint)

Create these files in order:

1. `docs/architecture.md` — Mermaid C4/flowchart diagram showing browsers → React App Service → Java API App Service → Azure SQL, plus Durable Functions, Logic Apps, AI Foundry
2. `docs/data-dictionary.md` — Mermaid ER diagram with all 3 tables (`program_type`, `program`, `notification`), every column with types and constraints, and seed data (5 program types EN/FR)
3. `docs/design-document.md` — All 5 API endpoints with request/response DTOs, validation rules, RFC 7807 error handling, and frontend component hierarchy (Layout → pages)

### Phase 3: Operational Files (2 scripts, commit checkpoint)

Create these files:

1. `scripts/Start-Local.ps1` — PowerShell script with parameters: `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql`; backend on port 8080, frontend on port 3000
2. `scripts/Stop-Local.ps1` — PowerShell script to kill processes on ports 8080 and 3000

### Phase 4: Talk Track (1 file, commit checkpoint)

Create this file:

1. `TALK-TRACK.md` — 130-minute minute-by-minute demo script at the **repository root** (not in `docs/`)

### Constraints to Encode in the Plan

* **No TODOs or placeholders** — every file must be complete and production-ready
* **Valid YAML frontmatter** — all instruction files must have `description` and `applyTo` fields
* **ADO work item creation** — the talk track must include creating all ADO work items via MCP in Act 1 (none exist beforehand)
* **Talk track formatting** — must follow the style requirements: blockquotes for dialogue, `Demo actions:` bullets with minute markers, `Key beat:` and `Audience engagement point:` callouts, tagged commit checkpoints (v0.1.0 through v1.0.0) with fast-forward recovery, risk mitigation table, key numbers summary table
* **Azure references** — reference resource group `rg-dev-125` and ADO organization `MngEnvMCAP675646` / project `ProgramDemo-DevDay2026-DryRun1` where appropriate
* **Instruction files** — each must have proper `description` and `applyTo` in YAML frontmatter
* **`TALK-TRACK.md` placement** — must be at repository root, never in `docs/`
