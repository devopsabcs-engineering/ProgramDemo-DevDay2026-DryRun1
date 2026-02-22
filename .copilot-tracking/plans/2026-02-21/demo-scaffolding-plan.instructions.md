---
applyTo: '.copilot-tracking/changes/2026-02-21/demo-scaffolding-changes.md'
---
<!-- markdownlint-disable-file -->
# Implementation Plan: Demo Scaffolding

## Overview

Generate all 13 scaffolding files (7 configuration + 3 documentation + 2 scripts + 1 talk track) for the 130-minute OPS Developer Day 2026 demo, producing a fully configured repository ready for live application development.

## Objectives

### User Requirements

- Generate all 13 scaffolding files with complete content — no TODOs or placeholders — Source: Research document Section "Scope and Success Criteria"
- Each instruction file must have proper YAML frontmatter with `description` and `applyTo` — Source: Research document Section 1
- Documentation specs must include full Mermaid diagram content — Source: Research document Section 4
- Talk track must cover all 130 minutes with no time gaps — Source: Research document Section 5

### Derived Objectives

- Organize files into the target structure documented in research (`.github/`, `.vscode/`, `docs/`, `scripts/`, root) — Derived from: Research "Project Structure" discovery
- Follow HVE-Core commit message conventions for any commits created — Derived from: HVE-Core instruction files
- Ensure `.gitignore` explicitly keeps `.vscode/mcp.json`, `.copilot-tracking/`, and `.github/` tracked — Derived from: Research Section 7 key decisions

## Context Summary

### Project Files

- `README.md` — Existing project README with full business context, tech stack, and lesson learned sections
- `.github/prompts/bootstrap-demo.prompt.md` — Existing prompt with 130-minute talk track structure, database schema, API endpoints, ADO hierarchy
- `.copilot-tracking/research/2026-02-21/demo-scaffolding-research.md` — Comprehensive research covering all 13 files

### References

- Ontario Design System: https://designsystem.ontario.ca/
- RFC 7807 Problem Detail: https://www.rfc-editor.org/rfc/rfc7807
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

### Standards References

- HVE-Core commit-message.instructions.md — Conventional commit format
- HVE-Core markdown.instructions.md — Markdown linting and frontmatter standards (exempted via `<!-- markdownlint-disable-file -->` for `.copilot-tracking/` files)

## Implementation Checklist

### [ ] Implementation Phase 1: Configuration Layer

<!-- parallelizable: true -->

- [ ] Step 1.1: Create `.github/copilot-instructions.md` — global Copilot instructions
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 12-47)
- [ ] Step 1.2: Create `.github/instructions/ado-workflow.instructions.md`
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 49-87)
- [ ] Step 1.3: Create `.github/instructions/java.instructions.md`
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 89-132)
- [ ] Step 1.4: Create `.github/instructions/react.instructions.md`
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 134-177)
- [ ] Step 1.5: Create `.github/instructions/sql.instructions.md`
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 179-222)
- [ ] Step 1.6: Create `.vscode/mcp.json` — MCP server configuration for ADO
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 224-265)
- [ ] Step 1.7: Create `.gitignore` — combined Java + Node + IDE + OS ignore rules
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 267-304)

### [ ] Implementation Phase 2: Documentation Layer

<!-- parallelizable: true -->

- [ ] Step 2.1: Create `docs/architecture.md` — C4-style architecture with Mermaid flowchart
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 310-356)
- [ ] Step 2.2: Create `docs/data-dictionary.md` — database schema with Mermaid ER diagram
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 358-406)
- [ ] Step 2.3: Create `docs/design-document.md` — API endpoints, DTOs, component hierarchy
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 408-454)

### [ ] Implementation Phase 3: Operational Layer

<!-- parallelizable: true -->

- [ ] Step 3.1: Create `scripts/Start-Local.ps1` — local development startup script
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 460-505)
- [ ] Step 3.2: Create `scripts/Stop-Local.ps1` — local development stop script
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 507-541)
- [ ] Step 3.3: Create `TALK-TRACK.md` — full 130-minute talk track at repository root
  - Details: .copilot-tracking/details/2026-02-21/demo-scaffolding-details.md (Lines 543-600)

### [ ] Implementation Phase 4: Validation

<!-- parallelizable: false -->

- [ ] Step 4.1: Verify all 13 files exist with correct paths
  - List all created files and compare against the target structure in research document
- [ ] Step 4.2: Validate instruction file frontmatter
  - Confirm each `.instructions.md` file has `description` and `applyTo` in YAML frontmatter
- [ ] Step 4.3: Validate Mermaid diagrams render correctly
  - Verify `docs/architecture.md` flowchart and `docs/data-dictionary.md` ER diagram syntax
- [ ] Step 4.4: Validate talk track completeness
  - Confirm all 130 minutes are covered with no gaps between sections
  - Verify commit checkpoint table includes all 9 tags (v0.1.0–v1.0.0)
- [ ] Step 4.5: Report any blocking issues
  - Document issues requiring additional research
  - Provide next steps for any issues beyond minor fixes

## Planning Log

See [demo-scaffolding-log.md](../../plans/logs/2026-02-21/demo-scaffolding-log.md) for discrepancy tracking, implementation paths considered, and suggested follow-on work.

## Dependencies

- PowerShell 7+ (for Start-Local.ps1 and Stop-Local.ps1 script execution)
- VS Code with GitHub Copilot and MCP extension support
- Azure DevOps MCP server (`azure-devops-mcp` npm package, installed via `npx`)
- Node.js / npm (for `npx` in MCP configuration)

## Success Criteria

- All 13 scaffolding files generated with complete content — Traces to: User requirement "no TODOs or placeholders"
- Every instruction file has valid YAML frontmatter with `description` and `applyTo` — Traces to: Research Section 1 "Instruction File Architecture"
- Mermaid diagrams in `docs/architecture.md` and `docs/data-dictionary.md` use correct syntax — Traces to: Research Sections 4.1 and 4.2
- Talk track covers minutes 0–130 with no gaps — Traces to: Research Section 5
- `.gitignore` keeps `.vscode/mcp.json`, `.copilot-tracking/`, and `.github/` tracked — Traces to: Research Section 7
- ADO work item hierarchy documented with 36 items (1 Epic + 8 Features + 27 Stories) — Traces to: Research Section 3
