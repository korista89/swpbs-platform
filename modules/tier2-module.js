// =====================================================
// Tier 2: 표적집단 지원 모듈
// =====================================================

class Tier2Module {
  static render() {
    const container = document.getElementById('tier2');
    if (!container) return;

    container.innerHTML = `
      <h1><span class="tier-badge tier-badge-2">Tier 2</span> 표적집단 지원</h1>

      <!-- 탭 네비게이션 -->
      <div class="nav-tabs">
        <div class="nav-tab active" onclick="Tier2Module.showTab('programs')">
          🟧 프로그램 허브
        </div>
        <div class="nav-tab" onclick="Tier2Module.showTab('cico')">
          📋 CICO 관리
        </div>
        <div class="nav-tab" onclick="Tier2Module.showTab('sst')">
          🗣️ SST & FCT
        </div>
        <div class="nav-tab" onclick="Tier2Module.showTab('monitoring')">
          📊 모니터링
        </div>
      </div>

      <!-- 프로그램 허브 -->
      <div id="tier2-programs" class="tier2-tab-content active">
        ${this.renderProgramsTab()}
      </div>

      <!-- CICO 관리 -->
      <div id="tier2-cico" class="tier2-tab-content">
        ${this.renderCICOTab()}
      </div>

      <!-- SST & FCT -->
      <div id="tier2-sst" class="tier2-tab-content">
        ${this.renderSSTTab()}
      </div>

      <!-- 모니터링 -->
      <div id="tier2-monitoring" class="tier2-tab-content">
        ${this.renderMonitoringTab()}
      </div>
    `;

    this.initializeCharts();
  }

  static showTab(tabName) {
    document.querySelectorAll('.tier2-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    const selectedTab = document.getElementById(`tier2-${tabName}`);
    if (selectedTab) selectedTab.classList.add('active');

    document.querySelectorAll('#tier2 .nav-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (tabName === 'monitoring') {
      this.initializeCharts();
    }
  }

  static renderProgramsTab() {
    return `
      <div class="dashboard-stats">
        <div class="stat-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
          <div class="stat-value">18</div>
          <div class="stat-label">CICO 참여 학생</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
          <div class="stat-value">6</div>
          <div class="stat-label">SST 참여 학생</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #10b981, #059669);">
          <div class="stat-value">75%</div>
          <div class="stat-label">목표 달성률</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
          <div class="stat-value">3</div>
          <div class="stat-label">재평가 예정</div>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🟧 CICO (Check-In Check-Out)</h3>
          </div>
          <div class="card-body">
            <p class="text-secondary" style="margin-bottom: 1rem;">
              일일 체크인/체크아웃을 통한 행동 지원 프로그램
            </p>

            <ul class="feature-list">
              <li>아침 체크인으로 하루 목표 설정</li>
              <li>수업 시간마다 행동 피드백</li>
              <li>하루 종료 시 체크아웃 및 보상</li>
              <li>가정 연계 일일 진척도 보고서(DPR)</li>
              <li>4주 단위 반응 평가</li>
            </ul>

            <div style="margin-top: 1.5rem;">
              <button class="btn btn-primary" onclick="Tier2Module.manageCICO()">
                프로그램 관리
              </button>
              <button class="btn btn-outline" onclick="Tier2Module.checkIn()">
                체크인/체크아웃
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🟦 감정조절 (Zones of Regulation)</h3>
          </div>
          <div class="card-body">
            <p class="text-secondary" style="margin-bottom: 1rem;">
              자신의 감정 상태를 인식하고 조절하는 방법 학습
            </p>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem;">
              <div style="padding: 0.75rem; background: #dbeafe; border-radius: 8px; text-align: center;">
                <div style="font-size: 1.5rem;">🔵</div>
                <div style="font-weight: 600; margin-top: 0.25rem;">Blue Zone</div>
                <div style="font-size: 0.75rem; color: #1e40af;">슬픔, 피곤</div>
              </div>
              <div style="padding: 0.75rem; background: #dcfce7; border-radius: 8px; text-align: center;">
                <div style="font-size: 1.5rem;">🟢</div>
                <div style="font-weight: 600; margin-top: 0.25rem;">Green Zone</div>
                <div style="font-size: 0.75rem; color: #166534;">차분, 집중</div>
              </div>
              <div style="padding: 0.75rem; background: #fef3c7; border-radius: 8px; text-align: center;">
                <div style="font-size: 1.5rem;">🟡</div>
                <div style="font-weight: 600; margin-top: 0.25rem;">Yellow Zone</div>
                <div style="font-size: 0.75rem; color: #92400e;">흥분, 불안</div>
              </div>
              <div style="padding: 0.75rem; background: #fee2e2; border-radius: 8px; text-align: center;">
                <div style="font-size: 1.5rem;">🔴</div>
                <div style="font-weight: 600; margin-top: 0.25rem;">Red Zone</div>
                <div style="font-size: 0.75rem; color: #991b1b;">화남, 폭발</div>
              </div>
            </div>

            <button class="btn btn-outline">
              감정 코칭 자료
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">🔎 학생 식별 및 배치</h3>
        </div>
        <div class="card-body">
          <div class="alert alert-info">
            <span>ℹ️</span>
            <div>
              <strong>식별 기준:</strong> ODR 2회 이상, 결석 패턴, 교실 포인트 하위 20%<br>
              자동으로 후보 학생을 추천하고 리더십팀 승인 후 프로그램에 배치됩니다.
            </div>
          </div>

          <h4 style="margin-top: 1.5rem; margin-bottom: 1rem;">추천 후보 학생</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>학생명</th>
                <th>ODR 횟수</th>
                <th>주요 행동</th>
                <th>권장 프로그램</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>김O우</td>
                <td>3회</td>
                <td>수업 방해</td>
                <td>CICO</td>
                <td><button class="btn btn-sm btn-primary">승인</button></td>
              </tr>
              <tr>
                <td>이O진</td>
                <td>2회</td>
                <td>감정폭발</td>
                <td>Zones</td>
                <td><button class="btn btn-sm btn-primary">승인</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static renderCICOTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📋 CICO 프로그램 관리</h3>
          <button class="btn btn-primary" onclick="Tier2Module.addCICOStudent()">
            + 학생 추가
          </button>
        </div>
        <div class="card-body">
          <h4>참여 학생 목록</h4>
          <table class="data-table" style="margin-top: 1rem;">
            <thead>
              <tr>
                <th>학생명</th>
                <th>시작일</th>
                <th>진행 주차</th>
                <th>목표 달성률</th>
                <th>상태</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody id="cico-student-list">
              ${this.renderCICOStudents()}
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid grid-2 mt-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">일일 진척도 보고서 (DPR)</h4>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">학생 선택</label>
              <select class="form-select" id="dpr-student-select" onchange="Tier2Module.loadDPR(this.value)">
                <option>학생 선택...</option>
                ${SWPBS.data.students.filter(s => s.tier === 'Tier 2').map(s =>
                  `<option value="${s.name}">${s.name}</option>`
                ).join('')}
              </select>
            </div>

            <div id="dpr-form" class="hidden">
              <h5 style="margin: 1.5rem 0 1rem;">행동 목표 평가</h5>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>목표 행동</th>
                    <th>1교시</th>
                    <th>2교시</th>
                    <th>3교시</th>
                    <th>4교시</th>
                    <th>5교시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>손들고 발표하기</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                  </tr>
                  <tr>
                    <td>자리에 앉아있기</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                  </tr>
                  <tr>
                    <td>친구에게 친절하기</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                  </tr>
                </tbody>
              </table>

              <div style="margin-top: 1.5rem;">
                <div class="form-group">
                  <label class="form-label">오늘의 총점</label>
                  <input type="number" class="form-input" value="0" readonly>
                </div>

                <div class="form-group">
                  <label class="form-label">교사 코멘트</label>
                  <textarea class="form-textarea" rows="3" placeholder="오늘의 행동에 대한 피드백..."></textarea>
                </div>

                <button class="btn btn-primary">저장 및 가정 전송</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4 class="card-title">4주 반응 평가</h4>
          </div>
          <div class="card-body">
            <div style="height: 300px;">
              <canvas id="cico-progress-chart"></canvas>
            </div>

            <div class="alert alert-success mt-4">
              <span>✓</span>
              <div>
                <strong>반응 양호:</strong> 80% 이상 목표 달성<br>
                → 프로그램 유지 권장
              </div>
            </div>

            <div style="margin-top: 1rem;">
              <button class="btn btn-outline">유지</button>
              <button class="btn btn-outline">수정</button>
              <button class="btn btn-danger">FBA 전환</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderCICOStudents() {
    const students = [
      { name: '박O혁', startDate: '2025-02-01', week: 8, rate: 85, status: 'good' },
      { name: '김O주', startDate: '2025-03-01', week: 3, rate: 72, status: 'partial' },
      { name: '이O채', startDate: '2025-03-10', week: 1, rate: 45, status: 'poor' }
    ];

    return students.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.startDate}</td>
        <td>${s.week}주차</td>
        <td>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${s.rate}%"></div>
          </div>
          <span class="text-sm text-secondary">${s.rate}%</span>
        </td>
        <td>
          <span class="tier-badge ${s.status === 'good' ? 'tier-badge-1' : s.status === 'partial' ? 'tier-badge-2' : 'tier-badge-3'}">
            ${s.status === 'good' ? '양호' : s.status === 'partial' ? '부분반응' : '저조'}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="Tier2Module.viewCICODetail('${s.name}')">
            상세보기
          </button>
        </td>
      </tr>
    `).join('');
  }

  static renderSSTTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🗣️ 사회성 기술 훈련 (SST)</h3>
        </div>
        <div class="card-body">
          <p class="text-secondary" style="margin-bottom: 1.5rem;">
            Skillstreaming: 모델링 → 역할극 → 피드백 → 일반화
          </p>

          <h4>기술 모듈</h4>
          <div class="grid grid-3" style="margin-top: 1rem;">
            <div class="quick-action-card">
              <div class="quick-action-icon">👋</div>
              <div class="quick-action-title">인사하기</div>
              <div class="quick-action-desc">적절한 인사 방법</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">🙏</div>
              <div class="quick-action-title">부탁하기</div>
              <div class="quick-action-desc">정중한 요청 표현</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">😊</div>
              <div class="quick-action-title">칭찬하기</div>
              <div class="quick-action-desc">긍정적 피드백 주기</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">🤝</div>
              <div class="quick-action-title">협력하기</div>
              <div class="quick-action-desc">함께 과제 수행</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">😌</div>
              <div class="quick-action-title">화 다스리기</div>
              <div class="quick-action-desc">감정 조절 전략</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">🎯</div>
              <div class="quick-action-title">문제 해결하기</div>
              <div class="quick-action-desc">갈등 해결 방법</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">💬 기능적 의사소통 훈련 (FCT)</h3>
        </div>
        <div class="card-body">
          <p class="text-secondary" style="margin-bottom: 1.5rem;">
            문제행동을 대체하는 적절한 의사소통 방법 교육
          </p>

          <h4>대체 의사소통 기술</h4>
          <table class="data-table" style="margin-top: 1rem;">
            <thead>
              <tr>
                <th>문제행동</th>
                <th>기능</th>
                <th>대체 의사소통</th>
                <th>교육 방법</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>소리지르기</td>
                <td>관심 얻기</td>
                <td>손들기 + "선생님"</td>
                <td>모델링, 역할극</td>
              </tr>
              <tr>
                <td>자리 이탈</td>
                <td>활동 회피</td>
                <td>"쉬어도 돼요?"</td>
                <td>시각 카드, 연습</td>
              </tr>
              <tr>
                <td>물건 던지기</td>
                <td>요구 표현</td>
                <td>"도와주세요"</td>
                <td>대본 연습</td>
              </tr>
              <tr>
                <td>친구 때리기</td>
                <td>물건 얻기</td>
                <td>"빌려줄래?"</td>
                <td>사회 이야기</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static renderMonitoringTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📊 Tier 2 모니터링 대시보드</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">프로그램별 참여 현황</h4>
              </div>
              <div class="card-body">
                <div style="height: 250px;">
                  <canvas id="tier2-program-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">반응률 분포</h4>
              </div>
              <div class="card-body">
                <div style="height: 250px;">
                  <canvas id="tier2-response-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">주간 진척도 추이</h4>
              </div>
              <div class="card-body">
                <div style="height: 250px;">
                  <canvas id="tier2-weekly-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">탈퇴/승급 현황</h4>
              </div>
              <div class="card-body">
                <div style="height: 250px;">
                  <canvas id="tier2-outcome-chart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">📋 TFI Tier 2 항목 매핑</h3>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>TFI 항목</th>
                <th>상태</th>
                <th>증거 자료</th>
                <th>개선 조치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2.1 프로그램 정의 문서화</td>
                <td><span class="tier-badge tier-badge-1">충족</span></td>
                <td>CICO 매뉴얼.pdf</td>
                <td>-</td>
              </tr>
              <tr>
                <td>2.2 학생 식별 절차</td>
                <td><span class="tier-badge tier-badge-1">충족</span></td>
                <td>ODR 기반 추천</td>
                <td>-</td>
              </tr>
              <tr>
                <td>2.3 진척도 모니터링</td>
                <td><span class="tier-badge tier-badge-2">부분충족</span></td>
                <td>DPR 기록</td>
                <td>주간 리뷰 미팅 일정화</td>
              </tr>
              <tr>
                <td>2.4 가정 연계</td>
                <td><span class="tier-badge tier-badge-3">미충족</span></td>
                <td>-</td>
                <td>가정 통신문 템플릿 생성</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static initializeCharts() {
    // 프로그램별 참여 현황
    ChartManager.createChart('tier2-program-chart', 'bar', {
      labels: ['CICO', 'Zones', 'SST', 'FCT'],
      datasets: [{
        label: '참여 학생 수',
        data: [18, 8, 6, 4],
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6']
      }]
    });

    // 반응률 분포
    ChartManager.createChart('tier2-response-chart', 'doughnut', {
      labels: ['양호', '부분반응', '무반응'],
      datasets: [{
        data: [12, 8, 4],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
      }]
    });

    // 주간 진척도
    ChartManager.createChart('tier2-weekly-chart', 'line', {
      labels: ['1주', '2주', '3주', '4주', '5주', '6주', '7주', '8주'],
      datasets: [{
        label: '평균 달성률 (%)',
        data: [45, 52, 61, 68, 72, 75, 78, 82],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }]
    });

    // 탈퇴/승급 현황
    ChartManager.createChart('tier2-outcome-chart', 'bar', {
      labels: ['프로그램 유지', 'Tier 1로 성공', 'Tier 3로 승급', '중단'],
      datasets: [{
        label: '학생 수',
        data: [15, 6, 2, 1],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }]
    });

    // CICO 진척도 차트
    if (document.getElementById('cico-progress-chart')) {
      ChartManager.createChart('cico-progress-chart', 'line', {
        labels: ['1주', '2주', '3주', '4주'],
        datasets: [
          {
            label: '목표',
            data: [80, 80, 80, 80],
            borderColor: '#10b981',
            borderDash: [5, 5],
            fill: false
          },
          {
            label: '실제 달성률',
            data: [65, 75, 82, 85],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      });
    }
  }

  static manageCICO() {
    UIManager.showNotification('CICO 프로그램 관리 화면으로 이동합니다.', 'info');
    this.showTab('cico');
  }

  static checkIn() {
    UIManager.showModal('체크인/체크아웃', `
      <div class="form-group">
        <label class="form-label">학생 선택</label>
        <select class="form-select">
          ${SWPBS.data.students.filter(s => s.tier === 'Tier 2').map(s =>
            `<option value="${s.name}">${s.name}</option>`
          ).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">유형</label>
        <select class="form-select">
          <option>체크인 (시작)</option>
          <option>체크아웃 (종료)</option>
        </select>
      </div>
    `, [
      { label: '취소', class: 'btn-secondary', onClick: 'UIManager.closeModal("customModal")' },
      { label: '확인', class: 'btn-primary', onClick: 'UIManager.closeModal("customModal")' }
    ]);
  }

  static addCICOStudent() {
    UIManager.showNotification('학생 추가 기능이 곧 제공됩니다.', 'info');
  }

  static loadDPR(studentName) {
    if (studentName) {
      document.getElementById('dpr-form')?.classList.remove('hidden');
    }
  }

  static viewCICODetail(studentName) {
    UIManager.showModal(`${studentName} - CICO 상세`, `
      <h4>진척도 요약</h4>
      <div style="height: 200px; margin: 1rem 0;">
        <canvas id="student-cico-detail-chart"></canvas>
      </div>
      <h4 style="margin-top: 1.5rem;">최근 DPR 기록</h4>
      <table class="data-table" style="margin-top: 1rem;">
        <thead>
          <tr><th>날짜</th><th>점수</th><th>달성률</th><th>코멘트</th></tr>
        </thead>
        <tbody>
          <tr><td>2025-03-20</td><td>12/15</td><td>80%</td><td>좋은 하루!</td></tr>
          <tr><td>2025-03-19</td><td>10/15</td><td>67%</td><td>노력했어요</td></tr>
          <tr><td>2025-03-18</td><td>13/15</td><td>87%</td><td>훌륭해요!</td></tr>
        </tbody>
      </table>
    `, [
      { label: '닫기', class: 'btn-primary', onClick: 'UIManager.closeModal("customModal")' }
    ]);

    setTimeout(() => {
      ChartManager.createChart('student-cico-detail-chart', 'line', {
        labels: ['1주', '2주', '3주', '4주', '5주', '6주', '7주', '8주'],
        datasets: [{
          label: '주간 평균 달성률',
          data: [60, 65, 70, 75, 78, 82, 85, 87],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
          fill: true
        }]
      });
    }, 100);
  }
}
