import { client } from './client';

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

export { getWorksLists, getWorkDetail };
