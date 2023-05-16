import React from 'react';
import Tasklist from './lists/TaskList';
import Settings from './settings/Settings';
import { AnimatePresence, motion } from 'framer-motion';
import useLocalStorage from '../hooks/useLocalStorage';

const defaultConfig = {
  lang: 'es',
  theme: 'dark'
};

/**
 * Función Anónima para crear un Componente principal
 * @returns {React.Component} Componente principal de nuestra aplicación
 */
const App = () => {
  const [dark, setDark] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [config, setConfig] = useLocalStorage('config', defaultConfig);

  /**
   * Se crea una variable de estado donde se almacena el valor de la configuración en localStorage
   */
  React.useEffect(() => {
    const config = JSON.parse(localStorage.getItem('config'));
    setDark(config.theme);
  }, []);

  /**
   * Función para intercambiar la variable de estado light <-> dark
   */
  const toggleDark = () => setDark(!dark);

  /**
   * DOM
   */
  return (
    <div className={`${dark ? 'dark' : ''}`}>
      <div
        className={`h-screen p-4 flex flex-col bg-gray-100 dark:bg-slate-800 transition dark:text-gray-50`}
      >
        <Tasklist
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />

        <AnimatePresence
          initial={false}
          mode='wait' 
          onExitComplete={() => null}
        >
          {showSettings && (
            <motion.div
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              exit={{ x: '100vw' }}
            >
              <Settings toggleDark={toggleDark} setConfig={setConfig}/>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
};

export default App;
