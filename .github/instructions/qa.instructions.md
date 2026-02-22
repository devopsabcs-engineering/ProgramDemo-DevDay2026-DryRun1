---
description: "Quality assurance, testing, and CI test reporting conventions"
applyTo: "**"
---

# QA Conventions

## Test Reporting in CI

All CI workflows must publish test results to the GitHub Actions workflow summary so that every run shows a per-test breakdown.

### Required Pattern

Use [`dorny/test-reporter@v1`](https://github.com/dorny/test-reporter) with the `java-junit` reporter for both backend and frontend test results. Each job must include a reporting step that runs even when tests fail (`if: always()`).

### Backend (Java / Maven)

Maven Surefire generates JUnit XML reports automatically.

```yaml
- name: Publish backend test results
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Backend Test Results
    path: backend/target/surefire-reports/*.xml
    reporter: java-junit
```

### Frontend (Vitest)

Vitest must be configured to produce JUnit XML output alongside the default console reporter.

**vitest.config.ts:**

```typescript
reporters: ['default', 'junit'],
outputFile: {
  junit: './test-results/junit.xml',
},
```

**CI step:**

```yaml
- name: Publish frontend test results
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Frontend Test Results
    path: frontend/test-results/junit.xml
    reporter: java-junit
```

### Consistency Rules

- Every test job must have a corresponding `dorny/test-reporter` step.
- Report names must follow the pattern `{Layer} Test Results` (for example, `Backend Test Results`, `Frontend Test Results`).
- The reporting step must use `if: always()` so results appear even when tests fail.
- Test result XML files (`test-results/`) must be listed in `.gitignore`.

## Test Coverage

- Backend: Spring Boot test starter with JUnit 5 and Mockito.
- Frontend: Vitest with `@testing-library/react` and `jsdom` environment.
- All new features must include unit tests covering the primary success and failure paths.
