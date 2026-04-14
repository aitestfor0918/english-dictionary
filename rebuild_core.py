import json
import re

# Brand new high-frequency American daily vocab - prioritizing verbs
# Only keeping the 30 authentic phrases from before
new_core = [
    # --- HIGH-FREQUENCY VERBS (動詞優先) ---
    {
        "word": "Grab",
        "type": "daily", "category": "行動描述",
        "phonetic": "/ɡræb/", "definition_zh": "拿 / 去買 / 去做",
        "definition_en": "American Daily Verb", "level": "easy",
        "learn_sentence": "I'll grab some coffee.", "learn_sentence_zh": "我去弄點咖啡。",
        "context_sentence": "Can you grab me a water real quick?", "context_sentence_zh": "你能幫我快去拿個水嗎？"
    },
    {
        "word": "Hang out",
        "type": "daily", "category": "行動描述",
        "phonetic": "/hæŋ aʊt/", "definition_zh": "出去玩 / 一起混",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Let's hang out sometime.", "learn_sentence_zh": "找時間出來玩吧。",
        "context_sentence": "We used to hang out every weekend.", "context_sentence_zh": "我們以前每個週末都會一起出去玩。"
    },
    {
        "word": "Check out",
        "type": "daily", "category": "行動描述",
        "phonetic": "/tʃek aʊt/", "definition_zh": "去看看 / 去試試",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Check this out.", "learn_sentence_zh": "你看看這個。",
        "context_sentence": "You've gotta check out that new place.", "context_sentence_zh": "你一定要去看看那個新的地方。"
    },
    {
        "word": "Deal with",
        "type": "daily", "category": "行動描述",
        "phonetic": "/diːl wɪð/", "definition_zh": "處理 / 面對",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "I'll deal with it.", "learn_sentence_zh": "我來處理這件事。",
        "context_sentence": "I can't deal with this right now.", "context_sentence_zh": "我現在真的沒辦法面對這件事。"
    },
    {
        "word": "Work out",
        "type": "daily", "category": "行動描述",
        "phonetic": "/wɝːk aʊt/", "definition_zh": "解決 / 健身 / 搞定",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "It'll work out.", "learn_sentence_zh": "一切都會好的。",
        "context_sentence": "I think we can work this out together.", "context_sentence_zh": "我覺得我們可以一起把這事搞定的。"
    },
    {
        "word": "Pick up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/pɪk ʌp/", "definition_zh": "去接 / 買 / 學",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Pick me up at 7.", "learn_sentence_zh": "七點來接我。",
        "context_sentence": "I'll pick up some groceries on the way.", "context_sentence_zh": "我回家途中去買點日用品。"
    },
    {
        "word": "Skip",
        "type": "daily", "category": "行動描述",
        "phonetic": "/skɪp/", "definition_zh": "跳過 / 不去",
        "definition_en": "American Daily Verb", "level": "easy",
        "learn_sentence": "Let's just skip it.", "learn_sentence_zh": "算了就跳過吧。",
        "context_sentence": "I'm gonna skip class today.", "context_sentence_zh": "我今天打算蹺課不去了。"
    },
    {
        "word": "Hit up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/hɪt ʌp/", "definition_zh": "聯絡 / 傳訊息",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "Hit me up later.", "learn_sentence_zh": "晚點再聯絡我。",
        "context_sentence": "Hit him up and see if he's free.", "context_sentence_zh": "傳個訊息給他問他有沒有空。"
    },
    {
        "word": "Drop by",
        "type": "daily", "category": "行動描述",
        "phonetic": "/drɑːp baɪ/", "definition_zh": "順道過去",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Drop by anytime.", "learn_sentence_zh": "隨時都可以來。",
        "context_sentence": "I might drop by the office later.", "context_sentence_zh": "我待會兒可能會順道去一下辦公室。"
    },
    {
        "word": "Mess up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/mes ʌp/", "definition_zh": "搞砸 / 弄亂",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "I totally messed up.", "learn_sentence_zh": "我真的把這事搞砸了。",
        "context_sentence": "Don't mess up this interview.", "context_sentence_zh": "別把這場面試給搞砸了。"
    },
    {
        "word": "Set up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/set ʌp/", "definition_zh": "設置 / 安排",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "I'll set it up.", "learn_sentence_zh": "我來設定好。",
        "context_sentence": "Can you set up a meeting for Monday?", "context_sentence_zh": "你可以安排一下週一的會議嗎？"
    },
    {
        "word": "Freak out",
        "type": "daily", "category": "行動描述",
        "phonetic": "/friːk aʊt/", "definition_zh": "崩潰 / 嚇到",
        "definition_en": "American Daily Slang", "level": "medium",
        "learn_sentence": "Don't freak out.", "learn_sentence_zh": "別崩潰。",
        "context_sentence": "She totally freaked out when she heard.", "context_sentence_zh": "她聽到的時候完全嚇壞了。"
    },
    {
        "word": "Give up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/ɡɪv ʌp/", "definition_zh": "放棄",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Don't give up.", "learn_sentence_zh": "別放棄。",
        "context_sentence": "I'm not giving up on this.", "context_sentence_zh": "這件事我絕對不打算放棄的。"
    },
    {
        "word": "Chill",
        "type": "daily", "category": "日常用語",
        "phonetic": "/tʃɪl/", "definition_zh": "放輕鬆",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "Just chill.", "learn_sentence_zh": "放輕鬆就好。",
        "context_sentence": "We were just chilling at home.", "context_sentence_zh": "我們就在家裡放鬆消遣而已。"
    },
    {
        "word": "Vibe",
        "type": "daily", "category": "日常用語",
        "phonetic": "/vaɪb/", "definition_zh": "感覺 / 氛圍",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "The vibe is great.", "learn_sentence_zh": "這裡的氛圍超好的。",
        "context_sentence": "This place has such a good vibe.", "context_sentence_zh": "這個地方的感覺真的超讚的。"
    },
    {
        "word": "Nailed it",
        "type": "daily", "category": "日常用語",
        "phonetic": "/neɪld ɪt/", "definition_zh": "超完美 / 太厲害了",
        "definition_en": "American Daily Idiom", "level": "easy",
        "learn_sentence": "You nailed it!", "learn_sentence_zh": "你太厲害了！",
        "context_sentence": "The presentation was great, you totally nailed it.", "context_sentence_zh": "報告太棒了，你這次真的完全超水準！"
    },
    {
        "word": "Kill it",
        "type": "daily", "category": "日常用語",
        "phonetic": "/kɪl ɪt/", "definition_zh": "表現完美 / 大殺四方",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "You're killing it!", "learn_sentence_zh": "你現在太猛了！",
        "context_sentence": "She's been killing it at her new job.", "context_sentence_zh": "她在新工作上表現得非常亮眼。"
    },
    {
        "word": "Snap",
        "type": "daily", "category": "日常用語",
        "phonetic": "/snæp/", "definition_zh": "哎喲 / 厲害 (驚嘆詞)",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "Snap, that was close!", "learn_sentence_zh": "哎喲，好險！",
        "context_sentence": "Snap, I can't believe he said that.", "context_sentence_zh": "哎呀，我真不敢相信他說了那句話。"
    },
    {
        "word": "Literally",
        "type": "daily", "category": "日常用語",
        "phonetic": "/ˈlɪt.ɚ.əl.i/", "definition_zh": "真的 / 簡直",
        "definition_en": "American Daily Intensifier", "level": "easy",
        "learn_sentence": "I literally just got here.", "learn_sentence_zh": "我剛剛才到而已。",
        "context_sentence": "This is literally the best thing I've ever eaten.", "context_sentence_zh": "這真的是我這輩子吃過最好吃的東西。"
    },
    {
        "word": "Totally",
        "type": "daily", "category": "日常用語",
        "phonetic": "/ˈtoʊ.t̬əl.i/", "definition_zh": "完全 / 超",
        "definition_en": "American Daily Intensifier", "level": "easy",
        "learn_sentence": "I totally forgot.", "learn_sentence_zh": "我完全忘掉了。",
        "context_sentence": "Yeah, I totally get what you mean.", "context_sentence_zh": "對，我完全懂你的意思。"
    },
    {
        "word": "Honestly",
        "type": "daily", "category": "日常用語",
        "phonetic": "/ˈɑː.nɪst.li/", "definition_zh": "說真的 / 老實講",
        "definition_en": "American Daily Discourse Marker", "level": "easy",
        "learn_sentence": "Honestly, it's fine.", "learn_sentence_zh": "說真的，沒事的。",
        "context_sentence": "Honestly, I have no idea what happened.", "context_sentence_zh": "老實說，我完全不知道發生什麼事。"
    },
    {
        "word": "Low-key",
        "type": "daily", "category": "日常用語",
        "phonetic": "/ˌloʊˈkiː/", "definition_zh": "有點 / 其實還挺",
        "definition_en": "American Daily Slang", "level": "medium",
        "learn_sentence": "I'm low-key tired.", "learn_sentence_zh": "我其實還挺累的。",
        "context_sentence": "I low-key love that song.", "context_sentence_zh": "我其實偷偷很喜歡那首歌。"
    },
    {
        "word": "No worries",
        "type": "daily", "category": "日常用語",
        "phonetic": "/noʊ ˈwɝː.iz/", "definition_zh": "沒問題 / 不客氣",
        "definition_en": "American Daily Phrase", "level": "easy",
        "learn_sentence": "No worries at all.", "learn_sentence_zh": "完全沒問題。",
        "context_sentence": "Thanks for your help! No worries, anytime.", "context_sentence_zh": "謝謝你的幫忙！沒問題的，隨時都可以。"
    },
    {
        "word": "My bad",
        "type": "daily", "category": "日常用語",
        "phonetic": "/maɪ bæd/", "definition_zh": "我的錯 / 我不好",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "My bad, I forgot.", "learn_sentence_zh": "我的錯，我忘了。",
        "context_sentence": "Oh my bad, I thought it was tomorrow.", "context_sentence_zh": "哦不好意思，我以為是明天。"
    },
    {
        "word": "For real",
        "type": "daily", "category": "日常用語",
        "phonetic": "/fɔːr riːl/", "definition_zh": "說真的 / 真的嗎",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "For real though.", "learn_sentence_zh": "說真的。",
        "context_sentence": "I'm quitting my job. For real this time.", "context_sentence_zh": "我要辭職了。這次是認真的。"
    },
    {
        "word": "What's up",
        "type": "daily", "category": "日常用語",
        "phonetic": "/wʌts ʌp/", "definition_zh": "你好 / 怎麼了",
        "definition_en": "American Daily Greeting", "level": "easy",
        "learn_sentence": "Hey, what's up?", "learn_sentence_zh": "嘿，你好！",
        "context_sentence": "What's up man, haven't seen you in a while.", "context_sentence_zh": "老兄你好啊，好久不見了。"
    },
    {
        "word": "Go-to",
        "type": "daily", "category": "日常用語",
        "phonetic": "/ɡoʊ tuː/", "definition_zh": "首選 / 最愛用的",
        "definition_en": "American Daily Expression", "level": "medium",
        "learn_sentence": "It's my go-to place.", "learn_sentence_zh": "那是我的首選去處。",
        "context_sentence": "That's my go-to answer when I don't know.", "context_sentence_zh": "那是我在不知道的時候最慣用的答案。"
    },
    {
        "word": "Back up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/bæk ʌp/", "definition_zh": "備份 / 支援",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Back it up.", "learn_sentence_zh": "幫備份一下。",
        "context_sentence": "Always back up your files before updating.", "context_sentence_zh": "更新前一定要先把資料備份起來。"
    },
    {
        "word": "Stress out",
        "type": "daily", "category": "日常用語",
        "phonetic": "/stre s aʊt/", "definition_zh": "很緊張 / 壓力很大",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Don't stress out.", "learn_sentence_zh": "別那麼緊張。",
        "context_sentence": "I've been super stressed out about the deadline.", "context_sentence_zh": "我最近因為那個截止日期壓力超大的。"
    },
    {
        "word": "Look into",
        "type": "daily", "category": "行動描述",
        "phonetic": "/lʊk ˈɪn.tuː/", "definition_zh": "調查 / 研究看看",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "I'll look into it.", "learn_sentence_zh": "我去研究一下這件事。",
        "context_sentence": "Can you look into why the app is crashing?", "context_sentence_zh": "你能查一下為什麼 app 一直閃退嗎？"
    },
    {
        "word": "Run out",
        "type": "daily", "category": "行動描述",
        "phonetic": "/rʌn aʊt/", "definition_zh": "用完了 / 跑光了",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "We ran out of time.", "learn_sentence_zh": "我們時間用光了。",
        "context_sentence": "I ran out of coffee this morning.", "context_sentence_zh": "我今天早上咖啡就喝完了。"
    },
    {
        "word": "Reach out",
        "type": "daily", "category": "職場社交",
        "phonetic": "/riːtʃ aʊt/", "definition_zh": "主動聯絡",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "Reach out anytime.", "learn_sentence_zh": "隨時都可以跟我聯絡。",
        "context_sentence": "Feel free to reach out if you need help.", "context_sentence_zh": "需要幫忙的話隨時聯絡我就好。"
    },
    {
        "word": "Follow up",
        "type": "daily", "category": "職場社交",
        "phonetic": "/ˈfɑː.loʊ ʌp/", "definition_zh": "後續追蹤",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "I'll follow up tomorrow.", "learn_sentence_zh": "我明天會追一下進度。",
        "context_sentence": "Don't forget to follow up on that email.", "context_sentence_zh": "別忘了去追一下那封 email 的回應。"
    },
    {
        "word": "Push back",
        "type": "daily", "category": "職場社交",
        "phonetic": "/pʊʃ bæk/", "definition_zh": "反對 / 推遲",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "They pushed back hard.", "learn_sentence_zh": "他們強烈反對。",
        "context_sentence": "I'm going to push back on that idea.", "context_sentence_zh": "我要對那個想法表達我的反對意見。"
    },
    {
        "word": "Loop in",
        "type": "daily", "category": "職場社交",
        "phonetic": "/luːp ɪn/", "definition_zh": "把…拉進來 / 知會",
        "definition_en": "American Office Slang", "level": "medium",
        "learn_sentence": "Loop me in.", "learn_sentence_zh": "讓我知道進度。",
        "context_sentence": "Make sure you loop the manager in.", "context_sentence_zh": "記得把主管也知會一聲。"
    },
    {
        "word": "Take on",
        "type": "daily", "category": "職場社交",
        "phonetic": "/teɪk ɑːn/", "definition_zh": "承擔 / 接受挑戰",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "I'll take that on.", "learn_sentence_zh": "我來接這個。",
        "context_sentence": "She decided to take on the challenge.", "context_sentence_zh": "她決定接受那個挑戰。"
    },
    {
        "word": "Check in",
        "type": "daily", "category": "職場社交",
        "phonetic": "/tʃek ɪn/", "definition_zh": "確認一下 / 報到",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Just checking in.", "learn_sentence_zh": "只是過來確認一下。",
        "context_sentence": "Can you check in with her about the status?", "context_sentence_zh": "你能去跟她確認一下目前進度嗎？"
    },
    {
        "word": "Come through",
        "type": "daily", "category": "日常用語",
        "phonetic": "/kʌm θruː/", "definition_zh": "來露臉 / 搞定了",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "He always comes through.", "learn_sentence_zh": "他永遠都能搞定的。",
        "context_sentence": "Thanks for coming through for me.", "context_sentence_zh": "謝謝你這次幫我把事情搞定。"
    },
    {
        "word": "Pump up",
        "type": "daily", "category": "日常用語",
        "phonetic": "/pʌmp ʌp/", "definition_zh": "讓人興奮 / 炒熱氣氛",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "This song pumps me up!", "learn_sentence_zh": "這首歌讓我超 high！",
        "context_sentence": "She pumped the crowd up before the show.", "context_sentence_zh": "她在演出前把台下的觀眾炒得超級熱。"
    },
    {
        "word": "Back off",
        "type": "daily", "category": "行動描述",
        "phonetic": "/bæk ɔːf/", "definition_zh": "退後 / 少管",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "Just back off.", "learn_sentence_zh": "少管我的事。",
        "context_sentence": "He needs to back off and give me space.", "context_sentence_zh": "他需要讓一步，給我一點空間。"
    },
    {
        "word": "Kick off",
        "type": "daily", "category": "職場社交",
        "phonetic": "/kɪk ɔːf/", "definition_zh": "開踢 / 開始",
        "definition_en": "American Daily Phrasal Verb", "level": "easy",
        "learn_sentence": "Let's kick this off.", "learn_sentence_zh": "我們開始吧。",
        "context_sentence": "The project kicks off next Monday.", "context_sentence_zh": "這個專案下週一正式開始啟動。"
    },
    {
        "word": "Pay off",
        "type": "daily", "category": "行動描述",
        "phonetic": "/peɪ ɔːf/", "definition_zh": "有回報 / 值得",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "It'll pay off.", "learn_sentence_zh": "這一切都是值得的。",
        "context_sentence": "All that hard work finally paid off.", "context_sentence_zh": "所有的努力終於都得到了回報。"
    },
    {
        "word": "Blow up",
        "type": "daily", "category": "日常用語",
        "phonetic": "/bloʊ ʌp/", "definition_zh": "爆紅 / 大發脾氣",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "That post blew up.", "learn_sentence_zh": "那則貼文爆紅了。",
        "context_sentence": "He blew up at me over nothing.", "context_sentence_zh": "他無緣無故對著我大發脾氣。"
    },
    {
        "word": "Give it a shot",
        "type": "daily", "category": "行動描述",
        "phonetic": "/ɡɪv ɪt ə ʃɑːt/", "definition_zh": "試試看",
        "definition_en": "American Daily Idiom", "level": "easy",
        "learn_sentence": "Give it a shot!", "learn_sentence_zh": "試試看吧！",
        "context_sentence": "I've never cooked Thai food but I'll give it a shot.", "context_sentence_zh": "我從來沒做過泰國菜，但我可以試試看。"
    },
    {
        "word": "Run it by",
        "type": "daily", "category": "職場社交",
        "phonetic": "/rʌn ɪt baɪ/", "definition_zh": "讓…先過目 / 對…說看看",
        "definition_en": "American Office Phrase", "level": "medium",
        "learn_sentence": "Run it by me.", "learn_sentence_zh": "說來讓我聽聽看。",
        "context_sentence": "You should run the idea by your boss first.", "context_sentence_zh": "你應該先把那個想法跟你老闆說一聲。"
    },
    {
        "word": "Drag on",
        "type": "daily", "category": "日常用語",
        "phonetic": "/dræɡ ɑːn/", "definition_zh": "拖拖拉拉 / 遲遲不結束",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "This is dragging on.", "learn_sentence_zh": "這拖太久了。",
        "context_sentence": "The meeting dragged on for two hours.", "context_sentence_zh": "那個會議硬是拖了整整兩個小時。"
    },
    {
        "word": "Be up for",
        "type": "daily", "category": "日常用語",
        "phonetic": "/biː ʌp fɔːr/", "definition_zh": "想做 / 有興趣嗎",
        "definition_en": "American Daily Phrase", "level": "easy",
        "learn_sentence": "I'm up for it.", "learn_sentence_zh": "我很樂意啊。",
        "context_sentence": "You up for grabbing food later?", "context_sentence_zh": "你待會兒想去吃點東西嗎？"
    },
    {
        "word": "Knock it off",
        "type": "daily", "category": "日常用語",
        "phonetic": "/nɑːk ɪt ɔːf/", "definition_zh": "停下來 / 別鬧了",
        "definition_en": "American Daily Idiom", "level": "medium",
        "learn_sentence": "Knock it off!", "learn_sentence_zh": "夠了，停下來！",
        "context_sentence": "You two need to knock it off right now.", "context_sentence_zh": "你們兩個現在給我停下來。"
    },
    {
        "word": "Level up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/ˈlev.əl ʌp/", "definition_zh": "升級 / 進步提升",
        "definition_en": "American Daily Slang", "level": "easy",
        "learn_sentence": "Time to level up.", "learn_sentence_zh": "是時候升級了。",
        "context_sentence": "I've been trying to level up my cooking.", "context_sentence_zh": "我最近一直在精進我的廚藝。"
    },
    {
        "word": "Hustle",
        "type": "daily", "category": "行動描述",
        "phonetic": "/ˈhʌs.əl/", "definition_zh": "拼命努力 / 衝",
        "definition_en": "American Daily Word", "level": "medium",
        "learn_sentence": "Hustle harder.", "learn_sentence_zh": "更努力衝吧。",
        "context_sentence": "She's always hustling to make ends meet.", "context_sentence_zh": "她一直都在拼命努力只為了讓生活過下去。"
    },
    {
        "word": "Go ahead",
        "type": "daily", "category": "日常用語",
        "phonetic": "/ɡoʊ əˈhed/", "definition_zh": "去吧 / 請便",
        "definition_en": "American Daily Phrase", "level": "easy",
        "learn_sentence": "Go ahead, I'm listening.", "learn_sentence_zh": "你說吧，我在聽。",
        "context_sentence": "Can I ask you something? Yeah, go ahead.", "context_sentence_zh": "我可以問你一件事嗎？當然，請說。"
    },
    {
        "word": "Get rid of",
        "type": "daily", "category": "行動描述",
        "phonetic": "/ɡet rɪd əv/", "definition_zh": "丟掉 / 除掉 / 解決",
        "definition_en": "American Daily Phrase", "level": "medium",
        "learn_sentence": "Get rid of it.", "learn_sentence_zh": "把它丟掉。",
        "context_sentence": "We need to get rid of this old software.", "context_sentence_zh": "我們得把這個老舊的軟體淘汰掉。"
    },
    {
        "word": "Clear up",
        "type": "daily", "category": "行動描述",
        "phonetic": "/klɪr ʌp/", "definition_zh": "釐清 / 整理清楚",
        "definition_en": "American Daily Phrasal Verb", "level": "medium",
        "learn_sentence": "Let me clear this up.", "learn_sentence_zh": "讓我來解釋清楚。",
        "context_sentence": "I just want to clear up this misunderstanding.", "context_sentence_zh": "我只是想把這個誤會給澄清清楚。"
    }
]

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'(const CORE_WORDS = )(\[.*?\]);', text, re.DOTALL)
if match:
    existing = json.loads(match.group(2))
    
    # Keep only the 30 authentic idioms (items with spaces in word names)
    # Remove old academic words and replace with high-quality daily verbs
    kept = [w for w in existing if ' ' in w['word'] or '-' in w['word']]
    print(f"Keeping {len(kept)} phrasal verbs/idioms")
    
    # Check for duplicates
    existing_words_lower = {w['word'].lower() for w in kept}
    added = 0
    for w in new_core:
        if w['word'].lower() not in existing_words_lower:
            kept.append(w)
            existing_words_lower.add(w['word'].lower())
            added += 1
    
    print(f"Added {added} new words. Total: {len(kept)}")
    
    updated = json.dumps(kept, ensure_ascii=False, indent=4)
    text = text[:match.start(2)] + updated + text[match.end(2):]

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done! CORE_WORDS rebuilt successfully.")
