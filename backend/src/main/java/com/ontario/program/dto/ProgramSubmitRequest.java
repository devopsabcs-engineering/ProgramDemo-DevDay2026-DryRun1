package com.ontario.program.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO for submitting a new program request.
 */
public record ProgramSubmitRequest(

        @NotBlank(message = "Program name is required")
        @Size(max = 200, message = "Program name must not exceed 200 characters")
        String programName,

        @NotBlank(message = "Program description is required")
        String programDescription,

        @NotNull(message = "Program type ID is required")
        Integer programTypeId,

        @NotBlank(message = "Created by is required")
        @Size(max = 100, message = "Created by must not exceed 100 characters")
        String createdBy,

        @DecimalMin(value = "0", message = "Program budget must be zero or positive")
        BigDecimal programBudget
) {
}
