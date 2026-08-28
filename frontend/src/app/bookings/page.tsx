import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Đơn của tôi",
};

export default function BookingsPage() {
  return (
    <PageShell
      title="Đơn của tôi"
      description="F6 — filter status + BookingCard list (Day 17)."
    />
  );
}
