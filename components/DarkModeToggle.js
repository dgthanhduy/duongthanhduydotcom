import useDarkMode from "@fisch0920/use-dark-mode";

import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const DarkModeToggle = (props) => {
  const darkMode = useDarkMode(false, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  return (
    <div className="d-flex fixed top-12 right-8">
      <button
        type="button"
        className={`mx-4 ${darkMode.value ? "" : "hidden"}`}
        onClick={darkMode.disable}
      >
        <IoSunnyOutline color="#FFFFFF" size="2em" />
      </button>
      <button
        type="button"
        className={`mx-4 ${!darkMode.value ? "" : "hidden"}`}
        onClick={darkMode.enable}
      >
        <IoMoonOutline size="2em" />
      </button>
    </div>
  );
};

export default DarkModeToggle;
