const fs = require('fs');

const matches = [
    {
        round: 'الجولة الأولى – الأحد 10 ماي 2026',
        games: [
            ['تامونت اسمن', '⚔️', 'اشبال انونعدو', '🔰', '14:00'],
            ['شباب وارزميمن', '👑', 'ج.ر. ازغار وجان', '🦅', '15:00'],
            ['نجم ميرا', '⚡', 'تيدوكلا اكال ملولن', '🔥', '16:00'],
            ['اتحاد اوشان وجان', '🛑', 'شباب العيون وسى', '🛡️', '17:00']
        ]
    },
    {
        round: 'الجولة الثانية – الأحد 17 ماي 2026',
        games: [
            ['نجم ميرا', '⚡', 'شباب العيون وسى', '🛡️', '14:00'],
            ['اتحاد اوشان وجان', '🛑', 'تيدوكلا اكال ملولن', '🔥', '15:00'],
            ['ج.ر. ازغار وجان', '🦅', 'اشبال انونعدو', '🔰', '16:00'],
            ['شباب وارزميمن', '👑', 'تامونت اسمن', '⚔️', '17:00']
        ]
    },
    {
        round: 'الجولة الثالثة – الأحد 24 ماي 2026',
        games: [
            ['شباب العيون وسى', '🛡️', 'تيدوكلا اكال ملولن', '🔥', '14:00'],
            ['شباب وارزميمن', '👑', 'اشبال انونعدو', '🔰', '15:00'],
            ['نجم ميرا', '⚡', 'اتحاد اوشان وجان', '🛑', '16:00'],
            ['ج.ر. ازغار وجان', '🦅', 'تامونت اسمن', '⚔️', '17:00']
        ]
    },
    {
        round: 'الجولة الأخيرة',
        games: [
            ['الرتبة الثانية المجموعة A', '🛡️', 'الرتبة الثانية المجموعة B', '🛡️', '14:00'],
            ['الرتبة الأولى المجموعة A', '🛡️', 'الرتبة الأولى المجموعة B', '🛡️', '15:00']
        ]
    }
];

function getLogoHtml(icon) {
    return `<span style="font-size: 20px; line-height: 1; display: flex; justify-content: center; align-items: center;">${icon}</span>`;
}

let sectionHtml = `        <!-- 4. المباريات -->
        <section class="section matches-section max-width pt-0" id="matches-section">
            <div class="matches-header">
                <p class="matches-subtitle">NEXT MATCHES</p>
                <h2 class="matches-title">مباريات الجولة الأولى</h2>
                <p class="matches-date">الأحد 10 ماي 2026</p>
            </div>

            <!-- Part 1 Carousel -->
            <div class="matches-carousel-wrapper">
                <div class="matches-carousel" id="matchesCarousel" dir="ltr">\n`;

const firstRound = matches[0].games;
firstRound.forEach((game, idx) => {
    const active = idx === 0 ? ' active' : '';
    sectionHtml += `                    <div class="match-card${active}">
                        <div class="match-card-inner">
                            <span class="next-match-badge">NEXT MATCH</span>
                            <div class="match-teams-row">
                                <div class="match-team">
                                    <div class="team-logo-placeholder">${getLogoHtml(game[1])}</div>
                                </div>
                                <div class="match-vs-text">${game[4]}</div>
                                <div class="match-team">
                                    <div class="team-logo-placeholder">${getLogoHtml(game[3])}</div>
                                </div>
                            </div>
                            <div class="match-names-row">
                                <span class="team-name">${game[0]}</span>
                                <span class="team-name">${game[2]}</span>
                            </div>
                            <div class="match-card-divider"></div>
                            <div class="match-bottom-row">
                                <div><i data-lucide="map-pin"></i> ملعب وجان</div>
                                <div><i data-lucide="calendar"></i> 10 ماي</div>
                            </div>
                        </div>
                    </div>\n`;
});

sectionHtml += `                </div>
                <div class="matches-navigation" dir="ltr">
                    <button class="match-nav-btn" id="matchBtnPrev" aria-label="Previous">
                        <i data-lucide="chevron-left"></i>
                    </button>
                    <div class="match-dots">\n`;

firstRound.forEach((_, idx) => {
    const active = idx === 0 ? ' active' : '';
    sectionHtml += `                        <div class="match-dot${active}"></div>\n`;
});

sectionHtml += `                    </div>
                    <button class="match-nav-btn" id="matchBtnNext" aria-label="Next">
                        <i data-lucide="chevron-right"></i>
                    </button>
                </div>
            </div>

            <div class="all-matches-list">\n`;

matches.forEach(round => {
    if (round.round === 'الجولة الأخيرة') {
        sectionHtml += `                <!-- ${round.round} -->\n`;
    } else {
        sectionHtml += `                <!-- ${round.round.split(' –')[0]} -->\n`;
    }
    sectionHtml += `                <div class="match-round-title">${round.round}</div>\n`;
    
    round.games.forEach(game => {
        sectionHtml += `                <div class="all-match-row">
                    <div class="am-team">
                        <div class="team-logo-placeholder">${getLogoHtml(game[1])}</div>
                        <span class="am-team-name">${game[0]}</span>
                    </div>
                    <div class="am-center">
                        <span class="am-time">${game[4]}</span>
                        <span class="am-vs">VS</span>
                    </div>
                    <div class="am-team am-team-right">
                        <div class="team-logo-placeholder">${getLogoHtml(game[3])}</div>
                        <span class="am-team-name">${game[2]}</span>
                    </div>
                </div>\n`;
    });
});

sectionHtml += `            </div>
        </section>`;

let lines = fs.readFileSync('league.html', 'utf8').split('\n');
const insertIndex = lines.findIndex(l => l.includes('<!-- 5. التحديثات -->'));
if (insertIndex > -1) {
    lines.splice(insertIndex, 0, sectionHtml);
    fs.writeFileSync('league.html', lines.join('\n'));
    console.log('Inserted matches section before updates section.');
} else {
    console.log('Could not find updates section.');
}
