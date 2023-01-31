import '../styles/globals.css';

declare global {
    interface Window {
        postIndexDump: any;
    }
}

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
