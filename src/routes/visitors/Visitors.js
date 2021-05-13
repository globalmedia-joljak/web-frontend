import React, { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';

import Disqus, { DiscussionEmbed, CommentCount} from 'disqus-react';
import '../../components/mainStyle.scss';
import './Visitors.scss';

const Visitors = ({ match, history, location}) => {

  return (
    <main className="team-build-wrap">
    <div className="section-wrap">
      <section className="contents">
        <div className="content">
          <div className="hero-img">
          <div className="hero-img__contents">
          <h1>방명록<br></br></h1>
          <h2>고생한 작가들에게 응원의 메시지를 남겨주세요!</h2>
          </div>
          <div className="hero-img__logo">
            
          </div>
          </div>
          <div className="visitors__wrap">
            <div className="visitors__poster">
              <div className="visitors__poster__img"></div>
              <div className="visitors__poster__contents">
                <div className="visitors__poster__content">
                  <h2><span>Introduction</span></h2>
                  <p>
                  숭실대학교 글로벌미디어학부 학생들의 20번째 졸업전시회에 여러분을 초대합니다.<br></br>
                  - <br></br>
                  2020년 5월부터 저희는 “글로벌미디어학부는 어떤 곳인가”라는 질문을 시작으로 졸업전시회를 만들어 왔습니다.<br></br>
                  큐레이터의 질문 위에 작가분들의 질문을 얹어 총 81명의 학생들이 2021년 5월까지 열심히 달려왔습니다. <br></br>
                  그리고 저희들의 도전에 대한 답을 이번 졸업전시회를 통해 보여드리려 합니다. <br></br>
                  많은 관심과 참여 부탁드립니다.감사합니다.
                  </p>
                </div>
                <div className="visitors__poster__content">
                  <h2><span>Date</span></h2>
                  <p>2021.05.21(Fri) - 2021.05.23(Sun) 10:00-18:00</p>
                </div>
                <div className="visitors__poster__content">
                  <h2><span>Location</span></h2>
                  <p>서울시 종로구 대학로57 홍익대 아트센터 B1 전시관</p>
                  <div className="location__image"></div>
                </div>
              </div>
            </div>
            <div className="visitors__comment">
              <DiscussionEmbed
                shortname='https-www-joljak-kr'
                config={
                  {
                    url: 'http://www.joljak.kr/visitors/2021',
                    identifier: `${match.params['year']}`,
                    title: '졸작 - 2021 방명록',
                    language: 'en' 
                  }
                }
              />
            </div>
            
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};

export default Visitors;
