// =================================================================
// 리더십 회의 및 충실도 평가 모듈
// =================================================================

class MeetingsModule {
  static render() {
    const container = document.getElementById('meetings');
    if (!container) return;

    container.innerHTML = `
      <h1>👥 리더십 & 충실도 평가</h1>

      <div class="nav-tabs">
        <div class="nav-tab active" onclick="MeetingsModule.showTab('meetings')">
          📅 월간 회의
        </div>
        <div class="nav-tab" onclick="MeetingsModule.showTab('tfi')">
          📋 TFI 평가
        </div>
        <div class="nav-tab" onclick="MeetingsModule.showTab('sas')">
          ✅ SAS 자가평가
        </div>
        <div class="nav-tab" onclick="MeetingsModule.showTab('actions')">
          🎯 액션 아이템
        </div>
      </div>

      <div id="meetings-meetings" class="meetings-tab-content active">
        ${this.renderMeetingsTab()}
      </div>

      <div id="meetings-tfi" class="meetings-tab-content">
        ${this.renderTFITab()}
      </div>

      <div id="meetings-sas" class="meetings-tab-content">
        ${this.renderSASTab()}
      </div>

      <div id="meetings-actions" class="meetings-tab-content">
        ${this.renderActionsTab()}
      </div>
    `;

    this.initializeCharts();
  }

  static showTab(tabName) {
    document.querySelectorAll('.meetings-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    const selectedTab = document.getElementById(`meetings-${tabName}`);
    if (selectedTab) selectedTab.classList.add('active');

    document.querySelectorAll('#meetings .nav-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (tabName === 'tfi' || tabName === 'sas') {
      this.initializeCharts();
    }
  }

  static renderMeetingsTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📅 월간 리더십팀 회의</h3>
          <button class="btn btn-primary" onclick="MeetingsModule.generateAgenda()">
            🗂️ 안건 자동생성
          </button>
        </div>
        <div class="card-body">
          <div class="alert alert-info">
            <span>ℹ️</span>
            <div>
              다음 회의: <strong>2025년 4월 5일 (금) 15:00</strong><br>
              장소: 교무실 회의실
            </div>
          </div>

          <h4 style="margin-top: 1.5rem;">회의 안건 (자동생성)</h4>
          <div class="card" style="margin-top: 1rem; background: #f9fafb;">
            <div class="card-body">
              <ol style="margin-left: 1.5rem; line-height: 1.8;">
                <li><strong>지난 회의 액션 아이템 검토</strong> (10분)</li>
                <li><strong>월간 데이터 리뷰</strong> (15분)
                  <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>ODR 현황: 총 142건 (전월 대비 12% 감소)</li>
                    <li>위치별 분석: 복도 3층 증가 주의</li>
                    <li>시간대별 분석: 점심시간 집중</li>
                  </ul>
                </li>
                <li><strong>Tier 2 프로그램 현황</strong> (10분)
                  <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>CICO: 18명 참여, 75% 목표달성률</li>
                    <li>재평가 대상: 3명</li>
                    <li>Tier 3 승급 검토: 2명</li>
                  </ul>
                </li>
                <li><strong>Tier 3 학생 지원 검토</strong> (10분)
                  <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>FBA 진행 중: 6명</li>
                    <li>BIP 실행 중: 5명</li>
                    <li>위기행동 보고서: 3건</li>
                  </ul>
                </li>
                <li><strong>TFI/SAS 결과 및 개선과제</strong> (10분)
                  <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>TFI 점수: 85% (목표: 80% 이상)</li>
                    <li>미충족 항목: 가정 연계 강화 필요</li>
                  </ul>
                </li>
                <li><strong>신규 안건 및 논의사항</strong> (10분)</li>
                <li><strong>다음 회의까지 액션 아이템 배정</strong> (5분)</li>
              </ol>
            </div>
          </div>

          <div style="margin-top: 2rem;">
            <button class="btn btn-primary" onclick="MeetingsModule.saveMeeting()">
              💾 회의록 저장
            </button>
            <button class="btn btn-outline" onclick="MeetingsModule.exportAgenda()">
              📄 안건 PDF 출력
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h4 class="card-title">📜 지난 회의록</h4>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>참석자</th>
                <th>주요 결정사항</th>
                <th>액션 아이템</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-03-08</td>
                <td>5명</td>
                <td>복도 모니터링 강화, CICO 확대</td>
                <td>5개 (4개 완료)</td>
                <td><button class="btn btn-sm btn-outline">보기</button></td>
              </tr>
              <tr>
                <td>2025-02-07</td>
                <td>6명</td>
                <td>Tier 2 프로그램 시작, TFI 준비</td>
                <td>7개 (완료)</td>
                <td><button class="btn btn-sm btn-outline">보기</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static renderTFITab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📋 TFI (Tiered Fidelity Inventory) 평가</h3>
          <div>
            <select class="form-select" style="width: auto; display: inline-block;">
              <option>TFI 3.0 (전체)</option>
              <option>TFI 2.1 (Tier 1&2)</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="dashboard-stats">
            <div class="stat-card" style="background: linear-gradient(135deg, #10b981, #059669);">
              <div class="stat-value">85%</div>
              <div class="stat-label">전체 충실도</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
              <div class="stat-value">90%</div>
              <div class="stat-label">Tier 1</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <div class="stat-value">80%</div>
              <div class="stat-label">Tier 2</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
              <div class="stat-value">75%</div>
              <div class="stat-label">Tier 3</div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h4 class="card-title">Tier별 충실도 점수</h4>
            </div>
            <div class="card-body">
              <div style="height: 300px;">
                <canvas id="tfi-scores-chart"></canvas>
              </div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h4 class="card-title">항목별 평가</h4>
            </div>
            <div class="card-body">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>평가</th>
                    <th>증거 자료</th>
                    <th>개선 과제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.1 팀 구성</td>
                    <td><span class="tier-badge tier-badge-1">충족</span></td>
                    <td>리더십팀 명단, 회의록</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>1.2 기대행동 정의</td>
                    <td><span class="tier-badge tier-badge-1">충족</span></td>
                    <td>행동 매트릭스, 포스터</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>1.3 기대행동 교육</td>
                    <td><span class="tier-badge tier-badge-1">충족</span></td>
                    <td>수업 계획안, 교육 영상</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>1.4 강화 시스템</td>
                    <td><span class="tier-badge tier-badge-1">충족</span></td>
                    <td>포인트 기록, 보상 목록</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>1.5 문제행동 대응</td>
                    <td><span class="tier-badge tier-badge-2">부분충족</span></td>
                    <td>ODR 정의서</td>
                    <td>일관성 있는 절차 문서화</td>
                  </tr>
                  <tr>
                    <td>1.6 데이터 활용</td>
                    <td><span class="tier-badge tier-badge-1">충족</span></td>
                    <td>월간 리포트, 회의 안건</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>1.7 가정 연계</td>
                    <td><span class="tier-badge tier-badge-3">미충족</span></td>
                    <td>-</td>
                    <td>가정 통신 시스템 구축</td>
                  </tr>
                  <tr>
                    <td>2.1 Tier 2 프로그램</td>
                    <td><span class="tier-badge tier-badge-1">충족</span></td>
                    <td>CICO 매뉴얼, 운영 기록</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>3.1 FBA/BIP 절차</td>
                    <td><span class="tier-badge tier-badge-2">부분충족</span></td>
                    <td>FBA 양식, BIP 샘플</td>
                    <td>전문가 슈퍼비전 체계화</td>
                  </tr>
                </tbody>
              </table>

              <div class="alert alert-warning mt-4">
                <span>⚠️</span>
                <div>
                  <strong>개선 우선순위:</strong>
                  <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>가정 연계 시스템 구축 (뉴스레터, 앱 연동)</li>
                    <li>문제행동 대응 절차 표준화</li>
                    <li>Tier 3 전문가 슈퍼비전 정례화</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderSASTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">✅ SAS (Self-Assessment Survey) 자가평가</h3>
          <button class="btn btn-primary" onclick="MeetingsModule.startSAS()">
            📝 SAS 실시하기
          </button>
        </div>
        <div class="card-body">
          <p class="text-secondary">
            연례 자가평가 도구로 학교 PBS 운영 상태를 종합적으로 점검합니다.
          </p>

          <div class="card mt-4">
            <div class="card-header">
              <h4 class="card-title">최근 평가 결과 (2025년 3월)</h4>
            </div>
            <div class="card-body">
              <div style="height: 300px;">
                <canvas id="sas-scores-chart"></canvas>
              </div>

              <table class="data-table" style="margin-top: 2rem;">
                <thead>
                  <tr>
                    <th>영역</th>
                    <th>점수</th>
                    <th>평가</th>
                    <th>개선과제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>기대행동 체계</td>
                    <td>90%</td>
                    <td><span class="tier-badge tier-badge-1">우수</span></td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>데이터 기반 의사결정</td>
                    <td>85%</td>
                    <td><span class="tier-badge tier-badge-1">우수</span></td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>팀 운영</td>
                    <td>80%</td>
                    <td><span class="tier-badge tier-badge-2">양호</span></td>
                    <td>회의 참석률 향상</td>
                  </tr>
                  <tr>
                    <td>지속가능성</td>
                    <td>75%</td>
                    <td><span class="tier-badge tier-badge-2">양호</span></td>
                    <td>예산 확보, 신규 교사 연수</td>
                  </tr>
                  <tr>
                    <td>가정 및 지역사회 연계</td>
                    <td>65%</td>
                    <td><span class="tier-badge tier-badge-3">개선필요</span></td>
                    <td>학부모 교육 프로그램</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderActionsTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎯 액션 아이템 관리</h3>
          <button class="btn btn-primary" onclick="MeetingsModule.addAction()">
            + 액션 아이템 추가
          </button>
        </div>
        <div class="card-body">
          <div class="dashboard-stats">
            <div class="stat-card" style="background: linear-gradient(135deg, #10b981, #059669);">
              <div class="stat-value">12</div>
              <div class="stat-label">완료</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <div class="stat-value">5</div>
              <div class="stat-label">진행중</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
              <div class="stat-value">2</div>
              <div class="stat-label">지연</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #94a3b8, #64748b);">
              <div class="stat-value">3</div>
              <div class="stat-label">예정</div>
            </div>
          </div>

          <table class="data-table" style="margin-top: 2rem;">
            <thead>
              <tr>
                <th>액션 아이템</th>
                <th>담당자</th>
                <th>기한</th>
                <th>상태</th>
                <th>진행률</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>복도 3층 모니터링 강화</td>
                <td>김O철</td>
                <td>2025-04-05</td>
                <td><span class="tier-badge tier-badge-2">진행중</span></td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 60%"></div>
                  </div>
                  <span class="text-sm">60%</span>
                </td>
                <td><button class="btn btn-sm btn-outline">상세</button></td>
              </tr>
              <tr>
                <td>가정 통신문 템플릿 작성</td>
                <td>이O영</td>
                <td>2025-03-30</td>
                <td><span class="tier-badge tier-badge-3">지연</span></td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 40%"></div>
                  </div>
                  <span class="text-sm">40%</span>
                </td>
                <td><button class="btn btn-sm btn-outline">상세</button></td>
              </tr>
              <tr>
                <td>CICO 확대 운영 계획</td>
                <td>박O수</td>
                <td>2025-04-15</td>
                <td><span class="tier-badge tier-badge-2">진행중</span></td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 75%"></div>
                  </div>
                  <span class="text-sm">75%</span>
                </td>
                <td><button class="btn btn-sm btn-outline">상세</button></td>
              </tr>
              <tr>
                <td>TFI 증거자료 정리</td>
                <td>최O진</td>
                <td>2025-04-20</td>
                <td><span class="tier-badge tier-badge-1">완료</span></td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                  </div>
                  <span class="text-sm">100%</span>
                </td>
                <td><button class="btn btn-sm btn-outline">상세</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static initializeCharts() {
    // TFI 점수 차트
    if (document.getElementById('tfi-scores-chart')) {
      ChartManager.createChart('tfi-scores-chart', 'radar', {
        labels: ['팀 구성', '기대행동', '교육', '강화', '대응', '데이터', '가정연계', 'Tier 2', 'Tier 3'],
        datasets: [{
          label: '현재 점수',
          data: [100, 100, 100, 100, 67, 100, 0, 100, 67],
          borderColor: '#4c5fd5',
          backgroundColor: 'rgba(76, 95, 213, 0.2)'
        }, {
          label: '목표 (80%)',
          data: Array(9).fill(80),
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderDash: [5, 5]
        }]
      }, {
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      });
    }

    // SAS 점수 차트
    if (document.getElementById('sas-scores-chart')) {
      ChartManager.createChart('sas-scores-chart', 'bar', {
        labels: ['기대행동', '데이터', '팀운영', '지속가능성', '가정연계'],
        datasets: [{
          label: '점수 (%)',
          data: [90, 85, 80, 75, 65],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f59e0b', '#ef4444']
        }]
      }, {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      });
    }
  }

  static generateAgenda() {
    UIManager.showNotification('회의 안건이 자동 생성되었습니다.', 'success');
  }

  static saveMeeting() {
    UIManager.showNotification('회의록이 저장되었습니다.', 'success');
  }

  static exportAgenda() {
    UIManager.showNotification('안건이 PDF로 다운로드됩니다.', 'success');
  }

  static startSAS() {
    UIManager.showNotification('SAS 평가를 시작합니다.', 'info');
  }

  static addAction() {
    UIManager.showNotification('액션 아이템 추가 기능이 곧 제공됩니다.', 'info');
  }

  static attachEventListeners() {
    // Event listeners are attached via onclick in HTML
    console.log('✅ MeetingsModule event listeners attached');
  }
}

// Make module globally accessible
window.MeetingsModule = MeetingsModule;
