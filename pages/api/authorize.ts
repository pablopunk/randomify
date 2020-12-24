import { NextApiRequest, NextApiResponse } from "next";
import { api } from 'lib/spotify'

export default async function Authorize(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  if (!code) {
    res.status(403).send("403")
  }

  const data = await api.authorizationCodeGrant(code)

  api.setAccessToken(data.body['access_token']);
  api.setRefreshToken(data.body['refresh_token']);

  const exampleUrl = '/api/random?from=0vvXsWCC9xrXsKd4FyS8kM&to=5lQGOyqFXzCOVisAKDdiDr'

  res.status(200).send(`
<p>Success!</p>
<p>
 Now you are logged in, you can go ahead and use this tool. Example: <a href="${exampleUrl}">${exampleUrl}</a>
</p>
  `)
}