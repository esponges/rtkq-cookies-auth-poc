import type { NextApiRequest, NextApiResponse } from 'next';

export type LoginResponse = {
  token: string;
  refreshToken: string;
  userEmail: string;
  userName: string;
};

// generate a time stamp for the token
const generateTimeStamp = (offset?: number) => {
  const now = new Date();
  const newDate = new Date(now.getTime() + (offset ?? 5 * 60 * 1000));
  // to ISO string
  const iso = newDate.toISOString();

  return iso;
}

// receives ISO and increase it by offset - returns ISO
const increaseTimeStamp = (timeStamp: string, offset?: number) => {
  const date = new Date(timeStamp);
  const newDate = new Date(date.getTime() + (offset ?? 1 * 1000));
  // to ISO string
  const iso = newDate.toISOString();

  return iso;
}

// set a resolved promise that gets a new token and refreshToken
const loginMutation = async () => {
  const token = generateTimeStamp();
  // refresh token should be 5 more days
  const refreshToken = increaseTimeStamp(token, 5 * 24 * 60 * 60 * 1000);

  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token,
        refreshToken,
        userEmail: 'foo@boo.com',
        userName: 'foowie booie',
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
