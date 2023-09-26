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
    private String type;

    @Column
    private Float lat;

    @Column
    private Float lng;

}
