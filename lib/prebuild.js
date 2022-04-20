import { getAllPostsWithFrontMatter } from "./utils";
import makeCacheIndex from "../cache/cache";

const run = async function () {
  const posts = await getAllPostsWithFrontMatter("blog");
  makeCacheIndex("blog", posts);
};

run();
