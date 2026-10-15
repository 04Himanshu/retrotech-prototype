const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

// Print all comments
const commentRegex = /<!--\s*([\s\S]*?)\s*-->/g;
let m;
const comments = [];
while ((m = commentRegex.exec(html)) !== null) {
  const c = m[1].trim();
  if (c && !c.startsWith('[if') && c.length < 100) {
    comments.push(c);
  }
}
console.log('=== COMMENTS / SECTIONS ===');
console.log(comments.join('\n'));

// Find all H2s and their following content
console.log('\n=== H2 SECTIONS & HIGHLIGHTS ===');
const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
let h2Match;
while ((h2Match = h2Regex.exec(html)) !== null) {
  const text = h2Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('-> ' + text);
}
