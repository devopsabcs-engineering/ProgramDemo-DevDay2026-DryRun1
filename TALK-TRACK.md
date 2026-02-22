# OPS Developer Day 2026 — Talk Track

**Duration**: 130 minutes (Part 1: 0–70, Part 2: 70–130)

**Goal**: Demonstrate how GitHub Copilot accelerates building a full-stack Program Approval web application from scratch for the Ontario Public Sector.

---

## Part 1: "Building From Zero" (Minutes 0–70)

---

### Opening (Minutes 0–8) — Role: Presenter

> "Welcome to Developer Day 2026. Today we're going to build something real — a Program Approval System for the Ontario Public Sector — entirely from scratch, using GitHub Copilot as our pair programmer."

> "Let me show you what we're starting with."

* **[Minute 1]** Open the repository in VS Code — show that only `README.md` and `.github/prompts/bootstrap-demo.prompt.md` exist
* **[Minute 2]** Walk through `README.md` — explain the business problem: citizens submit program requests, Ministry reviews and approves or rejects
* **[Minute 4]** Open Azure portal — show resource group `rg-dev-125` with pre-deployed resources (App Services, Azure SQL, Durable Functions, Logic Apps, AI Foundry)
* **[Minute 6]** Open Azure DevOps — show the completely empty board: no Epic, no Features, no User Stories

> "We have infrastructure ready and a business problem defined. No code. No database. No tests. No CI. Can we build all of this in one session using GitHub Copilot? Let's find out."

**Audience engagement point:** "How long would this normally take your team? Keep that number in your head — we'll compare at the end."

---

### Act 1: The Architect (Minutes 8–20) — Role: Architect

> "Every project starts with architecture. Let's put on our architect hat and set up the foundation."

* **[Minute 8]** Open `bootstrap-demo.prompt.md` in VS Code and run it to generate the 3 scaffolding prompts
* **[Minute 10]** Run `demo-scaffolding.prompt.md` to generate the comprehensive research document
* **[Minute 12]** Run `demo-scaffolding-plan.prompt.md` to create the implementation plan
* **[Minute 14]** Run `demo-scaffolding-implement.prompt.md` to generate all configuration, documentation, and script files

**Key beat:** This is where Copilot generates 13 complete scaffolding files — instructions, docs, scripts, and a talk track — from a single research document.

* **[Minute 16]** Open `.vscode/mcp.json` — show the MCP configuration for Azure DevOps
* **[Minute 17]** Use MCP to create the ADO Epic: "OPS Program Approval System"
* **[Minute 18]** Create all 8 Features and 27 User Stories under the Epic via MCP
* **[Minute 19]** Immediately close the "Infrastructure Setup" Feature (resources are pre-deployed)
* **[Minute 20]** Show the populated ADO board to the audience — 36 work items created in minutes

**Audience engagement point:** "We just created an entire project backlog without leaving the editor. No copy-pasting into a browser. That's MCP in action."

**Commit checkpoint:** `v0.1.0` — Scaffolding complete (config, docs, scripts, ADO board populated)

---

### Act 2: The DBA (Minutes 20–32) — Role: DBA

> "Time to switch hats. We're now the DBA. Let's build the database layer."

* **[Minute 20]** Open ADO board via MCP — pick up the Database Layer stories
* **[Minute 22]** Create `V001__create_program_type_table.sql` — a simple lookup table with `id`, `type_name`, `type_name_fr`
* **[Minute 24]** Create `V002__create_program_table.sql` — the main transactional table with 11 columns including audit fields
* **[Minute 26]** Create `V003__create_notification_table.sql` — notification records for citizen communications
* **[Minute 28]** Create `V004__seed_program_types.sql` — seed 5 program types with bilingual EN/FR names

**Key beat:** Show how Copilot follows the SQL instruction file — using `NVARCHAR`, `DATETIME2`, `IF NOT EXISTS` guards, and `INSERT ... WHERE NOT EXISTS` for seed data (never MERGE).

* **[Minute 30]** Start the backend with `.\scripts\Start-Local.ps1 -BackendOnly` — Flyway runs all 4 migrations
* **[Minute 31]** Open H2 console at `http://localhost:8080/h2-console` — show the tables and seed data
* **[Minute 32]** Move ADO Database Layer stories to Done via MCP

**Commit checkpoint:** `v0.2.0` — Database layer complete (3 tables, seed data, Flyway migrations)

---

### Act 3: The Backend Developer (Minutes 32–52) — Role: Backend Dev

> "The database is ready. Now let's build the API layer on top of it."

* **[Minute 32]** Open ADO board — pick up Backend API stories
* **[Minute 34]** Generate Spring Boot scaffolding: `pom.xml`, main class, package structure (`com.ontario.program.*`)
* **[Minute 36]** Create the `Program` and `ProgramType` JPA entities with all annotations
* **[Minute 38]** Create Spring Data JPA repositories: `ProgramRepository`, `ProgramTypeRepository`

**Key beat:** Show how Copilot uses constructor injection (never `@Autowired`) because the Java instructions file says so.

* **[Minute 40]** Create `ProgramController` with `POST /api/programs` — submit a new program
* **[Minute 42]** Add `GET /api/programs` and `GET /api/programs/{id}` — list and get endpoints
* **[Minute 44]** Add `PUT /api/programs/{id}/review` — approve or reject a program
* **[Minute 46]** Add `GET /api/program-types` — dropdown values for the frontend
* **[Minute 47]** Create the `GlobalExceptionHandler` with `@ControllerAdvice` returning `ProblemDetail` (RFC 7807)
* **[Minute 48]** Create request/response DTOs with Bean Validation annotations

**Key beat:** All 5 endpoints working with proper validation, error handling, and RFC 7807 error responses — built from instruction files, not guesswork.

* **[Minute 49]** Restart the backend and run live curl tests:
  * `curl -X POST http://localhost:8080/api/programs -H "Content-Type: application/json" -d '{"programName":"Test","programDescription":"Test desc","programTypeId":1,"createdBy":"demo"}'`
  * `curl http://localhost:8080/api/programs`
  * `curl http://localhost:8080/api/program-types`
* **[Minute 51]** Show the responses — proper JSON, correct status codes, ProblemDetail for errors
* **[Minute 52]** Move ADO Backend API stories to Done via MCP

**Audience engagement point:** "Five fully functional API endpoints, validation, error handling, and RFC 7807 compliance — all in 20 minutes. How's that comparing to your estimate?"

**Commit checkpoint:** `v0.3.0` — Backend API complete (5 endpoints, validation, error handling)

---

### Act 4: The Frontend Developer (Minutes 52–70) — Role: Frontend Dev

> "We have an API. Now let's give our citizens a portal to use it."

* **[Minute 52]** Open ADO board — pick up Citizen Portal stories
* **[Minute 54]** Generate React + Vite + TypeScript scaffolding with `npm create vite@latest frontend -- --template react-ts`
* **[Minute 55]** Configure `vite.config.ts` — set `server.port: 3000` and proxy `/api` to `http://localhost:8080`
* **[Minute 56]** Install dependencies: `react-router-dom`, `axios`, `i18next`, `react-i18next`

**Key beat:** Show Copilot reading the React instruction file and automatically configuring the Vite proxy, port, and project structure.

* **[Minute 57]** Create the Layout components: Header (Ontario DS), Footer (Ontario DS), LanguageToggle (EN/FR)
* **[Minute 59]** Create `SubmitProgram` page — form with program name, description, and type dropdown
* **[Minute 62]** Create `SubmitConfirmation` page — success message with program details
* **[Minute 64]** Create `SearchPrograms` page — search by name with results table
* **[Minute 66]** Set up i18next with EN and FR translation JSON files
* **[Minute 68]** Start the frontend with `.\scripts\Start-Local.ps1 -FrontendOnly -SkipBuild`
* **[Minute 69]** Live demo: fill out the submission form, submit, see confirmation, toggle language to French
* **[Minute 70]** Move ADO Citizen Portal stories to Done via MCP

**Audience engagement point:** "Switch to French and watch every label, button, and message change. Bilingual from day one, not bolted on later."

**Commit checkpoint:** `v0.4.0` — Citizen portal complete (3 pages, Ontario DS, bilingual EN/FR)

---

### Cliffhanger (Minute 70)

> "Citizens can now submit programs. The form works. The API saves to the database. We even have it in French."

> "But there's a problem..."

* Navigate to `http://localhost:3000/review` — show an empty review dashboard
* Open ADO board — show Ministry Portal stories all in "New" status

> "Citizens can submit... but nobody can approve. The Ministry portal doesn't exist yet. See you after the break."

---

## Part 2: "Closing the Loop" (Minutes 70–130)

---

### Recap (Minutes 70–73) — Role: Presenter

> "Welcome back. Let's quickly recap what we built in Part 1."

* **[Minute 70]** Show the application: citizen portal with submission form
* **[Minute 71]** Open H2 console — show submitted programs in the database
* **[Minute 72]** Open ADO board — show completed stories (Infrastructure, Database, Backend, Citizen Portal) and remaining stories (Ministry Portal, QA, CI/CD, Live Change)

> "We built a database, an API, and a citizen portal in 70 minutes. Now let's close the loop."

---

### Act 5: Completing the Story (Minutes 73–87) — Role: Frontend Dev

> "The Ministry needs to review programs. Let's build their portal."

* **[Minute 73]** Open ADO board — pick up Ministry Portal stories
* **[Minute 75]** Create `ReviewDashboard` page — table showing all submitted programs with status, date, and type
* **[Minute 78]** Create `ReviewDetail` page — full program details with approve/reject buttons and reviewer comments field
* **[Minute 81]** Wire approve/reject buttons to `PUT /api/programs/{id}/review`
* **[Minute 83]** Add route mappings: `/review` → ReviewDashboard, `/review/:id` → ReviewDetail
* **[Minute 85]** Live demo: navigate to review dashboard, click a submitted program, add comments, click "Approve"
* **[Minute 86]** Show the updated status in the database and on the citizen search page
* **[Minute 87]** Move ADO Ministry Portal stories to Done via MCP

**Key beat:** The full approval loop works — citizen submits, Ministry reviews, status updates everywhere.

**Audience engagement point:** "The entire citizen-to-Ministry workflow is working. Submit, review, approve. End to end."

**Commit checkpoint:** `v0.5.0` — Ministry portal complete (review dashboard, detail page, approve/reject)

---

### Act 6: The QA Engineer (Minutes 87–100) — Role: QA

> "We have features, but do they work reliably? Time to write tests."

* **[Minute 87]** Open ADO board — pick up Quality Assurance stories
* **[Minute 89]** Create backend controller tests using MockMvc for all 5 API endpoints:
  * Test POST returns 201 Created with valid input
  * Test POST returns 400 with validation errors
  * Test GET returns list of programs
  * Test GET by ID returns 404 for non-existent program
  * Test PUT review returns updated program with APPROVED status
* **[Minute 93]** Create frontend component tests using Vitest + React Testing Library:
  * Test SubmitProgram form renders all fields
  * Test form validation prevents empty submission
  * Test SubmitConfirmation displays program details
  * Test SearchPrograms shows results table
* **[Minute 96]** Run accessibility audit — check WCAG 2.2 Level AA compliance:
  * Verify `aria-*` attributes on interactive elements
  * Verify semantic HTML elements (`<main>`, `<nav>`, `<form>`)
  * Verify keyboard navigation
  * Verify `lang` attribute updates on language change
* **[Minute 98]** Run bilingual verification — confirm EN/FR translation completeness:
  * All translation keys have both English and French values
  * No hardcoded strings in React components
* **[Minute 99]** Run all tests — show green results in terminal
* **[Minute 100]** Move ADO Quality Assurance stories to Done via MCP

**Key beat:** Copilot generates meaningful tests, not just boilerplate. MockMvc tests validate actual HTTP behavior.

**Commit checkpoint:** `v0.6.0` — QA complete (backend tests, frontend tests, accessibility, bilingual verification)

---

### Act 7: The DevOps Engineer (Minutes 100–107) — Role: DevOps

> "Let's make sure every change goes through a quality gate."

* **[Minute 100]** Open ADO board — pick up CI/CD Pipeline stories
* **[Minute 101]** Create `.github/workflows/ci.yml` — GitHub Actions CI workflow:
  * Trigger on push to `main` and pull requests
  * Backend job: Java 21, Maven build, run tests
  * Frontend job: Node 20, npm install, npm test, npm build
* **[Minute 103]** Create `.github/dependabot.yml` — configure Dependabot for Maven and npm
* **[Minute 105]** Enable GitHub Advanced Security: secret scanning
* **[Minute 106]** Show the GitHub Security tab — Dependabot alerts, secret scanning status
* **[Minute 107]** Move ADO CI/CD Pipeline stories to Done via MCP

**Key beat:** CI pipeline, dependency scanning, and secret scanning — all configured in 7 minutes.

**Commit checkpoint:** `v0.7.0` — DevOps complete (CI pipeline, Dependabot, secret scanning)

---

### Act 8: The Full Stack Change (Minutes 107–120) — Role: Full Stack

> "Everything is built and tested. Now the real test — can Copilot handle a change that touches every layer?"

> "Product owner says: we need a program budget field."

* **[Minute 107]** Open ADO board — pick up Live Change Demo stories
* **[Minute 108]** Create `V005__add_program_budget.sql`:

  ```sql
  ALTER TABLE program ADD program_budget DECIMAL(15,2) NULL;
  ```

* **[Minute 109]** Update JPA entity: add `programBudget` field with `@Column(precision = 15, scale = 2)`
* **[Minute 110]** Update `ProgramSubmitRequest` DTO: add `programBudget` field with `@DecimalMin("0")`
* **[Minute 111]** Update `ProgramResponse` DTO: add `programBudget` field
* **[Minute 112]** Update `ProgramController`: ensure budget flows through submit and review
* **[Minute 113]** Update SubmitProgram React form: add budget input field with currency formatting
* **[Minute 115]** Update tests: add budget field to MockMvc and Vitest tests
* **[Minute 116]** Add French translations for the budget label: `"programBudget": "Budget du programme"`
* **[Minute 117]** Update `docs/data-dictionary.md` and `docs/design-document.md` with the new field
* **[Minute 118]** Live demo: submit a program with a budget, approve it, verify the budget appears everywhere
* **[Minute 119]** Show the diff — a single field touched migration, entity, DTOs, API, UI, tests, translations, and docs
* **[Minute 120]** Move ADO Live Change Demo stories to Done via MCP

**Key beat:** One field change touches 8 layers. Copilot updates all of them consistently because it has instruction files and documentation as context.

**Audience engagement point:** "One field. Eight layers. Every test still passes. That's the power of well-structured instructions."

**Commit checkpoint:** `v0.8.0` — Full stack change complete (program_budget end-to-end)

---

### Closing (Minutes 120–130) — Role: Presenter

> "Let's look at what we accomplished today."

* **[Minute 120]** Show ADO board — all 36 work items are Done
* **[Minute 122]** Show the running application: citizen portal, Ministry portal, bilingual, accessible
* **[Minute 124]** Display the key numbers table

### Key Numbers

| Metric | Value |
|--------|-------|
| Total duration | 130 minutes |
| Files generated by scaffolding | 13 |
| API endpoints | 5 |
| Database tables | 3 |
| Frontend pages | 5 |
| ADO work items created | 36 (1 Epic + 8 Features + 27 Stories) |
| Commit checkpoints | 9 (v0.1.0 – v1.0.0) |
| Languages | 2 (EN / FR) |
| WCAG compliance | Level AA |

> "130 minutes. One developer. GitHub Copilot. A full-stack, bilingual, accessible, tested, CI-enabled application with complete project management. From an empty repository to a production-ready system."

* **[Minute 126]** Final commit and tag: `v1.0.0`

**Audience engagement point:** "Remember the number you had in your head at the start? How does 130 minutes compare?"

* **[Minute 127]** Open the floor for Q&A

> "Thank you for joining us at Developer Day 2026. The future of development isn't about replacing developers — it's about giving them superpowers."

---

## Commit Checkpoints

| Tag | Phase | Description |
|-----|-------|-------------|
| v0.1.0 | Scaffolding | Config, docs, scripts, ADO board populated |
| v0.2.0 | Database | 4 Flyway migrations, 3 tables, seed data |
| v0.3.0 | Backend | Spring Boot + 5 API endpoints |
| v0.4.0 | Frontend (Citizen) | React + Ontario DS + bilingual EN/FR |
| v0.5.0 | Frontend (Ministry) | Review dashboard + approve/reject |
| v0.6.0 | QA | Tests + accessibility + bilingual verification |
| v0.7.0 | DevOps | CI workflow + Dependabot + GHAS |
| v0.8.0 | Full Stack Change | program_budget field end-to-end |
| v1.0.0 | Complete | Final tagged release |

### Fast-Forward Recovery Strategy

If timing falls behind during the live demo, use pre-prepared checkpoint tags to recover:

1. Identify the current checkpoint tag (e.g., `v0.3.0`)
2. Run `git stash` to save any in-progress work
3. Run `git checkout v0.X.0` to jump to the pre-prepared checkpoint
4. Continue the demo from that checkpoint
5. Explain to the audience: "I'm using a pre-verified checkpoint to keep us on schedule"

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Copilot generates incorrect code | Have pre-verified code snippets ready; correct inline and explain the fix |
| Azure SQL connection failure | Fall back to H2 local profile; show Azure SQL later if time permits |
| Time overrun in any act | Use commit checkpoints — fast-forward to the next tag |
| Network / connectivity issues | All tools installed locally; MCP works offline for cached items |
| Build failure | Pre-tested build at each checkpoint tag |
