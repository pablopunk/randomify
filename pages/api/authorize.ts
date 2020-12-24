import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'lib/spotify'
import writeJsonFile from 'write-json-file'

export default async function Authorize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query

  if (!code) {
    res.status(403).send('403')
  }

  writeJsonFile('auth.json', { code })

  const exampleUrl =
    '/api/random?from=0vvXsWCC9xrXsKd4FyS8kM&to=5lQGOyqFXzCOVisAKDdiDr'

  res.status(200).send(`
<p>Success!</p>
<p>
 Now you are logged in, you can go ahead and use this tool. Example: <a href="${exampleUrl}">${exampleUrl}</a>
</p>
  `)
}
