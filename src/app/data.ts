const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const questionsData = [
    {
      "sentence": "これは___です。",
      "word": "ねこ",
      "translation": "이것은 <span style='color:green;'>고양이</span>입니다.",
      "level": 1,
      "choices": ["ねこ", "いぬ", "とり", "うま"]
    },
    {
      "sentence": "___は空を飛びます。",
      "word": "とり",
      "translation": "<span style='color:green;'>새</span>는 하늘을 납니다.",
      "level": 1,
      "choices": ["とり", "ねこ", "さかな", "いぬ"]
    },
    {
      "sentence": "私の好きな色は___です。",
      "word": "あおい",
      "translation": "제가 좋아하는 색은 <span style='color:green;'>파란색</span>입니다.",
      "level": 2,
      "choices": ["あおい", "あかい", "きいろい", "みどり"]
    },
    {
      "sentence": "彼は___を飲みます。",
      "word": "みず",
      "translation": "그는 <span style='color:green;'>물</span>을 마십니다.",
      "level": 2,
      "choices": ["みず", "ジュース", "おちゃ", "ミルク"]
    },
    {
      "sentence": "私は毎日___を食べます。",
      "word": "りんご",
      "translation": "저는 매일 <span style='color:green;'>사과</span>를 먹습니다.",
      "level": 3,
      "choices": ["りんご", "バナナ", "オレンジ", "ぶどう"]
    },
    {
      "sentence": "私たちは___で遊びます。",
      "word": "ボール",
      "translation": "우리는 <span style='color:green;'>공</span>으로 놉니다.",
      "level": 3,
      "choices": ["ボール", "カード", "ビデオゲーム", "パズル"]
    },
    {
      "sentence": "あの人は私の___です。",
      "word": "せんせい",
      "translation": "저 사람은 제 <span style='color:green;'>선생님</span>입니다.",
      "level": 4,
      "choices": ["せんせい", "ともだち", "おかあさん", "おとうさん"]
    },
    {
      "sentence": "私の家には___がいます。",
      "word": "いぬ",
      "translation": "제 집에는 <span style='color:green;'>개</span>가 있습니다.",
      "level": 4,
      "choices": ["いぬ", "ねこ", "うさぎ", "とり"]
    },
    {
      "sentence": "彼女は___がとても上手です。",
      "word": "うたう",
      "translation": "그녀는 <span style='color:green;'>노래 부르기</span>가 매우 능숙합니다.",
      "level": 5,
      "choices": ["うたう", "おどる", "えがく", "あそぶ"]
    },
    {
      "sentence": "私は学校で___を学びます。",
      "word": "すうがく",
      "translation": "저는 학교에서 <span style='color:green;'>수학</span>을 배웁니다.",
      "level": 5,
      "choices": ["すうがく", "かがく", "しゃかい", "にほんご"]
    },
    {
      "sentence": "___は夏によく食べます。",
      "word": "すいか",
      "translation": "<span style='color:green;'>수박</span>은 여름에 자주 먹습니다.",
      "level": 6,
      "choices": ["すいか", "リンゴ", "オレンジ", "バナナ"]
    },
    {
      "sentence": "___で手を洗ってください。",
      "word": "みず",
      "translation": "<span style='color:green;'>물</span>로 손을 씻어 주세요.",
      "level": 6,
      "choices": ["みず", "ジュース", "おちゃ", "ミルク"]
    },
    {
      "sentence": "彼は___をして仕事に行きます。",
      "word": "あるく",
      "translation": "그는 <span style='color:green;'>걸어서</span> 일하러 갑니다.",
      "level": 7,
      "choices": ["あるく", "うごく", "とぶ", "はしる"]
    },
    {
      "sentence": "私の趣味は___をすることです。",
      "word": "よむ",
      "translation": "제 취미는 <span style='color:green;'>읽기</span>입니다.",
      "level": 7,
      "choices": ["よむ", "かく", "あそぶ", "きく"]
    },
    {
      "sentence": "彼女は___に乗って学校に来ます。",
      "word": "じてんしゃ",
      "translation": "그녀는 <span style='color:green;'>자전거</span>를 타고 학교에 옵니다.",
      "level": 8,
      "choices": ["じてんしゃ", "バス", "くるま", "ちかてつ"]
    },
    {
      "sentence": "冬になると、私たちは___を見ることができます。",
      "word": "ゆき",
      "translation": "겨울이 되면, 우리는 <span style='color:green;'>눈</span>을 볼 수 있습니다.",
      "level": 8,
      "choices": ["ゆき", "あめ", "くも", "はれ"]
    },
    {
      "sentence": "このケーキは___が入っています。",
      "word": "さとう",
      "translation": "이 케이크는 <span style='color:green;'>설탕</span>이 들어 있습니다.",
      "level": 9,
      "choices": ["さとう", "しお", "みず", "こめ"]
    },
    {
      "sentence": "夏休みには、海で___をします。",
      "word": "およぐ",
      "translation": "여름 방학에는, 바다에서 <span style='color:green;'>수영</span>을 합니다.",
      "level": 9,
      "choices": ["およぐ", "サーフィン", "たべる", "ねる"]
    },
    {
      "sentence": "私の家族は四人です。父、母、___、そして私です。",
      "word": "あね",
      "translation": "제 가족은 네 명입니다. 아버지, 어머니, <span style='color:green;'>언니</span>, 그리고 저입니다.",
      "level": 10,
      "choices": ["あね", "おとうと", "いもうと", "あに"]
    },
    {
      "sentence": "彼は___が大好きで、毎日練習しています。",
      "word": "サッカー",
      "translation": "그는 <span style='color:green;'>축구</span>를 매우 좋아해서, 매일 연습하고 있습니다.",
      "level": 10,
      "choices": ["サッカー", "バスケットボール", "テニス", "バレーボール"]
    },
    {
      "sentence": "私は朝ごはんに___をよく食べます。",
      "word": "たまご",
      "translation": "저는 아침 식사로 <span style='color:green;'>계란</span>을 자주 먹습니다.",
      "level": 6,
      "choices": ["たまご", "パン", "ごはん", "フルーツ"]
    },
    {
      "sentence": "___は冬のスポーツです。",
      "word": "スキー",
      "translation": "<span style='color:green;'>스키</span>는 겨울 스포츠입니다.",
      "level": 7,
      "choices": ["スキー", "サッカー", "バスケットボール", "サーフィン"]
    },
    {
      "sentence": "彼女は毎晩___を聞きながら寝ます。",
      "word": "おんがく",
      "translation": "그녀는 매일 밤 <span style='color:green;'>음악</span>을 들으며 잡니다.",
      "level": 8,
      "choices": ["おんがく", "ラジオ", "テレビ", "オーディオブック"]
    },
    {
      "sentence": "私の弟は___が苦手です。",
      "word": "かがく",
      "translation": "제 동생은 <span style='color:green;'>과학</span>이 서툴러요.",
      "level": 9,
      "choices": ["かがく", "すうがく", "れきし", "ぶんがく"]
    },
    {
      "sentence": "春になると、花が___ます。",
      "word": "さく",
      "translation": "봄이 되면, 꽃이 <span style='color:green;'>피어납니다</span>.",
      "level": 10,
      "choices": ["さく", "ちる", "かわる", "ひかる"]
    },
    {
      "sentence": "___の日はとても暑いです。",
      "word": "なつ",
      "translation": "<span style='color:green;'>여름</span>날은 매우 덥습니다.",
      "level": 5,
      "choices": ["なつ", "ふゆ", "はる", "あき"]
    },
    {
      "sentence": "彼は___で絵をよく描きます。",
      "word": "クレヨン",
      "translation": "그는 <span style='color:green;'>크레용</span>으로 그림을 자주 그립니다.",
      "level": 6,
      "choices": ["クレヨン", "えんぴつ", "ペン", "ブラシ"]
    },
    {
      "sentence": "私たちは夏休みに___に行きます。",
      "word": "うみ",
      "translation": "우리는 여름 방학에 <span style='color:green;'>바다</span>에 갑니다.",
      "level": 7,
      "choices": ["うみ", "やま", "こうえん", "びじゅつかん"]
    },
    {
      "sentence": "彼は___を集めるのが好きです。",
      "word": "きって",
      "translation": "그는 <span style='color:green;'>우표</span>를 모으는 것을 좋아합니다.",
      "level": 8,
      "choices": ["きって", "コイン", "しゃしん", "はんこ"]
    },
    {
      "sentence": "彼女の部屋はいつも___です。",
      "word": "きれい",
      "translation": "그녀의 방은 항상 <span style='color:green;'>깨끗</span>합니다.",
      "level": 9,
      "choices": ["きれい", "ちらかっている", "くらい", "さむい"]
    },
    {
      "sentence": "冬休みに、私は___を作りました。",
      "word": "ゆきだるま",
      "translation": "겨울 방학에, 저는 <span style='color:green;'>눈사람</span>을 만들었습니다.",
      "level": 10,
      "choices": ["ゆきだるま", "サンドキャッスル", "え", "かざり"]
    }
  ]

  for (const { sentence, word, translation, level, choices } of questionsData) {
    const question = await prisma.question.create({
      data: {
        sentence,
        word,
        translation,
        level,
      },
    });

    // 각 문제에 대한 선택지를 추가합니다.
    await Promise.all(
      choices.map((choiceText) =>
        prisma.choice.create({
          data: {
            text: choiceText,
            isCorrect: choiceText === word, // 문제의 단어와 일치하는 경우 정답으로 설정
            questionId: question.id,
          },
        })
      )
    );
  }

  console.log(`All questions have been inserted`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });