import Head from 'next/head';
import Footer from '../Footer';
import Header from '../Header';

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
            <div className="root flex flex-col overflow-x-hidden">
                <Header />
                <div className="flex-grow mt-16 px-3 lg:py-0">{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default BaseLayout;
