package com.ontario.program.controller;

import java.util.List;

import com.ontario.program.dto.ProgramTypeResponse;
import com.ontario.program.service.ProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for program type lookup values.
 */
@RestController
@RequestMapping("/api/program-types")
public class ProgramTypeController {

    private final ProgramService programService;

    public ProgramTypeController(ProgramService programService) {
        this.programService = programService;
    }

    /**
     * Retrieve all program types for dropdown population.
     *
     * @return 200 OK with the list of program types
     */
    @GetMapping
    public ResponseEntity<List<ProgramTypeResponse>> getAllProgramTypes() {
        return ResponseEntity.ok(programService.getAllProgramTypes());
    }
}
