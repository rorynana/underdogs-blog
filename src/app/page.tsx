import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CurrentlyBuilding from "@/components/home/CurrentlyBuilding";
import FeaturedPicks from "@/components/home/FeaturedPicks";
import LatestPosts from "@/components/home/LatestPosts";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import OperatorProfile from "@/components/home/OperatorProfile";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { getAllPosts, getPostsByCategory } from "@/lib/content";
import { CATEGORIES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE.title,
  alternates: { canonical: SITE.siteUrl },
};

export default function Home() {
  const allPosts = getAllPosts();
  const allPostsPool = [
    ...allPosts,
    ...getPostsByCategory("philosophy"),
  ];
  const featuredSlugs = [
    "market-monitoring-automation",
    "onestock-ai-production-intelligence",
    "pattern-and-awareness",
    "marketing-intelligence-dashboard",
    "tubescout-youtube-creator-scoring",
  ];
  const featuredPosts = featuredSlugs
    .map((slug) => allPostsPool.find((p) => p.slug === slug))
    .filter(Boolean) as typeof allPosts;
  const latestPosts = allPosts.slice(0, 6);

  const categoryData = CATEGORIES.map((cat) => ({
    ...cat,
    count: getPostsByCategory(cat.slug).length,
  }));

  return (
    <>
      <Hero />
      <CurrentlyBuilding />
      <FeaturedPicks posts={featuredPosts} />
      <LatestPosts posts={latestPosts} />
      <BrowseByCategory categories={categoryData} />
      <OperatorProfile />
      <NewsletterForm />
    </>
  );
}
