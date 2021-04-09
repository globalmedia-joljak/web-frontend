import { client } from './client';

const getAuthorProfileList = async (pageNum) => {
  const { data } = await client.get(`/profiles`, {
    params: { size: 10, page: pageNum },
  });
  return data.simpleProfilePage;
};

const getUserProfileDetail = async (classOf) => {
  const { data } = await client.get(`/profiles/${classOf}`);
  return data;
};

const createAuthorProfile = async (classOf, registerProfileRequest) => {
  try {
    await client.post(`/profiles/${classOf}`, registerProfileRequest, {
      headers: { 'Content-Type': `application/json` },
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteAuthorProfile = async (classOf) => {
  try {
    await client.delete(`/profiles/${classOf}`);
    return;
  } catch (e) {
    console.log(e);
  }
};

const updateAuthorProfile = async (classOf, updateProfileRequest) => {
  try {
    await client.patch(`/profiles/${classOf}`, updateProfileRequest, {
      headers: { 'Content-Type': `application/json` },
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

export {
  getAuthorProfileList,
  getUserProfileDetail,
  createAuthorProfile,
  deleteAuthorProfile,
  updateAuthorProfile,
};
