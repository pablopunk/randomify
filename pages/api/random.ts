import { api } from "lib/spotify";

const username = process.env.SPOTIFY_USER

export default async function Random(req, res) {
  const { from, to } = req.query
  if (!from || !to) {
    return res.status(400).send("Parameters 'from' and 'to' were not found in query")
  }

  const userPlaylists = (await api.getUserPlaylists(username)).body.items
  const toPlaylist = userPlaylists.find(({ id }) => id === to)

  if (!toPlaylist) {
    return res.status(400).send(`Playlist '${to}' not found for user '${username}'`)
  }

  let playlistTracks = await api.getPlaylistTracks(from)

  if (!playlistTracks?.body) {
    return res.status(400).send(`No tracks found for playlist '${from}'`)
  }

  playlistTracks = playlistTracks.body.items

  const randomTrack = playlistTracks[Math.random() * playlistTracks.length >> 0].track

  await api.addTracksToPlaylist(to, [randomTrack.uri], { position: 0 })

  res.send(`Added '${randomTrack.name}' by '${randomTrack.artists.map(a => a.name).join(', ')}'`)
}