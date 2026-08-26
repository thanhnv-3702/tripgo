package com.tripgo.api.web.mapper;

import com.tripgo.api.domain.entity.Tour;
import com.tripgo.api.domain.enums.TourCategory;
import com.tripgo.api.web.dto.TourDtos;

public final class TourMapper {

    private TourMapper() {
    }

    public static String categorySlug(TourCategory category) {
        return category.name().toLowerCase();
    }

    public static TourDtos.TourListItem toListItem(Tour tour) {
        return new TourDtos.TourListItem(
            tour.getId().toString(),
            tour.getSlug(),
            tour.getTitle(),
            tour.getDestination().getName(),
            tour.getDestination().getSlug(),
            categorySlug(tour.getCategory()),
            tour.getDurationDays(),
            TourDtos.money(tour.getPrice()),
            TourDtos.moneyOrNull(tour.getDiscountPrice()),
            TourDtos.rating(tour.getRating()),
            tour.getReviewCount(),
            tour.getThumbnail()
        );
    }

    public static TourDtos.TourDetail toDetail(Tour tour) {
        return new TourDtos.TourDetail(
            tour.getId().toString(),
            tour.getSlug(),
            tour.getTitle(),
            tour.getDestination().getName(),
            tour.getDestination().getSlug(),
            categorySlug(tour.getCategory()),
            tour.getDurationDays(),
            TourDtos.money(tour.getPrice()),
            TourDtos.moneyOrNull(tour.getDiscountPrice()),
            TourDtos.rating(tour.getRating()),
            tour.getReviewCount(),
            tour.getThumbnail(),
            tour.getImages(),
            tour.getShortDescription(),
            tour.getDescription(),
            tour.getHighlights(),
            tour.getItinerary(),
            tour.getIncluded(),
            tour.getExcluded(),
            tour.getMaxGroupSize(),
            tour.getStartDates()
        );
    }
}
