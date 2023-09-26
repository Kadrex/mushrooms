package com.testassignment.mushroomsapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GeoJSONGeometry {

    private String type;

    private List<Float> coordinates;

}
