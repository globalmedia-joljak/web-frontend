import React from "react";
import Footer from "./footer/Footer.js";
import "./homeStyle.scss";

const HomePage = () => {
  return (
    <div className="home-wrap">
      <div className="heroImg"></div>
      <div className="section-wrap">
        <section>
          <h2>글로벌미디어학부 학생들을 위한 '졸작' 서비스</h2>
          <p>
            쉽게 졸업작품 프로젝트를 위한 팀을 매칭시켜주고, 역대 졸업 작품들을
            관람할 수 있습니다.
          </p>
          <div className="home-video">
            <video controls>{/* <source src="" type="IMG/MOV" /> */}</video>
            <h3>2021 글로벌미디어학부 졸업작품 '묻고 답하다' 스케치</h3>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
