#!/usr/bin/env node
/**
 * Add releaseDate to each episode in COMIC_EPISODES_DATA.json
 * Episode N releases on Thursday N (startDate + (N-1) * 7 days)
 */

const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../docs/COMIC_EPISODES_DATA.json');
const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
const start = new Date(data.seriesInfo.startDate);

data.episodes.forEach((ep, i) => {
  const d = new Date(start);
  d.setDate(start.getDate() + (ep.number - 1) * 7);
  ep.releaseDate = d.toISOString().slice(0, 10);
});

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('✅ Added releaseDate to all', data.episodes.length, 'episodes');
