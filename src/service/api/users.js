import { toast } from 'react-toastify';
import { client } from './client';

//유저 정보;
const GetUser = async (classOf) => {
  const { data } = await client.get(`users/${classOf}`);
  return data;
};

const updateUserInfo = async (classOf, url, value) => {
  try {
    await client.patch(`users/${classOf}/${url}`, value, {
      headers: { 'Content-Type': `application/json` },
    });
    return;
  } catch (e) {
    toast.error(
      '⛔추가연락처 설정이 실패하였습니다. 입력하신 정보가 맞는지 확인해 주세요.',
    );
  }
};

export { GetUser, updateUserInfo };
