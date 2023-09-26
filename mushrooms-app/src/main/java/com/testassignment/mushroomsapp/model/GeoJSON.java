package com.testassignment.mushroomsapp.model;

import lombok.Data;

@Data
public class GeoJSON {

    private String type;

    private GeoJSONProperties properties;

    private GeoJSONGeometry geometry;

}
