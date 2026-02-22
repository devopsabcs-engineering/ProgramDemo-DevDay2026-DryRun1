package com.ontario.program.controller;

import java.net.URI;
import java.util.List;

import com.ontario.program.dto.ProgramResponse;
import com.ontario.program.dto.ProgramReviewRequest;
import com.ontario.program.dto.ProgramSubmitRequest;
import com.ontario.program.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for program submission and review operations.
 */
@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    /**
     * Submit a new program request.
     *
     * @param request the program submission details
     * @return 201 Created with the saved program
     */
    @PostMapping
    public ResponseEntity<ProgramResponse> submitProgram(
            @Valid @RequestBody ProgramSubmitRequest request) {
        ProgramResponse response = programService.submitProgram(request);
        URI location = URI.create("/api/programs/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    /**
     * List all programs.
     *
     * @return 200 OK with the list of programs
     */
    @GetMapping
    public ResponseEntity<List<ProgramResponse>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    /**
     * Retrieve a single program by ID.
     *
     * @param id the program ID
     * @return 200 OK with the program details
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getProgramById(@PathVariable Integer id) {
        return ResponseEntity.ok(programService.getProgramById(id));
    }

    /**
     * Approve or reject a program submission.
     *
     * @param id      the program ID
     * @param request the review decision and optional comments
     * @return 200 OK with the updated program
     */
    @PutMapping("/{id}/review")
    public ResponseEntity<ProgramResponse> reviewProgram(
            @PathVariable Integer id,
            @Valid @RequestBody ProgramReviewRequest request) {
        return ResponseEntity.ok(programService.reviewProgram(id, request));
    }
}
