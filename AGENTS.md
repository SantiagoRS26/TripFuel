# AGENTS.md — Generic best-practices guide (Frontend & Backend)

**Purpose:**
This guide is a generic contract for agents/codegen (e.g., GPT-5-Codex) that must produce code and changes which are scalable, maintainable and robust for both frontend and backend projects. It is intentionally technology-agnostic and avoids project-specific implementations. When you generate code, follow these rules and templates.

---

## 1 Principles (general)

- **Separation of concerns / Single Responsibility:** each module/component/service should have a single, well-defined responsibility. Avoid large units that mix unrelated logic.
- **KISS & YAGNI:** keep solutions simple and don’t add features before they are needed.
- **DRY with judgment:** avoid duplication but don’t abstract prematurely.
- **Fail fast & explicit error handling:** validate inputs and return/propagate errors with useful context; don’t silently swallow critical failures.
- **Determinism & testability:** structure code so dependencies and I/O are injectable and separable, making testing straightforward.
- **Clear APIs & contracts:** document public contracts and avoid breaking changes without a migration strategy.
- **Observability by design:** record enough information for diagnosis (structured logs, traces or metrics as appropriate to the project).
- **Security from the start:** validate, escape, avoid exposing secrets, and follow least-privilege principles.
- **Measure before optimizing:** profile/measure before making performance tradeoffs; prefer clarity over premature micro-optimizations.
- **Reproducible automation:** aim for build/test/deploy steps that any team member can run reproducibly.

---

## 2 Concrete instructions the agent must follow when generating changes

- **Atomic, focused PRs:** prefer small, purposeful changes per PR/commit when feasible.
- **Include relevant tests:** when changing logic, add tests (unit and/or integration as appropriate) covering happy paths and edge cases.
- **Document public behavior changes:** update README or changelog briefly for any public behavior modification.
- **Don’t break contracts without a plan:** when an API changes, keep compatibility or document migration and scope of the breaking change.
- **State assumptions:** list explicit assumptions in the change description (data formats, limits, defaults).
- **Provide usage & verification examples:** include snippets and quick steps to manually verify the core behavior.

---

## 3 Commit & PR style

- **Commit messages:** use predictable conventions (for example: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`).
  Example: `feat(auth): add refresh token rotation`.
- **Minimal PR description template:** include:

  - Short summary (1–2 lines)
  - Context / problem being solved
  - Key changes (bulleted)
  - How to verify (steps / commands)
  - Tests added
  - Risks / review points
  - Checklist (lint, tests, docs)

---

## 4 Code quality & tooling (principles, not mandates)

- **Linters & formatters:** pick tools appropriate to the stack and use them consistently (the specific tools depend on the project).
- **Static checks & types:** favor static typing and compile-time checks when available in the language.
- **Dependency & static analysis:** integrate automated scanning for vulnerabilities and quality issues where practical.
- **Tests & pragmatic coverage:** maintain tests for critical logic; coverage is useful but shouldn’t be enforced blindly.
- **Pre-commit & basic CI checks:** prevent commits with failing linters/tests via hooks or CI gates (details depend on the repo).

---

## 5 Testing — generic strategy

- **Unit tests:** cover pure logic and validations.
- **Integration tests:** verify interactions with infrastructure (DB, queues, external APIs) using test environments or fakes.
- **E2E / contract tests:** for critical user flows or inter-service contracts only.
- **Fakes & mocks:** use fakes for fast tests and real instances for higher-confidence integration tests.
- **CI integration:** ensure relevant tests run as part of change verification (e.g., on pull requests).

---

## 6 Security — general directives

- **Do not store secrets in source.** Use an appropriate secrets management approach outside the repository.
- **Least privilege:** grant the minimum necessary permissions to credentials and services.
- **Server-side validation required:** never rely solely on client validation for critical checks.
- **Dependency scanning & patching:** run automated checks and keep dependencies up to date.
- **Centralize auth/authorization when practical** and make policies auditable.

---

## 7 Frontend — general rules

- **Basic accessibility (a11y):** support keyboard navigation and semantic attributes where applicable.
- **Reasonable state management:** prefer local/composable state; justify global state solutions when used.
- **Asset responsibility:** serve images and resources responsively and appropriately sized.
- **Separate UI from business logic:** keep presentation components thin and move business logic elsewhere.
- **Client security:** never store or expose secrets in client code; do not trust the client for critical decisions.

---

## 8 Backend — general rules

- **Application layer separated from infrastructure & domain:** keep use cases/business logic decoupled from infra details.
- **Input validation & mapping:** validate inputs at the boundary and map to domain entities/DTOs explicitly.
- **External calls resilience:** implement retries/backoff and graceful degradation where appropriate.
- **Idempotency & consistency:** design operations to tolerate retries when it makes sense.
- **Controlled caching:** define when and how data is cached and document coherence expectations.

---

## 9 Useful templates (generic examples)

### Commit example

```
feat(auth): implement refresh token rotation

- added /token/refresh endpoint
- token metadata persisted (conceptual)
- unit tests for rotation logic
```

### PR description example

```
Summary: Add refresh token rotation.

Context:
- Improves security by preventing token reuse.

Changes:
- New /token/refresh endpoint
- Conceptual token sessions storage

How to verify:
1. Install deps
2. Run tests
3. Execute example requests

Checklist:
- [ ] Tests pass
- [ ] Linter OK
- [ ] Minimal docs added
```

---

## 10 Quick code review checklist

- Is the change atomic and is the title/commit clear?
- Does the code respect SRP and remain testable?
- Are there tests covering relevant cases?
- Were secrets added accidentally?
- Was documentation updated if needed?
- Are non-trivial technical decisions justified?
- Are there apparent performance regressions without measurement?
- Do logs and errors include sufficient context?

---

## 11 Final notes & reminders to the agent

- **Explain the “why”:** include a short justification (2–4 lines) for the change in PR/commit descriptions.
- **Provide reproducible examples or easy fakes** that can be swapped for real integrations.
- **When context is missing, simulate dependencies** explicitly and document where replacements are needed.
- **If you make irreversible decisions,** list alternatives and a brief rationale.
- **Project rules override this guide:** if the repository has its own conventions, follow those and document any deviation from this generic guide.
