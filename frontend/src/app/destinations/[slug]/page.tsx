import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

type Props = PageProps<"/destinations/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Điểm đến: ${slug}` };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageShell
      title={`Điểm đến: ${slug}`}
      description="Tour theo điểm đến — list/filter sẽ gắn BE ở T08."
    />
  );
}
