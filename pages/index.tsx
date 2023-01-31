import Link from 'next/link';
import BaseLayout from '../components/layouts/BaseLayout';

export default function Home() {
    return (
        <BaseLayout title="Home">
            <main>
                <span className="text-teal-200"></span>
                <Link href="/blog">To Blog</Link>
                <br />
                <span>Haksdk kk clvj sadljasl xzlcjl las jla sjkl</span>
                <a href="https://duongthanhduy.com">link asdkh</a>
                <br />
                <span>Haksdk kk clvj sadljasl xzlcjl las jla sjkl</span>
                <br />
                <span>Haksdk kk clvj sadljasl xzlcjl las jla sjkl</span>
                <br />
            </main>
        </BaseLayout>
    );
}
