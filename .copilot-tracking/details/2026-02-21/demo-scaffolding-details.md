<!-- markdownlint-disable-file -->
# Implementation Details: Demo Scaffolding

## Context Reference

Sources: `.copilot-tracking/research/2026-02-21/demo-scaffolding-research.md` (Lines 1-992), `README.md`, `.github/prompts/bootstrap-demo.prompt.md`

## Implementation Phase 1: Configuration Layer

<!-- parallelizable: true -->

### Step 1.1: Create `.github/copilot-instructions.md`

Create the global Copilot instructions file. No YAML frontmatter required (global instructions apply everywhere per research spec). However, per HVE-Core markdown conventions this is a root community file — include frontmatter with `title` and `description` only if the repository enforces frontmatter validation. For this project, follow the research spec: no frontmatter.

Files:

- `.github/copilot-instructions.md` — Create new file

Content must include:

- Project name: OPS Program Approval System
- Project description: Full-stack web application for Ontario citizens to submit program requests and Ministry employees to review them
- Tech stack: React 18 + TypeScript (frontend), Java 21 + Spring Boot 3.x (backend), Azure SQL (database), Azure App Services (hosting)
- Bilingual requirement: All user-facing text in English and French using i18next
- Accessibility: WCAG 2.2 Level AA compliance on all screens
- UI framework: Ontario Design System (https://designsystem.ontario.ca/)
- Commit message format: `AB#{id} descriptive message`
- Branch naming: `feature/{id}-description`
- PR body: Include `Fixes AB#{id}` to auto-close ADO work items
- Azure DevOps: Organization `MngEnvMCAP675646`, Project `ProgramDemo-DevDay2026-DryRun1`
- Azure: Resource group `rg-dev-125`
- Repository structure: `backend/` for Java API, `frontend/` for React app, `database/` for Flyway migrations

Success criteria:

- File exists at `.github/copilot-instructions.md`
- Contains all project-level conventions listed above
- No YAML frontmatter (global scope)

Context references:

- Research (Lines 105-128) — Global instructions specification

Dependencies:

- None

### Step 1.2: Create `.github/instructions/ado-workflow.instructions.md`

Create the ADO branching, commit, and PR workflow instruction file with YAML frontmatter.

Files:

- `.github/instructions/ado-workflow.instructions.md` — Create new file

Frontmatter:

```yaml
---
description: "ADO branching, commit, and PR workflow conventions"
applyTo: "**"
---
```

Content rules to encode:

- Create a feature branch from `main` for each user story: `feature/{id}-description`
- Commit messages must start with the ADO work item ID: `AB#{id} descriptive message`
- Every PR body must include `Fixes AB#{id}` to auto-transition the linked work item
- After PR merge, delete the feature branch
- Move the ADO work item to Done after merge
- Keep commits atomic — one logical change per commit
- Squash merge PRs to keep `main` history clean

Success criteria:

- File exists with correct frontmatter (`description` + `applyTo: "**"`)
- All 7 workflow rules encoded

Context references:

- Research (Lines 131-157) — ADO workflow instruction specification

Dependencies:

- None

### Step 1.3: Create `.github/instructions/java.instructions.md`

Create the Java 21 and Spring Boot 3.x coding conventions instruction file.

Files:

- `.github/instructions/java.instructions.md` — Create new file

Frontmatter:

```yaml
---
description: "Java 21 and Spring Boot 3.x coding conventions"
applyTo: "backend/**"
---
```

Content rules to encode:

- Java 21 LTS, Spring Boot 3.x, Maven wrapper (`./mvnw`)
- Package structure: `com.ontario.program` with sub-packages `controller`, `service`, `repository`, `model`, `dto`, `config`, `exception`
- Constructor injection only — never use `@Autowired` on fields
- Request validation: `@Valid` on controller method parameters + Bean Validation annotations (`@NotBlank`, `@NotNull`, `@Size`) on DTOs
- Return `ResponseEntity<T>` from all controller methods
- Error responses: `ProblemDetail` (RFC 7807) via `@ControllerAdvice` + `@ExceptionHandler`
- Database: Spring Data JPA with Flyway migrations
- Local profile (`application-local.yml`): H2 in-memory database with `MODE=MSSQLServer;DATABASE_TO_LOWER=TRUE`
- Production profile: Azure SQL connection via environment variables
- Server port: 8080 (`server.port=8080`)
- API base path: `/api`
- Testing: JUnit 5, MockMvc for controller tests, `@DataJpaTest` for repository tests

Success criteria:

- File exists with correct frontmatter (`description` + `applyTo: "backend/**"`)
- All 12 Java/Spring Boot conventions encoded

Context references:

- Research (Lines 159-186) — Java instruction specification

Dependencies:

- None

### Step 1.4: Create `.github/instructions/react.instructions.md`

Create the React 18, TypeScript, and Vite frontend conventions instruction file.

Files:

- `.github/instructions/react.instructions.md` — Create new file

Frontmatter:

```yaml
---
description: "React 18, TypeScript, and Vite frontend conventions"
applyTo: "frontend/**"
---
```

Content rules to encode:

- React 18.x with TypeScript (strict mode)
- Vite build tool — `vite.config.ts` must set `server.port: 3000` and `server.proxy` for `/api` → `http://localhost:8080`
- Functional components with hooks only — no class components
- State management: React hooks (`useState`, `useEffect`, `useContext`) — no Redux
- Routing: `react-router-dom` v6 with `<BrowserRouter>`
- HTTP client: axios with a shared instance configured with base URL
- Internationalization: `i18next` + `react-i18next` with EN and FR translation JSON files
- UI: Ontario Design System CSS classes (https://designsystem.ontario.ca/)
- Accessibility: WCAG 2.2 Level AA — `aria-*` attributes, semantic HTML, keyboard navigation, `lang` attribute on `<html>`
- Component structure: `frontend/src/components/` for shared, `frontend/src/pages/` for route pages
- Testing: Vitest + React Testing Library
- Linting: ESLint with TypeScript rules

Success criteria:

- File exists with correct frontmatter (`description` + `applyTo: "frontend/**"`)
- All 12 React/TypeScript conventions encoded

Context references:

- Research (Lines 198-231) — React instruction specification

Dependencies:

- None

### Step 1.5: Create `.github/instructions/sql.instructions.md`

Create the Azure SQL and Flyway migration conventions instruction file.

Files:

- `.github/instructions/sql.instructions.md` — Create new file

Frontmatter:

```yaml
---
description: "Azure SQL and Flyway migration conventions"
applyTo: "database/**"
---
```

Content rules to encode:

- Target database: Azure SQL (PaaS)
- Migration tool: Flyway (integrated with Spring Boot)
- Migration naming: `V001__create_program_type_table.sql`, `V002__create_program_table.sql`, etc.
- Migration location: `database/migrations/` (symlinked or copied to `backend/src/main/resources/db/migration/`)
- String columns: `NVARCHAR` for all text (bilingual support)
- Primary keys: `INT IDENTITY(1,1)` — never use `BIGINT` or UUIDs
- Timestamps: `DATETIME2` — never use `DATETIME` or `TIMESTAMP`
- DDL guards: `IF NOT EXISTS` on all CREATE TABLE and ALTER TABLE statements
- Seed data: `INSERT ... WHERE NOT EXISTS (SELECT 1 FROM table WHERE condition)` — never use `MERGE`
- Audit columns: `created_at DATETIME2`, `updated_at DATETIME2` on transactional tables; `created_by NVARCHAR(100)` where user-initiated
- Foreign keys: use explicit `CONSTRAINT` names following pattern `FK_child_parent`
- Indexes: add indexes on frequently queried columns (e.g., `status`, `program_type_id`)

Success criteria:

- File exists with correct frontmatter (`description` + `applyTo: "database/**"`)
- All 12 SQL/Flyway conventions encoded

Context references:

- Research (Lines 233-261) — SQL instruction specification

Dependencies:

- None

### Step 1.6: Create `.vscode/mcp.json`

Create the MCP server configuration for Azure DevOps integration.

Files:

- `.vscode/mcp.json` — Create new file

Exact content:

```json
{
  "servers": {
    "ado": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "azure-devops-mcp",
        "--organization",
        "MngEnvMCAP675646",
        "--project",
        "ProgramDemo-DevDay2026-DryRun1"
      ]
    }
  }
}
```

Success criteria:

- File exists at `.vscode/mcp.json`
- JSON is valid and parseable
- Organization and project names match exactly

Context references:

- Research (Lines 267-292) — MCP configuration specification

Dependencies:

- None

### Step 1.7: Create `.gitignore`

Create the combined ignore rules for Java, Node, IDE, and OS artifacts.

Files:

- `.gitignore` — Create new file

Sections to include:

- Java / Maven: `target/`, `*.class`, `*.jar`, `*.war`, `*.ear`, `*.log`, `.mvn/wrapper/maven-wrapper.jar`
- Node / npm: `node_modules/`, `dist/`, `build/`, `*.tsbuildinfo`, `.env`, `.env.local`
- IDE: `.idea/`, `*.iml`, `.vscode/settings.json`, `.vscode/launch.json`, `.vscode/tasks.json`, `*.swp`, `*.swo`, `*~`
- OS: `.DS_Store`, `Thumbs.db`, `desktop.ini`
- Spring Boot: `*.pid`
- Test & Coverage: `coverage/`, `*.lcov`, `.nyc_output/`
- Commented-out `.copilot-tracking/` with note about keeping for demo

Key decisions:

- `.vscode/mcp.json` is NOT ignored — must be committed for MCP to work
- `.copilot-tracking/` is NOT ignored — kept for demo reference
- `.github/` is NOT ignored — instructions and prompts are project artifacts

Success criteria:

- File exists at `.gitignore`
- All sections present
- `.vscode/mcp.json` is NOT in the ignore list
- `.copilot-tracking/` is commented out (not ignored)

Context references:

- Research (Lines 802-850) — .gitignore specification

Dependencies:

- None

## Implementation Phase 2: Documentation Layer

<!-- parallelizable: true -->

### Step 2.1: Create `docs/architecture.md`

Create the architecture overview document with a Mermaid flowchart diagram showing all Azure components.

Files:

- `docs/architecture.md` — Create new file

Content structure:

1. Title: "Architecture Overview"
2. Mermaid `flowchart TD` diagram with:
   - `Browser[Browser / Client]` — external user
   - `ReactApp[React App<br/>Azure App Service<br/>Port 3000]`
   - `JavaAPI[Java API<br/>Azure App Service<br/>Port 8080]`
   - `AzureSQL[(Azure SQL<br/>Database)]`
   - `DurableFunctions[Azure Durable Functions<br/>Workflow Orchestration]`
   - `LogicApps[Azure Logic Apps<br/>Email Notifications]`
   - `AIFoundry[Azure AI Foundry<br/>Mini Model]`
   - Connections with labeled arrows (HTTPS, REST API, JDBC, HTTP Trigger, etc.)
   - `subgraph Azure["Azure Resource Group: rg-dev-125"]` containing all Azure components
3. Prose sections:
   - **Overview** — 3-tier architecture description
   - **Component Descriptions** — table format (Component, Technology, Responsibility)
   - **Data Flow** — numbered steps (1) citizen submits → (2) React POST → (3) API validates/persists → (4) ministry reviews → (5) status update → (6) notification
   - **Security** — RBAC authentication (future)
   - **Future Integrations** — Durable Functions, Logic Apps, AI Foundry, RBAC
   - **Infrastructure** — all in `rg-dev-125`, pre-deployed

Discrepancy references:

- None — research specification is complete

Success criteria:

- File exists at `docs/architecture.md`
- Mermaid flowchart renders correctly with all 7 nodes and connections
- Subgraph wraps all Azure components
- All prose sections present with tables

Context references:

- Research (Lines 340-385) — Architecture specification

Dependencies:

- None

### Step 2.2: Create `docs/data-dictionary.md`

Create the data dictionary with Mermaid ER diagram, table details, seed data, and migration plan.

Files:

- `docs/data-dictionary.md` — Create new file

Content structure:

1. Title: "Data Dictionary"
2. Mermaid `erDiagram` with 3 tables:
   - `program_type` — 3 columns (id PK, type_name, type_name_fr)
   - `program` — 11 columns (id PK, program_name, program_description, program_type_id FK, status, reviewer_comments, submitted_at, reviewed_at, created_at, updated_at, created_by)
   - `notification` — 10 columns (id PK, program_id FK, notification_type, recipient_email, subject, body, sent_at, created_at, updated_at, status)
   - Relationships: `program_type ||--o{ program`, `program ||--o{ notification`
3. Table details sections for each table:
   - Table purpose
   - Column table: Column Name, Data Type, Constraints, Description
   - Relationships (FK references)
4. Seed Data table: 5 program types with EN/FR names
   - Community Services / Services communautaires
   - Health & Wellness / Santé et bien-être
   - Education & Training / Éducation et formation
   - Environment & Conservation / Environnement et conservation
   - Economic Development / Développement économique
5. Status values: DRAFT, SUBMITTED, APPROVED, REJECTED with descriptions
6. Migration plan: V001–V004 with descriptions

Discrepancy references:

- None — research specification is complete

Success criteria:

- File exists at `docs/data-dictionary.md`
- Mermaid ER diagram renders with all 3 tables and relationships
- All columns documented with types, constraints, and descriptions
- 5 seed data rows with both EN and FR names
- 4 status values documented
- 4 migration files listed

Context references:

- Research (Lines 387-467) — Data dictionary specification

Dependencies:

- None

### Step 2.3: Create `docs/design-document.md`

Create the design document with API endpoints, DTOs, error handling, and frontend component hierarchy.

Files:

- `docs/design-document.md` — Create new file

Content structure:

1. Title: "Design Document"
2. **API Endpoints** table: 5 endpoints with Method, Path, Description, Request Body, Response
   - POST `/api/programs` → 201 Created + ProgramResponse
   - GET `/api/programs` → 200 OK + List
   - GET `/api/programs/{id}` → 200 OK + ProgramResponse or 404
   - PUT `/api/programs/{id}/review` → 200 OK + ProgramResponse or 404
   - GET `/api/program-types` → 200 OK + List
3. **Request DTOs**:
   - `ProgramSubmitRequest`: programName, programDescription, programTypeId, createdBy with validation annotations
   - `ProgramReviewRequest`: status (@Pattern APPROVED|REJECTED), reviewerComments
4. **Response DTOs**:
   - `ProgramResponse`: 13 fields including resolved type names
   - `ProgramTypeResponse`: id, typeName, typeNameFr
5. **Error Handling**: RFC 7807 ProblemDetail JSON format, error scenarios (400, 404, 500)
6. **Frontend Component Hierarchy**: ASCII tree of App → Layout → Pages → Shared
7. **Route Mapping**: 5 routes (/, /confirmation/:id, /search, /review, /review/:id)

Discrepancy references:

- None — research specification is complete

Success criteria:

- File exists at `docs/design-document.md`
- All 5 API endpoints documented with request/response details
- All DTOs documented with field types and validation
- RFC 7807 error format documented with JSON example
- Component hierarchy matches research specification
- All 5 routes mapped

Context references:

- Research (Lines 469-570) — Design document specification

Dependencies:

- None

## Implementation Phase 3: Operational Layer

<!-- parallelizable: true -->

### Step 3.1: Create `scripts/Start-Local.ps1`

Create the local development startup script with parameters for flexible launch options.

Files:

- `scripts/Start-Local.ps1` — Create new file

Parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `-SkipBuild` | Switch | `$false` | Skip Maven/npm build steps |
| `-BackendOnly` | Switch | `$false` | Start only the backend (port 8080) |
| `-FrontendOnly` | Switch | `$false` | Start only the frontend (port 3000) |
| `-UseAzureSql` | Switch | `$false` | Use Azure SQL instead of H2 |

Behavior:

1. If not `-SkipBuild`: run Maven clean package and npm install/build
2. If not `-FrontendOnly`: start backend with `./mvnw spring-boot:run` (port 8080)
3. If not `-BackendOnly`: start frontend with `npm run dev` (port 3000)
4. If `-UseAzureSql`: set `SPRING_PROFILES_ACTIVE=azure`; otherwise use `local` (H2)

Script features:

- `<#.SYNOPSIS#>` comment-based help
- Color-coded console output (Write-Host with -ForegroundColor)
- Port conflict detection before starting (check ports 8080 and 3000)
- Background job management for running both processes simultaneously

Success criteria:

- File exists at `scripts/Start-Local.ps1`
- All 4 parameters defined with correct types
- Build, backend, and frontend launch logic implemented
- Port conflict detection included
- Comment-based help present

Context references:

- Research (Lines 740-780) — Start-Local.ps1 specification

Dependencies:

- None

### Step 3.2: Create `scripts/Stop-Local.ps1`

Create the local development stop script to cleanly terminate running services.

Files:

- `scripts/Stop-Local.ps1` — Create new file

Behavior:

1. Find and stop processes on port 8080 (backend)
2. Find and stop processes on port 3000 (frontend)
3. Output confirmation messages

Implementation:

- Use `Get-NetTCPConnection` and `Stop-Process` on Windows
- Include `<#.SYNOPSIS#>` comment-based help
- Graceful error handling if no processes are found
- Color-coded output messages

Success criteria:

- File exists at `scripts/Stop-Local.ps1`
- Stops processes on both ports 8080 and 3000
- Handles case where no processes are running gracefully
- Comment-based help present

Context references:

- Research (Lines 782-798) — Stop-Local.ps1 specification

Dependencies:

- None

### Step 3.3: Create `TALK-TRACK.md`

Create the full 130-minute talk track at the repository root covering all acts, transitions, and audience engagement points.

Files:

- `TALK-TRACK.md` — Create new file at repository root (NOT in `docs/`)

Content structure:

1. Title and overview: 130-minute OPS Developer Day 2026 talk track
2. **Part 1: "Building From Zero" (Minutes 0–70)**:
   - Opening (Minutes 0–8) — Welcome, business problem, empty repo tour, Azure portal, empty ADO board
   - Act 1: The Architect (Minutes 8–20) — Run scaffolding prompts, configure MCP, create ADO work items
   - Act 2: The DBA (Minutes 20–32) — 4 Flyway migrations, H2 console demo
   - Act 3: The Backend Developer (Minutes 32–52) — Spring Boot scaffolding, 5 endpoints, curl tests
   - Act 4: The Frontend Developer (Minutes 52–70) — React scaffolding, Ontario DS, bilingual, form submission
   - Cliffhanger (Minute 70) — Working citizen portal, empty review dashboard
3. **Part 2: "Closing the Loop" (Minutes 70–130)**:
   - Recap (Minutes 70–73) — Part 1 achievements, database state, ADO board
   - Act 5: Completing the Story (Minutes 73–87) — Review dashboard, approve/reject
   - Act 6: The QA Engineer (Minutes 87–100) — Backend/frontend tests, accessibility, bilingual verification
   - Act 7: The DevOps Engineer (Minutes 100–107) — CI workflow, Dependabot, GHAS
   - Act 8: The Full Stack Change (Minutes 107–120) — program_budget end-to-end (8 sub-steps)
   - Closing (Minutes 120–130) — Summary, key numbers, ADO board, Q&A

Formatting requirements:

- Scripted dialogue in blockquotes: `> "Welcome to Developer Day 2026..."`
- Demo actions as bullet lists with minute markers: `* **[Minute 12]** Open VS Code...`
- **Key beat** callouts for important demo moments
- **Audience engagement point** callouts for interaction moments
- Commit checkpoint table (v0.1.0–v1.0.0)
- Fast-forward recovery strategy at each checkpoint
- Risk mitigation table (5 risks with mitigations)
- Key numbers summary table (9 metrics)

Discrepancy references:

- None — research specification is complete

Success criteria:

- File exists at `TALK-TRACK.md` (repository root)
- All 130 minutes covered with no gaps
- All 11 sections present (Opening + 8 Acts + Recap + Closing)
- Commit checkpoint table has 9 tags
- Risk mitigation table has 5 entries
- Key numbers summary table has 9 metrics
- All formatting conventions applied consistently

Context references:

- Research (Lines 572-738) — Talk track specification

Dependencies:

- None

## Implementation Phase 4: Validation

<!-- parallelizable: false -->

### Step 4.1: Verify all 13 files exist

List all created files and compare against the target structure:

```text
.github/copilot-instructions.md
.github/instructions/ado-workflow.instructions.md
.github/instructions/java.instructions.md
.github/instructions/react.instructions.md
.github/instructions/sql.instructions.md
.vscode/mcp.json
docs/architecture.md
docs/data-dictionary.md
docs/design-document.md
scripts/Start-Local.ps1
scripts/Stop-Local.ps1
.gitignore
TALK-TRACK.md
```

### Step 4.2: Validate instruction file frontmatter

For each of the 4 instruction files, verify:

- `description` field is present and non-empty
- `applyTo` field is present and matches the expected glob pattern
- Frontmatter is delimited by `---` on separate lines

Expected patterns:

| File | Expected `applyTo` |
|------|---------------------|
| `ado-workflow.instructions.md` | `**` |
| `java.instructions.md` | `backend/**` |
| `react.instructions.md` | `frontend/**` |
| `sql.instructions.md` | `database/**` |

### Step 4.3: Validate Mermaid diagram syntax

- `docs/architecture.md`: Verify `flowchart TD` with subgraph, nodes, and connections
- `docs/data-dictionary.md`: Verify `erDiagram` with 3 tables and 2 relationships

### Step 4.4: Validate talk track timing

Verify minute ranges sum to 130 with no gaps:

| Section | Minutes | Duration |
|---------|---------|----------|
| Opening | 0–8 | 8 min |
| Act 1 | 8–20 | 12 min |
| Act 2 | 20–32 | 12 min |
| Act 3 | 32–52 | 20 min |
| Act 4 | 52–70 | 18 min |
| Recap | 70–73 | 3 min |
| Act 5 | 73–87 | 14 min |
| Act 6 | 87–100 | 13 min |
| Act 7 | 100–107 | 7 min |
| Act 8 | 107–120 | 13 min |
| Closing | 120–130 | 10 min |
| **Total** | | **130 min** |

### Step 4.5: Report blocking issues

Document any issues requiring additional research or planning. Provide next steps for the user rather than attempting large-scale fixes inline.

## Dependencies

- PowerShell 7+ (scripts)
- VS Code with GitHub Copilot
- Node.js / npm (MCP `npx` command)

## Success Criteria

- All 13 files created at correct paths matching target structure
- All instruction files have valid YAML frontmatter
- Mermaid diagrams use correct syntax
- Talk track covers 130 minutes with zero gaps
- `.gitignore` correctly excludes build artifacts while keeping project configuration
