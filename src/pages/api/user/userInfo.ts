// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from "src/models/user";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // Process a POST request
    const { username, password, email } = req.body;
    if(!username || !password || !email) {
      res.status(400).json({ code: 400, message: 'Bad Request' })
    }
    await UserModel.register(username, password, email)
    res.status(200).json({ code: 200, message: 'ok' })
  } else {
    // Handle any other HTTP method
    res.status(400).json({ code: 400, message: 'Bad Request' })
  }
}
