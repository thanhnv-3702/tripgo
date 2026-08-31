import type { DestinationItem } from "@/types/api";

type HeroSearchProps = {
  destinations: DestinationItem[];
};

export function HeroSearch({ destinations }: HeroSearchProps) {
  return (
    <form
      action="/tours"
      className="mx-auto mt-8 grid max-w-4xl gap-3 rounded-md bg-bg p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="flex flex-col gap-1 text-left text-sm sm:col-span-1">
        <span className="font-medium text-text-secondary">Từ khóa</span>
        <input
          name="q"
          type="search"
          placeholder="Ví dụ: Hội An"
          className="h-11 rounded-md border border-border px-3 text-text outline-none focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-left text-sm sm:col-span-1">
        <span className="font-medium text-text-secondary">Điểm đến</span>
        <select
          name="destination"
          defaultValue=""
          className="h-11 rounded-md border border-border bg-bg px-3 text-text outline-none focus:border-primary"
        >
          <option value="">Tất cả điểm đến</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-left text-sm sm:col-span-1">
        <span className="font-medium text-text-secondary">Giá tối thiểu (VND)</span>
        <input
          name="minPrice"
          type="number"
          min={0}
          step={100000}
          placeholder="2.000.000"
          className="h-11 rounded-md border border-border px-3 text-text outline-none focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-left text-sm sm:col-span-1">
        <span className="font-medium text-text-secondary">Giá tối đa (VND)</span>
        <input
          name="maxPrice"
          type="number"
          min={0}
          step={100000}
          placeholder="10.000.000"
          className="h-11 rounded-md border border-border px-3 text-text outline-none focus:border-primary"
        />
      </label>

      <div className="sm:col-span-2 lg:col-span-4 flex justify-center pt-1">
        <button
          type="submit"
          className="h-11 w-full max-w-xs rounded-md bg-accent px-8 text-sm font-semibold text-white hover:bg-accent-dark sm:w-auto"
        >
          Tìm tour
        </button>
      </div>
    </form>
  );
}
