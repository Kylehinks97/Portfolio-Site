---
globs:
alwaysApply: ApplyIntelligently
---

# Git Workflow Guidelines
# File: .cursor/rules/git-guidelines

## Commit Requirements
- All commit messages must follow **Conventional Commits**:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `refactor:` for internal changes without behavior change
  - `docs:` for documentation
  - `style:` for formatting-only changes
  - `test:` for tests
  - `chore:` for maintenance tasks
- Commit messages must be **clear, imperative, and scoped** when relevant:
  - Example: `feat(auth): add login form validation`

## Pre‑Commit Requirements
- **Biome must run before every commit**.
- No commit is allowed unless:
  - Code is fully formatted (`biome format`).
  - Linting passes (`biome lint`).
  - TypeScript has no errors (`tsc --noEmit`).

## Staging & Changes
- Only stage files that are intentional and reviewed.
- Do not commit generated files, build artifacts, or unformatted code.
- Keep commits **small and focused**; avoid mixing unrelated changes.

## Branching
- Use short, descriptive branch names:
  - `feature/login-page`
  - `fix/user-fetch`
  - `refactor/api-client`

## Pull Requests
- PRs must contain:
  - Clean commit history following Conventional Commits.
  - Code that passes Biome and TypeScript checks.
  - Only changes relevant to the branch’s purpose.

