import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../Header';

const DarkModeToggle = dynamic(() => import('../DarkModeToggle'), {
    ssr: false,
});

const BaseLayout = ({ title, description = '', children, pageType = null }) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
            </Head>
            {pageType !== 'post' && <DarkModeToggle />}
            <div className="root">
                <Header />
                {children}
            </div>
        </>
    );
};

export default BaseLayout;
