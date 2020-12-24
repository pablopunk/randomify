import SpotifyApi from 'spotify-web-api-node'

const _api = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})

export const api = _api