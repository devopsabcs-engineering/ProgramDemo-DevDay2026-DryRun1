<!-- markdownlint-disable-file -->
# Subagent Research: Talk Track and Operational Scripts Validation

Deep validation of Sections 5 (Talk Track) and 6 (Local Development Scripts) of the primary research document, plus ADO work item count verification.

**Primary research document**: `.copilot-tracking/research/2026-02-21/demo-scaffolding-research.md`
**Source of truth**: `.github/prompts/bootstrap-demo.prompt.md` (Lines 1–215)
**Research status**: **Complete**

---

## 1. Talk Track Timing Validation

### Specification (from bootstrap-demo.prompt.md)

| Segment | Minutes | Duration |
|---------|---------|----------|
| Opening | 0–8 | 8 min |
| Act 1: The Architect | 8–20 | 12 min |
| Act 2: The DBA | 20–32 | 12 min |
| Act 3: The Backend Developer | 32–52 | 20 min |
| Act 4: The Frontend Developer | 52–70 | 18 min |
| Cliffhanger | Minute 70 | 0 min (transition) |
| Recap | 70–73 | 3 min |
| Act 5: Completing the Story | 73–87 | 14 min |
| Act 6: The QA Engineer | 87–100 | 13 min |
| Act 7: The DevOps Engineer | 100–107 | 7 min |
| Act 8: The Full Stack Change | 107–120 | 13 min |
| Closing | 120–130 | 10 min |

### Arithmetic Verification

$$8 + 12 + 12 + 20 + 18 + 3 + 14 + 13 + 7 + 13 + 10 = 130$$

**Result: PASS** — all durations sum to exactly 130 minutes.

### Gap and Overlap Analysis

| Transition | End of Previous | Start of Next | Gap/Overlap |
|------------|-----------------|---------------|-------------|
| Opening → Act 1 | 8 | 8 | None ✓ |
| Act 1 → Act 2 | 20 | 20 | None ✓ |
| Act 2 → Act 3 | 32 | 32 | None ✓ |
| Act 3 → Act 4 | 52 | 52 | None ✓ |
| Act 4 → Recap | 70 | 70 | None ✓ |
| Recap → Act 5 | 73 | 73 | None ✓ |
| Act 5 → Act 6 | 87 | 87 | None ✓ |
| Act 6 → Act 7 | 100 | 100 | None ✓ |
| Act 7 → Act 8 | 107 | 107 | None ✓ |
| Act 8 → Closing | 120 | 120 | None ✓ |

**Result: PASS** — every minute from 0 to 130 is accounted for with no gaps and no overlaps.

### Research Document Accuracy

The primary research document (Section 5) reproduces all timing ranges identically. Every act label, role assignment, minute range, and content summary matches the bootstrap-demo spec.

**Result: PASS** — Section 5 timing is accurate.

---

## 2. Talk Track Formatting Validation

### Required Formatting Conventions (from bootstrap-demo.prompt.md)

| Convention | Documented in Research? | Example Provided? | Status |
|------------|------------------------|-------------------|--------|
| Scripted dialogue in blockquotes | Yes | `> "Welcome to Developer Day 2026..."` | PASS ✓ |
| `Demo actions:` bullet lists with minute markers | Yes | `* **[Minute 12]** Open VS Code...` | PASS ✓ |
| `Key beat:` callouts | Yes | `**Key beat:** This is where Copilot generates...` | PASS ✓ |
| `Audience engagement point:` callouts | Yes | `**Audience engagement point:** Ask the audience...` | PASS ✓ |
| Tagged commit checkpoints (v0.1.0–v1.0.0) | Yes | Full 9-row table present | PASS ✓ |
| Fast-forward recovery strategy | Yes | Documented at checkpoint section | PASS ✓ |
| Risk mitigation table | Yes | 5-row table (spec lists 4 risks; research adds "Build failure") | PASS ✓ |
| Key numbers summary table | Yes | Full metrics table present | PASS ✓ |

### Minor Observation

The bootstrap-demo spec lists 4 risk categories: "Copilot errors, Azure failures, time overruns, connectivity." The research document includes all 4 plus a 5th ("Build failure"). This is an enhancement, not an error — the extra risk is a valid addition.

**Result: PASS** — all required formatting conventions are documented with examples.

---

## 3. Commit Checkpoint Validation

### Tag-to-Act Mapping

| Tag | Bootstrap-demo Spec | Research Document | Match? |
|-----|---------------------|-------------------|--------|
| v0.1.0 | Act 1 (Scaffolding) | "Config, docs, scripts, ADO board" | PASS ✓ |
| v0.2.0 | Act 2 (Database) | "4 Flyway migrations" | PASS ✓ |
| v0.3.0 | Act 3 (Backend) | "Spring Boot + 5 API endpoints" | PASS ✓ |
| v0.4.0 | Act 4 (Citizen Portal) | "React + Ontario DS + bilingual" | PASS ✓ |
| v0.5.0 | Act 5 (Ministry Portal) | "Review dashboard + approve/reject" | PASS ✓ |
| v0.6.0 | Act 6 (QA) | "Tests + accessibility" | PASS ✓ |
| v0.7.0 | Act 7 (DevOps) | "CI + Dependabot + GHAS" | PASS ✓ |
| v0.8.0 | Act 8 (Full Stack Change) | "program_budget end-to-end" | PASS ✓ |
| v1.0.0 | Final (Closing) | "Complete — Final tag" | PASS ✓ |

**Total checkpoints**: 9 (v0.1.0 through v1.0.0)

**Result: PASS** — all 9 checkpoints map correctly to their respective acts.

---

## 4. Local Script Validation

### Start-Local.ps1 Parameters

| Parameter | Spec Requirement | Research Document | Match? |
|-----------|-----------------|-------------------|--------|
| `-SkipBuild` | Switch, skip Maven/npm build | Documented as Switch, default `$false` | PASS ✓ |
| `-BackendOnly` | Switch, start only backend | Documented as Switch, default `$false` | PASS ✓ |
| `-FrontendOnly` | Switch, start only frontend | Documented as Switch, default `$false` | PASS ✓ |
| `-UseAzureSql` | Switch, use Azure SQL instead of H2 | Documented as Switch, default `$false`, sets `SPRING_PROFILES_ACTIVE=azure` | PASS ✓ |

### Port Configuration

| Service | Required Port | Research Document | Match? |
|---------|--------------|-------------------|--------|
| Backend (Spring Boot) | 8080 | 8080 | PASS ✓ |
| Frontend (Vite) | 3000 | 3000 | PASS ✓ |

### Stop-Local.ps1

| Requirement | Research Document | Match? |
|-------------|-------------------|--------|
| Kill processes on port 8080 | Uses `Get-NetTCPConnection` + `Stop-Process` | PASS ✓ |
| Kill processes on port 3000 | Uses `Get-NetTCPConnection` + `Stop-Process` | PASS ✓ |
| Confirmation output | Documented | PASS ✓ |
| Comment-based help | `<#.SYNOPSIS#>` documented | PASS ✓ |

### Additional Script Details Documented

The research document includes extra operational details beyond the minimum spec:

- Port conflict detection before starting (enhancement)
- Color-coded console output (enhancement)
- Background job management for running both processes (enhancement)
- Graceful error handling if no processes found (enhancement)

**Result: PASS** — all script parameters, ports, and behaviors match the spec.

---

## 5. ADO Work Item Plan Validation

### Exact Count by Feature

| Feature | Stories in bootstrap-demo.prompt.md | Stories in Research Document | Match? |
|---------|-------------------------------------|------------------------------|--------|
| Infrastructure Setup | 0 (close immediately) | 0 (close immediately) | PASS ✓ |
| Database Layer | 4 (program_type, program, notification, seed data) | 4 | PASS ✓ |
| Backend API | 5 (scaffolding, submit, list/get, review, program-types) | 5 | PASS ✓ |
| Citizen Portal | 6 (scaffolding, Ontario DS layout, form, confirmation, search, bilingual) | 6 | PASS ✓ |
| Ministry Portal | 3 (dashboard, detail, approve/reject) | 3 | PASS ✓ |
| Quality Assurance | 4 (controller tests, component tests, accessibility, bilingual) | 4 | PASS ✓ |
| CI/CD Pipeline | 3 (CI workflow, Dependabot, secret scanning) | 3 | PASS ✓ |
| Live Change Demo | 2 (program_budget end-to-end, update tests) | 2 | PASS ✓ |
| **Total Stories** | **27** | **27** | **PASS ✓** |

### Exact Work Item Count

| Item Type | Count |
|-----------|-------|
| Epic | 1 |
| Features | 8 |
| Stories | 27 |
| **Total** | **36** |

### Correction Needed

The research document's key numbers summary table states:

> `ADO work items created | ~35 (1 Epic + 8 Features + ~26 Stories)`

**This is incorrect.** The exact count is **36 (1 Epic + 8 Features + 27 Stories)**. The approximate "~26 Stories" should be the precise value "27 Stories."

### Story-by-Story Verification

All 27 individual story names were verified against the bootstrap-demo spec. The research document's ADO hierarchy in Section 3 reproduces every story title faithfully, with minor wording variations that do not change meaning (e.g., "Create program_type lookup table" vs. spec's "program_type table").

**Result: PASS with one correction** — hierarchy matches exactly; key numbers table needs correction from ~35/~26 to 36/27.

---

## Summary of Findings

### Validations Passed

| Validation | Result |
|------------|--------|
| Timing: all ranges sum to 130 min | PASS ✓ |
| Timing: no gaps | PASS ✓ |
| Timing: no overlaps | PASS ✓ |
| Formatting: blockquotes for dialogue | PASS ✓ |
| Formatting: Demo actions with minute markers | PASS ✓ |
| Formatting: Key beat callouts | PASS ✓ |
| Formatting: Audience engagement point callouts | PASS ✓ |
| Formatting: commit checkpoint table | PASS ✓ |
| Formatting: fast-forward recovery | PASS ✓ |
| Formatting: risk mitigation table | PASS ✓ |
| Formatting: key numbers summary table | PASS ✓ |
| Checkpoints: all 9 tags mapped to correct acts | PASS ✓ |
| Scripts: Start-Local.ps1 params match spec | PASS ✓ |
| Scripts: ports 8080/3000 correct | PASS ✓ |
| Scripts: Stop-Local.ps1 kills both ports | PASS ✓ |
| ADO: hierarchy matches spec exactly | PASS ✓ |
| ADO: all 27 stories verified | PASS ✓ |

### Corrections Needed

| Location | Issue | Current Value | Correct Value |
|----------|-------|---------------|---------------|
| Section 5, key numbers summary table | Approximate story count is incorrect | `~35 (1 Epic + 8 Features + ~26 Stories)` | `36 (1 Epic + 8 Features + 27 Stories)` |

### Recommendations for Next Research

- **Ontario Design System CSS class verification** — confirm current component class names for Header, Footer, and LanguageToggle are accurate against https://designsystem.ontario.ca/
- **H2 `MODE=MSSQLServer` compatibility testing** — verify that the `INSERT ... WHERE NOT EXISTS` seed data pattern executes without error on H2 with MSSQLServer mode enabled
- **Vite proxy configuration** — confirm the `server.proxy` setting in `vite.config.ts` correctly routes `/api` requests to `http://localhost:8080` during local development
- **MCP package version pinning** — determine whether `azure-devops-mcp` should specify a version in the `npx` invocation to avoid breaking changes during the live demo
