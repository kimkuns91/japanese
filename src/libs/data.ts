type WordData = {
  sentence: string;
  word: string;
  translation: string;
  level: number;
  choices: string[];
};

export const wordData: WordData[] = [
  {
    sentence: "私は毎朝___を飲みます。",
    word: "コーヒー",
    translation:
      "저는 매일 아침 <span style='color:green;'>커피</span>를 마십니다.",
    level: 1,
    choices: ["コーヒー", "コカ", "ソーダ", "ミルク"], // 커피, 콜라, 소다, 우유
  },
  {
    sentence: "これは私の___です。",
    word: "かばん",
    translation: "이것은 제 <span style='color:green;'>가방</span>입니다.",
    level: 1,
    choices: ["かばん", "かさ", "くつ", "ぼうし"], // 가방, 우산, 신발, 모자
  },
  {
    sentence: "明日、友達と___に行きます。",
    word: "映画館",
    translation:
      "내일, 친구와 <span style='color:green;'>영화관</span>에 갑니다.",
    level: 1,
    choices: ["映画館", "図書館", "公園", "レストラン"], // 영화관, 도서관, 공원, 레스토랑
  },
  {
    sentence: "私の趣味は___をすることです。",
    word: "絵を描く",
    translation:
      "제 취미는 <span style='color:green;'>그림 그리기</span>입니다.",
    level: 1,
    choices: ["絵を描く", "歌を歌う", "本を読む", "映画を見る"], // 그림 그리기, 노래 부르기, 책 읽기, 영화 보기
  },
  {
    sentence: "私は___で日本語を勉強しています。",
    word: "オンライン",
    translation:
      "저는 <span style='color:green;'>온라인</span>으로 일본어를 공부하고 있습니다.",
    level: 1,
    choices: ["オンライン", "オフライン", "学校", "図書館"], // 온라인, 오프라인, 학교, 도서관
  },
  {
    sentence: "彼は___をとても速く走ります。",
    word: "マラソン",
    translation:
      "그는 <span style='color:green;'>마라톤</span>을 매우 빨리 달립니다.",
    level: 1,
    choices: ["マラソン", "車", "自転車", "バス"], // 마라톤, 자동차, 자전거, 버스
  },
  {
    sentence: "私たちの家には犬と___がいます。",
    word: "猫",
    translation:
      "우리 집에는 개와 <span style='color:green;'>고양이</span>가 있습니다.",
    level: 1,
    choices: ["猫", "鳥", "魚", "兎"], // 고양이, 새, 물고기, 토끼
  },
  {
    sentence: "彼女の好きな食べ物は___です。",
    word: "寿司",
    translation:
      "그녀의 좋아하는 음식은 <span style='color:green;'>스시</span>입니다.",
    level: 1,
    choices: ["寿司", "ラーメン", "カレー", "天ぷら"], // 스시, 라멘, 카레, 텐푸라
  },
  {
    sentence: "私は毎日___で音楽を聞きます。",
    word: "スマホ",
    translation:
      "저는 매일 <span style='color:green;'>스마트폰</span>으로 음악을 듣습니다.",
    level: 1,
    choices: ["スマホ", "ラジオ", "テレビ", "コンピューター"], // 스마트폰, 라디오, 텔레비전, 컴퓨터
  },
  {
    sentence: "___は日本の伝統的な衣服です。",
    word: "着物",
    translation:
      "<span style='color:green;'>기모노</span>는 일본의 전통적인 옷입니다.",
    level: 1,
    choices: ["着物", "スーツ", "セーター", "ジーンズ"], // 기모노, 정장, 스웨터, 청바지
  },
];
