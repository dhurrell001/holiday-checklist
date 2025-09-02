import styles from "./checkListContainer.module.css";
import ChecklistItem from "./checklistItem";
import React from "react";
import packingList from "../listData/listData";
import Modal from "./addTaskModal";
import { useState } from "react";

const checklist = [
  { id: 1, task: "Book flights", checked: false },
  { id: 2, task: "Reserve accommodation", checked: false },
  { id: 3, task: "Pack luggage", checked: false },
];

export default function CheckListContainer({ title, setItem, listData }) {
  const [isToggled, setIsToggled] = React.useState(listData);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() === "") return;

    const newItem = {
      id: Date.now(), // unique id
      task: inputValue,
      checked: false,
    };

    setIsToggled((prev) => [...prev, newItem]); // add new task
    console.log(isToggled);
    setInputValue(""); // clear input
    setIsOpen(false); // close modal
  };
  const handleDelete = (id) => {
    setIsToggled((prev) => prev.filter((item) => item.id !== id));
    console.log(id);
  };
  const handleToggle = (id) => {
    setIsToggled((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.checkListItem}>
        {isToggled.map((item) => (
          <ChecklistItem
            key={item.id}
            task={item.task}
            checked={item.checked}
            onToggle={() => {
              handleToggle(item.id);
            }}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </ul>{" "}
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
