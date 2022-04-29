import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFilters } from '../types';
const root = process.cwd();

export async function getFiles(dataType: string) {
    return fs.readdirSync(path.join(root, 'data', dataType), 'utf-8');
}

export async function getPostBySlug(
    dataType: string,
    slug: string,
): Promise<Post> {
    const source = fs.readFileSync(
        path.join(root, 'data', dataType, `${slug}.md`),
        'utf8',
    );

    const { data, content } = matter(source);

    return {
        frontMatter: data,
        slug: slug,
        markdownBody: content,
    };
}

export async function getAllPostsWithFrontMatter(
    dataType: string,
    filters?: PostFilters,
): Promise<Post[]> {
    const files = fs.readdirSync(path.join(root, 'data', dataType));

    return files.reduce((allPosts, postSlug) => {
        const source = fs.readFileSync(
            path.join(root, 'data', dataType, postSlug),
            'utf8',
        );
        const { data } = matter(source);

        if (filters) {
            if (filters.tag) {
                //* Filter by tag here
                if (data.tags.includes(filters.tag)) {
                    return [
                        {
                            frontMatter: data,
                            slug: postSlug.replace('.md', ''),
                        },
                        ...allPosts,
                    ];
                } else {
                    return allPosts;
                }
            }

            if (filters.series) {
                //* Filter by series here
                if (data.series === filters.series) {
                    return [
                        {
                            frontMatter: data,
                            slug: postSlug.replace('.md', ''),
                        },
                        ...allPosts,
                    ];
                } else {
                    return allPosts;
                }
            }
        }

        return [
            {
                frontMatter: data,
                slug: postSlug.replace('.md', ''),
            },
            ...allPosts,
        ];
    }, []);
}

export async function getTags(dataType: string) {
    const files = fs.readdirSync(path.join(root, 'data', dataType));
    let allTags = new Set<string>();

    files.map((slug) => {
        const source = fs.readFileSync(
            path.join(root, 'data', dataType, slug),
            'utf8',
        );
        const { data } = matter(source);

        data.tags.forEach((tag: string) => allTags.add(tag));
    });

    return Array.from(allTags);
}

export async function getSameSeriesPosts(dataType: string, series: string) {
    return await getAllPostsWithFrontMatter(dataType, { series: series });
}

export function cachedPostData(posts: Post[]) {
    return posts.map((post) => ({
        slug: post.slug,
        title: post.frontMatter.title,
        tags: post.frontMatter.tags ?? [],
        publishedDate: post.frontMatter.publishedDate ?? null,
        image: post.frontMatter.image ?? null,
    }));
}

/// !!

export const htmlEscaper = (unsafe: string) => {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

export const slugify = (string: string) => {
    return string
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};
