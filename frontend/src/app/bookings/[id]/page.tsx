import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

type Props = PageProps<"/bookings/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Đơn ${id}` };
}

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <PageShell
      title={`Chi tiết đơn ${id}`}
      description="Chi tiết booking — F6."
    />
  );
}
