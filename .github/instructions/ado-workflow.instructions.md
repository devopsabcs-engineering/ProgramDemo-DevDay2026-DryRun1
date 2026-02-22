---
description: "ADO branching, commit, and PR workflow conventions"
applyTo: "**"
---

# ADO Workflow Conventions

## Branching

- Create a feature branch from `main` for each user story: `feature/{id}-description`
- Keep branch names lowercase with hyphens

## Commit Messages

- Every commit message must start with the ADO work item ID: `AB#{id} descriptive message`
- Keep commits atomic — one logical change per commit
- Use imperative mood in commit descriptions

## Pull Requests

- Every PR body must include `Fixes AB#{id}` to auto-transition the linked work item to Done
- Squash merge PRs to keep `main` history clean
- PR title should match the user story title

## Tagging

- All work items created by AI agents (GitHub Copilot, MCP tools, etc.) must include the tag `Agentic AI`
- This tag distinguishes AI-generated work items from human-created ones
- Apply the tag at creation time using the `System.Tags` field

## Post-Merge

- Delete the feature branch after PR merge
- Verify the ADO work item moved to Done
