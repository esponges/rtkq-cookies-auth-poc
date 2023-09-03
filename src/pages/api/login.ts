import type { NextApiRequest, NextApiResponse } from 'next';

export type LoginResponse = {
  token: string;
  refreshToken: string;
};

// set a resolved promise that gets a new token and refreshToken
const loginMutation = async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'token',
        refreshToken: 'refreshToken',
      });
    }, 1000);
  }) as LoginResponse;

  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const login = await loginMutation();

  res.status(200).json(login);
}
