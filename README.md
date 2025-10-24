# 🎯 SW-PBS 통합 플랫폼

> **School-Wide Positive Behavior Support Integrated Platform**
>
> 학교 차원 긍정적 행동지원을 위한 완전한 데이터 관리 및 분석 시스템

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/swpbs-platform)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.7-ff6384.svg)](https://www.chartjs.org/)

---

## 📋 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [시스템 요구사항](#시스템-요구사항)
- [설치 방법](#설치-방법)
- [사용 방법](#사용-방법)
- [프로젝트 구조](#프로젝트-구조)
- [데이터 형식](#데이터-형식)
- [기술 스택](#기술-스택)
- [기여하기](#기여하기)
- [라이선스](#라이선스)
- [지원](#지원)

---

## 🎓 개요

SW-PBS 통합 플랫폼은 학교에서 **PBIS(Positive Behavioral Interventions and Supports)** 시스템을 효과적으로 구현하고 관리하기 위한 포괄적인 웹 기반 도구입니다.

### 핵심 목표

- 📊 **데이터 기반 의사결정**: 실시간 ODR(Office Discipline Referral) 추적 및 분석
- 🎯 **3단계 지원 시스템**: Tier 1(보편적), Tier 2(표적집단), Tier 3(개별학생) 완전 지원
- 📈 **시각적 분석**: 10가지 이상의 차트 유형으로 데이터 시각화
- 👥 **역할 기반 접근**: 6가지 사용자 역할에 맞춤화된 인터페이스
- 🔄 **완전한 워크플로우**: 온보딩부터 충실도 평가까지 전체 프로세스 지원

### SWIS 호환성

이 플랫폼은 **SWIS(School-Wide Information System)**, **CICO-SWIS**, **I-SWIS** 시스템의 데이터 구조와 호환되며, data1024.csv 형식에 최적화되어 있습니다.

---

## ✨ 주요 기능

### 🏠 통합 대시보드

- 실시간 학교 현황 모니터링
- 주요 지표 요약 (ODR, TFI 점수, Tier 분포)
- 알림 및 이상치 자동 감지
- 빠른 작업 바로가기

### 📚 Tier 1: 보편적 지원

- ⭐ **기대행동 매트릭스**: 장소별 행동 정의 및 교육 자료
- 📊 **ODR 관리**: 문제행동 사건 기록 및 분석
- 🎁 **칭찬 포인트**: 긍정행동 인정 및 강화 시스템
- 📈 **데이터 시각화**: 장소, 시간, 행동, 요일별 차트

### 🎯 Tier 2: 표적집단 지원

- 🔄 **CICO 프로그램**: Check-In/Check-Out 완전 관리
  - 일일 진도 보고서 (DPR)
  - 4주 평가 주기
  - 학부모 의사소통
  - 반응 기반 의사결정
- 👥 **SST & FCT**: 사회성 기술 및 의사소통 훈련
- 📋 **학생 식별**: 데이터 기반 자동 추천 시스템
- 📊 **진전도 차트**: 주간 추이 및 목표 달성률

### 🔬 Tier 3: 개별학생 지원

- 🔍 **FBA (기능행동평가)**
  - 표적 행동 조작적 정의
  - ABC 데이터 수집
  - 기능 가설 수립
  - 직접 관찰 도구
- 📋 **BIP (행동중재계획)**
  - PTR 모델 기반
  - 4단계 전략 (예방-교육-강화-반응)
  - 목표-기준선 추적
  - MCID 분석
- 🚨 **위기 관리**
  - 4단계 프로토콜
  - 사건 보고서
  - 안전 절차

### 📊 데이터센터

- 📤 **CSV 업로드**: 드래그 앤 드롭, 자동 검증
- 🔍 **쿼리 빌더**: 자연어 및 필터 기반 검색
- 📄 **보고서 생성**: 7가지 표준 보고서
- 💾 **내보내기**: CSV, JSON, PDF 형식

### 👥 리더십 회의

- 📅 **회의 관리**: 자동 안건 생성, 실행과제 추적
- 📊 **TFI 평가**: Tiered Fidelity Inventory 3개 Tier
- 📋 **SAS 자가평가**: 7개 영역 평가
- 📈 **레이더 차트**: 충실도 시각화

### 🎓 온보딩 마법사

- 7단계 초기 설정 가이드
- 학교 정보 및 팀 구성
- 기준선 데이터 수집
- 기대행동 정의
- 목표 설정

---

## 🚀 시작하기

### 빠른 시작 (5분)

1. **파일 다운로드**
   ```bash
   git clone https://github.com/yourusername/swpbs-platform.git
   cd swpbs-platform
   ```

2. **브라우저에서 열기**
   ```bash
   # index.html 파일을 더블클릭하거나
   # 로컬 서버 실행 (선택사항)
   python -m http.server 8000
   # 또는
   npx serve
   ```

3. **온보딩 시작**
   - 첫 방문 시 자동으로 온보딩 마법사가 시작됩니다
   - 7단계를 따라 학교 정보를 설정하세요

4. **샘플 데이터 탐색**
   - 120개의 ODR 사건
   - 180개의 칭찬 포인트
   - 12명의 CICO 학생
   - 5개의 FBA/BIP 계획

---

## 💻 시스템 요구사항

### 브라우저 지원

| 브라우저 | 최소 버전 | 권장 버전 |
|---------|----------|----------|
| Chrome | 90+ | 최신 |
| Firefox | 88+ | 최신 |
| Safari | 14+ | 최신 |
| Edge | 90+ | 최신 |

### 하드웨어

- **RAM**: 최소 4GB (8GB 권장)
- **디스플레이**: 1280x720 이상 (1920x1080 권장)
- **저장 공간**: 5MB (localStorage)

### 네트워크

- 오프라인 작동 가능
- CDN 리소스 로드 시 인터넷 필요 (Chart.js)

---

## 📦 설치 방법

### 방법 1: 직접 사용 (추천)

```bash
# 저장소 클론
git clone https://github.com/yourusername/swpbs-platform.git

# 디렉토리 이동
cd swpbs-platform

# index.html 파일을 브라우저에서 열기
```

### 방법 2: 로컬 서버 (개발용)

```bash
# Python 서버
python -m http.server 8000

# Node.js serve
npx serve

# 브라우저에서 http://localhost:8000 접속
```

### 방법 3: GitHub Pages 배포

```bash
# GitHub에 푸시
git add .
git commit -m "Deploy SW-PBS Platform"
git push origin main

# Settings > Pages에서 배포 설정
# https://yourusername.github.io/swpbs-platform 접속
```

---

## 📖 사용 방법

### 1. 역할 선택

상단의 역할 버튼을 클릭하여 귀하의 역할을 선택하세요:

- 👑 **총괄담당**: 전체 시스템 접근
- ⭐ **리더십팀원**: Tier 1/2/3, 회의, 데이터
- 🎯 **표적집단 담당**: Tier 1/2, 데이터
- 🔬 **개별지원 담당**: Tier 1/3, 데이터
- 👨‍🏫 **담임교사**: Tier 1, 데이터
- 📋 **관리자**: 데이터, 회의

### 2. 데이터 업로드

#### CSV 파일 준비

```csv
행동 발생일,발생 시간대,발생 요일,학생명,발생한 위기행동,강도or5점 척도,추정되는 기능(동기),행동 발생 장소,현재지원단계,입력 교사명,특이사항,주요선행사건,주요후속결과,발생 주차
2024-10-01,오전,화요일,김민주,신체적 공격,5,관심끌기,교실,Tier 2,홍길동,급식 후 발생,활동 전환,타임아웃,1
```

#### 업로드 절차

1. 데이터센터 → 업로드 탭
2. CSV 파일 드래그 앤 드롭
3. 컬럼 매핑 확인
4. 업로드 완료

### 3. 데이터 분석

#### ODR 추세 분석

```javascript
// Tier 1 모듈 → 데이터 탭
// 자동 생성되는 차트:
- 장소별 분포 (파이 차트)
- 시간대별 발생 (막대 차트)
- 주간 추이 (선 그래프)
- 행동 유형별 빈도 (가로 막대)
```

#### 학생 진전도 추적

```javascript
// Tier 3 모듈 → 모니터링 탭
// 목표-기준선 차트:
- 일일/주간 데이터 포인트
- 목표선 및 기준선
- 추세선 및 MCID
```

### 4. 리포트 생성

```javascript
// 데이터센터 → 리포트 탭
1. 리포트 유형 선택
2. 날짜 범위 설정
3. 필터 적용
4. 생성 및 다운로드
```

---

## 📁 프로젝트 구조

```
swpbs-platform/
├── index.html                      # 메인 엔트리 포인트
├── README.md                       # 프로젝트 소개
├── USER_GUIDE.md                   # 상세 사용자 가이드
│
├── assets/
│   ├── css/
│   │   └── swpbs-core.css         # 핵심 스타일 (디자인 시스템)
│   │
│   └── js/
│       ├── swpbs-core.js          # 핵심 엔진 (상태관리, 차트, 분석)
│       └── sample-data-generator.js # 샘플 데이터 생성기
│
└── modules/
    ├── onboarding-wizard.js       # 온보딩 마법사
    ├── tier1-module.js            # Tier 1 보편적 지원
    ├── tier2-module.js            # Tier 2 표적집단 지원
    ├── tier3-module.js            # Tier 3 개별학생 지원
    ├── datacenter-module.js       # 데이터 관리 센터
    └── meetings-module.js         # 리더십 회의 및 충실도 평가
```

### 핵심 컴포넌트

#### swpbs-core.js

```javascript
// 전역 상태 관리
const SWPBS = {
  data: { students, odrEvents, praisePoints, cicoRecords, fbaAssessments, bipPlans },
  user: { role, permissions },
  ui: { currentModule, currentView },
  charts: {},
  config: { tier1Threshold, tier2Threshold, tier3Threshold }
};

// 주요 클래스
class CSVParser { parse(), toCSV() }
class DataManager { uploadCSV(), saveToLocalStorage(), downloadCSV() }
class AnalyticsEngine { getODRStats(), getStudentAnalysis() }
class ChartManager { createChart(), createODRTrendChart() }
class UIManager { showModule(), updateDashboard(), showNotification() }
```

#### 모듈 구조

```javascript
// 각 모듈의 표준 구조
class TierXModule {
  static initialize() { /* 초기화 */ }
  static render() { /* HTML 생성 */ }
  static initializeCharts() { /* 차트 생성 */ }
  static attachEventListeners() { /* 이벤트 연결 */ }
}
```

---

## 📊 데이터 형식

### CSV 입력 형식 (data1024.csv)

| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| 행동 발생일 | Date | ✅ | YYYY-MM-DD | 2024-10-01 |
| 발생 시간대 | String | ✅ | 오전/오후/점심시간 | 오전 |
| 발생 요일 | String | ✅ | 요일 | 화요일 |
| 학생명 | String | ✅ | 학생 이름 | 김민주 |
| 발생한 위기행동 | String | ✅ | 행동 유형 | 신체적 공격 |
| 강도or5점 척도 | Number | ✅ | 1-5 | 5 |
| 추정되는 기능(동기) | String | ✅ | 행동 기능 | 관심끌기 |
| 행동 발생 장소 | String | ✅ | 장소 | 교실 |
| 현재지원단계 | String | ✅ | Tier 1/2/3 | Tier 2 |
| 입력 교사명 | String | ✅ | 교사 이름 | 홍길동 |
| 특이사항 | String | ❌ | 추가 메모 | 급식 후 발생 |
| 주요선행사건 | String | ❌ | 선행사건 | 활동 전환 |
| 주요후속결과 | String | ❌ | 후속결과 | 타임아웃 |
| 발생 주차 | Number | ❌ | 주 번호 | 1 |

### JSON 내부 형식

```json
{
  "odrEvents": [
    {
      "id": "odr_1234567890_0",
      "date": "2024-10-01",
      "time": "오전",
      "weekday": "화요일",
      "studentName": "김민주",
      "behavior": "신체적 공격",
      "intensity": 5,
      "function": "관심끌기",
      "location": "교실",
      "tier": "Tier 2",
      "teacher": "홍길동",
      "notes": "급식 후 발생",
      "antecedent": "활동 전환",
      "consequence": "타임아웃",
      "week": "1"
    }
  ],
  "students": [
    {
      "id": "student_김민주",
      "name": "김민주",
      "grade": 3,
      "class": 2,
      "tier": "Tier 2",
      "odrCount": 8,
      "lastODR": "2024-10-15",
      "status": "active",
      "interventions": ["CICO"]
    }
  ]
}
```

---

## 🛠 기술 스택

### 프론트엔드

- **HTML5**: 시맨틱 마크업
- **CSS3**: 모던 디자인 시스템 (CSS Variables, Flexbox, Grid)
- **Vanilla JavaScript**: 프레임워크 없는 순수 JS

### 라이브러리

- **[Chart.js 4.4.7](https://www.chartjs.org/)**: 차트 시각화
  - 막대, 선, 파이, 도넛, 레이더 차트
  - 반응형 및 애니메이션
- **[PapaParse](https://www.papaparse.com/)**: CSV 파싱 (계획)

### 데이터 저장

- **localStorage**: 클라이언트 측 데이터 지속성
- **JSON**: 데이터 직렬화 형식

### 디자인 시스템

```css
:root {
  /* Tier Colors */
  --tier1-color: #10b981;  /* Green - Universal */
  --tier2-color: #f59e0b;  /* Orange - Targeted */
  --tier3-color: #ef4444;  /* Red - Intensive */

  /* Primary Palette */
  --primary: #4c5fd5;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}
```

---

## 📈 로드맵

### ✅ v1.0 (현재)
- [x] 핵심 엔진 구현
- [x] 3개 Tier 모듈
- [x] 데이터센터
- [x] 리더십 회의
- [x] 온보딩 마법사
- [x] 10+ 차트 타입

### 🔜 v1.1 (계획)
- [ ] 서버 버전 (다중 사용자)
- [ ] 실시간 협업
- [ ] 고급 필터링
- [ ] 커스텀 리포트 빌더
- [ ] 모바일 앱

### 🚀 v2.0 (비전)
- [ ] AI 기반 추천
- [ ] 예측 분석
- [ ] 음성 입력
- [ ] 다국어 지원
- [ ] API 통합

---

## 🤝 기여하기

### 기여 방법

1. **Fork** 저장소
2. **Feature branch** 생성 (`git checkout -b feature/AmazingFeature`)
3. **Commit** 변경사항 (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** 오픈

### 코딩 스타일

```javascript
// 함수는 camelCase
function calculateODRRate() {}

// 클래스는 PascalCase
class DataManager {}

// 상수는 UPPER_SNAKE_CASE
const MAX_ODR_THRESHOLD = 5;

// 주석은 명확하게
/**
 * Calculate ODR rate per 100 students
 * @param {number} odrCount - Total ODR count
 * @param {number} studentCount - Total student count
 * @returns {number} ODR rate
 */
```

### 버그 리포트

GitHub Issues에 다음 정보와 함께 보고해주세요:
- 브라우저 및 버전
- 재현 단계
- 예상 동작 vs 실제 동작
- 스크린샷 (있다면)

---

## 📜 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다.

```
MIT License

Copyright (c) 2025 SW-PBS Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 지원

### 문서

- 📖 [사용자 가이드](USER_GUIDE.md) - 전체 사용 설명서
- 💡 [FAQ](USER_GUIDE.md#문제-해결) - 자주 묻는 질문
- 🎓 [온보딩 가이드](USER_GUIDE.md#시작하기) - 초기 설정

### 커뮤니티

- 💬 [GitHub Discussions](https://github.com/yourusername/swpbs-platform/discussions)
- 🐛 [Issue Tracker](https://github.com/yourusername/swpbs-platform/issues)
- 📧 이메일: swpbs-support@example.com

### 학습 리소스

- [PBIS.org](https://www.pbis.org) - 공식 PBIS 리소스
- [OSEP TA Center](https://www.pbis.org/pbis/tiered-framework) - 기술 지원
- [TFI 3.0 Manual](https://www.pbis.org/resource/tfi-3-0-tiered-fidelity-inventory) - 충실도 평가

---

## 🙏 감사의 말

이 프로젝트는 다음을 기반으로 개발되었습니다:

- **PBIS Framework**: [University of Oregon](https://www.pbis.org)
- **SWIS System**: [Educational and Community Supports](https://www.pbisapps.org)
- **TFI Tool**: [OSEP Technical Assistance Center](https://www.pbis.org/resource/tfi)
- **Chart.js**: [Chart.js Community](https://www.chartjs.org)

---

## 📊 통계

![GitHub stars](https://img.shields.io/github/stars/yourusername/swpbs-platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/swpbs-platform?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/swpbs-platform?style=social)

![Lines of Code](https://img.shields.io/tokei/lines/github/yourusername/swpbs-platform)
![Code Size](https://img.shields.io/github/languages/code-size/yourusername/swpbs-platform)
![Last Commit](https://img.shields.io/github/last-commit/yourusername/swpbs-platform)

---

<div align="center">

**Made with ❤️ for schools implementing PBIS**

[⬆ 맨 위로](#-sw-pbs-통합-플랫폼)

</div>
