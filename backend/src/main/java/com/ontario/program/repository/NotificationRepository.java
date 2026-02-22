package com.ontario.program.repository;

import java.util.List;

import com.ontario.program.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for the {@link Notification} entity.
 */
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    /**
     * Find all notifications for a given program.
     *
     * @param programId the program ID
     * @return list of notifications for that program
     */
    List<Notification> findByProgramId(Integer programId);
}
