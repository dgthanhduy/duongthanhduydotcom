import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="font-bold text-lg typing-demo">
            <Link
                href={{
                    pathname: '/',
                }}
            >
                <a>Duy's Blog</a>
            </Link>
        </div>
    );
};

export default Logo;
