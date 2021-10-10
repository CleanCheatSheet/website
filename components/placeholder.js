import { Button } from "./button";
import Image from "next/image";
import styles from "../styles/Placeholder.module.css";

export function PlaceholderLeft(props) {
  return (
    <div className={`${styles.container} ${styles.background}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.image}>
          <Image src={props.src} alt={props.alt} width="800" height="800" />
        </div>
      </div>
      <div className={styles.texts}>
        <div className={styles.title}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.text}>
          <p>{props.text}</p>
        </div>
        <Button
          angle={props.buttonAngle}
          color={false}
          text={props.buttonText}
          link={props.link}
        />
      </div>
    </div>
  );
}

export function PlaceholderRight(props) {
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <div className={styles.title}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.text}>
          <p>{props.text}</p>
        </div>
        <Button
          angle={props.buttonAngle}
          color={false}
          text={props.buttonText}
          link={props.link}
        />
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.image}>
          <Image src={props.src} alt={props.alt} width="800" height="800" />
        </div>
      </div>
    </div>
  );
}
