import { navBarItems } from "../lib/navBar-items";
import styles from "./navBar.module.scss";

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navBarItems.map((navItem) => (
          <li>
            <a href={navItem.href}>{navItem.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
