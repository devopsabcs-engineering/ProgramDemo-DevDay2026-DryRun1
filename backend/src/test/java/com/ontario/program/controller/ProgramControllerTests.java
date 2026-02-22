package com.ontario.program.controller;

import java.math.BigDecimal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ontario.program.dto.ProgramReviewRequest;
import com.ontario.program.dto.ProgramSubmitRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration tests for program and program-type REST endpoints.
 */
@SpringBootTest
@AutoConfigureMockMvc
class ProgramControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldReturnProgramTypes() throws Exception {
        mockMvc.perform(get("/api/program-types"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].typeName", notNullValue()))
                .andExpect(jsonPath("$[0].typeNameFr", notNullValue()));
    }

    @Test
    void shouldSubmitProgram() throws Exception {
        ProgramSubmitRequest request = new ProgramSubmitRequest(
                "Youth Arts Program", "A program for youth arts", 1, "citizen1", null);

        mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.programName", is("Youth Arts Program")))
                .andExpect(jsonPath("$.status", is("SUBMITTED")))
                .andExpect(jsonPath("$.submittedAt", notNullValue()))
                .andExpect(jsonPath("$.programTypeName", notNullValue()));
    }

    @Test
    void shouldReturnValidationErrorForBlankName() throws Exception {
        ProgramSubmitRequest request = new ProgramSubmitRequest(
                "", "A description", 1, "citizen1", null);

        mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title", is("Validation Failed")));
    }

    @Test
    void shouldGetAllPrograms() throws Exception {
        // Submit a program first
        ProgramSubmitRequest request = new ProgramSubmitRequest(
                "List Test Program", "Description", 1, "citizen1", null);
        mockMvc.perform(post("/api/programs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

        mockMvc.perform(get("/api/programs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void shouldGetProgramById() throws Exception {
        // Submit a program first
        ProgramSubmitRequest request = new ProgramSubmitRequest(
                "Get By ID Test", "Description", 1, "citizen1", null);
        MvcResult result = mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();

        Integer id = objectMapper.readTree(result.getResponse().getContentAsString())
                .get("id").asInt();

        mockMvc.perform(get("/api/programs/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.programName", is("Get By ID Test")));
    }

    @Test
    void shouldReturn404ForNonExistentProgram() throws Exception {
        mockMvc.perform(get("/api/programs/99999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title", is("Resource Not Found")));
    }

    @Test
    void shouldApproveProgram() throws Exception {
        // Submit a program first
        ProgramSubmitRequest submitRequest = new ProgramSubmitRequest(
                "Approve Test Program", "Description", 1, "citizen1", null);
        MvcResult result = mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(submitRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        Integer id = objectMapper.readTree(result.getResponse().getContentAsString())
                .get("id").asInt();

        // Approve the program
        ProgramReviewRequest reviewRequest = new ProgramReviewRequest(
                "APPROVED", "Looks good, approved.");
        mockMvc.perform(put("/api/programs/" + id + "/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reviewRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("APPROVED")))
                .andExpect(jsonPath("$.reviewerComments", is("Looks good, approved.")))
                .andExpect(jsonPath("$.reviewedAt", notNullValue()));
    }

    @Test
    void shouldRejectProgram() throws Exception {
        // Submit a program first
        ProgramSubmitRequest submitRequest = new ProgramSubmitRequest(
                "Reject Test Program", "Description", 1, "citizen1", null);
        MvcResult result = mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(submitRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        Integer id = objectMapper.readTree(result.getResponse().getContentAsString())
                .get("id").asInt();

        // Reject the program
        ProgramReviewRequest reviewRequest = new ProgramReviewRequest(
                "REJECTED", "Does not meet criteria.");
        mockMvc.perform(put("/api/programs/" + id + "/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reviewRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("REJECTED")))
                .andExpect(jsonPath("$.reviewerComments", is("Does not meet criteria.")));
    }

    @Test
    void shouldReturn404WhenReviewingNonExistentProgram() throws Exception {
        ProgramReviewRequest reviewRequest = new ProgramReviewRequest("APPROVED", "Comment");

        mockMvc.perform(put("/api/programs/99999/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reviewRequest)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title", is("Resource Not Found")));
    }

    @Test
    void shouldReturnValidationErrorForInvalidReviewStatus() throws Exception {
        ProgramReviewRequest reviewRequest = new ProgramReviewRequest("INVALID", "Comment");

        mockMvc.perform(put("/api/programs/1/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reviewRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title", is("Validation Failed")));
    }

    @Test
    void shouldSubmitProgramWithBudget() throws Exception {
        ProgramSubmitRequest request = new ProgramSubmitRequest(
                "Budget Program", "A program with budget", 1, "citizen1",
                new BigDecimal("50000.00"));

        mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.programName", is("Budget Program")))
                .andExpect(jsonPath("$.programBudget", is(50000.00)));
    }

    @Test
    void shouldReturnValidationErrorForNegativeBudget() throws Exception {
        ProgramSubmitRequest request = new ProgramSubmitRequest(
                "Negative Budget", "Description", 1, "citizen1",
                new BigDecimal("-100.00"));

        mockMvc.perform(post("/api/programs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title", is("Validation Failed")));
    }

    @Test
    void shouldReturnHealthStatus() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UP")));
    }
}
