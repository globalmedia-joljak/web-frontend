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

const createAuthorProfile = async ({ classOf, history }, createAuthorData) => {
  try {
    await client.post(`/profiles/${classOf}`, createAuthorData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success(`✅작가 생성이 완료 되었습니다.`);
    setTimeout(() => {
      history.push(`/team-building/author/${classOf}`);
    }, 1500);

    return;
  } catch (e) {}
};

const deleteAuthorProfile = async (classOf) => {
  try {
    await client.delete(`/profiles/${classOf}`);
    return;
  } catch (e) {}
};

const updateAuthorProfile = async (
  { classOf, history },
  updateProfileRequest,
) => {
  try {
    await client.patch(`/profiles/${classOf}`, updateProfileRequest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success(`✅ 작가목록이 수정 되었습니다.`);
    setTimeout(() => {
      history.push(`/team-building/author/${classOf}`);
    }, 1500);
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
