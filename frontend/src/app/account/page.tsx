import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Tài khoản",
};

export default function AccountPage() {
  return (
    <PageShell
      title="Tài khoản"
      description="Hồ sơ cá nhân — sau khi F1 auth hoàn thiện."
    />
  );
}
