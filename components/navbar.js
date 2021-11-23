import React, { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";
import styles from "../styles/Navbar.module.css";

export function Navbar({ search = <Search /> }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  return (
    <header className={styles.primaryHeader}>
      <div className={styles.logo}>
        <Link href="/">
          <a className={styles.logoLink}>
            <Image
              src="/logo-ccs.svg"
              layout="fixed"
              alt="CleanCheatSheet Logo"
              width={48}
              height={48}
            />
          </a>
        </Link>
      </div>
      {search}
      <button
        ref={buttonRef}
        className={styles.mobileNavToggle}
        onClick={() => {
          const visibility = navRef.current.getAttribute("data-visible");
          if (visibility === "false") {
            navRef.current.setAttribute("data-visible", true);
            buttonRef.current.setAttribute("aria-expanded", true);
            setMobileNavOpen(true);
          } else if (visibility === "true") {
            navRef.current.setAttribute("data-visible", false);
            buttonRef.current.setAttribute("aria-expanded", false);
            setMobileNavOpen(false);
          }
        }}
        aria-controls="primary-navigation"
        aria-expanded="false"
      >
        <span className="sr-only">Menu</span>
        {!mobileNavOpen && (
          <Image src="/icons/menu_open.svg" alt="Menu" width="64" height="64" />
        )}
        {mobileNavOpen && (
          <Image
            src="/icons/menu_close.svg"
            alt="Menu"
            width="64"
            height="64"
          />
        )}
      </button>
      <nav className={styles.nav}>
        <ul
          ref={navRef}
          data-visible="false"
          id="primary-navigation"
          className={styles.primaryNavigation}
        >
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/create">
              <a>Create</a>
            </Link>
          </li>
          <li>
            <Link href="/contribute">
              <a>Contribute</a>
            </Link>
          </li>
          <li>
            <SignIn />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function SignIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <button className={styles.button} onClick={() => signOut()}>
        <p>Sign out</p>
      </button>
    );
  }
  return (
    <>
      <button className={styles.button} onClick={() => signIn("github")}>
        <p>Sign in using GitHub</p>
      </button>
    </>
  );
}
