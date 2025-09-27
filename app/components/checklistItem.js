"use client";
import styles from "./checkListItem.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trash2 } from "lucide-react";

export default function ChecklistItem({
  id,
  task,
  checked,
  onToggle,
  onDelete,
}) {
  return (
    <div className={styles.itemContainer}>
      <li className={styles.checklistItem}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          style={{ marginRight: "10px", fontSize: "20px" }}
          className={styles.checkbox}
        />
        {task}
      </li>
      <button onClick={() => onDelete(id)} className={styles.deleteButton}>
        <Trash2 color="#ffffff" strokeWidth={1} />
      </button>
    </div>
  );
}
