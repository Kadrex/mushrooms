package com.testassignment.mushroomsapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MushroomPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String details;

    @Column
    private Float lat;

    @Column
    private Float lng;

}
