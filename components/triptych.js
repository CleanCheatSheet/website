import styles from "../styles/Triptych.module.css";
import Image from "next/image";

export function Triptych(props) {
  return (
    <div className={styles.wrapper}>
      <Panel
        src="/icons/language.svg"
        alt="Open source icon"
        title="Open Source"
        text="We are developping CleanCheatSheet 100% open source. Please feel free to contribute to the code on GitHub."
      />
      <Panel
        src="/icons/people.svg"
        alt="Community icon"
        title="Community"
        text="CleanCheatSheet is driven by its community of contributor that create the sheets to make life a little easier."
      />
      <Panel
        src="/icons/savings.svg"
        alt="Support us icone"
        title="Support us"
        text="There is no ads on the website, and the only income we have are you tips. If you want to contribute to the cost of the server, please considere send you a couple of euros."
      />
    </div>
  );
}

export function Panel(props) {
  return (
    <div className={styles.panel}>
      <Image src={props.src} alt={props.alt} width="64" height="64" />
      <h3>{props.title}</h3>
      <p className={styles.text}>{props.text}</p>
    </div>
  );
}
