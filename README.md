 ![logo](https://github.com/pablopunk/art/raw/master/randomify/spotify.png)

# randomify

> Add random tracks from a playlist to another one


## Why?

I use this to add randomize one of my playlists because when you ask Google Home to wake you up with a playlist it always starts with the first song, so I use *randomify* to put a random song on top every day.

## Usage

Create an `.env` file with your credentials (see `.env.sample`).

Start the server:

```
npm start
```

Each time you open the server you will have to visit manually the url `localhost:3000` to set the spotify credentials.

### Add a random song from one playlist to another one

```
GET /api/random?from=<playlist_id>&to=<playlist_id>
```

Example `http://localhost:3000/api/random?from=0vvXsWCC9xrXsKd4FyS8kM&to=5lQGOyqFXzCOVisAKDdiDr`

> `from` can be any public playlist but you have to have access to the playlist `to`
