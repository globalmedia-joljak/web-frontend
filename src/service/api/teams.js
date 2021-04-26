import { client } from './client';
import { stoargeInfo } from './auth';
import { toast } from 'react-toastify';

const getTeam = async (id, history) => {
  try {
    const { data } = await client.get(`/teams/${id}`);

    return data;
  } catch (e) {
    if (e.response.status === 404) {
      history.push(`/error`);
    }
    console.log(e.response);
  }
};

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

const createTeam = async (createTeamRequest) => {
  const formdata = new FormData();

  for (let attr in createTeamRequest) {
    formdata.append(attr, createTeamRequest[attr]);
  }

  try {
    const { data } = await client.post(`/teams`, formdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (e) {
    toast.error('일시적인 오류가 발생했습니다. 오류가 지속되면 관리자에게 문의해주세요.');
  }
}

export {
  getTeam,
  getTeams,
  createTeam
};