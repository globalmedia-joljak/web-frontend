import React from "react";
import { Link } from "react-router-dom";
import Searchform from "./Searchform";

const Navigation2 = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="">공지사항</Link>
          </li>
          <li>
            <Link to="">팀 빌딩</Link>
          </li>
          <li>
            <Link to="">졸업작품</Link>
          </li>
        </ul>
      </nav>
      <Searchform />
    </div>
  );
};

export default Navigation2;
