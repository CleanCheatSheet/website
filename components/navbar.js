import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Logo />
    </nav>
  );
}

function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image
            src="/logo-ccs.svg"
            alt="CleanCheatSheet Logo"
            width="64"
            height="64"
          />
        </a>
      </Link>
    </div>
  );
}
