import CommentForm from '../../components/comment/Form';
import CommentList from '../../components/comment/List';
import BaseLayout from '../../components/layouts/BaseLayout';
import MarkdownRender from '../../components/MarkdownRender';
import { getFiles, getPostBySlug, getSameSeriesPosts } from '../../lib/utils';
import { Post } from '../../types';

const BlogPost = ({ frontMatter, markdownBody, slug, sameSeriesPosts }) => {
    if (!frontMatter) return <></>;

    return (
        <BaseLayout title={frontMatter.title} description="123" pageType="post">
            <div className="container mx-auto max-w-3xl">
                <h1>{frontMatter.title}</h1>
                <p>{JSON.stringify(sameSeriesPosts)}</p>
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
        'blog',
        params.slug,
    );

    let sameSeriesPosts: Post[] = [];
    if (frontMatter.series) {
        sameSeriesPosts = await getSameSeriesPosts('blog', frontMatter.series);
    }

    return {
        props: {
            frontMatter,
            markdownBody,
            sameSeriesPosts,
            slug: params.slug,
        },
    };
}

export async function getStaticPaths() {
    const posts = await getFiles('blog');

    const paths = posts.map((filename) => ({
        params: {
            slug: filename.replace(/\.md/, ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default BlogPost;
