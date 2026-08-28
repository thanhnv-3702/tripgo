import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { getTours } from "@/lib/api/tours";
import { ApiClientError } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "Danh sách tour",
};

export default async function ToursPage() {
  let preview: string;

  try {
    const result = await getTours({ page: 1, limit: 3, sort: "newest" });
    preview = `${result.total} tour — mẫu: ${result.data.map((t) => t.title).join(", ")}`;
  } catch (err) {
    preview =
      err instanceof ApiClientError
        ? `API lỗi: ${err.message}`
        : "Không gọi được GET /api/tours";
  }

  return (
    <PageShell
      title="Danh sách tour"
      description="F3 filter/sort qua URL — Day 08–09."
    >
      <p className="rounded-md border border-border bg-bg-section px-4 py-3 text-sm text-text-secondary">
        Smoke GET /api/tours: {preview}
      </p>
    </PageShell>
  );
}
