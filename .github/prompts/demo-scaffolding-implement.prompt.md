---
description: "Executes the demo scaffolding implementation plan with phase-stop for user review and commit at each checkpoint"
agent: Task Implementor
argument-hint: "[phaseStop={true|false}]"
---

# Demo Scaffolding Implementation

## Inputs

* ${input:phaseStop:true}: (Optional, defaults to true) Stop after each phase for user review and commit.

## Context

This prompt executes the 4-phase implementation plan for the OPS Developer Day 2026 demo scaffolding. Each phase produces a set of complete files and pauses for the user to review and commit before continuing to the next phase.

### Starting State

Only two files exist in the repository:

1. `README.md` — business problem and tech stack
2. `.github/prompts/bootstrap-demo.prompt.md` — the bootstrap prompt

The implementation plan in `.copilot-tracking/plans/` specifies 4 phases with commit checkpoints.

## Requirements

1. Locate the implementation plan in `.copilot-tracking/plans/` for the demo-scaffolding task.
2. Execute all phases in order, creating every file with complete, production-ready content — no TODOs, no placeholders, no incomplete sections.
3. When `${input:phaseStop}` is true, stop after each phase and present a summary of files created so the user can review and commit before proceeding.
4. Apply all conventions from `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md` as they become available in each phase.

### Phase Execution Order

* **Phase 1: Configuration Files** — `.gitignore`, `.vscode/mcp.json`, `.github/copilot-instructions.md`, and 4 instruction files → commit checkpoint
* **Phase 2: Documentation Files** — `docs/architecture.md`, `docs/data-dictionary.md`, `docs/design-document.md` → commit checkpoint
* **Phase 3: Operational Files** — `scripts/Start-Local.ps1`, `scripts/Stop-Local.ps1` → commit checkpoint
* **Phase 4: Talk Track** — `TALK-TRACK.md` at repository root → commit checkpoint

### Quality Gates at Each Phase Stop

When pausing between phases, present:

* List of files created with brief descriptions
* Validation results (YAML frontmatter validity, Mermaid syntax, script syntax)
* Suggested commit message following the project's commit conventions
* Confirmation prompt to continue to the next phase

## Required Protocol

Follow the agent's Required Phases for plan analysis, iterative execution, and consolidation. Apply the `phaseStop` input to govern pause behavior between phases.
