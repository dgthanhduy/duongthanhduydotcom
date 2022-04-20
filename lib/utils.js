import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export async function getFiles(dataType) {
  return fs.readdirSync(path.join(root, "data", dataType), "utf-8");
}

export async function getPostBySlug(dataType, slug) {
  const source = fs.readFileSync(
    path.join(root, "data", dataType, `${slug}.md`),
    "utf8"
  );

  const { data, content } = matter(source);

  return {
    frontMatter: data,
    markdownBody: content,
  };
}

export async function getAllPostsWithFrontMatter(dataType) {
  const files = fs.readdirSync(path.join(root, "data", dataType));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", dataType, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        frontMatter: data,
        slug: postSlug.replace(".md", ""),
      },
      ...allPosts,
    ];
  }, []);
}

export async function cachedPostData(dataType) {
  const posts = await getAllPostsWithFrontMatter(dataType);
  return posts.map((post) => ({
    slug: post.slug,
    title: post.frontMatter.title,
    tags: post.frontMatter.tags ?? [],
    description: post.frontMatter.description ?? "",
    publishedDate: post.frontMatter.publishedDate ?? null,
    image: post.frontMatter.image ?? null,
  }));
}
