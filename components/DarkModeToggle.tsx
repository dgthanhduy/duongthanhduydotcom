import useDarkMode from '@fisch0920/use-dark-mode';
import { useCallback } from 'react';

import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false, {
        classNameDark: 'dark',
        classNameLight: 'light',
    });

    return (
        <div
            role="button"
            className="inline cursor-pointer"
            onClick={darkMode.toggle}
        >
            <IoSunnyOutline
                size="1.5em"
                className={`${darkMode.value ? '' : 'hidden'} outline-icon`}
            />
            <IoMoonOutline
                size="1.5em"
                className={`${!darkMode.value ? '' : 'hidden'} outline-icon`}
            />
        </div>
    );
};

export default DarkModeToggle;
