// Real and verified YouTube videos related to '정보시스템감리사'
const DEFAULT_VIDEOS = [
  {
    id: "fGZeTiCELzo",
    title: "[정보시스템감리사] 감리사 자격증 특강 - 시험 개요 및 과목별 합격 가이드",
    channel: "세종사이버대학교",
    category: "guide",
    views: 14200,
    date: "2023-10-12",
    duration: "45:20",
    description: "정보시스템감리사 시험의 자격 기준, 과목별 출제 경향 분석 및 수험 준비 전략 특강"
  },
  {
    id: "SGmhTjBS4Nk",
    title: "정보시스템감리와 노후준비 - 감리사의 진로, 직무 환경 및 현업 이야기",
    channel: "IT커리어 포럼",
    category: "guide",
    views: 9800,
    date: "2023-08-25",
    duration: "32:15",
    description: "현직 감리사가 전하는 감리 업무의 실제와 감리사 자격 취득 후 커리어 패스 및 은퇴 준비"
  },
  {
    id: "NeevbVmiuaY",
    title: "정보시스템감리사 검정의 실체?! 시험 난이도와 직장인 수험 현실",
    channel: "IT기술인 토크",
    category: "guide",
    views: 8400,
    date: "2024-02-18",
    duration: "21:40",
    description: "정보시스템감리사 시험의 합격률, 기출 변별력 문항 유형과 직장인의 효율적인 수험 전략"
  },
  {
    id: "XpbLJe2mtIU",
    title: "정보시스템감리사 [감리 및 사업관리] 샘플 강의 - 감리 프레임워크와 지침",
    channel: "인포레버컨설팅",
    category: "audit",
    views: 12500,
    date: "2024-03-05",
    duration: "38:50",
    description: "정보시스템 감리 기준, 감리 영역 매트릭스 및 감리 절차(요구정의, 설계, 종료감리) 상세 설명"
  },
  {
    id: "GdnTacE21Hg",
    title: "[감리] 무료 공개강의 - 사업관리 핵심 체계와 프로젝트 감리 착안사항",
    channel: "라이지움 감리사 아카데미",
    category: "audit",
    views: 6700,
    date: "2023-11-19",
    duration: "41:30",
    description: "전자정부 사업관리 지침과 PMBOK 프로세스 기반 기출 핵심 정리"
  },
  {
    id: "XVLuiIlXNAE",
    title: "정보시스템감리사 [소프트웨어공학] 1일차 - 개발 수명주기 모델과 요구사항 분석",
    channel: "인포레버컨설팅",
    category: "se",
    views: 11000,
    date: "2024-01-15",
    duration: "52:10",
    description: "폭포수, 애자일 스크럼, 개발 방법론 및 요구사항 추적 매트릭스와 검증 기법 강의"
  },
  {
    id: "FOePDLogO0I",
    title: "정보시스템감리사 [소프트웨어 공학] 샘플 동영상 - 디자인 패턴 및 객체지향 원칙",
    channel: "인포레버컨설팅",
    category: "se",
    views: 7900,
    date: "2024-04-10",
    duration: "34:25",
    description: "GoF 디자인 패턴(생성, 구조, 행위) 및 감리 시험 빈출 객체지향 설계 핵심 요약"
  },
  {
    id: "bYJmtrParxs",
    title: "정보시스템감리사 자격증 샘플강의 [데이터베이스] - 정규화 및 트랜잭션",
    channel: "라이지움",
    category: "db",
    views: 8900,
    date: "2023-09-08",
    duration: "44:15",
    description: "함수적 종속성 기반 1NF~BCNF 정규화 과정과 이상현상 해결, ACID 트랜잭션 제어"
  },
  {
    id: "XNEmVAUcJaM",
    title: "정보시스템감리사 [시스템구조 II] 무료강의 - 컴퓨터 구조와 운영체제 핵심",
    channel: "라이지움",
    category: "system",
    views: 9200,
    date: "2023-12-04",
    duration: "48:00",
    description: "CPU 파이프라이닝 해저드, 캐시 메모리 매핑 정책, 가상 메모리 페이징 및 교체 알고리즘"
  },
  {
    id: "5BCG3SO8H9Q",
    title: "정보시스템감리사 기출문제 핵심분석 [시스템구조] - 최신 기출 해설",
    channel: "인포레버컨설팅",
    category: "system",
    views: 7300,
    date: "2024-05-20",
    duration: "36:10",
    description: "정보시스템감리사 시스템구조 과목의 고난도 기출문제 유형별 상세 풀이"
  }
];

const CATEGORIES = [
  { id: "all", name: "전체보기", icon: "layout-grid" },
  { id: "guide", name: "합격수기 & 수험전략", icon: "sparkles" },
  { id: "audit", name: "감리 및 사업관리", icon: "file-spreadsheet" },
  { id: "se", name: "소프트웨어공학", icon: "code" },
  { id: "db", name: "데이터베이스", icon: "database" },
  { id: "system", name: "시스템구조 및 OS", icon: "server" }
];
