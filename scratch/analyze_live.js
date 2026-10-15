const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

// Strip tags except headings and key blocks
const cheerio = null; // Use regex or simple parser

// Find all elements with class containing 'section' or specific containers
const blocks = [];
const regex = /<!--\s*([^-]+)\s*-->/g;
let m;
while ((m = regex.exec(html)) !== null) {
  if (m[1].toLowerCase().includes('section') || m[1].toLowerCase().includes('start') || m[1].toLowerCase().includes('end')) {
    console.log('Comment marker:', m[1].trim());
  }
}
