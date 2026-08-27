package com.tripgo.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tripgo.api.domain.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Page<Review> findByTour_IdOrderByCreatedAtDesc(UUID tourId, Pageable pageable);

    long countByTour_Id(UUID tourId);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Review r WHERE r.tour.id = :tourId")
    Double averageRatingByTourId(@Param("tourId") UUID tourId);
}
