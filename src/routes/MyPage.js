import React from 'react';
import MypageProvider from '../context/mypageContext.js';
import MyPageForm from '../components/main/mypage/MyPageForm.js';

const MyPage = () => {
  return (
    <MypageProvider>
      <MyPageForm />
    </MypageProvider>
  );
};

export default MyPage;
