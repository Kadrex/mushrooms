package com.testassignment.mushroomsapp.controller;

import com.testassignment.mushroomsapp.model.MushroomPoint;
import com.testassignment.mushroomsapp.service.MushroomPointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController(value = "/api/mushroomPoints")
public class MushRoomPointController {

    @Autowired
    private MushroomPointsService service;

    @GetMapping
    public ResponseEntity<List<MushroomPoint>> getMushroomPoints() {
        return ResponseEntity.ok(service.getMushroomPoints());
    }

    @PostMapping
    public ResponseEntity<MushroomPoint> saveMushroomPoint(@RequestBody MushroomPoint mushroomPoint) {
        return ResponseEntity.ok(service.saveMushroomPoint(mushroomPoint));
    }

    @PutMapping
    public ResponseEntity<MushroomPoint> updateMushroomPoint(@RequestBody MushroomPoint mushroomPoint) {
        return ResponseEntity.ok(service.updateMushroomPoint(mushroomPoint));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteMushroomPoint(@PathVariable Long id) {
        return ResponseEntity.ok(service.deleteMushroomPoint(id));
    }

}
