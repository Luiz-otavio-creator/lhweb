import { getHomeContent } from "@/lib/content/getHomeContent";
import HomeClient from "@/components/home/HomeClient";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    openGraph: content.seo.ogImage?.downloadURL
      ? { images: [content.seo.ogImage.downloadURL] }
      : undefined,
  };
}

export default async function HomePage() {
  const content = await getHomeContent();
  return <HomeClient content={content} />;
}
