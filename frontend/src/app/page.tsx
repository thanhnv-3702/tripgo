import Link from "next/link";

import { getTours } from "@/lib/api/tours";
import { ApiClientError } from "@/lib/api/client";

export default async function Home() {
  let tourTotal: number | null = null;
  let apiError: string | null = null;

  try {
    const tours = await getTours({ limit: 1, sort: "newest" });
    tourTotal = tours.total;
  } catch (err) {
    apiError =
      err instanceof ApiClientError
        ? err.message
        : "Không kết nối được API backend.";
  }

  return (
    <div className="bg-bg-section">
      <section className="bg-linear-to-b from-primary/10 to-bg-section px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Khám phá tour du lịch
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            Tìm chuyến đi phù hợp — điểm đến, ngày khởi hành, mức giá.
          </p>
          <form
            action="/tours"
            className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-md bg-bg p-4 shadow-card sm:flex-row sm:items-end"
          >
            <label className="flex flex-1 flex-col gap-1 text-left text-sm">
              <span className="font-medium text-text-secondary">Từ khóa</span>
              <input
                name="q"
                type="search"
                placeholder="Ví dụ: Hội An"
                className="h-11 rounded-md border border-border px-3 text-text outline-none focus:border-primary"
              />
            </label>
            <label className="flex flex-1 flex-col gap-1 text-left text-sm">
              <span className="font-medium text-text-secondary">Điểm đến</span>
              <input
                name="destination"
                type="text"
                placeholder="da-nang"
                className="h-11 rounded-md border border-border px-3 text-text outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-md bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Tìm tour
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {apiError ? (
          <p className="rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
            API: {apiError} — chạy backend tại {process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"}
          </p>
        ) : (
          <p className="rounded-md border border-border bg-bg px-4 py-3 text-sm text-text-secondary">
            API kết nối OK — <strong className="text-text">{tourTotal}</strong> tour trên BE.
            Featured grids triển khai Day 07.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-text">Điểm đến nổi bật</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Placeholder layout — data từ <code className="text-primary">GET /api/destinations</code> ở Day 07.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Đà Nẵng", "Phú Quốc", "Sa Pa", "Nha Trang"].map((name) => (
            <div
              key={name}
              className="rounded-md border border-border bg-bg p-4 shadow-card"
            >
              <div className="aspect-4/3 rounded-md bg-bg-section" />
              <p className="mt-3 font-medium">{name}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Xem tất cả tour
          </Link>
        </div>
      </section>
    </div>
  );
}
