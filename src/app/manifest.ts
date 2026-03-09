import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Underdogs — AI Driven Marketing Systems",
    short_name: "The Underdogs",
    description: "Building intelligent marketing systems that automate decisions, not just tasks.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1115",
    theme_color: "#5B8CFF",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
