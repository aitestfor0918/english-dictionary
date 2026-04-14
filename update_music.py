import json
import re
import hashlib

def get_templates(word, word_zh, category):
    # Format: [ (learn, learn_zh), (context, context_zh) ]
    
    cat_templates = {
        '音樂風格': [
            (("I really dig {word}.", "我滿喜歡{word_zh}的。"),
             ("We jammed some {word} last night.", "我們昨晚即興玩了一些{word_zh}。")),
             
            (("He's super into {word}.", "他超迷{word_zh}的。"),
             ("That track has a heavy {word} vibe.", "那首歌有很重的{word_zh}氛圍。")),
             
            (("That's pure {word}.", "那根本是純正的{word_zh}。"),
             ("I grew up listening to a lot of {word}.", "我從小聽很多{word_zh}長大。")),
             
            (("Put on some {word}.", "播點{word_zh}吧。"),
             ("They totally nailed that {word} feel.", "他們完美抓住了那個{word_zh}特有的感覺。")),
             
            (("I play a bit of {word}.", "我會彈一點{word_zh}。"),
             ("We need a better {word} groove here.", "我們這裡需要更好的{word_zh}律動。"))
        ],
        '理論調式': [
            (("That's a tricky {word}.", "那個{word_zh}有點難搞。"),
             ("I'm still practicing my {word}.", "我還在練我的{word_zh}。")),
             
            (("Watch out for the {word}.", "注意那邊的{word_zh}。"),
             ("His solo was packed with cool {word}.", "他的獨奏塞滿了很酷的{word_zh}。")),
             
            (("Let's break down this {word}.", "我們來拆解這個{word_zh}。"),
             ("Can you hear the {word} in there?", "你有聽出裡面的{word_zh}嗎？")),
             
             (("It's all about the {word}.", "重點全在這個{word_zh}。"),
             ("Try adding some {word} to the progression.", "試著在和弦進行裡加點{word_zh}。")),
             
             (("I struggle with {word}.", "我對{word_zh}超不拿手。"),
              ("That {word} completely changed the mood.", "那個{word_zh}徹底改變了整體的氛圍。"))
        ],
        '爵士語言': [
            (("Nice {word} man.", "老兄，那個{word_zh}很讚。"),
             ("We're gonna work on your {word} today.", "我們今天要來練練你的{word_zh}。")),
             
            (("That was a sick {word}.", "剛剛那個{word_zh}太神了。"),
             ("Just focus on the {word} for now.", "你先專注在那個{word_zh}就好。")),
             
             (("I missed the {word}.", "我漏掉了那個{word_zh}。"),
              ("He always uses the same {word}.", "他老是用一樣的{word_zh}。")),
              
             (("Keep the {word} tight.", "把{word_zh}彈緊一點。"),
              ("Let's try a different {word} here.", "我們在這裡試著換個不一樣的{word_zh}。"))
        ],
        '錄音製作': [
            (("Needs more {word}.", "需要多加一點{word_zh}。"),
             ("The mix lacks a bit of {word}.", "這次混音少了一點{word_zh}的味道。")),
             
            (("Tweak the {word} a bit.", "稍微調一下那個{word_zh}。"),
             ("I love the analog {word} on this track.", "我很愛這軌極具類比感的{word_zh}。")),
             
            (("Watch the {word} levels.", "盯緊{word_zh}的音量。"),
             ("Can we bypass the {word} for a sec?", "我們可以先關掉那個{word_zh}聽聽看嗎？")),
             
             (("Boost the {word} right there.", "在那邊把{word_zh}推大聲一點。"),
              ("That plugin ruined the entire {word}.", "那個外掛徹底毀了整個{word_zh}。"))
        ],
        '演奏技巧': [
            (("Your {word} is getting better.", "你的{word_zh}有在進步喔。"),
             ("I can't seem to get this {word} right.", "我怎麼也搞不定這個{word_zh}。")),
             
            (("Work on your {word}.", "多練練你的{word_zh}。"),
             ("Her {word} is absolutely crazy.", "她的{word_zh}真的太瘋狂了。")),
             
             (("Show me that {word} again.", "再示範一次那個{word_zh}給我看。"),
              ("We need to tighten up the {word}.", "我們得把那個{word_zh}彈得更精準一點。")),
              
            (("That {word} is killer.", "那個{word_zh}太殺了。"),
             ("I totally messed up the {word} part.", "我把{word_zh}那個段落全彈爛了。"))
        ]
    }
    
    generic = [
        (("I'm working on {word}.", "我正在研究{word_zh}。"),
         ("Let's talk about {word} for a sec.", "我們來聊一下{word_zh}吧。")),
        (("That's a basic {word}.", "那是個很基礎的{word_zh}。"),
         ("He showed me a cool trick with {word}.", "他教了我一招很酷的{word_zh}技巧。"))
    ]
    
    pool = cat_templates.get(category, generic)
    
    h = int(hashlib.md5(word.encode()).hexdigest(), 16)
    selected = pool[h % len(pool)]
    
    learn = selected[0][0].replace("{word}", word.lower() if category != "音樂風格" else word.capitalize())
    learn_zh = selected[0][1].replace("{word_zh}", word_zh)
    ctx = selected[1][0].replace("{word}", word.lower() if category != "音樂風格" else word.capitalize())
    ctx_zh = selected[1][1].replace("{word_zh}", word_zh)
    
    return learn, learn_zh, ctx, ctx_zh

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'(const MUSIC_WORDS = )(\[.*?\]);', text, re.DOTALL)
if match:
    words = json.loads(match.group(2))
    for w in words:
        l, l_zh, c, c_zh = get_templates(w['word'], w.get('definition_zh', w['word']), w.get('category', ''))
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

print("MUSIC_WORDS successfully transformed to dual sentences.")
