import { useState } from 'react';

const settingInfo = {
  setPassword: [
    {
      name: 'currentPassword',
      title: '현재 비밀번호',
      placeholder: '현재 비밀번호를 입력해 주세요',
      btn: true,
      edit: true,
      inputType: 'password',
    },
    {
      name: 'newPassword',
      title: '새 비밀번호',
      placeholder: '새 비밀번호를 입력해 주세요',
      btn: false,
      edit: true,
      inputType: 'password',
    },
    {
      name: 'checkPassword',
      title: '새 비밀번호 확인',
      placeholder: '새 비밀번호를 다시 입력해 주세요',
      btn: true,
      edit: true,
      inputType: 'password',
    },
  ],

  setContact: [
    {
      name: 'phoneNumber',
      title: '전화번호',
      placeholder: '전화번호를 입력해주세요',
      btn: true,
      edit: false,
      inputType: 'number',
    },
    {
      name: 'kakaoId',
      title: '카카오톡ID',
      placeholder: '카카오ID를 입력해주세요',
      btn: true,
      edit: false,
      inputType: 'text',
    },
    {
      name: 'instagramId',
      title: '인스타그램ID',
      placeholder: '인스타그램ID를 입력해주세요',
      btn: true,
      edit: false,
      inputType: 'text',
    },
  ],
};

const MyPageDataList = () => {
  const [settinginfo, setSettinginfo] = useState(settingInfo);

  return { settinginfo, setSettinginfo };
};

export default MyPageDataList;
