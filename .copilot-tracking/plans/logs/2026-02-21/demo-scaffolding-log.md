<!-- markdownlint-disable-file -->
# Planning Log: Demo Scaffolding

## Discrepancy Log

Gaps and differences identified between research findings and the implementation plan.

### Unaddressed Research Items

- DR-01: Ontario Design System CSS class name verification
  - Source: Research (Lines 27-29) — "Potential Next Research" section
  - Reason: Excluded because the scaffolding layer only references the Ontario DS URL; actual CSS class usage occurs during application development (Act 4/5, out of scaffolding scope)
  - Impact: Low

- DR-02: Talk track timing validation — verify minute ranges sum to 130
  - Source: Research (Lines 24-26) — "Potential Next Research" section
  - Reason: Addressed in validation phase (Step 4.4); research subagent already confirmed 130-minute coverage in validation summary
  - Impact: Low

- DR-03: Document upload functionality
  - Source: Research (Lines 856-857) — "Out of Scope" section
  - Reason: Explicitly excluded from demo scope per research; README mentions optional document upload but this is not part of the scaffolding or demo
  - Impact: Low

- DR-04: Dev Container configuration
  - Source: Research (Lines 858-859) — "Out of Scope" section
  - Reason: Demo runs on pre-configured local machine; Dev Containers not needed
  - Impact: Low

### Plan Deviations from Research

- DD-01: Frontmatter on `.github/copilot-instructions.md`
  - Research recommends: No YAML frontmatter (global instructions apply everywhere)
  - Plan implements: No YAML frontmatter, matching the research spec
  - Rationale: Global Copilot instructions file does not use `applyTo`; it applies to all files by convention. HVE-Core markdown instructions suggest frontmatter for community files, but this project does not enforce frontmatter validation, so we follow the research spec.

- DD-02: Line number references in plan are approximate
  - Research recommends: Exact line number cross-references
  - Plan implements: Approximate line references based on details file structure
  - Rationale: Details file content may shift during iterative editing; references serve as navigational aids rather than exact anchors. Final validation step verifies accuracy.

## Implementation Paths Considered

### Selected: Individual file creation with parallel phases

- Approach: Create all 13 files organized into 3 parallel phases (Configuration, Documentation, Operational) plus a sequential validation phase
- Rationale: Files are completely independent with no shared state or build dependencies; parallel execution maximizes implementation speed
- Evidence: Research "Project Structure" section confirms all 13 files are in separate directories with no cross-file dependencies

### IP-01: Single-phase sequential creation

- Approach: Create all 13 files in a single sequential phase ordered by directory
- Trade-offs: Simpler plan structure but slower execution; no opportunity for parallel work
- Rejection rationale: Files have zero inter-dependencies, making sequential ordering unnecessarily restrictive

### IP-02: Layer-first with validation gates

- Approach: Create configuration layer → validate → documentation layer → validate → operational layer → validate
- Trade-offs: Earlier error detection per layer but 3x validation overhead
- Rejection rationale: Each file is self-contained; per-layer validation adds overhead without meaningful risk reduction since files don't reference each other

## Suggested Follow-On Work

Items identified during planning that fall outside current scope.

- WI-01: ADO work item creation via MCP — Create all 36 work items (1 Epic + 8 Features + 27 Stories) during Act 1 of the live demo (Medium priority)
  - Source: Research Section 3 — ADO Work Item Creation Plan
  - Dependency: `.vscode/mcp.json` must exist (completed in Phase 1, Step 1.6)

- WI-02: Application code implementation — Build backend, frontend, and database code during Acts 2–8 (High priority)
  - Source: Research Section 5 — Talk Track Acts 2–8
  - Dependency: All 13 scaffolding files must exist (completed after Phase 3)

- WI-03: CI/CD pipeline setup — GitHub Actions workflow, Dependabot, secret scanning (Medium priority)
  - Source: Research Section 5 — Act 7: The DevOps Engineer
  - Dependency: Backend and frontend code must exist (WI-02)

- WI-04: Ontario Design System CSS class verification — Confirm current component names match documentation (Low priority)
  - Source: Research "Potential Next Research" (Lines 27-29)
  - Dependency: None — can be done independently before the demo

- WI-05: Pre-prepared checkpoint tags — Create git tags v0.1.0–v1.0.0 with verified code for fast-forward recovery (High priority)
  - Source: Research Section 5 — Fast-forward recovery strategy
  - Dependency: Full application implementation (WI-02, WI-03)

## Validation Results

**Validated on**: 2026-02-21
**Validation status**: **PASS** (with minor findings)
**Planning log path**: `.copilot-tracking/plans/logs/2026-02-21/demo-scaffolding-log.md`

### Checks Performed

| # | Check | Result |
|---|-------|--------|
| 1 | Completeness — plan covers all 13 files | Pass |
| 2 | Alignment — plan steps match research specs | Pass |
| 3 | Frontmatter — instruction files have correct `description` and `applyTo` | Pass |
| 4 | Mermaid diagrams — architecture flowchart and data dictionary ER fully specified | Pass |
| 5 | Talk track — all 130 minutes accounted for, no gaps | Pass |
| 6 | Dependencies — all identified | Pass |
| 7 | Success criteria — measurable and traceable | Pass |
| 8 | Discrepancy tracking — DR- and DD- items valid and complete | Pass |
| 9 | Template markers — no `{{placeholder}}` markers remain | Pass |
| 10 | Cross-references — line number references between plan and details | **Fail** |

### Findings

#### Major

**V-01: Plan-to-details line number cross-references are significantly misaligned**

The plan file references line ranges in the details file that diverge from the actual content locations. The offset grows progressively worse through the file:

| Plan Step | Plan References | Actual Start Line | Start Offset |
|-----------|----------------|-------------------|--------------|
| 1.1 | Lines 14–41 | 12 | +2 |
| 1.2 | Lines 43–72 | 49 | −6 |
| 1.3 | Lines 74–110 | 89 | −15 |
| 1.4 | Lines 112–148 | 134 | −22 |
| 1.5 | Lines 150–185 | 179 | −29 |
| 1.6 | Lines 187–213 | 224 | −37 |
| 1.7 | Lines 215–256 | 267 | −52 |
| 2.1 | Lines 262–325 | 310 | −48 |
| 2.2 | Lines 327–415 | 358 | −31 |
| 2.3 | Lines 417–530 | 408 | +9 |
| 3.1 | Lines 536–590 | 460 | +76 |
| 3.2 | Lines 592–625 | 507 | +85 |
| 3.3 | Lines 627–800 | 543 | +84 |

Step 3.3 references Line 800 as the end range, but the details file is only 684 lines long — the reference exceeds the file by 116 lines.

DD-02 in the planning log acknowledges "approximate" references but does not quantify the magnitude. An implementer following the plan's line references for Steps 1.6–3.3 would land on the wrong content section.

**Recommendation**: Update all 13 line references in the plan to match the actual details file. Corrected ranges:

| Plan Step | Corrected Line Range |
|-----------|---------------------|
| 1.1 | Lines 12–48 |
| 1.2 | Lines 49–88 |
| 1.3 | Lines 89–133 |
| 1.4 | Lines 134–178 |
| 1.5 | Lines 179–223 |
| 1.6 | Lines 224–266 |
| 1.7 | Lines 267–308 |
| 2.1 | Lines 310–357 |
| 2.2 | Lines 358–407 |
| 2.3 | Lines 408–459 |
| 3.1 | Lines 460–506 |
| 3.2 | Lines 507–542 |
| 3.3 | Lines 543–604 |

#### Minor

**V-02: Talk track success criteria section count omits Recap**

In the details file Step 3.3 success criteria, the text reads "All 10 sections present (Opening + 8 Acts + Closing)". However, the content structure lists 11 distinct timing blocks: Opening, Acts 1–8, Recap (Minutes 70–73), and Closing. The Recap is a 3-minute time block that covers content (Part 1 achievements, database state, ADO board progress) and is listed in both the research and the details content structure. The section count should be 11 or the parenthetical should read "(Opening + 8 Acts + Recap + Closing)".

**Impact**: Low — the content structure itself is correct, so an implementer following the structure would include the Recap. Only the numeric count in the success criteria is inaccurate.

**V-03: Research line references in details file are approximate**

The details file context references (e.g., Step 1.1 "Research (Lines 105–128)") were not validated for exact alignment against the 992-line research document. These are navigational aids and may have similar drift. Impact is low since each step's content specification is self-contained in the details.

### Clarifying Questions

None — the planning artifacts are sufficiently detailed for implementation. All 13 files are fully specified with no TODOs or ambiguity.
