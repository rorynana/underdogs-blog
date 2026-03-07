import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  description: string;
  category: string;
  date: string;
  techStack: string[];
  featured: boolean;
  slug: string;
}

export function getPostsByCategory(category: string): PostMeta[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title || "",
        description: data.description || "",
        category: data.category || category,
        date: data.date || "",
        techStack: data.techStack || [],
        featured: data.featured || false,
        slug: file.replace(".mdx", ""),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(category: string, slug: string) {
  const filePath = path.join(contentDir, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title || "",
      description: data.description || "",
      category: data.category || category,
      date: data.date || "",
      techStack: data.techStack || [],
      featured: data.featured || false,
      slug,
    } as PostMeta,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const categories = ["marketing", "ai-systems", "insights"];
  return categories.flatMap((cat) => getPostsByCategory(cat));
}
