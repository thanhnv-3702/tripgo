package com.tripgo.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripgo.api.domain.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
}
