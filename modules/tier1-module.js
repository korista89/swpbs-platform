// =====================================================
// Tier 1: 보편적 지원 모듈
// =====================================================

class Tier1Module {
  static render() {
    const container = document.getElementById('tier1');
    if (!container) return;

    container.innerHTML = `
      <h1><span class="tier-badge tier-badge-1">Tier 1</span> 보편적 지원</h1>

      <!-- 탭 네비게이션 -->
      <div class="nav-tabs">
        <div class="nav-tab active" onclick="Tier1Module.showTab('expectations')">
          📚 기대행동 시스템
        </div>
        <div class="nav-tab" onclick="Tier1Module.showTab('environment')">
          🗺️ 환경 및 절차
        </div>
        <div class="nav-tab" onclick="Tier1Module.showTab('data')">
          📊 데이터 분석
        </div>
        <div class="nav-tab" onclick="Tier1Module.showTab('rewards')">
          🎁 인정 강화체계
        </div>
      </div>

      <!-- 기대행동 시스템 -->
      <div id="tier1-expectations" class="tier1-tab-content active">
        ${this.renderExpectationsTab()}
      </div>

      <!-- 환경 및 절차 -->
      <div id="tier1-environment" class="tier1-tab-content">
        ${this.renderEnvironmentTab()}
      </div>

      <!-- 데이터 분석 -->
      <div id="tier1-data" class="tier1-tab-content">
        ${this.renderDataTab()}
      </div>

      <!-- 인정 강화체계 -->
      <div id="tier1-rewards" class="tier1-tab-content">
        ${this.renderRewardsTab()}
      </div>
    `;

    // 차트 초기화
    this.initializeCharts();
  }

  static showTab(tabName) {
    // 모든 탭 숨기기
    document.querySelectorAll('.tier1-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    // 선택된 탭 표시
    const selectedTab = document.getElementById(`tier1-${tabName}`);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }

    // 탭 버튼 업데이트
    document.querySelectorAll('#tier1 .nav-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 탭별 차트 초기화
    if (tabName === 'data') {
      this.initializeCharts();
    }
  }

  static renderExpectationsTab() {
    return `
      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">✅ 기대행동 라이브러리</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">학교 핵심 가치</label>
              <input type="text" class="form-input" value="스스로 / 바르게 / 안전하게" placeholder="예: 존중, 책임, 안전">
            </div>

            <h4 style="margin-top: 1.5rem; margin-bottom: 1rem;">기대행동 목록</h4>
            <ul class="feature-list">
              <li><strong>스스로:</strong> 자기주도적으로 학습하고 활동합니다</li>
              <li><strong>바르게:</strong> 예절과 규칙을 지키며 타인을 존중합니다</li>
              <li><strong>안전하게:</strong> 자신과 타인의 안전을 위해 조심합니다</li>
            </ul>

            <button class="btn btn-primary mt-4" onclick="Tier1Module.addExpectation()">
              + 기대행동 추가
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🧱 행동 매트릭스 빌더</h3>
          </div>
          <div class="card-body">
            <p class="text-secondary" style="margin-bottom: 1rem;">
              장소별 구체적인 기대행동을 정의합니다.
            </p>

            <div class="form-group">
              <label class="form-label">장소 선택</label>
              <select class="form-select" onchange="Tier1Module.showMatrixForLocation(this.value)">
                <option value="classroom">교실</option>
                <option value="hallway">복도</option>
                <option value="cafeteria">급식실</option>
                <option value="playground">운동장</option>
                <option value="bathroom">화장실</option>
                <option value="bus">통학버스</option>
              </select>
            </div>

            <div id="matrixDisplay" style="margin-top: 1rem;">
              ${this.renderMatrix('classroom')}
            </div>

            <button class="btn btn-outline mt-4" onclick="Tier1Module.exportMatrix()">
              📄 매트릭스 PDF 출력
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">🧑‍🏫 수업 및 모델링 자료</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="quick-action-card">
              <div class="quick-action-icon">📖</div>
              <div class="quick-action-title">주간 지도안</div>
              <div class="quick-action-desc">이번 주 행동 교육 계획</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">🎭</div>
              <div class="quick-action-title">롤플레이 시나리오</div>
              <div class="quick-action-desc">상황별 역할극 자료</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">🎥</div>
              <div class="quick-action-title">교육 동영상</div>
              <div class="quick-action-desc">행동 모델링 영상</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderMatrix(location) {
    const matrices = {
      classroom: {
        '스스로': '자리에 앉아 과제를 완성합니다',
        '바르게': '손을 들고 발표 기회를 기다립니다',
        '안전하게': '교실에서 걷습니다'
      },
      hallway: {
        '스스로': '목적지까지 곧바로 이동합니다',
        '바르게': '조용히 걸으며 다른 반을 방해하지 않습니다',
        '안전하게': '오른쪽으로 천천히 걷습니다'
      },
      cafeteria: {
        '스스로': '차례를 지켜 음식을 받습니다',
        '바르게': '작은 목소리로 대화합니다',
        '안전하게': '자리에 앉아서 식사합니다'
      }
    };

    const matrix = matrices[location] || matrices.classroom;
    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>기대행동</th>
            <th>구체적 실천 방법</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(matrix).map(([key, value]) => `
            <tr>
              <td><strong>${key}</strong></td>
              <td>${value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  static renderEnvironmentTab() {
    return `
      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🗺️ 동선 및 표지 관리</h3>
          </div>
          <div class="card-body">
            <h4>시각 지원 자료</h4>
            <div class="grid grid-2" style="margin-top: 1rem;">
              <div class="quick-action-card">
                <div class="quick-action-icon">➡️</div>
                <div class="quick-action-title">이동 동선</div>
                <div class="quick-action-desc">바닥 표시 및 화살표</div>
              </div>

              <div class="quick-action-card">
                <div class="quick-action-icon">🚦</div>
                <div class="quick-action-title">신호등 시스템</div>
                <div class="quick-action-desc">행동 피드백 표시</div>
              </div>

              <div class="quick-action-card">
                <div class="quick-action-icon">📍</div>
                <div class="quick-action-title">대기선</div>
                <div class="quick-action-desc">줄서기 위치 표시</div>
              </div>

              <div class="quick-action-card">
                <div class="quick-action-icon">🎨</div>
                <div class="quick-action-title">픽토그램</div>
                <div class="quick-action-desc">시각적 규칙 안내</div>
              </div>
            </div>

            <button class="btn btn-primary mt-4">
              📥 시각 자료 다운로드
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🧰 교실 준비 체크리스트</h3>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li>좌석 배치 완료 (모둠/ㄷ자/극장식)</li>
              <li>시각 일과표 부착 (PECS 카드)</li>
              <li>과제 서랍 라벨링 (TEACCH)</li>
              <li>행동 규칙 포스터 게시</li>
              <li>보상 차트 준비</li>
              <li>타이머 및 시각 지원 도구 배치</li>
              <li>감정 코칭 코너 설치</li>
              <li>안전 구역 표시</li>
            </ul>

            <div class="progress-bar mt-4">
              <div class="progress-fill" style="width: 75%"></div>
            </div>
            <p class="text-sm text-secondary mt-2">완료율: 75% (6/8)</p>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">📚 보편적 스킬 교육 패키지</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-4">
            <div class="quick-action-card">
              <div class="quick-action-icon">✋</div>
              <div class="quick-action-title">손들고 요청하기</div>
              <div class="quick-action-desc">적절한 도움 요청 방법</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">👥</div>
              <div class="quick-action-title">줄서기</div>
              <div class="quick-action-desc">순서 지키기 연습</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">⏰</div>
              <div class="quick-action-title">기다리기</div>
              <div class="quick-action-desc">대기 시간 관리</div>
            </div>

            <div class="quick-action-card">
              <div class="quick-action-icon">🚶</div>
              <div class="quick-action-title">교실 이동</div>
              <div class="quick-action-desc">안전한 이동 방법</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderDataTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📊 Tier 1 데이터 분석</h3>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <button class="btn btn-sm btn-primary" onclick="Tier1Module.loadDataFromCSV()">
              📥 CSV 불러오기
            </button>
            <button class="btn btn-sm btn-outline" onclick="Tier1Module.exportReport()">
              📤 리포트 내보내기
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="dashboard-stats" style="margin-bottom: 2rem;">
            <div class="stat-card">
              <div class="stat-value" id="tier1-total-odr">0</div>
              <div class="stat-label">총 ODR 건수</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #10b981, #059669);">
              <div class="stat-value" id="tier1-avg-intensity">0</div>
              <div class="stat-label">평균 강도</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <div class="stat-value" id="tier1-peak-location">-</div>
              <div class="stat-label">최다 발생 장소</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
              <div class="stat-value" id="tier1-trend">→</div>
              <div class="stat-label">주간 추세</div>
            </div>
          </div>

          <div class="grid grid-2">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">위치별 발생 현황</h4>
              </div>
              <div class="card-body">
                <div style="height: 300px;">
                  <canvas id="tier1-location-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">시간대별 발생 현황</h4>
              </div>
              <div class="card-body">
                <div style="height: 300px;">
                  <canvas id="tier1-time-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">행동 유형별 분포</h4>
              </div>
              <div class="card-body">
                <div style="height: 300px;">
                  <canvas id="tier1-behavior-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">요일별 패턴</h4>
              </div>
              <div class="card-body">
                <div style="height: 300px;">
                  <canvas id="tier1-weekday-chart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h4 class="card-title">주간 추세 분석</h4>
            </div>
            <div class="card-body">
              <div style="height: 300px;">
                <canvas id="tier1-weekly-trend-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderRewardsTab() {
    return `
      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🎁 포인트 시스템 설정</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">포인트 명칭</label>
              <input type="text" class="form-input" value="경은포인트" placeholder="예: 칭찬포인트, 스타">
            </div>

            <div class="form-group">
              <label class="form-label">발급 기준</label>
              <ul class="feature-list">
                <li>기대행동 실천: 1포인트</li>
                <li>타인 도움: 2포인트</li>
                <li>지속적 노력: 3포인트</li>
                <li>모범 사례: 5포인트</li>
              </ul>
            </div>

            <div class="form-group">
              <label class="form-label">교환 비율</label>
              <input type="number" class="form-input" value="10" placeholder="10"> 포인트 = 1회 교환
            </div>

            <button class="btn btn-primary mt-4">설정 저장</button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🏪 보상 상점 (경은마트)</h3>
          </div>
          <div class="card-body">
            <h4>보상 항목</h4>
            <table class="data-table" style="margin-top: 1rem;">
              <thead>
                <tr>
                  <th>보상</th>
                  <th>필요 포인트</th>
                  <th>재고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🍬 간식</td>
                  <td>10</td>
                  <td>50개</td>
                </tr>
                <tr>
                  <td>🎮 자유시간 10분</td>
                  <td>15</td>
                  <td>무제한</td>
                </tr>
                <tr>
                  <td>📚 도서 대출 우선권</td>
                  <td>20</td>
                  <td>5개</td>
                </tr>
                <tr>
                  <td>🎨 특별활동 선택권</td>
                  <td>30</td>
                  <td>3개</td>
                </tr>
                <tr>
                  <td>⭐ 칭찬 편지</td>
                  <td>50</td>
                  <td>무제한</td>
                </tr>
              </tbody>
            </table>

            <button class="btn btn-outline mt-4">+ 보상 추가</button>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">🧾 ODR / 경미사건 로깅</h3>
        </div>
        <div class="card-body">
          <div class="alert alert-info">
            <span>ℹ️</span>
            <div>
              <strong>ODR 정의:</strong> 교사가 사무실로 의뢰하는 심각한 행동 사건<br>
              <strong>경미사건:</strong> 교실 내에서 교사가 직접 처리하는 행동
            </div>
          </div>

          <button class="btn btn-primary" onclick="recordODR()">
            📝 ODR 기록하기
          </button>
          <button class="btn btn-outline" onclick="Tier1Module.recordMinor()">
            📋 경미사건 기록하기
          </button>
        </div>
      </div>
    `;
  }

  static initializeCharts() {
    const events = SWPBS.data.odrEvents;
    if (!events || events.length === 0) return;

    const stats = AnalyticsEngine.getODRStats(events);

    // 통계 업데이트
    const updateStat = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    updateStat('tier1-total-odr', stats.total);
    updateStat('tier1-avg-intensity', stats.averageIntensity);

    const topLocation = Object.entries(stats.byLocation)
      .sort((a, b) => b[1] - a[1])[0];
    updateStat('tier1-peak-location', topLocation ? topLocation[0] : '-');

    const trendSymbols = { increasing: '📈', decreasing: '📉', stable: '→' };
    updateStat('tier1-trend', trendSymbols[stats.trend] || '→');

    // 차트 생성
    ChartManager.createLocationChart('tier1-location-chart', stats.byLocation);
    ChartManager.createTimeChart('tier1-time-chart', stats.byTime);
    ChartManager.createBehaviorChart('tier1-behavior-chart', stats.byBehavior);

    // 요일별 차트
    const weekdayOrder = ['월요일', '화요일', '수요일', '목요일', '금요일'];
    const weekdayData = weekdayOrder.map(day => stats.byWeekday[day] || 0);
    ChartManager.createChart('tier1-weekday-chart', 'bar', {
      labels: weekdayOrder,
      datasets: [{
        label: '발생 건수',
        data: weekdayData,
        backgroundColor: '#3b82f6'
      }]
    });

    ChartManager.createWeeklyTrendChart('tier1-weekly-trend-chart', stats.byWeek);
  }

  static addExpectation() {
    UIManager.showNotification('기대행동 추가 기능이 곧 제공됩니다.', 'info');
  }

  static showMatrixForLocation(location) {
    const display = document.getElementById('matrixDisplay');
    if (display) {
      display.innerHTML = this.renderMatrix(location);
    }
  }

  static exportMatrix() {
    UIManager.showNotification('매트릭스가 PDF로 다운로드됩니다.', 'success');
  }

  static loadDataFromCSV() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        DataManager.uploadCSV(file, () => {
          this.initializeCharts();
          UIManager.showNotification('데이터가 성공적으로 불러와졌습니다.', 'success');
        });
      }
    };
    input.click();
  }

  static exportReport() {
    const events = SWPBS.data.odrEvents;
    DataManager.downloadCSV(events, 'tier1-report.csv');
    UIManager.showNotification('리포트가 다운로드되었습니다.', 'success');
  }

  static recordMinor() {
    UIManager.showNotification('경미사건 기록 기능이 곧 제공됩니다.', 'info');
  }

  static attachEventListeners() {
    // Event listeners are attached via onclick in HTML
    console.log('✅ Tier1Module event listeners attached');
  }
}

// Make module globally accessible
window.Tier1Module = Tier1Module;
