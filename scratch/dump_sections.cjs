const fs = require('fs');
const html = fs.readFileSync('live_homepage.html', 'utf8');

// Function to extract text between markers or print sections
function printSection(title, startStr, endStr) {
  const start = html.indexOf(startStr);
  if (start === -1) {
    console.log(`=== ${title} NOT FOUND ===`);
    return;
  }
  const end = endStr ? html.indexOf(endStr, start) : start + 3000;
  const chunk = html.substring(start, end !== -1 ? end : start + 3000);
  const text = chunk.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, '\n')
                    .split('\n')
                    .map(s => s.trim())
                    .filter(s => s.length > 0)
                    .join('\n');
  console.log(`\n================== ${title} ==================`);
  console.log(text.substring(0, 2000));
}

printSection('1. HERO', '<div class="banner', '<!-- Partner Logos');
printSection('2. PARTNERS', '<!-- Partner Logos', '<!-- LEFT SECTION');
printSection('3. ABOUT', 'Smart IT, AI and Marketing Solutions', 'Your Business Growth');
printSection('4. SERVICES', 'Your Business Growth Through with IT Solutions', 'Industries We Serve');
printSection('5. INDUSTRIES', 'Industries We Serve', 'Trusted by Businesses');
printSection('6. TESTIMONIALS', 'Trusted by Businesses, Empowered by Results', "Let's Build Your Next Digital Success Story");
printSection('7. CTA BANNER', "Let's Build Your Next Digital Success Story", 'Top Six Reasons to');
printSection('8. TOP SIX REASONS (WHY US)', 'Top Six Reasons to', 'Frequently Asked Questions');
printSection('9. FAQS', 'Frequently Asked Questions', 'Check Out Latest News Update');
printSection('10. BLOG', 'Check Out Latest News Update', '<!-- Left: Address & Info');
printSection('11. CONTACT', '<!-- Left: Address & Info', '<footer');
printSection('12. FOOTER', '<footer', '</body>');
