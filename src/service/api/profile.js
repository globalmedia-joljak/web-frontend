import { toast } from 'react-toastify';
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
    toast.success('✅ 작가목록에 등록 되었습니다.');
    return;
  } catch (e) {
    toast.error('대표직군이 선택 되어있는지 확인해 주세요.');
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
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success('✅ 작가목록이 수정 되었습니다.');
    return;
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
