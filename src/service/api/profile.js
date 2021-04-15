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
  return data;
};

const createAuthorProfile = async (classOf, createAuthorData) => {
  console.log({ ...createAuthorData });
  try {
    await client.post(`/profiles/${classOf}`, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { ...createAuthorData },
    });

    toast.success('✅ 작가목록에 등록 되었습니다.');
  } catch (e) {
    toast.error('대표직군이 선택 되어있는지 확인해 주세요.');
    console.log(e.response);
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
      params: { ...updateProfileRequest },
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

export {
  getAuthorProfileList,
  getAuthorProfileDetail,
  createAuthorProfile,
  deleteAuthorProfile,
  updateAuthorProfile,
};
