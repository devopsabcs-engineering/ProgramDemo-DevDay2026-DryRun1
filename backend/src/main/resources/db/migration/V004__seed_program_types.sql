-- V004__seed_program_types.sql
-- Seeds the 5 bilingual program types used by the submission form.

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Community Services', N'Services communautaires'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Community Services');

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Health & Wellness', N'Santé et bien-être'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Health & Wellness');

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Education & Training', N'Éducation et formation'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Education & Training');

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Environment & Conservation', N'Environnement et conservation'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Environment & Conservation');

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Economic Development', N'Développement économique'
WHERE NOT EXISTS (SELECT 1 FROM program_type WHERE type_name = 'Economic Development');
