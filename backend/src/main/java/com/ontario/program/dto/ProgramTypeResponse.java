package com.ontario.program.dto;

/**
 * DTO for returning program type details in API responses.
 */
public record ProgramTypeResponse(
        Integer id,
        String typeName,
        String typeNameFr
) {
}
