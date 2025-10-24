# 📤 GitHub 업로드 가이드

## 🚀 빠른 시작 (5분)

### 1단계: GitHub 저장소 생성

1. **GitHub.com 접속**
   ```
   https://github.com
   ```

2. **로그인** 후 우측 상단 `+` 클릭 → `New repository`

3. **저장소 설정**
   - Repository name: `swpbs-platform`
   - Description: `SW-PBS 통합 플랫폼 - 학교 차원 긍정적 행동지원 시스템`
   - 공개 범위 선택:
     - ✅ **Public**: 누구나 볼 수 있음 (오픈소스)
     - ✅ **Private**: 초대된 사람만 볼 수 있음
   - **중요**: ❌ "Initialize this repository with a README" 체크 해제
   - `Create repository` 클릭

4. **저장소 URL 복사**
   ```
   https://github.com/YOUR_USERNAME/swpbs-platform.git
   ```

---

### 2단계: Git 초기 설정 (처음 한 번만)

```bash
# Git 설치 확인
git --version

# Git이 없다면 설치 (Ubuntu/WSL)
sudo apt update
sudo apt install git

# Git 사용자 정보 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 설정 확인
git config --list
```

---

### 3단계: 프로젝트 업로드

```bash
# 1. 프로젝트 폴더로 이동
cd /home/korista89/gpbs/swpbs-platform

# 2. Git 저장소 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 첫 커밋 생성
git commit -m "Initial commit: SW-PBS 통합 플랫폼 v1.0

- 완전한 3-Tier 시스템 구현
- 15개 이상 차트 타입
- data1024.csv 형식 최적화
- 온보딩 마법사
- 6가지 사용자 역할
- 완전한 문서화"

# 5. 기본 브랜치를 main으로 설정
git branch -M main

# 6. GitHub 저장소 연결 (YOUR_USERNAME을 본인 계정으로 변경!)
git remote add origin https://github.com/YOUR_USERNAME/swpbs-platform.git

# 7. GitHub에 푸시
git push -u origin main
```

---

## 🔐 인증 방법

GitHub는 2021년부터 비밀번호 대신 **Personal Access Token (PAT)** 또는 **SSH Key**를 사용합니다.

### 방법 A: Personal Access Token (간단)

#### 1. Token 생성

1. GitHub → 우측 상단 프로필 클릭 → `Settings`
2. 좌측 메뉴 맨 아래 `Developer settings`
3. `Personal access tokens` → `Tokens (classic)`
4. `Generate new token` → `Generate new token (classic)`
5. 설정:
   - Note: `swpbs-platform-upload`
   - Expiration: `90 days` 또는 원하는 기간
   - 권한 선택:
     - ✅ `repo` (전체 체크)
   - `Generate token` 클릭
6. **생성된 토큰 복사** (다시 볼 수 없으니 안전한 곳에 저장!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### 2. Token으로 인증

```bash
# git push 실행 시 나오는 프롬프트에서:
Username: YOUR_USERNAME
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (토큰 붙여넣기)

# 또는 URL에 토큰 포함 (권장하지 않음)
git remote set-url origin https://YOUR_USERNAME:TOKEN@github.com/YOUR_USERNAME/swpbs-platform.git
```

#### 3. 자격증명 저장 (선택사항)

```bash
# 자격증명을 캐시에 저장 (15분)
git config --global credential.helper cache

# 또는 영구 저장 (보안 주의!)
git config --global credential.helper store
```

---

### 방법 B: SSH Key (추천 - 한 번 설정하면 영구 사용)

#### 1. SSH Key 생성

```bash
# SSH Key 생성
ssh-keygen -t ed25519 -C "your.email@example.com"

# Enter 3번 (기본 위치, 비밀번호 없음)
# 생성 위치: ~/.ssh/id_ed25519.pub

# 공개키 복사
cat ~/.ssh/id_ed25519.pub
```

#### 2. GitHub에 SSH Key 등록

1. 출력된 공개키 복사 (ssh-ed25519로 시작하는 전체 텍스트)
2. GitHub → Settings → SSH and GPG keys
3. `New SSH key` 클릭
4. Title: `WSL Ubuntu` 또는 원하는 이름
5. Key: 복사한 공개키 붙여넣기
6. `Add SSH key` 클릭

#### 3. SSH로 저장소 연결

```bash
# 기존 HTTPS URL 제거
git remote remove origin

# SSH URL로 재연결 (YOUR_USERNAME 변경!)
git remote add origin git@github.com:YOUR_USERNAME/swpbs-platform.git

# 푸시
git push -u origin main
```

---

## 🌐 GitHub Pages로 배포 (무료 호스팅)

프로젝트를 웹에서 바로 접근 가능하게 만들기:

### 1. Settings에서 활성화

1. GitHub 저장소 페이지 → `Settings` 탭
2. 좌측 메뉴 → `Pages`
3. Source 설정:
   - Branch: `main`
   - Folder: `/ (root)`
4. `Save` 클릭

### 2. 접속 URL

약 1-2분 후:
```
https://YOUR_USERNAME.github.io/swpbs-platform/
```

### 3. README에 링크 추가

```bash
# README.md 파일 상단에 추가
echo "🌐 **Live Demo**: https://YOUR_USERNAME.github.io/swpbs-platform/" >> README.md

git add README.md
git commit -m "Add live demo link"
git push
```

---

## 📝 자주 사용하는 Git 명령어

### 기본 명령어

```bash
# 현재 상태 확인
git status

# 변경사항 확인
git diff

# 모든 파일 추가
git add .

# 특정 파일만 추가
git add index.html

# 커밋 생성
git commit -m "커밋 메시지"

# GitHub에 푸시
git push

# GitHub에서 가져오기
git pull
```

### 브랜치 관리

```bash
# 새 브랜치 생성 및 이동
git checkout -b feature/new-feature

# 브랜치 목록 확인
git branch

# 브랜치 전환
git checkout main

# 브랜치 병합
git merge feature/new-feature

# 브랜치 삭제
git branch -d feature/new-feature
```

### 히스토리 관리

```bash
# 커밋 히스토리 보기
git log

# 간단한 히스토리
git log --oneline

# 그래프로 보기
git log --graph --oneline --all

# 최근 3개 커밋
git log -3
```

---

## 🔄 업데이트 워크플로우

### 코드 수정 후 업로드

```bash
# 1. 변경사항 확인
git status

# 2. 파일 추가
git add .

# 3. 커밋
git commit -m "Add new feature: CICO progress charts"

# 4. 푸시
git push
```

### 여러 커밋을 한번에

```bash
# 기능 1 수정
git add tier1-module.js
git commit -m "Fix ODR recording form validation"

# 기능 2 수정
git add tier2-module.js
git commit -m "Improve CICO weekly chart colors"

# 문서 업데이트
git add README.md
git commit -m "Update documentation with new screenshots"

# 한번에 푸시
git push
```

---

## 🛠️ 문제 해결

### 문제 1: "remote origin already exists"

```bash
# 기존 원격 저장소 확인
git remote -v

# 제거
git remote remove origin

# 새로 추가
git remote add origin https://github.com/YOUR_USERNAME/swpbs-platform.git
```

### 문제 2: "failed to push some refs"

```bash
# GitHub에 있는 내용을 먼저 가져오기
git pull origin main --rebase

# 다시 푸시
git push -u origin main
```

### 문제 3: "Authentication failed"

```bash
# Personal Access Token 재생성
# GitHub → Settings → Developer settings → Personal access tokens

# 자격증명 캐시 삭제
git credential-cache exit

# 다시 푸시 (새 토큰 입력)
git push
```

### 문제 4: "LF will be replaced by CRLF" (Windows)

```bash
# 자동 변환 비활성화
git config --global core.autocrlf false
```

### 문제 5: 대용량 파일

```bash
# .gitignore에 추가
echo "large-file.zip" >> .gitignore
git add .gitignore
git commit -m "Ignore large files"
```

---

## 📋 .gitignore 파일

이미 생성되어 있지만, 추가로 제외할 파일이 있다면:

```bash
# .gitignore 파일 편집
nano .gitignore

# 또는 직접 추가
echo "*.log" >> .gitignore
echo "temp/" >> .gitignore
```

---

## 🎯 권장 커밋 메시지 스타일

### 형식

```
<타입>: <제목>

<본문> (선택사항)

<꼬리말> (선택사항)
```

### 타입

- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드/설정 변경

### 예시

```bash
git commit -m "feat: Add student progress tracking chart

- Implement line chart for weekly progress
- Add baseline and goal lines
- Include MCID threshold indicator

Closes #123"
```

---

## 🌟 GitHub 저장소 꾸미기

### README 배지 추가

README.md 상단에 추가:

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/swpbs-platform?style=social)](https://github.com/YOUR_USERNAME/swpbs-platform/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/swpbs-platform?style=social)](https://github.com/YOUR_USERNAME/swpbs-platform/network/members)
```

### Topics 추가

1. GitHub 저장소 페이지
2. About 섹션 우측 톱니바퀴 클릭
3. Topics 추가:
   ```
   pbis, swpbs, education, behavior-support, data-analysis,
   chartjs, javascript, school-management, korean
   ```

### 스크린샷 추가

```bash
# screenshots 폴더 생성
mkdir screenshots

# 스크린샷 추가 후
git add screenshots/
git commit -m "docs: Add screenshots"
git push
```

README.md에 추가:
```markdown
## 📸 스크린샷

![Dashboard](screenshots/dashboard.png)
![Tier 1 Module](screenshots/tier1.png)
```

---

## 🚀 배포 완료 체크리스트

- [ ] GitHub 저장소 생성
- [ ] Git 초기화 및 커밋
- [ ] GitHub에 푸시 완료
- [ ] README.md 확인
- [ ] .gitignore 설정
- [ ] GitHub Pages 활성화 (선택)
- [ ] Live Demo 링크 추가 (선택)
- [ ] Topics 추가
- [ ] License 추가 (MIT)
- [ ] 저장소 Description 작성

---

## 💡 추가 팁

### 협업하기

```bash
# 공동 작업자 초대
# GitHub → Settings → Collaborators → Add people

# 브랜치로 작업
git checkout -b feature/my-feature
# 작업...
git commit -m "Add feature"
git push -u origin feature/my-feature
# GitHub에서 Pull Request 생성
```

### 릴리즈 생성

```bash
# 태그 생성
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# GitHub → Releases → Create a new release
# Tag: v1.0.0
# Title: SW-PBS Platform v1.0.0
# Description: 초기 릴리즈 설명
```

### Fork & Star

- 다른 사람들이 프로젝트를 쉽게 찾고 사용할 수 있도록:
  1. 저장소를 Public으로 설정
  2. 친구/동료에게 Star 부탁
  3. 관련 커뮤니티에 공유

---

## 📞 도움이 필요하면

- 📖 [Git 공식 문서](https://git-scm.com/doc)
- 🎓 [GitHub Guides](https://guides.github.com/)
- 💬 [GitHub Community](https://github.community/)
- 📧 Git/GitHub 관련 질문은 구글링하면 대부분 해결!

---

**파일 생성 완료! 이제 위의 명령어를 따라하시면 됩니다.** 🚀
