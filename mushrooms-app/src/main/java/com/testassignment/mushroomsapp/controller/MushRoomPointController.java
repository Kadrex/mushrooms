package com.testassignment.mushroomsapp.controller;

import com.testassignment.mushroomsapp.model.GeoJSON;
import com.testassignment.mushroomsapp.model.MushroomPoint;
import com.testassignment.mushroomsapp.service.MushroomPointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/mushroomPoints")
@CrossOrigin(origins = "${frontend.url}")
public class MushRoomPointController {

    @Autowired
    private MushroomPointsService service;

    @GetMapping
    public ResponseEntity<List<GeoJSON>> getMushroomPoints() {
        return ResponseEntity.ok(service.getMushroomPoints());
    }

    @PostMapping
    public ResponseEntity<MushroomPoint> saveMushroomPoint(@RequestBody GeoJSON geoJSON) {
        return ResponseEntity.ok(service.saveMushroomPoint(geoJSON));
    }

    @PutMapping
    public ResponseEntity<MushroomPoint> updateMushroomPoint(@RequestBody GeoJSON geoJSON) {
        return ResponseEntity.ok(service.updateMushroomPoint(geoJSON));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteMushroomPoint(@PathVariable Long id) {
        return ResponseEntity.ok(service.deleteMushroomPoint(id));
    }

}
