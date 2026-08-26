package com.tripgo.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripgo.api.domain.entity.WishlistItem;

public interface WishlistRepository extends JpaRepository<WishlistItem, UUID> {
}
