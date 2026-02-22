package com.ontario.program.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Lookup entity representing a bilingual program type (EN/FR).
 * This is a static reference table seeded during deployment.
 */
@Entity
@Table(name = "program_type")
public class ProgramType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type_name", nullable = false, length = 100)
    private String typeName;

    @Column(name = "type_name_fr", nullable = false, length = 100)
    private String typeNameFr;

    protected ProgramType() {
        // JPA requires a no-arg constructor
    }

    public ProgramType(String typeName, String typeNameFr) {
        this.typeName = typeName;
        this.typeNameFr = typeNameFr;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getTypeNameFr() {
        return typeNameFr;
    }

    public void setTypeNameFr(String typeNameFr) {
        this.typeNameFr = typeNameFr;
    }
}
