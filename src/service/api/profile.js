import { client } from './client';

const getAuthorProfileList = async (pageNum) => {
  const { data } = await client.get(`/profiles`, {
    params: { size: 10, page: pageNum },
  });
  return data.simpleProfilePage;
};

const getAuthorProfileDetail = async (classOf) => {
  const { data } = await client.get(`/profiles/${classOf}`);
  return data.simpleProfile;
};

const createAuthorProfile = async (classOf, createAuthorData) => {
  try {
    await client.post(`/profiles/${classOf}`, createAuthorData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return;
  } catch (e) {}
};

const deleteAuthorProfile = async (classOf) => {
  try {
    await client.delete(`/profiles/${classOf}`);
    return;
  } catch (e) {}
};

const updateAuthorProfile = async (classOf, updateProfileRequest) => {
  try {
    return await client.patch(`/profiles/${classOf}`, updateProfileRequest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export {
  getAuthorProfileList,
  getAuthorProfileDetail,
  createAuthorProfile,
  deleteAuthorProfile,
  updateAuthorProfile,
};
