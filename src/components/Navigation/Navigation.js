import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

function Navigation({props}) {
  const [keyword, setKeyword] = useState();

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <div className={styles.nav}>
      <div className={styles.nav__column}>
        <div className={styles.nav__link}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.nav__link}>
          <Link to="/posts">Post</Link>
        </div>
        <div className={styles.nav__link}>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className={styles.nav__column}>
        <Link to="/">
          <div className={styles.nav__icon}>
            <i className="fas fa-user-alt"></i>
          </div>
        </Link>
        <div className={styles.nav__search}>
          <Link to={`/posts?keyword=${keyword}`}>
            <button>
              <i className="fas fa-search 3x"></i>
            </button>
          </Link>
          <input type="text" placeholder="Search" onChange={keywordChange}/>  
        </div>
      </div>
      
    </div>
  )
}

export default Navigation;