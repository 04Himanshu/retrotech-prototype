const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

// Find all review text
const reviewRegex = /class=\"testimonial-card[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
// Or match Review comments: <!-- Review 1 - ... -->
const revCommRegex = /<!--\s*(Review\s*\d+[^>]*?)\s*-->([\s\S]*?)(?=<!--\s*Review|\Z)/gi;
let m;
while ((m = revCommRegex.exec(html)) !== null) {
  const title = m[1].trim();
  const text = m[2].replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(Boolean).join(' | ');
  console.log(`[${title}]: ${text}`);
}
