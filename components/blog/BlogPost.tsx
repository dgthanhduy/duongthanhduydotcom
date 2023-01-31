import Link from 'next/link';
import PostTagList from './PostTagList';
import PostMetaData from './PostMetaData';
import { Post } from '../../types';

type blogPostProps = {
    post: Post;
};

const BlogPost = ({ post }: blogPostProps) => {
    return (
        <>
            <article className="py-4">
                <div>
                    <Link
                        key={`${post.slug}`}
                        href={{
                            pathname: `/blog/${post.slug}`,
                        }}
                    >
                        <a className="text-xl font-bold">
                            {post.frontMatter.title}
                        </a>
                    </Link>
                </div>
                <PostMetaData post={post} />
                <p>{post.frontMatter.description} </p>
                <div className="flex flex-row text-sm justify-between">
                    <Link
                        href={{
                            pathname: `/blog/${post.slug}`,
                        }}
                    >
                        <a>Read more...</a>
                    </Link>
                    <div>
                        <PostTagList
                            tags={post.frontMatter.tags}
                            slug={post.slug}
                        />
                    </div>
                </div>
            </article>
        </>
    );
};

export default BlogPost;
