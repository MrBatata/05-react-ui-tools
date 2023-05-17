import { db } from "./index";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

/** Code to add document to a specific collection in Firestore  */
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

/** Code to get document list (all) from a specific collection in Firestore  */
export const getTasks = async () => {
  console.log('Ejecutando getDocs(db, "tasks")');
  const querySnapshot = await getDocs(collection(db, "tasks"));
  console.log(querySnapshot);
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  //   console.log(`${doc.id} => ${doc.data().description}`);
  // });
  /** querySnapshot has property `docs` that contains the array of data in Firestore */
  const tasks = querySnapshot.docs.map(t => {
    // console.log(t.data()); // only obtain the `description` property
    return { description: t.data().description, isCompleted: t.data().isCompleted, id: t.id }
  }); // `map()` returns an array, therefore...
  // `tasks` is now an array of objects, 
  // these objects with propierties from the task and id propierty added.
  console.log(tasks);
  return tasks;
};

export const addTaskToDB = async (t) => {
  await addDoc(collection(db, 'tasks'), t);
  console.log(`task "${t}" has been stored...`);
};

export const updateTaskInDB = async (t) => {
  const updateRef = doc(db, "tasks", t.id)
  await updateDoc(updateRef, { isCompleted: !t.isCompleted })
  console.log(`task "${t.id}" has been updated...`);
};

// Would be the same?
// export const updateTaskInDB2 = async (t) => {
//   const updateRef = doc(db, "tasks", t.id)
//   await setDoc(updateRef, {...t, isCompleted: !t.isCompleted })
//   console.log(`task "${t.id}" has been updated...`);
// };