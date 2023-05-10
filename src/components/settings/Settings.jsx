import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const defaultConfig = {
  theme: "dark",
  lang: "es",
};

export default function Settings({ toggleDark }) {
  /**
   * Intenta colocar `defaultConfig` como value mediante el hook `useLocalStorage`.
   * Solo lo logra si no existe una `key` en LocalStorage igual a "config".
   * De haber una `key` con tal valor, el state `config` obtiene el JSON.parse del LocalStorage.
   * `setConfig` siempre setea tanto state como al LocalStorage.
   */
  const [config, setConfig] = useLocalStorage("config", defaultConfig);

  /**
   * Función para intercambiar light <-> dark tanto en localStorage como en estado de la aplicación
   * @param {*} event - Evento de click proveniente de React
   */
  const toggleMode = (event) => {
    event.preventDefault();
    setConfig((oldConfig) => ({
      ...oldConfig,
      theme: (oldConfig.theme === "light") ? "dark" : "light",
    }));
    toggleDark();
  };

  return (
    <div className="text-right z-10">
      <h1 className="text-3xl text-cyan-800 font-semibold mb-4 dark:text-cyan-400">APP SETTINGS</h1>
      <button className="btn mt-4" type="button" onClick={toggleMode}>
        Toggle DarkMode
      </button>
    </div>
  );
}
