// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from "src/models/user";
import * as console from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // Process a POST request
    const { username, password, email } = req.body;
    // 验证邮箱格式
    const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    // 用户名格式 4-16位数字、字母、下划线 不能为空
    const usernameReg = /^[a-zA-Z0-9_]{4,16}$/;
    // 密码格式
    const passwordReg = /^[a-zA-Z0-9_-]{6,18}$/;

    if(!usernameReg.test(username) || !passwordReg.test(password) || !emailReg.test(email)) {
      res.status(400).json({ code: 400, message: 'Bad Request' })
    } else {
      console.log('username', username)
      try {
        await UserModel.register(username, password, email)
        res.status(200).json({ code: 200, message: 'ok' })
      } catch (e) {
        console.log('e', e)
        res.status(400).json({ code: 400, message: 'Bad Request' })
      }
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ code: 400, message: 'Bad Request' })
  }
}
