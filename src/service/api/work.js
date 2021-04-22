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

export { getWorksLists };
