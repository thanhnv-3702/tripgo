import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function RegisterPage() {
  return (
    <PageShell
      title="Đăng ký"
      description="Form đăng ký (RHF + Zod) triển khai ở T10."
    />
  );
}
