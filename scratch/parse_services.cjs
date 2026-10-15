const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

const sIdx = html.indexOf('Your Business Growth Through');
const eIdx = html.indexOf('Industries We Serve');
if (sIdx !== -1 && eIdx !== -1) {
  const chunk = html.substring(sIdx, eIdx);
  const text = chunk.replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(Boolean).join('\n');
  console.log(text);
}
