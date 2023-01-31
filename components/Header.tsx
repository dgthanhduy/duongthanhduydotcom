import Logo from './Logo';
import NavBar from './NavBar';

const Header = () => {
    return (
        <>
            <div className="flex flex-wrap fixed top-0 bg-gray-100 dark:bg-gray-800 items-center justify-center md:justify-between w-screen py-2 px-12">
                <Logo />
                <NavBar />
            </div>
        </>
    );
};
export default Header;
