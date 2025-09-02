import styles from "./addTaskModal.module.css";

export default function Modal({ isOpen, onClose, onExit, children }) {
  const handleClose = () => {};
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children}

        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.button}>
            Save
          </button>
          <button onClick={onExit} className={styles.button}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
