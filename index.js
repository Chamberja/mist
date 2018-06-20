'use strict';

const Hapi = require('hapi');
const Wreck = require('wreck');

const server = Hapi.server({
    port: 2000,
    host: 'localhost'
});

const getSteamId = async function(vanityUrl) {
  const { response, payload } = await Wreck.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=A6B6CB981C0EE5461CFA653A50CC1230&vanityurl=${vanityUrl}`);
  return payload.toString();
};

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    try {
      getSteamId('Chamberja');
    }
    catch (ex) {
      console.log('not getting hit');
    }
    return 'ur gay pwnd';
  }
});

server.route({
  method: 'GET',
  path: '/players/steamid/{vanityUrl}',
  handler: (request, h) => {
    return getSteamId(encodeURIComponent(request.params.vanityUrl));
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
