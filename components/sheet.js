import styles from "../styles/Sheet.module.css";

export function CleanCheatSheet(props) {
  return (
    <>
      <style global jsx>{`
        img {
          max-width: 30rem;
          width: 100%;
        }
      `}</style>
      <main>
        <section className={styles.basicGrid}>
          {props.sheets.map((sheet, index) => {
            return (
              <Sheet
                key={index}
                html={sheet}
                title={props.title}
                customCss={index === 0 ? { background: props.color } : {}}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export function Sheet(props) {
  return (
    <div
      className={styles.card}
      style={props.customCss}
      dangerouslySetInnerHTML={{ __html: props.html }}
    ></div>
  );
}
