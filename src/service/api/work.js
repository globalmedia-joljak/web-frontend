import { toast } from 'react-toastify';
import { client } from './client';

const getWorksYears = async () => {
  try {
    const { data } = await client.get('/works/years');

    return data.sort((a, b) => b - a);
  } catch (e) {
    console.log(e.response);
  }
};

const getWorksLists = async (pageNum, history) => {
  try {
    const { data } = await client.get('/works', {
      params: { size: 8, page: pageNum },
    });
    return data;
  } catch (e) {
    if (e.response.status === 404) {
      history.push(`/error`);
    }
    console.log(e.response);
  }
};

const getWorksYearList = async ({ pageNum, year }, history) => {
  try {
    const { data } = await client.get('/works/search', {
      params: { size: 10, page: pageNum, exhibitedYear: year },
    });
    return data;
  } catch (e) {
    if (e.response.status === 404) {
      history.push(`/error`);
    }
    console.log(e.response);
  }
};

const getWorkDetail = async (id, history) => {
  try {
    const { data } = await client.get(`/works/${id}`);
    return data;
  } catch (e) {
    if (e.response.status === 404) {
      history.push(`/error`);
    }
    console.log(e.response);
  }
};

const createWorks = async (createWorksData, history) => {
  try {
    await client.post(`/works`, createWorksData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success(
      `✅ 졸업작품이 등록되었습니다. 졸업작품 페이지로 이동합니다.`,
    );
    setTimeout(() => {
      history.push(`/works/2021`);
    }, 1500);
  } catch (e) {
    console.log(e.response);
    toast.error(`⛔ 서비스 오류. 졸업작품 페이지로 이동합니다.`);
    setTimeout(() => {
      history.push(`/works`);
    }, 1300);
  }
};

const updateWorks = async ({ worksId, history }, updateWorksData) => {
  try {
    await client.patch(`/works/${worksId}`, updateWorksData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    toast.success(
      `✅ 졸업작품이 수정 되었습니다. 졸업작품 상세페이지로 이동합니다.`,
    );
    setTimeout(() => {
      history.push(`/works/2021/${worksId}`);
    }, 1400);
  } catch (e) {
    console.log(e.response);

    toast.error(`⛔ 서비스 오류. 졸업작품 페이지로 이동합니다.`);
    setTimeout(() => {
      history.push(`/works`);
    }, 1300);
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
  getWorksYearList,
};
