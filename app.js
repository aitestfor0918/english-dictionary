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
      "definition_zh": "其實",
      "definition_en": "in fact",
      "explanation": "用來表示真實情況，常用於糾正誤解或是強調驚訝的事實。比如：『他看起來很隨性，但實際上（actually）他是每天練琴八小時的苦行僧。』",
      "example": "I actually like this.",
      "level": "easy"
    },
    {
      "word": "basically",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈbeɪ.sɪ.kəl.i/",
      "definition_zh": "基本上",
      "definition_en": "in general",
      "explanation": "用來概括核心重點，省略細枝末節。當你想簡單解釋一個複雜的和弦理論或樂理概念時，可以用它開頭。",
      "example": "Basically, it's done.",
      "level": "easy"
    },
    {
      "word": "figure out",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ˈfɪɡ.ər aʊt/",
      "definition_zh": "搞懂",
      "definition_en": "understand",
      "explanation": "指透過思考或實驗來搞懂某件事。例如：『我終於搞通（figured out）這段複雜的切分音是怎麼數的了！』",
      "example": "I can't figure it out.",
      "level": "easy"
    },
    {
      "word": "hang out",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/hæŋ aʊt/",
      "definition_zh": "出去玩",
      "definition_en": "spend time",
      "explanation": "指非正式的消磨時間。對樂手來說，這通常發生在排練後的聚餐或是俱樂部的後台，是交流情報與培養感情的重要時刻。",
      "example": "Let's hang out.",
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
      "definition_zh": "處理",
      "definition_en": "handle",
      "explanation": "處理棘手或必須面對的問題。比如解決舞台上的回授（feedback）或是應付遲到的團員。",
      "example": "Deal with it.",
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
      "definition_zh": "想出",
      "definition_en": "create idea",
      "explanation": "想出新點子、創運用新東西。在即興或創作過程中，不斷產出新的動機（motifs）就是 'come up with ideas'。",
      "example": "Come up with something.",
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
      "definition_zh": "有道理",
      "definition_en": "logical",
      "explanation": "指某個觀念或做法符合邏輯、聽起來合理。比如：『這段旋律接在這裡非常和諧，很有道理（makes sense）。』",
      "example": "That makes sense.",
      "level": "easy"
    },
    {
      "word": "What's up?",
      "type": "daily",
      "category": "Conversation",
      "definition_zh": "最近怎樣",
      "definition_en": "how are you",
      "explanation": "最常見的非正式問候。對樂手來說，這常用於見面時的寒暄。回答通常是 'Not much' 或是直接回一句 'What's up?'。",
      "context": "跟團員或是樂團經理見面首選。",
      "example": "Hey, what's up?",
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
      "definition_en": "To stop using a service or to end a dependent relationship.",
      "explanation": "原本指剪掉電視線改看串流平台，現在也常用來指斷絕關係或獨立。在現代通訊情境很常見。",
      "context": "討論要不要取消家裡的第四台，或是決定不再依賴某人。",
      "example": "We finally decided to cut the cord and just use Netflix.",
      "level": "medium"
    },
    {
      "word": "obviously",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈɑːb.vi.əs.li/",
      "definition_zh": "很明顯",
      "definition_en": "clearly",
      "explanation": "用來強調某件事顯而易見。如果你在排練時彈錯了，你自己知道，團員也知道，你就可以說 'Obviously, that was the wrong chord'。",
      "example": "It's obviously wrong.",
      "level": "easy"
    },
    {
      "word": "seriously",
      "type": "word",
      "category": "Emotion",
      "phonetic": "/ˈsɪr.i.əs.li/",
      "definition_zh": "認真地",
      "definition_en": "in a serious way",
      "explanation": "表示『認真、不開玩笑』或是『非常、極度』。比如稱讚一個樂手的技巧時，說 'He is seriously talented' 比 'He is very talented' 聽起來更專業且有崇拜感。",
      "example": "I'm seriously tired.",
      "level": "easy"
    },
    {
      "word": "literally",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈlɪt̬.ɚ.əl.i/",
      "definition_zh": "真的",
      "definition_en": "actually",
      "explanation": "原本指字面上的意思，但現在常用作強烈的誇張修飾語。例如：『這首歌節奏快到我手指真的（literally）快斷了！』。",
      "example": "I literally can't move.",
      "level": "easy"
    },
    {
      "word": "find out",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/faɪnd aʊt/",
      "definition_zh": "發現",
      "definition_en": "discover",
      "explanation": "指獲取原本不知道的資訊。比如查明某首歌的調性、或是發現某個樂理網站。",
      "example": "Find out the answer.",
      "level": "easy"
    },
    {
      "word": "go through",
      "type": "word",
      "category": "Work",
      "phonetic": "/ɡoʊ θruː/",
      "definition_zh": "經歷",
      "definition_en": "experience",
      "explanation": "指度過一段艱辛時期或是逐一檢查某件事。排練時我們常說 'Let's go through the chart one more time'（讓我們再過一遍譜）。",
      "example": "I went through a lot.",
      "level": "easy"
    },
    {
      "word": "get over",
      "type": "word",
      "category": "Emotion",
      "phonetic": "/ɡet ˈoʊ.vər/",
      "definition_zh": "克服",
      "definition_en": "recover",
      "explanation": "指從負面情緒或失敗中恢復。如果演砸了，別灰心，'Get over it and keep practicing'。",
      "example": "Get over it.",
      "level": "easy"
    },
    {
      "word": "chill",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/tʃɪl/",
      "definition_zh": "放鬆",
      "definition_en": "relax",
      "explanation": "放鬆、冷靜。同時也可以指音樂風格很放鬆（Chilled out music）。",
      "example": "Just chill.",
      "level": "easy"
    },
    {
      "word": "catch up",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/kætʃ ʌp/",
      "definition_zh": "敘舊",
      "definition_en": "talk after time",
      "explanation": "跟很久不見的朋友聊聊近況，或是趕上進度。例如：『我們太久沒見了，一定要找時間敘舊（catch up）。』",
      "example": "Let's catch up.",
      "level": "easy"
    },
    {
      "word": "show up",
      "type": "word",
      "category": "Social",
      "phonetic": "/ʃoʊ ʌp/",
      "definition_zh": "出現",
      "definition_en": "arrive",
      "explanation": "露面、到場。如果團員常不準時出席（doesn't show up on time），那是很讓人頭痛的事。",
      "example": "He didn't show up.",
      "level": "easy"
    },
    {
      "word": "turn out",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/tɜːrn aʊt/",
      "definition_zh": "結果是",
      "definition_en": "result",
      "explanation": "描述事情最後的發展。比如：『本來以為錄音會不順利，結果（turned out）效果超級好！』",
      "example": "It turned out fine.",
      "level": "easy"
    },
    {
      "word": "work on",
      "type": "word",
      "category": "Work",
      "phonetic": "/wɜːrk ɑːn/",
      "definition_zh": "努力做",
      "definition_en": "improve",
      "explanation": "指專注於改進、處理某個特定的事物。比如：『我這星期都在努力練習（working on）我的觸鍵技巧。』",
      "example": "Work on this.",
      "level": "easy"
    },
    {
      "word": "focus on",
      "type": "word",
      "category": "Work",
      "phonetic": "/ˈfoʊ.kəs ɑːn/",
      "definition_zh": "專注",
      "definition_en": "concentrate",
      "explanation": "集中注意力。在錄音或表演時，你需要全神貫注（focus on）在聽力與節奏上。",
      "example": "Focus on it.",
      "level": "easy"
    },
    {
      "word": "keep going",
      "type": "word",
      "category": "Work",
      "phonetic": "/kiːp ˈɡoʊ.ɪŋ/",
      "definition_zh": "繼續",
      "definition_en": "continue",
      "explanation": "不要停下來。如果在表演中彈錯一兩個音，千萬不要停下，要 'Keep going' 保持整體的 groove。",
      "example": "Keep going.",
      "level": "easy"
    },
    {
      "word": "give up",
      "type": "word",
      "category": "Emotion",
      "phonetic": "/ɡɪv ʌp/",
      "definition_zh": "放棄",
      "definition_en": "quit",
      "explanation": "終止努力。學音樂很累，但千萬別輕言放棄（Don't give up）。",
      "example": "Don't give up.",
      "level": "easy"
    },
    {
      "word": "kind of",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/kaɪnd əv/",
      "definition_zh": "有點",
      "definition_en": "a little",
      "explanation": "一種委婉的說法，表示『有點、大概』。常縮寫成 kinda。比如：『這首歌聽起來有點（kinda）爵士味。』",
      "example": "I'm kind of tired.",
      "level": "easy"
    },
    {
      "word": "sort of",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/sɔːrt əv/",
      "definition_zh": "某種程度",
      "definition_en": "somewhat",
      "explanation": "介於『是』與『不是』之間，表示『算是吧』。語氣比 kinda 稍微正式一點點。",
      "example": "Sort of true.",
      "level": "easy"
    },
    {
      "word": "a bit",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ə bɪt/",
      "definition_zh": "一點",
      "definition_en": "slightly",
      "explanation": "指程度輕微。在混音中常用到：『把音量調高一點（a bit louder）。』",
      "example": "A bit tired.",
      "level": "easy"
    },
    {
      "word": "pretty",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈprɪt.i/",
      "definition_zh": "相當",
      "definition_en": "quite",
      "explanation": "作為副詞，表示『相當、挺...的』。比如：『這支吉他聲音相當（pretty）不錯。』",
      "example": "Pretty good.",
      "level": "easy"
    },
    {
      "word": "super",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ˈsuː.pər/",
      "definition_zh": "超級",
      "definition_en": "very",
      "explanation": "表示極大程度，非常口語。比 very 更有強調感。例如：『那場表演超級（super）酷！』",
      "example": "Super easy.",
      "level": "easy"
    },
    {
      "word": "no way",
      "type": "word",
      "category": "Emotion",
      "phonetic": "/noʊ weɪ/",
      "definition_zh": "不可能",
      "definition_en": "impossible",
      "explanation": "表達強烈的驚訝或拒絕。當你聽到一個不可思議的獨奏時可以說 'No way! How did he play that?'。",
      "example": "No way!",
      "level": "easy"
    },
    {
      "word": "for sure",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/fər ʃʊr/",
      "definition_zh": "一定",
      "definition_en": "definitely",
      "explanation": "表示語氣肯定的『沒錯、當然』。常用來回應用對方的提問或觀點。",
      "example": "For sure.",
      "level": "easy"
    },
    {
      "word": "I mean",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/aɪ miːn/",
      "definition_zh": "我是說",
      "definition_en": "clarify",
      "explanation": "用來澄清、強調或細化你剛說的話。在解釋複雜的音樂想法時非常好用。",
      "example": "I mean, it's fine.",
      "level": "easy"
    },
    {
      "word": "you know",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/juː noʊ/",
      "definition_zh": "你懂的",
      "definition_en": "filler",
      "explanation": "一種口語發語詞，用來確認對方的理解，或是填補思考的空隙（filler word）。",
      "example": "You know what I mean.",
      "level": "easy"
    },
    {
      "word": "I'm down",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/aɪm daʊn/",
      "definition_zh": "我可以",
      "definition_en": "I'm interested",
      "explanation": "表示同意某個提議或計畫。比如團員問：『今晚要不要去聽 Live？』你可以回 'I'm down!' 表示你有興趣且會參加。",
      "context": "討論演出、聚餐或練習計畫時使用。",
      "example": "I'm down for that.",
      "level": "easy"
    },
    {
      "word": "No worries",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/noʊ ˈwɜːr.iz/",
      "definition_zh": "沒關係",
      "definition_en": "it's okay",
      "explanation": "用來回對方的道歉或感謝，語氣非常輕鬆。比如團員不小心彈錯音道歉時，你可以說 'No worries'。",
      "context": "處理小失誤或是輕鬆的回禮。",
      "example": "No worries.",
      "level": "easy"
    },
    {
      "word": "That works",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/ðæt wɜːrks/",
      "definition_zh": "可以這樣",
      "definition_en": "it's fine",
      "explanation": "表示某個安排或方案是可以接受的。常用於討論排練時間或編曲細節時。",
      "context": "達成共識、確認行程。",
      "example": "That works for me.",
      "level": "easy"
    },
    {
      "word": "I'm good",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/aɪm ɡʊd/",
      "definition_zh": "不用了/我很好",
      "definition_en": "I'm fine",
      "explanation": "有兩種用法：一是指『我很好』，二是禮貌地拒絕（例如拒絕別人遞過來的飲料）。要在對話中根據情境判斷。",
      "context": "拒絕額外的服務或在寒暄中回答。",
      "example": "I'm good, thanks.",
      "level": "easy"
    },
    {
      "word": "voicing",
      "type": "music",
      "category": "Harmony",
      "phonetic": "/ˈvɔɪ.sɪŋ/",
      "definition_zh": "和弦配置",
      "definition_en": "note arrangement",
      "explanation": "指和弦中各個音符的排列順序與間距。同樣一個 Cmaj7 和弦，不同的 voicing（如：密集排列 vs. 開放排列）會產生完全不同的音色與情緒張力。",
      "example": "Nice voicing.",
      "level": "medium"
    },
    {
      "word": "substitution",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˌsʌb.stəˈtuː.ʃən/",
      "definition_zh": "替代和弦",
      "definition_en": "chord replacement",
      "explanation": "指在樂曲中使用另一個和弦來替換原有的和弦，以增加色彩或張力。最常見的是『三全音替代』（Tritone Substitution），能讓和聲聽起來更有層次感。",
      "example": "Use substitution.",
      "level": "hard"
    },
    {
      "word": "tight",
      "type": "music",
      "category": "Performance",
      "phonetic": "/taɪt/",
      "definition_zh": "很齊",
      "definition_en": "well coordinated",
      "explanation": "形容樂團成員之間的配合極度精確、同步。當大家在同一個 groove 上，節奏整齊劃一，我們就會說這個 band 真的很 'tight'。",
      "example": "The band is tight.",
      "level": "easy"
    },
    {
      "word": "in the pocket",
      "type": "music",
      "category": "Rhythm",
      "phonetic": "/ɪn ðə ˈpɑː.kɪt/",
      "definition_zh": "在節奏裡",
      "definition_en": "perfect groove",
      "explanation": "這是對樂手（特別是貝斯手和鼓手）的最高讚美。指演奏時節奏極度穩定且富有靈魂感，讓人聽了忍不住想跟著點頭，與大家完美融合在律動中。",
      "level": "medium"
    },
    {
      "word": "bring up",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/brɪŋ ʌp/",
      "definition_zh": "提出",
      "definition_en": "mention",
      "explanation": "在討論中提出一個話題。排練時如果你覺得某段速度不對，可以 'bring up the issue'。",
      "example": "Bring it up.",
      "level": "easy"
    },
    {
      "word": "call off",
      "type": "word",
      "category": "Work",
      "phonetic": "/kɔːl ɒf/",
      "definition_zh": "取消",
      "definition_en": "cancel",
      "explanation": "取消計畫好的活動。如果場地出問題，我們可能必須 'call off the gig'。",
      "example": "Call it off.",
      "level": "easy"
    },
    {
      "word": "carry on",
      "type": "word",
      "category": "Work",
      "phonetic": "/ˈkær.i ɒn/",
      "definition_zh": "繼續",
      "definition_en": "continue",
      "explanation": "即使遇到困難也持續進行。表演中即便有雜音，也要 'carry on playing'。",
      "example": "Carry on.",
      "level": "easy"
    },
    {
      "word": "cut down",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/kʌt daʊn/",
      "definition_zh": "減少",
      "definition_en": "reduce",
      "explanation": "減少數量。錄音時，如果混響太重，工程師會說 'cut down the reverb'。",
      "example": "Cut down sugar.",
      "level": "easy"
    },
    {
      "word": "end up",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/end ʌp/",
      "definition_zh": "最後變成",
      "definition_en": "finally become",
      "explanation": "描述最終意想不到的結果。例如：『本來只想練半小時，結果（ended up）練了一整晚。』",
      "example": "I ended up staying.",
      "level": "easy"
    },
    {
      "word": "get along",
      "type": "word",
      "category": "Social",
      "phonetic": "/ɡet əˈlɒŋ/",
      "definition_zh": "相處",
      "definition_en": "have good relationship",
      "explanation": "與人關係和諧。一個團能走得遠，成員之間能不能 'get along' 比技術更重要。",
      "example": "We get along.",
      "level": "easy"
    },
    {
      "word": "get back",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ɡet bæk/",
      "definition_zh": "回來",
      "definition_en": "return",
      "explanation": "返回某地。巡演結束後，最重要的就是趕快回家（get back home）休息。",
      "example": "Get back home.",
      "level": "easy"
    },
    {
      "word": "get in",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ɡet ɪn/",
      "definition_zh": "進入",
      "definition_en": "enter",
      "explanation": "進去建築物或交通工具。在裝修器材時，我們要確保設備能進得去（get in）門口。",
      "example": "Get in the car.",
      "level": "easy"
    },
    {
      "word": "get out",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ɡet aʊt/",
      "definition_zh": "出去",
      "definition_en": "leave",
      "explanation": "離開。表演結束後，撤場（get out）的效率決定了大家能多早回家。",
      "example": "Get out now.",
      "level": "easy"
    },
    {
      "word": "get together",
      "type": "word",
      "category": "Social",
      "phonetic": "/ɡet təˈɡeð.ər/",
      "definition_zh": "聚會",
      "definition_en": "meet socially",
      "explanation": "大家聚在一起。對樂手來說，這通常指為了編新歌而約的排練（jam session）。",
      "example": "Let's get together.",
      "level": "easy"
    },
    {
      "word": "go ahead",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/ɡoʊ əˈhed/",
      "definition_zh": "去做吧",
      "definition_en": "proceed",
      "explanation": "給予許可或鼓勵開始。如果你問團長能不能加一段獨奏，他可能會說 'Go ahead'。",
      "example": "Go ahead.",
      "level": "easy"
    },
    {
      "word": "go back",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ɡoʊ bæk/",
      "definition_zh": "回去",
      "definition_en": "return",
      "explanation": "回到之前的狀態或地方。如果編曲改壞了，我們會說 'Let's go back to the original version'。",
      "example": "Go back.",
      "level": "easy"
    },
    {
      "word": "go out",
      "type": "word",
      "category": "Social",
      "phonetic": "/ɡoʊ aʊt/",
      "definition_zh": "出去",
      "definition_en": "leave home",
      "explanation": "出門交際或演出。例如：『今晚我們要出城去表演（going out to gig）。』",
      "example": "Let's go out.",
      "level": "easy"
    },
    {
      "word": "go over",
      "type": "word",
      "category": "Work",
      "phonetic": "/ɡoʊ ˈoʊ.vər/",
      "definition_zh": "檢查",
      "definition_en": "review",
      "explanation": "仔細檢查。正式錄音前，我們會再過一遍（go over）和弦表以防出錯。",
      "example": "Go over it.",
      "level": "easy"
    },
    {
      "word": "hold on",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/hoʊld ɒn/",
      "definition_zh": "等一下",
      "definition_en": "wait",
      "explanation": "請對方稍候。排練時有人斷弦了，他會喊 'Hold on' 請大家停一下。",
      "example": "Hold on.",
      "level": "easy"
    },
    {
      "word": "keep up",
      "type": "word",
      "category": "Work",
      "phonetic": "/kiːp ʌp/",
      "definition_zh": "跟上",
      "definition_en": "maintain pace",
      "explanation": "保持同樣的速度或水準。如果鼓手加速了，其他人必須努力跟上（keep up with the tempo）。",
      "example": "Keep up.",
      "level": "easy"
    },
    {
      "word": "look for",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/lʊk fər/",
      "definition_zh": "尋找",
      "definition_en": "search",
      "explanation": "尋找某物。樂手永遠在找（looking for）那個完美的音色或那把夢想中的吉他。",
      "example": "Look for it.",
      "level": "easy"
    },
    {
      "word": "look into",
      "type": "word",
      "category": "Work",
      "phonetic": "/lʊk ˈɪn.tuː/",
      "definition_zh": "調查",
      "definition_en": "investigate",
      "explanation": "研究或檢查細節。如果音頻介面有雜音，我們需要調查一下（look into it）。",
      "example": "Look into it.",
      "level": "easy"
    },
    {
      "word": "make up",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/meɪk ʌp/",
      "definition_zh": "編造/和好",
      "definition_en": "invent or reconcile",
      "explanation": "可以指編造一段旋律（make up a melody），或是補償錯失的練習時間。",
      "example": "Make up story.",
      "level": "easy"
    },
    {
      "word": "pass out",
      "type": "word",
      "category": "Emotion",
      "phonetic": "/pæs aʊt/",
      "definition_zh": "昏倒",
      "definition_en": "faint",
      "explanation": "昏迷或發放。例如：表演太激烈差點昏倒，或者發放（passing out）宣傳單。",
      "example": "He passed out.",
      "level": "easy"
    },
    {
      "word": "point out",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/pɔɪnt aʊt/",
      "definition_zh": "指出",
      "definition_en": "indicate",
      "explanation": "指明某個事實。製作人可能會指出（point out）歌聲中有點走音的地方。",
      "example": "Point it out.",
      "level": "easy"
    },
    {
      "word": "set up",
      "type": "word",
      "category": "Work",
      "phonetic": "/set ʌp/",
      "definition_zh": "設置",
      "definition_en": "arrange",
      "explanation": "架設器材。對樂手來說，'set up' 鼓組或音箱是每場演出的必經流程。",
      "example": "Set it up.",
      "level": "easy"
    },
    {
      "word": "take off",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/teɪk ɒf/",
      "definition_zh": "起飛/脫下",
      "definition_en": "remove or depart",
      "explanation": "脫掉衣服或起步成功。如果一首歌突然變得很受歡迎，我們會說 'The song really took off'。",
      "example": "Take off shoes.",
      "level": "easy"
    },
    {
      "word": "try out",
      "type": "word",
      "category": "Work",
      "phonetic": "/traɪ aʊt/",
      "definition_zh": "試試看",
      "definition_en": "test",
      "explanation": "測試新事物。在買新效果器前，一定要親自試聽看看（try it out）。",
      "example": "Try it out.",
      "level": "easy"
    },
    {
      "word": "turn on",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/tɜːrn ɒn/",
      "definition_zh": "打開",
      "definition_en": "activate",
      "explanation": "開啟電源。演出前第一件事就是把音箱打開（turn on the amp）。",
      "example": "Turn it on.",
      "level": "easy"
    },
    {
      "word": "turn off",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/tɜːrn ɒf/",
      "definition_zh": "關掉",
      "definition_en": "deactivate",
      "explanation": "關閉電源。記得把沒用的效果器關掉（turn it off）以減少雜訊。",
      "example": "Turn it off.",
      "level": "easy"
    },
    {
      "word": "work out",
      "type": "word",
      "category": "Work",
      "phonetic": "/wɜːrk aʊt/",
      "definition_zh": "解決/運動",
      "definition_en": "solve or exercise",
      "explanation": "找到解決方案。如果編曲卡住了，我們得花時間把它理順（work it out）。",
      "example": "Work it out.",
      "level": "easy"
    },
    {
      "word": "comping",
      "type": "music",
      "category": "Performance",
      "phonetic": "/ˈkɑːm.pɪŋ/",
      "definition_zh": "伴奏",
      "definition_en": "chord support",
      "explanation": "源自 'accompanying'。指鋼琴或吉他手在樂團中為獨奏者提供和聲背景與節奏脈絡的過程，好的 comping 應該像是在跟獨奏者對話。",
      "example": "Good comping.",
      "level": "medium"
    },
    {
      "word": "swing feel",
      "type": "music",
      "category": "Rhythm",
      "phonetic": "/swɪŋ fiːl/",
      "definition_zh": "搖擺感",
      "definition_en": "swing rhythm",
      "explanation": "爵士樂與藍調的靈魂。指將連續的八分音符演奏成『長-短』的律動（類似三連音），讓音樂產生一種跳躍、搖擺的推動力。",
      "example": "Feel the swing.",
      "level": "medium"
    },
    {
      "word": "laid-back",
      "type": "music",
      "category": "Rhythm",
      "phonetic": "/ˌleɪdˈbæk/",
      "definition_zh": "後拍",
      "definition_en": "behind the beat",
      "explanation": "指演奏時故意稍微落在節拍器的『正後方』，讓音樂聽起來更放鬆、更懶散。這不是掉節奏，而是一種精確的律動掌控（常見於 R&B、Jazz）。",
      "example": "Play laid-back.",
      "level": "medium"
    },
    {
      "word": "ahead of the beat",
      "type": "music",
      "category": "Rhythm",
      "phonetic": "/əˈhed əv ðə biːt/",
      "definition_zh": "前拍",
      "definition_en": "before beat",
      "explanation": "指演奏時位置稍微比節拍器的『正點』前面一點點。常用於增加音樂的能量感與急迫感，讓音樂聽起來更積極、更有衝勁。",
      "example": "Play ahead.",
      "level": "medium"
    },
    {
      "word": "chromatic",
      "type": "music",
      "category": "Theory",
      "phonetic": "/kroʊˈmætɪk/",
      "definition_zh": "半音階",
      "definition_en": "using all notes",
      "explanation": "指使用半音階（所有 12 個音符）進行創作或演奏。半音階的樂句能增加音樂的張力與色彩感，打破調性的單調。",
      "example": "Chromatic line.",
      "level": "medium"
    },
    {
      "word": "passing tone",
      "type": "music",
      "category": "Theory",
      "phonetic": "/ˈpæsɪŋ toʊn/",
      "definition_zh": "經過音",
      "definition_en": "connecting note",
      "explanation": "指連接兩個穩定和弦音（chord tones）之間的非和弦音。它像是橋樑一樣，讓旋律與旋律之間的過度更平滑、更有方向感。",
      "example": "Use passing tone.",
      "level": "medium"
    },
    {
      "word": "target note",
      "type": "music",
      "category": "Theory",
      "phonetic": "/ˈtɑːr.ɡɪt noʊt/",
      "definition_zh": "目標音",
      "definition_en": "important note",
      "explanation": "在即興或旋律創作中，預先設定好要落在的『關鍵音』（通常是強拍上的和弦音）。這是讓樂句聽起來有目的感與合理性的關鍵。",
      "example": "Hit target note.",
      "level": "medium"
    },
    {
      "word": "enclosure",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ɪnˈkloʊ.ʒər/",
      "definition_zh": "包圍音",
      "definition_en": "note surrounding",
      "explanation": "一種爵士樂的修飾技巧。指用目標音上方半音與下方半音（或其他組合）來『包圍』該目標音，最後才落在目標音上，增加旋律的層次感。",
      "example": "Use enclosure.",
      "level": "hard"
    },
    {
      "word": "Sounds good",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/saʊndz ɡʊd/",
      "definition_zh": "聽起來不錯",
      "definition_en": "okay",
      "explanation": "用來表示贊同對方的提議。例如：『我們約六點排練，可以嗎？』回 'Sounds good' 簡潔有力。",
      "context": "達成共識或同意提議。",
      "example": "Sounds good to me.",
      "level": "easy"
    },
    {
      "word": "I'm in",
      "type": "daily",
      "category": "Social",
      "phonetic": "/aɪm ɪn/",
      "definition_zh": "我加入",
      "definition_en": "I'm interested",
      "explanation": "表示要參與某個計畫。如果有人揪團去聽表演或是去聚餐，說 'I'm in!' 表示你也包含在內。",
      "context": "表示參與意願。",
      "example": "I'm in!",
      "level": "easy"
    },
    {
      "word": "I'm out",
      "type": "daily",
      "category": "Social",
      "phonetic": "/aɪm aʊt/",
      "definition_zh": "我不參加",
      "definition_en": "I'm not joining",
      "explanation": "表示退出計畫，或是有時候在搞笑中表示受不了某事而離開。例如：『這段獨奏太難了，我不行（I'm out）。』",
      "context": "表示拒絕或退出。",
      "example": "I'm out.",
      "level": "easy"
    },
    {
      "word": "That sucks",
      "type": "daily",
      "category": "Emotion",
      "phonetic": "/ðæt sʌks/",
      "definition_zh": "真糟",
      "definition_en": "that's bad",
      "explanation": "用來同情對方的壞運氣或是抱怨某事。如果效果器壞了，或是表演被取消，這是最直接的反應。",
      "context": "同情或抱怨糟糕的情況。",
      "example": "That sucks.",
      "level": "easy"
    },
    {
      "word": "No big deal",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/noʊ bɪɡ diːl/",
      "definition_zh": "沒什麼",
      "definition_en": "not important",
      "explanation": "表示事情沒那麼嚴重。當你彈錯一個音或是遲到了幾分鐘，對方說 'No big deal' 表示他們不在意。",
      "context": "安慰對方或表示不在意。",
      "example": "No big deal.",
      "level": "easy"
    },
    {
      "word": "Give me a sec",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/ɡɪv mi ə sek/",
      "definition_zh": "等我一下",
      "definition_en": "wait a moment",
      "explanation": "口語的 'Give me a second'。在調音或是插導線時最常用到這句話。",
      "context": "請求對方稍候。",
      "example": "Give me a sec.",
      "level": "easy"
    },
    {
      "word": "My bad",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/maɪ bæd/",
      "definition_zh": "我的錯",
      "definition_en": "my mistake",
      "explanation": "承認錯誤的非常口語說法（而非 formal 的 I apologize）。排練中如果搶拍了，拍一下胸口說 'My bad' 就行了。",
      "context": "口語化的道歉。",
      "example": "My bad.",
      "level": "easy"
    },
    {
      "word": "I got you",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/aɪ ɡɑːt ju/",
      "definition_zh": "我幫你",
      "definition_en": "I understand/help",
      "explanation": "可以指『我懂你的意思』，也可以指『我會支持你/幫你』。比如鼓手說這段節奏換不動，貝斯手說 'I got you'（我會穩住節奏）。",
      "context": "表示理解、支持或提供幫助。",
      "example": "I got you.",
      "level": "easy"
    },
    {
      "word": "You're good",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/jʊr ɡʊd/",
      "definition_zh": "你沒問題",
      "definition_en": "it's fine",
      "explanation": "用來安慰對方不用擔心。如果有人道歉，回 'You're good' 意思是『沒關係，你做得很好』。",
      "context": "表示沒關係或肯定對方。",
      "example": "You're good.",
      "level": "easy"
    },
    {
      "word": "Let's go",
      "type": "daily",
      "category": "Social",
      "phonetic": "/lets ɡoʊ/",
      "definition_zh": "走吧",
      "definition_en": "let's start",
      "explanation": "除了指離開某地，在現代口語中也常用來表示興奮或給予精神上的鼓勵，就像日文的『加油（Yoshi!）』或是中文的『衝啊！』。",
      "context": "出發、開始或激勵。",
      "level": "easy"
    },
    {
      "word": "allow",
      "type": "word",
      "category": "Work",
      "phonetic": "/əˈlaʊ/",
      "definition_zh": "允許",
      "definition_en": "let happen",
      "explanation": "給予許可。錄音室通常不『允許』（allow）飲食，以保護昂貴的器材。",
      "example": "I allow it.",
      "level": "easy"
    },
    {
      "word": "avoid",
      "type": "word",
      "category": "Performance",
      "phonetic": "/əˈvɔɪd/",
      "definition_zh": "避免",
      "definition_en": "stay away",
      "explanation": "避開不想要的情況。在台上要『避免』（avoid）踩到導線，以免造成斷音或跌倒。",
      "example": "Avoid mistakes.",
      "level": "easy"
    },
    {
      "word": "belong",
      "type": "word",
      "category": "Theory",
      "phonetic": "/bɪˈlɒŋ/",
      "definition_zh": "屬於",
      "definition_en": "be part of",
      "explanation": "指某個音符或元素是否屬於當下的調性或和弦。例如：『這顆音不屬於（doesn't belong）這組和弦。』",
      "example": "It belongs here.",
      "level": "easy"
    },
    {
      "word": "compare",
      "type": "word",
      "category": "Work",
      "phonetic": "/kəmˈpɛər/",
      "definition_zh": "比較",
      "definition_en": "examine differences",
      "explanation": "對比兩者。混音時，我們會『比較』（compare）有無效果器處理前後的差異。",
      "example": "Compare both.",
      "level": "easy"
    },
    {
      "word": "consider",
      "type": "word",
      "category": "Work",
      "phonetic": "/kənˈsɪdər/",
      "definition_zh": "考慮",
      "definition_en": "think about",
      "explanation": "思考某個選擇。編曲時，我們會『考慮』（consider）是否要在這段加入鼓的獨奏。",
      "example": "Consider it.",
      "level": "easy"
    },
    {
      "word": "depend",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/dɪˈpend/",
      "definition_zh": "依賴",
      "definition_en": "rely on",
      "explanation": "視情況而定。演出效果好不好，往往『取決於』（depends on）現場的音響工程師。",
      "example": "It depends.",
      "level": "easy"
    },
    {
      "word": "explain",
      "type": "word",
      "category": "Theory",
      "phonetic": "/ɪkˈspleɪn/",
      "definition_zh": "解釋",
      "definition_en": "make clear",
      "explanation": "釐清概念。老師正在『解釋』（explain）如何運用利底亞（Lydian）調性進行即興。",
      "example": "Explain it.",
      "level": "easy"
    },
    {
      "word": "improve",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ɪmˈpruːv/",
      "definition_zh": "改善",
      "definition_en": "get better",
      "explanation": "提升水準。每天規律練習音階能顯著『改善』（improve）你的手指靈巧度。",
      "example": "Improve skills.",
      "level": "easy"
    },
    {
      "word": "increase",
      "type": "word",
      "category": "Work",
      "phonetic": "/ɪnˈkriːs/",
      "definition_zh": "增加",
      "definition_en": "grow",
      "explanation": "調高或增長。如果吉他聽不清楚，我們可以『增加』（increase）一點中頻音量。",
      "example": "Increase speed.",
      "level": "easy"
    },
    {
      "word": "reduce",
      "type": "word",
      "category": "Work",
      "phonetic": "/rɪˈdjuːs/",
      "definition_zh": "減少",
      "definition_en": "make smaller",
      "explanation": "調低或縮減。錄音時如果發現底噪太重，需要『減少』（reduce）增益（gain）的大小。",
      "example": "Reduce noise.",
      "level": "easy"
    },
    {
      "word": "realize",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ˈriː.ə.laɪz/",
      "definition_zh": "意識到",
      "definition_en": "become aware",
      "explanation": "突然明白。表演完聽側錄，我才『意識到』（realized）我整首歌都彈快了。",
      "example": "I realize now.",
      "level": "easy"
    },
    {
      "word": "recognize",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/ˈrek.əɡ.naɪz/",
      "definition_zh": "辨認",
      "definition_en": "identify",
      "explanation": "聽出或認出。身為樂手，我們需要能快速『辨認出』（recognize）聽到的和弦進行。",
      "example": "Recognize sound.",
      "level": "easy"
    },
    {
      "word": "remember",
      "type": "word",
      "category": "Daily Life",
      "phonetic": "/rɪˈmem.bər/",
      "definition_zh": "記得",
      "definition_en": "recall",
      "explanation": "想起。要在台上不看譜，你必須『背下』（remember）整首曲子的結構。",
      "example": "Remember this.",
      "level": "easy"
    },
    {
      "word": "remind",
      "type": "word",
      "category": "Social",
      "phonetic": "/rɪˈmaɪnd/",
      "definition_zh": "提醒",
      "definition_en": "help remember",
      "explanation": "告知。演出前，團長會『提醒』（reminds）大家要帶備用琴弦。",
      "example": "Remind me.",
      "level": "easy"
    },
    {
      "word": "suggest",
      "type": "word",
      "category": "Social",
      "phonetic": "/səˈdʒest/",
      "definition_zh": "建議",
      "definition_en": "propose",
      "explanation": "提出想法。製作人『建議』（suggests）在副歌加入一點合唱，增加層次感。",
      "example": "I suggest this.",
      "level": "easy"
    },
    {
      "word": "suppose",
      "type": "word",
      "category": "Work",
      "phonetic": "/səˈpoʊz/",
      "definition_zh": "假設",
      "definition_en": "assume",
      "explanation": "常用於『原本應該...』的情況。例如：我們『本來應該』（were supposed to）七點準時試音。",
      "example": "Suppose it's true.",
      "level": "medium"
    },
    {
      "word": "require",
      "type": "word",
      "category": "Work",
      "phonetic": "/rɪˈkwaɪər/",
      "definition_zh": "需要",
      "definition_en": "need",
      "explanation": "必須具備的條件。這段高難度獨奏『需要』（requires）極強的點擊（tapping）技巧。",
      "example": "It requires effort.",
      "level": "medium"
    },
    {
      "word": "provide",
      "type": "word",
      "category": "Work",
      "phonetic": "/prəˈvaɪd/",
      "definition_zh": "提供",
      "definition_en": "give",
      "explanation": "供應。主辦單位通常會『提供』（provide）音箱與鼓組等背板（backline）。",
      "example": "Provide help.",
      "level": "easy"
    },
    {
      "word": "receive",
      "type": "word",
      "category": "Work",
      "phonetic": "/rɪˈsiːv/",
      "definition_zh": "收到",
      "definition_en": "get",
      "explanation": "得到。演出結束後，我們會『收到』（receive）這次的車馬費或酬勞。",
      "example": "Receive message.",
      "level": "easy"
    },
    {
      "word": "respond",
      "type": "word",
      "category": "Performance",
      "phonetic": "/rɪˈspɑːnd/",
      "definition_zh": "回應",
      "definition_en": "reply",
      "explanation": "反應應對。在即興對話中，你需要觀察並『回應』（respond to）其他樂手的樂句。",
      "example": "Respond quickly.",
      "level": "easy"
    },
    {
      "word": "stay",
      "type": "word",
      "category": "Performance",
      "phonetic": "/steɪ/",
      "definition_zh": "保持",
      "definition_en": "remain",
      "explanation": "維持狀態。在快節奏中，樂手需要努力『保持』（stay）在拍點上不趕拍。",
      "example": "Stay calm.",
      "level": "easy"
    },
    {
      "word": "remain",
      "type": "word",
      "category": "Social",
      "phonetic": "/rɪˈmeɪn/",
      "definition_zh": "仍然",
      "definition_en": "continue to be",
      "explanation": "持續處於某種狀態。即便演出出意外，也要『保持』（remain）冷靜並繼續彈奏。",
      "example": "Remain quiet.",
      "level": "easy"
    },
    {
      "word": "seem",
      "type": "word",
      "category": "Conversation",
      "phonetic": "/siːm/",
      "definition_zh": "似乎",
      "definition_en": "appear",
      "explanation": "看起來。這台二手琴『似乎』（seems）保養得很好，聲音很亮。",
      "example": "It seems right.",
      "level": "easy"
    },
    {
      "word": "appear",
      "type": "word",
      "category": "Social",
      "phonetic": "/əˈpɪər/",
      "definition_zh": "出現",
      "definition_en": "become visible",
      "explanation": "在台上現身。當燈光亮起，主唱在舞台中央『出現』（appears），全場歡呼。",
      "example": "It appears suddenly.",
      "level": "easy"
    },
    {
      "word": "happen",
      "type": "word",
      "category": "Social",
      "phonetic": "/ˈhæp.ən/",
      "definition_zh": "發生",
      "definition_en": "take place",
      "explanation": "出乎意料的事件。現場演出總會『發生』（happen）一些器材失靈的意外，需要變通。",
      "example": "It happens.",
      "level": "easy"
    },
    {
      "word": "I'm all set",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/aɪm ɔːl set/",
      "definition_zh": "我準備好了",
      "definition_en": "I'm ready",
      "explanation": "表示準備就緒，或者在別人詢問是否需要幫助時表示『我已經弄好了』。例如：調音完成後對團員說 'I'm all set'。",
      "context": "準備就緒或表示不需要更多幫助。",
      "example": "I'm all set.",
      "level": "easy"
    },
    {
      "word": "That makes sense",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/ðæt meɪks sens/",
      "definition_zh": "有道理",
      "definition_en": "logical",
      "explanation": "表示理解對方的邏輯。如果製作人解釋為什麼要調整段落順序，你可以用這句話表示認同。",
      "context": "認同對方的邏輯或解釋。",
      "example": "That makes sense.",
      "level": "easy"
    },
    {
      "word": "I feel you",
      "type": "daily",
      "category": "Emotion",
      "phonetic": "/aɪ fiːl ju/",
      "definition_zh": "我懂你",
      "definition_en": "I understand",
      "explanation": "比 I understand 更感性的說法，表示能體會對方的感受。如果團員抱怨練習很累，說 'I feel you' 表示感同身受。",
      "context": "對他人的感受表示共鳴。",
      "example": "I feel you.",
      "level": "easy"
    },
    {
      "word": "It's up to you",
      "type": "daily",
      "category": "Social",
      "phonetic": "/ɪts ʌp tu ju/",
      "definition_zh": "看你決定",
      "definition_en": "your choice",
      "explanation": "將決定權交給對方。例如：獨奏要彈幾小節？'It's up to you'。",
      "context": "交付決定權。",
      "example": "It's up to you.",
      "level": "easy"
    },
    {
      "word": "I'm just saying",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/aɪm dʒʌst ˈseɪ.ɪŋ/",
      "definition_zh": "我只是說",
      "definition_en": "just opinion",
      "explanation": "用來緩和語氣，表示這只是個人意見，不想引起爭執。通常放在給出建議或批評之後。",
      "context": "緩和語氣，強調這只是個人觀點。",
      "example": "I'm just saying.",
      "level": "easy"
    },
    {
      "word": "Let's call it a day",
      "type": "daily",
      "category": "Work",
      "phonetic": "/lets kɔːl ɪt ə deɪ/",
      "definition_zh": "今天就到這",
      "definition_en": "stop working",
      "explanation": "提議結束當天的工作或練習。排練室時間快到了，或是大家累了，就說 'Let's call it a day'。",
      "context": "結束當天工作的提議。",
      "example": "Let's call it a day.",
      "level": "easy"
    },
    {
      "word": "I'm not sure",
      "type": "daily",
      "category": "Conversation",
      "phonetic": "/aɪm nɑːt ʃʊr/",
      "definition_zh": "我不確定",
      "definition_en": "uncertain",
      "explanation": "表達不確定性。如果被問到某個複雜的和弦，或是某次演出的日期，可以用這句話緩衝。",
      "context": "表達不確定或委婉拒絕回答。",
      "example": "I'm not sure.",
      "level": "easy"
    },
    {
      "word": "Give it a try",
      "type": "daily",
      "category": "Social",
      "phonetic": "/ɡɪv ɪt ə traɪ/",
      "definition_zh": "試試看",
      "definition_en": "try it",
      "explanation": "鼓勵對方嘗試新事物。如果吉他手不確定新的效果設定好不好，你可以回 'Give it a try'。",
      "context": "鼓勵他人行動。",
      "example": "Give it a try.",
      "level": "easy"
    },
    {
      "word": "That sounds right",
      "type": "daily",
      "category": "Performance",
      "phonetic": "/ðæt saʊndz raɪt/",
      "definition_zh": "聽起來對",
      "definition_en": "seems correct",
      "explanation": "確認聲音或邏輯正確。在對譜或是檢查旋律時，這句話非常常用。",
      "context": "確認聲音、音準或邏輯的正確性。",
      "example": "That sounds right.",
      "level": "easy"
    },
    {
      "word": "I don't mind",
      "type": "daily",
      "category": "Social",
      "phonetic": "/aɪ doʊnt maɪnd/",
      "definition_zh": "我不介意",
      "definition_en": "it's fine",
      "explanation": "表示隨和，沒什麼特別偏好。例如：排練完要吃什麼？'I don't mind'。",
      "context": "表示隨和、無特別意見。",
      "level": "easy"
    },
    {
      "word": "motif",
      "type": "music",
      "category": "Composition",
      "phonetic": "/moʊˈtiːf/",
      "definition_zh": "動機發展",
      "definition_en": "small idea",
      "explanation": "指一段短小、具有辨識度的旋律或節奏片段。它是作曲與即興發展的種子，透過變奏、模仿等手段可以演變成完整的曲子。",
      "example": "Develop motif.",
      "level": "medium"
    },
    {
      "word": "sequence",
      "type": "music",
      "category": "Theory",
      "phonetic": "/ˈsiː.kwəns/",
      "definition_zh": "序列",
      "definition_en": "repeat pattern",
      "explanation": "指將同一個音樂動機（motif）在不同的音高位置重複出現。這是讓旋律聽起來有邏輯、有規律感的一種重要技巧。",
      "example": "Use sequence.",
      "level": "medium"
    },
    {
      "word": "resolution",
      "type": "music",
      "category": "Theory",
      "phonetic": "/ˌrez.əˈluː.ʃən/",
      "definition_zh": "解決",
      "definition_en": "note resolution",
      "explanation": "指從不穩定、有張力的和弦或非和弦音，過渡到穩定、平衡的目標音（通常是和弦音）。這是音樂產生「釋放感」的關鍵。",
      "example": "Resolve tension.",
      "level": "medium"
    },
    {
      "word": "tension",
      "type": "music",
      "category": "Theory",
      "phonetic": "/ˈten.ʃən/",
      "definition_zh": "張力",
      "definition_en": "harmonic tension",
      "explanation": "指音樂中產生的不穩定感或急迫感（如屬和弦或延伸音）。張力累積得越多，後續的『解決』（resolution）就會顯得越有力。",
      "example": "Create tension.",
      "level": "medium"
    },
    {
      "word": "outside playing",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˌaʊtˈsaɪd ˈpleɪ.ɪŋ/",
      "definition_zh": "外音演奏",
      "definition_en": "outside harmony",
      "explanation": "爵士樂的高階技巧。指在即興時故意演奏與當下和弦完全無關、甚至衝突的音階或音程，之後再帶回內音，產生強烈的能量對比。",
      "example": "Play outside.",
      "level": "hard"
    },
    {
      "word": "inside playing",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˌɪnˈsaɪd ˈpleɪ.ɪŋ/",
      "definition_zh": "內音演奏",
      "definition_en": "inside harmony",
      "explanation": "指演奏完全符合當下和弦與調性的音符。這是初學即興的基礎，也是為了跟『外音演奏』（outside playing）做出區別的基準。",
      "example": "Stay inside.",
      "level": "easy"
    },
    {
      "word": "bebop line",
      "type": "music",
      "category": "Jazz",
      "phonetic": "/ˈbiː.bɑːp laɪn/",
      "definition_zh": "bebop句型",
      "definition_en": "jazz phrase",
      "explanation": "指典型的咆哮樂（Bebop）風格旋律句型。通常包含大量的半音趨近（chromaticism）、包圍音（enclosures）與快速的律動。",
      "example": "Play bebop line.",
      "level": "medium"
    },
    {
      "word": "approach note",
      "type": "music",
      "category": "Theory",
      "phonetic": "/əˈproʊtʃ noʊt/",
      "definition_zh": "接近音",
      "definition_en": "lead note",
      "explanation": "指用來引導、趨近到目標音（target note）的過渡音。它可以是調內的，也可以是半音階（chromatic）的趨近音。",
      "example": "Use approach note.",
      "level": "medium"
    },
    {
      "word": "double time",
      "type": "music",
      "category": "Rhythm",
      "phonetic": "/ˌdʌb.əl ˈtaɪm/",
      "definition_zh": "倍速",
      "definition_en": "double speed",
      "explanation": "指在維持原有節拍長度的同時，將音符穿插的密度增加一倍（例如把四分音符當成二分音符在感覺）。常見於即興中突然加快節奏感的段落。",
      "example": "Play double time.",
      "level": "medium"
    },
    {
      "word": "space",
      "type": "music",
      "category": "Performance",
      "phonetic": "/speɪs/",
      "definition_zh": "留白",
      "definition_en": "use silence",
      "explanation": "指演奏中的沈默或短暫停頓。在即興中『留白』是非常高級的藝術，它能讓音樂呼吸，並讓前面的樂句有時間被聽眾吸收。",
      "example": "Leave space.",
      "level": "easy"
    }
];

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
    lastShadowingDate: localStorage.getItem('last_shadowing_date') || new Date().toDateString(),
    shadowingStats: JSON.parse(localStorage.getItem('shadowing_stats') || '{"completed": 0, "good": 0, "tryAgain": 0}')
};

// --- Daily State Reset Logic ---
const today = new Date().toDateString();
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

    const vocabularyDone = state.daily?.items.filter(i => i.status === 'done').length || 0;
    const listeningDone = (state.listeningSessionCount >= 10) ? 1 : 0;
    const shadowingDone = (state.shadowingSessionCount >= 5) ? 1 : 0;

    return {
        todayDone: vocabularyDone + listeningDone + shadowingDone,
        todayTotal: 10,
        totalDays,
        masteredCount,
        wordProgress: getProgressForType('word'),
        dailyProgress: getProgressForType('daily'),
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
        <div class="sectional-progress">
            <div class="progress-row">
                <div class="progress-info">
                    <span>Core Words</span>
                    <span>${stats.wordProgress}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill word" style="width: ${stats.wordProgress}%"></div>
                </div>
            </div>
            <div class="progress-row">
                <div class="progress-info">
                    <span>Daily English</span>
                    <span>${stats.dailyProgress}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill daily" style="width: ${stats.dailyProgress}%"></div>
                </div>
            </div>
            <div class="progress-row">
                <div class="progress-info">
                    <span>Music Terms</span>
                    <span>${stats.musicProgress}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill music" style="width: ${stats.musicProgress}%"></div>
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
    const words = INITIAL_DATA.filter(w => !typeFilter || w.type === typeFilter);
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

    const selected = [
        ...selectFromSubPool(easyPool, counts[0]),
        ...selectFromSubPool(mediumPool, counts[1]),
        ...selectFromSubPool(hardPool, counts[2])
    ];

    return selected.sort(() => Math.random() - 0.5).slice(0, count);
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

    renderProgressDashboard();

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
                updateSRSGlobal(itemData.word, rank, rank > 0);
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
    // Priority: use the adaptive pool to select 8 items
    const selected = [
        ...getAdaptivePool(4, 'word'),
        ...getAdaptivePool(2, 'music'),
        ...getAdaptivePool(2, 'daily')
    ];

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
    const modeTabs = document.querySelectorAll('#listening-mode-switcher .tab-btn');
    const completionScreen = document.getElementById('listening-completion');
    const continueBtn = document.getElementById('listening-continue-btn');
    const endBtn = document.getElementById('listening-end-btn');

    let currentTarget = null;
    let isAnswering = false;

    // Initialize session state - REMOVED hard reset to allow daily persistence
    // state.listeningSessionCount = 0; 


    const startNewQuestion = () => {
        // Check for Daily Goal completion
        if (state.activeListeningMode === 'daily' && state.listeningSessionCount >= 10) {
            showCompletionUI();
            return;
        }

        isAnswering = false;
        feedbackPanel.classList.add('hidden');
        completionScreen.classList.add('hidden');
        optionsGrid.innerHTML = '';
        streakDisplay.textContent = state.streak;
        statusText.textContent = 'What word did you hear?';
        playBtn.classList.remove('playing');

        // Adaptive Selection
        currentTarget = getAdaptivePool(1)[0];

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
            state.listeningSessionCount++;
            saveToStorage(); // Persist progress globally
            
            updateSRSGlobal(currentTarget.word, 2, true); // Rank 2 = Easy
            adjustAdaptiveScore(1); // Small boost
            showFeedback(true);
            setTimeout(startNewQuestion, 2000);
        } else {
            btn.classList.add('wrong');
            state.streak = 0;
            updateSRSGlobal(currentTarget.word, 0, false); // Rank 0 = Hard
            
            // Track Listening Error specifically
            if (!state.progress[currentTarget.word]) {
                state.progress[currentTarget.word] = { familiarity: 0, nextReviewDate: new Date().toISOString() };
            }
            state.progress[currentTarget.word].listenWrongCount = (state.progress[currentTarget.word].listenWrongCount || 0) + 1;
            
            adjustAdaptiveScore(-2); // Penalty
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
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}">
                    ${isCorrect ? 'Correct! ✅' : 'Wrong ❌'}
                </h2>
                ${state.activeListeningMode === 'daily' ? `<span style="font-size:0.8rem; color:var(--muted)">Progress: ${state.listeningSessionCount}/10</span>` : ''}
            </div>
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

    const showCompletionUI = () => {
        completionScreen.classList.remove('hidden');
        feedbackPanel.classList.add('hidden');
    };

    // Mode Switcher Logic
    modeTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === state.activeListeningMode);
        tab.onclick = () => {
            state.activeListeningMode = tab.dataset.mode;
            modeTabs.forEach(t => t.classList.toggle('active', t === tab));
            startNewQuestion();
        };
    });

    // Completion Handlers
    continueBtn.onclick = () => {
        state.activeListeningMode = 'practice';
        modeTabs.forEach(t => t.classList.toggle('active', t.dataset.mode === 'practice'));
        startNewQuestion();
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
    if (viewName === 'me') initMeView();
    
    // Legacy support for sub-views launched from Learn/Words
    if (viewName === 'listening') initListeningView();
    if (viewName === 'shadowing') initShadowingView();
    if (viewName === 'daily-english') initDailyEnglishView();
    if (viewName === 'music') initMusicView();
    if (viewName === 'search') initSearchView();
    if (viewName === 'collection') initCollectionView();
    if (viewName === 'weakness') initWeaknessView();
    if (viewName === 'flashcards') initFlashcardsView();
    if (viewName === 'pro-review') initProReviewView();
};

// --- 🏠 Home View Logic ---
const initHomeView = () => {
    const searchInput = document.getElementById('home-search-input');
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
            // Need to write startProReview()
            generateProReviewPool();
            switchView('pro-review');
        };
    }
};

// --- 📖 Learn View Logic ---
const initLearnView = () => {
    const cards = document.querySelectorAll('.learn-card');
    cards.forEach(card => {
        card.onclick = () => switchView(card.dataset.subview);
    });
};

// --- 📚 Words View Logic (Combined Tool) ---
const initWordsView = () => {
    const searchInput = document.getElementById('words-search-input');
    const tabBtns = document.querySelectorAll('#words-tab-control .tab-btn');
    const content = document.getElementById('words-section-content');

    const renderSection = (sec) => {
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.sec === sec));
        content.innerHTML = '';
        
        if (sec === 'collection') {
            const listEl = document.createElement('div');
            listEl.id = 'words-collection-list';
            content.appendChild(listEl);
            initCollectionView('words-collection-list');
        } else if (sec === 'weakness') {
            const listEl = document.createElement('div');
            listEl.id = 'words-weakness-list';
            content.appendChild(listEl);
            initWeaknessView('words-weakness-list');
        } else if (sec === 'search-results') {
            const listEl = document.createElement('div');
            listEl.id = 'words-search-results';
            content.appendChild(listEl);
            // Search result is handled by the search logic
        }
    };

    // Default to collection
    renderSection('collection');

    tabBtns.forEach(btn => {
        btn.onclick = () => renderSection(btn.dataset.sec);
    });

    searchInput.onkeypress = (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            const query = searchInput.value.trim();
            renderSection('search-results');
            document.getElementById('words-api-tab').classList.add('active');
            
            // Re-trigger global initSearchView logic but pointed to our results div
            initSearchView('words-search-results', query);
        }
    };
};

// --- 👤 Me View Logic ---
const initMeView = () => {
    const totalWordsEl = document.getElementById('me-total-words');
    const streakRecordEl = document.getElementById('me-streak-record');
    const masteryScoreEl = document.getElementById('me-mastery-score');
    const joinDateEl = document.getElementById('me-join-date');
    const loopBtns = document.querySelectorAll('#me-loop-setting button');
    const clearDataBtn = document.getElementById('me-clear-data');

    // 1. Stats
    const stats = getLearningStats();
    totalWordsEl.textContent = stats.masteredCount;
    streakRecordEl.textContent = stats.totalDays;
    masteryScoreEl.textContent = state.adaptiveScore;
    
    const joinDate = new Date(state.firstLoginDate);
    joinDateEl.textContent = `加入日期: ${joinDate.toLocaleDateString()}`;

    // 2. Loop Setting
    loopBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.val) === state.shadowingLoop);
        btn.onclick = () => {
            state.shadowingLoop = parseInt(btn.dataset.val);
            localStorage.setItem('shadowing_loop', state.shadowingLoop);
            initMeView();
            showNotification(`已更新跟讀循環為 ${state.shadowingLoop} 次`);
        };
    });

    // 3. Clear Data
    clearDataBtn.onclick = () => {
        if (confirm('警告：這將清除所有學習進度和收藏，確定嗎？')) {
            localStorage.clear();
            location.reload();
        }
    };
};

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
    const count = document.getElementById('collection-count');
    
    if (count) count.textContent = state.collection.length;

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
        list.style.animation = 'none';
        list.offsetHeight; // Trigger reflow
        list.style.animation = 'fadeIn 0.3s ease-out';
        
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
        list.style.animation = 'none';
        list.offsetHeight; // Trigger reflow
        list.style.animation = 'fadeIn 0.3s ease-out';
        
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

const globalMeBtn = document.getElementById('global-me-btn');
if (globalMeBtn) {
    globalMeBtn.addEventListener('click', () => switchView('me'));
}

// --- 🏆 Pro Review Engine ---

const generateProReviewPool = () => {
    const config = state.proReviewConfig || { mode: 'smart', length: 5, context: 'full' };
    const maxCount = parseInt(config.length) || 5;
    
    let pool = [];
    const now = new Date();
    
    // Assign Priority Score
    const scoredWords = INITIAL_DATA.map(w => {
        let score = 0;
        const prog = state.progress[w.word];
        
        if (config.mode === 'free') {
            // Random free mode
            score = Math.random() * 10;
        } else if (!prog || prog.status === 'new') {
            score = 1;
        } else {
            if (prog.status === 'weak') score += 5;
            if (new Date(prog.nextReviewDate) <= now) score += 4;
            if (prog.lastErrorDate && (now - new Date(prog.lastErrorDate)) < 24*60*60*1000) score += 3;
            if (prog.lastReviewDate && (now - new Date(prog.lastReviewDate)) > 7*24*60*60*1000) score += 2;
        }
        
        return { wordData: w, score, prog };
    });
    
    if (config.mode === 'weak') {
        const weakPool = scoredWords.filter(item => item.prog && (item.prog.status === 'weak' || calculateWeaknessScore(item.wordData.word) >= 5));
        pool = weakPool.sort((a, b) => b.score - a.score).slice(0, maxCount).map(i => i.wordData);
    } else if (config.mode === 'free') {
        pool = scoredWords.sort((a, b) => b.score - a.score).slice(0, maxCount).map(i => i.wordData);
    } else {
        // Smart mode
        pool = scoredWords.sort((a, b) => b.score - a.score).slice(0, maxCount).map(i => i.wordData);
    }
    
    // Fallback if empty
    if (pool.length === 0) pool = INITIAL_DATA.slice(0, maxCount);
    
    let initialWeakCount = 0;
    pool.forEach(w => {
        const p = state.progress[w.word];
        if (p && p.status === 'weak') initialWeakCount++;
    });

    state.proReviewState = {
        queue: pool,
        currentIndex: 0,
        currentStage: 'flashcard', // 'flashcard', 'listening', 'shadowing'
        stats: { completed: 0, reinforced: 0, initialWeak: initialWeakCount },
        wordScore: 0 // Track correctness streak across stages to end early
    };
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
                <div class="flashcard" id="pr-flash" style="width:100%;">
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
                    ${options.map((o, idx) => `<button class="option-btn" data-val="${o.word}" style="width:100%; height:auto; padding:15px; font-size:0.95rem; border:1px solid var(--border); border-radius:12px; background:var(--surface);">${o.definition_zh}</button>`).join('')}
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
        if (config.context === 'silent') {
            stageContainer.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; height:100%; flex-direction:column; gap:20px; text-align:center;">
                    <h3 style="color:var(--muted); margin-bottom:10px;">階段三：靜音默讀</h3>
                    <div style="font-size:1.5rem; font-weight:bold; margin:20px 0;">${sentence}</div>
                    <p style="color:var(--muted);">請在心中跟讀，並思考其意義。</p>
                    <button class="btn btn-primary" id="pr-silent-done" style="margin-top:40px; width:100%;">✅ 已完成默讀</button>
                </div>
            `;
            document.getElementById('pr-silent-done').onclick = () => nextStageOrWord(true);
        } else {
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

// Start with Home View
switchView('home');
