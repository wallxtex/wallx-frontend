const fs = require('fs');
const file = 'src/dashboard/admin/ui/AdminDealerDetails.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<button([^>]*?)>/g, (match, p1) => {
  if (p1.includes('type=')) return match;
  return '<button type=\"button\"' + p1 + '>';
});

fs.writeFileSync(file, content);
