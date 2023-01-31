import useDarkMode from '@fisch0920/use-dark-mode';
import Giscus from '@giscus/react';

const Comment = () => {
    const { value } = useDarkMode();
    return (
        <div>
            <Giscus
                id="comments"
                repo="dgthanhduy/duongthanhduydotcom"
                repoId="R_kgDOHKbqng"
                category="comments"
                categoryId="DIC_kwDOHKbqns4CPE-O"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={value ? 'dark' : 'light'}
                lang="en"
                loading="lazy"
            />
        </div>
    );
};

export default Comment;
