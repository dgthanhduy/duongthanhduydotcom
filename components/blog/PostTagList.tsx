import Link from 'next/link';
import { IoPricetagsOutline } from 'react-icons/io5';

type tagListProps = {
    tags: string[];
    slug: string;
};

const TagList = ({ tags, slug }: tagListProps) => {
    if (!tags?.length) return <></>;
    return (
        <>
            <IoPricetagsOutline className="inline" />
            &nbsp;
            {tags.map((tag) => (
                <>
                    <Link
                        key={`${slug}-${tag}`}
                        href={{
                            pathname: `/blog/tags/${tag}`,
                        }}
                    >
                        {`${tag} `}
                    </Link>
                </>
            ))}
        </>
    );
};

export default TagList;
