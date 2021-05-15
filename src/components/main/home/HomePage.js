import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer/Footer.js';
import './homeStyle.scss';
import useTitle from '../../../hooks/useTitle.js';
import { useEffect, useRef } from 'react/cjs/react.development';
import { useAppState } from '../../../context/appContext.js';

const HomePage = () => {
  const photoEl = useRef();
  const { currentYears } = useAppState();
  useTitle('');

  useEffect(() => {
    if (photoEl.current) {
      const photo = [...photoEl.current.children];
      photo.map((el) => {
        el.style.height = `${el.clientWidth}px`;
      });
    }
  });
  return (
    <div className="home-wrap">
      <div className="heroImg">
        <div className="hero-contetns">
          <strong>글로벌미디어학부</strong>
          <p>2021 졸업작품 전시회 '묻고 답하다'</p>
          <button>
            <Link to="/works">졸업작품 보러가기</Link>
          </button>
        </div>
      </div>
      <div className="section-wrap">
        <section className="home-content">
          <h2>글로벌미디어학부 학생들을 위한 '졸작' 서비스</h2>
          <strong>
            쉽게 졸업작품 프로젝트를 위한 팀을 매칭시켜주고, 역대 졸업 작품들을
            관람할 수 있습니다.
          </strong>
        </section>
        <section className="guestbook-wrap">
          <strong>
            졸업 작품을 위해 고생한 작가들에게
            <br />
            방명록을 작성해보세요
          </strong>

          <div className="guestbook-photo-wrap" ref={photoEl}>
            <div className="guestbook-photo guestbook-photo-img01"></div>
            <div className="guestbook-photo guestbook-photo-img02"></div>
            <div className="guestbook-photo guestbook-photo-img03"></div>
          </div>

          <button className="guestbook-go">
            <Link to={`/visitors/${currentYears}`}>방명록 쓰러가기</Link>
          </button>
        </section>
        <section className="home-video">
          <div className="home-video-inr">
            <iframe
              src="https://www.youtube.com/embed/BdgGZwcUC4M"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <strong>2021 글로벌미디어학부 졸업작품 '묻고 답하다' 스케치</strong>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
