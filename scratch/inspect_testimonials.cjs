const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

const idx = html.indexOf('Customer experiences that speak for themselves');
if (idx !== -1) {
  const chunk = html.substring(idx, idx + 4000);
  const text = chunk.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, '\n')
                    .split('\n')
                    .map(s => s.trim())
                    .filter(s => s.length > 0)
                    .join('\n');
  console.log(text);
}
