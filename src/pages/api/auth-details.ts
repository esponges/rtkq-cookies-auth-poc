import type { NextApiRequest, NextApiResponse } from 'next';
import { loginMutation, type LoginResponse } from "./login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const login = await loginMutation();

  res.status(200).json(login);
}
