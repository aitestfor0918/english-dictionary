import json
import re

# The original 100 academic/core words - now with proper American-style dual sentences
academic_words = [
    {
        "word": "Analyze", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈæn.ə.laɪz/", "definition_zh": "分析",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Let's analyze the data.", "learn_sentence_zh": "我們來分析一下這些數據。",
        "context_sentence": "We need to analyze what went wrong.", "context_sentence_zh": "我們得分析到底哪裡出問題了。"
    },
    {
        "word": "Approach", "type": "daily", "category": "行動描述",
        "phonetic": "/əˈproʊtʃ/", "definition_zh": "方式 / 處理",
        "definition_en": "Core Academic Word", "level": "medium",
        "learn_sentence": "Try a different approach.", "learn_sentence_zh": "試試不同的方式。",
        "context_sentence": "I like your approach to the problem.", "context_sentence_zh": "我喜歡你對這個問題的處理方式。"
    },
    {
        "word": "Assess", "type": "daily", "category": "行動描述",
        "phonetic": "/əˈses/", "definition_zh": "評估",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "We need to assess this.", "learn_sentence_zh": "我們需要先評估一下。",
        "context_sentence": "Can you assess the risk for me?", "context_sentence_zh": "你能幫我評估一下風險嗎？"
    },
    {
        "word": "Assume", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/əˈsuːm/", "definition_zh": "假設",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Don't assume that.", "learn_sentence_zh": "別就這樣假設。",
        "context_sentence": "I assumed she already knew about it.", "context_sentence_zh": "我以為她早就知道了。"
    },
    {
        "word": "Authority", "type": "daily", "category": "職場社交",
        "phonetic": "/əˈθɔːr.ɪ.ti/", "definition_zh": "權力 / 權威",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "She has authority here.", "learn_sentence_zh": "這裡她說了算。",
        "context_sentence": "He doesn't have the authority to make that call.", "context_sentence_zh": "他沒有權力做那個決定。"
    },
    {
        "word": "Available", "type": "daily", "category": "日常用語",
        "phonetic": "/əˈveɪ.lə.bəl/", "definition_zh": "可用的 / 有空的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "Are you available now?", "learn_sentence_zh": "你現在有空嗎？",
        "context_sentence": "I'm available after 3 if that works.", "context_sentence_zh": "我三點後有空，你看可以嗎？"
    },
    {
        "word": "Benefit", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈben.ɪ.fɪt/", "definition_zh": "好處 / 受益",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "What's the benefit?", "learn_sentence_zh": "好處是什麼？",
        "context_sentence": "The benefit of this plan is the speed.", "context_sentence_zh": "這個計畫的優勢在於速度。"
    },
    {
        "word": "Concept", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈkɑːn.sept/", "definition_zh": "概念",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Get the concept first.", "learn_sentence_zh": "先抓住這個概念。",
        "context_sentence": "The concept is simple but the execution is hard.", "context_sentence_zh": "概念很簡單，但執行起來卻很難。"
    },
    {
        "word": "Consistent", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/kənˈsɪs.tənt/", "definition_zh": "一致的",
        "definition_en": "Core Academic Adjective", "level": "medium",
        "learn_sentence": "Just stay consistent.", "learn_sentence_zh": "保持一致就好。",
        "context_sentence": "You need to be more consistent with practice.", "context_sentence_zh": "你的練習需要更有規律一點。"
    },
    {
        "word": "Context", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈkɑːn.tekst/", "definition_zh": "背景 / 情境",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Read the context.", "learn_sentence_zh": "看一下背景。",
        "context_sentence": "You need more context to understand this.", "context_sentence_zh": "你需要更多背景資訊才能理解這件事。"
    },
    {
        "word": "Create", "type": "daily", "category": "行動描述",
        "phonetic": "/kriˈeɪt/", "definition_zh": "創造",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "Let's create something.", "learn_sentence_zh": "讓我們來創造些東西。",
        "context_sentence": "She created a whole new system from scratch.", "context_sentence_zh": "她從零開始創建了一套全新的系統。"
    },
    {
        "word": "Data", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈdeɪ.t̬ə/", "definition_zh": "數據",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Check the data.", "learn_sentence_zh": "查一下數據。",
        "context_sentence": "The data doesn't support that conclusion.", "context_sentence_zh": "這些數據無法支撐那個結論。"
    },
    {
        "word": "Define", "type": "daily", "category": "行動描述",
        "phonetic": "/dɪˈfaɪn/", "definition_zh": "定義 / 說清楚",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Define what you mean.", "learn_sentence_zh": "把你的意思說清楚。",
        "context_sentence": "We need to define what success looks like.", "context_sentence_zh": "我們需要定義什麼叫做成功。"
    },
    {
        "word": "Environment", "type": "daily", "category": "日常用語",
        "phonetic": "/ɪnˈvaɪ.rən.mənt/", "definition_zh": "環境",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "It's a good environment.", "learn_sentence_zh": "這是個不錯的環境。",
        "context_sentence": "The work environment here is really healthy.", "context_sentence_zh": "這裡的工作環境真的很好。"
    },
    {
        "word": "Establish", "type": "daily", "category": "行動描述",
        "phonetic": "/ɪˈstæb.lɪʃ/", "definition_zh": "建立 / 確立",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Establish the basics first.", "learn_sentence_zh": "先把基礎建立好。",
        "context_sentence": "We need to establish trust before moving forward.", "context_sentence_zh": "我們在往前走之前需要先建立信任。"
    },
    {
        "word": "Evaluate", "type": "daily", "category": "行動描述",
        "phonetic": "/ɪˈvæl.ju.eɪt/", "definition_zh": "評估 / 評鑑",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Evaluate your options.", "learn_sentence_zh": "評估一下你的選擇。",
        "context_sentence": "Take time to evaluate before you decide.", "context_sentence_zh": "在做決定之前先花時間評估。"
    },
    {
        "word": "Evidence", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈev.ɪ.dəns/", "definition_zh": "證據",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Show me the evidence.", "learn_sentence_zh": "給我看看證據。",
        "context_sentence": "There's no evidence to support that claim.", "context_sentence_zh": "沒有任何證據能支持那個說法。"
    },
    {
        "word": "Factor", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈfæk.tɚ/", "definition_zh": "因素",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "That's a big factor.", "learn_sentence_zh": "那是個很重要的因素。",
        "context_sentence": "The weather was a major factor in the delay.", "context_sentence_zh": "天氣是造成延誤的一個主要因素。"
    },
    {
        "word": "Focus", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈfoʊ.kəs/", "definition_zh": "專注",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "Just focus.", "learn_sentence_zh": "專心就好。",
        "context_sentence": "I can't focus when it's this loud.", "context_sentence_zh": "這麼吵我根本沒辦法專心。"
    },
    {
        "word": "Function", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈfʌŋk.ʃən/", "definition_zh": "功能 / 運作",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "What's its function?", "learn_sentence_zh": "它的功能是什麼？",
        "context_sentence": "The app doesn't function properly on my phone.", "context_sentence_zh": "這個 App 在我手機上運作不太正常。"
    },
    {
        "word": "Identify", "type": "daily", "category": "行動描述",
        "phonetic": "/aɪˈden.t̬ɪ.faɪ/", "definition_zh": "識別 / 找出",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Identify the problem.", "learn_sentence_zh": "先找出問題在哪。",
        "context_sentence": "Can you identify what's causing this bug?", "context_sentence_zh": "你能找出這個 bug 的原因嗎？"
    },
    {
        "word": "Impact", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈɪm.pækt/", "definition_zh": "影響 / 衝擊",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "What's the impact?", "learn_sentence_zh": "影響是什麼？",
        "context_sentence": "This decision will have a huge impact.", "context_sentence_zh": "這個決定將會造成非常大的影響。"
    },
    {
        "word": "Indicate", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈɪn.dɪ.keɪt/", "definition_zh": "顯示 / 表明",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "The results indicate yes.", "learn_sentence_zh": "結果顯示是的。",
        "context_sentence": "The numbers indicate things are improving.", "context_sentence_zh": "這些數字顯示情況正在改善。"
    },
    {
        "word": "Interpret", "type": "daily", "category": "行動描述",
        "phonetic": "/ɪnˈtɝː.prɪt/", "definition_zh": "詮釋 / 解讀",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "How do you interpret this?", "learn_sentence_zh": "你怎麼解讀這個？",
        "context_sentence": "It's easy to interpret that the wrong way.", "context_sentence_zh": "這很容易被解讀錯方向。"
    },
    {
        "word": "Issue", "type": "daily", "category": "日常用語",
        "phonetic": "/ˈɪʃ.uː/", "definition_zh": "問題 / 議題",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "We have an issue.", "learn_sentence_zh": "我們有個問題。",
        "context_sentence": "The main issue is we're running out of time.", "context_sentence_zh": "主要的問題是我們時間不夠了。"
    },
    {
        "word": "Maintain", "type": "daily", "category": "行動描述",
        "phonetic": "/meɪnˈteɪn/", "definition_zh": "維持 / 保持",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Maintain the pace.", "learn_sentence_zh": "保持這個速度。",
        "context_sentence": "It's hard to maintain focus all day.", "context_sentence_zh": "要整天保持專注真的很難。"
    },
    {
        "word": "Major", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈmeɪ.dʒɚ/", "definition_zh": "主要的 / 重大的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "That's a major issue.", "learn_sentence_zh": "那是個重大的問題。",
        "context_sentence": "We hit a major roadblock yesterday.", "context_sentence_zh": "我們昨天遇到了一個重大的阻礙。"
    },
    {
        "word": "Method", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈmeθ.əd/", "definition_zh": "方法",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Try this method.", "learn_sentence_zh": "試試這個方法。",
        "context_sentence": "What method did you use to solve it?", "context_sentence_zh": "你用了什麼方法把它解決的？"
    },
    {
        "word": "Occur", "type": "daily", "category": "行動描述",
        "phonetic": "/əˈkɝː/", "definition_zh": "發生",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "That shouldn't occur.", "learn_sentence_zh": "那不應該發生才對。",
        "context_sentence": "Errors like this occur when the system is overloaded.", "context_sentence_zh": "系統過載時就會發生這樣的錯誤。"
    },
    {
        "word": "Policy", "type": "daily", "category": "職場社交",
        "phonetic": "/ˈpɑː.lɪ.si/", "definition_zh": "政策 / 規定",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "That's company policy.", "learn_sentence_zh": "那是公司的規定。",
        "context_sentence": "The new policy kicks in next month.", "context_sentence_zh": "新的規定從下個月開始生效。"
    },
    {
        "word": "Principle", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈprɪn.sɪ.pəl/", "definition_zh": "原則",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Stick to your principles.", "learn_sentence_zh": "堅守你的原則。",
        "context_sentence": "The principle behind this design is simplicity.", "context_sentence_zh": "這個設計背後的原則就是簡單。"
    },
    {
        "word": "Process", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈprɑː.ses/", "definition_zh": "過程 / 流程",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Trust the process.", "learn_sentence_zh": "相信這個過程。",
        "context_sentence": "The onboarding process takes about a week.", "context_sentence_zh": "入職流程大概需要一個星期。"
    },
    {
        "word": "Research", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈriː.sɝːtʃ/", "definition_zh": "研究",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Do your research.", "learn_sentence_zh": "做好你的功課。",
        "context_sentence": "I did some research before the interview.", "context_sentence_zh": "我在面試前做了一些功課調查。"
    },
    {
        "word": "Respond", "type": "daily", "category": "日常用語",
        "phonetic": "/rɪˈspɑːnd/", "definition_zh": "回應 / 回覆",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "Please respond ASAP.", "learn_sentence_zh": "請盡快回覆。",
        "context_sentence": "I'll respond to your email by end of day.", "context_sentence_zh": "我今天下班前會回覆你的 email。"
    },
    {
        "word": "Role", "type": "daily", "category": "職場社交",
        "phonetic": "/roʊl/", "definition_zh": "角色 / 職責",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "What's your role here?", "learn_sentence_zh": "你在這裡是什麼職責？",
        "context_sentence": "Her role is to manage client relationships.", "context_sentence_zh": "她的職責是管理客戶關係。"
    },
    {
        "word": "Significant", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/sɪɡˈnɪf.ɪ.kənt/", "definition_zh": "重要的 / 顯著的",
        "definition_en": "Core Academic Adjective", "level": "medium",
        "learn_sentence": "That's significant.", "learn_sentence_zh": "那很重要耶。",
        "context_sentence": "There's been a significant improvement this week.", "context_sentence_zh": "這個禮拜有了顯著的進步。"
    },
    {
        "word": "Source", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/sɔːrs/", "definition_zh": "來源",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "What's your source?", "learn_sentence_zh": "你的消息來源是哪裡？",
        "context_sentence": "Always check the source before sharing.", "context_sentence_zh": "分享之前一定要查一下來源。"
    },
    {
        "word": "Specific", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/spɪˈsɪf.ɪk/", "definition_zh": "具體的 / 明確的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "Can you be more specific?", "learn_sentence_zh": "你可以說得更具體嗎？",
        "context_sentence": "Give me a specific example.", "context_sentence_zh": "給我舉一個具體的例子。"
    },
    {
        "word": "Structure", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈstrʌk.tʃɚ/", "definition_zh": "結構 / 架構",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "The structure makes sense.", "learn_sentence_zh": "這個架構說得通。",
        "context_sentence": "The report needs a clearer structure.", "context_sentence_zh": "這份報告需要更清晰的結構。"
    },
    {
        "word": "Achieve", "type": "daily", "category": "行動描述",
        "phonetic": "/əˈtʃiːv/", "definition_zh": "達成",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Go achieve it.", "learn_sentence_zh": "去達成它吧。",
        "context_sentence": "What goals are you hoping to achieve this year?", "context_sentence_zh": "你今年希望達成哪些目標呢？"
    },
    {
        "word": "Affect", "type": "daily", "category": "行動描述",
        "phonetic": "/əˈfekt/", "definition_zh": "影響",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "It affects everyone.", "learn_sentence_zh": "它影響到每個人。",
        "context_sentence": "The delay affected the whole schedule.", "context_sentence_zh": "這次的延誤影響了整個時程。"
    },
    {
        "word": "Appropriate", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/əˈproʊ.pri.ɪt/", "definition_zh": "適當的",
        "definition_en": "Core Academic Adjective", "level": "medium",
        "learn_sentence": "Is that appropriate here?", "learn_sentence_zh": "那個在這裡適合嗎？",
        "context_sentence": "That's not really appropriate for a work meeting.", "context_sentence_zh": "那樣的行為在工作會議上不太適當。"
    },
    {
        "word": "Aspect", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈæs.pekt/", "definition_zh": "面向 / 方面",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Think about every aspect.", "learn_sentence_zh": "每個面向都要想到。",
        "context_sentence": "That's the best aspect of the whole plan.", "context_sentence_zh": "那是整個計畫裡最好的部分。"
    },
    {
        "word": "Category", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈkæt̬.ɪ.ɡɔːr.i/", "definition_zh": "類別",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Put it in a category.", "learn_sentence_zh": "把它分個類。",
        "context_sentence": "Which category does this fall under?", "context_sentence_zh": "這個屬於哪個類別？"
    },
    {
        "word": "Community", "type": "daily", "category": "职场社交",
        "phonetic": "/kəˈmjuː.nɪ.ti/", "definition_zh": "社群 / 社區",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Build your community.", "learn_sentence_zh": "建立你的社群。",
        "context_sentence": "She's very involved in the local community.", "context_sentence_zh": "她非常積極參與當地的社區活動。"
    },
    {
        "word": "Complex", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈkɑːm.pleks/", "definition_zh": "複雜的",
        "definition_en": "Core Academic Adjective", "level": "medium",
        "learn_sentence": "It's more complex than that.", "learn_sentence_zh": "這比你想的複雜多了。",
        "context_sentence": "The situation is way more complex than it looks.", "context_sentence_zh": "這個狀況比看起來複雜多了。"
    },
    {
        "word": "Conclude", "type": "daily", "category": "行動描述",
        "phonetic": "/kənˈkluːd/", "definition_zh": "得出結論",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "So we can conclude...", "learn_sentence_zh": "所以我們可以得出...",
        "context_sentence": "I concluded that the plan needs to change.", "context_sentence_zh": "我得出的結論是這個計畫需要改變。"
    },
    {
        "word": "Conduct", "type": "daily", "category": "行動描述",
        "phonetic": "/kənˈdʌkt/", "definition_zh": "進行 / 執行",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Conduct the test.", "learn_sentence_zh": "進行測試吧。",
        "context_sentence": "We conducted a survey across five cities.", "context_sentence_zh": "我們在五個城市進行了調查。"
    },
    {
        "word": "Consequence", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈkɑːn.sɪ.kwens/", "definition_zh": "後果",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Think about the consequences.", "learn_sentence_zh": "想想後果。",
        "context_sentence": "Every choice has consequences, good or bad.", "context_sentence_zh": "每個選擇都有後果，不管好的還是壞的。"
    },
    {
        "word": "Consumer", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/kənˈsuː.mɚ/", "definition_zh": "消費者",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "Know your consumer.", "learn_sentence_zh": "了解你的消費者。",
        "context_sentence": "Today's consumer expects things to be fast.", "context_sentence_zh": "現今的消費者期待一切都很迅速。"
    },
    {
        "word": "Credit", "type": "daily", "category": "日常用語",
        "phonetic": "/ˈkred.ɪt/", "definition_zh": "功勞 / 信用",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Give credit where due.", "learn_sentence_zh": "肯定該被肯定的人。",
        "context_sentence": "She never gets the credit she deserves.", "context_sentence_zh": "她付出的努力從來沒有得到應有的肯定。"
    },
    {
        "word": "Design", "type": "daily", "category": "行動描述",
        "phonetic": "/dɪˈzaɪn/", "definition_zh": "設計",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "I love this design.", "learn_sentence_zh": "我喜歡這個設計。",
        "context_sentence": "We need to redesign the whole user flow.", "context_sentence_zh": "我們需要重新設計整個使用者流程。"
    },
    {
        "word": "Distinct", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/dɪˈstɪŋkt/", "definition_zh": "明顯的 / 獨特的",
        "definition_en": "Core Academic Adjective", "level": "medium",
        "learn_sentence": "It's very distinct.", "learn_sentence_zh": "這個非常獨特。",
        "context_sentence": "Her style is completely distinct from everyone else.", "context_sentence_zh": "她的風格跟所有人都完全不同。"
    },
    {
        "word": "Element", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈel.ɪ.mənt/", "definition_zh": "元素 / 要素",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "That's a key element.", "learn_sentence_zh": "那是個關鍵元素。",
        "context_sentence": "Trust is an essential element of any relationship.", "context_sentence_zh": "信任是任何一段關係的必要要素。"
    },
    {
        "word": "Feature", "type": "daily", "category": "日常用語",
        "phonetic": "/ˈfiː.tʃɚ/", "definition_zh": "特色 / 功能",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "That's a cool feature.", "learn_sentence_zh": "那個功能很酷。",
        "context_sentence": "My favorite feature is the dark mode.", "context_sentence_zh": "我最喜歡的功能就是深色模式。"
    },
    {
        "word": "Invest", "type": "daily", "category": "行動描述",
        "phonetic": "/ɪnˈvest/", "definition_zh": "投資 / 投入",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Invest in yourself.", "learn_sentence_zh": "投資在自己身上。",
        "context_sentence": "You should invest more time in this skill.", "context_sentence_zh": "你應該在這個技能上多投入一些時間。"
    },
    {
        "word": "Normal", "type": "daily", "category": "日常用語",
        "phonetic": "/ˈnɔːr.məl/", "definition_zh": "正常的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "That's totally normal.", "learn_sentence_zh": "那是完全正常的。",
        "context_sentence": "Is it normal to feel this tired after work?", "context_sentence_zh": "下班後這麼累是正常的嗎？"
    },
    {
        "word": "Obtain", "type": "daily", "category": "行動描述",
        "phonetic": "/əbˈteɪn/", "definition_zh": "取得 / 獲得",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Obtain the permit first.", "learn_sentence_zh": "先取得許可。",
        "context_sentence": "How did you obtain this information?", "context_sentence_zh": "你是怎麼取得這些資訊的？"
    },
    {
        "word": "Participate", "type": "daily", "category": "職場社交",
        "phonetic": "/pɑːrˈtɪs.ɪ.peɪt/", "definition_zh": "參與",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Participate more.", "learn_sentence_zh": "多多參與吧。",
        "context_sentence": "Everyone is encouraged to participate in the discussion.", "context_sentence_zh": "大家都被鼓勵積極參與討論。"
    },
    {
        "word": "Perceive", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/pɚˈsiːv/", "definition_zh": "察覺 / 認為",
        "definition_en": "Core Academic Verb", "level": "hard",
        "learn_sentence": "How do you perceive it?", "learn_sentence_zh": "你怎麼看待這件事？",
        "context_sentence": "She perceived the silence as a sign of disapproval.", "context_sentence_zh": "她把沉默解讀為一種不認可的訊號。"
    },
    {
        "word": "Positive", "type": "daily", "category": "日常用語",
        "phonetic": "/ˈpɑː.zɪ.tɪv/", "definition_zh": "正面的 / 積極的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "Stay positive.", "learn_sentence_zh": "保持積極。",
        "context_sentence": "The feedback has been really positive so far.", "context_sentence_zh": "目前為止收到的回饋都是非常正面的。"
    },
    {
        "word": "Potential", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/pəˈten.ʃəl/", "definition_zh": "潛力 / 潛在的",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "You have real potential.", "learn_sentence_zh": "你真的有潛力。",
        "context_sentence": "There's massive potential in this market.", "context_sentence_zh": "這個市場有非常大的潛力。"
    },
    {
        "word": "Previous", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈpriː.vi.əs/", "definition_zh": "之前的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "Unlike the previous version.", "learn_sentence_zh": "跟之前的版本不一樣。",
        "context_sentence": "My previous job was way more stressful.", "context_sentence_zh": "我之前的工作壓力大多了。"
    },
    {
        "word": "Primary", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈpraɪ.mer.i/", "definition_zh": "主要的 / 首要的",
        "definition_en": "Core Academic Adjective", "level": "medium",
        "learn_sentence": "That's the primary goal.", "learn_sentence_zh": "那才是首要目標。",
        "context_sentence": "Our primary concern right now is speed.", "context_sentence_zh": "我們現在最主要的考量是速度。"
    },
    {
        "word": "Purchase", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈpɝː.tʃəs/", "definition_zh": "購買",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "Ready to purchase?", "learn_sentence_zh": "準備好購買了嗎？",
        "context_sentence": "I'll make the purchase once I get approval.", "context_sentence_zh": "我等到得到批准之後再去買。"
    },
    {
        "word": "Range", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/reɪndʒ/", "definition_zh": "範圍 / 幅度",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "It's within range.", "learn_sentence_zh": "在範圍之內。",
        "context_sentence": "The price range is way out of my budget.", "context_sentence_zh": "這個價格範圍完全超出我的預算。"
    },
    {
        "word": "Region", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈriː.dʒən/", "definition_zh": "地區",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "It depends on the region.", "learn_sentence_zh": "依地區而有所不同。",
        "context_sentence": "The app is only available in certain regions.", "context_sentence_zh": "這個 App 目前只在特定地區開放使用。"
    },
    {
        "word": "Require", "type": "daily", "category": "行動描述",
        "phonetic": "/rɪˈkwaɪɚ/", "definition_zh": "需要 / 要求",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "What does it require?", "learn_sentence_zh": "它需要什麼條件？",
        "context_sentence": "The job requires a lot of patience.", "context_sentence_zh": "這份工作需要很大的耐心。"
    },
    {
        "word": "Similar", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈsɪm.ɪ.lɚ/", "definition_zh": "類似的",
        "definition_en": "Core Academic Adjective", "level": "easy",
        "learn_sentence": "It's similar to mine.", "learn_sentence_zh": "這跟我的挺像的。",
        "context_sentence": "I've seen a similar situation at my last job.", "context_sentence_zh": "我在上份工作遇過類似的情況。"
    },
    {
        "word": "Theory", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈθɪr.i/", "definition_zh": "理論",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "That's just a theory.", "learn_sentence_zh": "那只是個理論而已。",
        "context_sentence": "In theory it works, but in practice it doesn't.", "context_sentence_zh": "理論上是可行的，但實際上卻行不通。"
    },
    {
        "word": "Outcome", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ˈaʊt.kʌm/", "definition_zh": "結果 / 成果",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "What's the outcome?", "learn_sentence_zh": "最後結果是什麼？",
        "context_sentence": "The outcome depends on how hard we push.", "context_sentence_zh": "最終的成果取決於我們有多賣力。"
    },
    {
        "word": "Challenge", "type": "daily", "category": "日常用語",
        "phonetic": "/ˈtʃæl.ɪndʒ/", "definition_zh": "挑戰",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "That's a real challenge.", "learn_sentence_zh": "那真的是個很大的挑戰。",
        "context_sentence": "The biggest challenge is keeping everyone motivated.", "context_sentence_zh": "最大的挑戰是讓所有人保持動力。"
    },
    {
        "word": "Strategy", "type": "daily", "category": "職場社交",
        "phonetic": "/ˈstræt̬.ɪ.dʒi/", "definition_zh": "策略",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "We need a strategy.", "learn_sentence_zh": "我們需要一個策略。",
        "context_sentence": "What's the strategy going into Q4?", "context_sentence_zh": "進入第四季的策略是什麼？"
    },
    {
        "word": "Involve", "type": "daily", "category": "邏輯特徵",
        "phonetic": "/ɪnˈvɑːlv/", "definition_zh": "涉及 / 包含",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "What does it involve?", "learn_sentence_zh": "這涉及到什麼？",
        "context_sentence": "The project involves a lot of coordination.", "context_sentence_zh": "這個專案涉及到很多協調工作。"
    },
    {
        "word": "Solution", "type": "daily", "category": "行動描述",
        "phonetic": "/səˈluː.ʃən/", "definition_zh": "解決方案",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Find a solution.", "learn_sentence_zh": "找個解決辦法。",
        "context_sentence": "There's always a solution if you think creatively.", "context_sentence_zh": "只要你有創意地去想，總是有解決方法的。"
    },
    {
        "word": "Support", "type": "daily", "category": "職場社交",
        "phonetic": "/səˈpɔːrt/", "definition_zh": "支持 / 協助",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "I support you on this.", "learn_sentence_zh": "我在這件事上支持你。",
        "context_sentence": "The team fully supports the new direction.", "context_sentence_zh": "整個團隊完全支持這個新方向。"
    },
    {
        "word": "Target", "type": "daily", "category": "職場社交",
        "phonetic": "/ˈtɑːr.ɡɪt/", "definition_zh": "目標",
        "definition_en": "Core Academic Noun", "level": "easy",
        "learn_sentence": "Hit the target.", "learn_sentence_zh": "達成目標。",
        "context_sentence": "We're on track to hit our sales target.", "context_sentence_zh": "我們正朝達成銷售目標的方向前進。"
    },
    {
        "word": "Adjust", "type": "daily", "category": "行動描述",
        "phonetic": "/əˈdʒʌst/", "definition_zh": "調整",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "Adjust accordingly.", "learn_sentence_zh": "照著調整一下。",
        "context_sentence": "We may need to adjust the timeline.", "context_sentence_zh": "我們可能需要調整一下時間表。"
    },
    {
        "word": "Confirm", "type": "daily", "category": "職場社交",
        "phonetic": "/kənˈfɝːm/", "definition_zh": "確認",
        "definition_en": "Core Academic Verb", "level": "easy",
        "learn_sentence": "Can you confirm this?", "learn_sentence_zh": "你能確認一下嗎？",
        "context_sentence": "Please confirm your attendance by Friday.", "context_sentence_zh": "請在週五前確認你是否出席。"
    },
    {
        "word": "Clarify", "type": "daily", "category": "行動描述",
        "phonetic": "/ˈklær.ɪ.faɪ/", "definition_zh": "釐清 / 說明",
        "definition_en": "Core Academic Verb", "level": "medium",
        "learn_sentence": "Let me clarify that.", "learn_sentence_zh": "讓我澄清一下這個。",
        "context_sentence": "Can you clarify what you meant by that?", "context_sentence_zh": "你能解釋一下你說的那個是什麼意思嗎？"
    },
    {
        "word": "Priority", "type": "daily", "category": "職場社交",
        "phonetic": "/praɪˈɔːr.ɪ.ti/", "definition_zh": "優先事項",
        "definition_en": "Core Academic Noun", "level": "medium",
        "learn_sentence": "What's the priority?", "learn_sentence_zh": "現在優先要做什麼？",
        "context_sentence": "Customer satisfaction is our top priority.", "context_sentence_zh": "客戶滿意度是我們首要的工作。"
    },
    {
        "word": "Assume responsibility", "type": "daily", "category": "職場社交",
        "phonetic": "/əˈsuːm rɪˌspɑːn.sɪˈbɪl.ɪ.ti/", "definition_zh": "承擔責任",
        "definition_en": "Core Academic Phrase", "level": "medium",
        "learn_sentence": "Own up and assume responsibility.", "learn_sentence_zh": "承認並且承擔起責任。",
        "context_sentence": "A good leader assumes responsibility when things go wrong.", "context_sentence_zh": "好的領導者在事情出問題時會承擔責任。"
    }
]

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'(const CORE_WORDS = )(\[.*?\]);', text, re.DOTALL)
if match:
    existing = json.loads(match.group(2))
    existing_lower = {w['word'].lower() for w in existing}
    
    added = 0
    for w in academic_words:
        if w['word'].lower() not in existing_lower:
            existing.append(w)
            existing_lower.add(w['word'].lower())
            added += 1
    
    print(f"Added {added} academic words. Total core: {len(existing)}")
    
    updated = json.dumps(existing, ensure_ascii=False, indent=4)
    text = text[:match.start(2)] + updated + text[match.end(2):]

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done!")
