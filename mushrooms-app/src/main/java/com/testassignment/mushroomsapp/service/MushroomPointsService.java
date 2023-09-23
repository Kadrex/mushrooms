package com.testassignment.mushroomsapp.service;

import com.testassignment.mushroomsapp.model.MushroomPoint;
import com.testassignment.mushroomsapp.repository.MushroomPointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MushroomPointsService {

    @Autowired
    private MushroomPointsRepository repository;

    public List<MushroomPoint> getMushroomPoints() {
        return repository.findAll();
    }

    public MushroomPoint saveMushroomPoint(MushroomPoint mushroomPoint) {
        return repository.save(mushroomPoint);
    }

    public MushroomPoint updateMushroomPoint(MushroomPoint mushroomPoint) {
        return repository.save(mushroomPoint);
    }

    public boolean deleteMushroomPoint(Long id) {
        repository.deleteById(id);
        return true;
    }

}
