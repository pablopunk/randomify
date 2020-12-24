import { api } from "lib/spotify";
import { NextApiResponse } from "next";

export default async function Index(_, res: NextApiResponse) {
  const url = api.createAuthorizeURL(['user-read-private', 'user-read-email', 'playlist-modify-public'])
  res.redirect(url)
}