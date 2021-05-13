import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer/Footer.js';
import './homeStyle.scss';
import useTitle from '../../../hooks/useTitle.js';

const HomePage = () => {
  useTitle('');
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
          <div className="guestbook-wrap">
            <div className="guestbook-ment">
              <p>
                졸업 작품을 위해 고생한 작가들에게
                <br />
                방명록을 작성해보세요
              </p>
            </div>
            <div className="guestbook-photo-wrap">
              <div className="guestbook-photo guestbook-photo-img01"></div>
              <div className="guestbook-photo guestbook-photo-img02"></div>
              <div className="guestbook-photo guestbook-photo-img03"></div>
            </div>
              <Link to='/visitors/2021' className="guestbook-go">
                방명록 남기기
              </Link>
          </div>
          <div className="home-video">
            <iframe
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
