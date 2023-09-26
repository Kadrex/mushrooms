package com.testassignment.mushroomsapp.assets.mapper;

import com.testassignment.mushroomsapp.model.GeoJSON;
import com.testassignment.mushroomsapp.model.GeoJSONGeometry;
import com.testassignment.mushroomsapp.model.GeoJSONProperties;
import com.testassignment.mushroomsapp.model.MushroomPoint;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class MushroomPointGeoJSONMapper {

    private static final String GEO_JSON_TYPE = "Feature";
    private static final String GEO_JSON_GEOMETRY_TYPE = "Point";

    public MushroomPoint toDatabaseObject(GeoJSON geoJSON) {
        MushroomPoint mushroomPoint = new MushroomPoint();
        mushroomPoint.setId(geoJSON.getProperties().getId());
        mushroomPoint.setType(geoJSON.getProperties().getName());
        mushroomPoint.setLat(geoJSON.getGeometry().getCoordinates().get(0));
        mushroomPoint.setLng(geoJSON.getGeometry().getCoordinates().get(1));
        return mushroomPoint;
    }

    public GeoJSON toGeoJSON(MushroomPoint mushroomPoint) {
        GeoJSON geoJSON = new GeoJSON();
        geoJSON.setType(GEO_JSON_TYPE);
        geoJSON.setProperties(new GeoJSONProperties(mushroomPoint.getId(), mushroomPoint.getType()));
        geoJSON.setGeometry(new GeoJSONGeometry(GEO_JSON_GEOMETRY_TYPE, Arrays.asList(mushroomPoint.getLng(), mushroomPoint.getLat())));
        return geoJSON;
    }

}
