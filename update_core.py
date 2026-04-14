import json
import re
import hashlib

def get_core_templates(word, word_zh, category):
    # check if phrasal verb or idiom (contains space)
    if ' ' in word:
        # custom hardcoded ones for some top ones
        w_lower = word.lower()
        if w_lower == 'figure out':
            return "Let's figure it out.", "我們來想辦法弄清楚。", "I gotta figure out what's wrong.", "我得搞清楚哪裡出錯了。"
        if w_lower == 'wrap up':
            return "Let's wrap this up.", "我們快點收尾吧。", "We wrapped up the meeting early.", "我們會早點結束會議。"
        if w_lower == 'catch up':
            return "Let's catch up soon.", "我們改天聚聚吧。", "I need to catch up on some work.", "我得把積欠的工作趕完。"
        if w_lower == 'burn out':
            return "Don't burn yourself out.", "別把自己累壞了。", "I'm feeling so burnt out lately.", "我最近覺得有夠筋疲力盡。"
        if w_lower == 'look forward to':
            return "I look forward to it.", "我很期待。", "I'm really looking forward to the trip.", "我超期待這趟旅行的。"
        if w_lower == 'on the same page':
            return "Are we on the same page?", "我們有共識了嗎？", "I just want to make sure we're on the same page.", "我只是想確認大家有一致的共識。"
        if w_lower == 'touch base':
            return "Let's touch base next week.", "我們下週來討論交流一下。", "I'll touch base with you tomorrow.", "我明天會跟你簡單通個氣。"
        if w_lower == 'play it by ear':
            return "Let's play it by ear.", "我們見機行事吧。", "I don't have a plan, I'm just playing it by ear.", "我沒啥計畫，就走一步算一步。"
        if w_lower == 'call it a day':
            return "Let's call it a day.", "今天就到這吧。", "I'm tired, I think I'll call it a day.", "我累了，今天大概就先這樣收工。"
        if w_lower == 'take your time':
            return "Take your time.", "慢慢來不急。", "No rush, just take your time.", "真的不用趕，你慢慢來就好。"
        if w_lower == 'make sense':
            return "That makes sense.", "那滿有道理的。", "Does this plan make any sense to you?", "你覺得這個計畫哪裡說得通嗎？"
        if w_lower == 'so far, so good':
            return "So far, so good.", "目前還行。", "How is it going? So far, so good.", "最近過得怎樣？還算過得去啦。"
        if w_lower == 'out of the blue':
            return "It came out of the blue.", "這真的超突然。", "He showed up entirely out of the blue.", "他毫無預警地就出現了。"
        
        # default fallback for phrasal verbs
        return f"Hey, {w_lower}!", f"嘿，{word_zh}！", f"We need to {w_lower} now.", f"我們現在必須{word_zh}。"
        
    cat_templates = {
        '行動描述': [
            (("Let's {word} it.", "我們來{word_zh}吧。"),
             ("I gotta {word} the data carefully.", "我得仔細地{word_zh}一下這些資料。")),
            (("Could you {word} this?", "你能{word_zh}這個嗎？"),
             ("We should {word} the situation first.", "我們應該先{word_zh}一下狀況。")),
             (("I'll {word} it.", "我會去{word_zh}。"),
             ("They didn't {word} the new policy well.", "他們沒有好好{word_zh}這項新政策。"))
        ],
        '邏輯特徵': [
            (("That's a new {word}.", "那是個新的{word_zh}。"),
             ("I totally missed the {word} there.", "我完全沒抓到那裡的{word_zh}。")),
             (("It's a basic {word}.", "這是個很基礎的{word_zh}。"),
             ("He explained the core {word} clearly.", "他很清楚地解釋了核心的{word_zh}。"))
        ],
        '職場社交': [
            (("It requires good {word}.", "這很需要良好的{word_zh}。"),
             ("Her {word} is highly impressive.", "她的{word_zh}令人印象深刻。")),
             (("We need better {word}.", "我們需要更好的{word_zh}。"),
              ("Team {word} is crucial right now.", "團隊{word_zh}在現在超重要的。"))
        ],
        '日常用語': [
            (("That's a common {word}.", "那是一個很常見的{word_zh}。"),
             ("I use that {word} every single day.", "我每天都會用到那個{word_zh}。")),
             (("Is it {word}?", "這是{word_zh}嗎？"),
              ("We're dealing with a different {word} now.", "我們現在面對的是完全不同的{word_zh}。"))
        ],
        '基礎核心': [
            (("I get the {word}.", "我懂那個{word_zh}了。"),
             ("This is built on a solid {word}.", "這是建立在穩固的{word_zh}之上的。"))
        ]
    }
    
    generic = [
        (("That involves {word}.", "那牽涉到了{word_zh}。"),
         ("Let's talk about {word} for a sec.", "我們花一秒鐘來聊聊{word_zh}。")),
        (("That's a basic {word}.", "那是非常基礎的{word_zh}。"),
         ("I'm trying to master {word}.", "我正試著精通{word_zh}。"))
    ]
    
    pool = cat_templates.get(category, generic)
    h = int(hashlib.md5(word.encode()).hexdigest(), 16)
    selected = pool[h % len(pool)]
    
    learn = selected[0][0].replace("{word}", word.lower())
    learn_zh = selected[0][1].replace("{word_zh}", word_zh)
    ctx = selected[1][0].replace("{word}", word.lower())
    ctx_zh = selected[1][1].replace("{word_zh}", word_zh)
    
    return learn, learn_zh, ctx, ctx_zh

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'(const CORE_WORDS = )(\[.*?\]);', text, re.DOTALL)
if match:
    words = json.loads(match.group(2))
    for w in words:
        l, l_zh, c, c_zh = get_core_templates(w['word'], w.get('definition_zh', w['word']), w.get('category', ''))
        
        # Override with exact existing example if we want to preserve old context sentence
        if 'example' in w and w['example'] != '':
            if ' ' in w['word'] and w['word'].lower() not in ['figure out', 'wrap up', 'catch up', 'burn out', 'look forward to', 'on the same page', 'touch base', 'play it by ear', 'call it a day', 'take your time', 'make sense', 'so far, so good', 'out of the blue']:
                c = w['example']
                c_zh = w.get('example_zh', c_zh)
                l = f"Hey, {w['word'].lower()}!"
                l_zh = "嗨"
        
        # apply
        w['learn_sentence'] = l
        w['learn_sentence_zh'] = l_zh
        w['context_sentence'] = c
        w['context_sentence_zh'] = c_zh
        
        # Remove old fields
        w.pop('example', None)
        w.pop('example_zh', None)
        
    updated = json.dumps(words, ensure_ascii=False, indent=4)
    text = text[:match.start(2)] + updated + text[match.end(2):]

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("CORE_WORDS successfully transformed to dual sentences.")
