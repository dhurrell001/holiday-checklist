"use client";

import styles from "./checkListContainer.module.css";
import ChecklistItem from "./checklistItem";
import Modal from "./addTaskModal";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CheckListContainer({ title, listKey, listData }) {
  const [tasks, setTasks] = useState([]); // start empty → consistent SSR
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Load tasks from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem(listKey);
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks(
        listData.map((item) => ({
          ...item,
          checked: item.checked ?? false,
        }))
      );
    }
  }, [listKey, listData]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(listKey, JSON.stringify(tasks));
    }
  }, [tasks, listKey]);

  const handleAddItem = () => {
    if (inputValue.trim() === "") return;

    const newItem = {
      id: uuidv4(), // use stable unique ID generator
      task: inputValue,
      checked: false,
    };

    setTasks((prev) => [...prev, newItem]);
    setInputValue("");
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    const taskToDelete = tasks.find((item) => item.id === id);
    if (!taskToDelete) return;
    if (
      !window.confirm(`Are you sure you want to delete ${taskToDelete.task}?`)
    )
      return;
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.checkListItem}>
        {tasks.map((item) => (
          <ChecklistItem
            key={item.id}
            id={item.id}
            task={item.task}
            checked={item.checked}
            onToggle={() => handleToggle(item.id)}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsOpen(true)}
        >
          Add Item
        </button>
        <Modal
          isOpen={isOpen}
          onClose={handleAddItem}
          onExit={() => setIsOpen(false)}
        >
          <h2>Add New Task</h2>
          <input
            type="text"
            placeholder="Task name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
          />
        </Modal>
      </div>
    </div>
  );
}

// "use client";

// import styles from "./checkListContainer.module.css";
// import ChecklistItem from "./checklistItem";
// import React from "react";
// import packingList from "../listData/listData";
// import Modal from "./addTaskModal";
// import { useState, useEffect } from "react";

// export default function CheckListContainer({
//   title,
//   setItem,
//   listKey,
//   listData,
// }) {
//   const [isToggled, setIsToggled] = React.useState(listData);
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [loaded, setLoaded] = useState(false);

//   // Initialize tasks from localStorage if available, otherwise from listData
//   const [tasks, setTasks] = useState(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem(listKey);
//       if (saved) {
//         setLoaded(true);
//         return JSON.parse(saved);
//       }
//     }
//     return listData.map((item) => ({
//       ...item,
//       checked: item.checked ?? false,
//     }));
//   });

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(listKey, JSON.stringify(tasks));
//     }
//   }, [tasks, listKey]);
//   if (!loaded) return null;
//   // const [tasks, setTasks] = useState(
//   //   listData.map((item) => ({ ...item, checked: item.checked ?? false }))
//   // );

//   // const [isToggled, setIsToggled] = React.useState(listData);
//   // const [isOpen, setIsOpen] = React.useState(false);
//   // const [inputValue, setInputValue] = useState("");
//   // console.log("List data:", listKey);
//   // // Load tasks from localStorage on mount
//   // useEffect(() => {
//   //   localStorage.setItem(listKey, JSON.stringify(tasks));
//   // }, [tasks, listKey]);

//   // useEffect(() => {
//   //   const saved = localStorage.getItem(listKey);
//   //   console.log("Saved tasks:", saved);
//   //   if (saved) {
//   //     setTasks(JSON.parse(saved));
//   //   } else {
//   //     setTasks(listData);
//   //   }
//   // }, [listData, listKey]);

//   // Save tasks to localStorage whenever they change

//   const handleAddItem = () => {
//     if (inputValue.trim() === "") return;

//     const newItem = {
//       id: Date.now(), // unique id
//       task: inputValue,
//       checked: false,
//     };

//     setTasks((prev) => [...prev, newItem]); // add new task
//     console.log(isToggled);
//     setInputValue(""); // clear input
//     setIsOpen(false); // close modal
//   };
//   const handleDelete = (id) => {
//     const taskToDelete = tasks.find((item) => item.id === id);
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${taskToDelete.task} ? `
//     );
//     if (!confirmDelete) return;
//     setTasks((prev) => prev.filter((item) => item.id !== id));
//     console.log(id);
//   };
//   const handleToggle = (id) => {
//     setTasks((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, checked: !item.checked } : item
//       )
//     );
//   };
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>{title}</h1>
//       <ul className={styles.checkListItem}>
//         {tasks.map((item) => (
//           <ChecklistItem
//             key={item.id}
//             task={item.task}
//             checked={item.checked}
//             onToggle={() => {
//               handleToggle(item.id);
//             }}
//             onDelete={() => handleDelete(item.id)}
//           />
//         ))}
//       </ul>{" "}
//       <div className={styles.buttonContainer}>
//         <button
//           type="button"
//           className={styles.button}
//           onClick={() => setIsOpen(true)}
//         >
//           Add Item
//         </button>
//         <Modal
//           isOpen={isOpen}
//           onClose={handleAddItem}
//           onExit={() => setIsOpen(false)}
//         >
//           <h2>Add New Task</h2>
//           <input
//             type="text"
//             placeholder="Task name"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className={styles.input}
//           />
//         </Modal>
//       </div>
//     </div>
//   );
// }
