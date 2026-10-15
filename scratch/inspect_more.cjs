const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

function inspectSnippet(keyword, length = 2000) {
  const idx = html.indexOf(keyword);
  if (idx === -1) {
    console.log(`Keyword "${keyword}" NOT found.`);
    return;
  }
  const chunk = html.substring(idx, idx + length);
  const text = chunk.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, '\n')
                    .split('\n')
                    .map(s => s.trim())
                    .filter(s => s.length > 0)
                    .join('\n');
  console.log(`\n=== SNIPPET: ${keyword} ===`);
  console.log(text.substring(0, length));
}

inspectSnippet('Your Business Growth', 2500);
inspectSnippet('Trusted by Businesses', 3500);
