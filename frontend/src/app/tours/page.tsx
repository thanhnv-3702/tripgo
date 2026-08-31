import type { Metadata } from "next";

import { TourCard } from "@/components/tour/TourCard";
import { ApiClientError } from "@/lib/api/client";
import { getTours } from "@/lib/api/tours";
import type { ToursQuery } from "@/types/api";

export const metadata: Metadata = {
  title: "Danh sách tour",
  description: "Tìm kiếm và lọc tour du lịch theo điểm đến, giá và đánh giá.",
};

type SearchParams = {
  q?: string;
  destination?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

function parseQuery(params: SearchParams): ToursQuery {
  const sort = params.sort;
  const validSort =
    sort === "newest" ||
    sort === "price_asc" ||
    sort === "price_desc" ||
    sort === "rating"
      ? sort
      : "newest";

  return {
    q: params.q?.trim() || undefined,
    destination: params.destination?.trim() || undefined,
    category: params.category?.trim() || undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    sort: validSort,
    page: params.page ? Number(params.page) : 1,
    limit: 12,
  };
}

function activeFilters(params: SearchParams): string[] {
  const items: string[] = [];
  if (params.q) items.push(`Từ khóa: ${params.q}`);
  if (params.destination) items.push(`Điểm đến: ${params.destination}`);
  if (params.minPrice) items.push(`Giá từ: ${params.minPrice}`);
  if (params.maxPrice) items.push(`Giá đến: ${params.maxPrice}`);
  return items;
}

export default async function ToursPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = parseQuery(params);
  const filters = activeFilters(params);

  try {
    const result = await getTours(query);

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-text">Danh sách tour</h1>
        <p className="mt-2 text-sm text-text-secondary">
          {result.total} kết quả
          {filters.length > 0 ? ` · ${filters.join(" · ")}` : ""}
        </p>

        {result.data.length === 0 ? (
          <p className="mt-8 rounded-md border border-border bg-bg-section px-4 py-8 text-center text-text-secondary">
            Không tìm thấy tour phù hợp.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.data.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

        <p className="mt-8 text-xs text-text-secondary">
          Filter sidebar + pagination — Day 08–09.
        </p>
      </div>
    );
  } catch (err) {
    const message =
      err instanceof ApiClientError
        ? err.message
        : "Không gọi được GET /api/tours";

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-text">Danh sách tour</h1>
        <p className="mt-4 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          {message}
        </p>
      </div>
    );
  }
}
