import { getAllPosts } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}
