import * as fs from 'fs';

let html = fs.readFileSync('league.html', 'utf8');

const icons: Record<string, string> = {
  'شباب العيون وسى': '🛡️',
  'تامونت اسمن': '⚔️',
  'اشبال انونعدو': '⭐',
  'شباب وارزميمن': '👑',
  'ج.ر. ازغار وجان': '🦅',
  'نجم ميرا': '🔥',
  'تيدوكلا اكال ملولن': '⚡',
  'اتحاد اوشان وجان': '⚽'
};

const regex = /<div class="am-team([^"]*)">\s*<div class="team-logo-placeholder"><i data-lucide="shield"><\/i><\/div>\s*<span class="am-team-name">([^<]+)<\/span>/g;

let newData = html.replace(regex, (match, classes, teamName) => {
  const icon = icons[teamName.trim()] || '🛡️';
  return `<div class="am-team${classes}">
                        <div class="team-logo-placeholder"><span style="font-size: 20px; line-height: 1; display: flex; justify-content: center; align-items: center;">${icon}</span></div>
                        <span class="am-team-name">${teamName}</span>`;
});

fs.writeFileSync('league.html', newData);
