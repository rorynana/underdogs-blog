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
  const aiFeatured = getPostsByCategory("ai-systems").filter((p) => p.featured);
  const onestock = aiFeatured.find((p) => p.slug === "onestock-ai-production-intelligence");
  const othersAI = aiFeatured.filter((p) => p.slug !== "onestock-ai-production-intelligence");
  const orderedAI = onestock ? [othersAI[0], onestock, ...othersAI.slice(1)] : aiFeatured;
  const extraPicks = allPosts.filter((p) => p.slug === "stainless-cookware-market-1");
  const featuredPosts = [...orderedAI, ...extraPicks];
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
