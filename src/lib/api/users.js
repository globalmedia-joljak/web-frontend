import client from './client';

//유저 정보;
const GetUser = async (classOf) => {
  const { data } = await client.get(`users/${classOf}`);
  return data;
};

const updateInstagramId = async (classOf, value) => {
  const response = await client.patch(`users/${classOf}/instagramid`, value);
  return response;
};

const updateKakaoId = async (classOf, value) => {
  const response = await client.patch(`users/${classOf}/kakaoid`, value);
  return response;
};

const updatePhoneNumber = async (classOf, value) => {
  const response = await client.patch(`users/${classOf}/phonenumber`, value);
  return response;
};

const updatePassword = async (classOf, value) => {
  const response = await client.patch(`users/${classOf}/passoword`, value);
  return response;
};

export {
  GetUser,
  updateInstagramId,
  updateKakaoId,
  updatePhoneNumber,
  updatePassword,
};
