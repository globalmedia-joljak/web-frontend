import React from 'react';
import MyPageForm from '../components/main/mypage/MyPageForm.js';
import MypageProvider from '../context/mypageContext.js';

const MyPage = () => {
  return (
    <MypageProvider>
      <MyPageForm />
    </MypageProvider>
  );
};

export default MyPage;
