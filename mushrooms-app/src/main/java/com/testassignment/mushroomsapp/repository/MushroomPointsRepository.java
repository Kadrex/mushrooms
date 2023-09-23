package com.testassignment.mushroomsapp.repository;

import com.testassignment.mushroomsapp.model.MushroomPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MushroomPointsRepository extends JpaRepository<MushroomPoint, Long> {

    List<MushroomPoint> findAll();

    MushroomPoint save(MushroomPoint mushroomPoint);

    void deleteById(Long id);

}
