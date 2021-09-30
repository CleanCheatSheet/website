import styles from "../styles/Footer.module.css";
import Link from "next/link"
import NextImage from "next/image"
import GithubLogo from "../public/github.png"

export function Footer(props) {
    return (
      <div className={styles.footer}>
        <div className={styles.links}>
        <div className={styles.text}>
        <Link href="/about" className={styles.icon}>
            <a>
            About
            </a>
        </Link>
        </div>
        <div className={styles.text}>Contribute</div>
        </div>
        <div className={styles.icon}>
        <Link href="https://github.com/CleanCheatSheet/" className={styles.icon}>
            <a>
                <NextImage
                width={props.width}
                height={props.height}
                src={GithubLogo}
                alt="github"
                />
            </a>
        </Link>
        </div>
      </div>
    );
  }