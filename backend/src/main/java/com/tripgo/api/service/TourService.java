package com.tripgo.api.service;

import java.util.List;
import java.util.Locale;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tripgo.api.domain.entity.Tour;
import com.tripgo.api.domain.enums.TourCategory;
import com.tripgo.api.repository.DestinationRepository;
import com.tripgo.api.repository.TourRepository;
import com.tripgo.api.repository.spec.TourSpecs;
import com.tripgo.api.web.dto.TourDtos;
import com.tripgo.api.web.error.ApiException;
import com.tripgo.api.web.mapper.TourMapper;

@Service
public class TourService {

    private final TourRepository tourRepository;
    private final DestinationRepository destinationRepository;

    public TourService(TourRepository tourRepository, DestinationRepository destinationRepository) {
        this.tourRepository = tourRepository;
        this.destinationRepository = destinationRepository;
    }

    @Transactional(readOnly = true)
    public TourDtos.PageResponse<TourDtos.TourListItem> list(
        String q,
        String destination,
        String category,
        Long minPrice,
        Long maxPrice,
        Integer duration,
        Double rating,
        String sort,
        int page,
        int limit
    ) {
        int safePage = Math.max(page, 1);
        int safeLimit = Math.min(Math.max(limit, 1), 50);
        Pageable pageable = PageRequest.of(safePage - 1, safeLimit, resolveSort(sort));

        Page<Tour> result = tourRepository.findAll(
            TourSpecs.withFilters(q, destination, parseCategory(category), minPrice, maxPrice, duration, rating),
            pageable
        );

        List<TourDtos.TourListItem> data = result.getContent().stream().map(TourMapper::toListItem).toList();
        return new TourDtos.PageResponse<>(data, result.getTotalElements(), safePage, safeLimit);
    }

    @Transactional(readOnly = true)
    public TourDtos.TourDetail getBySlug(String slug) {
        Tour tour = tourRepository.findBySlug(slug)
            .orElseThrow(() -> ApiException.notFound("Không tìm thấy tour"));
        // ensure destination loaded
        tour.getDestination().getName();
        return TourMapper.toDetail(tour);
    }

    @Transactional(readOnly = true)
    public List<TourDtos.DestinationItem> listDestinations() {
        return destinationRepository.findAll().stream()
            .sorted((a, b) -> a.getName().compareToIgnoreCase(b.getName()))
            .map(d -> new TourDtos.DestinationItem(
                d.getSlug(),
                d.getName(),
                d.getImageUrl(),
                tourRepository.countByDestination_Slug(d.getSlug())
            ))
            .toList();
    }

    public List<TourDtos.CategoryItem> listCategories() {
        return List.of(
            new TourDtos.CategoryItem("beach", "Biển đảo"),
            new TourDtos.CategoryItem("mountain", "Núi rừng"),
            new TourDtos.CategoryItem("city", "Thành phố"),
            new TourDtos.CategoryItem("trekking", "Trekking"),
            new TourDtos.CategoryItem("cruise", "Du thuyền")
        );
    }

    private static Sort resolveSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }
        return switch (sort.trim().toLowerCase(Locale.ROOT)) {
            case "price_asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price_desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "rating" -> Sort.by(Sort.Direction.DESC, "rating");
            case "newest" -> Sort.by(Sort.Direction.DESC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    private static TourCategory parseCategory(String category) {
        if (category == null || category.isBlank()) {
            return null;
        }
        try {
            return TourCategory.valueOf(category.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("category không hợp lệ: " + category);
        }
    }
}
