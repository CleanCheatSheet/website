import styles from "../styles/Tabs.module.css";
import React, { useState } from "react";
// import Link from "next/link"
// import NextImage from "next/image"

export function Tabs(props) {
  
  const [data, setData] = useState(props.content);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showCurrent, setShowCurrent] = useState(false);

  const toggleCurrent = () => {
    if (!showCurrent) {
      setShowCurrent(true);
      return;
    }
  };

  const setCurrent = index => {
    setCurrentIdx(index);
    toggleCurrent();
  };

    return (
        <div className={styles.grid}>
          <div className={styles.tabs}>
            <input type="radio" name="radio2" value="3" id="tab-1" onChange={() => setCurrent(0)} />
            <label for="tab-1" className= {styles.insidetabs}>
                <p>{props.title[0]}</p></label>
                
            <input type="radio" name="radio2" value="4" id="tab-2" onChange={() => setCurrent(1)}/>
            <label for="tab-2"className= {styles.insidetabs} >
                <p> {props.title[1]}</p></label>

            <input type="radio" name="radio2" value="5" id="tab-3" onChange={() => setCurrent(2)}/>
            <label for="tab-3" className= {styles.insidetabs}>
                <p>{props.title[2]}</p></label>
          </div>

          <div className={styles.text}>
            {showCurrent ? <div className="title">{data[currentIdx]['title']}</div> : null}
            {showCurrent ? <p>{data[currentIdx]['paragraph']}</p> : null}
          </div>
          
        </div>

     
    );
  }