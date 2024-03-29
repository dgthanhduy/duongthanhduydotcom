import BaseLayout from '../../components/layouts/BaseLayout';
import BlogPosts from '../../components/blog/BlogPosts';
import { getAllPostsWithFrontMatter } from '../../lib/utils';
import makeCacheIndex from '../../cache/cache';

const Blog = ({ posts, title, description }) => {
    return (
        <BaseLayout title={title} description={description}>
            <main className="mx-auto max-w-5xl">
                <BlogPosts posts={posts} />
            </main>
        </BaseLayout>
    );
};

export async function getStaticProps() {
    const posts = await getAllPostsWithFrontMatter('blog');
    makeCacheIndex('blog', posts);
    // We fetch all posts here, cache too ! We should make a archived page to fetch all posts => cache there
    return {
        props: {
            posts,
            title: 'Blog',
            description: 'xyz abc',
        },
    };
}

export default Blog;
