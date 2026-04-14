import json
import re
import hashlib

def get_template(word, category):
    templates = {
        '音樂風格': [
            "Miles Davis is a legendary figure in {word}.",
            "The band seamlessly blends elements of {word} into their tracks.",
            "I've been heavily influenced by early {word} records.",
            "That album really captures the essence of {word}.",
            "{word} music emerged and popularized quickly in that era.",
            "The distinct rhythm is a hallmark of {word}.",
            "We decided to play a {word} piece for the finale."
        ],
        '理論調式': [
            "Understanding {word} is essential for advanced composition.",
            "The progressive shift built on {word} gives the song its tension.",
            "Can you identify the {word} in the second measure?",
            "She spent hours analyzing the {word} of the classical piece.",
            "Pay close attention to the {word} when playing this section.",
            "The composer's use of {word} here is quite unorthodox.",
            "Practicing {word} will strictly improve your musical ear."
        ],
        '爵士語言': [
            "His improvisational solo heavily relied on {word}.",
            "In jazz, {word} is often used to add color to the chords.",
            "Let's try applying some {word} to this standard.",
            "The bassist laid down a solid {word} groove.",
            "Mastering {word} takes years of dedicated practice."
        ],
        '錄音製作': [
            "Let's add a bit more {word} to the vocal track.",
            "The engineer adjusted the {word} during the mixing phase.",
            "Too much {word} can muddy up the entire mix.",
            "We need to tweak the {word} settings on the master bus.",
            "I love the vintage sound of analog {word}.",
            "Make sure the {word} is properly configured before recording."
        ],
        '演奏技巧': [
            "The guitarist showcased incredible {word} during the break.",
            "This piece requires advanced {word} to be played correctly.",
            "Her {word} is so flawless it sounds almost electronic.",
            "Try to use {word} to make the phrase expressively.",
            "He has perfected his {word} over many years of touring."
        ],
        '行動描述': [
            "We need to thoroughly {word} the current situation.",
            "Management will {word} the new strategy next week.",
            "It is difficult to {word} the exact impact of the policy.",
            "Please {word} the documents before the meeting starts.",
            "They managed to {word} the problem efficiently."
        ],
        '邏輯特徵': [
            "It is a mistake to {word} that everything will go as planned.",
            "The core {word} behind this theory is quite complex.",
            "We must examine the {word} before drawing conclusions.",
            "Statistical {word} plays a key role in the research.",
            "That specific {word} makes the framework unique."
        ],
        '職場社交': [
            "He possesses the necessary {word} to lead the project.",
            "Building {word} with your team is crucial for success.",
            "She showed great {word} during the negotiations.",
            "It's important to maintain professional {word} at work.",
            "The manager will {word} the responsibilities evenly."
        ],
        '日常用語': [
            "Is the new software {word} for download yet?",
            "This approach has a significant {word} for everyone.",
            "Can you clarify the {word} for me once more?",
            "It is relatively easy to {word} this device.",
            "Having a good {word} makes all the difference."
        ],
        '基礎核心': [
            "A solid {word} is essential for future learning.",
            "They built the app on a very stable {word}.",
            "This concept represents the {word} of the subject.",
            "You need to grasp the {word} vocabulary first.",
            "The {word} remains perfectly unchanged."
        ]
    }
    
    generic = [
        "The concept of {word} is widely discussed.",
        "They provided an excellent context for {word}.",
        "Make sure you fully understand {word}."
    ]
    
    pool = templates.get(category, generic)
    
    h = int(hashlib.md5(word.encode()).hexdigest(), 16)
    template = pool[h % len(pool)]
    
    word_display = word
    if "{word}" in template and template.index("{word}") > 0:
        if word.upper() != word and " " not in word:
            word_display = word.lower()
            
    return template.replace("{word}", word_display)

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

music_match = re.search(r'(const MUSIC_WORDS = )(\[.*?\]);', content, re.DOTALL)
if music_match:
    music_words = json.loads(music_match.group(2))
    for w in music_words:
        w['example'] = get_template(w['word'], w.get('category', ''))
    
    updated_str = json.dumps(music_words, ensure_ascii=False, indent=4)
    content = content[:music_match.start(2)] + updated_str + content[music_match.end(2):]

core_match = re.search(r'(const CORE_WORDS = )(\[.*?\]);', content, re.DOTALL)
if core_match:
    core_words = json.loads(core_match.group(2))
    for w in core_words:
        w['example'] = get_template(w['word'], w.get('category', ''))
    
    updated_str = json.dumps(core_words, ensure_ascii=False, indent=4)
    content = content[:core_match.start(2)] + updated_str + content[core_match.end(2):]

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Examples updated successfully.")
