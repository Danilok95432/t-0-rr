import { NavBar } from "@/components/NavBar/ui/NavBar";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavBar />
    </header>
  );
};
