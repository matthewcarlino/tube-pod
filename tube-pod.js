#!/usr/bin/env node

const ytdl = require('ytdl-core');
const fs = require('fs');
const { getBasicInfo } = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=WZsY5yYGbt8'; //put a url in here.. hardcoded for now is fine.

//async function that gathers metadata for a video 
const getInfo = async (url) => {
    const response = await ytdl.getBasicInfo(url);
    const info = response.videoDetails.title;
    console.log(info);
};

const getStream = async (url) => {
    return new Promise((resolve, reject) => {
        const inStream = ytdl(url, {
            quality: 'highest',
            filter: 'audioonly',
        })
        const outStream = fs.createWriteStream('sunday.mp3')
        inStream.pipe(outStream);
    })
};


const main = async (url) => {
    const info = await getInfo(url);
    const inStream = await getStream(url);
};

main(url);




