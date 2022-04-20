import CommentForm from "../../components/comment/Form";
import CommentList from "../../components/comment/List";
import BaseLayout from "../../components/layouts/BaseLayout";
import MarkdownRender from "../../components/MarkdownRender";
import { getFiles, getPostBySlug } from "../../lib/utils";

const BlogPost = ({ frontMatter, markdownBody, slug }) => {
  if (!frontMatter) return <></>;

  return (
    <BaseLayout title={frontMatter.title} description="123">
      <div className="container mx-auto max-w-3xl">
        <CommentList slug={slug} />
        <CommentForm slug={slug} />
        <br />
        <MarkdownRender markdownBody={markdownBody} />
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps({ params }) {
  const { frontMatter, markdownBody } = await getPostBySlug(
    "blog",
    params.slug
  );

  return {
    props: {
      frontMatter,
      markdownBody,
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getFiles("blog");

  const paths = posts.map((filename) => ({
    params: {
      slug: filename.replace(/\.md/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default BlogPost;
