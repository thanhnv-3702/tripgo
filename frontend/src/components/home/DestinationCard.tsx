import Image from "next/image";
import Link from "next/link";

import type { DestinationItem } from "@/types/api";

type DestinationCardProps = {
  destination: DestinationItem;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/tours?destination=${encodeURIComponent(destination.slug)}`}
      className="group overflow-hidden rounded-md border border-border bg-bg shadow-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-bg-section">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="font-semibold text-text group-hover:text-primary">
          {destination.name}
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          {destination.tourCount} tour
        </p>
      </div>
    </Link>
  );
}
