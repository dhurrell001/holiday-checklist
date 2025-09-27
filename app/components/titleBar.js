import styles from "./titleBar.module.css";
export default function TitleBar() {
  return (
    <div className={styles.titleContainer}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,96L1440,32L1440,0L0,0Z"
        ></path>
      </svg> */}
      <h1>Holiday checkList</h1>
    </div>
  );
}
