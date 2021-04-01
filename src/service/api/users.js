import { client } from './client';

//유저 정보;
const GetUser = async (classOf) => {
  const { data } = await client.get(`users/${classOf}`);
  return data;
};

const updateUserInfo = async (classOf, url, value) => {
  try {
    return await client.patch(`users/${classOf}/${url}`, value, {
      headers: { 'Content-Type': `application/json` },
    });
  } catch (e) {
    console.log(e);
  }
};

export { GetUser, updateUserInfo };
