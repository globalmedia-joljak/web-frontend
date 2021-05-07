import { client } from './client';
import { toast } from 'react-toastify';

const getIdea = async (id, history) => {
  try {
    const { data } = await client.get(`/ideaboards/${id}`);

    return data;
  } catch (e) {
    if (e.response.status === 404) {
      history.push(`/error`);
    }
    console.log(e.response);
  }
};

const getIdeas = async (pageNum, error) => {
  try {
    const { data } = await client.get(`/ideaboards`, {
      params: { size: 10, page: pageNum },
    });

    return data;
  } catch (e) {
    console.log(e.response);
  }
};

const createIdea = async (formdata) => {
  try {
    const { data } = await client.post(`/ideaboards`, formdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (e) {
    toast.error(
      '일시적인 오류가 발생했습니다. 오류가 지속되면 관리자에게 문의해주세요.',
    );
  }
};

const updateIdea = async (id, formdata) => {
  try {
<<<<<<< HEAD
    const { data } = await client.patch(`/ideaboards/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
=======
    const { data } = await client.put(`/ideaboards/${id}`, formdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
>>>>>>> 5a730bb1288ba706b62d91ed386214e087a16eb9
    });

    return data;
  } catch (e) {
    console.log(e.response);
    toast.error(
      '일시적인 오류가 발생했습니다. 오류가 지속되면 관리자에게 문의해주세요.',
    );
  }
};

const deleteIdea = async (id) => {
  try {
    await client.delete(`/ideaboards/${id}`);
  } catch (e) {
    console.log(e.response);
  }
};

export { getIdea, getIdeas, createIdea, deleteIdea, updateIdea };
