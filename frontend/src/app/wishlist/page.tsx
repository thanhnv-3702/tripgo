import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Yêu thích",
};

export default function WishlistPage() {
  return (
    <PageShell
      title="Tour yêu thích"
      description="F7 wishlist sync API — Day 17."
    />
  );
}
