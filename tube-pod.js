#!/usr/bin/env node

const ytdl = require('ytdl-core');
const fs = require('fs');

const url = 'https://www.youtube.com/watch?v=WZsY5yYGbt8'; //put a url in here.. hardcoded for now is fine.

const outStream = fs.createWriteStream('sunday.mp3');
const inStream = ytdl(url, { quality: 'highest', filter: 'audioonly'});

inStream.pipe(outStream);

outStream.on('close', () => {
    console.info('Done');
});

//const info = await ytdl.getInfo(url);
//console.info('ytdl info', info);