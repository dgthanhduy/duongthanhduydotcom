import BaseLayout from "../../components/layouts/BaseLayout";
import BlogPosts from "../../components/BlogPosts";
import { getAllPostsWithFrontMatter } from "../../lib/utils";
import SearchForm from "../../components/search/Form";

const Blog = ({ posts, title, description }) => {
  console.log("renderrrr");
  return (
    <BaseLayout title={title} description={description}>
      <main>
        <SearchForm />
        <BlogPosts posts={posts} />
      </main>
    </BaseLayout>
  );
};

const fs = require("fs");
import makeCacheIndex from "../../cache/cache";
export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("blog");
  makeCacheIndex("blog", fs);
  return {
    props: {
      posts,
      title: "Blog",
      description: "xyz abc",
    },
  };
}

export default Blog;
