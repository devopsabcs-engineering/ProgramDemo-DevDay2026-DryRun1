# Design Document

## API Endpoints

| # | Method | Path | Description | Request Body | Response |
|---|--------|------|-------------|-------------|----------|
| 1 | POST | `/api/programs` | Submit a new program | `ProgramSubmitRequest` | `201 Created` + `ProgramResponse` |
| 2 | GET | `/api/programs` | List all programs | — | `200 OK` + `List<ProgramResponse>` |
| 3 | GET | `/api/programs/{id}` | Get a single program by ID | — | `200 OK` + `ProgramResponse` or `404` |
| 4 | PUT | `/api/programs/{id}/review` | Approve or reject a program | `ProgramReviewRequest` | `200 OK` + `ProgramResponse` or `404` |
| 5 | GET | `/api/program-types` | List all program types | — | `200 OK` + `List<ProgramTypeResponse>` |

## Request DTOs

### `ProgramSubmitRequest`

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `programName` | `String` | `@NotBlank`, `@Size(max=200)` | Name of the program being submitted |
| `programDescription` | `String` | `@NotBlank` | Detailed description of the program |
| `programTypeId` | `Integer` | `@NotNull` | Foreign key reference to `program_type` |
| `createdBy` | `String` | `@NotBlank`, `@Size(max=100)` | Identifier of the submitting citizen |

### `ProgramReviewRequest`

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `status` | `String` | `@NotBlank`, `@Pattern(regexp="APPROVED\|REJECTED")` | Review decision |
| `reviewerComments` | `String` | `@Size(max=4000)` | Optional comments from the Ministry reviewer |

## Response DTOs

### `ProgramResponse`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Integer` | Program ID |
| `programName` | `String` | Name of the program |
| `programDescription` | `String` | Detailed description |
| `programTypeId` | `Integer` | Foreign key to `program_type` |
| `programTypeName` | `String` | Resolved program type name in English |
| `programTypeNameFr` | `String` | Resolved program type name in French |
| `status` | `String` | Current workflow status |
| `reviewerComments` | `String` | Ministry reviewer comments |
| `submittedAt` | `String` (ISO 8601) | Submission timestamp |
| `reviewedAt` | `String` (ISO 8601) | Review timestamp |
| `createdAt` | `String` (ISO 8601) | Record creation timestamp |
| `updatedAt` | `String` (ISO 8601) | Last update timestamp |
| `createdBy` | `String` | Submitter identifier |

### `ProgramTypeResponse`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Integer` | Program type ID |
| `typeName` | `String` | English name |
| `typeNameFr` | `String` | French name |

## Error Handling

All error responses use the RFC 7807 `ProblemDetail` format:

```json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "programName: must not be blank",
  "instance": "/api/programs"
}
```

### Error Scenarios

| HTTP Status | Condition | Example |
|-------------|-----------|---------|
| `400 Bad Request` | Validation failure | Missing required field, invalid status value |
| `404 Not Found` | Resource not found | Program ID or program type ID does not exist |
| `500 Internal Server Error` | Unexpected server error | Database connectivity failure |

## Frontend Component Hierarchy

```text
App
├── Layout
│   ├── Header (Ontario DS header with logo and nav)
│   ├── LanguageToggle (EN/FR switch using i18next)
│   └── Footer (Ontario DS footer)
├── Pages
│   ├── SubmitProgram (form: program name, description, type dropdown)
│   ├── SubmitConfirmation (success message with program details)
│   ├── SearchPrograms (search by name, results table)
│   ├── ReviewDashboard (table of submitted programs for ministry)
│   └── ReviewDetail (program details + approve/reject buttons + comments)
└── Shared
    ├── LoadingSpinner
    ├── ErrorAlert
    └── ProgramCard
```

## Route Mapping

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `SubmitProgram` | Citizen program submission form |
| `/confirmation/:id` | `SubmitConfirmation` | Submission confirmation with details |
| `/search` | `SearchPrograms` | Search programs by name |
| `/review` | `ReviewDashboard` | Ministry review dashboard |
| `/review/:id` | `ReviewDetail` | Individual program review page |
