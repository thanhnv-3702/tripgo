package com.tripgo.api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripgo.api.domain.entity.Destination;

public interface DestinationRepository extends JpaRepository<Destination, UUID> {

    Optional<Destination> findBySlug(String slug);
}
