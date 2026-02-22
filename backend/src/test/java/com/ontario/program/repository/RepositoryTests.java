package com.ontario.program.repository;

import java.util.List;

import com.ontario.program.model.Program;
import com.ontario.program.model.ProgramType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Repository tests for the database layer.
 * Uses H2 in MSSQLServer mode with Flyway migrations.
 */
@DataJpaTest
class RepositoryTests {

    @Autowired
    private ProgramTypeRepository programTypeRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @BeforeEach
    void setUp() {
        // Clean up programs and notifications before each test
        notificationRepository.deleteAll();
        programRepository.deleteAll();
    }

    @Test
    void shouldLoadSeededProgramTypes() {
        List<ProgramType> types = programTypeRepository.findAll();

        assertThat(types).hasSize(5);
        assertThat(types)
                .extracting(ProgramType::getTypeName)
                .containsExactlyInAnyOrder(
                        "Community Services",
                        "Health & Wellness",
                        "Education & Training",
                        "Environment & Conservation",
                        "Economic Development"
                );
    }

    @Test
    void shouldHaveFrenchTranslationsForAllProgramTypes() {
        List<ProgramType> types = programTypeRepository.findAll();

        assertThat(types)
                .extracting(ProgramType::getTypeNameFr)
                .containsExactlyInAnyOrder(
                        "Services communautaires",
                        "Santé et bien-être",
                        "Éducation et formation",
                        "Environnement et conservation",
                        "Développement économique"
                );
    }

    @Test
    void shouldSaveAndRetrieveProgram() {
        ProgramType type = programTypeRepository.findAll().getFirst();
        Program program = new Program("Test Program", "A test program description", type, "citizen1");
        program.setStatus("SUBMITTED");

        Program saved = programRepository.save(program);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getProgramName()).isEqualTo("Test Program");
        assertThat(saved.getStatus()).isEqualTo("SUBMITTED");
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();
    }

    @Test
    void shouldFindProgramsByStatus() {
        ProgramType type = programTypeRepository.findAll().getFirst();

        Program submitted = new Program("Submitted Program", "Description", type, "citizen1");
        submitted.setStatus("SUBMITTED");
        programRepository.save(submitted);

        Program draft = new Program("Draft Program", "Description", type, "citizen2");
        draft.setStatus("DRAFT");
        programRepository.save(draft);

        List<Program> results = programRepository.findByStatus("SUBMITTED");

        assertThat(results).hasSize(1);
        assertThat(results.getFirst().getProgramName()).isEqualTo("Submitted Program");
    }

    @Test
    void shouldFindProgramsByNameContaining() {
        ProgramType type = programTypeRepository.findAll().getFirst();

        programRepository.save(new Program("Community Garden", "Description", type, "citizen1"));
        programRepository.save(new Program("Youth Sports", "Description", type, "citizen2"));

        List<Program> results = programRepository.findByProgramNameContainingIgnoreCase("garden");

        assertThat(results).hasSize(1);
        assertThat(results.getFirst().getProgramName()).isEqualTo("Community Garden");
    }

    @Test
    void shouldFindNotificationsByProgramId() {
        // Initially no notifications exist
        List<com.ontario.program.model.Notification> notifications =
                notificationRepository.findByProgramId(999);

        assertThat(notifications).isEmpty();
    }
}
