import {
  getPlaylistTracks,
  addTracksToPlaylist,
  getUserPlaylists,
} from 'lib/spotify'

const username = process.env.SPOTIFY_USER

export default async function Random(req, res) {
  const { from, to } = req.query
  if (!from || !to) {
    return res
      .status(400)
      .send("Parameters 'from' and 'to' were not found in query")
  }

  const userPlaylists = await getUserPlaylists(username)
  const toPlaylist = userPlaylists.find(({ id }) => id === to)

  if (!toPlaylist) {
    return res
      .status(400)
      .send(`Playlist '${to}' not found for user '${username}'`)
  }

  let playlistTracks = await getPlaylistTracks(from)

  if (!playlistTracks) {
    return res.status(400).send(`No tracks found for playlist '${from}'`)
  }

  const randomTrack =
    playlistTracks[(Math.random() * playlistTracks.length) >> 0].track

  await addTracksToPlaylist([randomTrack.uri], to, 0)

  res.send(
    `Added '${randomTrack.name}' by '${randomTrack.artists
      .map((a) => a.name)
      .join(', ')}'`
  )
}
