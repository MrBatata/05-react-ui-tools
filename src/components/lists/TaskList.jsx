import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addTaskToDB, getTasks, updateTaskInDB, updateTaskInDB2 } from "../../firebase/controller";

/**
 * Componente que gestiona la lista de tareas
 * @returns {React.Component}
 */

const TaskList = ({ showSettings, setShowSettings }) => {
  const [newTask, setNewTask] = useState("");
  const [tasklist, setTasklist] = useState([]);

  const initializeTasks = () => {
    getTasks()
      .then((t) => setTasklist([...t]))
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    console.log('useEffect run...');
    initializeTasks();
    // console.log(tasklist);
  }, [])

  /**
   * Añade una nueva tarea a la lista
   * v2: La nueva tarea se añade como un objeto { task: nombre de la tarea, completed: si está completada o no}
   */
  const addNewTask = () => {
    if (newTask === '') return;
    // setTasklist([...tasklist, { task: newTask, completed: false }]);
    addTaskToDB({ description: newTask, isCompleted: false })
      .then()
      .catch(e => console.error(e))
      .finally(() => {
        setNewTask("")
        initializeTasks()
      }
      );

  };

  /**
   * Función para chequear si la lista de tareas está vacía
   * @returns true si tasklist.length === 0
   */
  const isTasksEmpty = () => tasklist.length === 0;

  /**
   * Editar el nombre de la nueva tarea
   * @param {*} e - Evento de onChange proveniente de React
   */

  const editNewItem = (e) => setNewTask(e.target.value);

  /**
   * Función para eliminar una tarea en concreto
   * @param {*} index - Índice de la tarea a eliminar
   */

  // const removeItem = (index) => {
  //   const newtasklist = tasklist.filter((t, i) => i !== index);
  //   setTasklist(newtasklist);
  // };

  /**
   * Cambia el item por completado <-> pendiente
   * @param {*} index 
   */

  const toggleCompleteItem = (t) => {
    updateTaskInDB(t)
      .then()
      .catch(e => console.error(e))      
      .finally(() => {
        initializeTasks()
      }
      );
  };

  /**
   * Añade una nueva tarea cuando se presiona la tecla Enter
   * @param {*} e - Evento onKeyDown que proviene por defecto de React
   */
  const insertNewItemOnEnterKey = (e) => e.key === "Enter" && addNewTask();

  /**
   * DOM
   */
  return (
    <>

      <header className="flex justify-between">
        <h1 className="text-3xl text-sky-700 font-semibold dark:text-sky-300">Lista de tareas</h1>
        <motion.button
          whileTap={{ scale: 2 }}
          className="btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          {!showSettings ? "Show Settings" : "Hide Settings"}
        </motion.button>
      </header>

      <div className="my-4">
        <input
          className="shadow py-1 px-2 rounded-lg outline-none transition-all duration-300 focus:ring-2 mr-2 dark:bg-slate-700"
          value={newTask}
          onKeyDown={insertNewItemOnEnterKey}
          onChange={editNewItem}
          placeholder="New Task"
          type="text"
        />
        <button className="btn" onClick={addNewTask}>
          Create Task
        </button>
      </div>
      {
        isTasksEmpty() ? (
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Task List is Empty</p>
        ) : (
          <ul>
            {tasklist.map((t, index) => (
              <motion.li
                initial={{ x: "-100%" }}
                animate={{ x: "calc(100vw - 100%)" }}
                key={index}>
                <label className="cursor-pointer">

                  <motion.input
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.1 }}
                    style={{ x: 0 }}

                    type="checkbox"
                    // onClick={() => removeItem(index)}
                    onClick={() => toggleCompleteItem(t)}
                    checked={t.isCompleted}
                    onChange={() => { }}
                  />
                  <span
                    className={`ml-2 text-gray-800 dark:text-gray-100 text-sm italic ${t.isCompleted && "line-through"}`}
                  >
                    {t.description}
                  </span>
                </label>
              </motion.li>
            ))}
          </ul>
        )
      }
    </>
  );
};

export default TaskList;
