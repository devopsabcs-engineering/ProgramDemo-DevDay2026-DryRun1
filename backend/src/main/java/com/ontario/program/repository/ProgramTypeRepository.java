package com.ontario.program.repository;

import com.ontario.program.model.ProgramType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for the {@link ProgramType} lookup table.
 */
public interface ProgramTypeRepository extends JpaRepository<ProgramType, Integer> {
}
