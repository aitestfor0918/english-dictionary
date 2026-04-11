/**
 * 個人英文字典 App - Logic
 */

const INITIAL_DATA = [
    {
      "word": "groove",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ɡruːv/",
      "definition_zh": "律動感",
      "definition_en": "rhythmic feel",
      "explanation": "指樂手之間在節奏上的默契與共鳴。當大家都精準對在拍點上且感覺對了，就會產生一種讓人想跟著搖擺的能量。",
      "example": "This drummer has a serious groove! We should definitely hire him.",
      "level": "easy"
    },
    {
      "word": "tempo",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈtem.poʊ/",
      "definition_zh": "速度",
      "definition_en": "speed of music",
      "explanation": "音樂進行的快慢。通常用 BPM (Beats Per Minute) 來衡量。保持穩定的速度是專業樂手的基本功。",
      "example": "We need to push the tempo a bit in the chorus to make it more exciting.",
      "level": "easy"
    },
    {
      "word": "syncopation",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˌsɪŋ.kəˈpeɪ.ʃən/",
      "definition_zh": "切分音",
      "definition_en": "rhythm with off-beat accents",
      "explanation": "把強音點移到弱拍或後半拍，打破原有的節奏規律感。這是讓爵士與放克音樂（Funk）聽起來很有「彈性」的關鍵。",
      "example": "Try to accentuate the syncopation in the bridge; it feels a bit too straight right now.",
      "level": "medium"
    },
    {
      "word": "riff",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/rɪf/",
      "definition_zh": "重複句 / 樂句段落",
      "definition_en": "short repeated phrase",
      "explanation": "一段簡單、好記且不斷重複的樂句。通常是歌曲的靈魂，像很多經典搖滾歌一聽前奏的 riff 就知道了。",
      "example": "That guitar riff is so catchy, everyone will be humming it by the end of the night.",
      "level": "easy"
    },
    {
      "word": "improvise",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˈɪmprəvaɪz/",
      "definition_zh": "即興",
      "definition_en": "create music spontaneously",
      "explanation": "不照著樂譜，而是在當下根據和弦進行即時創作樂句。這是樂手展現個人特色與創意最高級的方式。",
      "example": "I didn't prepare a solo for this part, so I'm just going to improvise and see what happens.",
      "level": "easy"
    },
    {
      "word": "pitch",
      "type": "music",
      "category": "Performance",
      "phonetic": "/pɪtʃ/",
      "definition_zh": "音高 / 音準",
      "definition_en": "highness or lowness of a note",
      "explanation": "聲音的高度，也就是我們說的「音準」。如果你唱的或吹的音不在正確的頻率上，人家就會說你 'out of pitch' (走音)。",
      "example": "Your pitch was a little flat on that high note. Can we try it again?",
      "level": "easy"
    },
    {
      "word": "tone",
      "type": "music",
      "category": "Performance",
      "phonetic": "/toʊn/",
      "definition_zh": "音色 / 音質",
      "definition_en": "sound quality",
      "explanation": "聲音的質感。即使唱同一個音，每個人的聲音感覺都不一樣。好的樂手會花很多時間研究如何讓自己的 tone 聽起來很平衡、有深度。",
      "example": "I really love your guitar tone on this track; it sounds so warm and vintage.",
      "level": "easy"
    },
    {
      "word": "dynamics",
      "type": "music",
      "category": "Performance",
      "phonetic": "/daɪˈnæmɪks/",
      "definition_zh": "力度變化",
      "definition_en": "volume variation",
      "explanation": "音樂中強弱層次的變化。如果一首歌從頭到尾都一樣大聲，聽起來會很平淡。學會控制 dynamics 是讓音樂有靈魂的關鍵。",
      "example": "The chorus needs more dynamics. Start soft and build up to a huge finish!",
      "level": "medium"
    },
    {
      "word": "rhythm",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈrɪðəm/",
      "definition_zh": "節奏",
      "definition_en": "pattern of beats",
      "explanation": "長短音符與拍號組合出的規律。節奏感（sense of rhythm）是所有樂器的根基，沒了它就只是一堆散亂的音符。",
      "example": "The rhythm section needs to stay locked in; we're starting to drift apart.",
      "level": "easy"
    },
    {
      "word": "beat",
      "type": "music",
      "category": "Performance",
      "phonetic": "/biːt/",
      "definition_zh": "拍子 / 節拍",
      "definition_en": "basic time unit",
      "explanation": "音樂中最基本的計時單位，就像心跳一樣。當你跟著音樂點頭或踏腳時，你對上的就是那個 beat。",
      "example": "Can you hear the beat? Just snap your fingers along with the snare drum.",
      "level": "easy"
    },
    {
      "word": "meter",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈmiːtər/",
      "definition_zh": "拍號 / 節拍度量",
      "definition_en": "grouping of beats",
      "explanation": "決定一小節內有多少拍，以及哪一拍是強拍。最常見的是 4/4 拍（所謂的 common time），也有 3/4 拍或更複雜的奇數拍。",
      "example": "Wait, is this in 4/4 or 3/4? The meter feels a bit unusual for a pop song.",
      "level": "medium"
    },
    {
      "word": "scale",
      "type": "music",
      "category": "Performance",
      "phonetic": "/skeɪl/",
      "definition_zh": "音階",
      "definition_en": "sequence of notes",
      "explanation": "一組按照高低順序排列的音。就像蓋房子的材料包，不同的尺度（scale）會創造出完全不同的情緒感覺（如大調或小調）。",
      "example": "I spent three hours just practicing my major scales today. My fingers are exhausted!",
      "level": "easy"
    },
    {
      "word": "chord",
      "type": "music",
      "category": "Performance",
      "phonetic": "/kɔːrd/",
      "definition_zh": "和弦",
      "definition_en": "notes played together",
      "explanation": "三個或三個以上的音同時響起。和弦組合在一起就形成了「和弦進行」（chord progression），這是支撑一首歌旋律的骨架。",
      "example": "What chord are you playing there? It sounds like a major seventh.",
      "level": "easy"
    },
    {
      "word": "harmony",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈhɑːrməni/",
      "definition_zh": "和聲",
      "definition_en": "combination of notes",
      "explanation": "不同音高同時響起所產生的悅耳或衝突感。好的和聲能讓簡單的旋律變得非常豐富且有動人的情感色彩。",
      "example": "The vocal harmonies in the bridge are absolutely stunning. They really add depth to the song.",
      "level": "easy"
    },
    {
      "word": "melody",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈmelədi/",
      "definition_zh": "旋律 / 曲調",
      "definition_en": "main tune",
      "explanation": "一連串高低起伏的音符組成的悅耳線條，也就是我們平常會跟著哼唱的那部分。它是音樂的臉孔，最容易被聽眾記住。",
      "example": "The melody is so catchy; I've had it stuck in my head all day!",
      "level": "easy"
    },
    {
      "word": "phrase",
      "type": "music",
      "category": "Performance",
      "phonetic": "/freɪz/",
      "definition_zh": "樂句",
      "definition_en": "musical sentence",
      "explanation": "音樂中的一個完整段落，就像說話時的一個句子。學會在哪裡斷句、在哪裡呼吸，是讓音樂聽起來自然流暢的關鍵。",
      "example": "Try to finish the whole phrase in one breath; don't break it up in the middle.",
      "level": "easy"
    },
    {
      "word": "phrasing",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈfreɪzɪŋ/",
      "definition_zh": "樂句處理 / 語法",
      "definition_en": "how phrases are played",
      "explanation": "樂手如何表現一個樂句的方式。包括強弱變化、斷句點、以及音符之間的連接。好的 phrasing 能讓音樂聽起來像是在對聽眾說話。",
      "example": "Your phrasing is very elegant, but maybe add a bit more attack at the beginning of the line.",
      "level": "medium"
    },
    {
      "word": "articulation",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ɑːrˌtɪkjəˈleɪʃən/",
      "definition_zh": "發音法 / 運音法",
      "definition_en": "note execution style",
      "explanation": "指音符被演奏出來的具體方式，如斷奏（staccato）或連奏（legato）。就像說話時的發音是否清晰、輕重音在哪裡一樣。",
      "example": "Pay attention to your articulation; the fast passages need to sound very crisp and distinct.",
      "level": "medium"
    },
    {
      "word": "legato",
      "type": "music",
      "category": "Performance",
      "phonetic": "/lɪˈɡɑːtoʊ/",
      "definition_zh": "連奏 / 連續的",
      "definition_en": "smooth playing",
      "explanation": "要求音符之間不留任何空隙，非常圓滑地連接在一起。聽起來會像是一條流動的水流，充滿優雅感。",
      "example": "This section should be played very legato to create a dreamlike atmosphere.",
      "level": "easy"
    },
    {
      "word": "staccato",
      "type": "music",
      "category": "Performance",
      "phonetic": "/stəˈkɑːtoʊ/",
      "definition_zh": "斷奏 / 輕快短促",
      "definition_en": "short detached notes",
      "explanation": "音符彈得非常短促、輕快，且每個音之間都有明顯的空隙。聽起來會非常有節奏感且帶點俏皮味。",
      "example": "Try to make these eighth notes more staccato; they need to sound bouncy.",
      "level": "easy"
    },
    {
      "word": "accent",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈæk.sent/",
      "definition_zh": "重音",
      "definition_en": "emphasis on a note",
      "explanation": "對某個特定的音給予特別的強調，通常彈得比周圍的音稍微大聲或是更有攻擊感。它是引導聽眾注意節奏重心的重要手段。",
      "example": "Make sure to hit the accent on the first beat of every bar.",
      "level": "easy"
    },
    {
      "word": "solo",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˈsoʊloʊ/",
      "definition_zh": "獨奏 / 即興段落",
      "definition_en": "play alone",
      "explanation": "由一位樂手主導演奏的段落。在爵士樂中，這通常是即興創作的時間，讓樂手可以自由展現個人才華與創意。",
      "example": "The saxophone solo in the middle of the song was absolutely brilliant!",
      "level": "easy"
    },
    {
      "word": "lick",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/lɪk/",
      "definition_zh": "樂句片段 / 即興素材",
      "definition_en": "short practiced phrase",
      "explanation": "常規練習中累積下來的一段經典短小樂句。就像說話時的成語或常用語，樂手可以把它運用在即興中讓旋律聽起來更有說服力。",
      "example": "He played that classic Charlie Parker lick during his piano solo.",
      "level": "easy"
    },
    {
      "word": "swing",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/swɪŋ/",
      "definition_zh": "搖擺感 / 切分律動",
      "definition_en": "uneven rhythmic feel",
      "explanation": "一種讓音樂聽起來「彈跳」的節奏感覺。它是將原本平分的拍子變成長短不一的感覺（長-短、長-短），是爵士樂最核心的靈魂。",
      "example": "This tune doesn't feel right; you need to add more swing to those eighth notes.",
      "level": "medium"
    },
    {
      "word": "arrangement",
      "type": "music",
      "category": "Performance",
      "phonetic": "/əˈreɪndʒmənt/",
      "definition_zh": "編曲 / 編排",
      "definition_en": "structure of music",
      "explanation": "決定一首歌中不同樂器的層次、何時開始演奏、和弦如何配置。好的編曲可以賦予旋律全新的生命力。",
      "example": "I really like the string arrangement on this track; it makes the chorus sound so cinematic.",
      "level": "medium"
    },
    {
      "word": "orchestration",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˌɔːrkɪˈstreɪʃən/",
      "definition_zh": "配器 / 樂器配置",
      "definition_en": "instrument distribution",
      "explanation": "具體決定每一部樂器（如小提琴、小號、長笛）該彈奏什麼音符，以達到預期的交響效果。這需要對不同樂器的音域和音色有極深的了解。",
      "example": "The orchestration for the final movement is breathtaking; the way the brass and woodwinds interact is genius.",
      "level": "hard"
    },
    {
      "word": "recording",
      "type": "music",
      "category": "Recording",
      "phonetic": "/rɪˈkɔːrdɪŋ/",
      "definition_zh": "錄音",
      "definition_en": "capturing sound",
      "explanation": "使用麥克風或線路輸入，將聲音訊號保存到電腦或磁帶中的過程。錄音時的空間感、麥克風位置對成品影響巨大。",
      "example": "We're heading into the studio tomorrow for a three-day recording session.",
      "level": "easy"
    },
    {
      "word": "mixing",
      "type": "music",
      "category": "Recording",
      "phonetic": "/ˈmɪksɪŋ/",
      "definition_zh": "混音",
      "definition_en": "balancing tracks",
      "explanation": "將錄製好的多個轨道（如人聲、鼓、吉他）進行音量平衡、頻率調整 (EQ) 與效果處理，融成人聲、樂器層次分明且悅耳的作品。",
      "example": "The drums are a bit too loud in the mix; we need to pull them back and add some reverb.",
      "level": "medium"
    },
    {
      "word": "mastering",
      "type": "music",
      "category": "Recording",
      "phonetic": "/ˈmæstərɪŋ/",
      "definition_zh": "母帶處理",
      "definition_en": "final audio polish",
      "explanation": "製作過程的最後一關。對混音後的成品進行最後的量化處理與頻率微調，確保在各種播放設備上聽起來都專業且一致。",
      "example": "Once the mastering is done, the album will be ready for digital release.",
      "level": "hard"
    },
    {
      "word": "gain",
      "type": "music",
      "category": "Recording",
      "phonetic": "/ɡeɪn/",
      "definition_zh": "增益 / 輸入電平",
      "definition_en": "input level",
      "explanation": "指訊號進入設備（如擴大機或錄音介面）時的強度。調高 gain 會增加訊號的靈敏度，但也可能導致聲音失真（distortion）。",
      "example": "Your guitar signal is too quiet; try bumping up the gain a bit on the preamp.",
      "level": "easy"
    },
    {
      "word": "volume",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈvɑːljuːm/",
      "definition_zh": "音量 / 響度",
      "definition_en": "loudness",
      "explanation": "指聲音的大小。在表演中，控制 volume 也是表達情感的一種方式（dynamics）。有時候大家彈得太過大聲（too loud），反而會蓋過主旋律。",
      "example": "Can you turn down the volume of the guitar? It's overpowering the vocals.",
      "level": "easy"
    },
    {
      "word": "feedback",
      "type": "music",
      "category": "Live",
      "phonetic": "/ˈfiːdbæk/",
      "definition_zh": "回授 / 嘯叫",
      "definition_en": "looping sound noise",
      "explanation": "當喇叭發出的聲音又被麥克風或拾音器收進去，形成一個無限循環的刺耳尖叫聲。在現場演出中，這是音控師最想避免的噩夢。",
      "example": "There's a lot of feedback coming from the lead singer's mic. Can you check the monitor levels?",
      "level": "medium"
    },
    {
      "word": "monitor",
      "type": "music",
      "category": "Live",
      "phonetic": "/ˈmɑːnɪtər/",
      "definition_zh": "監聽喇叭 / 監聽系統",
      "definition_en": "stage speaker",
      "explanation": "專門面向樂手、讓樂手在舞台上能聽清楚自己和其他團員演奏內容的設備。如果聽不到 monitor，樂手就很容易彈錯拍子或唱走音。",
      "example": "Hey Sound Guy, can I get more of the lead guitar in my stage monitor, please?",
      "level": "easy"
    },
    {
      "word": "soundcheck",
      "type": "music",
      "category": "Live",
      "phonetic": "/ˈsaʊndtʃek/",
      "definition_zh": "試音 / 演前音檢",
      "definition_en": "pre-show audio test",
      "explanation": "演出前，樂團與音控師合作調整每件樂器音量的過程。這不僅是為了好聽，更是為了確保舞台上的監聽系統運作正常。",
      "example": "The doors open at 7 PM, so we need to finish the soundcheck by 6:30.",
      "level": "easy"
    },
    {
      "word": "bridge",
      "type": "music",
      "category": "Performance",
      "phonetic": "/brɪdʒ/",
      "definition_zh": "橋段 / 歌曲轉折段",
      "definition_en": "contrasting section",
      "explanation": "歌曲中用來連接主歌（Verse）與副歌（Chorus）的段落，通常旋律或和弦會與其他部分有明顯的對比感，為歌曲增添豐富度。",
      "example": "The bridge in this song is quite short, just four bars before the final high-energy chorus.",
      "level": "easy"
    },
    {
      "word": "chorus",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈɔːrəs/",
      "definition_zh": "副歌 / 歌曲高潮段",
      "definition_en": "repeated main section",
      "explanation": "歌曲中傳唱度最高、能量最強，且會多次重複出現的部分。通常歌詞在這段會最直接地表達歌曲的主題，也是聽眾最有印象的地方。",
      "example": "The chorus of this song is so catchy that everyone was singing along by the second time it played.",
      "level": "easy"
    },
    {
      "word": "verse",
      "type": "music",
      "category": "Performance",
      "phonetic": "/vɜːrs/",
      "definition_zh": "主歌 / 敘事段落",
      "definition_en": "main lyrical section",
      "explanation": "歌曲中負擔敘事、交代背景的部分。通常主歌的能量會比副歌低一點，讓故事在進入高潮前有充足的鋪陳。",
      "example": "The first verse establishes the story, then the mood changes completely when we hit the chorus.",
      "level": "easy"
    },
    {
      "word": "hook",
      "type": "music",
      "category": "Performance",
      "phonetic": "/hʊk/",
      "definition_zh": "記憶點 / 抓耳旋律",
      "definition_en": "catchy part",
      "explanation": "歌曲中最「抓耳」的部分，通常是一個簡短的旋律或節奏片段。就像鉤子一樣，能讓聽眾聽一次就深深記住。",
      "example": "That guitar riff is such a strong hook; it's the reason this song became a hit.",
      "level": "easy"
    },
    {
      "word": "modulation",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˌmɑːdjəˈleɪʃən/",
      "definition_zh": "轉調",
      "definition_en": "change of key",
      "explanation": "歌曲在演奏過程中，從一個調性（如 C 大調）轉換到另一個調性（如 D 大調）的過程。這能為音樂帶來全新的情緒張力或明亮感。",
      "example": "The modulation to a higher key in the last chorus really heightens the emotional impact of the ending.",
      "level": "medium"
    },
    {
      "word": "key",
      "type": "music",
      "category": "Performance",
      "phonetic": "/kiː/",
      "definition_zh": "調性 / 調",
      "definition_en": "tonal center",
      "explanation": "歌曲所在的音樂框架。比如一首歌如果是 'in the key of C'，表示它主要是繞著 C 這個音以及它的相關音階運作。決定一個 key 能幫助大家同步演奏相同的音階與和弦。",
      "example": "This song is originally in the key of Eb, but let's transpose it to D for the vocalist.",
      "level": "easy"
    },
    {
      "word": "mode",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/moʊd/",
      "definition_zh": "調式",
      "definition_en": "scale variation",
      "explanation": "從一個大調音階中，以不同的音作為起點所產生的七種音階模式。每種調式都有獨特的個性（如憂鬱、異域風、明亮），是爵士樂即興的核心工具。",
      "example": "I'm using the Dorian mode over this minor seventh chord to give it a more jazzy, sophisticated sound.",
      "level": "medium"
    },
    {
      "word": "interval",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈɪntərvəl/",
      "definition_zh": "音程 / 兩音距離",
      "definition_en": "distance between notes",
      "explanation": "指兩個音符之間在頻率上的差距。訓練耳朵聽出不同的音程（如三度、五度、八度）是所有樂手練就「絕對/相對音感」的基本功。",
      "example": "Your singing is slightly flat on the major third interval; try to hear the distance more clearly.",
      "level": "medium"
    },
    {
      "word": "octave",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈɑːkteɪv/",
      "definition_zh": "八度",
      "definition_en": "eight-note span",
      "explanation": "指兩個音符雖然名字相同（如 C1 到 C2），但頻率剛好高出一倍的距離。聽起來會像同一個音，但放在更高或更低的位置。",
      "example": "Try playing the melody one octave higher to make it stand out more from the rhythm guitar.",
      "level": "easy"
    },
    {
      "word": "tuning",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈtuːnɪŋ/",
      "definition_zh": "調音 / 音準校正",
      "definition_en": "adjust pitch",
      "explanation": "調整樂器弦的張力或發聲部位，使音高達到標準頻率（如 A=440Hz）。開演前沒調好音（out of tune），會讓整個樂團聽起來像災難。",
      "example": "Let's take a minute to check our tuning. My bass feels a bit flat after that last high-energy song.",
      "level": "easy"
    },
    {
      "word": "intonation",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˌɪntəˈneɪʃən/",
      "definition_zh": "音準控制 / 準確度",
      "definition_en": "pitch accuracy",
      "explanation": "指樂手在演奏過程中，對於音符高低準確性的控制。這對於吹奏樂器和弦樂器尤為關鍵，因為音準完全取決於樂手的嘴型、指法或氣息。",
      "example": "Your overall playing is great, but watch your intonation on the sustained high notes.",
      "level": "medium"
    },
    {
      "word": "breath",
      "type": "music",
      "category": "Performance",
      "phonetic": "/breθ/",
      "definition_zh": "氣息 / 呼吸控制",
      "definition_en": "air support",
      "explanation": "管樂手和歌手最基本但也最重要的技術。好的呼吸控制（breath control）能讓音色更穩定，並支撐起長篇幅的樂句。",
      "example": "Try to take a deep breath before this phrase so you can maintain a steady tone throughout.",
      "level": "easy"
    },
    {
      "word": "embouchure",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˌɑːm.buːˈʃʊr/",
      "definition_zh": "嘴型 / 運唇法",
      "definition_en": "mouth position",
      "explanation": "管樂手（如薩克斯風、小號）吹奏時嘴唇、牙齒與臉部肌肉的配合方式。嘴型的細微變化會直接影響到音準和音色的明亮程度。",
      "example": "Relax your embouchure a bit; you're biting too hard on the reed, which is making the sound thin.",
      "level": "hard"
    },
    {
      "word": "attack",
      "type": "music",
      "category": "Performance",
      "phonetic": "/əˈtæk/",
      "definition_zh": "起音 / 攻擊感",
      "definition_en": "start of note",
      "explanation": "音符被彈奏出來的第一個瞬間的強度與清晰度。強力的起音（strong attack）能增加音樂的張力與節奏感。",
      "example": "The notes need a sharper attack here; use more tongue to define the start of each sound.",
      "level": "easy"
    },
    {
      "word": "release",
      "type": "music",
      "category": "Performance",
      "phonetic": "/rɪˈliːs/",
      "definition_zh": "收音 / 結尾處理",
      "definition_en": "end of note",
      "explanation": "一個音符結束的方式。是優雅地漸弱消失，還是乾淨利落地切斷？收音的處理決定了樂句的完整性與餘韻。",
      "example": "Make sure your release is synchronized with the rest of the section; don't let the note hang too long.",
      "level": "easy"
    },
    {
      "word": "overtones",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈoʊ.vər.toʊnz/",
      "definition_zh": "泛音 / 超音點",
      "definition_en": "higher frequencies",
      "explanation": "當樂器發出一個音時，除了基音外，還會伴隨產生的更高頻率的音。過度控制與觀察泛音能幫助樂手（尤其是管樂手）優化音色（Timbre）並擴展音域。",
      "example": "Practicing overtone exercises is the best way to develop a rich, full-bodied sound on the saxophone.",
      "level": "hard"
    },
    {
      "word": "jam",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/dʒæm/",
      "definition_zh": "即興合奏 / 練琴聚會",
      "definition_en": "informal playing",
      "explanation": "指樂手們在沒有固定譜子、非正式的情況下聚集在一起即興演奏。這是培養默契、測試新靈感（Licks）的最佳時機。",
      "example": "Let's get together tonight for a jam session; just some blues and simple standards.",
      "level": "easy"
    },
    {
      "word": "comping",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˈkɑːmpɪŋ/",
      "definition_zh": "伴奏 / 和弦支撐",
      "definition_en": "chord accompaniment",
      "explanation": "原意為 'accompanying' (伴奏) 或 'complementing' (互補)。在爵士中，指的是節奏組樂手（如鋼琴或吉他）為獨奏者提供和弦背景與節奏支撐的技術。",
      "example": "Your comping was perfect during my solo; you gave me just the right amount of space to play.",
      "level": "medium"
    },
    {
      "word": "backing track",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈbækɪŋ træk/",
      "definition_zh": "伴奏音軌 / 背景音樂",
      "definition_en": "pre-recorded music",
      "explanation": "預先錄製好的、沒有主旋律或主奏樂器的音軌，用來讓樂手跟著練習或在小型表演中充當背景伴奏。",
      "example": "I found a great backing track on YouTube to practice my improv skills over a slow blues.",
      "level": "easy"
    },
    {
      "word": "loop",
      "type": "music",
      "category": "Recording",
      "phonetic": "/luːp/",
      "definition_zh": "循環 / 迴圈",
      "definition_en": "repeat section",
      "explanation": "指一小段不斷重複播放的音學片段。在練習中，我們會 loop 某個困難的小節來重複練習；在音樂製作中，loop 則常用來構建節奏基礎。",
      "example": "Let's put this drum part on a loop so I can try different bass lines over it.",
      "level": "easy"
    },
    {
      "word": "fade in",
      "type": "music",
      "category": "Recording",
      "phonetic": "/feɪd ɪn/",
      "definition_zh": "淡入 / 音量漸強",
      "definition_en": "gradual increase",
      "explanation": "音量從完全靜音逐漸增加到正常水平的過程。常用在歌曲開頭，創造出一種慢慢進入、鋪陳氛圍的感覺。",
      "example": "The guitar intro should fade in slowly over the first eight bars to build anticipation.",
      "level": "easy"
    },
    {
      "word": "fade out",
      "type": "music",
      "category": "Recording",
      "phonetic": "/feɪd aʊt/",
      "definition_zh": "淡出 / 音量漸弱",
      "definition_en": "gradual decrease",
      "explanation": "音量從正常水平逐漸降低到完全靜音的過程。這是流行音樂中最常見的收尾方式，給人一種歌曲仍在遠處繼續迴盪的餘韻感。",
      "example": "Let's have the chorus repeat three times and then fade out over the last thirty seconds of the track.",
      "level": "easy"
    },
    {
      "word": "equalizer",
      "type": "music",
      "category": "Recording",
      "phonetic": "/ˈiː.kwə.laɪ.zər/",
      "definition_zh": "等化器 / EQ",
      "definition_en": "adjust frequencies",
      "explanation": "用來調整音頻中不同頻率（高、中、低頻）強度的設備。就像是一個精細的音域濾網，可以讓聲音聽起來更亮、更厚實，或是切掉不必要的噪音。",
      "example": "Use the equalizer to cut some of the low frequencies from the vocals to make them sound clearer in the mix.",
      "level": "medium"
    },
    {
      "word": "compression",
      "type": "music",
      "category": "Recording",
      "phonetic": "/kəmˈpreʃən/",
      "definition_zh": "壓縮 / 動態處理",
      "definition_en": "control dynamics",
      "explanation": "縮小音樂中最大聲和最輕聲之間的差距。它能讓聲音聽起來更紮實（solid），防止音量突兀，並讓音樂整體聽起來更有力且平衡。",
      "example": "Applying some compression to the bass guitar helps keep the levels consistent and prevents it from getting lost behind the kick drum.",
      "level": "medium"
    },
    {
      "word": "reverb",
      "type": "music",
      "category": "Recording",
      "phonetic": "/ˈriːvɜːrb/",
      "definition_zh": "殘響 / 空間感",
      "definition_en": "sound persistence in space",
      "explanation": "指聲波在空間中反射產生的餘韻。想像你在大教堂（huge reverb）跟在小廚房（dry / no reverb）唱歌的區別。適度的 reverb 能讓聲音更立體、更有空間感。",
      "example": "The vocals sound a bit too dry; let's add some plate reverb to give them more space.",
      "level": "easy"
    },
    {
      "word": "delay",
      "type": "music",
      "category": "Recording",
      "phonetic": "/dɪˈleɪ/",
      "definition_zh": "延遲效果 / 回音",
      "definition_en": "echo repetition",
      "explanation": "將聲音延遲一段時間後再播出的效果，也就是我們常說的「回音」。你可以控制它重複幾次、間隔多久。在吉他演奏中常用來營造夢幻或迷幻的疊層感。",
      "example": "Setting a dotted eighth-note delay will add that rhythmic pulse you're looking for.",
      "level": "easy"
    },
    {
      "word": "track",
      "type": "music",
      "category": "Recording",
      "phonetic": "/træk/",
      "definition_zh": "音軌 / 軌道",
      "definition_en": "recorded layer",
      "explanation": "在錄音軟體 (DAW) 中的獨立發聲層。一首歌通常由鼓、貝斯、人聲等數十個音軌（tracks）組成。我們可以單獨針對某個音軌進行調整而不影響其他部分。",
      "example": "We need to double-track the chorus vocals to make them sound thicker.",
      "level": "easy"
    },
    {
      "word": "take",
      "type": "music",
      "category": "Recording",
      "phonetic": "/teɪk/",
      "definition_zh": "錄製版本 / 錄製次數",
      "definition_en": "record attempt",
      "explanation": "錄製某段樂句的一個完整嘗試。如果這次彈得不好，我們就再來一個 'Take 2'。最後會從多個 takes 中挑選出最完美的一個（The master take）。",
      "example": "That was a great take! The energy was much better than the first one.",
      "level": "easy"
    },
    {
      "word": "gig",
      "type": "music",
      "category": "Live",
      "phonetic": "/ɡɪɡ/",
      "definition_zh": "現場演出 / 小場子",
      "definition_en": "live performance",
      "explanation": "樂手的現場演出工作。不管是酒吧的小演出還是音樂祭的大舞台，樂手都統稱為 gig。它是樂手累積經驗最快的地方。",
      "example": "I've got a solo acoustic gig tonight at the downtown cafe.",
      "level": "easy"
    },
    {
      "word": "setlist",
      "type": "music",
      "category": "Live",
      "phonetic": "/ˈsetlɪst/",
      "definition_zh": "演出曲目表",
      "definition_en": "song list",
      "explanation": "一場演出中所有要彈奏的歌曲清單與順序。好的 setlist 會有起伏，適時安排快慢歌來帶動現場氣氛。",
      "example": "We should change the setlist for tonight; starting with a ballad might be too slow.",
      "level": "easy"
    },
    {
      "word": "band",
      "type": "music",
      "category": "Live",
      "phonetic": "/bænd/",
      "definition_zh": "樂團",
      "definition_en": "music group",
      "explanation": "一群樂手聚在一起固定進行創作或演出的團體。在爵士樂中，也常根據人數稱為 Trio (三人組)、Quartet (四人組) 或 Big Band (大樂團)。",
      "example": "Our band is looking for a new keyboardist; let me know if you know anyone interested.",
      "level": "easy"
    },
    {
      "word": "ensemble",
      "type": "music",
      "category": "Live",
      "phonetic": "/ɑːnˈsɑːmbəl/",
      "definition_zh": "合奏 / 默契",
      "definition_en": "group performance",
      "explanation": "指樂手之間的合奏默契、整體平衡。好的 ensemble 意指大家能互相傾聽，而不只是各彈各的。這是衡量一個室內樂團或爵士樂隊素質的重要指標。",
      "example": "The ensemble was really tight today; we were all perfectly in sync with the drummer's feel.",
      "level": "medium"
    },
    {
      "word": "practice",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ˈpræk.tɪs/",
      "definition_zh": "練習 / 鍛鍊",
      "definition_en": "to repeat an activity to improve",
      "explanation": "指為了提升技能而進行的有目的性的重複訓練。對樂手來說，'practice' 不只是隨便彈彈，而是針對弱點進行磨練，如：練習音階、速度或困難的樂句。",
      "example": "I need to practice my major scales for at least an hour every morning.",
      "level": "easy"
    },
    {
      "word": "perform",
      "type": "word",
      "category": "Performance",
      "phonetic": "/pərˈfɔːrm/",
      "definition_zh": "表演 / 演出",
      "definition_en": "to play music in front of people",
      "explanation": "在觀眾面前展示你的音樂才華。這不僅包括彈奏正確的音符，還包括舞台表現力（stage presence）以及與觀眾的互動。",
      "example": "We are going to perform our new original song for the first time tonight.",
      "level": "easy"
    },
    {
      "word": "listen",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ˈlɪs.ən/",
      "definition_zh": "聆聽 / 聽取",
      "definition_en": "to pay attention to sound",
      "explanation": "音樂學習中最重要的一環。除了聽旋律，還要學會聽音色（tone）、節奏感（groove）以及其他樂器在做什麼。這叫做 'active listening'。",
      "example": "You should listen to more Miles Davis to understand how he uses space in his solos.",
      "level": "easy"
    },
    {
      "word": "repeat",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/rɪˈpiːt/",
      "definition_zh": "重複 / 重彈",
      "definition_en": "to do again",
      "explanation": "再次執行相同的動作。在排練中，如果一段合奏不夠精準，帶領者會說 'Let's repeat this section'，直到大家完全同步為止。",
      "example": "Can we repeat the bridge? I missed my entrance in the second bar.",
      "level": "easy"
    },
    {
      "word": "actually",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈæk.tʃu.ə.li/",
      "definition_zh": "實際上 / 其實",
      "definition_en": "in fact",
      "explanation": "用來表示真實情況，常用於糾正誤解或是強調驚訝的事實。比如：『他看起來很隨性，但實際上（actually）他是每天練琴八小時的苦行僧。』",
      "example": "I thought the song was in G, but it's actually in E minor.",
      "level": "easy"
    },
    {
      "word": "basically",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈbeɪ.sɪ.kəl.i/",
      "definition_zh": "基本上 / 簡單來說",
      "definition_en": "in general",
      "explanation": "用來概括核心重點，省略細枝末節。當你想簡單解釋一個複雜的和弦理論或樂理概念時，可以用它開頭。",
      "example": "Basically, you're just playing a blues scale over a major chord to get that tension.",
      "level": "easy"
    },
    {
      "word": "figure out",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ˈfɪɡ.ər aʊt/",
      "definition_zh": "弄清楚 / 搞懂",
      "definition_en": "to understand or solve",
      "explanation": "指透過思考或實驗來搞懂某件事。例如：『我終於搞通（figured out）這段複雜的切分音是怎麼數的了！』",
      "example": "It took me all afternoon to figure out the chord changes for that fusion track.",
      "level": "easy"
    },
    {
      "word": "hang out",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/hæŋ aʊt/",
      "definition_zh": "聚會 / 閒晃",
      "definition_en": "spend time socially",
      "explanation": "指非正式的消磨時間。對樂手來說，這通常發生在排練後的聚餐或是俱樂部的後台，是交流情報與培養感情的重要時刻。",
      "example": "The whole band decided to hang out at the jazz club after our rehearsal.",
      "level": "easy"
    },
    {
      "word": "run into",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/rʌn ˈɪn.tuː/",
      "definition_zh": "偶然碰到",
      "definition_en": "meet unexpectedly",
      "explanation": "沒預見地遇到某人。音樂圈很小，你常常會在樂器行或演出現場偶然遇到（run into）以前合作過的團員。",
      "example": "I ran into my old guitar teacher at the music store yesterday.",
      "level": "easy"
    },
    {
      "word": "deal with",
      "type": "word",
      "category": "Work",
      "phonetic": "/diːl wɪð/",
      "definition_zh": "處理 / 應付",
      "definition_en": "handle something",
      "explanation": "處理棘手或必須面對的問題。比如解決舞台上的回授（feedback）或是應付遲到的團員。",
      "example": "We had to deal with some technical issues during the soundcheck.",
      "level": "easy"
    },
    {
      "word": "pick up",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/pɪk ʌp/",
      "definition_zh": "學會 / 拾起",
      "definition_en": "learn or grab",
      "explanation": "指拿起樂器，或是快速學會一段新技能。例如：『他聽一次就學會（picked up）了那段樂句。』",
      "example": "I picked up a few cool guitar licks from watching the opening band.",
      "level": "easy"
    },
    {
      "word": "come up with",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/kʌm ʌp wɪð/",
      "definition_zh": "想出 / 構思",
      "definition_en": "create or invent",
      "explanation": "想出新點子、創運用新東西。在即興或創作過程中，不斷產出新的動機（motifs）就是 'come up with ideas'。",
      "example": "Our drummer came up with a really interesting groove for the intro.",
      "level": "easy"
    },
    {
      "word": "take time",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/teɪk taɪm/",
      "definition_zh": "花時間 / 耗時",
      "definition_en": "require time",
      "explanation": "指某件事需要大量的時間投入。練好一門樂器是沒有捷徑的，它需要時間（takes time）的累積。",
      "example": "Developing a great tone takes time; you can't rush the process.",
      "level": "easy"
    },
    {
      "word": "make sense",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/meɪk sens/",
      "definition_zh": "有道理 / 合理",
      "definition_en": "be logical",
      "explanation": "指某個觀念或做法符合邏輯、聽起來合理。比如：『這段旋律接在這裡非常和諧，很有道理（makes sense）。』",
      "example": "The chord progression didn't make sense at first, but now I see how it works.",
      "level": "easy"
    },
    {
      "word": "What's up?",
      "type": "daily",
      "category": "Conversation",
      "definition_zh": "最近怎麼樣？ / 你好",
      "definition_en": "A casual greeting to ask how someone is.",
      "explanation": "這是美國人最常用的打招呼方式。回答時通常不用真的說你在幹嘛，只要回 'Not much' 或 'Just hanging out' 就可以了。",
      "context": "遇到熟人、朋友或同事時的輕鬆開場。",
      "example": "Hey man, what's up? — Not much, just heading to class.",
      "level": "easy"
    },
    {
      "word": "Catch you later",
      "type": "daily",
      "category": "Conversation",
      "definition_zh": "待會見 / 再見",
      "definition_en": "A casual way to say goodbye.",
      "explanation": "常用於非正式場合，比 'Goodbye' 輕鬆得多。'Catch you' 聽起來像是會再碰面的感覺。",
      "context": "離開放學、聚會或結束短暫交談時。",
      "example": "I've gotta run. Catch you later! — Sure, see ya!",
      "level": "easy"
    },
    {
      "word": "Bummer",
      "type": "daily",
      "category": "Emotion",
      "definition_zh": "真可惜 / 掃興的事",
      "definition_en": "A situation that is disappointing or annoying.",
      "explanation": "當聽到壞消息或可惜的事情時，可以用這個字表示同情或同感。像中文的「真慘」或「真可惜」。",
      "context": "朋友告訴你他沒買到演唱會門票，或錯過了公車。",
      "example": "I lost my wallet today. — Oh, what a bummer!",
      "level": "easy"
    },
    {
      "word": "Hang in there",
      "type": "daily",
      "category": "Emotion",
      "definition_zh": "撐住 / 加油",
      "definition_en": "To remain persistent and determined in difficult times.",
      "explanation": "用來鼓勵正在經歷困難或壓力的人，叫他們不要放棄。很有力量的安慰語。",
      "context": "朋友期末考壓力很大，或工作遇到瓶頸時。",
      "example": "I know things are tough right now, but hang in there.",
      "level": "medium"
    },
    {
      "word": "On it",
      "type": "daily",
      "category": "Work",
      "definition_zh": "馬上處理 / 交給我",
      "definition_en": "To be working on something or to take responsibility immediately.",
      "explanation": "在職場上非常實用。當老闆或同事交辦事項時，說 'I'm on it' 比 'OK' 顯得更有行動力。",
      "context": "收到新的工作任務或有人請你幫忙查詢資料時。",
      "example": "Can you check if the report is ready? — I'm on it!",
      "level": "easy"
    },
    {
      "word": "Circle back",
      "type": "daily",
      "category": "Work",
      "definition_zh": "稍後再談 / 回頭再議",
      "definition_en": "To discuss something again at a later time.",
      "explanation": "典型的商務用語。當現在不方便決定或時間不夠，想晚一點再討論某個議題時使用。",
      "context": "會議中臨時出現無關的小議題，或是還沒想好答案時。",
      "example": "Let's circle back to this point once we have more data.",
      "level": "medium"
    },
    {
      "word": "Grab a bite",
      "type": "daily",
      "category": "Daily Life",
      "definition_zh": "隨便吃點東西",
      "definition_en": "To go and get some food, usually quickly.",
      "explanation": "不要說 'Eat food'，美國人更喜歡說 'Grab a bite'。感覺比較隨意，不一定要吃大餐。",
      "context": "中午休息或放學後想約人一起去吃飯。",
      "example": "Wanna grab a bite before the movie starts?",
      "level": "easy"
    },
    {
      "word": "Run errands",
      "type": "daily",
      "category": "Daily Life",
      "definition_zh": "辦雜事 / 出去辦點事",
      "definition_en": "To go out to buy things or do small tasks.",
      "explanation": "用來統稱去超市、拿乾洗或是寄信這些生活瑣事。非常好用的綜合表達方式。",
      "context": "當別人在週末問你在幹嘛，而你只是在處理外出的瑣事。",
      "example": "I spent the whole morning running errands.",
      "level": "medium"
    },
    {
      "word": "Hit me up",
      "type": "daily",
      "category": "Communication",
      "definition_zh": "聯絡我 / 傳訊給我",
      "definition_en": "To contact someone.",
      "explanation": "縮寫常寫成 HMU。是非常現代、口語的聯絡方式，通常指傳簡訊或私訊。",
      "context": "要跟朋友分開前，或想約對方有空再聊。",
      "example": "Hit me up when you get home so I know you're safe.",
      "level": "easy"
    },
    {
      "word": "Cut the cord",
      "type": "daily",
      "category": "Communication",
      "definition_zh": "斷掉關聯 / 取消訂閱",
      "definition_en": "To stop using a service (like cable TV) or to end a dependent relationship.",
      "explanation": "原本指剪掉電視線改看串流平台，現在也常用來指斷絕關係或獨立。在現代通訊情境很常見。",
      "context": "討論要不要取消家裡的第四台，或是決定不再依賴某人。",
      "example": "We finally decided to cut the cord and just use Netflix.",
      "level": "medium"
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
                        <strong>${word.type === 'music' ? '白話解析' : (word.type === 'daily' ? '情境解析' : '例句')}:</strong> 
                        ${word.explanation || word.music_context || word.example || ''}
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

    const words = selectFromPool(getPool('word'), 4);
    const music = selectFromPool(getPool('music'), 2);
    const daily = selectFromPool(getPool('daily'), 2);

    state.daily = {
        date: dateStr,
        items: [...words, ...music, ...daily]
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
    if (viewName === 'daily-english') initDailyEnglishView();
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
    const tabs = document.querySelectorAll('#music-tabs .tab-item');
    
    const renderMusicList = (category) => {
        list.innerHTML = '';
        const filtered = INITIAL_DATA.filter(w => 
            w.type === 'music' && (category === 'all' || w.category === category)
        );

        if (filtered.length === 0) {
            list.innerHTML = '<div class="empty-state"><p>這個分類下還沒有術語喔</p></div>';
            return;
        }

        filtered.forEach(item => {
            const isCollected = state.collection.some(w => w.word.toLowerCase() === item.word.toLowerCase());
            const el = document.createElement('div');
            el.className = 'expandable-item';
            el.innerHTML = `
                <div class="item-summary">
                    <div>
                        <h3>${item.word}</h3>
                        <div class="word-phonetic" style="font-size:0.8rem;">${item.phonetic || ''}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="badge" style="font-size:0.7rem; opacity:0.8;">${item.category || item.tags?.[0] || 'Term'}</span>
                        <span class="arrow">▼</span>
                    </div>
                </div>
                <div class="item-detail hidden">
                    <div class="explanation">
                        <strong>💡 教學解析：</strong><br>${item.explanation || item.music_context}
                    </div>
                    <div class="context">
                        <strong>📍 樂手情境：</strong><br>${item.example ? `"${item.example}"` : '尚無情境例句'}
                    </div>
                    <div class="detail-actions">
                        <button class="mini-btn" id="pronounce-music-${item.word.replace(/[^a-zA-Z]/g, '-')}" style="flex:0.5;">🔊 唸術語</button>
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

            list.appendChild(el);
        });
    };

    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMusicList(tab.dataset.category);
        };
    });

    renderMusicList('all');
};

// --- 💡 Daily English View Logic ---
const initDailyEnglishView = () => {
    const list = document.getElementById('daily-english-list');
    const tabs = document.querySelectorAll('#daily-english-tabs .tab-item');
    
    const renderDailyList = (category) => {
        list.innerHTML = '';
        const filtered = INITIAL_DATA.filter(w => 
            w.type === 'daily' && (category === 'all' || w.category === category)
        );

        if (filtered.length === 0) {
            list.innerHTML = '<div class="empty-state"><p>這個分類下還沒有單字喔</p></div>';
            return;
        }

        filtered.forEach(item => {
            const isCollected = state.collection.some(w => w.word.toLowerCase() === item.word.toLowerCase());
            const el = document.createElement('div');
            el.className = 'expandable-item';
            el.innerHTML = `
                <div class="item-summary">
                    <h3>${item.word}</h3>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="badge" style="font-size:0.7rem; opacity:0.8;">${item.category}</span>
                        <span class="arrow">▼</span>
                    </div>
                </div>
                <div class="item-detail hidden">
                    <div class="explanation">
                        <strong>💡 教學解析：</strong><br>${item.explanation}
                    </div>
                    <div class="context">
                        <strong>📍 使用情境：</strong><br>${item.context}
                    </div>
                    <div class="example-box">
                        <div class="example-text">"${item.example}"</div>
                        <button class="mini-pronounce" style="background:none; border:none; cursor:pointer;" onclick="event.stopPropagation(); speak(\`${item.example.replace(/'/g, "\\'")}\`)">🔊</button>
                    </div>
                    <div class="detail-actions">
                        <button class="mini-btn" id="pronounce-${item.word.replace(/[^a-zA-Z]/g, '-')}" style="flex:0.5;">🔊 唸單字</button>
                        <button class="mini-btn primary add-daily-btn" style="flex:1;">
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
            el.querySelector(`#pronounce-${idStr}`).onclick = (e) => {
                e.stopPropagation();
                speak(item.word);
            };

            const addBtn = el.querySelector('.add-daily-btn');
            addBtn.onclick = (e) => {
                e.stopPropagation();
                if (!isCollected) {
                    addToCollection(item);
                    addBtn.innerHTML = '✅ 已在單字卡';
                    addBtn.classList.add('added');
                    showNotification('已加入單字卡');
                }
            };

            list.appendChild(el);
        });
    };

    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderDailyList(tab.dataset.category);
        };
    });

    renderDailyList('all');
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
