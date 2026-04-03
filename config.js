 /**
 * Original Warm Wedding Invitation Configuration
 *
 * 이 파일에서 청첩장의 모든 정보를 수정할 수 있습니다.
 * 이미지는 설정이 필요 없습니다. 아래 폴더에 순번 파일명으로 넣으면 자동 감지됩니다.
 *
 * 이미지 폴더 구조 (파일명 규칙):
 *   images/hero/1.jpg      - 메인 사진 (1장, 필수)
 *   images/story/1.jpg, 2.jpg, ...  - 스토리 사진들 (순번, 자동 감지)
 *   images/gallery/1.jpg, 2.jpg, ... - 갤러리 사진들 (순번, 자동 감지)
 *   images/location/1.jpg  - 약도/지도 이미지 (1장)
 *   images/og/1.jpg        - 카카오톡 공유 썸네일 (1장)
 */

const CONFIG = {
  // ── 초대장 열기 ──
  useCurtain: true,  // 커튼 열림 애니메이션 사용 여부 (true: 사용, false: 바로 본문 표시)

  imageCounts: {
  story: 2,     // 스토리 사진 개수 (맞게 수정)
  gallery: 18   // 갤러리 사진 개수 (맞게 수정)
},

  // ── 메인 (히어로) ──
  groom: {
    name: "피윤호",
    father: "피백윤",
    mother: "박명분",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "전지원",
    father: "전성태",
    mother: "한성란",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-07-19",
    time: "12:00",
    venue: "메리빌리아 더 프레스티지",
    address: "경기도 수원시 권선구 세화로 116 2층",
    mapLinks: {
      naver: "https://naver.me/5apDP7nI",
      tmap: "https://tmap.life/2da486ee",
      kakao: "https://kko.to/BzHyjm0rww"
    }
  },

  // ── 우리의 이야기 ──
  story: {
    title: "푸르른 날의 약속",
    content: "푸르름이 가장 짙어진 여름날,\n나무들이 서로 기대어 그늘을 만들어 주듯\n저희 두 사람도 서로의 쉴 곳이 되어주려 합니다.\n\n앞으로도 더욱 단단한 믿음으로\n서로의 곁에 깊이 뿌리내릴 저희의 시작에\n함께해 주시어 따뜻한 축복으로 채워주세요."
  },
  
  // 연락처
  contacts: {
    groomFather: {
      name: "신랑측 아버지(피백윤)",
      phone: "01087251417",
      kakao: "https://open.kakao.com/o/cccccc"
    },
    groomMother: {
      name: "신랑측 어머니(박명분)",
      phone: "01090179358",
      kakao: "https://open.kakao.com/o/cccccc"
    },
    brideFather: {
      name: "신부측 아버지(전성태)",
      phone: "01037596470",
      kakao: "https://open.kakao.com/o/dddddd"
    },
    brideMother: {
      name: "신부측 어머니(한성란)",
      phone: "01088966477",
      kakao: "https://open.kakao.com/o/dddddd"
    },
    groom: {
      name: "신랑(피윤호)",
      phone: "01054232102",
      kakao: "https://open.kakao.com/o/aaaaaa"
    },
    bride: {
      name: "신부(전지원)",
      phone: "01050060263",
      kakao: "https://open.kakao.com/o/bbbbbb"
    }
  },
  
  // ── 오시는 길 ──
  // (mapLinks는 wedding 객체 내에 포함)

  // ── 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "신랑, 피윤호", bank: "우리은행", number: "1002-536-505833" },
      { role: "아버지, 피백윤", bank: "농협은행", number: "352-0870-0423-53" },
      { role: "어머니, 박명분", bank: "신협은행", number: "0321-31-3211418" }
    ],
    bride: [
      { role: "신부, 전지원", bank: "국민은행", number: "612502-01-352808" },
      { role: "아버지, 전성태", bank: "농협은행", number: "143-02-247188" },
      { role: "어머니, 한성란", bank: "기업은행", number: "010-8896-6477" }
    ]
  },

    wedding: {
      date: "2026-07-19",
      time: "12:00",
      venue: "메리빌리아 더 프레스티지",
      address: "경기도 수원시 권선구 세화로 116 2층",
      mapLinks: {
        naver: "https://naver.me/5apDP7nI",
        tmap: "https://tmap.life/2da486ee",
        kakao: "https://kko.to/BzHyjm0rww"
      },
      transit: {
        subway: [
            {
              line: "1",
              name: "수원역",
              lineName: "수인분당",
              lineNameClass: "bundang",
              note: "수원역"
            }
          ],
        //busStops: [
        //  { no: "1", name: "벌터교차로·영림들" },
        //  { no: "2", name: "평동동남아파트" },
        //  { no: "3", name: "가게앞·평동" },
        //  { no: "4", name: "가게앞·평동" },
        //  { no: "5", name: "평동동남아파트" },
        //  { no: "6", name: "벌터교차로" }
        //],
        buses: {
          village: ["27-2", "27-7", "27-6"],
          general: ["16-2", "H160", "H103", "H161", "H404"]
        }
      }
    },
  // ── 링크 공유 시 나타나는 문구 ──
  meta: {
    title: "전지원 ♥ 피윤호 결혼합니다",
    description: "2026년 7월 19일, 소중한 분들을 초대합니다.",
    image: "https://raw.githubusercontent.com/pagppp1/jpwedding/main/images/og/1.jpg"
  },

  kakaoMap: {
    appKey: "bd86aaffa2546888f5e5c40364fe3662"
  }

};
