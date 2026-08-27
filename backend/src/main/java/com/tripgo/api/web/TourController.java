package com.tripgo.api.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tripgo.api.service.TourService;
import com.tripgo.api.web.dto.TourDtos;

@RestController
@RequestMapping("/api")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping("/tours")
    public TourDtos.PageResponse<TourDtos.TourListItem> list(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) String destination,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Long minPrice,
        @RequestParam(required = false) Long maxPrice,
        @RequestParam(required = false) Integer duration,
        @RequestParam(required = false) Double rating,
        @RequestParam(required = false, defaultValue = "newest") String sort,
        @RequestParam(required = false, defaultValue = "1") int page,
        @RequestParam(required = false, defaultValue = "12") int limit
    ) {
        return tourService.list(q, destination, category, minPrice, maxPrice, duration, rating, sort, page, limit);
    }

    @GetMapping("/tours/{slug}")
    public TourDtos.TourDetail getBySlug(@PathVariable String slug) {
        return tourService.getBySlug(slug);
    }

    @GetMapping("/tours/{id}/reviews")
    public TourDtos.ReviewPageResponse reviews(
        @PathVariable String id,
        @RequestParam(required = false, defaultValue = "1") int page,
        @RequestParam(required = false, defaultValue = "10") int limit
    ) {
        return tourService.getReviews(id, page, limit);
    }

    @GetMapping("/tours/{id}/availability")
    public List<TourDtos.AvailabilityItem> availability(
        @PathVariable String id,
        @RequestParam(required = false) String month
    ) {
        return tourService.getAvailability(id, month);
    }

    @GetMapping("/destinations")
    public List<TourDtos.DestinationItem> destinations() {
        return tourService.listDestinations();
    }

    @GetMapping("/categories")
    public List<TourDtos.CategoryItem> categories() {
        return tourService.listCategories();
    }
}
