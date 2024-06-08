import React from "react";

function ThemeSwitcher() {
  const [theme, setTheme] = React.useState("mytheme");

  const toggleTheme = () => {
    const newTheme = theme === "mytheme" ? "night" : "mytheme";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">DARKMODE</div>
      <div className="swap-off">LIGHTMODE</div>
    </label>
  );
}

export default ThemeSwitcher;
