// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import UserModel from "src/models/user";
import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "src/config/session";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // Process a POST request
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email})
    if (!user) {
      res.status(401).json({code: 401, message: 'Unauthorized'})
    } else {
      const isPasswordValid = user.password === password
      if (!isPasswordValid) {
        // 密码错误
        res.status(401).json({code: 401, message: 'Unauthorized'})
      }
      req.session.user = user
      await req.session.save()
      res.status(200).json({code: 200, message: 'ok'})
    }
  } else {
    // 方法不存在
    res.status(405).json({code: 405, message: 'Method Not Allowed'})
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
