"use client";
import React, { useState } from "react";

import styles from "./page.module.scss";

import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import LessonsTable from "@/widget/LessonsTable/LessonsTable";
import StudentsTable from "@/widget/StudentsTable/StudentsTable";

export default function Journal() {
  const [tab, setTab] = useState<TabOption<string>>({
    value: "students",
    label: "Ученики",
  });
  const handleChange = (value: TabOption<string>) => {
    setTab(value);
  };

  return (
    <PageContainer
      ignoreHeader
      isPanel
      className={styles.base}
      actionSlot={
        <Tabs<string>
          onChange={handleChange}
          sizeVariant="big"
          defaultOption={tab}
          options={[
            {
              value: "students",
              label: "Ученики",
            },
            {
              value: "lessons",
              label: "Занятия",
            },
          ]}
        />
      }
    >
      {tab.value === "students" ? <StudentsTable /> : <LessonsTable />}
    </PageContainer>
  );
}