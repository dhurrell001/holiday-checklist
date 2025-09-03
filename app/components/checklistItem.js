"use client";
import styles from "./checkListItem.module.css";

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
        X{" "}
      </button>
    </div>
  );
}
