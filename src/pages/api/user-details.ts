import type { NextApiRequest, NextApiResponse } from 'next';

export type UserDetailsResponse = {
  name: string;
  email: string;
  id: string;
};

const userDetailsMutation = async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'foowie booie',
        email: 'foo@boo.com',
        id: Math.random().toString(),
      });
    }
    , 1000);
  }) as UserDetailsResponse;

  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDetailsResponse>
) {
  const userDetails = await userDetailsMutation();

  res.status(200).json(userDetails);
}
  

