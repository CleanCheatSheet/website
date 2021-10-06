import styles from "../styles/Card.module.css";
import Link from "next/link";
import Image from "next/image";

export function Card(props) {
  return (
    <div className={styles.wrapper}>
      <Link href={props.link}>
        <a>
          <div className={styles.container}>
            <div className={styles.icon}>
              <Image
                src={props.src}
                alt={`${props.title} logo`}
                width="200"
                height="200"
              />
            </div>
            <div className={styles.texts}>
              <div className={styles.title}>
                <h4>{props.title}</h4>
              </div>
              <div className={styles.description}>
                <p className={styles.text}>{props.description}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export function CardMosaic(props) {
  return (
    <div className={styles.mosaic}>
      {props.displayText ? (
        <div className={styles.mosaicTexts}>
          <h3>{props.title}</h3>
          <p className={styles.mosaicText}>{props.text}</p>
        </div>
      ) : (
        <></>
      )}
      {props.cards.map((card, index) => {
        return (
          <Card
            key={index}
            link={card.link}
            title={card.title}
            description={card.description}
            src={card.src}
          />
        );
      })}
    </div>
  );
}
