import React from "react";
import { Link } from "react-router-dom";
import "./Team.scss";

function Team({id, title, category, members, author, createdDate}) {
  return (
    <Link to={{
      pathname: `teams/${id}`,
      state: {
        id
      }
    }}>
      <div className={styles.post}>
        <div className={styles.post__id}>
            {id}
        </div>
        <div className={styles.post__title}>
          {title}
        </div>
        <div className={styles.post__date}>
          {createdDate.split('T')}
        </div>
      </div>
    </Link>
    
  )
}

export default Team;