package com.ontario.program.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * DTO for reviewing (approving or rejecting) a program submission.
 */
public record ProgramReviewRequest(

        @NotBlank(message = "Status is required")
        @Pattern(regexp = "APPROVED|REJECTED", message = "Status must be APPROVED or REJECTED")
        String status,

        @Size(max = 4000, message = "Reviewer comments must not exceed 4000 characters")
        String reviewerComments
) {
}
