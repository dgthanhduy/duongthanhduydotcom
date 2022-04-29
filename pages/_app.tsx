import '../styles/globals.css';

declare global {
    interface Window {
        postIndexDump: any;
    }
}

import UserContextProvider from '../contexts/UserContextProvider';

function MyApp({ Component, pageProps }) {
    return (
        <UserContextProvider>
            <Component {...pageProps} />
        </UserContextProvider>
    );
}

export default MyApp;
