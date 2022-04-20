import BaseLayout from "../../components/layouts/BaseLayout";
import BlogPosts from "../../components/BlogPosts";
import { getAllPostsWithFrontMatter } from "../../lib/utils";

const Blog = ({ posts, title, description }) => {
  return (
    <BaseLayout title={title} description={description}>
      <main>
        <BlogPosts posts={posts} />
      </main>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("blog");

  return {
    props: {
      posts,
      title: "Blog",
      description: "xyz abc",
    },
  };
}

export default Blog;
