/**
 * 個人英文字典 App - Logic
 */

const INITIAL_DATA = [
    {
      "word": "groove",
      "type": "music",
      "phonetic": "/ɡruːv/",
      "definition_zh": "律動感",
      "definition_en": "rhythmic feel",
      "example": "The band has a tight groove.",
      "music_context": "樂手之間的節奏默契",
      "level": "easy",
      "tags": ["jazz"]
    },
    {
      "word": "tempo",
      "type": "music",
      "phonetic": "/ˈtem.poʊ/",
      "definition_zh": "速度",
      "definition_en": "speed of music",
      "example": "Keep the tempo steady.",
      "music_context": "演奏快慢",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "syncopation",
      "type": "music",
      "phonetic": "/ˌsɪŋ.kəˈpeɪ.ʃən/",
      "definition_zh": "切分音",
      "definition_en": "rhythm with off-beat accents",
      "example": "This rhythm uses syncopation.",
      "music_context": "爵士與放克常見節奏",
      "level": "medium"
    },
    {
      "word": "riff",
      "type": "music",
      "phonetic": "/rɪf/",
      "definition_zh": "重複句",
      "definition_en": "short repeated phrase",
      "example": "Catchy riff.",
      "music_context": "常見段落",
      "level": "easy",
      "tags": ["jazz"]
    },
    {
      "word": "improvise",
      "type": "music",
      "phonetic": "/ˈɪmprəvaɪz/",
      "definition_zh": "即興",
      "definition_en": "create music spontaneously",
      "example": "He improvises well.",
      "music_context": "爵士核心",
      "level": "easy",
      "tags": ["jazz"]
    },
    {
      "word": "pitch",
      "type": "music",
      "phonetic": "/pɪtʃ/",
      "definition_zh": "音高",
      "definition_en": "highness or lowness of a note",
      "example": "That note is too high in pitch.",
      "music_context": "音準",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "tone",
      "type": "music",
      "phonetic": "/toʊn/",
      "definition_zh": "音色",
      "definition_en": "sound quality",
      "example": "Your tone is warm.",
      "music_context": "聲音質感",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "dynamics",
      "type": "music",
      "phonetic": "/daɪˈnæmɪks/",
      "definition_zh": "力度變化",
      "definition_en": "volume variation",
      "example": "Use more dynamics.",
      "music_context": "強弱對比",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "rhythm",
      "type": "music",
      "phonetic": "/ˈrɪðəm/",
      "definition_zh": "節奏",
      "definition_en": "pattern of beats",
      "example": "Feel the rhythm.",
      "music_context": "節奏基礎",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "beat",
      "type": "music",
      "phonetic": "/biːt/",
      "definition_zh": "拍子",
      "definition_en": "basic time unit",
      "example": "Stay on the beat.",
      "music_context": "節拍",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "meter",
      "type": "music",
      "phonetic": "/ˈmiːtər/",
      "definition_zh": "拍號",
      "definition_en": "grouping of beats",
      "example": "This song is in 4/4 meter.",
      "music_context": "節拍結構",
      "level": "medium",
      "tags": ["theory"]
    },
    {
      "word": "scale",
      "type": "music",
      "phonetic": "/skeɪl/",
      "definition_zh": "音階",
      "definition_en": "sequence of notes",
      "example": "Practice scales daily.",
      "music_context": "基本功",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "chord",
      "type": "music",
      "phonetic": "/kɔːrd/",
      "definition_zh": "和弦",
      "definition_en": "notes played together",
      "example": "Play a major chord.",
      "music_context": "和聲",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "harmony",
      "type": "music",
      "phonetic": "/ˈhɑːrməni/",
      "definition_zh": "和聲",
      "definition_en": "combination of notes",
      "example": "The harmony sounds rich.",
      "music_context": "和聲設計",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "melody",
      "type": "music",
      "phonetic": "/ˈmelədi/",
      "definition_zh": "旋律",
      "definition_en": "main tune",
      "example": "The melody is catchy.",
      "music_context": "主旋律",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "phrase",
      "type": "music",
      "phonetic": "/freɪz/",
      "definition_zh": "樂句",
      "definition_en": "musical sentence",
      "example": "Repeat the phrase.",
      "music_context": "音樂句子",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "phrasing",
      "type": "music",
      "phonetic": "/ˈfreɪzɪŋ/",
      "definition_zh": "樂句處理",
      "definition_en": "how phrases are played",
      "example": "Nice phrasing.",
      "music_context": "表達方式",
      "level": "medium",
      "tags": ["performance"]
    },
    {
      "word": "articulation",
      "type": "music",
      "phonetic": "/ɑːrˌtɪkjəˈleɪʃən/",
      "definition_zh": "發音法",
      "definition_en": "note execution style",
      "example": "Clear articulation.",
      "music_context": "斷音連音",
      "level": "medium",
      "tags": ["performance"]
    },
    {
      "word": "legato",
      "type": "music",
      "phonetic": "/lɪˈɡɑːtoʊ/",
      "definition_zh": "連音",
      "definition_en": "smooth playing",
      "example": "Play it legato.",
      "music_context": "滑順連接",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "staccato",
      "type": "music",
      "phonetic": "/stəˈkɑːtoʊ/",
      "definition_zh": "斷音",
      "definition_en": "short detached notes",
      "example": "Use staccato.",
      "music_context": "短促音",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "accent",
      "type": "music",
      "phonetic": "/ˈæk.sent/",
      "definition_zh": "重音",
      "definition_en": "emphasized note",
      "example": "Accent the beat.",
      "music_context": "強調拍",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "solo",
      "type": "music",
      "phonetic": "/ˈsoʊloʊ/",
      "definition_zh": "獨奏",
      "definition_en": "play alone",
      "example": "Take a solo.",
      "music_context": "個人表現",
      "level": "easy",
      "tags": ["jazz"]
    },
    {
      "word": "lick",
      "type": "music",
      "phonetic": "/lɪk/",
      "definition_zh": "樂句片段",
      "definition_en": "short practiced phrase",
      "example": "Cool jazz lick.",
      "music_context": "即興素材",
      "level": "easy",
      "tags": ["jazz"]
    },
    {
      "word": "swing",
      "type": "music",
      "phonetic": "/swɪŋ/",
      "definition_zh": "搖擺感",
      "definition_en": "uneven rhythmic feel",
      "example": "It swings hard.",
      "music_context": "爵士律動",
      "level": "medium",
      "tags": ["jazz"]
    },
    {
      "word": "arrangement",
      "type": "music",
      "phonetic": "/əˈreɪndʒmənt/",
      "definition_zh": "編曲",
      "definition_en": "structure of music",
      "example": "Great arrangement.",
      "music_context": "編排",
      "level": "medium",
      "tags": ["arrangement"]
    },
    {
      "word": "orchestration",
      "type": "music",
      "phonetic": "/ˌɔːrkɪˈstreɪʃən/",
      "definition_zh": "配器",
      "definition_en": "instrument distribution",
      "example": "Nice orchestration.",
      "music_context": "樂器配置",
      "level": "hard",
      "tags": ["arrangement"]
    },
    {
      "word": "recording",
      "type": "music",
      "phonetic": "/rɪˈkɔːrdɪŋ/",
      "definition_zh": "錄音",
      "definition_en": "capturing sound",
      "example": "Recording session.",
      "music_context": "錄音室",
      "level": "easy",
      "tags": ["recording"]
    },
    {
      "word": "mixing",
      "type": "music",
      "phonetic": "/ˈmɪksɪŋ/",
      "definition_zh": "混音",
      "definition_en": "balancing tracks",
      "example": "Mix the track.",
      "music_context": "後製",
      "level": "medium",
      "tags": ["mixing"]
    },
    {
      "word": "mastering",
      "type": "music",
      "phonetic": "/ˈmæstərɪŋ/",
      "definition_zh": "母帶處理",
      "definition_en": "final audio polish",
      "example": "Master the song.",
      "music_context": "最終處理",
      "level": "hard",
      "tags": ["mixing"]
    },
    {
      "word": "gain",
      "type": "music",
      "phonetic": "/ɡeɪn/",
      "definition_zh": "增益",
      "definition_en": "input level",
      "example": "Adjust gain.",
      "music_context": "音量控制",
      "level": "easy",
      "tags": ["recording"]
    },
    {
      "word": "volume",
      "type": "music",
      "phonetic": "/ˈvɑːljuːm/",
      "definition_zh": "音量",
      "definition_en": "loudness",
      "example": "Turn down volume.",
      "music_context": "大小聲",
      "level": "easy",
      "tags": ["recording"]
    },
    {
      "word": "feedback",
      "type": "music",
      "phonetic": "/ˈfiːdbæk/",
      "definition_zh": "回授噪音",
      "definition_en": "looping sound noise",
      "example": "Avoid feedback.",
      "music_context": "音響問題",
      "level": "medium",
      "tags": ["live"]
    },
    {
      "word": "monitor",
      "type": "music",
      "phonetic": "/ˈmɑːnɪtər/",
      "definition_zh": "監聽",
      "definition_en": "stage speaker",
      "example": "I need more monitor.",
      "music_context": "舞台聲音",
      "level": "easy",
      "tags": ["live"]
    },
    {
      "word": "soundcheck",
      "type": "music",
      "phonetic": "/ˈsaʊndtʃek/",
      "definition_zh": "試音",
      "definition_en": "pre-show audio test",
      "example": "Soundcheck at 5.",
      "music_context": "演出前準備",
      "level": "easy",
      "tags": ["live"]
    },
    {
      "word": "bridge",
      "type": "music",
      "phonetic": "/brɪdʒ/",
      "definition_zh": "橋段",
      "definition_en": "contrasting section",
      "example": "Play the bridge.",
      "music_context": "歌曲中段變化",
      "level": "easy",
      "tags": ["arrangement"]
    },
    {
      "word": "chorus",
      "type": "music",
      "phonetic": "/ˈkɔːrəs/",
      "definition_zh": "副歌",
      "definition_en": "repeated main section",
      "example": "The chorus is catchy.",
      "music_context": "重複段落",
      "level": "easy",
      "tags": ["arrangement"]
    },
    {
      "word": "verse",
      "type": "music",
      "phonetic": "/vɜːrs/",
      "definition_zh": "主歌",
      "definition_en": "main lyrical section",
      "example": "Start from the verse.",
      "music_context": "歌曲結構",
      "level": "easy",
      "tags": ["arrangement"]
    },
    {
      "word": "hook",
      "type": "music",
      "phonetic": "/hʊk/",
      "definition_zh": "記憶點",
      "definition_en": "catchy part",
      "example": "That hook is strong.",
      "music_context": "吸引人的旋律",
      "level": "easy",
      "tags": ["arrangement"]
    },
    {
      "word": "modulation",
      "type": "music",
      "phonetic": "/ˌmɑːdjəˈleɪʃən/",
      "definition_zh": "轉調",
      "definition_en": "change of key",
      "example": "The song modulates.",
      "music_context": "調性變化",
      "level": "medium",
      "tags": ["theory"]
    },
    {
      "word": "key",
      "type": "music",
      "phonetic": "/kiː/",
      "definition_zh": "調性",
      "definition_en": "tonal center",
      "example": "The key is C major.",
      "music_context": "音樂調",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "mode",
      "type": "music",
      "phonetic": "/moʊd/",
      "definition_zh": "調式",
      "definition_en": "scale variation",
      "example": "Use Dorian mode.",
      "music_context": "爵士常用",
      "level": "medium",
      "tags": ["theory"]
    },
    {
      "word": "interval",
      "type": "music",
      "phonetic": "/ˈɪntərvəl/",
      "definition_zh": "音程",
      "definition_en": "distance between notes",
      "example": "Practice intervals.",
      "music_context": "音高距離",
      "level": "medium",
      "tags": ["theory"]
    },
    {
      "word": "octave",
      "type": "music",
      "phonetic": "/ˈɑːkteɪv/",
      "definition_zh": "八度",
      "definition_en": "eight-note span",
      "example": "Play one octave higher.",
      "music_context": "音域",
      "level": "easy",
      "tags": ["theory"]
    },
    {
      "word": "tuning",
      "type": "music",
      "phonetic": "/ˈtuːnɪŋ/",
      "definition_zh": "調音",
      "definition_en": "adjust pitch",
      "example": "Check tuning.",
      "music_context": "音準校正",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "intonation",
      "type": "music",
      "phonetic": "/ˌɪntəˈneɪʃən/",
      "definition_zh": "音準控制",
      "definition_en": "pitch accuracy",
      "example": "Good intonation.",
      "music_context": "吹奏準確度",
      "level": "medium",
      "tags": ["performance"]
    },
    {
      "word": "breath",
      "type": "music",
      "phonetic": "/breθ/",
      "definition_zh": "氣息",
      "definition_en": "air support",
      "example": "Control your breath.",
      "music_context": "管樂核心",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "embouchure",
      "type": "music",
      "phonetic": "/ˌɑːmbuːˈʃʊr//",
      "definition_zh": "嘴型",
      "definition_en": "mouth position",
      "example": "Fix embouchure.",
      "music_context": "薩克斯風關鍵",
      "level": "hard",
      "tags": ["performance"]
    },
    {
      "word": "attack",
      "type": "music",
      "phonetic": "/əˈtæk/",
      "definition_zh": "起音",
      "definition_en": "start of note",
      "example": "Strong attack.",
      "music_context": "發音瞬間",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "release",
      "type": "music",
      "phonetic": "/rɪˈliːs/",
      "definition_zh": "收音",
      "definition_en": "end of note",
      "example": "Clean release.",
      "music_context": "結尾處理",
      "level": "easy",
      "tags": ["performance"]
    },
    {
      "word": "overtones",
      "type": "music",
      "phonetic": "/ˈoʊvərtoʊnz/",
      "definition_zh": "泛音",
      "definition_en": "higher frequencies",
      "example": "Practice overtones.",
      "music_context": "音色訓練",
      "level": "hard",
      "tags": ["theory"]
    },
    {
      "word": "jam",
      "type": "music",
      "phonetic": "/dʒæm/",
      "definition_zh": "即興合奏",
      "definition_en": "informal playing",
      "example": "Let's jam.",
      "music_context": "樂團練習",
      "level": "easy",
      "tags": ["jazz"]
    },
    {
      "word": "comping",
      "type": "music",
      "phonetic": "/ˈkɑːmpɪŋ/",
      "definition_zh": "伴奏",
      "definition_en": "chord accompaniment",
      "example": "Nice comping.",
      "music_context": "和弦支撐",
      "level": "medium",
      "tags": ["jazz"]
    },
    {
      "word": "backing track",
      "type": "music",
      "phonetic": "/ˈbækɪŋ træk/",
      "definition_zh": "伴奏音軌",
      "definition_en": "pre-recorded music",
      "example": "Practice with backing track.",
      "music_context": "練習用",
      "level": "easy",
      "tags": ["practice"]
    },
    {
      "word": "loop",
      "type": "music",
      "phonetic": "/luːp/",
      "definition_zh": "循環",
      "definition_en": "repeat section",
      "example": "Loop the part.",
      "music_context": "重複練習",
      "level": "easy",
      "tags": ["production"]
    },
    {
      "word": "fade in",
      "type": "music",
      "phonetic": "/feɪd ɪn/",
      "definition_zh": "淡入",
      "definition_en": "gradual increase",
      "example": "Fade in slowly.",
      "music_context": "音量變化",
      "level": "easy",
      "tags": ["mixing"]
    },
    {
      "word": "fade out",
      "type": "music",
      "phonetic": "/feɪd aʊt/",
      "definition_zh": "淡出",
      "definition_en": "gradual decrease",
      "example": "Fade out at end.",
      "music_context": "結尾技巧",
      "level": "easy",
      "tags": ["mixing"]
    },
    {
      "word": "equalizer",
      "type": "music",
      "phonetic": "/ˈiːkwəlaɪzər/",
      "definition_zh": "等化器",
      "definition_en": "adjust frequencies",
      "example": "Use EQ.",
      "music_context": "調整音色",
      "level": "medium",
      "tags": ["mixing"]
    },
    {
      "word": "compression",
      "type": "music",
      "phonetic": "/kəmˈpreʃən/",
      "definition_zh": "壓縮",
      "definition_en": "control dynamics",
      "example": "Add compression.",
      "music_context": "音量平衡",
      "level": "medium",
      "tags": ["mixing"]
    },
    {
      "word": "reverb",
      "type": "music",
      "phonetic": "/ˈriːvɜːrb/",
      "definition_zh": "殘響",
      "definition_en": "echo effect",
      "example": "Add reverb.",
      "music_context": "空間感",
      "level": "easy",
      "tags": ["mixing"]
    },
    {
      "word": "delay",
      "type": "music",
      "phonetic": "/dɪˈleɪ/",
      "definition_zh": "延遲效果",
      "definition_en": "echo repetition",
      "example": "Use delay.",
      "music_context": "回音效果",
      "level": "easy",
      "tags": ["mixing"]
    },
    {
      "word": "track",
      "type": "music",
      "phonetic": "/træk/",
      "definition_zh": "音軌",
      "definition_en": "recorded layer",
      "example": "Add a track.",
      "music_context": "錄音分層",
      "level": "easy",
      "tags": ["recording"]
    },
    {
      "word": "take",
      "type": "music",
      "phonetic": "/teɪk/",
      "definition_zh": "錄音一次",
      "definition_en": "record attempt",
      "example": "Second take.",
      "music_context": "錄音次數",
      "level": "easy",
      "tags": ["recording"]
    },
    {
      "word": "gig",
      "type": "music",
      "phonetic": "/ɡɪɡ/",
      "definition_zh": "演出",
      "definition_en": "live performance",
      "example": "We have a gig.",
      "music_context": "現場演出",
      "level": "easy",
      "tags": ["live"]
    },
    {
      "word": "setlist",
      "type": "music",
      "phonetic": "/ˈsetlɪst/",
      "definition_zh": "演出曲目表",
      "definition_en": "song list",
      "example": "Check setlist.",
      "music_context": "演出安排",
      "level": "easy",
      "tags": ["live"]
    },
    {
      "word": "band",
      "type": "music",
      "phonetic": "/bænd/",
      "definition_zh": "樂團",
      "definition_en": "music group",
      "example": "Join the band.",
      "music_context": "團體",
      "level": "easy",
      "tags": ["live"]
    },
    {
      "word": "ensemble",
      "type": "music",
      "phonetic": "/ɑːnˈsɑːmbəl/",
      "definition_zh": "合奏",
      "definition_en": "group performance",
      "example": "Play in ensemble.",
      "music_context": "合奏感",
      "level": "medium",
      "tags": ["live"]
    },
    {
      "word": "practice",
      "type": "word",
      "phonetic": "/ˈpræk.tɪs/",
      "definition_zh": "練習",
      "definition_en": "to repeat an activity to improve",
      "example": "I practice every day.",
      "music_context": "練樂器",
      "level": "easy"
    },
    {
      "word": "perform",
      "type": "word",
      "phonetic": "/pərˈfɔːrm/",
      "definition_zh": "演出",
      "definition_en": "to play music in front of people",
      "example": "We perform live tonight.",
      "music_context": "現場演出",
      "level": "easy"
    },
    {
      "word": "listen",
      "type": "word",
      "phonetic": "/ˈlɪs.ən/",
      "definition_zh": "聆聽",
      "definition_en": "to pay attention to sound",
      "example": "Listen carefully.",
      "music_context": "聽音樂",
      "level": "easy"
    },
    {
      "word": "repeat",
      "type": "word",
      "phonetic": "/rɪˈpiːt/",
      "definition_zh": "重複",
      "definition_en": "to do again",
      "example": "Repeat the phrase.",
      "music_context": "練習樂句",
      "level": "easy"
    }
];

// --- State Management ---
const state = {
    currentView: 'daily',
    collection: JSON.parse(localStorage.getItem('my_words') || '[]'),
    progress: JSON.parse(localStorage.getItem('word_progress') || '{}'),
    daily: JSON.parse(localStorage.getItem('daily_set') || 'null'),
    streak: parseInt(localStorage.getItem('listening_streak') || '0'),
    reviewQueue: [],
    currentReviewIndex: 0
};

const saveToStorage = () => {
    localStorage.setItem('my_words', JSON.stringify(state.collection));
    localStorage.setItem('word_progress', JSON.stringify(state.progress));
    localStorage.setItem('daily_set', JSON.stringify(state.daily));
    localStorage.setItem('listening_streak', state.streak.toString());
};

// --- DOM References ---
const viewContainer = document.getElementById('view-container');
const navItems = document.querySelectorAll('.nav-item');
const notification = document.getElementById('notification');

// --- Utils ---
const showNotification = (msg) => {
    notification.textContent = msg;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 2000);
};

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
};

// --- 📅 Daily View Logic ---
const initDailyView = () => {
    const container = document.getElementById('daily-card-container');
    const actions = document.getElementById('daily-actions');
    const dateDisplay = document.getElementById('daily-date');
    const countDisplay = document.getElementById('daily-count');

    // 1. Set Date
    const today = new Date().toISOString().split('T')[0];
    dateDisplay.textContent = new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' });

    // 2. Daily Set Generation
    if (!state.daily || state.daily.date !== today) {
        generateDailySet(today);
    }

    const dailyItems = state.daily.items;
    const pendingItems = dailyItems.filter(item => item.status === 'pending');
    const currentIndex = dailyItems.findIndex(item => item.status === 'pending');
    
    const updateProgress = () => {
        const doneCount = dailyItems.filter(item => item.status === 'done').length;
        countDisplay.textContent = `${doneCount}/${dailyItems.length}`;
    };

    const renderDailyCard = () => {
        updateProgress();

        if (pendingItems.length === 0 || currentIndex === -1) {
            // Completion Screen
            container.innerHTML = `
                <div class="completion-screen">
                    <div class="check-mark">✔</div>
                    <h2>今日完成</h2>
                    <p style="color:var(--muted); margin-top:10px;">本日複習任務已達成！</p>
                </div>
            `;
            if (actions) actions.classList.add('hidden');
            return;
        }

        const itemData = pendingItems[0];
        const word = INITIAL_DATA.find(w => w.word === itemData.word);

        container.innerHTML = `
            <div class="flashcard" id="daily-card">
                <div class="card-face front">
                    <button class="pronounce-btn" id="daily-pronounce" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                    <h2 style="font-size: 2.5rem;">${word.word}</h2>
                    <p style="margin-top:20px; color:var(--muted)">點擊翻面</p>
                </div>
                <div class="card-face back">
                    <button class="pronounce-btn" id="daily-pronounce-back" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                    <h3>${word.definition_zh}</h3>
                    <p>${word.definition_en}</p>
                    <div class="music-context" style="margin-top:20px; border-left:3px solid var(--accent); padding-left:12px; text-align:left;">
                        <strong>${word.type === 'music' ? '白話解析' : '例句'}:</strong> 
                        ${word.music_context || word.example || ''}
                    </div>
                </div>
            </div>
        `;

        actions.classList.add('hidden');

        document.getElementById('daily-pronounce').onclick = (e) => { e.stopPropagation(); speak(word.word); };
        document.getElementById('daily-pronounce-back').onclick = (e) => { e.stopPropagation(); speak(word.word); };

        document.getElementById('daily-card').addEventListener('click', (e) => {
            const card = e.currentTarget;
            card.classList.toggle('flipped');
            if (card.classList.contains('flipped')) {
                actions.classList.remove('hidden');
            } else {
                actions.classList.add('hidden');
            }
        });
    };

    renderDailyCard();

    // SRS Action Handlers
    actions.querySelectorAll('.btn').forEach(btn => {
        btn.onclick = () => {
            const rank = parseInt(btn.dataset.rank);
            const itemData = pendingItems[0];
            
            // Visual feedback
            const card = document.getElementById('daily-card');
            if (rank === 0) card.classList.add('swipe-left');
            else if (rank === 1) card.classList.add('swipe-up');
            else card.classList.add('swipe-right');

            setTimeout(() => {
                updateSRSGlobal(itemData.word, rank);
                // Mark current day item as done
                const dailyIndex = state.daily.items.findIndex(it => it.word === itemData.word);
                state.daily.items[dailyIndex].status = 'done';
                saveToStorage();
                initDailyView(); // Re-render
            }, 300);
        };
    });
};

const generateDailySet = (dateStr) => {
    // Priority: nextReviewDate <= today OR not in progress
    const now = new Date();
    
    const getPool = (type) => {
        return INITIAL_DATA
            .filter(w => w.type === type)
            .map(w => {
                const prog = state.progress[w.word] || { nextReviewDate: null, familiarity: 0 };
                return { ...w, ...prog };
            });
    };

    const selectFromPool = (pool, count) => {
        // Sort: Due first, then new, then random
        const sorted = pool.sort((a, b) => {
            const dateA = a.nextReviewDate ? new Date(a.nextReviewDate) : new Date(0);
            const dateB = b.nextReviewDate ? new Date(b.nextReviewDate) : new Date(0);
            if (dateA <= now && dateB > now) return -1;
            if (dateB <= now && dateA > now) return 1;
            return Math.random() - 0.5;
        });
        return sorted.slice(0, count).map(w => ({ word: w.word, status: 'pending' }));
    };

    const words = selectFromPool(getPool('word'), 5);
    const music = selectFromPool(getPool('music'), 3);

    state.daily = {
        date: dateStr,
        items: [...words, ...music]
    };
    saveToStorage();
};

const updateSRSGlobal = (word, rank) => {
    const intervals = [1, 3, 7];
    const daysToAdd = intervals[rank];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysToAdd);
    nextReview.setHours(0, 0, 0, 0);

    state.progress[word] = {
        familiarity: rank,
        nextReviewDate: nextReview.toISOString()
    };
    saveToStorage();
};

// --- 🎧 Listening Mode Logic ---
const initListeningView = () => {
    const playBtn = document.getElementById('listening-play-btn');
    const streakDisplay = document.getElementById('listening-streak');
    const optionsGrid = document.getElementById('listening-options');
    const feedbackPanel = document.getElementById('listening-feedback');
    const statusText = document.getElementById('listening-status');

    let currentTarget = null;
    let isAnswering = false;

    const startNewQuestion = () => {
        isAnswering = false;
        feedbackPanel.classList.add('hidden');
        optionsGrid.innerHTML = '';
        streakDisplay.textContent = state.streak;
        statusText.textContent = 'What word did you hear?';
        playBtn.classList.remove('playing');

        // Select word: priority non-familiar or due
        const now = new Date();
        const pool = INITIAL_DATA.sort(() => Math.random() - 0.5);
        currentTarget = pool.find(w => {
            const prog = state.progress[w.word];
            if (!prog) return true;
            return new Date(prog.nextReviewDate) <= now;
        }) || pool[0];

        // Generate distractors
        const distractors = generateDistractors(currentTarget);
        const options = [currentTarget, ...distractors].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.word;
            btn.onclick = () => handleAnswer(opt, btn);
            optionsGrid.appendChild(btn);
        });

        // Auto play first time
        setTimeout(() => playSound(currentTarget.word), 300);
    };

    const playSound = (text) => {
        playBtn.classList.add('playing');
        speak(text);
        setTimeout(() => playBtn.classList.remove('playing'), 600);
    };

    const handleAnswer = (selected, btn) => {
        if (isAnswering) return;
        isAnswering = true;

        const isCorrect = selected.word === currentTarget.word;
        
        if (isCorrect) {
            btn.classList.add('correct');
            state.streak++;
            updateSRSGlobal(currentTarget.word, 2); // Rank 2 = Easy
            showFeedback(true);
            setTimeout(startNewQuestion, 2000);
        } else {
            btn.classList.add('wrong');
            state.streak = 0;
            updateSRSGlobal(currentTarget.word, 0); // Rank 0 = Hard
            // Show correct one
            Array.from(optionsGrid.children).forEach(b => {
                if (b.textContent === currentTarget.word) b.classList.add('correct');
            });
            showFeedback(false);
        }
        saveToStorage();
        streakDisplay.textContent = state.streak;
    };

    const showFeedback = (isCorrect) => {
        feedbackPanel.classList.remove('hidden');
        feedbackPanel.innerHTML = `
            <h2 style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}">
                ${isCorrect ? 'Correct! ✅' : 'Wrong ❌'}
            </h2>
            <div style="margin-top:15px; text-align:left;">
                <h3 style="font-size:1.5rem;">${currentTarget.word}</h3>
                <p style="font-weight:600;">${currentTarget.definition_zh}</p>
                <div class="music-context" style="margin-top:10px;">
                    <strong>${currentTarget.type === 'music' ? '白話解析' : '例句'}:</strong><br>
                    ${currentTarget.music_context || currentTarget.example}
                </div>
            </div>
            ${!isCorrect ? '<button class="add-btn" style="margin-top:20px;" id="listening-next-btn">Next Word</button>' : ''}
        `;

        const nextBtn = document.getElementById('listening-next-btn');
        if (nextBtn) nextBtn.onclick = startNewQuestion;
    };

    playBtn.onclick = () => playSound(currentTarget.word);
    
    startNewQuestion();
};

const generateDistractors = (target) => {
    const pool = INITIAL_DATA.filter(w => w.word !== target.word);
    
    const getSimilarity = (w1, w2) => {
        let score = 0;
        if (w1.length === w2.length) score += 2;
        if (Math.abs(w1.length - w2.length) <= 1) score += 1;
        if (w1[0] === w2[0]) score += 1;
        if (w1.slice(-1) === w2.slice(-1)) score += 1;
        return score;
    };

    return pool
        .sort((a, b) => {
            const sA = getSimilarity(target.word, a.word) + (a.type === target.type ? 1 : 0);
            const sB = getSimilarity(target.word, b.word) + (b.type === target.type ? 1 : 0);
            return sB - sA;
        })
        .slice(0, 3);
};

// --- View Router ---
const switchView = (viewName) => {
    state.currentView = viewName;
    
    // Update Nav UI
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Render View Content
    const template = document.getElementById(`view-${viewName}`);
    if (!template) return;

    viewContainer.innerHTML = '';
    viewContainer.appendChild(template.content.cloneNode(true));

    // Initialize View Logic
    if (viewName === 'daily') initDailyView();
    if (viewName === 'search') initSearchView();
    if (viewName === 'collection') initCollectionView();
    if (viewName === 'flashcards') initFlashcardsView();
    if (viewName === 'music') initMusicView();
    if (viewName === 'listening') initListeningView();
};

// --- 🔍 Search View Logic ---
const initSearchView = () => {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const clearBtn = document.getElementById('clear-search');

    input.focus();

    const renderResult = (wordData, isFromApi = false) => {
        const isCollected = state.collection.some(w => w.word.toLowerCase() === wordData.word.toLowerCase());
        
        // Normalize examples to always be an array
        const examples = Array.isArray(wordData.examples) ? wordData.examples : (wordData.example ? [wordData.example] : []);

        results.innerHTML = `
            <div class="word-card">
                <div class="word-header">
                    <div class="word-title">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <h2>${wordData.word}</h2>
                            ${wordData.pos ? `<span class="pos-badge">${wordData.pos}</span>` : ''}
                        </div>
                        <div class="word-phonetic">${wordData.phonetic || ''}</div>
                    </div>
                    <button class="pronounce-btn" onclick="speak('${wordData.word}')">🔊</button>
                </div>
                <div class="word-meaning">
                    <div class="meaning-zh">${wordData.definition_zh}</div>
                    <div class="meaning-en">${wordData.definition_en}</div>
                </div>
                
                ${examples.length > 0 ? `
                <div class="examples-section">
                    <h4>Examples</h4>
                    ${examples.map(ex => `
                        <div class="example-item">
                            <span class="example-text">"${ex}"</span>
                            <button class="mini-pronounce" onclick="speak(\`${ex.replace(/'/g, "\\'")}\`)">🔊</button>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${wordData.music_context ? `<div class="music-context"><strong>音樂情境:</strong> ${wordData.music_context}</div>` : ''}
                
                <button class="add-btn ${isCollected ? 'added' : ''}" id="add-to-card">
                    ${isCollected ? '已在單字卡中' : '加入單字卡'}
                </button>
            </div>
        `;

        document.getElementById('add-to-card').addEventListener('click', () => {
            addToCollection(wordData);
            const btn = document.getElementById('add-to-card');
            btn.classList.add('added');
            btn.textContent = '已在單字卡中';
            showNotification(isCollected ? '已更新資料' : '已加入收藏');
        });
    };

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = input.value.trim().toLowerCase();
            if (!query) return;

            results.innerHTML = '<div class="empty-state"><p>搜尋中...</p></div>';

            // 1. Check Local INITIAL_DATA
            const localWord = INITIAL_DATA.find(w => w.word.toLowerCase() === query);
            if (localWord) {
                renderResult(localWord);
                return;
            }

            // 2. Fetch from API
            try {
                // Fetch English definition
                const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
                if (!dictResponse.ok) throw new Error('Not found');
                const dictData = await dictResponse.json();
                
                // Fetch Chinese translation (MyMemory API)
                let translatedZh = '查無中文翻譯';
                try {
                    const transResponse = await fetch(`https://api.mymemory.translated.net/get?q=${query}&langpair=en|zh-TW`);
                    if (transResponse.ok) {
                        const transData = await transResponse.json();
                        translatedZh = transData.responseData.translatedText;
                    }
                } catch (e) {
                    console.warn('Translation failed', e);
                }

                // Map data
                const entry = dictData[0];
                const meaning = entry.meanings[0];
                
                // Collect up to 3 examples
                const examples = [];
                entry.meanings.forEach(m => {
                    m.definitions.forEach(d => {
                        if (d.example && examples.length < 3) {
                            examples.push(d.example);
                        }
                    });
                });

                const apiWord = {
                    word: entry.word,
                    phonetic: entry.phonetic || (entry.phonetics[0] ? entry.phonetics[0].text : ''),
                    pos: meaning.partOfSpeech || '',
                    definition_en: meaning.definitions[0].definition,
                    definition_zh: translatedZh,
                    examples: examples,
                    type: 'api'
                };

                renderResult(apiWord, true);
            } catch (err) {
                results.innerHTML = '<div class="empty-state"><p>找不到這個單字，換一個試試？</p></div>';
            }
        }
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        results.innerHTML = '<div class="empty-state"><p>開始查詢單字吧！</p></div>';
        input.focus();
    });
};

// --- 📚 Collection Logic ---
const initCollectionView = () => {
    const list = document.getElementById('collection-list');
    const count = document.getElementById('collection-count');
    
    count.textContent = state.collection.length;

    if (state.collection.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>還沒有收藏任何單字喔</p></div>';
        return;
    }

    list.innerHTML = '';
    state.collection.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'word-item';
        el.innerHTML = `
            <div class="word-item-info">
                <h3>${item.word} ${item.familiar ? '⭐' : ''}</h3>
                <p>${item.definition_zh}</p>
            </div>
            <div class="word-item-actions" style="display:flex; gap:12px; align-items:center;">
                <button class="pronounce-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer;" onclick="speak('${item.word}')">🔊</button>
                <button class="delete-btn" onclick="removeFromCollection(${index})" style="background:none; border:none; font-size:1.2rem; cursor:pointer;">🗑️</button>
            </div>
        `;
        list.appendChild(el);
    });
};

// --- 🎴 Flashcards Logic (SRS) ---
const initFlashcardsView = () => {
    const container = document.getElementById('flashcard-container');
    const actions = document.getElementById('flashcard-actions');
    const progress = document.getElementById('review-progress');

    // Filter words due for review
    const now = new Date();
    state.reviewQueue = state.collection.filter(w => {
        if (!w.next_review) return true;
        return new Date(w.next_review) <= now;
    });

    state.currentReviewIndex = 0;

    const renderCard = () => {
        if (state.reviewQueue.length === 0 || state.currentReviewIndex >= state.reviewQueue.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <h2>🎉 太棒了！</h2>
                    <p>本日複習任務已完成</p>
                    <p style="margin-top:10px; font-size:0.8rem;">單字總數: ${state.collection.length} | 待複習: 0</p>
                </div>
            `;
            actions.classList.add('hidden');
            progress.style.width = '100%';
            return;
        }

        const word = state.reviewQueue[state.currentReviewIndex];
        container.innerHTML = `
            <div class="flashcard" id="current-card">
                <div class="card-face front">
                    <button class="pronounce-btn" id="flash-pronounce" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                    <h2>${word.word}</h2>
                    <p style="margin-top:20px; color:var(--muted)">點擊翻面</p>
                </div>
                <div class="card-face back">
                    <button class="pronounce-btn" id="flash-pronounce-back" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                    <h3>${word.definition_zh}</h3>
                    <p>${word.definition_en}</p>
                    ${word.example ? `<div class="word-example" style="margin-top:20px">"${word.example}"</div>` : ''}
                </div>
            </div>
        `;

        actions.classList.add('hidden');
        progress.style.width = `${(state.currentReviewIndex / state.reviewQueue.length) * 100}%`;

        // Pronounce buttons - stop propagation to avoid flipping when clicking them
        document.getElementById('flash-pronounce').onclick = (e) => { e.stopPropagation(); speak(word.word); };
        document.getElementById('flash-pronounce-back').onclick = (e) => { e.stopPropagation(); speak(word.word); };

        document.getElementById('current-card').addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('flipped');
            if (e.currentTarget.classList.contains('flipped')) {
                actions.classList.remove('hidden');
            } else {
                actions.classList.add('hidden');
            }
        });
    };

    renderCard();

    // SRS Buttons
    actions.querySelectorAll('.btn').forEach(btn => {
        btn.onclick = () => {
            const rank = parseInt(btn.dataset.rank);
            updateSRS(state.reviewQueue[state.currentReviewIndex], rank);
            state.currentReviewIndex++;
            renderCard();
        };
    });
};

const updateSRS = (word, rank) => {
    const intervals = [1, 3, 7]; // Days for Hard, Normal, Easy
    const daysToAdd = intervals[rank];
    
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysToAdd);
    nextReview.setHours(0, 0, 0, 0);

    const index = state.collection.findIndex(w => w.word === word.word);
    if (index !== -1) {
        state.collection[index].next_review = nextReview.toISOString();
        if (rank === 2) state.collection[index].familiar = true;
        saveToStorage();
    }
};

// --- 🎵 Music View Logic ---
const initMusicView = () => {
    const list = document.getElementById('music-terminology-list');
    list.innerHTML = '';
    
    INITIAL_DATA.filter(w => w.type === 'music').forEach(item => {
        const isCollected = state.collection.some(w => w.word.toLowerCase() === item.word.toLowerCase());
        const el = document.createElement('div');
        el.className = 'word-card';
        el.style.marginTop = '0';
        el.style.marginBottom = '24px';
        el.innerHTML = `
            <div class="word-header">
                <div class="word-title">
                    <h3>${item.word}</h3>
                    <div class="word-phonetic">${item.phonetic || ''}</div>
                </div>
                <button class="pronounce-btn" style="width: 32px; height: 32px; font-size: 1rem;">🔊</button>
            </div>
            <div class="meaning-zh">${item.definition_zh}</div>
            <div class="music-context"><strong>白話解析:</strong> ${item.music_context}</div>
            
            ${item.example ? `
            <div class="examples-section" style="margin-top:12px; padding: 10px; background: rgba(0,0,0,0.02);">
                <div class="example-item" style="border:none; padding:0;">
                    <span class="example-text" style="font-size:0.85rem;">"${item.example}"</span>
                    <button class="mini-pronounce" style="font-size:0.8rem;" onclick="speak(\`${item.example.replace(/'/g, "\\'")}\`)">🔊</button>
                </div>
            </div>` : ''}

            <button class="add-btn ${isCollected ? 'added' : ''}" style="margin-top:16px; padding: 12px; font-size:0.9rem;">
                ${isCollected ? '已在單字卡中' : '加入單字卡'}
            </button>
        `;

        el.querySelector('.pronounce-btn').addEventListener('click', () => speak(item.word));

        el.querySelector('.add-btn').addEventListener('click', (e) => {
            addToCollection(item);
            const btn = e.currentTarget;
            btn.classList.add('added');
            btn.textContent = '已在單字卡中';
            showNotification(isCollected ? '已更新資料' : '已收藏術語');
        });

        list.appendChild(el);
    });
};

// --- Global Actions ---
window.addToCollection = (wordData) => {
    const existingIndex = state.collection.findIndex(w => w.word.toLowerCase() === wordData.word.toLowerCase());
    
    if (existingIndex !== -1) {
        // 重複時覆蓋資料，但保留學習進度
        state.collection[existingIndex] = {
            ...state.collection[existingIndex],
            ...wordData,
            updated_on: new Date().toISOString()
        };
    } else {
        // 新單字新增
        const newItem = {
            ...wordData,
            added_on: new Date().toISOString(),
            familiar: false,
            next_review: new Date().toISOString() // 立即進入複習
        };
        state.collection.push(newItem);
    }
    saveToStorage();
};

window.removeFromCollection = (index) => {
    if (confirm('確定要刪除這個單字嗎？')) {
        state.collection.splice(index, 1);
        saveToStorage();
        initCollectionView();
    }
};

// --- Initialize App ---
navItems.forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
});

// Start with Search View
switchView('search');
