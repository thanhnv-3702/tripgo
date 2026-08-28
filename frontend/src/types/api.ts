export type TourCategory =
  | "beach"
  | "mountain"
  | "city"
  | "trekking"
  | "cruise";

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export interface PageResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface TourListItem {
  id: string;
  slug: string;
  title: string;
  destination: string;
  destinationSlug: string;
  category: TourCategory;
  durationDays: number;
  price: number;
  discountPrice: number | null;
  rating: number;
  reviewCount: number;
  thumbnail: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
}

export interface TourDetail extends TourListItem {
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  maxGroupSize: number;
  startDates: string[];
}

export interface DestinationItem {
  slug: string;
  name: string;
  image: string;
  tourCount: number;
}

export interface CategoryItem {
  slug: string;
  name: string;
}

export interface ToursQuery {
  q?: string;
  destination?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  rating?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}
