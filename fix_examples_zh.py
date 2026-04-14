import json
import re
import hashlib

def get_template_zh(word, word_zh, category):
    templates_zh = {
        '音樂風格': [
            "Miles Davis 是{word}領域的傳奇人物。",
            "這個樂團將{word}的元素完美融合進了他們的曲目中。",
            "我深受早期{word}唱片的影響。",
            "那張專輯真正捕捉到了{word}的精髓。",
            "{word}音樂在那個時代迅速出現並普及。",
            "獨特的節奏是{word}的標誌。",
            "我們決定在壓軸表演中演奏一首{word}曲目。"
        ],
        '理論調式': [
            "理解{word}對於進階作曲至關重要。",
            "建立在{word}上的漸進變化賦予了這首歌張力。",
            "你能聽出第二小節裡的{word}嗎？",
            "她花了好幾個小時分析這首古典樂曲的{word}。",
            "在演奏這個段落時，請密切注意{word}。",
            "作曲家在這裡對{word}的運用相當非傳統。",
            "練習{word}絕對能提升你的音感。"
        ],
        '爵士語言': [
            "他的即興獨奏非常依賴{word}。",
            "在爵士樂中，{word}常被用來為和弦增添色彩。",
            "我們試著在這首標準曲中應用一些{word}吧。",
            "貝斯手鋪墊了一個扎實的{word}律動。",
            "精通{word}需要多年專注的練習。"
        ],
        '錄音製作': [
            "讓我們在人聲軌道上多加一點{word}。",
            "工程師在混音階段調整了{word}。",
            "過多的{word}會讓整首混音變得混濁。",
            "我們需要微調總線上的{word}設定。",
            "我很喜歡類比{word}的復古聲音。",
            "在錄音前，請確保{word}已正確配置。"
        ],
        '演奏技巧': [
            "吉他手在間奏中展現了令人難以置信的{word}。",
            "這首曲子需要高階的{word}才能正確演奏。",
            "她的{word}完美無瑕，聽起來幾乎像是電子合成的。",
            "試著運用{word}讓這個樂句更加充滿情感。",
            "他透過多年的巡迴演出，將他的{word}磨練到了極致。"
        ],
        '行動描述': [
            "我們需要徹底{word}目前的狀況。",
            "管理層下週將{word}這項新策略。",
            "很難精確地測量該政策帶來什麼樣的{word}。",
            "請在會議開始前{word}這些文件。",
            "他們有效地成功{word}了這個問題。"
        ],
        '邏輯特徵': [
            "去{word}一切都會按計畫進行，是個錯誤。",
            "這個理論背後的核心{word}相當複雜。",
            "在得出結論之前，我們必須檢驗這個{word}。",
            "統計分析在這項研究中扮演了包含{word}的關鍵角色。",
            "那個特定的{word}讓這個框架與眾不同。"
        ],
        '職場社交': [
            "他具備領導這個專案所需的{word}。",
            "與你的團隊建立良好的{word}對於成功至關重要。",
            "她在談判中展現了極大的{word}。",
            "在工作上保持專業的{word}是很重要的。",
            "經理將會平均地分配與{word}這些責任。"
        ],
        '日常用語': [
            "這款新軟體已經開放提供{word}了嗎？",
            "這種方法對每個人都有顯著的{word}。",
            "你能再為我釐清一次這個{word}嗎？",
            "要{word}這個設備相對容易。",
            "擁有良好的{word}能帶來巨大的改變。"
        ],
        '基礎核心': [
            "一個穩固的{word}對於未來的學習不可或缺。",
            "他們將這個應用程式建立在一個非常穩定的{word}上。",
            "這個概念代表了這門學科的{word}。",
            "你必須先掌握與{word}相關的詞彙。",
            "這個{word}法則仍然保持著完美的不變性。"
        ]
    }
    
    generic = [
        "{word}這個概念被廣泛討論。",
        "他們為{word}提供了一個極佳的語境。",
        "請確保你完全理解了{word}。"
    ]
    
    pool = templates_zh.get(category, generic)
    
    # Needs to hash the English word so it matches the English template index exactly!
    h = int(hashlib.md5(word.encode()).hexdigest(), 16)
    template = pool[h % len(pool)]
    
    return template.replace("{word}", word_zh)

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

music_match = re.search(r'(const MUSIC_WORDS = )(\[.*?\]);', content, re.DOTALL)
if music_match:
    music_words = json.loads(music_match.group(2))
    for w in music_words:
        w['example_zh'] = get_template_zh(w['word'], w.get('definition_zh', w['word']), w.get('category', ''))
    
    updated_str = json.dumps(music_words, ensure_ascii=False, indent=4)
    content = content[:music_match.start(2)] + updated_str + content[music_match.end(2):]

core_match = re.search(r'(const CORE_WORDS = )(\[.*?\]);', content, re.DOTALL)
if core_match:
    core_words = json.loads(core_match.group(2))
    for w in core_words:
        w['example_zh'] = get_template_zh(w['word'], w.get('definition_zh', w['word']), w.get('category', ''))
    
    updated_str = json.dumps(core_words, ensure_ascii=False, indent=4)
    content = content[:core_match.start(2)] + updated_str + content[core_match.end(2):]

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Example ZH translations updated successfully with Chinese definitions.")
