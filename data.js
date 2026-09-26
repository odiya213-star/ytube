// Default Curated Videos for Information Systems Auditor (정보시스템감리사)
const DEFAULT_VIDEOS = [
  {
    id: "gQ_H9Pq8HlE",
    title: "[정보시스템감리사] 감리사 시험의 모든 것! 응시자격부터 합격전략까지 완벽 정리",
    channel: "IT자격증 마스터",
    category: "guide",
    views: 18500,
    date: "2024-03-15",
    duration: "24:18",
    description: "정보시스템 감리사 시험 과목 구성, 1차 및 면접 기준, 기술사와의 비교 및 비전공자/직장인 현실적 수험 플랜 안내"
  },
  {
    id: "Bwb1o1v5r2U",
    title: "직장인이 6개월 만에 정보시스템감리사 합격한 비결 & 공부 순서 노하우",
    channel: "합격의 정석",
    category: "guide",
    views: 12400,
    date: "2024-01-20",
    duration: "18:45",
    description: "서브노트 작성법, 5개 과목별 우선순위 공부법, 오답노트 정리와 주말 몰입 전략 대공개"
  },
  {
    id: "N0M2j57RjYc",
    title: "[감리및사업관리] 전자정부 감리지침 및 감리 프레임워크 3단계 완벽 이해",
    channel: "한국IT감리포럼",
    category: "audit",
    views: 9800,
    date: "2024-05-10",
    duration: "35:12",
    description: "감리관점, 감리시점(요구정의, 설계, 종료), 감리영역 매트릭스와 전자정부 표준 감리절차 핵심 요약"
  },
  {
    id: "eF16Kek7uC8",
    title: "[사업관리] PMBOK 핵심 프로세스 그룹과 EVM(획득가치관리) 계산 기출 뽀개기",
    channel: "ITPM 연구소",
    category: "audit",
    views: 8900,
    date: "2023-11-28",
    duration: "29:40",
    description: "CPI, SPI, EAC 공식 계산 문제 완벽 정복 및 프로젝트 리스크/품질 관리 기출유형 분석"
  },
  {
    id: "8c7m3Jz0Txg",
    title: "[소프트웨어공학] 디자인 패턴 23종과 객체지향 설계 5대 원칙(SOLID) 총정리",
    channel: "소프트웨어 아카데미",
    category: "se",
    views: 15200,
    date: "2024-02-14",
    duration: "42:05",
    description: "생성/구조/행위 디자인 패턴 핵심 비교 및 SOLID 원칙의 실무 적용과 기출문제 풀이"
  },
  {
    id: "kJQP7kiw5Fk",
    title: "[소프트웨어공학] 테스트 기법(블랙박스/화이트박스) 및 품질평가(ISO 25010)",
    channel: "SW테스팅 연구회",
    category: "se",
    views: 7600,
    date: "2023-09-15",
    duration: "22:30",
    description: "경계값 분석, 동등 분할, 제어 흐름 테스트, CMMI 및 ISO 25010 시스템/소프트웨어 품질 모델"
  },
  {
    id: "3A3p9s7R5qI",
    title: "[데이터베이스] 트랜잭션 격리수준(ACID/MVCC)과 동시성 제어 기법",
    channel: "DB 마스터 클래스",
    category: "db",
    views: 11200,
    date: "2024-04-02",
    duration: "31:15",
    description: "2PL, 타임스탬프 순서화, 팬텀 리드, Non-repeatable Read 해결과 인덱스 튜닝 원리"
  },
  {
    id: "aX0T4_j9Kuo",
    title: "[데이터베이스] 관계대수와 정규화(1NF ~ BCNF) 기출 패턴 해설",
    channel: "데이터 사이언스 LAB",
    category: "db",
    views: 9400,
    date: "2023-10-18",
    duration: "26:50",
    description: "함수 종속성 분석을 통한 이상현상 제거, 무손실 분해와 종속성 보존 정규화 단계별 예제"
  },
  {
    id: "d9W6M7gE9Xk",
    title: "[시스템구조] CPU 파이프라이닝 해저드(구조/데이터/제어)와 가상메모리 페이징",
    channel: "컴퓨터구조 핵심강의",
    category: "system",
    views: 13800,
    date: "2024-01-05",
    duration: "38:40",
    description: "분기예측, 포워딩, 페이지 폴트 및 페이지 교체 알고리즘(LRU, LFU, FIFO) 계산 문제 해설"
  },
  {
    id: "9m_lQ6zP1uE",
    title: "[시스템구조] 클라우드 네이티브 아키텍처(MSA, 쿠버네티스) 및 REST API",
    channel: "인프라 엔지니어링",
    category: "system",
    views: 8200,
    date: "2024-06-11",
    duration: "27:10",
    description: "컨테이너 가상화, 서비스 메시, API 게이트웨이, 서킷 브레이커 패턴 감리 점검 포인트"
  },
  {
    id: "w7gY1Rk9XqM",
    title: "[보안] ISMS-P 인증기준 3개 영역 및 전자정부 소프트웨어 보안약점 진단가이드",
    channel: "정보보안 전략센터",
    category: "security",
    views: 16400,
    date: "2024-03-29",
    duration: "33:20",
    description: "관리체계 수립, 보호대책 요구사항, 개인정보 처리 단계별 보안요구사항 및 시큐어 코딩 49개 보안약점"
  },
  {
    id: "kP3j9_R8zQs",
    title: "[보안] 최신 암호학(공개키, 대칭키, 해시함수, 영지식증명)과 제로트러스트 보안 모델",
    channel: "사이버 보안 아카데미",
    category: "security",
    views: 10900,
    date: "2024-05-18",
    duration: "36:45",
    description: "AES, RSA, ECC 타원곡선암호 원리, 디지털 서명 및 NIST SP 800-207 제로트러스트 아키텍처 실무"
  }
];

const CATEGORIES = [
  { id: "all", name: "전체보기", icon: "layout-grid" },
  { id: "guide", name: "합격수기 & 수험전략", icon: "sparkles" },
  { id: "audit", name: "감리 및 사업관리", icon: "file-spreadsheet" },
  { id: "se", name: "소프트웨어공학", icon: "code" },
  { id: "db", name: "데이터베이스", icon: "database" },
  { id: "system", name: "시스템구조 및 OS", icon: "server" },
  { id: "security", name: "보안 및 신기술", icon: "shield-alert" }
];
