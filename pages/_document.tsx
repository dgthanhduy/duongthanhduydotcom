import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head></Head>
            <body>
                <script src="/noflash.js" />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
