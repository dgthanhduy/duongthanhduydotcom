import BlogPosts from '../../../components/blog/BlogPosts';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { getAllPostsWithFrontMatter, getTags } from '../../../lib/utils';

const BlogTag = ({ posts, title, description }) => {
    return (
        <BaseLayout title={title} description={description}>
            <main className="mx-auto max-w-5xl">
                <BlogPosts posts={posts} />
            </main>
        </BaseLayout>
    );
};

export async function getStaticProps({ params }) {
    const posts = await getAllPostsWithFrontMatter('blog', { tag: params.tag });

    return {
        props: {
            posts,
            title: `Blog Posts - ${params.tag}`,
            description: `Posts on software engineering for tag ${params.tag}`,
            tag: params.tag,
        },
    };
}

export async function getStaticPaths() {
    const tags = await getTags('blog');

    const paths = tags.map((tag) => ({
        params: {
            tag,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default BlogTag;
