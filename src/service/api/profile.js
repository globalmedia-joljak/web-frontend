import { client } from './client';

const getUserProfile = async () => {
  const { data } = await client.get(`/profiles`);
  return data.simpleProfilePage;
};

const getUserProfileDetail = async (classOf) => {
  const response = await client.get(`/profiles/${classOf}`, {
    params: { size: 10, page: 40 },
  });
  return response;
};

export { getUserProfile, getUserProfileDetail };
