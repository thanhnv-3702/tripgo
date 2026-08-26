import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Đăng nhập</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Form auth (RHF + Zod) triển khai ở T10.
      </p>
    </div>
  );
}
