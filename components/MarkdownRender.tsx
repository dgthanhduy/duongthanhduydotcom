import Image from 'next/image';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { slugify } from '../lib/utils';

const MarkdownRender = ({ markdownBody }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[[gfm, { singleTilde: false }]]}
            components={{
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={nightOwl}
                            language={match[1]}
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
                img: ({ node, className, ...props }) => (
                    <Image
                        className={className}
                        width="600"
                        height="300"
                        placeholder="blur"
                        blurDataURL={props.src}
                        src={props.src}
                        alt={props.alt}
                    />
                ),
                h2: ({ node, className, children, ...props }) => (
                    <a href={`#${slugify(String(children))}`}>
                        <h2
                            className={className}
                            id={`${slugify(String(children))}`}
                        >
                            {children}
                        </h2>
                    </a>
                ),
            }}
        >
            {markdownBody}
        </ReactMarkdown>
    );
};

export default MarkdownRender;
