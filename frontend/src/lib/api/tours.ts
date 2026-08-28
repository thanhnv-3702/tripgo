import { apiFetch } from "@/lib/api/client";
import type {
  CategoryItem,
  DestinationItem,
  PageResponse,
  TourDetail,
  TourListItem,
  ToursQuery,
} from "@/types/api";

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function getTours(query: ToursQuery = {}): Promise<PageResponse<TourListItem>> {
  return apiFetch<PageResponse<TourListItem>>(
    `/api/tours${buildQuery({
      q: query.q,
      destination: query.destination,
      category: query.category,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      duration: query.duration,
      rating: query.rating,
      sort: query.sort,
      page: query.page,
      limit: query.limit,
    })}`
  );
}

export async function getTourBySlug(slug: string): Promise<TourDetail> {
  return apiFetch<TourDetail>(`/api/tours/${encodeURIComponent(slug)}`);
}

export async function getDestinations(): Promise<DestinationItem[]> {
  return apiFetch<DestinationItem[]>("/api/destinations");
}

export async function getCategories(): Promise<CategoryItem[]> {
  return apiFetch<CategoryItem[]>("/api/categories");
}
