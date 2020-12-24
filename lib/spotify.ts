import SpotifyApi from 'spotify-web-api-node'
import loadJsonFile from 'load-json-file'

export const api = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
})

async function tryToAuthorizeApiFromFile() {
  try {
    const auth = loadJsonFile.sync('auth.json') as { code: string }
    const data = await api.authorizationCodeGrant(auth.code)
    api.setAccessToken(data.body['access_token'])
    api.setRefreshToken(data.body['refresh_token'])
  } catch (err) {
    console.log(err)
    console.log('Auth not found. Visit http://localhost:3000/')
  }
}

export async function getUserPlaylists(username) {
  await tryToAuthorizeApiFromFile()

  return (await api.getUserPlaylists(username)).body.items
}

export async function getPlaylistTracks(playlistId) {
  await tryToAuthorizeApiFromFile()

  return (await api.getPlaylistTracks(playlistId)).body?.items || null
}

export async function addTracksToPlaylist(tracks, playlistId, position) {
  await tryToAuthorizeApiFromFile()

  return api.addTracksToPlaylist(playlistId, tracks, { position })
}
