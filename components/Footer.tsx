const Footer = () => {
    return (
        <div className="my-auto py-4 w-100 text-center text-sm">
            <span>
                Made with ❤️, ☕ and{' '}
                <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Nextjs
                </a>{' '}
                | Hosted on{' '}
                <a
                    href="https://vercel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vercel
                </a>{' '}
                | ©2022{' '}
                <a
                    href="https://github.com/dgthanhduy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    dgthanhduy
                </a>
            </span>
        </div>
    );
};

export default Footer;
