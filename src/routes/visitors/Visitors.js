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
      </section>
    </div>
  </main>
  );
};

export default Visitors;
