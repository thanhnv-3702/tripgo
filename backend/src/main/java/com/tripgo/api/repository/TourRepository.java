package com.tripgo.api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tripgo.api.domain.entity.Tour;

public interface TourRepository extends JpaRepository<Tour, UUID>, JpaSpecificationExecutor<Tour> {

    Optional<Tour> findBySlug(String slug);

    boolean existsBySlug(String slug);

    long countByDestination_Slug(String destinationSlug);
}
