import Image from "next/image";
import Link from "next/link";
import githubLogo from "../public/github.svg";
import styles from "../styles/Footer.module.css";

export function Footer(props) {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.links}>
          <div className={styles.text}>
            <Link href="/about" className={styles.icon}>
              <a>About</a>
            </Link>
          </div>
          <div className={styles.text}>
            <Link href="/create" className={styles.icon}>
              <a>Create</a>
            </Link>
          </div>
          <div className={styles.text}>
            <Link href="/contribute" className={styles.icon}>
              <a>Contribute</a>
            </Link>
          </div>
        </div>
        <div className={styles.icon}>
          <Link href="https://github.com/CleanCheatSheet/">
            <a className={styles.iconImage}>
              <Image src={githubLogo} alt="Logo GitHub" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
