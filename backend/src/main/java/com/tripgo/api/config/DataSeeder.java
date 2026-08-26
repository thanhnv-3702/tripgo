package com.tripgo.api.config;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.tripgo.api.domain.entity.Destination;
import com.tripgo.api.domain.entity.Tour;
import com.tripgo.api.domain.enums.TourCategory;
import com.tripgo.api.domain.model.ItineraryDay;
import com.tripgo.api.repository.DestinationRepository;
import com.tripgo.api.repository.TourRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final DestinationRepository destinationRepository;
    private final TourRepository tourRepository;

    public DataSeeder(DestinationRepository destinationRepository, TourRepository tourRepository) {
        this.destinationRepository = destinationRepository;
        this.tourRepository = tourRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (tourRepository.count() > 0) {
            log.info("Seed skipped — tours already present ({})", tourRepository.count());
            return;
        }

        List<Destination> destinations = seedDestinations();
        int tours = seedTours(destinations);
        log.info("Seeded {} destinations and {} tours", destinations.size(), tours);
    }

    private List<Destination> seedDestinations() {
        String[][] defs = {
            {"Đà Nẵng", "da-nang", "Biển Mỹ Khê, Sơn Trà, gần Hội An."},
            {"Phú Quốc", "phu-quoc", "Đảo ngọc với bãi biển và hải sản."},
            {"Sa Pa", "sa-pa", "Ruộng bậc thang, Fansipan, văn hóa vùng cao."},
            {"Nha Trang", "nha-trang", "Vịnh biển, đảo và resort."},
            {"Hạ Long", "ha-long", "Vịnh di sản, đảo đá vôi."},
            {"Đà Lạt", "da-lat", "Khí hậu mát, hoa và đồi thông."},
            {"Huế", "hue", "Cố đô, sông Hương, di tích."},
            {"Hội An", "hoi-an", "Phố cổ, đèn lồng, ẩm thực."}
        };

        List<Destination> saved = new ArrayList<>();
        for (String[] def : defs) {
            Destination d = new Destination();
            d.setName(def[0]);
            d.setSlug(def[1]);
            d.setDescription(def[2]);
            d.setImageUrl(image(def[1], 0));
            saved.add(destinationRepository.save(d));
        }
        return saved;
    }

    private int seedTours(List<Destination> destinations) {
        Object[][] templates = {
            {"Biển & Nghỉ dưỡng", "beach-resort", TourCategory.BEACH, 3, 4_490_000L},
            {"Khám phá thành phố", "city-explore", TourCategory.CITY, 2, 2_990_000L},
            {"Núi rừng thiên nhiên", "mountain-nature", TourCategory.MOUNTAIN, 4, 5_490_000L},
            {"Trekking cuối tuần", "weekend-trek", TourCategory.TREKKING, 3, 3_990_000L},
            {"Du thuyền & đảo", "island-cruise", TourCategory.CRUISE, 2, 6_490_000L}
        };

        int count = 0;
        int index = 1;
        for (Destination destination : destinations) {
            for (Object[] template : templates) {
                tourRepository.save(buildTour(
                    destination,
                    (String) template[0],
                    (String) template[1],
                    (TourCategory) template[2],
                    (Integer) template[3],
                    (Long) template[4],
                    index++
                ));
                count++;
            }
        }
        return count;
    }

    private Tour buildTour(
        Destination destination,
        String titleSuffix,
        String slugSuffix,
        TourCategory category,
        int durationDays,
        long basePrice,
        int index
    ) {
        ThreadLocalRandom rnd = ThreadLocalRandom.current();
        long price = basePrice + rnd.nextLong(0, 8) * 100_000L;
        boolean hasDiscount = rnd.nextBoolean();

        Tour tour = new Tour();
        tour.setSlug(destination.getSlug() + "-" + slugSuffix + "-" + index);
        tour.setTitle(destination.getName() + " — " + titleSuffix + " " + durationDays + "N"
            + Math.max(durationDays - 1, 1) + "Đ");
        tour.setDestination(destination);
        tour.setCategory(category);
        tour.setDurationDays(durationDays);
        tour.setPrice(BigDecimal.valueOf(price));
        if (hasDiscount) {
            tour.setDiscountPrice(BigDecimal.valueOf(Math.round(price * 0.9)));
        }
        tour.setRating(BigDecimal.valueOf(4.0 + rnd.nextDouble(0, 1.0)).setScale(1, RoundingMode.HALF_UP));
        tour.setReviewCount(rnd.nextInt(20, 250));
        tour.setThumbnail(image(destination.getSlug(), index));
        tour.setImages(List.of(
            image(destination.getSlug(), index),
            image(destination.getSlug(), index + 100),
            image(destination.getSlug(), index + 200)
        ));
        tour.setShortDescription("Tour " + destination.getName() + " — " + titleSuffix + ".");
        tour.setDescription(
            "Hành trình " + durationDays + " ngày tại " + destination.getName()
                + ". Bao gồm trải nghiệm " + titleSuffix
                + ", hướng dẫn viên và lịch trình linh hoạt."
        );
        tour.setHighlights(List.of(
            "Điểm check-in nổi bật tại " + destination.getName(),
            "Ẩm thực địa phương",
            "Hướng dẫn viên tiếng Việt"
        ));
        tour.setItinerary(buildItinerary(destination.getName(), durationDays));
        tour.setIncluded(List.of("Khách sạn", "Bữa sáng", "Xe đưa đón", "Hướng dẫn viên"));
        tour.setExcluded(List.of("Vé máy bay", "Chi phí cá nhân", "Bảo hiểm du lịch"));
        tour.setMaxGroupSize(12 + rnd.nextInt(0, 13));
        tour.setStartDates(List.of(
            "2026-07-05", "2026-07-12", "2026-07-19",
            "2026-08-02", "2026-08-16", "2026-09-06"
        ));
        return tour;
    }

    private static List<ItineraryDay> buildItinerary(String destination, int days) {
        List<ItineraryDay> items = new ArrayList<>();
        for (int day = 1; day <= days; day++) {
            items.add(new ItineraryDay(
                day,
                "Ngày " + day + " tại " + destination,
                "Hoạt động chính ngày " + day + ": tham quan, nghỉ ngơi và ẩm thực địa phương."
            ));
        }
        return items;
    }

    private static String image(String seed, int n) {
        return "https://picsum.photos/seed/" + seed + "-" + n + "/800/600";
    }
}
