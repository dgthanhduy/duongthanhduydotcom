import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFilters, PostFrontMatter } from '../types';

import seriesData from '../data/series/series.json';

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

    let { data, content } = matter(source);
    data.series = data.series + '';
    const seriesFrontMatter = seriesData[data.series];

    return {
        frontMatter: { ...data },
        slug: slug,
        markdownBody: content,
        series: {
            frontMatter: seriesFrontMatter,
            slug: data.series,
        },
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
        let { data } = matter(source);
        data.series = data.series + '';
        const seriesFrontMatter = seriesData[data.series];
        if (filters) {
            if (filters.tag) {
                //* Filter by tag here
                if (data.tags.includes(filters.tag)) {
                    return [
                        {
                            frontMatter: data,
                            slug: postSlug.replace('.md', ''),
                            series: {
                                frontMatter: seriesFrontMatter,
                                slug: data.series,
                            },
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
                            series: {
                                frontMatter: seriesFrontMatter,
                                slug: data.series,
                            },
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
                series: {
                    frontMatter: seriesFrontMatter,
                    slug: data.series,
                },
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

export async function getSeries(dataType: string) {
    let allSeries = new Set<string>();
    Object.keys(seriesData).forEach((slug) => {
        if (slug !== 'undefined') allSeries.add(slug);
    });
    return Array.from(allSeries);
}

export async function getSameSeriesPosts(dataType: string, series: string) {
    return await getAllPostsWithFrontMatter(dataType, { series: series });
}

export function cachedPostData(posts: Post[]): Post[] {
    return posts.map(
        (post): Post => ({
            slug: post.slug,
            frontMatter: {
                title: post.frontMatter.title,
                publishedDate: post.frontMatter.publishedDate ?? null,
            },
        }),
    );
}

/// !!

export const htmlEscaper = (unsafe: string): string => {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

export const slugify = (string: string): string => {
    return string
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};
