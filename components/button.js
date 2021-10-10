import Link from "next/link";
import styles from "../styles/Button.module.css";

export function Button(props) {
  return (
    <Link href={props.link}>
      <a className={props.class}>
        <div
          className={`${styles.container} ${styles[props.angle]} ${
            props.color ? `${styles.color} color` : ""
          }`}
        >
          <p className={styles.text}>{props.text}</p>
        </div>
      </a>
    </Link>
  );
}
