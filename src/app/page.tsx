import Hero from "@/components/home/Hero";
import FeaturedPicks from "@/components/home/FeaturedPicks";
import LatestPosts from "@/components/home/LatestPosts";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import OperatorProfile from "@/components/home/OperatorProfile";
import { getAllPosts, getPostsByCategory } from "@/lib/content";
import { CATEGORIES } from "@/lib/constants";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.featured).slice(0, 3);
  const latestPosts = allPosts.slice(0, 6);

  const categoryData = CATEGORIES.map((cat) => ({
    ...cat,
    count: getPostsByCategory(cat.slug).length,
  }));

  return (
    <>
      <Hero />
      <FeaturedPicks posts={featuredPosts} />
      <LatestPosts posts={latestPosts} />
      <BrowseByCategory categories={categoryData} />
      <OperatorProfile />
    </>
  );
}
