import { useReducer } from 'react';
import produce from 'immer';

const initialState = {
  setPassword: [
    {
      name: 'currentPassword',
      title: '현재 비밀번호',
      placeholder: '현재 비밀번호를 입력해 주세요',
      btn: true,
      edit: true,
    },
    {
      name: 'newPassword',
      title: '새 비밀번호',
      placeholder: '새 비밀번호를 입력해 주세요',
      btn: false,
      edit: true,
    },
    {
      name: 'checkPassword',
      title: '새 비밀번호 확인',
      placeholder: '새 비밀번호를 다시 입력해 주세요',
      btn: true,
      edit: true,
    },
  ],

  setContact: [
    {
      name: 'phoneNumber',
      title: '전화번호',
      placeholder: '전화번호를 입력해주세요',
      btn: true,
      edit: false,
    },
    {
      name: 'kakaoId',
      title: '카카오톡ID',
      placeholder: '카카오ID를 입력해주세요',
      btn: true,
      edit: false,
    },
    {
      name: 'instagramId',
      title: '인스타그램ID',
      placeholder: '인스타그램ID를 입력해주세요',
      btn: true,
      edit: false,
    },
  ],
};

const reducer = (state, action) => {
  return produce((state, draft) => {
    draft.setContact.map((data, i) => {
      if (i === action.index) {
        return (data.edit = !data.edit);
      }
    });
    // return state;
  });
};

const MyPageDataList = () => {
  const [settingInfo, settingInfoDispatch] = useReducer(reducer, initialState);

  return { settingInfo, settingInfoDispatch };
};

export default MyPageDataList;
