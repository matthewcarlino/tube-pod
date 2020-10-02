#!/usr/bin/env node

import ytdl from 'ytdl-core';
import fs from 'fs';

const url = 'https://www.youtube.com/watch?v=WZsY5yYGbt8'; //put a url in here.. hardcoded for now is fine.

const outStream = fs.createWriteStream('sunday.wav');
const inStream = await ytdl(url, {filter: 'audioonly'});

inStream.pipe(outStream);

outStream.on('close', () => {
    console.info('Done');
});

//const info = await ytdl.getInfo(url);
//console.info('ytdl info', info);
