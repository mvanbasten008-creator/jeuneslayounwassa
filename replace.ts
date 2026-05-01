import * as fs from 'fs';
let data = fs.readFileSync('league.html', 'utf8');
data = data.replace(/<div class="am-team-logo"><img src="[^"]+" alt="[^"]+"><\/div>/g, '<div class="team-logo-placeholder"><i data-lucide="shield"></i></div>');
fs.writeFileSync('league.html', data);
