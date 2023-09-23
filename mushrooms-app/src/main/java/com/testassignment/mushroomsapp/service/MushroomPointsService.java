package com.testassignment.mushroomsapp.service;

import com.testassignment.mushroomsapp.model.MushroomPoint;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MushroomPointsService {


    public List<MushroomPoint> getMushroomPoints() {
        return new ArrayList<>();
    }

    public MushroomPoint saveMushroomPoint(MushroomPoint mushroomPoint) {
        return null;
    }

    public MushroomPoint updateMushroomPoint(MushroomPoint mushroomPoint) {
        return null;
    }

    public Boolean deleteMushroomPoint(Long id) {
        return true;
    }

}
