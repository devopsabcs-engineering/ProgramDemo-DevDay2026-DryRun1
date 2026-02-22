package com.ontario.program.repository;

import java.util.List;

import com.ontario.program.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for the {@link Program} entity.
 */
public interface ProgramRepository extends JpaRepository<Program, Integer> {

    /**
     * Find programs by their workflow status.
     *
     * @param status the status to filter by (e.g. SUBMITTED, APPROVED, REJECTED)
     * @return list of matching programs
     */
    List<Program> findByStatus(String status);

    /**
     * Find programs whose name contains the given search term (case-insensitive).
     *
     * @param programName the search term
     * @return list of matching programs
     */
    List<Program> findByProgramNameContainingIgnoreCase(String programName);
}
