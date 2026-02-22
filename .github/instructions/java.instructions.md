---
description: "Java 21 and Spring Boot 3.x coding conventions"
applyTo: "backend/**"
---

# Java Coding Conventions

## Runtime

- Java 21 LTS
- Spring Boot 3.x
- Maven wrapper (`./mvnw`) — never use a globally installed Maven

## Package Structure

Use `com.ontario.program` as the base package with these sub-packages:

- `controller` — REST controllers
- `service` — business logic
- `repository` — Spring Data JPA repositories
- `model` — JPA entities
- `dto` — request and response DTOs
- `config` — configuration classes
- `exception` — custom exceptions and global error handler

## Dependency Injection

- Constructor injection only — never use `@Autowired` on fields
- Let Spring auto-detect constructors on single-constructor classes

## Request Validation

- Annotate controller method parameters with `@Valid`
- Use Bean Validation annotations on DTOs: `@NotBlank`, `@NotNull`, `@Size`, `@Pattern`

## Controller Return Types

- Return `ResponseEntity<T>` from all controller methods
- Use appropriate HTTP status codes (201 Created, 200 OK, 404 Not Found)

## Error Handling

- Use `ProblemDetail` (RFC 7807) for all error responses
- Implement a `@ControllerAdvice` class with `@ExceptionHandler` methods
- Never expose stack traces in API responses

## Database

- Spring Data JPA for data access
- Flyway for database migrations
- Migration files in `database/migrations/`

## Local Development Profile

- Profile name: `local`
- Configuration file: `application-local.yml`
- H2 in-memory database with `MODE=MSSQLServer;DATABASE_TO_LOWER=TRUE`
- H2 console enabled at `/h2-console`

## Production Profile

- Azure SQL connection via environment variables
- Never hardcode connection strings

## Server Configuration

- Port: 8080 (`server.port=8080`)
- API base path: `/api`

## Testing

- JUnit 5 for all tests
- MockMvc for controller/integration tests
- `@DataJpaTest` for repository tests
- Test profile uses H2 in-memory database
