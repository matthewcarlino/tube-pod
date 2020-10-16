#!/usr/bin/env node

const ytdl = require('ytdl-core');
const fs = require('fs');
const { getBasicInfo } = require('ytdl-core');
const Parser = require('rss-parser');

// RSS Feed
(async function main() {

    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL("https://youtube.com/feeds/videos.xml?channel_id=UCHDqiYO40Ey_N53Nd97sYLA"); 

    let items = [];

    // Clean up the string and replace reserved characters
    const fileName = `${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

    if (fs.existsSync(fileName)) {
        items = require(`./${fileName}`);
    }

    // Add the items to the items array
    await Promise.all(feed.items.map(async (currentItem) => {

        // Add a new item if it doesn't already exist
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
        }

    }));

    // Save the file
    fs.writeFileSync(fileName, JSON.stringify(items));

})().catch( e => {console.error(e) });

function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // if values of same property are not equal, objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // if we made it this far, objects are considered equivalent
    return true;
}


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




