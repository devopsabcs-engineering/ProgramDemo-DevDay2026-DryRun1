<!-- markdownlint-disable-file -->
# Subagent Research: Configuration Layer Validation

Deep validation of the Configuration Layer (Sections 1–2 plus .gitignore) from the primary research document against `README.md` and `bootstrap-demo.prompt.md`.

## Research Status: Complete

## Summary of Findings

The primary research document's Configuration Layer is **well-aligned** with the bootstrap specification. All required instruction files, conventions, and configuration patterns are present. A small number of minor gaps and enhancements were identified — none are blocking.

---

## 1. Instruction File Content Validation

### 1.1 Global Instructions: `.github/copilot-instructions.md`

**Validation: PASS — all bootstrap-spec requirements captured.**

The bootstrap spec (Configuration Layer table) requires:

> Global Copilot context: project overview, tech stack, bilingual EN/FR, WCAG 2.2, Ontario DS, commit format `AB#{id}`, branch format `feature/{id}-description`

| Required Convention | Captured in Research Doc | Location |
|---------------------|--------------------------|----------|
| Project overview | Yes | Section 1 > Global Instructions |
| Tech stack | Yes | Lists React 18 + TS, Java 21 + Spring Boot 3.x, Azure SQL, App Services |
| Bilingual EN/FR | Yes | "All user-facing text in English and French using i18next" |
| WCAG 2.2 Level AA | Yes | Explicitly stated |
| Ontario Design System | Yes | URL included |
| Commit format `AB#{id}` | Yes | Explicit format |
| Branch format `feature/{id}-description` | Yes | Explicit format |
| PR body `Fixes AB#{id}` | Yes | Explicitly stated |
| ADO org and project | Yes | Values match bootstrap spec |
| Azure resource group `rg-dev-125` | Yes | Correctly noted as prompt-provided context not in README.md |
| Repository structure | Yes | `backend/`, `frontend/`, `database/` |

**No gaps found.**

### 1.2 `ado-workflow.instructions.md`

**Validation: PASS**

Bootstrap spec requires:

> `applyTo: **` — branching, commit, PR conventions for ADO

README.md's "Add GitHub Copilot Instructions Early" section requires:

> branching conventions (`feature/{id}-description`), commit message format (`AB#{id}`), PR linking (`Fixes AB#{id}`), and post-merge cleanup steps

| Required Convention | Captured | Notes |
|---------------------|----------|-------|
| `applyTo: **` | Yes | Correct glob pattern |
| Branch naming `feature/{id}-description` | Yes | — |
| Commit format `AB#{id} message` | Yes | — |
| PR body `Fixes AB#{id}` | Yes | — |
| Post-merge cleanup | Yes | "Delete the feature branch" + "Move ADO work item to Done" |
| Atomic commits | Yes | Enhancement — not in spec but good practice |
| Squash merge PRs | Yes | Enhancement — not in spec but reasonable |

**Enhancement noted:** The research doc adds "squash merge PRs to keep `main` history clean" — this is not in the bootstrap spec or README.md but is a reasonable convention. No correction needed; just note it is an addition.

### 1.3 `java.instructions.md`

**Validation: PASS — all bootstrap-spec requirements captured.**

Bootstrap spec requires:

> `applyTo: backend/**` — Java 21, Spring Boot 3.x, Spring Data JPA, constructor injection, `@Valid` + Bean Validation, `ResponseEntity`, `ProblemDetail` (RFC 7807), Flyway, H2 local profile with `MODE=MSSQLServer`, package `com.ontario.program`

| Required Convention | Captured | Notes |
|---------------------|----------|-------|
| `applyTo: backend/**` | Yes | Correct |
| Java 21 | Yes | — |
| Spring Boot 3.x | Yes | — |
| Spring Data JPA | Yes | — |
| Constructor injection | Yes | "never use `@Autowired` on fields" |
| `@Valid` + Bean Validation | Yes | Specific annotations listed (`@NotBlank`, `@NotNull`, `@Size`) |
| `ResponseEntity<T>` | Yes | "from all controller methods" |
| `ProblemDetail` (RFC 7807) | Yes | Via `@ControllerAdvice` + `@ExceptionHandler` |
| Flyway | Yes | — |
| H2 `MODE=MSSQLServer` | Yes | Research doc adds `DATABASE_TO_LOWER=TRUE` (see below) |
| Package `com.ontario.program` | Yes | Sub-packages also specified |

**Enhancement noted: `DATABASE_TO_LOWER=TRUE`**
The research doc specifies `MODE=MSSQLServer;DATABASE_TO_LOWER=TRUE` for the H2 profile. The bootstrap spec only says `MODE=MSSQLServer`. The `DATABASE_TO_LOWER=TRUE` flag forces H2 to treat identifiers as lowercase for compatibility. This is a reasonable enhancement for H2-to-Azure-SQL portability but is **not in the bootstrap spec**. Recommend keeping it but noting the source is research-added.

**Enhancement noted: Maven wrapper**
The research doc includes `./mvnw` as a convention. Not in the bootstrap spec but aligns with Spring Boot best practices.

**Enhancement noted: Testing conventions**
The research doc adds "JUnit 5, MockMvc for controller tests, `@DataJpaTest` for repository tests." These are not in the java.instructions.md section of the bootstrap spec's Configuration Layer table, but they align with the QA Feature stories in the ADO hierarchy. Appropriate addition.

### 1.4 `react.instructions.md`

**Validation: PASS — all bootstrap-spec requirements captured.**

Bootstrap spec requires:

> `applyTo: frontend/**` — React 18 + TypeScript + Vite (`server.port: 3000`), functional components with hooks, i18next for EN/FR, Ontario DS CSS classes, WCAG 2.2 Level AA (`aria-*`, semantic HTML, keyboard nav, `lang` attribute), `react-router-dom`, axios

| Required Convention | Captured | Notes |
|---------------------|----------|-------|
| `applyTo: frontend/**` | Yes | Correct |
| React 18 + TypeScript | Yes | "TypeScript (strict mode)" — extra detail |
| Vite `server.port: 3000` | Yes | — |
| Functional components with hooks | Yes | "no class components" explicitly stated |
| i18next for EN/FR | Yes | `i18next` + `react-i18next` |
| Ontario DS CSS classes | Yes | URL included |
| WCAG 2.2 Level AA | Yes | — |
| `aria-*` attributes | Yes | — |
| Semantic HTML | Yes | `<main>`, `<nav>`, `<header>`, `<footer>`, `<form>` |
| Keyboard navigation | Yes | — |
| `lang` attribute | Yes | "on `<html>`" |
| `react-router-dom` | Yes | "v6 with `<BrowserRouter>`" — extra detail |
| axios | Yes | "with a shared instance" — extra detail |

**Enhancement noted: Vite proxy**
The research doc adds `server.proxy` for `/api` → `http://localhost:8080`. The bootstrap spec's "Critical Technical Details > Frontend" section says only: "Vite default port is 5173 — `vite.config.ts` must set `server.port: 3000`". The proxy is a useful addition for local development but is **not explicitly in the bootstrap spec**. Recommend keeping it.

**Enhancement noted: Additional tooling**
The research doc adds "Vitest + React Testing Library", "ESLint with TypeScript rules", "No Redux" — all reasonable but not in the bootstrap Configuration Layer table.

### 1.5 `sql.instructions.md`

**Validation: PASS — all bootstrap-spec requirements captured.**

Bootstrap spec requires:

> `applyTo: database/**` — Azure SQL target, Flyway versioned migrations `V001__description.sql`, `NVARCHAR` for bilingual text, `IF NOT EXISTS` guards, `INT IDENTITY(1,1)` PKs, `DATETIME2` timestamps, seed data via `INSERT ... WHERE NOT EXISTS` (never MERGE), audit columns

| Required Convention | Captured | Notes |
|---------------------|----------|-------|
| `applyTo: database/**` | Yes | Correct |
| Azure SQL target | Yes | — |
| Flyway `V001__description.sql` | Yes | — |
| `NVARCHAR` for bilingual text | Yes | — |
| `IF NOT EXISTS` guards | Yes | "on all CREATE TABLE and ALTER TABLE" |
| `INT IDENTITY(1,1)` PKs | Yes | "never use `BIGINT` or UUIDs" — extra detail |
| `DATETIME2` timestamps | Yes | "never use `DATETIME` or `TIMESTAMP`" — extra detail |
| Seed data `INSERT ... WHERE NOT EXISTS` | Yes | "(never MERGE)" explicitly stated |
| Audit columns | Yes | `created_at`, `updated_at`, `created_by` |

**Enhancement noted: FK naming convention**
The research doc adds `FK_child_parent` naming for foreign key constraints. Not in bootstrap spec but good practice.

**Enhancement noted: Index recommendations**
The research doc adds "add indexes on frequently queried columns." Not in bootstrap spec but reasonable.

**Enhancement noted: Migration location**
The research doc specifies `database/migrations/` with a note about symlinking to `backend/src/main/resources/db/migration/`. Not in bootstrap spec but necessary for Flyway + Spring Boot integration.

---

## 2. MCP Configuration Validation

**Validation: PASS**

### README.md Pattern

README.md's "Configure MCP for Azure DevOps Integration" section shows:

```json
{
  "servers": {
    "ado": {
      "type": "stdio",
      "command": "...",
      "args": ["--organization", "MngEnvMCAP675646", "--project", "ProgramDemo-DevDay2026-DryRun1"]
    }
  }
}
```

### Bootstrap Spec Full Command

```text
npx -y azure-devops-mcp --organization MngEnvMCAP675646 --project ProgramDemo-DevDay2026-DryRun1
```

### Research Document Specification

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

**Analysis:**

| Aspect | Expected | Actual | Match |
|--------|----------|--------|-------|
| Top-level key | `servers` | `servers` | Yes |
| Server name | `ado` | `ado` | Yes |
| Type | `stdio` | `stdio` | Yes |
| Command | `npx` (separated from args) | `npx` | Yes |
| `-y` flag | Present (auto-install) | First arg | Yes |
| Package name | `azure-devops-mcp` | Second arg | Yes |
| `--organization` | `MngEnvMCAP675646` | Args 3–4 | Yes |
| `--project` | `ProgramDemo-DevDay2026-DryRun1` | Args 5–6 | Yes |

The research doc correctly splits the full `npx -y azure-devops-mcp --organization ... --project ...` command into `command` + `args` format per VS Code MCP JSON conventions. The `npx` binary is the command, and all subsequent tokens (including `-y` and the package name) are args.

**No corrections needed.**

---

## 3. .gitignore Validation

**Validation: PASS — all README.md patterns present.**

README.md's "Set Up .gitignore Early" section requires:

> combined rules for Java (`target/`, `*.class`), Node/npm (`node_modules/`, `dist/`), and IDE files (`.idea/`, `.vscode/settings.json`)

| Required Pattern | In Research Doc | Category |
|------------------|-----------------|----------|
| `target/` | Yes | Java |
| `*.class` | Yes | Java |
| `node_modules/` | Yes | Node |
| `dist/` | Yes | Node |
| `.idea/` | Yes | IDE |
| `.vscode/settings.json` | Yes | IDE |

**All six required patterns are present.**

### Additional Patterns (Enhancement)

The research doc adds these beyond the README.md minimum:

| Category | Additional Patterns | Assessment |
|----------|---------------------|------------|
| Java / Maven | `*.jar`, `*.war`, `*.ear`, `*.log`, `.mvn/wrapper/maven-wrapper.jar` | Standard Maven ignores — appropriate |
| Node / npm | `build/`, `*.tsbuildinfo`, `.env`, `.env.local` | Standard Node/Vite ignores — appropriate |
| IDE | `*.iml`, `.vscode/launch.json`, `.vscode/tasks.json`, `*.swp`, `*.swo`, `*~` | Standard IDE ignores — appropriate |
| OS | `.DS_Store`, `Thumbs.db`, `desktop.ini` | Standard OS ignores — appropriate |
| Spring Boot | `*.pid` | Reasonable |
| Test/Coverage | `coverage/`, `*.lcov`, `.nyc_output/` | Appropriate for test tooling |

### Key Decision Validation

| Decision | Correct | Reasoning |
|----------|---------|-----------|
| `.vscode/mcp.json` NOT ignored | Yes | Must be committed for MCP to work across clones |
| `.copilot-tracking/` NOT ignored | Yes | Demo tracking artifacts should be in the repo |
| `.github/` NOT ignored | Yes | Instructions and prompts are project configuration |

**No corrections needed.**

---

## 4. Gap Analysis — README.md Conventions vs. Instruction File Specs

### Conventions Fully Covered

| README.md Convention | Coverage Location |
|----------------------|-------------------|
| Bilingual EN/FR | Global instructions + react.instructions.md (i18next) |
| WCAG 2.2 Level AA | Global instructions + react.instructions.md |
| Ontario Design System | Global instructions + react.instructions.md |
| H2 local profile | java.instructions.md (`MODE=MSSQLServer`) |
| Commit format `AB#{id}` | Global instructions + ado-workflow.instructions.md |
| Branch format `feature/{id}-description` | ado-workflow.instructions.md |
| PR linking `Fixes AB#{id}` | ado-workflow.instructions.md |
| Azure DevOps + GitHub "Better Together" | ado-workflow.instructions.md covers the integration pattern |
| GitHub Advanced Security | Out of scope for instruction files (Act 7 implementation) |
| Flyway migrations | sql.instructions.md + java.instructions.md |

### Minor Gaps Identified

#### Gap 1: Containerization Context (Severity: Low)

README.md's "Containerize the Backend API for Deployment" section describes using Docker with `eclipse-temurin:21-jre-jammy` and Azure Container Registry. None of the instruction files mention containerization.

**Assessment:** This is correctly omitted. The bootstrap spec's Out of Scope section excludes CD deployment workflow, and containerization is a deployment concern. The instruction files appropriately focus on development-time conventions. **No action needed.**

#### Gap 2: Auto-Versioning Convention (Severity: Low)

README.md's "Auto-Version with Phase-Aware CI" section describes auto-incrementing patch versions on merge and minor versions at phase boundaries. The instruction files do not mention versioning conventions.

**Assessment:** Auto-versioning is a CI/CD pipeline configuration detail, not a coding convention for instruction files. The talk track correctly captures the version tags (v0.1.0–v1.0.0). **No action needed.**

#### Gap 3: GitHub Workflow Summaries (Severity: Low)

README.md's "Surface Key Information in GitHub Workflow Summaries" section describes writing to `$GITHUB_STEP_SUMMARY`. Not mentioned in instruction files.

**Assessment:** This is a CI/CD implementation detail for Act 7. Not appropriate for scaffolding instruction files. **No action needed.**

#### Gap 4: Dev Container (Severity: None)

README.md's "Use a Dev Container for Consistent Environments" section describes `.devcontainer/devcontainer.json`. Explicitly excluded in the bootstrap spec's Out of Scope section. **Correctly omitted.**

#### Gap 5: Government of Ontario Template Layout (Severity: Low)

README.md's Key Features state: "Layout follows the Government of Ontario template where possible." The react.instructions.md mentions Ontario DS CSS classes but does not explicitly reference the ontario.ca template layout pattern.

**Assessment:** The Ontario Design System CSS classes inherently follow the Government of Ontario template. The react.instructions.md's reference to Ontario DS with the URL is sufficient. However, for completeness, the instruction file implementation could add a note: "Follow the Government of Ontario page template pattern (header, main content area, footer)." **Minor enhancement — not blocking.**

#### Gap 6: Live Change Default Value Handling (Severity: Low)

README.md's "Live Change Demo" section includes: "Suggest handling of default values for existing records." The research doc's Act 8 specification covers adding the `program_budget` field but does not explicitly mention handling default values for existing records.

**Assessment:** This is a talk track detail for Act 8, not a configuration layer concern. The `ALTER TABLE` migration would handle this implicitly (nullable column or DEFAULT value). **Not a configuration layer gap — but flag for talk track review.**

### Gaps Not Found (Expected Conventions All Present)

- Seed data pattern (`INSERT ... WHERE NOT EXISTS`, never `MERGE`) — fully specified
- `NVARCHAR` for all text columns — fully specified
- `IF NOT EXISTS` guards on DDL — fully specified
- RFC 7807 `ProblemDetail` error handling — fully specified
- Constructor injection (no `@Autowired`) — fully specified
- Bean Validation annotations — fully specified
- i18next translation structure — fully specified
- WCAG `aria-*` + semantic HTML + keyboard nav + `lang` — fully specified

---

## Key Findings Summary

### Validations Passed

1. **All 5 instruction files** match the bootstrap spec's Configuration Layer table — every convention is captured
2. **MCP configuration** correctly uses the VS Code MCP JSON format with `npx` as the command and all arguments properly separated
3. **`.gitignore`** includes all 6 required patterns from README.md plus reasonable additional rules
4. **YAML frontmatter** is correctly specified on all path-specific instruction files with `description` and `applyTo`
5. **ADO org/project values** are consistent across global instructions and MCP config

### Enhancements Added by Research Doc (Not in Spec — All Reasonable)

| Enhancement | File | Assessment |
|-------------|------|------------|
| `DATABASE_TO_LOWER=TRUE` on H2 mode | java.instructions.md | Useful for case-insensitive compatibility — keep |
| Squash merge convention | ado-workflow.instructions.md | Good practice — keep |
| Vite proxy `/api` → `localhost:8080` | react.instructions.md | Essential for local dev — keep |
| FK naming convention `FK_child_parent` | sql.instructions.md | Explicit naming aids maintainability — keep |
| Index recommendations | sql.instructions.md | Good practice — keep |
| Migration location + symlink note | sql.instructions.md | Implementation detail needed for Flyway + Spring Boot — keep |
| Testing conventions (JUnit 5, Vitest) | java + react instructions | Aligns with QA Feature — keep |

### Corrections Needed

**None.** No factual errors or misalignments found in the Configuration Layer sections.

### Minor Recommendations

1. **react.instructions.md** — Consider adding an explicit note about the Government of Ontario page template pattern (header/main/footer) to complement the Ontario DS CSS class reference.
2. **Talk track Act 8** — Ensure the implementation mentions handling default values for the `program_budget` column on existing records (e.g., `DEFAULT NULL` or `DEFAULT 0`).

---

## Recommended Next Research

1. **Documentation Layer validation** — Apply the same deep validation to Section 4 (Architecture, Data Dictionary, Design Document) ensuring Mermaid diagram syntax is valid and all column specs match the bootstrap-spec database schema.
2. **Talk Track timing validation** — Verify that all minute ranges in Section 5 sum to exactly 130 minutes with no overlaps or gaps.
3. **Ontario Design System CSS class verification** — Confirm current component class names at `https://designsystem.ontario.ca/` for Header, Footer, and LanguageToggle components to ensure the react.instructions.md references are up to date.
