#!/usr/bin/env node

const ytdl = require('ytdl-core');
const fs = require('fs');
const { getBasicInfo } = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=WZsY5yYGbt8'; //put a url in here.. hardcoded for now is fine.

const outStream = fs.createWriteStream('sunday.mp3');
const inStream = ytdl(url, { quality: 'highest', filter: 'audioonly'});

inStream.pipe(outStream);

outStream.on('close', () => {
    console.info('Done');
});


//async function that gathers metadata for a video 
async function videoInfo() {
        const result = await ytdl.getInfo(url); 
        console.log(result)
}

videoInfo();

// console.info('ytdl info', info);


