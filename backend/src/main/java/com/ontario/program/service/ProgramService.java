package com.ontario.program.service;

import java.time.LocalDateTime;
import java.util.List;

import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ProgramReviewRequest;
import com.ontario.program.dto.ProgramSubmitRequest;
import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.exception.ResourceNotFoundException;
import com.ontario.program.model.Program;
import com.ontario.program.model.ProgramType;
import com.ontario.program.repository.ProgramRepository;
import com.ontario.program.repository.ProgramTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service layer for program submission and review operations.
 */
@Service
@Transactional(readOnly = true)
public class ProgramService {

    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    public ProgramService(ProgramRepository programRepository,
                          ProgramTypeRepository programTypeRepository) {
        this.programRepository = programRepository;
        this.programTypeRepository = programTypeRepository;
    }

    /**
     * Submit a new program request. Sets status to SUBMITTED with a timestamp.
     */
    @Transactional
    public ProgramResponse submitProgram(ProgramSubmitRequest request) {
        ProgramType programType = programTypeRepository.findById(request.programTypeId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program type not found with id: " + request.programTypeId()));

        Program program = new Program(
                request.programName(),
                request.programDescription(),
                programType,
                request.createdBy()
        );
        program.setStatus("SUBMITTED");
        program.setSubmittedAt(LocalDateTime.now());

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    /**
     * Retrieve all programs.
     */
    public List<ProgramResponse> getAllPrograms() {
        return programRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Retrieve a single program by ID.
     */
    public ProgramResponse getProgramById(Integer id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program not found with id: " + id));
        return toResponse(program);
    }

    /**
     * Review (approve or reject) a program submission.
     */
    @Transactional
    public ProgramResponse reviewProgram(Integer id, ProgramReviewRequest request) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program not found with id: " + id));

        program.setStatus(request.status());
        program.setReviewerComments(request.reviewerComments());
        program.setReviewedAt(LocalDateTime.now());

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    /**
     * Retrieve all program types for dropdown population.
     */
    public List<ProgramTypeResponse> getAllProgramTypes() {
        return programTypeRepository.findAll().stream()
                .map(this::toTypeResponse)
                .toList();
    }

    private ProgramResponse toResponse(Program program) {
        ProgramType type = program.getProgramType();
        return new ProgramResponse(
                program.getId(),
                program.getProgramName(),
                program.getProgramDescription(),
                type.getId(),
                type.getTypeName(),
                type.getTypeNameFr(),
                program.getStatus(),
                program.getReviewerComments(),
                program.getSubmittedAt(),
                program.getReviewedAt(),
                program.getCreatedAt(),
                program.getUpdatedAt(),
                program.getCreatedBy()
        );
    }

    private ProgramTypeResponse toTypeResponse(ProgramType type) {
        return new ProgramTypeResponse(
                type.getId(),
                type.getTypeName(),
                type.getTypeNameFr()
        );
    }
}
