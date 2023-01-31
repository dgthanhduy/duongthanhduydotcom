import { Post } from '../../types';
import BlogPost from './BlogPost';

type blogPostsProps = {
    posts: Post[];
};

const BlogPosts = ({ posts }: blogPostsProps) => {
    return (
        <>
            {!posts?.length && (
                <div className="text-center text-slate-300 dark:text-slate-600">
                    <span>No posts</span>
                </div>
            )}

            <ul className="divide-y-2 divide-slate-200 dark:divide-slate-600">
                {posts &&
                    posts
                        .sort(
                            (a, b) =>
                                new Date(
                                    b.frontMatter.publishedDate,
                                ).getTime() -
                                new Date(a.frontMatter.publishedDate).getTime(),
                        )
                        .map((post) => {
                            return <BlogPost key={post.slug} post={post} />;
                        })}
            </ul>
        </>
    );
};

export default BlogPosts;
