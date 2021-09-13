import styles from "../styles/Navbar.module.css";
import Search from "./search"
import React, { useState} from 'react';

export function Navbar(props) {
  return (
    <nav className={styles.navbar}>
      <NavItem content="CCS" link="/" css="logo"/>
      <Search />
      <ul className={styles['navbar-nav']}>{props.children}</ul>
    </nav>
  );
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles["nav-item"]}>
      <a href={props.link} className={styles["icon-button"] + " " + styles[props.css]} onClick={() => setOpen(!open)}>
        {props.content}
      </a>

      {open && props.children}
    </li>
  );
}