# Global Coding Standards

These rules apply across all languages and stacks in this repo.

## 1. Commenting & Documentation

- Comment **business logic** and **architecture decisions**, not obvious syntax.
- Prefer JSDoc (JS/TS) or idiomatic doc comments for the language in use.

Good example:

```ts
/**
 * Validates a checkout request against inventory and pricing rules,
 * then creates an order in an idempotent way using the provided idempotency key.
 */
async function processCheckout(request: CheckoutRequest): Promise<Order> { ... }
```

- Keep comments up-to-date when behavior changes; do not leave misleading docstrings.

## 2. Naming Conventions

- Variables, functions, and methods: camelCase, descriptive, no meaningless names like tmp or data when more precise names are possible.
- Classes, components, and types: PascalCase.
- Constants and environment flags: UPPER_SNAKE_CASE for configuration and true constants.
- Files:
  - Use kebab-case (e.g., user-profile.tsx, auth-service.ts) unless the framework enforces another convention.
  - Follow existing patterns in the repo first.

## 3. Error Handling & Logging

- Never leave catch blocks empty.
- Always log or propagate errors with enough context to debug:
  - What operation failed.
  - Relevant IDs (user ID, order ID, correlation/request ID).
- Do not log secrets, access tokens, passwords, or raw payment data.
- Prefer structured logs where available.

Example:

```ts
logger.error('Failed to process checkout', {
  orderId,
  userId,
  error: error.message,
});
```

## 4. Testing

- For non-trivial business logic changes, add or update at least one automated test.
- Follow the existing testing stack (Jest, Vitest, Playwright, etc.) and file layout.
- Aim for tests that:
  - Assert observable behavior, not implementation details.
  - Cover both happy path and at least one failure scenario.

## 5. Style & Anti-Patterns

- Prefer clear, readable code over clever one-liners.
- reasonable nesting
- prefer pure functions
- KISS over DRY: Sometimes a little duplication is better than a wrong abstraction. Avoid "pre-mature optimization."
- Comments: tell why not how
- Avoid:
  - Broad any in TypeScript without justification.
  - Global mutable state unless the repo is already designed around it.
  - Silent failures (swallowed errors, empty catch, or returns that hide problems).
- Respect existing linting and formatting tools (ESLint, Prettier, etc.); align with their expectations instead of inventing new styles

## TDD

To make your TDD workflow **system-agnostic**, we must treat code as a "Black Box" where the focus is on **Inputs, Outputs, and Side Effects** rather than specific syntax.

This checklist ensures that whether your team is writing a Python AI agent, a React UI component, or a Rust backend, the quality gates remain identical.

---

## 1. Pre-Flight: The "Think Twice" Phase

*Before a single line of test code is written:*

- [ ] **Identify the "Unit":** Is this a pure function, a class, or a module?
- [ ] **Define the Contract:** What are the mandatory inputs? What is the guaranteed output?
- [ ] **Categorize the Logic:** * **Pure Logic:** (e.g., Data transformation) → Needs high-coverage unit tests.
- **Side-Effect Heavy:** (e.g., Database write, API call) → Needs Mocks/Stubs.
- **Critical Path:** (e.g., Payment processing) → Needs "Triangulation" (multiple test cases for one result).

---

## 2. The Red Phase (Write the Failing Test)

*Goal: Prove that the feature does not yet exist or is currently broken.*

- [ ] **The "Happy Path":** Write a test for the most basic successful execution.
- [ ] **The "Edge Cases":** Write tests for `null`, `empty string`, `negative numbers`, or `timeout`.
- [ ] **The "Evil Input":** What happens if an AI injection or malformed JSON is passed?
- [ ] **Assert Failure:** Run the test. **It must fail.** If it passes now, your test is flawed or the feature already exists.

---

## 3. The Green Phase (Make it Pass)

*Goal: Write the simplest, "ugliest" code possible to satisfy the test.*

- [ ] **Write Minimal Code:** Do not optimize. Do not add "extra" features you think you'll need later (YAGNI).
- [ ] **Verify Pass:** All tests should turn green.
- [ ] **Check for "False Greens":** Ensure you aren't passing because of a hardcoded return value (unless you're just starting the triangulation).

---

## 4. The Refactor Phase (Clean the Engine)

*Goal: Improve the code structure without changing its behavior.*

- [ ] **KISS & DRY:** Remove duplication and simplify complex nesting.
- [ ] **Agnostic Naming:** Ensure variables describe **intent**, not implementation (e.g., `userCredentials` instead of `userJsonString`).
- [ ] **Performance Check:** Did this implementation introduce an  complexity where  was possible?
- [ ] **Interface Check:** Does this function follow your chosen Design Pattern (e.g., Strategy, Factory)?

---

## 5. The "Agnostic Integration" Gate

*Goal: Ensure the unit plays well with the rest of the ecosystem.*

- [ ] **Mock Verification:** If you used Mocks/Stubs, are they still reflecting the real API’s current state?
- [ ] **Boundary Testing:** Does this unit handle errors from the layer below it (e.g., DB connection loss)?
- [ ] **Observability:** Does the code emit the necessary logs/telemetry for your Automation/AI agents to monitor it in production?

---

## The TDD "Mantra" for your Consultants

> **"If it isn't tested, it's broken by design."**

### Summary Table: TDD across the Stack

| Layer | Testing Tool Strategy | Agnostic Focus |
| --- | --- | --- |
| **Frontend** | Vitest / Jest / Playwright | Component behavior & Accessibility (ARIA labels) |
| **Backend** | PyTest / GoTest / JUnit | Data integrity & Status Codes |
| **AI / LLM** | PromptFoo / Custom Eval Scripts | Output variance & Hallucination rates |
| **Automation** | n8n / Logic Apps Test Mode | Workflow trigger accuracy & Payload mapping |
