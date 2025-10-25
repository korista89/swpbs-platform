// ===================================================
// Tier 3: 개별학생 지원 (FBA + BIP) 모듈
// ===================================================

class Tier3Module {
  static render() {
    const container = document.getElementById('tier3');
    if (!container) return;

    container.innerHTML = `
      <h1><span class="tier-badge tier-badge-3">Tier 3</span> 개별학생 지원</h1>

      <div class="nav-tabs">
        <div class="nav-tab active" onclick="Tier3Module.showTab('students')">
          👤 학생 목록
        </div>
        <div class="nav-tab" onclick="Tier3Module.showTab('fba')">
          🔬 FBA 평가
        </div>
        <div class="nav-tab" onclick="Tier3Module.showTab('bip')">
          📋 BIP 계획
        </div>
        <div class="nav-tab" onclick="Tier3Module.showTab('monitoring')">
          📊 모니터링
        </div>
        <div class="nav-tab" onclick="Tier3Module.showTab('crisis')">
          🚨 위기관리
        </div>
      </div>

      <div id="tier3-students" class="tier3-tab-content active">
        ${this.renderStudentsTab()}
      </div>

      <div id="tier3-fba" class="tier3-tab-content">
        ${this.renderFBATab()}
      </div>

      <div id="tier3-bip" class="tier3-tab-content">
        ${this.renderBIPTab()}
      </div>

      <div id="tier3-monitoring" class="tier3-tab-content">
        ${this.renderMonitoringTab()}
      </div>

      <div id="tier3-crisis" class="tier3-tab-content">
        ${this.renderCrisisTab()}
      </div>
    `;

    this.initializeCharts();
  }

  static showTab(tabName) {
    document.querySelectorAll('.tier3-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    const selectedTab = document.getElementById(`tier3-${tabName}`);
    if (selectedTab) selectedTab.classList.add('active');

    document.querySelectorAll('#tier3 .nav-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (tabName === 'monitoring') {
      this.initializeCharts();
    }
  }

  static renderStudentsTab() {
    const tier3Students = SWPBS.data.students.filter(s => s.tier === 'Tier 3');

    return `
      <div class="dashboard-stats">
        <div class="stat-card" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
          <div class="stat-value">${tier3Students.length}</div>
          <div class="stat-label">Tier 3 대상 학생</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
          <div class="stat-value">6</div>
          <div class="stat-label">FBA 진행 중</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
          <div class="stat-value">5</div>
          <div class="stat-label">BIP 실행 중</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
          <div class="stat-value">2</div>
          <div class="stat-label">재평가 예정</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">👤 개별 지원 대상 학생</h3>
          <button class="btn btn-primary" onclick="Tier3Module.addStudent()">
            + 학생 추가
          </button>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>학생명</th>
                <th>주요 행동</th>
                <th>ODR 횟수</th>
                <th>FBA 상태</th>
                <th>BIP 상태</th>
                <th>담당자</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderStudentRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static renderStudentRows() {
    const students = [
      { name: '김민주', behavior: '신체적 공격', odr: 12, fba: '완료', bip: '실행중', staff: '여수일' },
      { name: '양준민', behavior: '신체적 공격', odr: 4, fba: '완료', bip: '실행중', staff: '최두진' },
      { name: '박민혁', behavior: '수업방해', odr: 4, fba: '진행중', bip: '미작성', staff: '최두진' },
      { name: '이민혁', behavior: '감정폭발', odr: 3, fba: '진행중', bip: '미작성', staff: '박보미' },
      { name: '장재형', behavior: '신체적 공격', odr: 2, fba: '완료', bip: '실행중', staff: '윤혜미' }
    ];

    return students.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.behavior}</td>
        <td><span class="tier-badge tier-badge-3">${s.odr}회</span></td>
        <td>
          <span class="tier-badge ${s.fba === '완료' ? 'tier-badge-1' : 'tier-badge-2'}">
            ${s.fba}
          </span>
        </td>
        <td>
          <span class="tier-badge ${s.bip === '실행중' ? 'tier-badge-1' : 'tier-badge-2'}">
            ${s.bip}
          </span>
        </td>
        <td>${s.staff}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="Tier3Module.viewStudentDetail('${s.name}')">
            상세보기
          </button>
        </td>
      </tr>
    `).join('');
  }

  static renderFBATab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔬 기능 행동 평가 (FBA) 워크벤치</h3>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">학생 선택</label>
            <select class="form-select" id="fba-student-select" onchange="Tier3Module.loadFBA(this.value)">
              <option>학생 선택...</option>
              ${SWPBS.data.students.filter(s => s.tier === 'Tier 3').map(s =>
                `<option value="${s.name}">${s.name}</option>`
              ).join('')}
            </select>
          </div>

          <div id="fba-workspace" class="hidden">
            <div class="grid grid-2" style="margin-top: 1.5rem;">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">ABC 데이터 수집</h4>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">선행사건 (Antecedent)</label>
                    <textarea class="form-textarea" rows="2" placeholder="행동 직전 상황..."></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">행동 (Behavior)</label>
                    <textarea class="form-textarea" rows="2" placeholder="관찰된 행동 구체적 기술..."></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">결과 (Consequence)</label>
                    <textarea class="form-textarea" rows="2" placeholder="행동 직후 결과..."></textarea>
                  </div>

                  <button class="btn btn-primary">ABC 기록 추가</button>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">측정 도구</h4>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">측정 방법</label>
                    <select class="form-select">
                      <option>빈도 기록 (Frequency)</option>
                      <option>지속시간 기록 (Duration)</option>
                      <option>간격 기록 (Interval)</option>
                      <option>순간 표집 (Momentary Time Sampling)</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">관찰 시간</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                      <input type="time" class="form-input" value="09:00">
                      <input type="time" class="form-input" value="15:00">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">오늘 기록</label>
                    <input type="number" class="form-input" placeholder="발생 횟수 또는 지속시간(분)">
                  </div>

                  <button class="btn btn-outline">측정 기록 저장</button>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <div class="card-header">
                <h4 class="card-title">🧠 기능 가설 마법사</h4>
              </div>
              <div class="card-body">
                <p class="text-secondary" style="margin-bottom: 1rem;">
                  수집된 데이터를 바탕으로 행동의 기능을 추정합니다.
                </p>

                <div class="grid grid-2">
                  <div>
                    <h5>행동 패턴 분석</h5>
                    <ul class="feature-list" style="margin-top: 0.5rem;">
                      <li>가장 많이 발생하는 시간대: <strong>10-11시</strong></li>
                      <li>가장 많이 발생하는 장소: <strong>교실</strong></li>
                      <li>주요 선행사건: <strong>과제 제시</strong></li>
                      <li>주요 후속결과: <strong>과제 중단</strong></li>
                    </ul>
                  </div>

                  <div>
                    <h5>추정 기능</h5>
                    <div style="margin-top: 0.5rem;">
                      <div style="margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                          <span><strong>과제/활동 회피</strong></span>
                          <span class="text-sm">85%</span>
                        </div>
                        <div class="progress-bar">
                          <div class="progress-fill" style="width: 85%; background: #ef4444;"></div>
                        </div>
                      </div>

                      <div style="margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                          <span><strong>성인 관심 얻기</strong></span>
                          <span class="text-sm">10%</span>
                        </div>
                        <div class="progress-bar">
                          <div class="progress-fill" style="width: 10%; background: #f59e0b;"></div>
                        </div>
                      </div>

                      <div style="margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                          <span><strong>또래 관심 얻기</strong></span>
                          <span class="text-sm">3%</span>
                        </div>
                        <div class="progress-bar">
                          <div class="progress-fill" style="width: 3%; background: #10b981;"></div>
                        </div>
                      </div>

                      <div style="margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                          <span><strong>감각 자극</strong></span>
                          <span class="text-sm">2%</span>
                        </div>
                        <div class="progress-bar">
                          <div class="progress-fill" style="width: 2%; background: #3b82f6;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="alert alert-success mt-4">
                  <span>✓</span>
                  <div>
                    <strong>가설 결론:</strong> 문제행동은 주로 <u>과제 회피</u> 기능으로 발생합니다.
                    어려운 과제나 선호하지 않는 활동 상황에서 행동이 나타나며,
                    행동 후 과제가 중단되거나 회피할 수 있게 됩니다.
                  </div>
                </div>

                <button class="btn btn-primary mt-4" onclick="Tier3Module.completeFBA()">
                  FBA 완료 및 BIP 작성하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderBIPTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📋 행동중재계획 (BIP) 빌더</h3>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">학생 선택</label>
            <select class="form-select" id="bip-student-select" onchange="Tier3Module.loadBIP(this.value)">
              <option>학생 선택...</option>
              ${SWPBS.data.students.filter(s => s.tier === 'Tier 3').map(s =>
                `<option value="${s.name}">${s.name}</option>`
              ).join('')}
            </select>
          </div>

          <div id="bip-builder" class="hidden">
            <div class="alert alert-info" style="margin-top: 1.5rem;">
              <span>ℹ️</span>
              <div>
                <strong>BIP 구성요소 (PTR 모델):</strong>
                선행조정 → 교수전략 → 보강 → 반응전략
              </div>
            </div>

            <div class="grid grid-2" style="margin-top: 1.5rem;">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">1️⃣ 선행 조정 전략</h4>
                </div>
                <div class="card-body">
                  <p class="text-sm text-secondary">행동을 예방하기 위한 환경 수정</p>

                  <div class="form-group">
                    <label class="form-label">환경 수정</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 과제 난이도 조절, 휴식 시간 제공, 시각적 일과표 사용"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">일과 조정</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 선호 활동 먼저 배치, 짧은 과제로 분할"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">신호 및 프롬프트</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 5분 전 예고, 타이머 사용, 시각적 신호"></textarea>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">2️⃣ 교수 전략</h4>
                </div>
                <div class="card-body">
                  <p class="text-sm text-secondary">대체 기술 가르치기</p>

                  <div class="form-group">
                    <label class="form-label">대체 행동</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: '쉬어도 돼요?' 카드 사용, 도움 요청 신호"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">대처 기술</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 심호흡, 감정 온도계, 안전 구역 이용"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">사회성 기술</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 또래와 놀이 참여, 차례 기다리기"></textarea>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">3️⃣ 강화 전략</h4>
                </div>
                <div class="card-body">
                  <p class="text-sm text-secondary">적절한 행동 강화하기</p>

                  <div class="form-group">
                    <label class="form-label">강화 유형</label>
                    <select class="form-select">
                      <option>토큰 강화</option>
                      <option>사회적 강화 (칭찬)</option>
                      <option>활동 강화</option>
                      <option>유형물 강화</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">강화 스케줄</label>
                    <select class="form-select">
                      <option>연속 강화 (CRF)</option>
                      <option>간헐 강화 - 고정비율 (FR)</option>
                      <option>간헐 강화 - 변동비율 (VR)</option>
                      <option>간헐 강화 - 고정간격 (FI)</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">구체적 강화 내용</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 과제 완료 시마다 스티커 1개, 5개 모으면 자유시간 10분"></textarea>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">4️⃣ 반응 전략</h4>
                </div>
                <div class="card-body">
                  <p class="text-sm text-secondary">문제행동 발생 시 대응</p>

                  <div class="form-group">
                    <label class="form-label">차단 전략</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 행동 사슬 초기 단계에서 리다이렉션"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">결과 조치</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 계획된 무시, 자연적 결과, 타임아웃"></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">안전 절차</label>
                    <textarea class="form-textarea" rows="2" placeholder="예: 신체적 위험 시 다른 학생 분리, 안전 구역 이동"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <div class="card-header">
                <h4 class="card-title">📄 가정 연계 패키지</h4>
              </div>
              <div class="card-body">
                <div class="grid grid-3">
                  <div class="quick-action-card">
                    <div class="quick-action-icon">📝</div>
                    <div class="quick-action-title">보호자 안내서</div>
                    <div class="quick-action-desc">BIP 요약 및 가정 역할</div>
                  </div>

                  <div class="quick-action-card">
                    <div class="quick-action-icon">📊</div>
                    <div class="quick-action-title">일일 피드백</div>
                    <div class="quick-action-desc">행동 진척도 공유</div>
                  </div>

                  <div class="quick-action-card">
                    <div class="quick-action-icon">🏠</div>
                    <div class="quick-action-title">가정 중재안</div>
                    <div class="quick-action-desc">집에서 적용 가능한 전략</div>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-top: 2rem; text-align: center;">
              <button class="btn btn-outline">임시 저장</button>
              <button class="btn btn-primary" onclick="Tier3Module.saveBIP()">
                BIP 저장 및 실행 시작
              </button>
              <button class="btn btn-outline" onclick="Tier3Module.exportBIP()">
                📄 PDF 출력
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderMonitoringTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📉 목표-기준선-추적 차트</h3>
          <div>
            <select class="form-select" style="width: auto; display: inline-block;" onchange="Tier3Module.loadStudentProgress(this.value)">
              <option>학생 선택...</option>
              ${SWPBS.data.students.filter(s => s.tier === 'Tier 3').map(s =>
                `<option value="${s.name}">${s.name}</option>`
              ).join('')}
            </select>
          </div>
        </div>
        <div class="card-body">
          <div style="height: 400px;">
            <canvas id="tier3-progress-chart"></canvas>
          </div>

          <div class="alert alert-info mt-4">
            <span>ℹ️</span>
            <div>
              <strong>최소 임상 유의 변화 (MCID):</strong>
              기준선 대비 25% 이상 감소 시 유의미한 개선으로 판단
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h4 class="card-title">🔁 효과성 판정 및 수정 규칙</h4>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>평가 기간</th>
                <th>기준</th>
                <th>판정</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2주</td>
                <td>행동 빈도 감소 없음</td>
                <td><span class="tier-badge tier-badge-3">조치 필요</span></td>
                <td>강화 스케줄 조정</td>
              </tr>
              <tr>
                <td>4주</td>
                <td>10% 이상 감소</td>
                <td><span class="tier-badge tier-badge-2">부분 개선</span></td>
                <td>선행 조정 강화</td>
              </tr>
              <tr>
                <td>6주</td>
                <td>25% 이상 감소</td>
                <td><span class="tier-badge tier-badge-1">효과적</span></td>
                <td>현재 계획 유지</td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin-top: 1.5rem;">수정 옵션</h4>
          <div class="grid grid-3" style="margin-top: 1rem;">
            <button class="btn btn-outline">
              ⚙️ 강화 스케줄 조정
            </button>
            <button class="btn btn-outline">
              🔧 선행 조정 강화
            </button>
            <button class="btn btn-outline">
              💡 대체기술 형태 수정
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static renderCrisisTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🚨 위기예방 및 대응 플랜</h3>
        </div>
        <div class="card-body">
          <div class="alert alert-danger">
            <span>⚠️</span>
            <div>
              <strong>위기 상황:</strong> 자타해 위험이 있는 심각한 행동<br>
              사전 계획 수립으로 안전하고 일관된 대응 보장
            </div>
          </div>

          <div class="grid grid-2" style="margin-top: 1.5rem;">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">1단계: 전조 (Early Signs)</h4>
              </div>
              <div class="card-body">
                <h5>관찰 신호</h5>
                <ul class="feature-list">
                  <li>목소리 커짐</li>
                  <li>몸 긴장</li>
                  <li>과제 회피 시도</li>
                  <li>자리 이탈</li>
                </ul>

                <h5 style="margin-top: 1rem;">대응 전략</h5>
                <ul class="feature-list">
                  <li>선택권 제공</li>
                  <li>휴식 제안</li>
                  <li>리다이렉션</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">2단계: 고조 (Escalation)</h4>
              </div>
              <div class="card-body">
                <h5>관찰 신호</h5>
                <ul class="feature-list">
                  <li>큰 소리로 소리지름</li>
                  <li>물건 던지기</li>
                  <li>밀치기 시도</li>
                </ul>

                <h5 style="margin-top: 1rem;">대응 전략</h5>
                <ul class="feature-list">
                  <li>다른 학생 안전 확보</li>
                  <li>최소 언어 사용</li>
                  <li>안전 구역 안내</li>
                  <li>관리자 호출</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">3단계: 위기 (Crisis)</h4>
              </div>
              <div class="card-body">
                <h5>관찰 신호</h5>
                <ul class="feature-list">
                  <li>타인 공격</li>
                  <li>자해 행동</li>
                  <li>재산 파괴</li>
                </ul>

                <h5 style="margin-top: 1rem;">대응 전략</h5>
                <ul class="feature-list">
                  <li>물리적 제지 (훈련받은 인원만)</li>
                  <li>즉시 분리</li>
                  <li>911 호출 (필요시)</li>
                  <li>보호자 연락</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h4 class="card-title">4단계: 회복 (Recovery)</h4>
              </div>
              <div class="card-body">
                <h5>관찰 신호</h5>
                <ul class="feature-list">
                  <li>울음 또는 침묵</li>
                  <li>몸 긴장 이완</li>
                  <li>지시 따름</li>
                </ul>

                <h5 style="margin-top: 1rem;">대응 전략</h5>
                <ul class="feature-list">
                  <li>안정 시간 제공</li>
                  <li>지지적 대화</li>
                  <li>정상 일과 복귀</li>
                  <li>사후 디브리핑</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h4 class="card-title">📋 사건 보고서 템플릿</h4>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">학생명</label>
                <input type="text" class="form-input">
              </div>

              <div class="form-group">
                <label class="form-label">날짜/시간</label>
                <input type="datetime-local" class="form-input">
              </div>

              <div class="form-group">
                <label class="form-label">사건 유형</label>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                  <label><input type="checkbox"> 물리적 제지</label>
                  <label><input type="checkbox"> 분리 (Seclusion)</label>
                  <label><input type="checkbox"> 타인 부상</label>
                  <label><input type="checkbox"> 자해</label>
                  <label><input type="checkbox"> 재산 파괴</label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">사건 경위</label>
                <textarea class="form-textarea" rows="4" placeholder="객관적 사실 기술..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">개입 조치</label>
                <textarea class="form-textarea" rows="3" placeholder="취한 조치 상세 기술..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">후속 조치</label>
                <textarea class="form-textarea" rows="2" placeholder="향후 계획..."></textarea>
              </div>

              <button class="btn btn-primary">보고서 제출</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static initializeCharts() {
    // 목표-기준선-추적 차트
    if (document.getElementById('tier3-progress-chart')) {
      const weeks = Array.from({length: 12}, (_, i) => `${i+1}주`);

      ChartManager.createChart('tier3-progress-chart', 'line', {
        labels: weeks,
        datasets: [
          {
            label: '기준선',
            data: Array(3).fill(12),
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          },
          {
            label: '목표',
            data: Array(12).fill(3),
            borderColor: '#10b981',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          },
          {
            label: '실제 행동 빈도',
            data: [null, null, null, 11, 10, 9, 8, 7, 6, 5, 4, 4],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      }, {
        plugins: {
          annotation: {
            annotations: {
              baseline: {
                type: 'box',
                xMin: 0,
                xMax: 2,
                backgroundColor: 'rgba(148, 163, 184, 0.1)',
                borderColor: 'transparent'
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '행동 발생 빈도 (회/일)'
            }
          }
        }
      });
    }
  }

  static loadFBA(studentName) {
    if (studentName) {
      document.getElementById('fba-workspace')?.classList.remove('hidden');
    }
  }

  static loadBIP(studentName) {
    if (studentName) {
      document.getElementById('bip-builder')?.classList.remove('hidden');
    }
  }

  static completeFBA() {
    UIManager.showNotification('FBA가 완료되었습니다. BIP 탭으로 이동합니다.', 'success');
    setTimeout(() => this.showTab('bip'), 1000);
  }

  static saveBIP() {
    UIManager.showNotification('BIP가 저장되고 실행이 시작되었습니다.', 'success');
  }

  static exportBIP() {
    UIManager.showNotification('BIP가 PDF로 다운로드됩니다.', 'success');
  }

  static addStudent() {
    UIManager.showNotification('학생 추가 기능이 곧 제공됩니다.', 'info');
  }

  static viewStudentDetail(studentName) {
    const student = SWPBS.data.odrEvents.filter(e => e.student === studentName);
    const stats = AnalyticsEngine.getStudentAnalysis(studentName, SWPBS.data.odrEvents);

    UIManager.showModal(`${studentName} - 상세 정보`, `
      <div class="grid grid-2">
        <div>
          <h4>기본 정보</h4>
          <table class="data-table" style="margin-top: 0.5rem;">
            <tr><th>총 ODR</th><td>${stats.totalIncidents}회</td></tr>
            <tr><th>평균 강도</th><td>${stats.stats.averageIntensity}</td></tr>
            <tr><th>지원 단계</th><td>Tier 3</td></tr>
          </table>
        </div>

        <div>
          <h4>상위 행동</h4>
          <ul class="feature-list" style="margin-top: 0.5rem;">
            ${stats.topBehaviors.map(b => `<li>${b.label} (${b.count}회)</li>`).join('')}
          </ul>
        </div>
      </div>

      <h4 style="margin-top: 1.5rem;">행동 추세</h4>
      <div style="height: 200px; margin-top: 1rem;">
        <canvas id="student-detail-chart"></canvas>
      </div>
    `, [
      { label: '닫기', class: 'btn-primary', onClick: 'UIManager.closeModal("customModal")' }
    ]);

    setTimeout(() => {
      ChartManager.createODRTrendChart('student-detail-chart', student);
    }, 100);
  }

  static loadStudentProgress(studentName) {
    if (studentName) {
      this.initializeCharts();
      UIManager.showNotification(`${studentName}의 진척도를 불러왔습니다.`, 'success');
    }
  }

  static attachEventListeners() {
    // Event listeners are attached via onclick in HTML
    console.log('✅ Tier3Module event listeners attached');
  }
}

// Make module globally accessible
window.Tier3Module = Tier3Module;
