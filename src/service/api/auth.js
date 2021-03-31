import { client } from './client';

const signup = async (signUpRequest, success, error) => {
  return await client.post(
    `auth/signup`, 
    signUpRequest,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  )
  .then(success)
  .catch(error);
};

export {
  signup
};