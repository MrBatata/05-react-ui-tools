import React from 'react';

export default function Settings({ toggleDark,setConfig }) {

  /** Función para intercambiar light <-> dark tanto en localStorage como en estado de la aplicación
   * @param {*} event - Evento de click proveniente de React
   */
  const toggleMode = () => {
    setConfig((config) => ({
      ...config,
      theme: (config.theme === 'light') ? 'dark' : 'light',
    }));
    toggleDark();
  };

  return (
    <div className='text-right z-10'>
      <h1 className='text-3xl text-cyan-800 font-semibold mb-4 dark:text-cyan-400'>APP SETTINGS</h1>
      <button className='btn mt-4' type='button' onClick={toggleMode}>
        Toggle DarkMode
      </button>
    </div>
  );
}
