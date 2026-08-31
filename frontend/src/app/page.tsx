import type { Metadata } from "next";
import Link from "next/link";

import { DestinationCard } from "@/components/home/DestinationCard";
import { HeroSearch } from "@/components/home/HeroSearch";
import { TourCard } from "@/components/tour/TourCard";
import { ApiClientError } from "@/lib/api/client";
import { getDestinations, getTours } from "@/lib/api/tours";

export const metadata: Metadata = {
  title: "Khám phá tour du lịch",
  description:
    "TripGo — tìm và đặt tour du lịch trong nước. Điểm đến nổi bật, tour được đánh giá cao, tìm kiếm theo điểm đến và mức giá.",
  openGraph: {
    title: "TripGo — Khám phá tour du lịch",
    description: "Tìm chuyến đi phù hợp — điểm đến, ngày khởi hành, mức giá.",
  },
};

export default async function Home() {
  let destinations: Awaited<ReturnType<typeof getDestinations>> = [];
  let featuredTours: Awaited<ReturnType<typeof getTours>>["data"] = [];
  let apiError: string | null = null;

  try {
    const [destList, tourList] = await Promise.all([
      getDestinations(),
      getTours({ sort: "rating", limit: 4, page: 1 }),
    ]);
    destinations = destList
      .sort((a, b) => b.tourCount - a.tourCount)
      .slice(0, 4);
    featuredTours = tourList.data;
  } catch (err) {
    apiError =
      err instanceof ApiClientError
        ? err.message
        : "Không kết nối được API backend.";
  }

  return (
    <div className="bg-bg-section">
      <section className="bg-linear-to-b from-primary/10 to-bg-section px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Khám phá tour du lịch
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            Tìm chuyến đi mơ ước của bạn
          </p>
          {apiError ? (
            <p className="mt-8 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
              {apiError} — chạy backend tại{" "}
              {process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"}
            </p>
          ) : (
            <HeroSearch destinations={destinations} />
          )}
        </div>
      </section>

      {!apiError && (
        <>
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold text-text">Điểm đến nổi bật</h2>
              <Link
                href="/tours"
                className="text-sm font-medium text-primary hover:underline"
              >
                Xem tất cả
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold text-text">Tour nổi bật</h2>
              <Link
                href="/tours?sort=rating"
                className="text-sm font-medium text-primary hover:underline"
              >
                Xem thêm
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </section>

          <section className="border-t border-border bg-bg px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-center text-xl font-semibold text-text">
                Vì sao chọn TripGo
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {[
                  { title: "Tour đa dạng", detail: "Hàng chục tour từ biển, núi, thành phố." },
                  { title: "Giá minh bạch", detail: "Hiển thị giá và đánh giá từ khách thật." },
                  { title: "Đặt tour nhanh", detail: "Tìm kiếm, chọn ngày và xác nhận đơn." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-md border border-border bg-bg-section p-6 text-center"
                  >
                    <p className="font-semibold text-primary">{item.title}</p>
                    <p className="mt-2 text-sm text-text-secondary">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
