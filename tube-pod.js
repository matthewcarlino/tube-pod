#!/usr/bin/env node

import ytdl from 'ytdl-core'

const url = '' //put a url in here.. hardcoded for now is fine.

let info = await ytdl.getInfo('https://www.youtube.com/watch?v=WZsY5yYGbt8');


console.info('ytdl info', info);
