import Link from 'next/link';
import { IoFolderOutline } from 'react-icons/io5';
import { Post } from '../../types';

type postMetaDataProps = {
    post: Post;
};

const PostMetaData = ({ post }: postMetaDataProps) => {
    return (
        <div className="text-sm italic">
            <span>
                Published on {post.frontMatter.publishedDate}{' '}
                {post.series?.frontMatter.title !== 'Undefined' &&
                    post.series?.frontMatter.title && (
                        <>
                            <span> in series </span>
                            <IoFolderOutline className="inline" />
                            &nbsp;
                            <Link
                                href={{
                                    pathname: `/blog/series/${post.frontMatter.series}`,
                                }}
                            >
                                {post.series?.frontMatter.title}
                            </Link>
                        </>
                    )}
            </span>
        </div>
    );
};

export default PostMetaData;
