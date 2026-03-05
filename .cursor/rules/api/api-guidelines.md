---
globs:
alwaysApply: ApplyIntelligently
---

# Symfony API Development Guidelines
# File: .cursor/rules/api-guidelines

## General Principles
- This project follows **strict API‑first** design.
- All controllers **must return JSON** responses only.
- All endpoints must be **stateless** and follow REST semantics unless explicitly documented otherwise.
- All business logic belongs in **services**, not controllers or repositories.
- All data access belongs in **repositories**, which must only **fetch** or **persist** entities—never contain domain logic.

---

## Controllers
- Controllers act only as **orchestrators**:
  - Validate input (DTOs, request objects, Symfony Validator).
  - Call the appropriate **service** to perform the actual work.
  - Return a **JsonResponse** or use Symfony’s `json()` helper.
- Controllers must **not**:
  - Contain business logic.
  - Access the EntityManager directly.
  - Query repositories for anything other than fetching data.
  - Build entities manually when a service should handle it.
- Use **constructor injection** for services and repositories.
- Use **attribute routing** (`#[Route]`) and explicit HTTP methods.

---

## Services
- Services contain **all business logic** and domain operations.
- Services may:
  - Coordinate multiple repositories.
  - Perform calculations, transformations, and validations.
  - Create, update, or delete entities.
  - Throw domain‑specific exceptions.
- Services must **not**:
  - Return HTTP responses.
  - Know anything about controllers or the HTTP layer.
- Services should be **stateless** and **idempotent** where possible.

---

## Repositories
- Repositories are responsible only for **fetching and persisting** entities.
- Repositories must:
  - Extend `ServiceEntityRepository`.
  - Contain only query logic (DQL, QueryBuilder, criteria).
- Repositories must **not**:
  - Contain business rules.
  - Perform calculations or transformations.
  - Trigger side effects.
- If a method does more than “fetch something”, it belongs in a service.

---

## Entities & Data Model
- Entities represent **pure domain objects**.
- Entities may contain:
  - Basic invariants (e.g., non‑empty fields).
  - Simple helper methods.
- Entities must **not**:
  - Contain business workflows.
  - Perform external calls.
  - Depend on services.

---

## Request & Response Handling
- All responses must be **JSON**.
- Use:
  - `JsonResponse`
  - `$this->json()`
  - Symfony Serializer for complex objects.
- Never return raw entities directly—use:
  - DTOs
  - Normalizers
  - Transformers
- All incoming data must be validated using:
  - Symfony Validator
  - Request DTOs
  - Form objects (only if necessary)

---

## Error Handling
- Use Symfony’s exception listener to convert exceptions into JSON errors.
- Throw domain exceptions from services (e.g., `UserNotFoundException`).
- Controllers should not contain `try/catch` unless mapping exceptions to HTTP codes.
- Error responses must follow a consistent JSON structure:

```json
{
    "error": {
    "message": "string",
    "code": "string|int",
    "details": {}
}
```


---

## Naming & Structure
- Controllers end with `Controller`.
- Services end with `Service`.
- Repositories end with `Repository`.
- DTOs end with `Request` or `Response`.
- Directory structure:


---

## Testing
- Controllers: test routing, HTTP codes, and JSON structure.
- Services: test business logic in isolation.
- Repositories: test query behavior using the test database.
- Avoid mocking repositories excessively—prefer integration tests.
- Use DataProviders to pass many cases to a test.

---

## Performance & Security
- Always validate input.
- Always sanitize output via DTOs or serialization groups.
- Avoid N+1 queries (use joins, fetch joins, or dedicated queries).
- Use caching where appropriate (Symfony Cache, HTTP caching).
- Never expose internal IDs unless intended; consider UUIDs.

