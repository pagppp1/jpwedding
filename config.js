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

  // ── 메인 (히어로) ──
  groom: {
    name: "전지원",
    father: "전성태",
    mother: "한성란",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "피윤호",
    father: "피백윤",
    mother: "박명분",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-07-19",
    time: "12:00",
    venue: "메리빌리아 더 프레스티지",
    address: "경기도 수원시 권선구 세화로 116 2층",
    mapLinks: {
      kakao: "https://kko.to/BzHyjm0rww",
      naver: "https://naver.me/5apDP7nI"
    }
  },

  // ── 우리의 이야기 ──
  story: {
    title: "우리의 이야기",
    content: "서로 다른 길을 걷던 두 사람이\n하나의 길을 함께 걷게 되었습니다.\n\n여러분을 소중한 자리에 초대합니다."
  },
  

  
  // ── 오시는 길 ──
  // (mapLinks는 wedding 객체 내에 포함)

  // ── 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "신부", bank: "OO은행", number: "000-000-000000" },
      { role: "아버지", bank: "OO은행", number: "000-00-000000" },
      { role: "어머니", bank: "OO은행", number: "000-00-000000" }
    ],
    bride: [
      { role: "신랑", bank: "OO은행", number: "00000-0000-00" },
      { role: "아버지", bank: "OO은행", number: "000000-00-000000" },
      { role: "어머니", bank: "OO은행", number: "000-00-000000-0" }
    ]
  },

  // ── 링크 공유 시 나타나는 문구 ──
  meta: {
    title: "전지원 ♥ 피윤호 결혼합니다",
    description: "2026년 7월 19일, 소중한 분들을 초대합니다.",
    image: "https://raw.githubusercontent.com/pagppp1/jpwedding/main/images/og/1.jpg"
  }
};
