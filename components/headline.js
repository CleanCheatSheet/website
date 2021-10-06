import styles from "../styles/Headline.module.css";

export function Headline(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{props.title}</h1>
      </div>
      <div className={styles.subtitle}>
        <h2>{props.subtitle}</h2>
      </div>
    </div>
  );
}
