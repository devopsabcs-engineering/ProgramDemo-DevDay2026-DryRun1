-- V002__create_program_table.sql
-- Creates the program table for citizen program submissions.

CREATE TABLE program (
    id                   INT            IDENTITY(1,1) NOT NULL,
    program_name         NVARCHAR(200)  NOT NULL,
    program_description  NVARCHAR(MAX)  NOT NULL,
    program_type_id      INT            NOT NULL,
    status               NVARCHAR(20)   NOT NULL  DEFAULT 'DRAFT',
    reviewer_comments    NVARCHAR(MAX)  NULL,
    submitted_at         DATETIME2      NULL,
    reviewed_at          DATETIME2      NULL,
    created_at           DATETIME2      NOT NULL  DEFAULT GETDATE(),
    updated_at           DATETIME2      NOT NULL  DEFAULT GETDATE(),
    created_by           NVARCHAR(100)  NOT NULL,
    CONSTRAINT PK_program PRIMARY KEY (id),
    CONSTRAINT FK_program_program_type FOREIGN KEY (program_type_id) REFERENCES program_type(id)
);

-- Indexes for frequently queried columns
CREATE INDEX IX_program_status ON program (status);
CREATE INDEX IX_program_program_type_id ON program (program_type_id);
