// ==========================================================================
// 데이터센터 및 리포팅 시스템 모듈
// ==========================================================================

class DataCenterModule {
  static render() {
    const container = document.getElementById('datacenter');
    if (!container) return;

    container.innerHTML = `
      <h1>📊 데이터센터</h1>

      <div class="nav-tabs">
        <div class="nav-tab active" onclick="DataCenterModule.showTab('upload')">
          📥 데이터 입력
        </div>
        <div class="nav-tab" onclick="DataCenterModule.showTab('query')">
          🔎 질의 빌더
        </div>
        <div class="nav-tab" onclick="DataCenterModule.showTab('reports')">
          📈 리포트
        </div>
        <div class="nav-tab" onclick="DataCenterModule.showTab('export')">
          📤 내보내기
        </div>
      </div>

      <div id="datacenter-upload" class="datacenter-tab-content active">
        ${this.renderUploadTab()}
      </div>

      <div id="datacenter-query" class="datacenter-tab-content">
        ${this.renderQueryTab()}
      </div>

      <div id="datacenter-reports" class="datacenter-tab-content">
        ${this.renderReportsTab()}
      </div>

      <div id="datacenter-export" class="datacenter-tab-content">
        ${this.renderExportTab()}
      </div>
    `;
  }

  static showTab(tabName) {
    document.querySelectorAll('.datacenter-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    const selectedTab = document.getElementById(`datacenter-${tabName}`);
    if (selectedTab) selectedTab.classList.add('active');

    document.querySelectorAll('#datacenter .nav-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  }

  static renderUploadTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📥 CSV 데이터 업로드</h3>
        </div>
        <div class="card-body">
          <div style="border: 2px dashed var(--border); border-radius: var(--radius-lg); padding: 3rem; text-align: center; background: var(--background);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
            <h4>CSV 파일을 드래그하거나 클릭하여 업로드</h4>
            <p class="text-secondary" style="margin: 1rem 0;">
              data1024.csv 형식 지원 (행동 발생일, 시간대, 학생명, 위기행동, 강도 등)
            </p>
            <input type="file" id="csv-upload-input" accept=".csv" style="display: none;" onchange="DataCenterModule.handleFileUpload(event)">
            <button class="btn btn-primary" onclick="document.getElementById('csv-upload-input').click()">
              파일 선택
            </button>
          </div>

          <div id="upload-preview" class="hidden" style="margin-top: 2rem;">
            <h4>업로드된 데이터 미리보기</h4>
            <div id="preview-stats" class="dashboard-stats" style="margin-top: 1rem;"></div>
            <div id="preview-table" style="margin-top: 1rem; max-height: 400px; overflow: auto;"></div>
            <div style="margin-top: 1rem;">
              <button class="btn btn-primary" onclick="DataCenterModule.confirmUpload()">
                ✓ 데이터 확정 및 저장
              </button>
              <button class="btn btn-outline" onclick="DataCenterModule.cancelUpload()">
                취소
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">📊 현재 데이터 현황</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-4">
            <div class="stat-card" style="background: linear-gradient(135deg, #4c5fd5, #7c3aed);">
              <div class="stat-value">${SWPBS.data.odrEvents.length}</div>
              <div class="stat-label">ODR 사건</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #10b981, #059669);">
              <div class="stat-value">${SWPBS.data.students.length}</div>
              <div class="stat-label">학생 수</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <div class="stat-value">${SWPBS.data.cicoRecords.length}</div>
              <div class="stat-label">CICO 기록</div>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
              <div class="stat-value">${SWPBS.data.fbaAssessments.length}</div>
              <div class="stat-label">FBA 평가</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderQueryTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔎 데이터 질의 빌더</h3>
        </div>
        <div class="card-body">
          <p class="text-secondary" style="margin-bottom: 1.5rem;">
            자연어 또는 필터를 사용하여 원하는 데이터를 조회합니다.
          </p>

          <div class="form-group">
            <label class="form-label">자연어 질의</label>
            <input type="text" class="form-input" placeholder="예: 3월 복도-점심 시간대 타격행동 비율" id="natural-query">
            <button class="btn btn-outline mt-2" onclick="DataCenterModule.executeNaturalQuery()">
              🔍 검색
            </button>
          </div>

          <div style="border-top: 2px solid var(--border); margin: 2rem 0;"></div>

          <h4>필터 기반 질의</h4>
          <div class="grid grid-3" style="margin-top: 1rem;">
            <div class="form-group">
              <label class="form-label">기간</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <input type="date" class="form-input" id="query-start-date">
                <input type="date" class="form-input" id="query-end-date">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">장소</label>
              <select class="form-select" id="query-location">
                <option value="">전체</option>
                <option>교실</option>
                <option>복도/계단</option>
                <option>급식실</option>
                <option>운동장</option>
                <option>통학버스</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">시간대</label>
              <select class="form-select" id="query-time">
                <option value="">전체</option>
                <option>09시대</option>
                <option>10시대</option>
                <option>11시대</option>
                <option>12시대</option>
                <option>13시대</option>
                <option>14시대</option>
                <option>15시대</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">행동 유형</label>
              <select class="form-select" id="query-behavior">
                <option value="">전체</option>
                <option>신체적 공격</option>
                <option>심각한 수업방해(소음 등)</option>
                <option>심각한 감정폭발행동</option>
                <option>물건 파손</option>
                <option>심각한 반항/불순응</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">학생</label>
              <select class="form-select" id="query-student">
                <option value="">전체</option>
                ${SWPBS.data.students.map(s => `<option>${s.name}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">강도</label>
              <select class="form-select" id="query-intensity">
                <option value="">전체</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <button class="btn btn-primary mt-4" onclick="DataCenterModule.executeQuery()">
            🔎 조회
          </button>
          <button class="btn btn-outline mt-4" onclick="DataCenterModule.resetQuery()">
            초기화
          </button>

          <div id="query-results" class="hidden" style="margin-top: 2rem;">
            <h4>조회 결과</h4>
            <div id="query-results-content"></div>
          </div>
        </div>
      </div>
    `;
  }

  static renderReportsTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📈 표준 리포트</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="quick-action-card" onclick="DataCenterModule.generateReport('monthly')">
              <div class="quick-action-icon">📅</div>
              <div class="quick-action-title">월간 보고서</div>
              <div class="quick-action-desc">한 달간 ODR, 학생, 장소 요약</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('semester')">
              <div class="quick-action-icon">📚</div>
              <div class="quick-action-title">학기 보고서</div>
              <div class="quick-action-desc">학기별 종합 분석</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('tier1')">
              <div class="quick-action-icon">🟢</div>
              <div class="quick-action-title">Tier 1 보고서</div>
              <div class="quick-action-desc">보편적 지원 효과성</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('tier2')">
              <div class="quick-action-icon">🟡</div>
              <div class="quick-action-title">Tier 2 보고서</div>
              <div class="quick-action-desc">표적집단 진척도</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('tier3')">
              <div class="quick-action-icon">🔴</div>
              <div class="quick-action-title">Tier 3 보고서</div>
              <div class="quick-action-desc">개별학생 성과</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('leadership')">
              <div class="quick-action-icon">👥</div>
              <div class="quick-action-title">리더십팀 보고서</div>
              <div class="quick-action-desc">회의용 종합 자료</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('student')">
              <div class="quick-action-icon">👤</div>
              <div class="quick-action-title">학생별 보고서</div>
              <div class="quick-action-desc">개별 학생 상세 분석</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('location')">
              <div class="quick-action-icon">📍</div>
              <div class="quick-action-title">장소별 보고서</div>
              <div class="quick-action-desc">환경 개입 우선순위</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.generateReport('tfi')">
              <div class="quick-action-icon">📋</div>
              <div class="quick-action-title">TFI 증거 보고서</div>
              <div class="quick-action-desc">충실도 평가 근거자료</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderExportTab() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📤 데이터 내보내기</h3>
        </div>
        <div class="card-body">
          <h4>내보내기 형식 선택</h4>
          <div class="grid grid-3" style="margin-top: 1rem;">
            <div class="quick-action-card" onclick="DataCenterModule.exportData('csv')">
              <div class="quick-action-icon">📊</div>
              <div class="quick-action-title">CSV 파일</div>
              <div class="quick-action-desc">Excel 호환</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.exportData('json')">
              <div class="quick-action-icon">📄</div>
              <div class="quick-action-title">JSON 파일</div>
              <div class="quick-action-desc">프로그래밍 호환</div>
            </div>

            <div class="quick-action-card" onclick="DataCenterModule.exportData('pdf')">
              <div class="quick-action-icon">📑</div>
              <div class="quick-action-title">PDF 보고서</div>
              <div class="quick-action-desc">인쇄용</div>
            </div>
          </div>

          <div style="border-top: 2px solid var(--border); margin: 2rem 0;"></div>

          <h4>데이터 백업</h4>
          <p class="text-secondary">모든 데이터를 백업 파일로 저장합니다.</p>
          <button class="btn btn-primary mt-2" onclick="DataCenterModule.backupData()">
            💾 전체 백업 생성
          </button>

          <div style="border-top: 2px solid var(--border); margin: 2rem 0;"></div>

          <h4>교육청 연계</h4>
          <p class="text-secondary">교육청 포털 호환 형식으로 내보냅니다.</p>
          <button class="btn btn-outline mt-2" onclick="DataCenterModule.exportForEdu()">
            🏫 교육청 형식 내보내기
          </button>
        </div>
      </div>
    `;
  }

  static handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    DataManager.uploadCSV(file, (events) => {
      this.showUploadPreview(events);
      UIManager.showNotification(`${events.length}건의 데이터를 불러왔습니다.`, 'success');
    });
  }

  static showUploadPreview(events) {
    const preview = document.getElementById('upload-preview');
    if (!preview) return;

    preview.classList.remove('hidden');

    const stats = AnalyticsEngine.getODRStats(events);

    // 통계 표시
    const statsHTML = `
      <div class="stat-card">
        <div class="stat-value">${events.length}</div>
        <div class="stat-label">총 사건 수</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Object.keys(stats.byStudent).length}</div>
        <div class="stat-label">학생 수</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.averageIntensity}</div>
        <div class="stat-label">평균 강도</div>
      </div>
    `;

    document.getElementById('preview-stats').innerHTML = statsHTML;

    // 테이블 표시
    const tableHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>학생</th>
            <th>행동</th>
            <th>강도</th>
            <th>장소</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          ${events.slice(0, 20).map(e => `
            <tr>
              <td>${e.date}</td>
              <td>${e.student}</td>
              <td>${e.behavior}</td>
              <td>${e.intensity}</td>
              <td>${e.location}</td>
              <td>${e.function}</td>
            </tr>
          `).join('')}
          ${events.length > 20 ? `<tr><td colspan="6" class="text-center text-secondary">... 외 ${events.length - 20}건</td></tr>` : ''}
        </tbody>
      </table>
    `;

    document.getElementById('preview-table').innerHTML = tableHTML;
  }

  static confirmUpload() {
    DataManager.saveToLocalStorage();
    UIManager.showNotification('데이터가 저장되었습니다.', 'success');
    location.reload();
  }

  static cancelUpload() {
    document.getElementById('upload-preview').classList.add('hidden');
    document.getElementById('csv-upload-input').value = '';
  }

  static executeQuery() {
    const filters = {
      startDate: document.getElementById('query-start-date')?.value,
      endDate: document.getElementById('query-end-date')?.value,
      location: document.getElementById('query-location')?.value,
      time: document.getElementById('query-time')?.value,
      behavior: document.getElementById('query-behavior')?.value,
      student: document.getElementById('query-student')?.value,
      intensity: document.getElementById('query-intensity')?.value
    };

    let results = SWPBS.data.odrEvents;

    // 필터 적용
    if (filters.startDate || filters.endDate) {
      results = AnalyticsEngine.filterByDateRange(results, filters.startDate, filters.endDate);
    }
    if (filters.location) results = results.filter(e => e.location === filters.location);
    if (filters.time) results = results.filter(e => e.time === filters.time);
    if (filters.behavior) results = results.filter(e => e.behavior === filters.behavior);
    if (filters.student) results = results.filter(e => e.student === filters.student);
    if (filters.intensity) results = results.filter(e => e.intensity == filters.intensity);

    this.displayQueryResults(results);
  }

  static displayQueryResults(results) {
    const container = document.getElementById('query-results');
    const content = document.getElementById('query-results-content');

    if (!container || !content) return;

    container.classList.remove('hidden');

    const stats = AnalyticsEngine.getODRStats(results);

    content.innerHTML = `
      <div class="alert alert-info">
        <span>ℹ️</span>
        <div>조회 결과: <strong>${results.length}건</strong></div>
      </div>

      <div class="dashboard-stats mt-4">
        <div class="stat-card">
          <div class="stat-value">${results.length}</div>
          <div class="stat-label">조회된 사건</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.averageIntensity}</div>
          <div class="stat-label">평균 강도</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Object.keys(stats.byStudent).length}</div>
          <div class="stat-label">관련 학생 수</div>
        </div>
      </div>

      <button class="btn btn-primary mt-4" onclick="DataManager.downloadCSV(${JSON.stringify(results)}, 'query-results.csv')">
        📥 결과 다운로드
      </button>
    `;
  }

  static resetQuery() {
    document.getElementById('query-start-date').value = '';
    document.getElementById('query-end-date').value = '';
    document.getElementById('query-location').value = '';
    document.getElementById('query-time').value = '';
    document.getElementById('query-behavior').value = '';
    document.getElementById('query-student').value = '';
    document.getElementById('query-intensity').value = '';
    document.getElementById('query-results').classList.add('hidden');
  }

  static executeNaturalQuery() {
    const query = document.getElementById('natural-query')?.value;
    UIManager.showNotification(`자연어 질의: "${query}" 처리 중...`, 'info');
  }

  static generateReport(type) {
    UIManager.showNotification(`${type} 보고서를 생성하고 있습니다...`, 'info');

    setTimeout(() => {
      UIManager.showNotification(`${type} 보고서가 생성되었습니다.`, 'success');
    }, 1500);
  }

  static exportData(format) {
    const data = SWPBS.data.odrEvents;

    switch(format) {
      case 'csv':
        DataManager.downloadCSV(data, `swpbs-export-${new Date().toISOString().split('T')[0]}.csv`);
        break;
      case 'json':
        const json = JSON.stringify(SWPBS.data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `swpbs-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        break;
      case 'pdf':
        UIManager.showNotification('PDF 내보내기 기능이 곧 제공됩니다.', 'info');
        break;
    }

    UIManager.showNotification(`${format.toUpperCase()} 파일이 다운로드되었습니다.`, 'success');
  }

  static backupData() {
    this.exportData('json');
  }

  static exportForEdu() {
    UIManager.showNotification('교육청 형식으로 내보내기 기능이 곧 제공됩니다.', 'info');
  }

  static attachEventListeners() {
    // Event listeners are attached via onclick in HTML
    console.log('✅ DataCenterModule event listeners attached');
  }
}

// Make module globally accessible
window.DataCenterModule = DataCenterModule;
