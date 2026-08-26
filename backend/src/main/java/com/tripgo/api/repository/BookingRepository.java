package com.tripgo.api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripgo.api.domain.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    Optional<Booking> findByCode(String code);
}
