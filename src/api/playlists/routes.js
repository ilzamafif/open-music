const routes = (handler) => [{
  method: 'POST',
  path: '/playlists',
  handler: handler.postPlaylistHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists',
  handler: handler.getPlaylistsHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists/{id}',
  handler: handler.getPlaylistByIdHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},
{
  method: 'DELETE',
  path: '/playlists/{id}',
  handler: handler.deletePlaylistByIdHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},

{
  method: 'POST',
  path: '/playlists/{playlistId}/songs',
  handler: handler.postPlaylistSongHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists/{playlistId}/songs',
  handler: handler.getPlaylistSongsHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},
{
  method: 'DELETE',
  path: '/playlists/{playlistId}/songs',
  handler: handler.deletePlaylistSongByIdHandler,
  options: {
    auth: 'songsapp_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists/{id}/activities',
  handler: handler.getPlaylistActivitiesHandler,
  options: {
    auth: 'songsapp_jwt',
  }
},
];

module.exports = routes;