package com.tripgo.api.repository.spec;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.tripgo.api.domain.entity.Tour;
import com.tripgo.api.domain.enums.TourCategory;

import jakarta.persistence.criteria.JoinType;

public final class TourSpecs {

    private TourSpecs() {
    }

    public static Specification<Tour> withFilters(
        String q,
        String destinationSlug,
        TourCategory category,
        Long minPrice,
        Long maxPrice,
        Integer duration,
        Double minRating
    ) {
        return Specification
            .where(fetchDestination())
            .and(keyword(q))
            .and(destination(destinationSlug))
            .and(category(category))
            .and(minPrice(minPrice))
            .and(maxPrice(maxPrice))
            .and(duration(duration))
            .and(minRating(minRating));
    }

    private static Specification<Tour> fetchDestination() {
        return (root, query, cb) -> {
            if (query != null && query.getResultType() != Long.class && query.getResultType() != long.class) {
                root.fetch("destination", JoinType.LEFT);
                query.distinct(true);
            }
            return null;
        };
    }

    private static Specification<Tour> keyword(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isBlank()) {
                return null;
            }
            String pattern = "%" + q.trim().toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("title")), pattern),
                cb.like(cb.lower(root.get("shortDescription")), pattern),
                cb.like(cb.lower(root.get("description")), pattern)
            );
        };
    }

    private static Specification<Tour> destination(String destinationSlug) {
        return (root, query, cb) -> {
            if (destinationSlug == null || destinationSlug.isBlank()) {
                return null;
            }
            return cb.equal(root.get("destination").get("slug"), destinationSlug.trim());
        };
    }

    private static Specification<Tour> category(TourCategory category) {
        return (root, query, cb) -> category == null ? null : cb.equal(root.get("category"), category);
    }

    private static Specification<Tour> minPrice(Long minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) {
                return null;
            }
            return cb.greaterThanOrEqualTo(
                cb.coalesce(root.get("discountPrice"), root.get("price")),
                BigDecimal.valueOf(minPrice)
            );
        };
    }

    private static Specification<Tour> maxPrice(Long maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) {
                return null;
            }
            return cb.lessThanOrEqualTo(
                cb.coalesce(root.get("discountPrice"), root.get("price")),
                BigDecimal.valueOf(maxPrice)
            );
        };
    }

    private static Specification<Tour> duration(Integer duration) {
        return (root, query, cb) -> duration == null ? null : cb.equal(root.get("durationDays"), duration);
    }

    private static Specification<Tour> minRating(Double minRating) {
        return (root, query, cb) -> {
            if (minRating == null) {
                return null;
            }
            return cb.greaterThanOrEqualTo(root.get("rating"), BigDecimal.valueOf(minRating));
        };
    }
}
