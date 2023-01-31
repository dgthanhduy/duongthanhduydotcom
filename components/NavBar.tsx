import dynamic from 'next/dynamic';
import Link from 'next/link';
import Search from './search/Search';
import { useRouter } from 'next/router';
import { useState } from 'react';

const DarkModeToggle = dynamic(
    () => import('./DarkModeToggle').then((module) => module.default),
    {
        ssr: false,
    },
);
const NavBar = () => {
    const router = useRouter();
    const [mobileMenuShown, setMobileMenuShown] = useState(false);

    return (
        <>
            <div className="space-x-3 md:space-x-4 align-middle flex">
                <Link
                    href={{
                        pathname: '/blog',
                    }}
                >
                    <a
                        className={
                            router.pathname === '/blog' ? 'font-bold' : ''
                        }
                    >
                        Blog
                    </a>
                </Link>
                <Link
                    href={{
                        pathname: '/blog/series',
                    }}
                >
                    <a
                        className={
                            router.pathname === '/blog/series'
                                ? 'font-bold'
                                : ''
                        }
                    >
                        Series
                    </a>
                </Link>
                <Link
                    href={{
                        pathname: '/blog/tags',
                    }}
                >
                    <a
                        className={
                            router.pathname === '/blog/tags' ? 'font-bold' : ''
                        }
                    >
                        Tags
                    </a>
                </Link>
                <DarkModeToggle />
                <Search />
            </div>
        </>
    );
};

export default NavBar;
