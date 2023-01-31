import PostMetaData from '../../components/blog/PostMetaData';
import Comment from '../../components/comment';
import BaseLayout from '../../components/layouts/BaseLayout';
import MarkdownRender from '../../components/MarkdownRender';
import Divider from '../../components/shared/Divider';
import { getFiles, getPostBySlug, getSameSeriesPosts } from '../../lib/utils';
import { Post, PostFrontMatter, Series } from '../../types';

type props = {
    frontMatter: PostFrontMatter;
    markdownBody: any;
    slug: string;
    sameSeriesPosts: Post[];
    series: Series;
};

const BlogPost = ({
    frontMatter,
    markdownBody,
    slug,
    sameSeriesPosts,
    series,
}: props) => {
    if (!frontMatter) return <></>;
    return (
        <BaseLayout title={frontMatter.title} description="123" pageType="post">
            <div className="container mx-auto max-w-3xl ">
                <h1 className="font-semibold">{frontMatter.title}</h1>
                <PostMetaData
                    post={{
                        slug: slug,
                        series: series,
                        frontMatter: frontMatter,
                    }}
                />
                <Divider />
                <MarkdownRender markdownBody={markdownBody} />
                <Divider caption="Comments" />
                <Comment />
            </div>
        </BaseLayout>
    );
};

export async function getStaticProps({ params }) {
    const { frontMatter, markdownBody, series } = await getPostBySlug(
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
            series,
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
