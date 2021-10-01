import styles from "../styles/Navbar.module.css";
import Search from "./search"
import Logo from "./logo"
import React, { useState} from 'react';

export function Navbar(props) {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <NavTitle content="CSS" link="/" css="logo"/>
      <Search />
      <ul className={styles['navbar-nav']}>{props.children}</ul>
    </nav>
  );
}

export function NavItem(props) {
  return (
    <li className={styles["nav-item"]}>
      <a href={props.link} className={styles["icon-button"] + " " + styles[props.css]}>
        {props.content}
      </a>
      {props.children}
    </li>
  );
}

export function NavTitle(props) {
  return (
    <div className={styles["nav-item"]}>
      <a href={props.link} className={styles["icon-button"] + " " + styles[props.css]}>
        {props.content}
      </a>
      {props.children}
    </div>
  );
}