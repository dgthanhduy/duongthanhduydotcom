import BlogPosts from '../../../components/blog/BlogPosts';
import BaseLayout from '../../../components/layouts/BaseLayout';
import { getAllPostsWithFrontMatter, getSeries } from '../../../lib/utils';

const SeriesPosts = ({ posts, title, description }) => {
    return (
        <BaseLayout title={title} description={description}>
            <main className="mx-auto max-w-5xl">
                <BlogPosts posts={posts} />
            </main>
        </BaseLayout>
    );
};

export async function getStaticProps({ params }) {
    const posts = await getAllPostsWithFrontMatter('blog', {
        series: params.series,
    });

    return {
        props: {
            posts,
            title: `Blog Posts - ${params.series}`,
            description: `Posts on software engineering for tag ${params.series}`,
            tag: params.series,
        },
    };
}

export async function getStaticPaths() {
    const series = await getSeries('blog');

    const paths = series.map((series) => ({
        params: {
            series,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default SeriesPosts;
