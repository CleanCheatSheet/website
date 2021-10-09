import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export function Navbar(props) {
  return (
    <nav className={styles.navbar}>
      <Logo logoSize={props.logoSize} />
    </nav>
  );
}

function Logo(props) {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image
            src="/logo-ccs.svg"
            alt="CleanCheatSheet Logo"
            width={props.logoSize}
            height={props.logoSize}
          />
        </a>
      </Link>
    </div>
  );
}
