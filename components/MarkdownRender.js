import Image from "next/image";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownRender = ({ markdownBody }) => {
  return (
    <ReactMarkdown
      children={markdownBody}
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            />
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
      }}
    />
  );
};

export default MarkdownRender;
