---
description: "Azure SQL and Flyway migration conventions"
applyTo: "database/**"
---

# SQL and Database Conventions

## Target Database

- Azure SQL (PaaS) for production
- H2 in-memory with `MODE=MSSQLServer` for local development

## Migration Tool

- Flyway (integrated with Spring Boot auto-configuration)
- Migration files stored in `database/migrations/`
- Migrations are copied or symlinked to `backend/src/main/resources/db/migration/` for Spring Boot

## Migration Naming

Use versioned migration naming with double underscores:

```text
V001__create_program_type_table.sql
V002__create_program_table.sql
V003__create_notification_table.sql
V004__seed_program_types.sql
```

## Data Types

- String columns: `NVARCHAR` for all text — supports bilingual (EN/FR) content
- Primary keys: `INT IDENTITY(1,1)` — never use `BIGINT` or UUIDs for this project
- Timestamps: `DATETIME2` — never use `DATETIME` or `TIMESTAMP`

## DDL Guards

- Use `IF NOT EXISTS` on all `CREATE TABLE` statements
- Use `IF NOT EXISTS` on all `ALTER TABLE` statements
- Migrations must be idempotent and rerunnable

## Seed Data

- Use `INSERT ... WHERE NOT EXISTS (SELECT 1 FROM table WHERE condition)` pattern
- Never use `MERGE` — it has known compatibility issues with H2
- Seed data must work on both H2 and Azure SQL

## Audit Columns

- Transactional tables must include `created_at DATETIME2` and `updated_at DATETIME2`
- User-initiated records must include `created_by NVARCHAR(100)`
- Static reference/lookup tables do not require audit columns

## Foreign Keys

- Use explicit `CONSTRAINT` names following the pattern `FK_child_parent`
- Example: `CONSTRAINT FK_program_program_type FOREIGN KEY (program_type_id) REFERENCES program_type(id)`

## Indexes

- Add indexes on frequently queried columns (e.g., `status`, `program_type_id`)
- Use descriptive index names: `IX_table_column`
