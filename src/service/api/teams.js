import { client } from './client';
import { stoargeInfo } from './auth';

const getTeams = async (pageNum, error) => {
  try {
    const { data } = await client.get(`/teams`, {
      params: { size: 10, page: pageNum },
    });

    return data;
  } catch (e) {
    console.log(e.response);
  }
};

export {
  getTeams
};