import React, { useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function ThemeSwitcher() {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "mytheme");

  const toggleTheme = () => {
    const newTheme = theme === "mytheme" ? "night" : "mytheme";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme preference
  };

  useEffect(() => {
    // Set initial theme on component mount
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate text-3xl text-primary">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">
        <MdDarkMode />
      </div>
      <div className="swap-off">
        <MdLightMode />
      </div>
    </label>
  );
}

export default ThemeSwitcher;
