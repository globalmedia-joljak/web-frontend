import { client } from './client';

const getWorksYears = async () => {
  try {
    const { data } = await client.get('/works/years');

    return data.sort((a, b) => b - a);
  } catch (e) {
    console.log(e.response);
  }
};

const getWorksLists = async (pageNum) => {
  try {
    const { data } = await client.get('/works', {
      params: { size: 10, page: pageNum },
    });
    return data;
  } catch (e) {
    console.log(e.response);
  }
};

const getWorkDetail = async (id) => {
  try {
    const { data } = await client.get(`/works/${id}`);
    return data;
  } catch (e) {
    console.log(e.response);
  }
};

const createWorks = async (createWorksData, history) => {
  try {
    await client.post(`/works`, createWorksData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setTimeout(() => {
      history.push(`/works/2021`);
    }, 1500);
  } catch (e) {
    console.log(e.response);
  }
};

const updateWorks = async (id, updateWorksData) => {
  try {
    await client.patch(`/works/${id}`, updateWorksData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (e) {
    console.log(e.response);
  }
};

const deleteWorks = async (id) => {
  try {
    await client.delete(`/works/${id}`);
    return;
  } catch (e) {
    console.log(e.response);
  }
};

export {
  getWorksYears,
  getWorksLists,
  getWorkDetail,
  createWorks,
  updateWorks,
  deleteWorks,
};
