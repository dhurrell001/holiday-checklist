"use client";
import React from "react";
import { useState } from "react";
import styles from "./page.module.css";
import ChecklistItem from "../components/checklistItem";
import CheckListContainer from "../components/checkListContainer";
import packingList from "../listData/listData";
import TitleBar from "../components/titleBar";
const checklist = [
  { id: 1, task: "Book flights" },
  { id: 2, task: "Reserve accommodation" },
  { id: 3, task: "Pack luggage" },
];

export default function Home() {
  const [accessoriesList, setAccessoriesList] = useState(
    packingList.accessories
  );
  const [clothesList, setClothesList] = useState(packingList.clothes);
  const [documentsList, setDocumentsList] = useState(packingList.documents);
  const [electricalList, setElectricalList] = useState(packingList.electrical);
  const [notesList, setNotesList] = useState(packingList.notes);

  return (
    <>
      <div>
        <TitleBar />
      </div>

      <div className={styles.gradientBackground}>
        <CheckListContainer title="Clothes" listData={packingList.clothes} />
        <CheckListContainer
          title="Accessories"
          listData={packingList.accessories}
          setItem={setAccessoriesList}
        />
        <CheckListContainer
          title="Documents"
          listData={packingList.documents}
        />
        <CheckListContainer
          title="Electrical"
          listData={packingList.electrical}
        />
        <CheckListContainer title="Notes" listData={packingList.notes} />
      </div>
    </>
    // <div className={styles.mainContainer}>
    //   <h1>Holiday Checklist</h1>
    //   <ul className={styles.checkListItem}>
    //     {checklist.map((item) => (
    //       <ChecklistItem
    //         key={item.id}
    //         task={item.task}
    //         checked={false}
    //         onToggle={() => {}}
    //         onDelete={() => {}}
    //       />
    //     ))}
    //   </ul>
    // </div>
  );
}
