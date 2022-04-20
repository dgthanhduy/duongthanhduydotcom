import { getAllPostsWithFrontMatter } from "./utils";
import makeCacheIndex from "../cache/cache";

export default async function () {
  const posts = await getAllPostsWithFrontMatter("blog");
  makeCacheIndex("blog", posts);
}
