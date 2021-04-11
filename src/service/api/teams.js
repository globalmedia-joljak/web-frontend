import { client } from './client';

const getTeams = async (pageNum) => {
  const { data } = await client.get(`/teams`, {
    params: { size: 10, page: pageNum },
  });
  return data;
};