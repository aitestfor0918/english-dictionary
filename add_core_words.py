import json
import re

new_vocab = [
    {
        "word": "Figure out",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/ˈfɪɡ.jɚ aʊt/",
        "definition_zh": "想出 / 弄清楚",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "極為常見的片語，表示絞盡腦汁理解或找出答案。",
        "level": "medium",
        "example": "I need to figure out what went wrong with the system.",
        "example_zh": "我需要弄清楚系統到底哪裡出錯了。"
    },
    {
        "word": "Wrap up",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/ræp ʌp/",
        "definition_zh": "結束 / 收尾",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "通常在會議或專案即將結束時使用，意思是準備收尾。",
        "level": "medium",
        "example": "Let's wrap up this meeting before lunch.",
        "example_zh": "我們在午餐前把這個會議做個總結收尾吧。"
    },
    {
        "word": "Catch up",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/kætʃ ʌp/",
        "definition_zh": "敘舊 / 趕上",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "指老朋友見面互相更新近況，或是趕上落後的工作進度。",
        "level": "medium",
        "example": "We should grab coffee and catch up sometime.",
        "example_zh": "我們應該找時間喝杯咖啡敘敘舊。"
    },
    {
        "word": "Burn out",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/bɝːn aʊt/",
        "definition_zh": "職業倦怠",
        "definition_en": "Authentic Idiom",
        "explanation": "形容因工作過度而產生的身心俱疲與倦怠感。",
        "level": "medium",
        "example": "If you don't take a vacation, you are going to burn out.",
        "example_zh": "如果你不休個假，你絕對會累垮的。"
    },
    {
        "word": "Look forward to",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/lʊk ˈfɔːr.wɚd tuː/",
        "definition_zh": "期待",
        "definition_en": "Authentic Phrase",
        "explanation": "信件結尾或口語中表達極度期盼某事發生，後面常接名詞或 V-ing。",
        "level": "easy",
        "example": "I'm really looking forward to the concert next week.",
        "example_zh": "我真的很期待下週的那場演唱會。"
    },
    {
        "word": "On the same page",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/ɑːn ðə seɪm peɪdʒ/",
        "definition_zh": "達成共識",
        "definition_en": "Authentic Idiom",
        "explanation": "比喻大家在同一頁，也就是對某件事有著相同的理解與共識。",
        "level": "medium",
        "example": "Before we start, let's make sure we are all on the same page.",
        "example_zh": "在我們開始前，先確認大家都有達成共識。"
    },
    {
        "word": "Touch base",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/tʌtʃ beɪs/",
        "definition_zh": "聯繫 / 交流一下",
        "definition_en": "Authentic Idiom",
        "explanation": "原為棒球術語，在職場用來表示快速而且簡單的聯繫或交換資訊。",
        "level": "medium",
        "example": "I just wanted to touch base with you about the new project.",
        "example_zh": "我只是想針對新專案跟你簡單交流一下狀況。"
    },
    {
        "word": "Play it by ear",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/pleɪ ɪt baɪ ɪr/",
        "definition_zh": "見機行事",
        "definition_en": "Authentic Idiom",
        "explanation": "源自音樂上「憑聽力演奏(即興)」，引申為碰到事情不預先計畫，見機行事。",
        "level": "hard",
        "example": "We don’t have a strict schedule, so let’s just play it by ear.",
        "example_zh": "我們沒有嚴格的行程表，所以就見機行事吧。"
    },
    {
        "word": "Call it a day",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/kɑːl ɪt ə deɪ/",
        "definition_zh": "收工 / 今天就到此為止",
        "definition_en": "Authentic Idiom",
        "explanation": "表示決定停止正在做的工作，準備休息或下班。",
        "level": "easy",
        "example": "You've been working for 10 hours. Let's call it a day.",
        "example_zh": "你已經連續工作 10 個小時了，今天就先到此為止吧。"
    },
    {
        "word": "Get the hang of it",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/ɡet ðə hæŋ əv ɪt/",
        "definition_zh": "掌握訣竅",
        "definition_en": "Authentic Phrase",
        "explanation": "指經過練習後，抓到某事情的方法或訣竅。",
        "level": "medium",
        "example": "It takes a little time to get the hang of this software.",
        "example_zh": "要掌握這個軟體的訣竅需要花一點時間。"
    },
    {
        "word": "Take for granted",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/teɪk fɔːr ˈɡræn.tɪd/",
        "definition_zh": "視為理所當然",
        "definition_en": "Authentic Idiom",
        "explanation": "把人事物的存在當作理當如此而失去感激之情。",
        "level": "hard",
        "example": "Don't take her help for granted.",
        "example_zh": "不要把她的幫忙視為理所當然。"
    },
    {
        "word": "Out of the blue",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/aʊt əv ðə bluː/",
        "definition_zh": "突然 / 毫無預警",
        "definition_en": "Authentic Idiom",
        "explanation": "如同青天霹靂一樣，指事情發生得出乎意料。",
        "level": "medium",
        "example": "He called me out of the blue last night.",
        "example_zh": "他昨晚突然毫無預警地打電話給我。"
    },
    {
        "word": "Bite the bullet",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/baɪt ðə ˈbʊl.ɪt/",
        "definition_zh": "硬著頭皮做",
        "definition_en": "Authentic Idiom",
        "explanation": "勇敢面對或強忍痛苦去接受不得不做的事情。",
        "level": "hard",
        "example": "I'm just going to bite the bullet and tell him the truth.",
        "example_zh": "我決定硬著頭皮去告訴他真相。"
    },
    {
        "word": "So far, so good",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/soʊ fɑːr soʊ ɡʊd/",
        "definition_zh": "到目前為止一切順利",
        "definition_en": "Authentic Idiom",
        "explanation": "被問到近況或進度時的極常見回答方式。",
        "level": "easy",
        "example": "How is the new job? So far, so good.",
        "example_zh": "新工作怎麼樣了？到目前為止都很不錯。"
    },
    {
        "word": "Rule of thumb",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/ruːl əv θʌm/",
        "definition_zh": "經驗法則",
        "definition_en": "Authentic Phrase",
        "explanation": "基於實踐經驗而非精確科學計算所歸納出的實用準則。",
        "level": "hard",
        "example": "As a rule of thumb, you should drink two liters of water a day.",
        "example_zh": "根據經驗法則，你每天應該喝兩公升的水。"
    },
    {
        "word": "Heads up",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/hedz ʌp/",
        "definition_zh": "預先告知 / 提醒",
        "definition_en": "Authentic Phrase",
        "explanation": "在事情發生前給予他人的一個警告或通知。",
        "level": "medium",
        "example": "Just giving you a heads up that tomorrow's meeting is delayed.",
        "example_zh": "先跟你說一聲，明天的會議延後了。"
    },
    {
        "word": "Under the weather",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/ˈʌn.dɚ ðə ˈweð.ɚ/",
        "definition_zh": "身體不適",
        "definition_en": "Authentic Idiom",
        "explanation": "非常道地的表達自己生病或感到不舒服的方式。",
        "level": "easy",
        "example": "I'm feeling a bit under the weather today.",
        "example_zh": "我今天覺得身體有些不舒服。"
    },
    {
        "word": "Up in the air",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/ʌp ɪn ðə er/",
        "definition_zh": "懸而未決",
        "definition_en": "Authentic Idiom",
        "explanation": "計畫或決定尚未定案，充滿未知的狀態。",
        "level": "medium",
        "example": "Our travel plans are still up in the air.",
        "example_zh": "我們的旅行計畫目前還是懸而未決。"
    },
    {
        "word": "Make sense",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/meɪk sens/",
        "definition_zh": "有道理 / 說得通",
        "definition_en": "Authentic Phrase",
        "explanation": "美劇出現頻率極高！用來表示認同別人的解釋邏輯很合理。",
        "level": "easy",
        "example": "Oh, that makes total sense now.",
        "example_zh": "哦，這樣解釋就完全說得通了。"
    },
    {
        "word": "Take your time",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/teɪk jʊr taɪm/",
        "definition_zh": "慢慢來 (不著急)",
        "definition_en": "Authentic Phrase",
        "explanation": "非常友善的禮貌表達，安撫對方不需要太倉促。",
        "level": "easy",
        "example": "There's no rush, just take your time.",
        "example_zh": "不急，你慢慢來就好。"
    },
    {
        "word": "Cut corners",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/kʌt ˈkɔːr.nɚz/",
        "definition_zh": "偷工減料 / 抄捷徑",
        "definition_en": "Authentic Idiom",
        "explanation": "為了節省時間和金錢而忽視規則，常常會帶來反效果。",
        "level": "medium",
        "example": "You shouldn't cut corners when building a house.",
        "example_zh": "在蓋房子的時候，絕對不應該偷工減料。"
    },
    {
        "word": "A piece of cake",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/ə piːs əv keɪk/",
        "definition_zh": "輕而易舉 / 小事一樁",
        "definition_en": "Authentic Idiom",
        "explanation": "形容某件事情極度簡單且容易完成。",
        "level": "easy",
        "example": "Don't worry about the exam, it will be a piece of cake.",
        "example_zh": "別擔心那場考試，那絕對是小事一樁。"
    },
    {
        "word": "Bring up",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/brɪŋ ʌp/",
        "definition_zh": "提出 / 提起",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "在對話或會議中開始談論某個新的話題或意見。",
        "level": "medium",
        "example": "I'm glad you brought up the budget issue.",
        "example_zh": "我很高興你主動提起了預算的問題。"
    },
    {
        "word": "Come up with",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/kʌm ʌp wɪθ/",
        "definition_zh": "想出 / 提出",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "大腦產生了一個新的點子、靈感或是解決方案。",
        "level": "medium",
        "example": "She came up with an amazing idea for the campaign.",
        "example_zh": "她為這次的活動想出了一個很棒的點子。"
    },
    {
        "word": "Point out",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/pɔɪnt aʊt/",
        "definition_zh": "指出 / 點出",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "讓人注意到某個可能被忽略的事實或細節。",
        "level": "easy",
        "example": "He was quick to point out my obvious mistake.",
        "example_zh": "他很快地就指出了我明顯的錯誤。"
    },
    {
        "word": "Show up",
        "type": "daily",
        "category": "日常用語",
        "phonetic": "/ʃoʊ ʌp/",
        "definition_zh": "出現 / 露面",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "到達某個地方，或者指人在聚會中準時出現。",
        "level": "easy",
        "example": "Half the guests didn't even show up.",
        "example_zh": "有一半的賓客甚至連出現都沒有出現。"
    },
    {
        "word": "Turn out",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/tɝːn aʊt/",
        "definition_zh": "結果是 / 證明是",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "指事情最後發展的結論，通常帶有意外的語氣。",
        "level": "medium",
        "example": "It turns out that he was right all along.",
        "example_zh": "結果證明他一直以來都是對的。"
    },
    {
        "word": "Stand out",
        "type": "daily",
        "category": "邏輯特徵",
        "phonetic": "/stænd aʊt/",
        "definition_zh": "脫穎而出 / 顯眼",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "比周遭的事物更優秀或是更容易被注意到。",
        "level": "medium",
        "example": "Her bright red dress made her stand out in the crowd.",
        "example_zh": "她鮮紅色的洋裝讓她在人群中顯得格外耀眼。"
    },
    {
        "word": "Pull off",
        "type": "daily",
        "category": "行動描述",
        "phonetic": "/pʊl ɑːf/",
        "definition_zh": "成功完成 (困難的事)",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "在看似不可能或高難度的情況下成功辦到某件事。",
        "level": "hard",
        "example": "I honestly never thought they would pull off that deal.",
        "example_zh": "我老實說從沒想過他們居然能成功談成那筆交易。"
    },
    {
        "word": "Take over",
        "type": "daily",
        "category": "職場社交",
        "phonetic": "/teɪk ˈoʊ.vɚ/",
        "definition_zh": "接管 / 接手",
        "definition_en": "Authentic Phrasal Verb",
        "explanation": "取得控制權或繼續某人原本正在進行的工作。",
        "level": "medium",
        "example": "Who will take over the project when she leaves?",
        "example_zh": "當她離開後，誰會接手主導這個專案？"
    }
]

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

core_match = re.search(r'(const CORE_WORDS = )(\[.*?\]);', content, re.DOTALL)
if core_match:
    core_words = json.loads(core_match.group(2))
    
    # avoid duplicates
    existing_words = {w['word'].lower() for w in core_words}
    added = 0
    for w in new_vocab:
        if w['word'].lower() not in existing_words:
            core_words.append(w)
            added += 1
            
    updated_str = json.dumps(core_words, ensure_ascii=False, indent=4)
    content = content[:core_match.start(2)] + updated_str + content[core_match.end(2):]

    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Successfully added {added} authentic American expressions.")
else:
    print("Could not find CORE_WORDS array.")
