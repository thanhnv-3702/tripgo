import Link from "next/link";

const navItems = [
  { href: "/tours", label: "Tours" },
  { href: "/tours?sort=newest", label: "Điểm đến" },
  { href: "/tours?sort=price_asc", label: "Ưu đãi" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-lg font-bold text-white">
            T
          </span>
          <span className="text-xl font-bold tracking-tight text-primary">TripGo</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}
