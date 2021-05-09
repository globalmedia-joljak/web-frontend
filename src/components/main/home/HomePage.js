import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer/Footer.js';
import './homeStyle.scss';

const HomePage = () => {
  return (
    <div className="home-wrap">
      <div className="heroImg">
        <div className="hero-contetns">
          <strong>글로벌미디어학부</strong>
          <p>2021 졸업작품 전시회 '問答'</p>
          <button>
            <Link to="/works">졸업작품 보러가기</Link>
          </button>
        </div>
      </div>
      <div className="section-wrap">
        <section>
          <h2>글로벌미디어학부 학생들을 위한 '졸작' 서비스</h2>
          <p>
            쉽게 졸업작품 프로젝트를 위한 팀을 매칭시켜주고, 역대 졸업 작품들을
            관람할 수 있습니다.
          </p>
          <div className="home-video">
            <iframe
              // width="80%"
              // height="315"
              src="https://www.youtube.com/embed/BdgGZwcUC4M"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>2021 글로벌미디어학부 졸업작품 '묻고 답하다' 스케치</h3>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
