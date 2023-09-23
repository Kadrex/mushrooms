package com.testassignment.mushroomsapp.controller;

import com.testassignment.mushroomsapp.model.MushroomPoint;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController(value = "/api/mushroomPoints")
public class MushRoomPointController {

    @GetMapping
    public ResponseEntity<List<MushroomPoint>> getMushroomPoints() {
        return ResponseEntity.ok(new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<MushroomPoint> saveMushroomPoint(@RequestBody MushroomPoint mushroomPoint) {
        return ResponseEntity.ok(null);
    }

    @PutMapping
    public ResponseEntity<MushroomPoint> updateMushroomPoint(@RequestBody MushroomPoint mushroomPoint) {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteMushroomPoint(@PathVariable Long id) {
        return ResponseEntity.ok(true);
    }

}
