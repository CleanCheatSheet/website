import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export function Navbar(props) {
  const displaySignIn =
    typeof props.displaySignIn !== "undefined" ? props.displaySignIn : true;
  return (
    <nav className={styles.navbar}>
      <div className={styles.borderDiv}></div>
      <Logo logoSize={props.logoSize} />
      <div className={styles.borderDiv}>
        {displaySignIn === true && <SignIn />}
      </div>
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
