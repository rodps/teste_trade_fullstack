/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { jwt } from '../libs/jwt'
import { prisma } from '../libs/prisma'

const oauthGithubService = async (code: string): Promise<any> => {
  const token = await exchangeCodeForGithubAccessToken(code)
  const githubUser = await getGithubUserInfo(token)
  const githubId = githubUser.id.toString()

  const userToUpsert = {
    githubId,
    name: githubUser.name,
    email: githubUser.email,
    password: ''
  }

  const user = await prisma.user.upsert({
    where: {
      githubId
    },
    create: userToUpsert,
    update: userToUpsert
  })

  const jwtToken = await jwt.sign({
    email: user.email,
    id: user.id
  })

  return jwtToken
}

export { oauthGithubService }

const exchangeCodeForGithubAccessToken = async (
  code: string
): Promise<string> => {
  const data = await axios
    .post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((res: any) => res.data)
  const accessToken = data.access_token
  return accessToken
}

const getGithubUserInfo = async (accessToken: string): Promise<any> => {
  const data = await axios
    .get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })
    .then((res: any) => res.data)

  return data
}
