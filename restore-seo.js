const fs = require('fs');
const path = require('path');

const filesToRestore = [
  {
    path: 'index.html',
    replacements: [
      { from: 'LAUNCHING JULY 12 | Innoveloper | High-Velocity Software Engineering', to: 'Mobile App Development Company in Ahmedabad | Innoveloper' },
      { from: 'Innoveloper — Official Launch July 12, 2026', to: 'Innoveloper | Mobile App & Website Development in Ahmedabad' },
      { from: 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.', to: 'We build Android apps, Flutter apps, and websites for startups and enterprises. Based in Ahmedabad, serving clients worldwide.' },
      { from: 'The new home for high-velocity software engineering drops on July 12, 2026. Zero bloated dev cycles. Pure engineering speed. Follow our live countdown.', to: 'Innoveloper is a mobile app development company in Ahmedabad. We build Android apps, Flutter apps, and websites for startups and enterprises across India. Call +91 9510564953.' }
    ]
  },
  {
    path: 'about.html',
    replacements: [
      { from: 'LAUNCHING JULY 12 | About Us | IT Company in Ahmedabad | Innoveloper', to: 'About Us | IT Company in Ahmedabad, Gujarat | Innoveloper' },
      { from: 'Innoveloper — Official Launch July 12, 2026', to: 'About Us | IT Company in Ahmedabad, Gujarat | Innoveloper' },
      { from: 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.', to: 'Learn about Innoveloper — a digital software agency in Ahmedabad, India, with 120% YoY growth, building cutting-edge mobile apps and websites.' },
      { from: 'The new home for high-velocity software engineering drops on July 12, 2026. Zero bloated dev cycles. Pure engineering speed. Follow our live countdown.', to: 'Learn about Innoveloper — a digital software agency in Ahmedabad, India, with 120% YoY growth, building cutting-edge mobile apps and websites.' }
    ]
  },
  {
    path: 'services.html',
    replacements: [
      { from: 'LAUNCHING JULY 12 | Services | Mobile App, Flutter & Web Development | Innoveloper', to: 'Mobile App, Flutter & Web Development Services in Ahmedabad | Innoveloper' },
      { from: 'Innoveloper — Official Launch July 12, 2026', to: 'Innoveloper | Mobile App & Website Development in Ahmedabad' },
      { from: 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.', to: 'Innoveloper offers mobile app development (Android, Flutter), website development, cloud infrastructure on AWS, API development, and graphic design services in India.' },
      { from: 'The new home for high-velocity software engineering drops on July 12, 2026. Zero bloated dev cycles. Pure engineering speed. Follow our live countdown.', to: 'Innoveloper offers mobile app development (Android, Flutter), website development, cloud infrastructure on AWS, API development, and graphic design services in India.' }
    ]
  },
  {
    path: 'case_studies.html',
    replacements: [
      { from: 'LAUNCHING JULY 12 | Case Studies | RaktaCare, Copiet & More | Innoveloper', to: 'Case Studies – RaktaCare, Copiet & More | Innoveloper' },
      { from: 'Innoveloper — Official Launch July 12, 2026', to: 'Case Studies – RaktaCare, Copiet & More | Innoveloper' },
      { from: 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.', to: 'See how Innoveloper built RaktaCare (blood donation app), Sonik Mobility EV app, Copiet(Printing Shop Management), and more. Real projects, real results.' },
      { from: 'The new home for high-velocity software engineering drops on July 12, 2026. Zero bloated dev cycles. Pure engineering speed. Follow our live countdown.', to: 'See how Innoveloper built RaktaCare (blood donation app), Sonik Mobility EV app, Copiet(Printing Shop Management), and more. Real projects, real results.' }
    ]
  },
  {
    path: 'contact_us.html',
    replacements: [
      { from: 'LAUNCHING JULY 12 | Contact Us | App Development Company | Innoveloper', to: 'Contact Innoveloper | App Development Company Ahmedabad | +91 9510564953' },
      { from: 'Innoveloper — Official Launch July 12, 2026', to: 'Contact Innoveloper | App Development Company Ahmedabad | +91 9510564953' },
      { from: 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.', to: 'Contact Innoveloper Solutions in Ahmedabad. Let\'s discuss your mobile app or website project. Call +91 9510564953 or email contact@innoveloper.com.' },
      { from: 'The new home for high-velocity software engineering drops on July 12, 2026. Zero bloated dev cycles. Pure engineering speed. Follow our live countdown.', to: 'Contact Innoveloper Solutions in Ahmedabad. Let\'s discuss your mobile app or website project. Call +91 9510564953 or email contact@innoveloper.com.' }
    ]
  }
];

filesToRestore.forEach(item => {
  const filePath = path.join(__dirname, item.path);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${item.path}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  item.replacements.forEach(rep => {
    content = content.replace(new RegExp(rep.from.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), rep.to);
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully restored SEO tags for: ${item.path}`);
});
console.log('All SEO tags successfully reverted to permanent live website versions!');
