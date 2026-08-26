import Link from "next/link";

const footerLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/tours?sort=newest", label: "Điểm đến" },
  { href: "/login", label: "Đăng nhập" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-section">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold text-primary">TripGo</p>
            <p className="mt-2 max-w-sm text-sm text-text-secondary">
              Nền tảng đặt tour du lịch — khám phá điểm đến và chuyến đi phù hợp.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} TripGo. Mock project — mentoring use.
        </p>
      </div>
    </footer>
  );
}
