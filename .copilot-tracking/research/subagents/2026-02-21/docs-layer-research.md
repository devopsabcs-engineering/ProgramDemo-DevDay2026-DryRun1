<!-- markdownlint-disable-file -->
# Subagent Research: Documentation Layer Validation

Deep validation of Section 4 (Documentation Specifications) from the primary research document against both `README.md` and `.github/prompts/bootstrap-demo.prompt.md`.

**Research status**: Complete

---

## 1. Architecture Diagram Validation

### Components Cross-Check

| Component | README.md | bootstrap-demo.prompt.md | Research §4.1 | Status |
|-----------|-----------|--------------------------|---------------|--------|
| Browser / Client | ✅ (implied) | ✅ | ✅ | Pass |
| React App Service | ✅ Front End: React | ✅ | ✅ `ReactApp` node | Pass |
| Java API App Service | ✅ Back End: Java API | ✅ | ✅ `JavaAPI` node | Pass |
| Azure SQL | ✅ Database: Azure SQL | ✅ | ✅ `AzureSQL` node | Pass |
| Azure Durable Functions | ✅ Cloud Services | ✅ | ✅ `DurableFunctions` node | Pass |
| Azure Logic Apps | ✅ Cloud Services | ✅ | ✅ `LogicApps` node | Pass |
| Azure AI Foundry | ✅ Cloud Services (mini model) | ✅ | ✅ `AIFoundry` node | Pass |
| RBAC Authentication | ✅ Cloud Services | ❌ Not mentioned | ❌ Not mentioned | **Gap** |
| Azure App Services (hosting) | ✅ Cloud Services | ✅ (implicit via App Service labels) | ✅ (labels on React/Java nodes) | Pass |
| Figma | ✅ UI Design | ❌ Not runtime | ❌ Correctly excluded | Pass (design-time tool) |
| GitHub Actions | ✅ CI/CD | ❌ Not runtime | ❌ Correctly excluded | Pass (CI/CD tool) |
| GitHub Advanced Security | ✅ Security | ❌ Not runtime | ❌ Correctly excluded | Pass (security tool) |
| Azure DevOps | ✅ Project Management | ❌ Not runtime | ❌ Correctly excluded | Pass (PM tool) |

### Data Flow Validation

| Connection | bootstrap-demo.prompt.md | Research §4.1 | Status |
|------------|--------------------------|---------------|--------|
| Browser → ReactApp ("HTTPS") | ✅ "browsers → React App Service" | ✅ | Pass |
| ReactApp → JavaAPI ("REST API /api/*") | ✅ "React App Service → Java API App Service" | ✅ | Pass |
| JavaAPI → AzureSQL ("JDBC / Spring Data JPA") | ✅ "Java API App Service → Azure SQL" | ✅ | Pass |
| JavaAPI → DurableFunctions ("HTTP Trigger (future)") | ✅ "also shows Durable Functions" | ✅ | Pass |
| DurableFunctions → LogicApps ("Orchestration (future)") | ✅ implied | ✅ | Pass |
| LogicApps → Browser ("Email Notification (future)") | ✅ implied | ✅ | Pass |
| JavaAPI → AIFoundry ("AI Processing (future)") | ✅ implied | ✅ | Pass |

### Resource Group Reference

- bootstrap-demo.prompt.md specifies `rg-dev-125`
- Research §4.1 subgraph: `subgraph Azure["Azure Resource Group: rg-dev-125"]` — **Pass**

### Findings

1. **Gap — RBAC authentication**: README.md lists "RBAC authentication" in the Cloud Services tech stack row. Neither bootstrap-demo.prompt.md nor the research document reference RBAC in the architecture diagram or any documentation spec. **Recommendation**: Since bootstrap-demo.prompt.md does not include RBAC in the architecture spec and the demo implements no authentication, this is acceptable as-is. However, RBAC could be added as a note under the "Future Integrations" prose section to acknowledge it exists in the tech stack. Low priority.

2. **Minor — Port numbers on architecture nodes**: The research document shows `Port 3000` on ReactApp and `Port 8080` on JavaAPI. These are local development ports. In an Azure App Service deployment context, services run on standard HTTP/HTTPS ports (80/443). For a demo-context architecture diagram, this is acceptable since the audience will see these ports during live development. No change needed.

3. **Mermaid syntax**: The `flowchart TD` diagram structure with subgraphs is valid Mermaid syntax. **Pass**.

---

## 2. Data Dictionary Validation

### 2.1 `program_type` Table

| Column | bootstrap-demo.prompt.md | Research §4.2 ER | Match |
|--------|--------------------------|-------------------|-------|
| `id` (INT PK) | ✅ `id (INT PK)` | ✅ `INT id PK "IDENTITY(1,1)"` | Pass |
| `type_name` (NVARCHAR(100)) | ✅ | ✅ `NVARCHAR(100) type_name "English name"` | Pass |
| `type_name_fr` (NVARCHAR(100)) | ✅ | ✅ `NVARCHAR(100) type_name_fr "French name"` | Pass |
| No audit columns | ✅ "No audit columns needed for static reference data" | ✅ No audit columns in ER | Pass |

### 2.2 `program` Table

| Column | bootstrap-demo.prompt.md | Research §4.2 ER | Match |
|--------|--------------------------|-------------------|-------|
| `id` (INT PK) | ✅ | ✅ `INT id PK "IDENTITY(1,1)"` | Pass |
| `program_name` (NVARCHAR(200)) | ✅ | ✅ | Pass |
| `program_description` (NVARCHAR(MAX)) | ✅ | ✅ | Pass |
| `program_type_id` (INT FK) | ✅ | ✅ | Pass |
| `status` (NVARCHAR(20) DEFAULT 'DRAFT') | ✅ | ✅ `"DEFAULT 'DRAFT'"` | Pass |
| `reviewer_comments` (NVARCHAR(MAX)) | ✅ | ✅ | Pass |
| `submitted_at` (DATETIME2) | ✅ | ✅ | Pass |
| `reviewed_at` (DATETIME2) | ✅ | ✅ | Pass |
| `created_at` (DATETIME2) | ✅ | ✅ | Pass |
| `updated_at` (DATETIME2) | ✅ | ✅ | Pass |
| `created_by` (NVARCHAR(100)) | ✅ | ✅ | Pass |

### 2.3 `notification` Table

| Column | bootstrap-demo.prompt.md | Research §4.2 ER | Match |
|--------|--------------------------|-------------------|-------|
| `id` (INT PK) | ✅ | ✅ `INT id PK "IDENTITY(1,1)"` | Pass |
| `program_id` (INT FK) | ✅ | ✅ | Pass |
| `notification_type` (NVARCHAR(50)) | ✅ | ✅ | Pass |
| `recipient_email` (NVARCHAR(200)) | ✅ | ✅ | Pass |
| `subject` (NVARCHAR(500)) | ✅ | ✅ | Pass |
| `body` (NVARCHAR(MAX)) | ✅ | ✅ | Pass |
| `sent_at` (DATETIME2) | ✅ | ✅ | Pass |
| `created_at` (DATETIME2) | ✅ | ✅ | Pass |
| `updated_at` (DATETIME2 DEFAULT GETDATE()) | ✅ | ✅ `"DEFAULT GETDATE()"` | Pass |
| `status` (NVARCHAR(20)) | ✅ | ✅ | Pass |
| No `created_by` | ✅ "notifications are system-generated" | ✅ Not present | Pass |

### 2.4 Mermaid ER Diagram Syntax Validation

The ER diagram in the research document uses `erDiagram` with this entity format:

```text
entity_name {
    TYPE column_name PK|FK "comment"
}
```

**Potential issue**: The type names `NVARCHAR(100)`, `NVARCHAR(200)`, `NVARCHAR(500)`, `NVARCHAR(MAX)` contain parentheses. Some Mermaid renderers (particularly older versions) may fail to parse parentheses within attribute type specifiers. Modern Mermaid versions (10.x+) generally handle this, but it is a fragility risk.

**Recommendation**: If implementation encounters rendering failures, replace parenthesized types with underscore variants (`NVARCHAR_100`, `NVARCHAR_200`, `NVARCHAR_MAX`) or simplified labels (`nvarchar100`, `nvarchar200`, `nvarcharmax`). For now, the current syntax is acceptable — most current Mermaid renderers (GitHub, VS Code Mermaid preview) support it.

**Relationship syntax**: `||--o{` — valid Mermaid ER syntax (one-to-many). **Pass**.

### 2.5 Seed Data Validation

| id | bootstrap-demo.prompt.md (EN) | bootstrap-demo.prompt.md (FR) | Research §4.2 (EN) | Research §4.2 (FR) | Match |
|----|-------------------------------|-------------------------------|---------------------|---------------------|-------|
| 1 | Community Services | Services communautaires | Community Services | Services communautaires | Pass |
| 2 | Health & Wellness | Santé et bien-être | Health & Wellness | Santé et bien-être | Pass |
| 3 | Education & Training | Éducation et formation | Education & Training | Éducation et formation | Pass |
| 4 | Environment & Conservation | Environnement et conservation | Environment & Conservation | Environnement et conservation | Pass |
| 5 | Economic Development | Développement économique | Economic Development | Développement économique | Pass |

All 5 seed rows match exactly. **Pass**.

### 2.6 Status Values

The research document defines 4 status values: `DRAFT`, `SUBMITTED`, `APPROVED`, `REJECTED`.

- `DRAFT`: ✅ Explicitly defined in bootstrap-demo.prompt.md as the DEFAULT value.
- `APPROVED`: ✅ Implied by the `@Pattern(regexp="APPROVED|REJECTED")` validation on `ProgramReviewRequest.status`.
- `REJECTED`: ✅ Same pattern validation.
- `SUBMITTED`: ⚠️ **Not explicitly defined** in bootstrap-demo.prompt.md. The research document adds this as a logical intermediate state (citizen finalizes submission → status changes from DRAFT to SUBMITTED). This is a reasonable design enhancement that aligns with the business workflow described in README.md ("submit a program request"). **Recommendation**: Keep SUBMITTED — it provides the necessary state transition between DRAFT (initial) and the review states. Flag as a design decision, not a spec mismatch.

---

## 3. Design Document Validation

### 3.1 API Endpoints

| # | Method | Path | bootstrap-demo.prompt.md | Research §4.3 | Match |
|---|--------|------|--------------------------|---------------|-------|
| 1 | POST | `/api/programs` | ✅ "submit a program" | ✅ `ProgramSubmitRequest` → `201 Created` + `ProgramResponse` | Pass |
| 2 | GET | `/api/programs` | ✅ "list programs" | ✅ `200 OK` + `List<ProgramResponse>` | Pass |
| 3 | GET | `/api/programs/{id}` | ✅ "get single program" | ✅ `200 OK` + `ProgramResponse` or `404` | Pass |
| 4 | PUT | `/api/programs/{id}/review` | ✅ "approve/reject" | ✅ `ProgramReviewRequest` → `200 OK` + `ProgramResponse` or `404` | Pass |
| 5 | GET | `/api/program-types` | ✅ "dropdown values" | ✅ `200 OK` + `List<ProgramTypeResponse>` | Pass |

All 5 endpoints match exactly. **Pass**.

### 3.2 Request DTOs

**`ProgramSubmitRequest`:**

| Field | bootstrap-demo.prompt.md (implied) | Research §4.3 | Match |
|-------|-------------------------------------|---------------|-------|
| `programName` | ✅ program_name column, NVARCHAR(200) | ✅ `@NotBlank`, `@Size(max=200)` | Pass |
| `programDescription` | ✅ program_description column | ✅ `@NotBlank` | Pass |
| `programTypeId` | ✅ program_type_id FK | ✅ `@NotNull` | Pass |
| `createdBy` | ✅ created_by column, NVARCHAR(100) | ✅ `@NotBlank`, `@Size(max=100)` | Pass |

**`ProgramReviewRequest`:**

| Field | bootstrap-demo.prompt.md (implied) | Research §4.3 | Match |
|-------|-------------------------------------|---------------|-------|
| `status` | ✅ approve/reject action | ✅ `@NotBlank`, `@Pattern(regexp="APPROVED\|REJECTED")` | Pass |
| `reviewerComments` | ✅ reviewer_comments column | ✅ `@Size(max=4000)` | Pass |

**Note on `reviewerComments` max size**: The database column is `NVARCHAR(MAX)` (unlimited), but the DTO validation uses `@Size(max=4000)`. This is a reasonable application-level constraint to prevent abuse, even though the DB can store more. No issue.

### 3.3 Response DTOs

**`ProgramResponse`:**

| Field | Source Column / Logic | Research §4.3 | Match |
|-------|----------------------|---------------|-------|
| `id` | program.id | ✅ Integer | Pass |
| `programName` | program.program_name | ✅ String | Pass |
| `programDescription` | program.program_description | ✅ String | Pass |
| `programTypeId` | program.program_type_id | ✅ Integer | Pass |
| `programTypeName` | Resolved from program_type.type_name | ✅ String | Pass |
| `programTypeNameFr` | Resolved from program_type.type_name_fr | ✅ String | Pass |
| `status` | program.status | ✅ String | Pass |
| `reviewerComments` | program.reviewer_comments | ✅ String | Pass |
| `submittedAt` | program.submitted_at | ✅ String (ISO 8601) | Pass |
| `reviewedAt` | program.reviewed_at | ✅ String (ISO 8601) | Pass |
| `createdAt` | program.created_at | ✅ String (ISO 8601) | Pass |
| `updatedAt` | program.updated_at | ✅ String (ISO 8601) | Pass |
| `createdBy` | program.created_by | ✅ String | Pass |

**`ProgramTypeResponse`:**

| Field | Source Column | Research §4.3 | Match |
|-------|-------------|---------------|-------|
| `id` | program_type.id | ✅ Integer | Pass |
| `typeName` | program_type.type_name | ✅ String | Pass |
| `typeNameFr` | program_type.type_name_fr | ✅ String | Pass |

All DTO fields validated. **Pass**.

### 3.4 Frontend Component Hierarchy

**bootstrap-demo.prompt.md spec:**
> Layout (Header, Footer, LanguageToggle) → pages (SubmitProgram, SubmitConfirmation, SearchPrograms, ReviewDashboard, ReviewDetail)

**Research §4.3 hierarchy:**

```text
App
├── Layout
│   ├── Header ✅
│   ├── LanguageToggle ✅
│   └── Footer ✅
├── Pages
│   ├── SubmitProgram ✅
│   ├── SubmitConfirmation ✅
│   ├── SearchPrograms ✅
│   ├── ReviewDashboard ✅
│   └── ReviewDetail ✅
└── Shared
    ├── LoadingSpinner (added)
    ├── ErrorAlert (added)
    └── ProgramCard (added)
```

- All 3 layout components match: **Pass**
- All 5 page components match: **Pass**
- 3 shared components (`LoadingSpinner`, `ErrorAlert`, `ProgramCard`) are additions not in bootstrap-demo.prompt.md. These are reasonable UI utilities. **Acceptable enhancement, not a gap.**

### 3.5 Route Mapping

The research document adds explicit route mappings not in bootstrap-demo.prompt.md:

| Route | Component | Reasonable? |
|-------|-----------|-------------|
| `/` | SubmitProgram | ✅ Landing page is submission form |
| `/confirmation/:id` | SubmitConfirmation | ✅ Post-submit redirect |
| `/search` | SearchPrograms | ✅ Search page |
| `/review` | ReviewDashboard | ✅ Ministry dashboard |
| `/review/:id` | ReviewDetail | ✅ Detail view for review |

Routes are not explicitly in bootstrap-demo.prompt.md but are a necessary design decision. All routes logically follow the component hierarchy. **Pass**.

### 3.6 Error Handling

RFC 7807 `ProblemDetail` is specified in both bootstrap-demo.prompt.md (java.instructions spec mentions `ProblemDetail (RFC 7807)`) and the research document §4.3. Error scenarios cover 400, 404, and 500. **Pass**.

---

## 4. Gap Analysis

### Gaps Found

| # | Gap | Source | Severity | Recommendation |
|---|-----|--------|----------|----------------|
| 1 | RBAC authentication missing from architecture | README.md tech stack includes "RBAC authentication" | Low | Add a bullet under "Future Integrations" prose in `docs/architecture.md` noting RBAC is part of the target architecture but not implemented in this demo |
| 2 | Confirmation letter generation not addressed | README.md mentions "Optionally generate a confirmation letter for approved programs" | Low | Already covered by Out of Scope implicitly (not in bootstrap spec). No action needed. |
| 3 | MyOntario account sign-in not addressed | README.md mentions "Register or sign in with a MyOntario account (stretch goal)" | Low | Already a stretch goal in README.md, not in bootstrap spec. No action needed. |
| 4 | Mermaid ER parenthesized types fragility | Research §4.2 ER diagram uses `NVARCHAR(100)` etc. | Low | Monitor during implementation; fall back to underscore types if rendering fails |
| 5 | SUBMITTED status not in bootstrap spec | Research §4.2 adds SUBMITTED status | Info | Design enhancement — keep it; document as a design decision |

### Items Confirmed Not Gaps

| Item | Why Not a Gap |
|------|---------------|
| Figma not in architecture | Design-time tool, not a runtime component |
| GitHub Actions not in architecture | CI/CD tool, correctly excluded from runtime architecture |
| GitHub Advanced Security not in architecture | Security tooling, correctly excluded from runtime architecture |
| Azure DevOps not in architecture | Project management, correctly excluded from runtime architecture |
| Document upload not in docs spec | Explicitly out of scope in both bootstrap-demo.prompt.md and research document |

---

## 5. Summary of Corrections Needed

### No Corrections Required

The Documentation Specifications (Section 4) of the primary research document are **accurate and complete** relative to both source files. All columns, endpoints, DTOs, component hierarchies, and diagram specs match the bootstrap-demo.prompt.md specification exactly.

### Minor Enhancements Recommended (Optional)

1. **Architecture diagram**: Add RBAC authentication as a future integration note in the prose section (not the diagram itself) to align with README.md's tech stack table.
2. **Data dictionary**: Add a brief note that `SUBMITTED` is a design-decision status value not explicitly in the bootstrap spec but logically required by the workflow.
3. **Mermaid ER types**: If parenthesized types (`NVARCHAR(100)`) fail to render in the target environment, have a fallback plan to use underscore variants.

---

## Research Metadata

- **Document path**: `.copilot-tracking/research/subagents/2026-02-21/docs-layer-research.md`
- **Research status**: Complete
- **Source files analyzed**:
  - `README.md` (Lines 1–170)
  - `.github/prompts/bootstrap-demo.prompt.md` (Lines 1–215)
  - `.copilot-tracking/research/2026-02-21/demo-scaffolding-research.md` (Lines 1–963, Section 4: Lines ~330–550)
- **Recommended next research**: None required for the documentation layer — all specs validated. If a broader research pass is needed, the next candidate is the Talk Track specification (Section 5) to validate minute-range continuity and act-to-story mapping.
