package com.testassignment.mushroomsapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class MushroomPoint {

    @Id
    private Long id;

    @Column
    private String type;

    @Column
    private Float xCoordinates;

    @Column
    private Float yCoordinates;

}
