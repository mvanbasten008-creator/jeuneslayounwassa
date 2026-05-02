import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('league.html', 'utf8');
const $ = cheerio.load(html, { recognizeSelfClosing: true, xmlMode: false, decodeEntities: false });

const ICONS: Record<string, string> = {
  'شباب العيون وسى': '🛡️',
  'تامونت اسمن': '⚔️',
  'اشبال انونعدو': '🔰',
  'شباب وارزميمن': '👑',
  'ج.ر. ازغار وجان': '🦅',
  'نجم ميرا': '⚡',
  'تيدوكلا اكال ملولن': '🔥',
  'اتحاد اوشان وجان': '🛑'
};

function getLogoHtml(icon: string) {
    return `<span style="font-size: 20px; line-height: 1; display: flex; justify-content: center; align-items: center;">${icon}</span>`;
}

// 1. الفرق المشاركة
$('.team-rectangle-card').each((_, el) => {
    const teamName = $(el).find('h3').text().trim();
    if (ICONS[teamName]) {
        $(el).find('.team-logo-placeholder').html(getLogoHtml(ICONS[teamName]));
    }
});

// 2. مباريات الجولة الأولى (Carousel)
$('.match-card').each((_, el) => {
    const names = $(el).find('.team-name').map((_, nameEl) => $(nameEl).text().trim()).get();
    const logos = $(el).find('.team-logo-placeholder');
    
    if (names.length === 2 && logos.length === 2) {
        if (ICONS[names[0]]) $(logos[0]).html(getLogoHtml(ICONS[names[0]]));
        if (ICONS[names[1]]) $(logos[1]).html(getLogoHtml(ICONS[names[1]]));
    }
});

// 3. جدول المباريات
$('.all-match-row').each((_, el) => {
    // all-match-row has two .am-team elements
    const teams = $(el).find('.am-team');
    teams.each((_, teamEl) => {
        const teamName = $(teamEl).find('.am-team-name').text().trim();
        // Ignore placeholders like 'الرتبة الثانية المجموعة A'
        if (ICONS[teamName]) {
            $(teamEl).find('.team-logo-placeholder').html(getLogoHtml(ICONS[teamName]));
        } else if (teamName.includes('الرتبة')) {
             $(teamEl).find('.team-logo-placeholder').html(getLogoHtml('🛡️'));
        }
    });
});

fs.writeFileSync('league.html', $.html());
