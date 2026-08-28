import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

type Props = PageProps<"/tours/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Tour: ${slug}` };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageShell
      title={`Chi tiết tour: ${slug}`}
      description="F4 gallery, itinerary, BookingWidget — triển khai ở Day 10–11."
    />
  );
}
