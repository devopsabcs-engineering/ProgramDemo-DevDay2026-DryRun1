-- V001__create_program_type_table.sql
-- Creates the program_type lookup table for bilingual (EN/FR) program categories.

CREATE TABLE program_type (
    id            INT            IDENTITY(1,1) NOT NULL,
    type_name     NVARCHAR(100)  NOT NULL,
    type_name_fr  NVARCHAR(100)  NOT NULL,
    CONSTRAINT PK_program_type PRIMARY KEY (id)
);
