package com.tripgo.api.web.dto;

import java.math.BigDecimal;
import java.util.List;

import com.tripgo.api.domain.model.ItineraryDay;

public final class TourDtos {

    private TourDtos() {
    }

    public record TourListItem(
        String id,
        String slug,
        String title,
        String destination,
        String destinationSlug,
        String category,
        int durationDays,
        long price,
        Long discountPrice,
        double rating,
        int reviewCount,
        String thumbnail
    ) {
    }

    public record TourDetail(
        String id,
        String slug,
        String title,
        String destination,
        String destinationSlug,
        String category,
        int durationDays,
        long price,
        Long discountPrice,
        double rating,
        int reviewCount,
        String thumbnail,
        List<String> images,
        String shortDescription,
        String description,
        List<String> highlights,
        List<ItineraryDay> itinerary,
        List<String> included,
        List<String> excluded,
        int maxGroupSize,
        List<String> startDates
    ) {
    }

    public record PageResponse<T>(
        List<T> data,
        long total,
        int page,
        int limit
    ) {
    }

    public record DestinationItem(
        String slug,
        String name,
        String image,
        long tourCount
    ) {
    }

    public record CategoryItem(
        String slug,
        String name
    ) {
    }

    public static long money(BigDecimal value) {
        return value == null ? 0L : value.longValue();
    }

    public static Long moneyOrNull(BigDecimal value) {
        return value == null ? null : value.longValue();
    }

    public static double rating(BigDecimal value) {
        return value == null ? 0.0 : value.doubleValue();
    }
}
