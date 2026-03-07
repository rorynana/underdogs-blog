import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Highlight from "@/components/mdx/Highlight";

const mdxComponents = {
  Highlight,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-dark-default", keepBackground: false }],
        ],
      },
    },
  });
  return content;
}
