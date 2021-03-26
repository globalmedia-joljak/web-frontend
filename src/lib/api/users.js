import { client } from './client';

//유저 정보;
const GetUser = async (classOf) => {
  const { data } = await client.get(`users/${classOf}`);
  return data;
};

const updateInstagramId = async (classOf, value) => {
  try {
    return await client.patch(`users/${classOf}/instagramid`, value);
  } catch (e) {
    console.log(e);
  }
};

const updateKakaoId = async (classOf, value) => {
  try {
    return await client.patch(`users/${classOf}/kakaoid`, value);
  } catch (e) {
    console.log(e);
  }
};

const updatePhoneNumber = async (classOf, value) => {
  try {
    return await client.patch(`users/${classOf}/phonenumber`, value);
  } catch (e) {
    console.log(e);
  }
};

const updatePassword = async (classOf, value) => {
  try {
    return await client.patch(`users/${classOf}/passoword`, value);
  } catch (e) {
    console.log(e);
  }
};

export {
  GetUser,
  updateInstagramId,
  updateKakaoId,
  updatePhoneNumber,
  updatePassword,
};
