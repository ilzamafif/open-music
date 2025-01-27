const PlaylistsHandler = require('./handler');
const routes = require('./routes');
const PlaylistsService = require('../../services/postgres/PlaylistsService');
const PlaylistsValidator = require('../../validator/playlists');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { service = new PlaylistsService(), validator = PlaylistsValidator }) => {
    const playlistsHandler = new PlaylistsHandler(service, validator);
    server.route(routes(playlistsHandler));
  },
};