import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách tour",
};

export default function ToursPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-text">Danh sách tour</h1>
      <p className="mt-2 text-text-secondary">
        Trang F3 — filter/sort qua URL sẽ triển khai ở T08.
      </p>
    </div>
  );
}
