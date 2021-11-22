import React, { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";
import styles from "../styles/Navbar.module.css";

export function Navbar(props) {
  const displaySignIn =
    typeof props.displaySignIn !== "undefined" ? props.displaySignIn : true;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  return (
    // <nav className={styles.navbar}>
    //   <div className={styles.borderDiv}></div>
    //   <Logo logoSize={props.logoSize} />
    // <div className={styles.borderDiv}>
    //   {displaySignIn === true && <SignIn />}
    // </div>
    // </nav>
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
            <Search />
          </li>
          <li>
            <Link href="/about">
              <a>
                {/* <span aria-hidden="true">01</span> */}
                About
              </a>
            </Link>
          </li>
          <li>
            <Link href="/create">
              <a>
                {/* <span aria-hidden="true">02</span> */}
                Create
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contribute">
              <a>
                {/* <span aria-hidden="true">03</span> */}
                Contribute
              </a>
            </Link>
          </li>
          <li>{displaySignIn === true && <SignIn />}</li>
        </ul>
      </nav>
    </header>
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
