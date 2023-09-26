package com.testassignment.mushroomsapp.service;

import com.testassignment.mushroomsapp.assets.mapper.MushroomPointGeoJSONMapper;
import com.testassignment.mushroomsapp.model.GeoJSON;
import com.testassignment.mushroomsapp.model.MushroomPoint;
import com.testassignment.mushroomsapp.repository.MushroomPointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MushroomPointsService {

    @Autowired
    private MushroomPointsRepository repository;

    @Autowired
    private MushroomPointGeoJSONMapper geoJSONMapper;

    public List<GeoJSON> getMushroomPoints() {
        return repository.findAll().stream().map(geoJSONMapper::toGeoJSON).collect(Collectors.toList());
    }

    public MushroomPoint saveMushroomPoint(GeoJSON geoJSON) {
        return repository.save(geoJSONMapper.toDatabaseObject(geoJSON));
    }

    public MushroomPoint updateMushroomPoint(GeoJSON geoJSON) {
        return repository.save(geoJSONMapper.toDatabaseObject(geoJSON));
    }

    public boolean deleteMushroomPoint(Long id) {
        repository.deleteById(id);
        return true;
    }

}
