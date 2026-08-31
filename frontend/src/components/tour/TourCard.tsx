import Image from "next/image";
import Link from "next/link";

import { formatVnd } from "@/lib/format";
import type { TourListItem } from "@/types/api";

type TourCardProps = {
  tour: TourListItem;
};

export function TourCard({ tour }: TourCardProps) {
  const displayPrice = tour.discountPrice ?? tour.price;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-bg shadow-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-bg-section">
        <Image
          src={tour.thumbnail}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {tour.discountPrice != null && (
          <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-white">
            Giảm giá
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold text-text group-hover:text-primary">
          {tour.title}
        </h3>
        <p className="text-sm text-text-secondary">
          {tour.destination} · {tour.durationDays} ngày
        </p>
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-sm text-text-secondary">
            ★ {tour.rating.toFixed(1)} ({tour.reviewCount})
          </span>
          <div className="text-right">
            {tour.discountPrice != null && (
              <span className="text-xs text-text-secondary line-through">
                {formatVnd(tour.price)}
              </span>
            )}
            <p className="font-semibold text-accent">{formatVnd(displayPrice)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
