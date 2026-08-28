import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

type Props = PageProps<"/checkout/[tourId]">;

export const metadata: Metadata = {
  title: "Đặt tour",
};

export default async function CheckoutPage({ params }: Props) {
  const { tourId } = await params;

  return (
    <PageShell
      title="Đặt tour"
      description={`Checkout tour ${tourId} — F5 triển khai ở Day 15–16.`}
    />
  );
}
