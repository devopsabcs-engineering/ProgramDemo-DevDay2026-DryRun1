<!-- markdownlint-disable-file -->
# Release Changes: Demo Scaffolding

**Related Plan**: demo-scaffolding-plan.instructions.md
**Implementation Date**: 2026-02-21

## Summary

Generate all 13 scaffolding files (7 configuration + 3 documentation + 2 scripts + 1 talk track) for the 130-minute OPS Developer Day 2026 demo.

## Changes

### Added

* `.github/copilot-instructions.md` — Global Copilot instructions with project overview, tech stack, bilingual/accessibility requirements, commit/branch conventions, ADO and Azure details
* `.github/instructions/ado-workflow.instructions.md` — ADO branching, commit, and PR workflow conventions (applyTo: `**`)
* `.github/instructions/java.instructions.md` — Java 21 and Spring Boot 3.x coding conventions (applyTo: `backend/**`)
* `.github/instructions/react.instructions.md` — React 18, TypeScript, and Vite frontend conventions (applyTo: `frontend/**`)
* `.github/instructions/sql.instructions.md` — Azure SQL and Flyway migration conventions (applyTo: `database/**`)
* `.vscode/mcp.json` — MCP server configuration for Azure DevOps integration (azure-devops-mcp)
* `.gitignore` — Combined Java + Node + IDE + OS ignore rules; keeps `.vscode/mcp.json`, `.copilot-tracking/`, and `.github/` tracked
* `docs/architecture.md` — C4-style architecture overview with Mermaid flowchart showing all Azure components in rg-dev-125
* `docs/data-dictionary.md` — Database schema with Mermaid ER diagram (3 tables), seed data (5 program types EN/FR), status values, migration plan
* `docs/design-document.md` — 5 API endpoints, request/response DTOs with validation, RFC 7807 error handling, frontend component hierarchy, route mapping
* `scripts/Start-Local.ps1` — Local development startup script with -SkipBuild, -BackendOnly, -FrontendOnly, -UseAzureSql parameters, port conflict detection
* `scripts/Stop-Local.ps1` — Local development stop script for ports 8080 and 3000 with graceful error handling
* `TALK-TRACK.md` — Full 130-minute talk track covering Opening + 8 Acts + Recap + Closing with commit checkpoints, risk mitigation, and key numbers

### Modified

### Removed

## Additional or Deviating Changes

* No deviations from the implementation plan
  * All 13 files created exactly as specified with no TODOs or placeholders

## Release Summary

**Total files affected**: 13 files created, 0 modified, 0 removed

**Files created**:
| # | Path | Purpose |
|---|------|---------|
| 1 | `.github/copilot-instructions.md` | Global Copilot instructions |
| 2 | `.github/instructions/ado-workflow.instructions.md` | ADO workflow conventions |
| 3 | `.github/instructions/java.instructions.md` | Java/Spring Boot conventions |
| 4 | `.github/instructions/react.instructions.md` | React/TypeScript conventions |
| 5 | `.github/instructions/sql.instructions.md` | SQL/Flyway conventions |
| 6 | `.vscode/mcp.json` | MCP server configuration |
| 7 | `.gitignore` | Git ignore rules |
| 8 | `docs/architecture.md` | Architecture overview + Mermaid flowchart |
| 9 | `docs/data-dictionary.md` | Data dictionary + Mermaid ER diagram |
| 10 | `docs/design-document.md` | API design + DTOs + component hierarchy |
| 11 | `scripts/Start-Local.ps1` | Local dev startup script |
| 12 | `scripts/Stop-Local.ps1` | Local dev stop script |
| 13 | `TALK-TRACK.md` | 130-minute talk track |

**Validation results**: All 5 validation checks passed (file existence, frontmatter, Mermaid syntax, talk track timing, no blocking issues)

**Deployment notes**: No deployment required — these are scaffolding/configuration files. Run `git add -A && git commit` to commit all files.
