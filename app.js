/**
 * 個人英文字典 App - Logic
 */
// Note: INITIAL_DATA is now loaded from data.js


// --- Global Utilities ---
const getLogicalToday = () => {
    const utcDate = new Date();
    const twTime = new Date(utcDate.getTime() + (8 * 60 * 60 * 1000));
    if (twTime.getUTCHours() < 6) {
        twTime.setUTCDate(twTime.getUTCDate() - 1);
    }
    return twTime.toISOString().split('T')[0];
};

// --- State Management ---
const state = {
    currentView: 'daily',
    collection: JSON.parse(localStorage.getItem('my_words') || '[]'),
    progress: JSON.parse(localStorage.getItem('word_progress') || '{}'),
    daily: JSON.parse(localStorage.getItem('daily_set') || 'null'),
    shadowingLoop: parseInt(localStorage.getItem('shadowing_loop') || '3'),
    adaptiveScore: parseInt(localStorage.getItem('adaptive_score') || '0'),
    firstLoginDate: localStorage.getItem('first_login_date') || new Date().toISOString(),
    streak: parseInt(localStorage.getItem('listening_streak') || '0'),
    reviewQueue: [],
    currentReviewIndex: 0,
    // Listening Phases
    activeListeningMode: 'daily',
    listeningSessionCount: 0,
    // Shadowing Settings
    shadowingLoop: parseInt(localStorage.getItem('shadowing_loop') || '3'),
    shadowingSpeed: parseFloat(localStorage.getItem('shadowing_speed') || '0.75'),
    activeShadowingMode: 'daily',
    shadowingSessionCount: parseInt(localStorage.getItem('shadowing_session_count') || '0'),
    listeningSessionCount: parseInt(localStorage.getItem('listening_session_count') || '0'),
    lastShadowingDate: localStorage.getItem('last_shadowing_date') || getLogicalToday(),
    shadowingStats: JSON.parse(localStorage.getItem('shadowing_stats') || '{"completed": 0, "good": 0, "tryAgain": 0}'),
    // Known Words: words marked as "I know this" — hidden from browse lists but kept in DB
    knownWords: new Set(JSON.parse(localStorage.getItem('known_words') || '[]')),
    // UI Settings
    darkMode: localStorage.getItem('dark_mode_enabled') === 'true'
};

// --- Daily State Reset Logic ---
const today = getLogicalToday();
if (state.lastShadowingDate !== today) {
    state.shadowingSessionCount = 0;
    state.listeningSessionCount = 0;
    state.lastShadowingDate = today;
    state.shadowingStats = { completed: 0, good: 0, tryAgain: 0 };
    localStorage.setItem('shadowing_session_count', '0');
    localStorage.setItem('listening_session_count', '0');
    localStorage.setItem('last_shadowing_date', today);
    localStorage.setItem('shadowing_stats', JSON.stringify(state.shadowingStats));
}

// Ensure first login is saved
if (!localStorage.getItem('first_login_date')) {
    localStorage.setItem('first_login_date', state.firstLoginDate);
}

const saveToStorage = () => {
    localStorage.setItem('my_words', JSON.stringify(state.collection));
    localStorage.setItem('word_progress', JSON.stringify(state.progress));
    localStorage.setItem('daily_set', JSON.stringify(state.daily));
    localStorage.setItem('listening_streak', state.streak.toString());
    localStorage.setItem('shadowing_loop', state.shadowingLoop.toString());
    localStorage.setItem('shadowing_speed', state.shadowingSpeed.toString());
    localStorage.setItem('adaptive_score', state.adaptiveScore.toString());
    localStorage.setItem('shadowing_session_count', state.shadowingSessionCount.toString());
    localStorage.setItem('listening_session_count', state.listeningSessionCount.toString());
    localStorage.setItem('last_shadowing_date', state.lastShadowingDate);
    localStorage.setItem('shadowing_stats', JSON.stringify(state.shadowingStats));
    localStorage.setItem('known_words', JSON.stringify([...state.knownWords]));
};

// Mark a word as "known" — hides it from browse lists (music/daily) but keeps it in INITIAL_DATA
const markWordAsKnown = (word) => {
    state.knownWords.add(word);
    saveToStorage();
};

// Unmark a word as known (for future use)
const unmarkWordAsKnown = (word) => {
    state.knownWords.delete(word);
    saveToStorage();
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

// --- NLP Helpers for Shadowing ---
const getSemanticChunks = (text) => {
    const words = text.split(' ');
    if (words.length < 5) return [text];
    
    const mid = Math.floor(words.length / 2);
    const splitters = [',', ';', ':', 'that', 'because', 'which', 'and', 'but', 'when', 'if', 'with'];
    
    let bestSplit = mid;
    let minDistance = 100;
    
    words.forEach((w, i) => {
        const lowerW = w.toLowerCase().replace(/[^\w]/g, '');
        const hasPunct = /[^\w]/.test(w);
        if (splitters.includes(lowerW) || hasPunct) {
            const dist = Math.abs(i - mid);
            if (dist < minDistance) {
                minDistance = dist;
                bestSplit = i + 1;
            }
        }
    });
    
    return [
        words.slice(0, bestSplit).join(' '),
        words.slice(bestSplit).join(' ')
    ];
};

const applyStress = (text) => {
    const stopWords = ['the', 'is', 'a', 'an', 'and', 'or', 'but', 'if', 'in', 'on', 'at', 'to', 'for', 'of', 'with'];
    return text.split(' ').map(word => {
        const clean = word.toLowerCase().replace(/[^\w]/g, '');
        // Stress words longer than 4 chars and not stop words
        if (clean.length > 4 && !stopWords.includes(clean)) {
            return `<span class="stress-word">${word}</span>`;
        }
        return word;
    }).join(' ');
};

const speak = (text, rate = 1.0) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
};

// --- Adaptive Learning Utils ---
const getAdaptiveTier = () => {
    if (state.adaptiveScore < 50) return 0; // Early
    if (state.adaptiveScore < 150) return 1; // Mid
    return 2; // Late
};

const adjustAdaptiveScore = (delta) => {
    state.adaptiveScore += delta;
    if (state.adaptiveScore < 0) state.adaptiveScore = 0;
    saveToStorage();
};

const toggleDarkMode = (enabled) => {
    state.darkMode = enabled;
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('dark_mode_enabled', enabled);
};

// Initial Theme Check
if (state.darkMode) {
    document.body.classList.add('dark-mode');
}

// --- Statistics & Progress Logic ---
// --- Word Lifecycle System Helpers ---
const initWordProgress = (word) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return {
        status: 'new',
        addedDate: now.toISOString(),
        lastReviewDate: null,
        lastErrorDate: null,
        nextReviewDate: tomorrow.toISOString(),
        correctCount: 0,
        wrongCount: 0,
        consecutiveCorrect: 0,
        consecutiveWrong: 0,
        shadowQualityLowCount: 0,
        masteredLevel: 0,
        lastFamiliarity: 1
    };
};

const checkStateTransitions = (wordStr) => {
    const prog = state.progress[wordStr];
    if (!prog) return;

    const now = new Date();
    const totalAnswers = (prog.correctCount || 0) + (prog.wrongCount || 0);
    const correctRate = totalAnswers > 0 ? (prog.correctCount / totalAnswers) : 0;

    if (prog.status === 'learning') {
        if (prog.consecutiveWrong >= 2 || (totalAnswers > 2 && correctRate < 0.60)) {
            prog.status = 'weak';
        } else if (prog.correctCount >= 3 && correctRate >= 0.80) {
            prog.status = 'mastered';
        }
    } else if (prog.status === 'weak') {
        if (prog.consecutiveCorrect >= 2) {
            prog.status = 'learning';
        } else if (prog.correctCount >= 4 && correctRate >= 0.85) {
            prog.status = 'mastered';
        }
    } else if (prog.status === 'mastered') {
        if (prog.lastReviewDate) {
            const lastReview = new Date(prog.lastReviewDate);
            const daysSince = (now - lastReview) / (1000 * 60 * 60 * 24);
            if (daysSince >= 14 || prog.consecutiveWrong >= 2) {
                prog.status = 'weak';
                prog.masteredLevel = 0; // reset
            }
        }
    }
};

const calculateNextReviewDate = (prog, isCorrect, rank) => {
    const now = new Date();
    let daysToAdd = 1;
    
    if (prog.status === 'learning') {
        if (!isCorrect || rank === 0) daysToAdd = 1;
        else if (rank === 1) daysToAdd = 2;
        else daysToAdd = 3;
    } else if (prog.status === 'weak') {
        daysToAdd = 1;
    } else if (prog.status === 'mastered') {
        if (!isCorrect) daysToAdd = 1;
        else {
            const tiers = [7, 14, 30];
            daysToAdd = tiers[Math.min(prog.masteredLevel || 0, 2)];
            prog.masteredLevel = (prog.masteredLevel || 0) + 1;
        }
    } else { // new
        daysToAdd = 1;
    }
    
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    nextDate.setHours(0, 0, 0, 0);
    return nextDate.toISOString();
};

const calculateWeaknessScore = (word) => {
    const prog = state.progress[word];
    if (!prog) return 0;

    const now = new Date();
    const added = new Date(prog.addedDate || now);
    const msSinceAdded = now - added;
    
    // Constraints: new or <24h -> 0 points
    if (prog.status === 'new' || msSinceAdded < 24 * 60 * 60 * 1000) return 0;

    let score = 0;
    
    // Mistakes capped at +9 (3 mistakes)
    score += Math.min((prog.wrongCount || 0) * 3, 9);
    
    // Shadowing low quality capped at +5
    score += Math.min((prog.shadowQualityLowCount || 0) * 1, 5);
    
    // Familiarity (+2 if hard/wrong)
    if ((prog.lastFamiliarity ?? 1) <= 1) score += 2;
    
    // Long no review (+2 if > 7 days)
    if (prog.lastReviewDate) {
        const last = new Date(prog.lastReviewDate);
        if ((now - last) / (1000 * 60 * 60 * 24) > 7) score += 2;
    }
    
    // Time decay: -2 per 3 days since last error
    if (prog.lastErrorDate) {
        const lastError = new Date(prog.lastErrorDate);
        const daysSinceError = (now - lastError) / (1000 * 60 * 60 * 24);
        const decayAmount = Math.floor(daysSinceError / 3) * 2;
        score = Math.max(0, score - decayAmount);
    }
    
    // Weakness trigger
    if (score >= 5 && prog.status !== 'weak' && prog.status !== 'new') {
        prog.status = 'weak';
    }
    
    return score;
};

const getLearningStats = () => {
    const now = new Date();
    const start = new Date(state.firstLoginDate);
    const diffTime = Math.abs(now - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const allProgress = Object.values(state.progress);
    const masteredCount = allProgress.filter(p => p.familiarity === 2).length;

    const getProgressForType = (type) => {
        const typePool = INITIAL_DATA.filter(w => w.type === type);
        if (typePool.length === 0) return 0;
        const masteredInPool = typePool.filter(w => state.progress[w.word]?.familiarity === 2).length;
        return Math.round((masteredInPool / typePool.length) * 100);
    };

    // 新的計分邏輯：各 1 分，總分 3 分
    const vocabularyDone = (state.daily?.items.filter(i => i.status === 'done').length >= 8) ? 1 : 0;
    const listeningDone = (state.listeningSessionCount >= 10) ? 1 : 0;
    const shadowingDone = (state.shadowingSessionCount >= 5) ? 1 : 0;

    return {
        todayDone: vocabularyDone + listeningDone + shadowingDone,
        todayTotal: 3,
        totalDays,
        masteredCount,
        wordProgress: getProgressForType('word'),
        musicProgress: getProgressForType('music')
    };
};

const renderProgressDashboard = () => {
    const dashboard = document.getElementById('daily-stats-dashboard');
    if (!dashboard) return;

    const stats = getLearningStats();

    dashboard.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-value">${stats.todayDone}/${stats.todayTotal}</span>
                <span class="stat-label">今日完成</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.totalDays}</span>
                <span class="stat-label">學習天數</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.masteredCount}</span>
                <span class="stat-label">已掌握單字</span>
            </div>
        </div>
        <div class="sectional-progress" style="gap: 8px; display: flex; flex-direction: column;">
            <div class="progress-row" style="gap: 4px; display: flex; flex-direction: column; cursor: pointer;" onclick="switchView('core')">
                <div class="progress-info" style="font-size: 0.7rem;">
                    <span>Core Words</span>
                    <span>${stats.wordProgress}%</span>
                </div>
                <div class="progress-track" style="height: 4px; background: var(--border); border-radius: 2px;">
                    <div class="progress-fill word" style="width: ${stats.wordProgress}%; height:100%; border-radius: 2px;"></div>
                </div>
            </div>
            <div class="progress-row" style="gap: 4px; display: flex; flex-direction: column; cursor: pointer;" onclick="switchView('music')">
                <div class="progress-info" style="font-size: 0.7rem;">
                    <span>Music Terms</span>
                    <span>${stats.musicProgress}%</span>
                </div>
                <div class="progress-track" style="height: 4px; background: var(--border); border-radius: 2px;">
                    <div class="progress-fill music" style="width: ${stats.musicProgress}%; height:100%; border-radius: 2px;"></div>
                </div>
            </div>
        </div>
    `;
};

const getAdaptivePool = (count, typeFilter = null) => {
    const tier = getAdaptiveTier();
    
    const distributions = [
        [0.8, 0.2, 0.0], // Tier 0
        [0.5, 0.4, 0.1], // Tier 1
        [0.1, 0.45, 0.45] // Tier 2
    ][tier];

    const now = new Date();
    const words = INITIAL_DATA.filter(w => !typeFilter || w.type === typeFilter || (typeFilter === 'word' && w.type === 'daily'));
    const getLevelPool = (level) => words.filter(w => (w.level || 'easy') === level);

    const easyPool = getLevelPool('easy');
    const mediumPool = getLevelPool('medium');
    const hardPool = getLevelPool('hard');

    const counts = distributions.map(ratio => Math.ceil(count * ratio));
    
    const selectFromSubPool = (subPool, targetCount) => {
        return subPool
            .filter(w => {
                const prog = state.progress[w.word];
                // Do not re-test words whose nextReviewDate is in the future
                if (prog && prog.nextReviewDate && new Date(prog.nextReviewDate) > now) return false;
                return true;
            })
            .map(w => {
                const prog = state.progress[w.word];
                const weaknessScore = calculateWeaknessScore(w.word);
                
                let priority = 0;
                if (!prog) priority += 100; // Brand new
                else if (prog.nextReviewDate && new Date(prog.nextReviewDate) <= now) priority += 50; // Due
                
                // Add Weakness Boost
                priority += weaknessScore * 5;
                
                return { ...w, priority: priority + Math.random() * 10 };
            })
            .sort((a, b) => b.priority - a.priority)
            .slice(0, targetCount);
    };

    let selected = [
        ...selectFromSubPool(easyPool, counts[0]),
        ...selectFromSubPool(mediumPool, counts[1]),
        ...selectFromSubPool(hardPool, counts[2])
    ];

    if (selected.length < count) {
        const used = new Set(selected.map(w => w.word));
        const remainingVars = words.filter(w => !used.has(w.word));
        selected.push(...selectFromSubPool(remainingVars, count - selected.length));
    }

    return selected.sort(() => Math.random() - 0.5).slice(0, count);
};

// --- 📅 Daily View Logic (stats only — flashcards moved to Learn view) ---
const initDailyView = () => {
    const dateDisplay = document.getElementById('daily-date');

    // 1. Set Date
    const today = getLogicalToday();
    if (dateDisplay) dateDisplay.textContent = new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' });

    // 2. Load Combined Profile Stats
    const totalWordsEl = document.getElementById('me-total-words');
    const streakRecordEl = document.getElementById('me-streak-record');
    const masteryScoreEl = document.getElementById('me-mastery-score');
    const joinDateEl = document.getElementById('me-join-date');
    const clearDataBtn = document.getElementById('me-clear-data');

    const stats = getLearningStats();
    if (totalWordsEl) totalWordsEl.textContent = stats.masteredCount;
    if (streakRecordEl) streakRecordEl.textContent = stats.totalDays;
    if (masteryScoreEl) masteryScoreEl.textContent = state.adaptiveScore;
    
    if (joinDateEl) {
        const joinDate = new Date(state.firstLoginDate);
        joinDateEl.textContent = `加入日期: ${joinDate.toLocaleDateString()}`;
    }

    if (clearDataBtn) {
        clearDataBtn.onclick = () => {
            if (confirm('警告：這將清除所有學習進度和收藏，確定嗎？')) {
                localStorage.clear();
                location.reload();
            }
        };
    }

    renderProgressDashboard();

    // 4. Dark Mode Switch
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.checked = state.darkMode;
        darkModeToggle.onchange = (e) => toggleDarkMode(e.target.checked);
    }

    // 3. Ensure daily set is generated
    if (!state.daily || state.daily.date !== today) {
        generateDailySet(today);
    }
};

// --- 🎴 Daily Flashcard Logic (embedded in Learn view) ---
const initLearnDailyCards = () => {
    const container = document.getElementById('learn-daily-card-container');
    const actions = document.getElementById('learn-daily-actions');
    const countDisplay = document.getElementById('learn-daily-count');

    if (!container || !actions || !countDisplay) return;

    // Ensure daily set exists and is complete — regenerate if on a new day or if the current set is broken
    const today = getLogicalToday();
    if (!state.daily || state.daily.date !== today || !state.daily.items || state.daily.items.length < 8) {
        generateDailySet(today);
    }

    const dailyItems = state.daily.items;
    const pendingItems = dailyItems.filter(item => item.status === 'pending');

    const updateProgress = () => {
        const doneCount = dailyItems.filter(item => item.status === 'done').length;
        countDisplay.textContent = `${doneCount}/${dailyItems.length}`;
    };

    const renderCard = () => {
        updateProgress();
        const currentPending = state.daily.items.filter(i => i.status === 'pending');

        if (currentPending.length === 0) {
            const totalDone = dailyItems.filter(i => i.status === 'done').length;
            container.innerHTML = `
                <div class="completion-screen" style="padding: 20px 16px; min-height: unset; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%;">
                    <div class="check-mark" style="font-size:2rem; margin-bottom:4px;">✔</div>
                    <h2 style="margin:4px 0; font-size:1.2rem;">今日目標達成！</h2>
                    <p style="color:var(--muted); margin:4px 0; font-size:0.85rem;">已完成 ${totalDone} 張翻卡學習</p>
                    <button id="learn-continue-btn" style="margin-top:12px; padding:8px 24px; border-radius:10px; border:1.5px solid var(--accent); background:var(--bg); color:var(--text); font-size:0.9rem; font-weight:700; cursor:pointer;">繼續翻卡 →</button>
                </div>
            `;
            actions.classList.add('hidden');

            document.getElementById('learn-continue-btn').onclick = () => {
                // Gather all words already seen this session
                const seenWords = new Set(state.daily.items.map(i => i.word));
                // Pull a new batch from the adaptive pool, excluding seen words
                const moreBatch = [
                    ...getAdaptivePool(20, 'word').filter(w => !seenWords.has(w.word)).slice(0, 7),
                    ...getAdaptivePool(20, 'music').filter(w => !seenWords.has(w.word)).slice(0, 3)
                ].sort(() => Math.random() - 0.5);
                if (moreBatch.length === 0) {
                    container.innerHTML = `
                        <div class="completion-screen" style="min-height:180px;">
                            <div class="check-mark" style="font-size:2.5rem;">🎉</div>
                            <h2 style="margin-top:8px;">全部複習完了！</h2>
                            <p style="color:var(--muted); margin-top:6px; font-size:0.9rem;">所有單字今天都複習過了</p>
                        </div>
                    `;
                    return;
                }
                // Append new pending items to today's set
                moreBatch.forEach(w => state.daily.items.push({ word: w.word, status: 'pending' }));
                saveToStorage();
                initLearnDailyCards();
            };
            return;
        }


        const itemData = currentPending[0];
        const word = INITIAL_DATA.find(w => w.word === itemData.word);
        if (!word) { renderCard(); return; }

        container.innerHTML = `
            <div class="flashcard" id="learn-daily-card">
                <div class="card-face front">
                    <button class="pronounce-btn" id="ld-pronounce" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                    <h2 style="font-size: 2rem;">${word.word}</h2>
                    <p style="margin-top:16px; color:var(--muted)">點擊翻面</p>
                </div>
                <div class="card-face back">
                    <button class="pronounce-btn" id="ld-pronounce-back" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                    <h3 style="font-size:1.3rem;">${word.definition_zh}</h3>
                    ${word.learn_sentence || word.context_sentence ? `
                    <div class="word-example" style="margin-top:15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border-left: 3px solid var(--accent); text-align: left; display:flex; flex-direction:column; gap:10px;">
                        ${word.learn_sentence ? `
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:var(--muted); font-size:0.85rem;">🌱 基礎搭配 (Learn)</strong>
                                <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${word.learn_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                            </div>
                            <div style="margin-top:4px; line-height: 1.3; color: var(--text); font-size:0.95rem;">"${word.learn_sentence}"</div>
                            ${word.learn_sentence_zh ? `<div style="margin-top:2px; line-height: 1.3; color: var(--muted); font-size:0.85rem;">${word.learn_sentence_zh}</div>` : ''}
                        </div>
                        ` : ''}
                        ${word.context_sentence ? `
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:var(--muted); font-size:0.85rem;">💬 日常情境 (Context)</strong>
                                <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${word.context_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                            </div>
                            <div style="margin-top:4px; line-height: 1.3; color: var(--text); font-size:0.95rem;">"${word.context_sentence}"</div>
                            ${word.context_sentence_zh ? `<div style="margin-top:2px; line-height: 1.3; color: var(--muted); font-size:0.85rem;">${word.context_sentence_zh}</div>` : ''}
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    ${word.type === 'music' && (word.explanation || word.music_context) ? `
                    <div style="margin-top:12px; font-size:0.85rem; color: var(--muted); text-align:left; padding: 0 5px;">
                        <strong>專業解析:</strong> ${word.explanation || word.music_context}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;

        actions.classList.add('hidden');

        document.getElementById('ld-pronounce').onclick = (e) => { e.stopPropagation(); speak(word.word); };
        document.getElementById('ld-pronounce-back').onclick = (e) => { e.stopPropagation(); speak(word.word); };

        document.getElementById('learn-daily-card').addEventListener('click', (e) => {
            const card = e.currentTarget;
            card.classList.toggle('flipped');
            actions.classList.toggle('hidden', !card.classList.contains('flipped'));
        });
    };

    renderCard();

    // SRS Buttons
    actions.querySelectorAll('.btn').forEach(btn => {
        btn.onclick = () => {
            const rank = parseInt(btn.dataset.rank);
            const currentPending = state.daily.items.filter(i => i.status === 'pending');
            if (currentPending.length === 0) return;
            const itemData = currentPending[0];

            // 「不會」自動加入單字卡
            if (rank === 0) {
                const wordData = INITIAL_DATA.find(w => w.word === itemData.word);
                if (wordData) {
                    const alreadyCollected = state.collection.some(
                        w => w.word.toLowerCase() === wordData.word.toLowerCase()
                    );
                    if (!alreadyCollected) {
                        addToCollection(wordData);
                        showNotification(`「${wordData.word}」已自動加入單字卡`);
                    }
                }
            }

            const card = document.getElementById('learn-daily-card');
            if (card) {
                if (rank === 0) card.classList.add('swipe-left');
                else if (rank === 1) card.classList.add('swipe-up');
                else card.classList.add('swipe-right');
            }

            setTimeout(() => {
                updateSRSGlobal(itemData.word, rank, rank > 0);
                const dailyIndex = state.daily.items.findIndex(it => it.word === itemData.word);
                state.daily.items[dailyIndex].status = 'done';
                saveToStorage();
                initLearnDailyCards(); // Re-render card section only
            }, 300);
        };
    });
};


const generateDailySet = (dateStr) => {
    // 每次翻卡學習固定 10 張：7 核心單字 + 3 音樂術語
    const selected = [
        ...getAdaptivePool(7, 'word'),
        ...getAdaptivePool(3, 'music')
    ].sort(() => Math.random() - 0.5);

    state.daily = {
        date: dateStr,
        items: selected.map(w => ({ word: w.word, status: 'pending' }))
    };
    saveToStorage();
};


const updateSRSGlobal = (wordStr, rank, isCorrect = true) => {
    let prog = state.progress[wordStr];
    const now = new Date();
    
    if (!prog || typeof prog.status === 'undefined') {
        prog = initWordProgress(wordStr);
        state.progress[wordStr] = prog;
    }

    if (prog.status === 'new') {
        const added = new Date(prog.addedDate || now);
        if ((now - added) >= 24 * 60 * 60 * 1000) {
            prog.status = 'learning';
        }
    }
    
    if (isCorrect) {
        prog.correctCount = (prog.correctCount || 0) + 1;
        prog.consecutiveCorrect = (prog.consecutiveCorrect || 0) + 1;
        prog.consecutiveWrong = 0;
    } else {
        prog.wrongCount = (prog.wrongCount || 0) + 1;
        prog.consecutiveWrong = (prog.consecutiveWrong || 0) + 1;
        prog.consecutiveCorrect = 0;
        prog.lastErrorDate = now.toISOString();
    }
    
    prog.lastReviewDate = now.toISOString();
    prog.lastFamiliarity = rank;
    
    checkStateTransitions(wordStr);
    
    prog.nextReviewDate = calculateNextReviewDate(prog, isCorrect, rank);

    // Adaptive Feedback
    if (rank === 2) adjustAdaptiveScore(2); // Easy success
    else if (rank === 1) adjustAdaptiveScore(1); // Normal success
    else adjustAdaptiveScore(-5); // Fail

    saveToStorage();

    // Auto-update dashboard if on daily view
    if (state.currentView === 'daily') renderProgressDashboard();
};

// --- 🎧 Listening Mode Logic ---
const initListeningView = () => {
    const playBtn = document.getElementById('listening-play-btn');
    const streakDisplay = document.getElementById('listening-streak');
    const optionsGrid = document.getElementById('listening-options');
    const feedbackPanel = document.getElementById('listening-feedback');
    const statusText = document.getElementById('listening-status');
    const completionScreen = document.getElementById('listening-completion');
    const continueBtn = document.getElementById('listening-continue-btn');
    const endBtn = document.getElementById('listening-end-btn');

    let currentTarget = null;
    let isAnswering = false;

    // Initialize session state - REMOVED hard reset to allow daily persistence
    // state.listeningSessionCount = 0; 


    const nextBtn = document.getElementById('listening-next-btn');
    const addBtn = document.getElementById('listening-add-btn');
    const actionsContainer = document.getElementById('listening-feedback-actions');
    const resultContent = document.getElementById('listening-result-content');
    const mainView = document.querySelector('.listening-view');

    nextBtn.onclick = () => {
        actionsContainer.style.display = 'none';
        mainView.classList.remove('feedback-mode');
        optionsGrid.classList.remove('hidden'); 
        startNewQuestion(true);
    };

    addBtn.onclick = () => {
        if (currentTarget) {
            addToCollection(currentTarget);
            addBtn.innerHTML = '✅ 已加入';
            addBtn.style.opacity = '0.7';
            showNotification('已加入單字庫');
        }
    };

    const startNewQuestion = (autoPlay = false) => {
        mainView.classList.remove('feedback-mode');
        // Check for Goal completion recursively every 10 questions
        if (state.listeningSessionCount > 0 && state.listeningSessionCount % 10 === 0 && !state.hasListeningContinued) {
            showCompletionUI();
            return;
        }
        state.hasListeningContinued = false;

        isAnswering = false;
        feedbackPanel.classList.add('hidden');
        completionScreen.classList.add('hidden');
        optionsGrid.innerHTML = '';
        const targetStreak = Math.floor(state.listeningSessionCount / 10) * 10 + (state.listeningSessionCount > 0 && state.listeningSessionCount % 10 === 0 && !state.hasListeningContinued ? 0 : 10);
        streakDisplay.textContent = `${state.listeningSessionCount}/${targetStreak}`;
        statusText.textContent = 'What word did you hear?';
        playBtn.classList.remove('playing');

        // Adaptive Selection (70% core words, 30% music terms randomly shuffled per 10 questions)
        const qIndex = state.listeningSessionCount % 10;
        if (qIndex === 0 || !window.currentBatchOrder) {
            window.currentBatchOrder = ['word', 'word', 'word', 'word', 'word', 'word', 'word', 'music', 'music', 'music'].sort(() => Math.random() - 0.5);
        }
        const targetType = window.currentBatchOrder[qIndex];
        currentTarget = getAdaptivePool(1, targetType)[0];

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

        if (autoPlay) {
            setTimeout(() => playSound(currentTarget.word), 300);
        }
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
            state.listeningSessionCount++;
            saveToStorage();
            
            updateSRSGlobal(currentTarget.word, 2, true);
            adjustAdaptiveScore(1);
            showFeedback(true);
        } else {
            btn.classList.add('wrong');
            state.streak = 0;
            updateSRSGlobal(currentTarget.word, 0, false);
            
            if (!state.progress[currentTarget.word]) {
                state.progress[currentTarget.word] = { familiarity: 0, nextReviewDate: new Date().toISOString() };
            }
            state.progress[currentTarget.word].listenWrongCount = (state.progress[currentTarget.word].listenWrongCount || 0) + 1;
            
            adjustAdaptiveScore(-2);
            Array.from(optionsGrid.children).forEach(b => {
                if (b.textContent === currentTarget.word) b.classList.add('correct');
            });
            showFeedback(false);
        }
        saveToStorage();
        const targetStreak = Math.floor(state.listeningSessionCount / 10) * 10 + (state.listeningSessionCount > 0 && state.listeningSessionCount % 10 === 0 && !state.hasListeningContinued ? 0 : 10);
        streakDisplay.textContent = `${state.listeningSessionCount}/${targetStreak}`;
    };

    const showFeedback = (isCorrect) => {
        mainView.classList.add('feedback-mode'); 
        optionsGrid.classList.add('hidden'); 
        feedbackPanel.classList.remove('hidden');
        actionsContainer.style.display = 'flex'; 
        
        // Reset add button state
        addBtn.innerHTML = '➕ 加入單字卡';
        addBtn.style.opacity = '1';

        resultContent.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}; margin:0; font-size:1.2rem;">
                    ${isCorrect ? 'Correct! ✅' : 'Wrong ❌'}
                </h2>
                <span style="font-size:0.8rem; color:var(--muted)">Progress: ${state.listeningSessionCount}/${Math.floor(state.listeningSessionCount / 10) * 10 + (state.listeningSessionCount > 0 && state.listeningSessionCount % 10 === 0 && !state.hasListeningContinued ? 0 : 10)}</span>
            </div>
            <div style="margin-top:10px; text-align:left;">
                <h3 style="font-size:1.4rem; margin-bottom:2px;">${currentTarget.word}</h3>
                <div style="margin-bottom:5px; line-height: 1.3;">
                    <span style="font-weight:600; color: var(--accent); font-size:1.1rem;">${currentTarget.definition_zh}</span>
                    ${currentTarget.type === 'music' && (currentTarget.explanation || currentTarget.music_context) ? `
                    <span style="font-size:0.85rem; color: var(--muted); margin-left:8px;">
                        ${currentTarget.explanation || currentTarget.music_context}
                    </span>
                    ` : ''}
                </div>
                ${currentTarget.learn_sentence || currentTarget.context_sentence ? `
                <div class="word-example" style="margin-top:8px; background: rgba(255,255,255,0.05); padding: 8px 10px; border-radius: 8px; border-left: 3px solid var(--accent); text-align: left; display:flex; flex-direction:column; gap:8px;">
                    ${currentTarget.learn_sentence ? `
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--muted); font-size:0.85rem;">🌱 基礎搭配 (Learn)</strong>
                            <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${currentTarget.learn_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                        </div>
                        <div style="margin-top:4px; line-height: 1.3; color: var(--text); font-size:0.95rem;">"${currentTarget.learn_sentence}"</div>
                        ${currentTarget.learn_sentence_zh ? `<div style="margin-top:2px; line-height: 1.3; color: var(--muted); font-size:0.85rem;">${currentTarget.learn_sentence_zh}</div>` : ''}
                    </div>
                    ` : ''}
                    ${currentTarget.context_sentence ? `
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--muted); font-size:0.85rem;">💬 日常情境 (Context)</strong>
                            <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${currentTarget.context_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                        </div>
                        <div style="margin-top:4px; line-height: 1.3; color: var(--text); font-size:0.95rem;">"${currentTarget.context_sentence}"</div>
                        ${currentTarget.context_sentence_zh ? `<div style="margin-top:2px; line-height: 1.3; color: var(--muted); font-size:0.85rem;">${currentTarget.context_sentence_zh}</div>` : ''}
                    </div>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `;
    };

    const showCompletionUI = () => {
        completionScreen.classList.remove('hidden');
        feedbackPanel.classList.add('hidden');
    };

    // Completion Handlers
    continueBtn.onclick = () => {
        state.hasListeningContinued = true;
        startNewQuestion(true);
    };

    endBtn.onclick = () => {
        switchView('home');
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
    window.speechSynthesis.cancel(); // Stop any current speaking when switching views
    
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
    if (viewName === 'home') initHomeView();
    if (viewName === 'learn') initLearnView();
    if (viewName === 'words') initWordsView();
    if (viewName === 'daily') initDailyView();
    
    // Legacy support for sub-views launched from Learn/Words
    if (viewName === 'listening') initListeningView();
    if (viewName === 'shadowing') initShadowingView();
    if (viewName === 'music') initMusicView();
    if (viewName === 'core') initCoreWordsView();
    if (viewName === 'search') initSearchView();
    if (viewName === 'collection') initCollectionView();
    if (viewName === 'weakness') initWeaknessView();
    if (viewName === 'flashcards') initFlashcardsView();
    if (viewName === 'pro-review') initProReviewView();
};

// --- 🏠 Home View Logic ---
const initHomeView = () => {
    const weaknessCount = document.getElementById('home-weakness-count');
    const todayCount = document.getElementById('home-today-count');
    const mainStartBtn = document.getElementById('main-start-btn');

    // 1. Update Stats
    const stats = getLearningStats();
    let weakSum = 0;
    Object.values(state.progress).forEach(p => {
        if (p.status === 'weak') weakSum++;
    });
    
    if (todayCount) todayCount.textContent = `${stats.todayDone}`;
    if (weaknessCount) weaknessCount.textContent = `${weakSum}`;

    // 2. Setup Tabs Handlers
    const installTabs = (containerId, stateKey) => {
        const tabs = document.querySelectorAll(`#${containerId} .tab-btn`);
        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.proReviewConfig = state.proReviewConfig || { mode: 'smart', length: 5, context: 'full' };
                state.proReviewConfig[stateKey] = tab.dataset.val;
            };
        });
    };
    
    state.proReviewConfig = state.proReviewConfig || { mode: 'smart', length: 5, context: 'full' };
    
    installTabs('pro-setup-mode', 'mode');
    installTabs('pro-setup-length', 'length');
    installTabs('pro-setup-context', 'context');

    // 3. Start Logic
    if (mainStartBtn) {
        mainStartBtn.onclick = () => {
            const success = generateProReviewPool();
            if (success) switchView('pro-review');
        };
    }
};

// --- 📖 Learn View Logic ---
const initLearnView = () => {
    // 1. Flashcard section
    initLearnDailyCards();

    // 2. Mini feature cards navigation
    const miniCards = document.querySelectorAll('.learn-mini-card');
    miniCards.forEach(card => {
        card.onclick = () => switchView(card.dataset.subview);
    });

    // 3. Search bar
    const searchInput = document.getElementById('learn-search-input');
    if (searchInput) {
        searchInput.onkeypress = (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                const query = searchInput.value.trim();
                switchView('search');
                initSearchView('search-results', query.toLowerCase());
            }
        };
    }
};

// --- 📚 Words View Logic (Combined Tool) ---
const initWordsView = () => {
    initCollectionView('words-collection-list');
};

// --- 👤 Me View Logic ---

// --- 🔍 Search View Logic ---
const initSearchView = (containerId = 'search-results', initialQuery = null) => {
    const input = document.getElementById(containerId === 'search-results' ? 'search-input' : 'words-search-input');
    const results = document.getElementById(containerId);
    const clearBtn = containerId === 'search-results' ? document.getElementById('clear-search') : null;

    if (input) input.focus();

    if (initialQuery && input) {
        input.value = initialQuery;
        // Trigger the search logic immediately
        setTimeout(() => {
            const event = new KeyboardEvent('keypress', { key: 'Enter' });
            input.dispatchEvent(event);
            // Also call the internal search handler if necessary
            performSearch(initialQuery);
        }, 10);
    }

    const performSearch = async (query) => {
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
            const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
            if (!dictResponse.ok) throw new Error('Not found');
            const dictData = await dictResponse.json();
            
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

            const entry = dictData[0];
            const meaning = entry.meanings[0];
            const examples = [];
            entry.meanings.forEach(m => {
                m.definitions.forEach(d => {
                    if (d.example && examples.length < 3) examples.push(d.example);
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
    };

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

    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(input.value.trim().toLowerCase());
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            results.innerHTML = '<div class="empty-state"><p>開始查詢單字吧！</p></div>';
            input.focus();
        });
    }
};

// --- 📚 Collection Logic ---
const initCollectionView = (containerId = 'collection-list') => {
    const list = document.getElementById(containerId);
    // Update any badge showing count
    const countEl = document.getElementById('collection-count');
    if (countEl) countEl.textContent = state.collection.length;
    const badgeEl = document.getElementById('collection-badge');
    if (badgeEl) badgeEl.textContent = state.collection.length;

    if (!list) return;

    if (state.collection.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>還沒有收藏任何單字喔</p></div>';
        return;
    }

    list.innerHTML = '';
    state.collection.forEach((item, index) => {
        const example = item.example ||
            (Array.isArray(item.examples) && item.examples.length > 0 ? item.examples[0] : null);

        const el = document.createElement('div');
        el.className = 'word-item collection-word-item';
        el.innerHTML = `
            <div class="word-item-main">
                <div class="word-item-header">
                    <div>
                        <h3 class="collection-word-title">${item.word} ${item.familiar ? '⭐' : ''}</h3>
                        ${item.phonetic ? `<span class="collection-phonetic">${item.phonetic}</span>` : ''}
                    </div>
                    <div class="word-item-actions">
                        <button class="pronounce-btn icon-action-btn" data-speak="${item.word}">🔊</button>
                        <button class="delete-btn icon-action-btn" data-index="${index}">🗑️</button>
                    </div>
                </div>
                <p class="collection-definition">${item.definition_zh}</p>
                ${item.definition_en ? `<p class="collection-definition-en">${item.definition_en}</p>` : ''}
                ${example ? `
                <div class="collection-example">
                    <span class="example-label">例句</span>
                    <span class="example-sentence">"${example}"</span>
                    <button class="mini-pronounce icon-action-btn" data-speak-sentence="${example.replace(/"/g, '&quot;')}">🔊</button>
                </div>` : ''}
                <div class="delete-confirm-bar hidden">
                    <span>確定刪除這個單字？</span>
                    <div class="delete-confirm-actions">
                        <button class="delete-cancel-btn">取消</button>
                        <button class="delete-confirm-btn" data-index="${index}">刪除</button>
                    </div>
                </div>
            </div>
        `;

        // Pronounce
        el.querySelector('[data-speak]').onclick = (e) => { e.stopPropagation(); speak(item.word); };

        // Example pronounce
        const exBtn = el.querySelector('[data-speak-sentence]');
        if (exBtn) exBtn.onclick = (e) => { e.stopPropagation(); speak(exBtn.dataset.speakSentence); };

        // Delete: show confirm bar
        const deleteBtn = el.querySelector('.delete-btn');
        const confirmBar = el.querySelector('.delete-confirm-bar');
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            // Close any other open confirm bars first
            document.querySelectorAll('.delete-confirm-bar:not(.hidden)').forEach(bar => bar.classList.add('hidden'));
            confirmBar.classList.toggle('hidden');
        };

        // Cancel
        el.querySelector('.delete-cancel-btn').onclick = (e) => {
            e.stopPropagation();
            confirmBar.classList.add('hidden');
        };

        // Confirm delete
        el.querySelector('.delete-confirm-btn').onclick = (e) => {
            e.stopPropagation();
            removeFromCollection(index);
        };

        list.appendChild(el);
    });
};

// --- 🎴 Flashcards Logic (SRS) ---
const initFlashcardsView = () => {
    const container = document.getElementById('flashcard-container');
    const actions = document.getElementById('flashcard-actions');
    const progress = document.getElementById('review-progress');

    // 針對性複習或卡片複習沒有特定上限，先拉出一定數量
    state.reviewQueue = [
        ...getAdaptivePool(50, 'word'),
        ...getAdaptivePool(20, 'music')
    ].sort(() => Math.random() - 0.5);


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
                    ${word.learn_sentence || word.context_sentence ? `
                    <div class="word-example" style="margin-top:15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border-left: 3px solid var(--accent); text-align: left; display:flex; flex-direction:column; gap:10px;">
                        ${word.learn_sentence ? `
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:var(--muted); font-size:0.85rem;">🌱 基礎搭配 (Learn)</strong>
                                <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${word.learn_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                            </div>
                            <div style="margin-top:4px; line-height: 1.3; color: var(--text); font-size:0.95rem;">"${word.learn_sentence}"</div>
                            ${word.learn_sentence_zh ? `<div style="margin-top:2px; line-height: 1.3; color: var(--muted); font-size:0.85rem;">${word.learn_sentence_zh}</div>` : ''}
                        </div>
                        ` : ''}
                        ${word.context_sentence ? `
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:var(--muted); font-size:0.85rem;">💬 日常情境 (Context)</strong>
                                <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${word.context_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                            </div>
                            <div style="margin-top:4px; line-height: 1.3; color: var(--text); font-size:0.95rem;">"${word.context_sentence}"</div>
                            ${word.context_sentence_zh ? `<div style="margin-top:2px; line-height: 1.3; color: var(--muted); font-size:0.85rem;">${word.context_sentence_zh}</div>` : ''}
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    ${word.type === 'music' && (word.explanation || word.music_context) ? `
                    <div style="margin-top:12px; font-size:0.85rem; color: var(--muted); text-align:left; padding: 0 5px;">
                        <strong>專業解析:</strong> ${word.explanation || word.music_context}
                    </div>
                    ` : ''}
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

    if (!state.progress[word.word]) {
        state.progress[word.word] = { familiarity: 0 };
    }
    state.progress[word.word].nextReviewDate = nextReview.toISOString();
    state.progress[word.word].familiarity = Math.min(100, state.progress[word.word].familiarity + (rank * 10)); // Rank 0=0, 1=10, 2=20
    
    // Also update collection if it happens to be there
    const index = state.collection.findIndex(w => w.word === word.word);
    if (index !== -1) {
        state.collection[index].next_review = nextReview.toISOString();
        if (rank === 2) state.collection[index].familiar = true;
    }
    
    saveToStorage();
};

// --- 🎵 Music View Logic ---
const initMusicView = () => {
    const list = document.getElementById('music-terminology-list');
    const tabs = document.querySelectorAll('#music-tabs .tab-item');
    const PAGE_SIZE = 10;

    const renderMusicList = (category) => {
        list.innerHTML = '';
        list.style.animation = 'none';
        list.offsetHeight; // Trigger reflow
        list.style.animation = 'fadeIn 0.3s ease-out';

        // All candidates: correct type, correct category, not yet known
        const allCandidates = MUSIC_WORDS.filter(w =>
            (category === 'all' || w.category === category) &&
            !state.knownWords.has(w.word)
        );

        if (allCandidates.length === 0) {
            list.innerHTML = '<div class="empty-state"><p>這個分類的術語都學完了 🎉</p></div>';
            return;
        }

        // Track words currently rendered (to know what to supplement)
        const shownWords = new Set();

        const createMusicItem = (item) => {
            const isCollected = state.collection.some(w => w.word.toLowerCase() === item.word.toLowerCase());
            const el = document.createElement('div');
            el.className = 'expandable-item';
            el.dataset.word = item.word;
            el.innerHTML = `
                <div class="item-summary">
                    <div>
                        <h3>${item.word}</h3>
                        <div class="item-def">${item.definition_zh || ''}</div>
                        <div class="word-phonetic" style="font-size:0.75rem; opacity:0.7;">${item.phonetic || ''}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="badge" style="font-size:0.7rem; opacity:0.8;">${item.category || item.tags?.[0] || 'Term'}</span>
                        <span class="arrow">▼</span>
                    </div>
                </div>
                <div class="item-detail hidden">
                    <div class="context">
                        <div style="margin-bottom:10px;"><strong>📍 樂手情境：</strong> ${item.explanation || item.music_context || '常用術語'}</div>
                        ${item.learn_sentence || item.context_sentence ? `
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            ${item.learn_sentence ? `
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong style="color:var(--muted); font-size:0.85rem;">🌱 Learn:</strong>
                                    <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${item.learn_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                                </div>
                                <div style="line-height:1.3;">"${item.learn_sentence}"</div>
                            </div>
                            ` : ''}
                            ${item.context_sentence ? `
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong style="color:var(--muted); font-size:0.85rem;">💬 Context:</strong>
                                    <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${item.context_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                                </div>
                                <div style="line-height:1.3;">"${item.context_sentence}"</div>
                            </div>
                            ` : ''}
                        </div>
                        ` : ''}
                    </div>
                    <div class="detail-actions">
                        <button class="mini-btn" id="pronounce-music-${item.word.replace(/[^a-zA-Z]/g, '-')}" style="flex:0.5;">🔊 發音</button>
                        <button class="mini-btn know-music-btn" style="flex:0.6; background: rgba(16,185,129,0.15); color: var(--success); border-color: var(--success);">✓ 會</button>
                        <button class="mini-btn primary add-music-btn" style="flex:1;">
                            ${isCollected ? '✅ 已在單字卡' : '➕ 加入單字卡'}
                        </button>
                    </div>
                </div>
            `;

            const summary = el.querySelector('.item-summary');
            const detail = el.querySelector('.item-detail');
            summary.onclick = () => {
                const isExpanded = el.classList.toggle('expanded');
                detail.classList.toggle('hidden', !isExpanded);
            };

            const idStr = item.word.replace(/[^a-zA-Z]/g, '-');
            el.querySelector(`#pronounce-music-${idStr}`).onclick = (e) => {
                e.stopPropagation();
                speak(item.word);
            };

            const knowBtn = el.querySelector('.know-music-btn');
            knowBtn.onclick = (e) => {
                e.stopPropagation();
                markWordAsKnown(item.word);
                shownWords.delete(item.word);

                // Animate out
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                el.style.opacity = '0';
                el.style.transform = 'translateX(30px)';

                setTimeout(() => {
                    el.remove();
                    // Find next available word not shown and not known
                    const next = allCandidates.find(w =>
                        !state.knownWords.has(w.word) && !shownWords.has(w.word)
                    );
                    if (next) {
                        shownWords.add(next.word);
                        const newEl = createMusicItem(next);
                        newEl.style.opacity = '0';
                        newEl.style.transform = 'translateX(-20px)';
                        list.appendChild(newEl);
                        requestAnimationFrame(() => {
                            newEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                            newEl.style.opacity = '1';
                            newEl.style.transform = 'translateX(0)';
                        });
                    } else if (list.children.length === 0) {
                        list.innerHTML = '<div class="empty-state"><p>這個分類的術語都學完了 🎉</p></div>';
                    }
                }, 300);

                showNotification(`「${item.word}」已標為會了 ✓`);
            };

            const addBtn = el.querySelector('.add-music-btn');
            addBtn.onclick = (e) => {
                e.stopPropagation();
                if (!isCollected) {
                    addToCollection(item);
                    addBtn.innerHTML = '✅ 已在單字卡';
                    addBtn.classList.add('added');
                    showNotification('已加入單字卡');
                }
            };

            return el;
        };

        // Render initial batch (up to PAGE_SIZE)
        const initialBatch = allCandidates.slice(0, PAGE_SIZE);
        initialBatch.forEach(item => {
            shownWords.add(item.word);
            list.appendChild(createMusicItem(item));
        });
    };

    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMusicList(tab.dataset.category);
        };
    });

    const refreshBtn = document.getElementById('music-words-refresh');
    if (refreshBtn) {
        refreshBtn.onclick = () => {
            MUSIC_WORDS.sort(() => Math.random() - 0.5);
            const activeCategory = document.querySelector('#music-tabs .tab-item.active').dataset.category || 'all';
            renderMusicList(activeCategory);
            showNotification('已刷新音樂術語 ✨');
        };
    }

    renderMusicList('all');
};



// --- 💎 Core Words View Logic ---
const initCoreWordsView = () => {
    const list = document.getElementById('core-words-list');
    const tabs = document.querySelectorAll('#core-words-tabs .tab-item');
    const PAGE_SIZE = 10;

    const renderCoreList = (category = 'all') => {
        list.innerHTML = '';
        list.style.animation = 'none';
        list.offsetHeight; // Trigger reflow
        list.style.animation = 'fadeIn 0.3s ease-out';

        const allCandidates = CORE_WORDS.filter(w =>
            (category === 'all' || w.category === category) &&
            !state.knownWords.has(w.word)
        );

        if (allCandidates.length === 0) {
            list.innerHTML = '<div class="empty-state"><p>這個分類的核心單字都學完了 🎉</p></div>';
            return;
        }

        const shownWords = new Set();

        const createCoreItem = (item) => {
            const isCollected = state.collection.some(w => w.word.toLowerCase() === item.word.toLowerCase());
            const el = document.createElement('div');
            el.className = 'expandable-item';
            el.dataset.word = item.word;
            el.innerHTML = `
                <div class="item-summary">
                    <div>
                        <h3>${item.word}</h3>
                        <div class="item-def">${item.definition_zh || ''}</div>
                        <div class="word-phonetic" style="font-size:0.75rem; opacity:0.7;">${item.phonetic || ''}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="badge" style="font-size:0.75rem;">${item.category}</span>
                        <span class="arrow">▼</span>
                    </div>
                </div>
                <div class="item-detail hidden">
                    <div class="context">
                        ${item.learn_sentence || item.context_sentence ? `
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            ${item.learn_sentence ? `
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong style="color:var(--muted); font-size:0.85rem;">🌱 Learn:</strong>
                                    <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${item.learn_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                                </div>
                                <div style="line-height:1.3;">"${item.learn_sentence}"</div>
                                ${item.learn_sentence_zh ? `<div style="color:var(--muted); font-size:0.85rem; margin-top:2px;">${item.learn_sentence_zh}</div>` : ''}
                            </div>
                            ` : ''}
                            ${item.context_sentence ? `
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong style="color:var(--muted); font-size:0.85rem;">💬 Context:</strong>
                                    <button class="icon-action-btn" onclick="event.stopPropagation(); speak('${item.context_sentence.replace(/'/g, "\\'")}')" style="padding:4px; font-size:1.1rem; background:none; border:none; cursor:pointer;">🔊</button>
                                </div>
                                <div style="line-height:1.3;">"${item.context_sentence}"</div>
                                ${item.context_sentence_zh ? `<div style="color:var(--muted); font-size:0.85rem; margin-top:2px;">${item.context_sentence_zh}</div>` : ''}
                            </div>
                            ` : ''}
                        </div>
                        ` : '<div style="color:var(--muted);">尚無例句</div>'}
                    </div>
                    <div class="detail-actions">
                        <button class="mini-btn" id="pronounce-core-${item.word.replace(/[^a-zA-Z]/g, '-')}" style="flex:0.5;">🔊 發音</button>
                        <button class="mini-btn know-core-btn" style="flex:0.6; background: rgba(16,185,129,0.15); color: var(--success); border-color: var(--success);">✓ 會</button>
                        <button class="mini-btn primary add-core-btn" style="flex:1;">
                            ${isCollected ? '✅ 已在單字卡' : '➕ 加入單字卡'}
                        </button>
                    </div>
                </div>
            `;

            const summary = el.querySelector('.item-summary');
            const detail = el.querySelector('.item-detail');
            summary.onclick = () => {
                const isExpanded = el.classList.toggle('expanded');
                detail.classList.toggle('hidden', !isExpanded);
            };

            const idStr = item.word.replace(/[^a-zA-Z]/g, '-');
            el.querySelector(`#pronounce-core-${idStr}`).onclick = (e) => {
                e.stopPropagation();
                speak(item.word);
            };

            const knowBtn = el.querySelector('.know-core-btn');
            knowBtn.onclick = (e) => {
                e.stopPropagation();
                markWordAsKnown(item.word);
                shownWords.delete(item.word);
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                el.style.opacity = '0';
                el.style.transform = 'translateX(30px)';
                setTimeout(() => {
                    el.remove();
                    const next = allCandidates.find(w => !state.knownWords.has(w.word) && !shownWords.has(w.word));
                    if (next) {
                        shownWords.add(next.word);
                        const newEl = createCoreItem(next);
                        list.appendChild(newEl);
                    } else if (list.children.length === 0) {
                        list.innerHTML = '<div class="empty-state"><p>核心單字都學完了 🎉</p></div>';
                    }
                }, 300);
                showNotification(`「${item.word}」已標為會了 ✓`);
            };

            const addBtn = el.querySelector('.add-core-btn');
            addBtn.onclick = (e) => {
                e.stopPropagation();
                if (!isCollected) {
                    addToCollection(item);
                    addBtn.innerHTML = '✅ 已在單字卡';
                    showNotification('已加入單字卡');
                }
            };

            return el;
        };

        const initialBatch = allCandidates.slice(0, PAGE_SIZE);
        initialBatch.forEach(item => {
            shownWords.add(item.word);
            list.appendChild(createCoreItem(item));
        });
    };

    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCoreList(tab.dataset.category);
        };
    });

    const coreRefreshBtn = document.getElementById('core-words-refresh');
    if (coreRefreshBtn) {
        coreRefreshBtn.onclick = () => {
            CORE_WORDS.sort(() => Math.random() - 0.5);
            const activeCategory = document.querySelector('#core-words-tabs .tab-item.active').dataset.category || 'all';
            renderCoreList(activeCategory);
            showNotification('已刷新核心單字 ✨');
        };
    }

    renderCoreList('all');
};


// --- 👥 Shadowing Mode Logic ---
const initShadowingView = () => {
    const stepIndicator = document.getElementById('shadowing-step-indicator');
    const activeChunkEl = document.getElementById('shadowing-active-chunk');
    const ghostSentenceEl = document.getElementById('shadowing-ghost-sentence');
    const status = document.getElementById('shadowing-status');
    const textContainer = document.getElementById('shadowing-text-container');
    const meaningEl = document.getElementById('shadowing-meaning');
    const infoEl = document.getElementById('shadowing-info');
    const replayBtn = document.getElementById('shadowing-replay');
    const nextBtn = document.getElementById('shadowing-next');
    const loopBtns = document.querySelectorAll('.loop-btn');
    const speedTabs = document.querySelectorAll('#shadowing-speed-switcher .tab-btn');

    const modeTabs = document.querySelectorAll('#shadowing-mode-switcher .tab-btn');
    const completionScreen = document.getElementById('shadowing-completion');
    const continueBtn = document.getElementById('shadowing-continue-btn');
    const endBtn = document.getElementById('shadowing-end-btn');

    // Quality Tracking Variables
    let currentSessionSentences = 0;
    let currentSentenceStartTime = 0;
    let currentSentenceReplays = 0;
    let currentSentencePlayedFully = false;
    let currentSentenceScore = 0;

    const updateMiniStats = () => {
        const doneEl = document.getElementById('shadow-stat-done');
        const goodEl = document.getElementById('shadow-stat-good');
        const tryEl = document.getElementById('shadow-stat-try');
        if (doneEl) {
            doneEl.textContent = state.shadowingStats.completed;
            goodEl.textContent = state.shadowingStats.good;
            tryEl.textContent = state.shadowingStats.tryAgain;
        }
    };

    const showQualityBadge = (score) => {
        const badge = document.getElementById('shadowing-quality-badge');
        if (!badge) return;
        
        badge.classList.remove('hidden', 'good', 'try');
        if (score >= 70) {
            badge.textContent = '👍 Good Practice';
            badge.classList.add('good');
        } else {
            badge.textContent = '⚠️ Try Again';
            badge.classList.add('try');
        }
        
        setTimeout(() => badge.classList.add('hidden'), 2500);
    };

    let currentSentence = null;
    let isPlaying = false;
    let sentencePool = [];
    let poolIndex = 0;

    const playSequence = async () => {
        if (!currentSentence || isPlaying) return;
        isPlaying = true;

        const chunks = getSemanticChunks(currentSentence.sentence);
        const speed = state.shadowingSpeed;

        status.textContent = 'Listen carefully...';
        textContainer.classList.add('hidden');
        stepIndicator.classList.remove('hidden');
        ghostSentenceEl.classList.add('hidden');
        ghostSentenceEl.innerHTML = applyStress(currentSentence.sentence);

        // Step 1 & 2: Chunk Playback
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            stepIndicator.textContent = `Step ${i + 1}: Focus Chunk`;
            activeChunkEl.innerHTML = applyStress(chunk);
            
            const chunkLoops = Math.max(2, state.shadowingLoop); // At least 2 for zero-pressure
            for (let j = 0; j < chunkLoops; j++) {
                speak(chunk, speed);
                // Wait for chunk duration + 2.5s interval
                await new Promise(r => setTimeout(r, (chunk.split(' ').length * 450 + 400) / speed));
                await new Promise(r => setTimeout(r, 2500));
            }
        }

        // Step 3: Full Sentence
        stepIndicator.textContent = `Step 3: Full Sentence`;
        activeChunkEl.innerHTML = applyStress(currentSentence.sentence);
        const sentenceLoops = Math.max(3, state.shadowingLoop + 1); // At least 3 for zero-pressure
        for (let j = 0; j < sentenceLoops; j++) {
            status.textContent = j === (sentenceLoops - 1) ? 'Final challenge!' : `Full Sentence (${j + 1}/${sentenceLoops})`;
            speak(currentSentence.sentence, speed);
            await new Promise(r => setTimeout(r, (currentSentence.sentence.split(' ').length * 450 + 500) / speed));
            await new Promise(r => setTimeout(r, 3500)); // 3.5s interval
        }

        isPlaying = false;
        currentSentencePlayedFully = true;
        status.textContent = 'Now you try!';
        textContainer.classList.remove('hidden');
        ghostSentenceEl.classList.remove('hidden');
        
        meaningEl.textContent = currentSentence.definition_zh;
        infoEl.textContent = `from: ${currentSentence.word}`;
    };

    const getSentencePool = () => {
        return getAdaptivePool(20)
            .filter(w => w.example || w.music_context || w.context)
            .map(w => {
                const sentence = w.example || w.music_context || w.context;
                return { ...w, sentence };
            });
    };

    const loadNext = () => {
        // 1. Evaluate previous sentence quality (if exists)
        if (currentSentence) {
            const stayTime = (Date.now() - currentSentenceStartTime) / 1000;
            let score = 0;
            
            if (currentSentencePlayedFully) score += 40;
            if (stayTime >= 1.0) score += 30;
            if (currentSentenceReplays >= 2) score += 20;
            if (state.shadowingSpeed < 1.0) score += 10;
            
            currentSentenceScore = score;
            state.shadowingStats.completed++;
            if (score >= 70) state.shadowingStats.good++;
            else {
                state.shadowingStats.tryAgain++;
                // Reinforcement: Add to collection/review if poor quality
                if (currentSentence.word) {
                    let prog = state.progress[currentSentence.word];
                    if (!prog || typeof prog.status === 'undefined') {
                        prog = initWordProgress(currentSentence.word);
                        state.progress[currentSentence.word] = prog;
                    }
                    
                    prog.shadowQualityLowCount = (prog.shadowQualityLowCount || 0) + 1;
                    
                    const now = new Date();
                    if (prog.status === 'new') {
                        const added = new Date(prog.addedDate || now);
                        if ((now - added) >= 24 * 60 * 60 * 1000) prog.status = 'learning';
                    }
                    
                    checkStateTransitions(currentSentence.word);
                    saveToStorage();
                }
            }
            
            showQualityBadge(score);
            updateMiniStats();
        }

        // 2. Load New Sentence
        if (state.activeShadowingMode === 'daily' && state.shadowingSessionCount >= 5) {
            completionScreen.classList.remove('hidden');
            return;
        }

        if (sentencePool.length === 0) sentencePool = getSentencePool();
        currentSentence = sentencePool[poolIndex % sentencePool.length];
        poolIndex++;
        
        // Reset tracking for new sentence
        currentSentenceStartTime = Date.now();
        currentSentenceReplays = 0;
        currentSentencePlayedFully = false;

        if (state.activeShadowingMode === 'daily') {
            state.shadowingSessionCount++;
            saveToStorage(); // Persist daily progress
        }
        
        playSequence();
    };

    // UI Listeners
    modeTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === state.activeShadowingMode);
        tab.onclick = () => {
            state.activeShadowingMode = tab.dataset.mode;
            // No need to reset count here, we want it to persist for the day
            completionScreen.classList.add('hidden');
            modeTabs.forEach(t => t.classList.toggle('active', t === tab));
            loadNext();
        };
    });

    continueBtn.onclick = () => {
        state.activeShadowingMode = 'practice'; // Auto-switch to practice to continue
        completionScreen.classList.add('hidden');
        modeTabs.forEach(t => t.classList.toggle('active', t.dataset.mode === 'practice'));
        loadNext();
    };

    endBtn.onclick = () => {
        switchView('learn');
    };
    loopBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.count) === state.shadowingLoop);
        btn.onclick = () => {
            state.shadowingLoop = parseInt(btn.dataset.count);
            saveToStorage();
            loopBtns.forEach(b => b.classList.toggle('active', b === btn));
        };
    });

    // Speed Switcher
    speedTabs.forEach(tab => {
        tab.classList.toggle('active', parseFloat(tab.dataset.speed) === state.shadowingSpeed);
        tab.onclick = () => {
            state.shadowingSpeed = parseFloat(tab.dataset.speed);
            saveToStorage();
            speedTabs.forEach(t => t.classList.toggle('active', t === tab));
        };
    });

    replayBtn.onclick = () => {
        currentSentenceReplays++;
        playSequence();
    };
    nextBtn.onclick = () => loadNext();

    // Initial Load
    updateMiniStats();
    loadNext();
};

// --- 📉 Weakness Page Logic ---
const initWeaknessView = (containerId = 'weakness-top-list') => {
    const counts = { gap: 0, weak: 0, memory: 0, mastered: 0 };
    const now = new Date();

    // 1. Calculate Summary Counts
    INITIAL_DATA.forEach(w => {
        const prog = state.progress[w.word];
        if (!prog || prog.status === 'new') counts.gap++;
        else if (prog.status === 'weak') counts.weak++;
        else if (prog.status === 'learning') counts.memory++;
        else if (prog.status === 'mastered') counts.mastered++;
    });

    // Update Dashboard UI (if present)
    const gapEl = document.getElementById('count-gap');
    if (gapEl) {
        gapEl.textContent = counts.gap;
        document.getElementById('count-error').textContent = counts.weak;
        document.getElementById('count-memory').textContent = counts.memory;
        document.getElementById('count-listen').textContent = counts.mastered;
    }

    // 2. Generate Top 10 List
    const topWords = INITIAL_DATA
        .map(w => {
            const score = calculateWeaknessScore(w.word);
            const status = state.progress[w.word]?.status || 'new';
            return { ...w, weaknessScore: score, status };
        })
        .filter(w => w.weaknessScore > 0 && w.status !== 'new')
        .sort((a, b) => b.weaknessScore - a.weaknessScore)
        .slice(0, 10);

    const listContainer = document.getElementById(containerId);
    if (!listContainer) return;
    listContainer.innerHTML = '';

    topWords.forEach(w => {
        const el = document.createElement('div');
        el.className = 'weakness-item';
        el.innerHTML = `
            <div class="weakness-word-info">
                <span class="weakness-word-text">${w.word}</span>
                <span class="weakness-type-tag">${w.status}</span>
            </div>
            <div class="weakness-score-pill">🔥 ${w.weaknessScore}</div>
        `;
        listContainer.appendChild(el);
    });

    // 3. CTA Handlers (Focus Mode)
    document.getElementById('weakness-focus-flash').onclick = () => {
        // Start Flashcards with top weak words
        const weakList = topWords.map(w => w.word);
        if (weakList.length === 0) return showNotification('目前沒有明顯弱點單字！');
        
        state.reviewQueue = topWords;
        state.currentReviewIndex = 0;
        switchView('flashcards');
    };

    document.getElementById('weakness-focus-listen').onclick = () => {
        if (topWords.length === 0) return showNotification('目前沒有明顯弱點單字！');
        switchView('listening');
    };

    document.getElementById('weakness-focus-shadow').onclick = () => {
        if (topWords.length === 0) return showNotification('目前沒有明顯弱點單字！');
        switchView('shadowing');
    };
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
    state.collection.splice(index, 1);
    saveToStorage();
    initCollectionView('words-collection-list');
    showNotification('已刪除單字');
};

// --- Initialize App ---
navItems.forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
});


// --- 🏆 Pro Review Engine ---

const generateProReviewPool = () => {
    const config = state.proReviewConfig || { mode: 'smart', length: 5, context: 'full' };
    const maxCount = parseInt(config.length) || 5;

    const wordCount = Math.round(maxCount * 0.7);
    const musicCount = maxCount - wordCount;

    let pool = [
        ...getAdaptivePool(wordCount, 'word'),
        ...getAdaptivePool(musicCount, 'music')
    ].sort(() => Math.random() - 0.5);

    let initialWeakCount = 0;
    pool.forEach(w => {
        const p = state.progress[w.word];
        if (p && p.status === 'weak') initialWeakCount++;
    });

    state.proReviewState = {
        queue: pool,
        currentIndex: 0,
        currentStage: 'flashcard',
        stats: { completed: 0, reinforced: 0, initialWeak: initialWeakCount },
        wordScore: 0
    };

    return true; // Success
};

const initProReviewView = () => {
    const prState = state.proReviewState;
    if (!prState) return;
    
    const title = document.getElementById('pro-review-title');
    const subtitle = document.getElementById('pro-review-subtitle');
    const progress = document.getElementById('pro-review-progress');
    const stageContainer = document.getElementById('pro-review-stage-container');
    const completionUI = document.getElementById('pro-review-completion');
    const quitBtn = document.getElementById('pro-review-quit-btn');
    
    // End of Queue
    if (prState.currentIndex >= prState.queue.length) {
        stageContainer.innerHTML = '';
        completionUI.classList.remove('hidden');
        document.getElementById('res-completed').textContent = prState.stats.completed;
        document.getElementById('res-reinforced').textContent = prState.stats.reinforced;
        document.getElementById('res-weakness').textContent = Math.max(0, prState.stats.initialWeak - prState.stats.reinforced);
        
        document.getElementById('pro-review-finish-btn').onclick = () => switchView('home');
        return;
    }
    
    const wordData = prState.queue[prState.currentIndex];
    const config = state.proReviewConfig || { mode: 'smart', length: 5, context: 'full' };
    
    subtitle.textContent = `Word ${prState.currentIndex + 1} / ${prState.queue.length}`;
    progress.style.width = `${(prState.currentIndex / prState.queue.length) * 100}%`;
    
    // Handlers
    const enforceQueueBack = () => { // Move back 3 places
        prState.queue.splice(prState.currentIndex, 1);
        const insertPos = Math.min(prState.currentIndex + 3, prState.queue.length);
        prState.queue.splice(insertPos, 0, wordData);
        prState.wordScore = 0; // Reset
    };

    const nextStageOrWord = (passed) => {
        if (!passed) {
            // Failed stage
            enforceQueueBack();
            prState.currentStage = 'flashcard'; // Start from flashcard again
            initProReviewView();
            return;
        }
        
        prState.wordScore++;
        
        if (prState.currentStage === 'flashcard') {
            prState.currentStage = 'listening';
            initProReviewView();
        } else if (prState.currentStage === 'listening') {
            // Early exit if 2 consecutive perfects in Smart
            if (prState.wordScore === 2 && config.mode !== 'free') {
                finalizeWord(wordData);
            } else {
                prState.currentStage = 'shadowing';
                initProReviewView();
            }
        } else if (prState.currentStage === 'shadowing') {
            finalizeWord(wordData);
        }
    };
    
    const finalizeWord = (w) => {
        prState.stats.completed++;
        // Update Actual Progress
        const prog = state.progress[w.word];
        if (config.mode !== 'free') {
            if (prog && prog.status === 'weak') prState.stats.reinforced++;
            updateSRSGlobal(w.word, 2); // Pass
            checkStateTransitions(w.word);
            saveToStorage();
        }
        
        prState.currentStage = 'flashcard';
        prState.wordScore = 0;
        prState.currentIndex++;
        initProReviewView();
    };
    
    // Render Stages
    stageContainer.innerHTML = '';
    
    if (prState.currentStage === 'flashcard') {
        stageContainer.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100%; flex-direction:column;">
                <h3 style="color:var(--muted); margin-bottom:10px;">階段一：字卡辨識</h3>
                <div class="flashcard-container" style="width:100%; height:300px; margin: 10px 0; perspective: 1000px;">
                    <div class="flashcard" id="pr-flash" style="width:100%; height:100%;">
                        <div class="card-face front">
                    <button class="pronounce-btn" id="pr-flash-pron-front" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                        <h2>${wordData.word}</h2>
                        <p style="margin-top:20px; color:var(--muted)">點擊翻面</p>
                    </div>
                    <div class="card-face back">
                        <button class="pronounce-btn" id="pr-flash-pron-back" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:1.5rem; cursor:pointer;">🔊</button>
                        <h3>${wordData.definition_zh}</h3>
                        <p>${wordData.definition_en}</p>
                    </div>
                </div>
                </div>
                <div id="pr-flash-actions" class="flashcard-actions hidden" style="width:100%;">
                    <button class="btn btn-hard" id="pr-flash-fail">忘記 / 錯誤</button>
                    <button class="btn btn-easy" id="pr-flash-pass">記得 / 正確</button>
                </div>
            </div>
        `;
        
        document.getElementById('pr-flash-pron-front').onclick = (e) => { e.stopPropagation(); speak(wordData.word); };
        document.getElementById('pr-flash-pron-back').onclick = (e) => { e.stopPropagation(); speak(wordData.word); };

        document.getElementById('pr-flash').onclick = (e) => {
            e.currentTarget.classList.add('flipped');
            document.getElementById('pr-flash-actions').classList.remove('hidden');
        };
        document.getElementById('pr-flash-fail').onclick = () => {
            if (config.mode !== 'free') {
                const prog = initWordProgress(wordData.word);
                prog.wrongCount = (prog.wrongCount || 0) + 1;
                saveToStorage();
            }
            nextStageOrWord(false);
        };
        document.getElementById('pr-flash-pass').onclick = () => nextStageOrWord(true);
        
    } else if (prState.currentStage === 'listening') {
        const distractors = INITIAL_DATA.filter(x => x.word !== wordData.word).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [wordData, ...distractors].sort(() => 0.5 - Math.random());
        
        stageContainer.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100%; flex-direction:column; gap:20px;">
                <h3 style="color:var(--muted); margin-bottom:10px;">階段二：聽力測驗</h3>
                <button id="pr-listen-play" class="play-main-btn" style="width:100px; height:100px; font-size:3rem; margin-bottom:20px;">▶</button>
                <div class="options-grid" id="pr-listen-opts" style="width:100%; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    ${options.map((o, idx) => `<button class="option-btn" data-val="${o.word}" style="width:100%; height:auto; padding:15px; font-size:0.95rem; border:1px solid var(--border); border-radius:12px; background:var(--secondary);">${o.definition_zh}</button>`).join('')}
                </div>
            </div>
        `;
        
        let played = false;
        const playBtn = document.getElementById('pr-listen-play');
        playBtn.onclick = () => {
            speak(wordData.word);
            played = true;
        };
        
        setTimeout(() => { if (!played) speak(wordData.word); played = true; }, 500);
        
        document.querySelectorAll('#pr-listen-opts .option-btn').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.val === wordData.word) {
                    btn.style.background = 'var(--success)';
                    btn.style.color = 'white';
                    setTimeout(() => nextStageOrWord(true), 800);
                } else {
                    btn.style.background = 'var(--error)';
                    btn.style.color = 'white';
                    Array.from(document.querySelectorAll('#pr-listen-opts .option-btn')).forEach(b => {
                        if (b.dataset.val === wordData.word) {
                            b.style.background = 'var(--success)';
                            b.style.color = 'white';
                        }
                    });
                    if (config.mode !== 'free') {
                        const prog = initWordProgress(wordData.word);
                        prog.listenWrongCount = (prog.listenWrongCount || 0) + 1;
                        saveToStorage();
                    }
                    setTimeout(() => nextStageOrWord(false), 1500);
                }
            };
        });
        
    } else if (prState.currentStage === 'shadowing') {
        const sentence = wordData.example || "No context sentence available.";
        stageContainer.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100%; flex-direction:column; gap:20px; text-align:center;">
                <h3 style="color:var(--muted); margin-bottom:10px;">階段三：聲音跟讀演練</h3>
                <div style="font-size:1.5rem; font-weight:bold; margin:20px 0;">${sentence}</div>
                <button id="pr-shadow-play" class="shadow-btn secondary" style="padding:10px 20px;"><span class="icon">🔊</span> 播放句子</button>
                
                <div style="display:flex; gap:10px; width:100%; margin-top:30px;">
                    <button class="btn btn-hard" id="pr-shadow-fail" style="flex:1;">很不順 (重試)</button>
                    <button class="btn btn-easy" id="pr-shadow-pass" style="flex:1;">流暢發音 (通過)</button>
                </div>
            </div>
        `;
        document.getElementById('pr-shadow-play').onclick = () => speak(sentence);
        document.getElementById('pr-shadow-fail').onclick = () => {
            if (config.mode !== 'free') {
                const prog = initWordProgress(wordData.word);
                prog.shadowQualityLowCount = (prog.shadowQualityLowCount || 0) + 1;
                saveToStorage();
            }
            showNotification('重新排入練習...');
            nextStageOrWord(false);
        };
        document.getElementById('pr-shadow-pass').onclick = () => nextStageOrWord(true);
        
        setTimeout(() => speak(sentence), 500);
    }
    
    if (quitBtn) {
        quitBtn.onclick = () => {
            if (confirm('確定要退出 Pro Review 嗎？進度將不會保留。')) {
                stageContainer.innerHTML = '';
                switchView('home');
            }
        };
    }
};

// Start with Learn View
switchView('learn');
