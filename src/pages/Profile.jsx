import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import img from "./assets/img.png";
import img1 from "./assets/IMAGE.png";

const App = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  const items = [
    {
      id: 1,
      title: "MacBook Pro",
      location: "Central Library",
      status: "status_lost",
      date: "2024-01-20",
      badge: "status_active",
    },
    {
      id: 2,
      title: "AirPods Pro",
      location: "University Campus",
      status: "status_lost",
      date: "2024-01-18",
      badge: "status_found",
    },
    {
      id: 3,
      title: "Nike Backpack",
      location: "City Gym",
      status: "status_found",
      date: "2024-01-15",
      badge: "status_active",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Навигация */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-bold text-xl">{t("logo")}</span>
          <span className="text-gray-500 text-sm hidden sm:inline dark:text-gray-300">
            {t("slogan")}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300">
          <a href="#home" className="hover:text-blue-600">{t("home")}</a>
          <a href="#lost" className="hover:text-blue-600">{t("lost")}</a>
          <a href="#found" className="hover:text-blue-600">{t("found")}</a>
          <a href="#report" className="hover:text-blue-600">{t("report")}</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Языки */}
          <div className="hidden sm:flex gap-2">
            <button onClick={() => changeLang("en")} className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">EN</button>
            <button onClick={() => changeLang("ru")} className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">RU</button>
            <button onClick={() => changeLang("uz")} className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">UZ</button>
          </div>

          {/* Переключатель темы */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
            aria-label="toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Кнопки */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg">{t("login")}</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">{t("signup")}</button>
          </div>

          <button className="md:hidden px-2 py-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-4 space-y-3 shadow">
          <a href="#home" onClick={() => setMenuOpen(false)}>{t("home")}</a>
          <a href="#lost" onClick={() => setMenuOpen(false)}>{t("lost")}</a>
          <a href="#found" onClick={() => setMenuOpen(false)}>{t("found")}</a>
          <a href="#report" onClick={() => setMenuOpen(false)}>{t("report")}</a>
        </div>
      )}


      {/* Контент */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-10">
        {/* Профиль */}
        <div className="flex flex-col items-center gap-4 p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md mt-10 w-full max-w-sm mx-auto bg-white dark:bg-gray-800">
          <img src={img} alt="avatar" className="w-32 rounded-full" />
          <h1 className="text-xl font-semibold">John Doe</h1>
          <h2 className="text-gray-600 dark:text-gray-400">john.doe@example.com</h2>

          <div className="flex justify-center gap-8 text-center flex-wrap mt-2">
            <div>
              <h1 className="text-blue-600 text-2xl">5</h1>
              <p>{t("reported")}</p>
            </div>
            <div>
              <h1 className="text-blue-600 text-2xl">2</h1>
              <p>{t("found")}</p>
            </div>
            <div>
              <h1 className="text-blue-600 text-2xl">3</h1>
              <p>Matches</p>
            </div>
          </div>
        </div>

        {/* Список вещей */}
        <div className="flex-1 mt-10 flex flex-col gap-5">
          <h1 className="text-xl font-semibold">{t("reportedItems")}</h1>
          {items.map((it) => (
            <div key={it.id} className="flex flex-col sm:flex-row gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow bg-white dark:bg-gray-800">
              <img src={img1} alt={it.title} className="w-40 h-40 object-cover mx-auto sm:mx-0 rounded-md" />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold">{it.title}</h2>
                <p>{it.location}</p>
                <p className={it.status === "status_lost" ? "text-red-600" : "text-green-600"}>
                  {t(it.status)}
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-end justify-between">
                <p>{it.date}</p>
                <p className={`text-center rounded-2xl px-3 py-1 mt-2 ${
                  it.badge === "status_active"
                    ? "bg-green-200 text-green-600"
                    : "bg-blue-200 text-blue-600"
                }`}>
                  {t(it.badge)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Футер */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 border-t border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
        <h2 className="text-sm">{t("copyright")}</h2>
        <ul className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mt-4 sm:mt-0">
          <li>{t("privacy")}</li>
          <li>{t("terms")}</li>
          <li>{t("contact")}</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
