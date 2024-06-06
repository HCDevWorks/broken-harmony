const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const ffmpegPath = require('ffmpeg-static');
const { spawn } = require('child_process');

const credentials = require('../credentials.json');

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const TOKEN_PATH = 'token.json';

fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) return getAccessToken(oAuth2Client);
  oAuth2Client.setCredentials(JSON.parse(token));
  startLiveStreaming(oAuth2Client);
});

async function startLiveStreaming(auth) {
  const youtube = google.youtube({ version: 'v3', auth });

  try {
    const broadcastResponse = await youtube.liveBroadcasts.insert({
      part: 'snippet,status,contentDetails',
      requestBody: {
        snippet: {
          title: 'Live Stream Title',
          description: 'Live Stream Description',
          scheduledStartTime: new Date(Date.now() - 10000).toISOString() // VERIFICAR SE É NECESSÁRIO DEIXAR ISSO AQUIÇ.
        },
        status: {
          privacyStatus: 'public',
          lifeCycleStatus: 'live'
        },
        contentDetails: {
          monitorStream: {
            enableMonitorStream: false
          }
        }
      }
    });

    const broadcast = broadcastResponse.data;
    const broadcastId = broadcast.id;
    console.log('Broadcast ID:', broadcastId);

    const liveLink = `https://www.youtube.com/watch?v=${broadcast.id}`;
    console.log('Live Link:', liveLink);

    const streamResponse = await youtube.liveStreams.insert({
      part: 'snippet,cdn',
      requestBody: {
        snippet: {
          title: 'Live Stream Title'
        },
        cdn: {
          frameRate: '60fps',
          ingestionType: 'rtmp',
          resolution: '1080p'
        }
      }
    });

    const stream = streamResponse.data;
    const streamId = stream.id;
    const streamKey = stream.cdn.ingestionInfo.streamName;
    const ingestionAddress = stream.cdn.ingestionInfo.ingestionAddress;

    console.log('Stream ID:', streamId);
    console.log('Stream Key:', streamKey);
    console.log('Ingestion Address:', ingestionAddress);

    // Bind the broadcast to the stream
    await youtube.liveBroadcasts.bind({
      part: 'id,contentDetails',
      id: broadcastId,
      streamId: streamId
    });

    console.log('Broadcast is bound to stream.');

    const inputFile = 'samples/fortnite_1080p.mp4';
    // FFMPEG PROCESS CODE

  } catch (error) {
    console.error('Error creating live broadcast:', error);
  }
}

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.force-ssl'
    ],
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      startLiveStreaming(oAuth2Client);
    });
  });
}