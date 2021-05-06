import { client } from './client';

const signin = async (signInRequest) => {
  delete client.defaults.headers.common['Authorization'];

  return await client.post(`auth/signin`, signInRequest, {
    headers: {
      'Content-Type': `application/json`,
    },
  });
};

const signup = async (signUpRequest, success, error) => {
  return await client
    .post(`auth/signup`, signUpRequest, {
      headers: {
        'Content-Type': `application/json`,
      },
    })
    .then(success)
    .catch(error);
};

const getAccessTokenByRefreshToken = async () => {
  return await client.post(`auth/refreshtoken/reissue/accesstoken`, {
    headers: {
      'Content-Type': `application/json`,
    },
  });
};

const getAccessTokenByAccessToken = async () => {
  return await client.post(`auth/reissue/accesstoken`, {
    headers: {
      'Content-Type': `application/json`,
    },
  });
};
const checkMypagePassword = async (signInRequest) => {
  return await client.post(`auth/signin`, signInRequest, {
    headers: {
      'Content-Type': `application/json`,
    },
  });
};

const stoargeInfo = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  userClassOf: localStorage.getItem('userClassOf'),
  userName: localStorage.getItem('userName'),
};

export {
  signup,
  signin,
  getAccessTokenByRefreshToken,
  getAccessTokenByAccessToken,
  stoargeInfo,
  checkMypagePassword,
};
