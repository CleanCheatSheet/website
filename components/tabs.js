import styles from "../styles/Tabs.module.css";
// import Link from "next/link"
// import NextImage from "next/image"

export function Tabs(props) {
    return (
        <div className={styles.tabs}>
      
        {/* <div className= {styles.insidetabs}> */}
        <input type="radio" name="radio2" value="3" id="tab-1" />
        <label for="tab-1" className= {styles.insidetabs}>
            <p>Search through the basics</p></label>
        {/* </div> */}
        
        {/* <div > */}
        <input type="radio" name="radio2" value="4" id="tab-2"/>
        <label for="tab-2"className= {styles.insidetabs} >
            <p>Make your own </p></label>
        {/* </div> */}

        {/* <div className= {styles.insidetabs}> */}
        <input type="radio" name="radio2" value="5" id="tab-3"/>
        <label for="tab-3" className= {styles.insidetabs}>
            <p>Share it</p></label>
        {/* </div> */}
        
        {/* <div className={styles.tabsselected}></div> */}
      </div>
    );
  }