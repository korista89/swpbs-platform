// =====================================================
// SW-PBS 통합 플랫폼 - 핵심 JavaScript 엔진
// =====================================================

// 전역 상태 관리
const SWPBS = {
  // 데이터 저장소
  data: {
    students: [],
    odrEvents: [],
    praisePoints: [],
    cicoRecords: [],
    fbaAssessments: [],
    bipPlans: [],
    meetings: [],
    tfiScores: {},
    sasScores: {},
    schoolConfig: {}
  },

  // 현재 사용자 상태
  user: {
    role: 'admin',
    name: '관리자',
    permissions: []
  },

  // UI 상태
  ui: {
    currentModule: 'home',
    currentView: 'dashboard',
    modals: {},
    notifications: []
  },

  // 차트 인스턴스
  charts: {},

  // 설정
  config: {
    tier1Threshold: 0.85,
    tier2Threshold: 2,
    tier3Threshold: 4,
    academicYearStart: '2025-03-01',
    academicYearEnd: '2026-02-28'
  }
};

// ===== CSV 파서 =====
class CSVParser {
  static parse(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = this.parseCSVLine(lines[0]);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index].trim();
        });
        data.push(row);
      }
    }

    return data;
  }

  static parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  static toCSV(data, headers) {
    if (!data || data.length === 0) return '';

    const csvHeaders = headers || Object.keys(data[0]);
    const rows = [csvHeaders.join(',')];

    data.forEach(row => {
      const values = csvHeaders.map(header => {
        const value = row[header] || '';
        const stringValue = String(value);
        return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
      });
      rows.push(values.join(','));
    });

    return rows.join('\n');
  }
}

// ===== 데이터 관리자 =====
class DataManager {
  // CSV 업로드
  static uploadCSV(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = CSVParser.parse(e.target.result);
      const odrEvents = this.convertToODREvents(csvData);
      SWPBS.data.odrEvents = odrEvents;

      // 학생 목록 추출
      this.extractStudents(odrEvents);

      // 로컬 저장소에 저장
      this.saveToLocalStorage();

      if (callback) callback(odrEvents);
    };
    reader.readAsText(file);
  }

  // CSV 데이터를 ODR 이벤트로 변환
  static convertToODREvents(csvData) {
    return csvData.map((row, index) => ({
      id: `ODR-${Date.now()}-${index}`,
      date: row['행동 발생일'] || row['날짜'],
      time: row['발생 시간대'],
      weekday: row['발생 요일'],
      student: row['학생명'],
      behavior: row['발생한 위기행동'],
      intensity: parseInt(row['강도or5점 척도 - 선택']) || 0,
      function: row['추정되는 기능(동기)'],
      location: row['행동 발생 장소 (특별실은 기타에 특별실 이름 입력)'],
      tier: row['현재지원단계'],
      teacher: row['입력 교사명'],
      duration: row['빈도or지속시간 - 선택'],
      notes: row['특이사항(기타)'],
      reportRequired: row['보고서 작성 사유 해당 여부 확인(중복 체크 가능)'],
      crisisReport: row['위기행동 보고'],
      separationReport: row['분리지도 보고'],
      cumulativeCount: parseInt(row['누적\n보고\n빈도']) || 0,
      antecedent: row['주요선행사건'],
      consequence: row['주요후속결과'],
      timestamp: row['타임스탬프'],
      week: row['발생 주차']
    }));
  }

  // 학생 목록 추출
  static extractStudents(odrEvents) {
    const studentMap = new Map();

    odrEvents.forEach(event => {
      if (!studentMap.has(event.student)) {
        studentMap.set(event.student, {
          id: `STU-${Date.now()}-${studentMap.size}`,
          name: event.student,
          tier: event.tier || 'Tier 1',
          odrCount: 0,
          praiseCount: 0,
          enrolledPrograms: [],
          hasFBA: false,
          hasBIP: false,
          lastIncident: null
        });
      }

      const student = studentMap.get(event.student);
      student.odrCount++;
      if (!student.lastIncident || new Date(event.date) > new Date(student.lastIncident)) {
        student.lastIncident = event.date;
      }
    });

    SWPBS.data.students = Array.from(studentMap.values());
  }

  // 로컬 저장소에 저장
  static saveToLocalStorage() {
    try {
      localStorage.setItem('swpbs_data', JSON.stringify(SWPBS.data));
      localStorage.setItem('swpbs_config', JSON.stringify(SWPBS.config));
    } catch (e) {
      console.error('로컬 저장소 저장 실패:', e);
    }
  }

  // 로컬 저장소에서 불러오기
  static loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('swpbs_data');
      const config = localStorage.getItem('swpbs_config');

      if (data) SWPBS.data = JSON.parse(data);
      if (config) SWPBS.config = JSON.parse(config);
    } catch (e) {
      console.error('로컬 저장소 불러오기 실패:', e);
    }
  }

  // CSV 다운로드
  static downloadCSV(data, filename) {
    const csv = CSVParser.toCSV(data);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'export.csv';
    link.click();
  }
}

// ===== 분석 엔진 =====
class AnalyticsEngine {
  // ODR 통계
  static getODRStats(events, startDate, endDate) {
    const filtered = this.filterByDateRange(events, startDate, endDate);

    return {
      total: filtered.length,
      byLocation: this.groupBy(filtered, 'location'),
      byTime: this.groupBy(filtered, 'time'),
      byWeekday: this.groupBy(filtered, 'weekday'),
      byBehavior: this.groupBy(filtered, 'behavior'),
      byFunction: this.groupBy(filtered, 'function'),
      byIntensity: this.groupBy(filtered, 'intensity'),
      byStudent: this.groupBy(filtered, 'student'),
      byTier: this.groupBy(filtered, 'tier'),
      byWeek: this.groupBy(filtered, 'week'),
      averageIntensity: this.calculateAverage(filtered, 'intensity'),
      trend: this.calculateTrend(filtered)
    };
  }

  // 날짜 범위 필터
  static filterByDateRange(events, startDate, endDate) {
    if (!startDate && !endDate) return events;

    return events.filter(event => {
      const eventDate = this.parseDate(event.date);
      const start = startDate ? this.parseDate(startDate) : new Date(0);
      const end = endDate ? this.parseDate(endDate) : new Date();
      return eventDate >= start && eventDate <= end;
    });
  }

  // 날짜 파싱
  static parseDate(dateStr) {
    if (!dateStr) return new Date();
    // "2025. 3. 4" 형식 처리
    const parts = dateStr.replace(/\s/g, '').split('.');
    if (parts.length >= 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date(dateStr);
  }

  // 그룹화
  static groupBy(array, key) {
    const result = {};
    array.forEach(item => {
      const value = item[key] || '미분류';
      result[value] = (result[value] || 0) + 1;
    });
    return result;
  }

  // 평균 계산
  static calculateAverage(array, key) {
    if (array.length === 0) return 0;
    const sum = array.reduce((acc, item) => acc + (parseFloat(item[key]) || 0), 0);
    return (sum / array.length).toFixed(2);
  }

  // 추세 계산
  static calculateTrend(events) {
    if (events.length < 2) return 'stable';

    const sorted = events.sort((a, b) =>
      this.parseDate(a.date) - this.parseDate(b.date)
    );

    const midPoint = Math.floor(sorted.length / 2);
    const firstHalf = sorted.slice(0, midPoint).length;
    const secondHalf = sorted.slice(midPoint).length;

    if (secondHalf > firstHalf * 1.2) return 'increasing';
    if (secondHalf < firstHalf * 0.8) return 'decreasing';
    return 'stable';
  }

  // 학생별 분석
  static getStudentAnalysis(studentName, events) {
    const studentEvents = events.filter(e => e.student === studentName);

    return {
      totalIncidents: studentEvents.length,
      stats: this.getODRStats(studentEvents),
      topBehaviors: this.getTopN(this.groupBy(studentEvents, 'behavior'), 3),
      topFunctions: this.getTopN(this.groupBy(studentEvents, 'function'), 3),
      topLocations: this.getTopN(this.groupBy(studentEvents, 'location'), 3),
      timeline: this.createTimeline(studentEvents)
    };
  }

  // 상위 N개 추출
  static getTopN(obj, n) {
    return Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([key, value]) => ({ label: key, count: value }));
  }

  // 타임라인 생성
  static createTimeline(events) {
    const byDate = {};
    events.forEach(event => {
      const date = event.date;
      byDate[date] = (byDate[date] || 0) + 1;
    });

    return Object.entries(byDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => this.parseDate(a.date) - this.parseDate(b.date));
  }
}

// ===== 차트 관리자 =====
class ChartManager {
  static createChart(canvasId, type, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    // 기존 차트 제거
    if (SWPBS.charts[canvasId]) {
      SWPBS.charts[canvasId].destroy();
    }

    // 새 차트 생성
    SWPBS.charts[canvasId] = new Chart(ctx, {
      type: type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: options.showLegend !== false,
            position: 'top'
          },
          datalabels: {
            display: options.showDataLabels || false,
            color: '#fff',
            font: { weight: 'bold' }
          }
        },
        ...options
      }
    });

    return SWPBS.charts[canvasId];
  }

  // ODR 추세 차트
  static createODRTrendChart(canvasId, events) {
    const timeline = AnalyticsEngine.createTimeline(events);

    return this.createChart(canvasId, 'line', {
      labels: timeline.map(t => t.date),
      datasets: [{
        label: 'ODR 발생 건수',
        data: timeline.map(t => t.count),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }]
    }, {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    });
  }

  // 행동 유형별 차트
  static createBehaviorChart(canvasId, stats) {
    const data = Object.entries(stats).slice(0, 10);

    return this.createChart(canvasId, 'bar', {
      labels: data.map(d => d[0]),
      datasets: [{
        label: '발생 건수',
        data: data.map(d => d[1]),
        backgroundColor: [
          '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
          '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
        ]
      }]
    }, {
      indexAxis: 'y',
      showDataLabels: true
    });
  }

  // 위치별 차트
  static createLocationChart(canvasId, stats) {
    const data = Object.entries(stats);

    return this.createChart(canvasId, 'doughnut', {
      labels: data.map(d => d[0]),
      datasets: [{
        data: data.map(d => d[1]),
        backgroundColor: [
          '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
          '#ec4899', '#06b6d4', '#84cc16'
        ]
      }]
    }, {
      showDataLabels: true
    });
  }

  // 시간대별 차트
  static createTimeChart(canvasId, stats) {
    const timeOrder = ['09시대', '10시대', '11시대', '12시대', '13시대', '14시대', '15시대'];
    const data = timeOrder.map(time => ({ time, count: stats[time] || 0 }));

    return this.createChart(canvasId, 'bar', {
      labels: data.map(d => d.time),
      datasets: [{
        label: '발생 건수',
        data: data.map(d => d.count),
        backgroundColor: '#3b82f6'
      }]
    });
  }

  // 강도별 차트
  static createIntensityChart(canvasId, stats) {
    const levels = [1, 2, 3, 4, 5];
    const data = levels.map(level => stats[level] || 0);

    return this.createChart(canvasId, 'bar', {
      labels: levels.map(l => `강도 ${l}`),
      datasets: [{
        label: '발생 건수',
        data: data,
        backgroundColor: [
          '#10b981', '#84cc16', '#f59e0b', '#f97316', '#ef4444'
        ]
      }]
    });
  }

  // 기능별 차트
  static createFunctionChart(canvasId, stats) {
    const data = Object.entries(stats);

    return this.createChart(canvasId, 'pie', {
      labels: data.map(d => d[0]),
      datasets: [{
        data: data.map(d => d[1]),
        backgroundColor: [
          '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
          '#ec4899', '#06b6d4'
        ]
      }]
    }, {
      showDataLabels: true
    });
  }

  // 주간 추세 차트
  static createWeeklyTrendChart(canvasId, stats) {
    const weeks = Object.keys(stats).sort();

    return this.createChart(canvasId, 'line', {
      labels: weeks,
      datasets: [{
        label: '주간 발생 건수',
        data: weeks.map(w => stats[w]),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    });
  }
}

// ===== UI 관리자 =====
class UIManager {
  // 모듈 전환 - index.html의 showModule 함수가 실제 구현을 담당
  static showModule(moduleName) {
    console.log('UIManager.showModule is deprecated - use global showModule() instead');
    if (typeof window.showModule === 'function') {
      window.showModule(moduleName);
    }
  }

  // 대시보드 업데이트
  static updateDashboard() {
    const events = SWPBS.data.odrEvents;
    const stats = AnalyticsEngine.getODRStats(events);

    // 통계 카드 업데이트
    const updateStat = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.textContent = value;
    };

    updateStat('.stat-card:nth-child(1) .stat-value', events.length);
    updateStat('.stat-card:nth-child(3) .stat-value',
      SWPBS.data.students.filter(s => s.tier === 'Tier 2').length);
    updateStat('.stat-card:nth-child(4) .stat-value',
      SWPBS.data.students.filter(s => s.tier === 'Tier 3').length);
  }

  // 역할 선택
  static selectRole(role) {
    SWPBS.user.role = role;

    // 모든 역할 버튼에서 active 제거
    document.querySelectorAll('.role-button').forEach(btn => {
      btn.classList.remove('active');
    });

    // 선택된 역할 버튼에 active 추가
    const selectedBtn = document.querySelector(`[data-role="${role}"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('active');
    }

    // 역할별 UI 조정
    this.adjustUIForRole(role);
  }

  // 역할별 UI 조정
  static adjustUIForRole(role) {
    // 역할에 따라 메뉴 항목 표시/숨김 등
    console.log('역할 변경:', role);
  }

  // 알림 표시
  static showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
      <span>${this.getIconForType(type)}</span>
      <div>${message}</div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  static getIconForType(type) {
    const icons = {
      success: '✓',
      warning: '⚠️',
      danger: '⚡',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  // 모달 표시
  static showModal(title, content, buttons = []) {
    const modalHTML = `
      <div class="modal-overlay active" id="customModal">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="UIManager.closeModal('customModal')">×</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          <div class="modal-footer">
            ${buttons.map(btn =>
              `<button class="btn ${btn.class || 'btn-primary'}" onclick="${btn.onClick}">${btn.label}</button>`
            ).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  static closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
  }
}

// ===== 전역 함수 =====
function showModule(moduleName) {
  UIManager.showModule(moduleName);
}

function selectRole(role) {
  UIManager.selectRole(role);
}

function recordODR() {
  UIManager.showModal('ODR 기록', `
    <form id="odrForm">
      <div class="form-group">
        <label class="form-label">학생</label>
        <select class="form-select" name="student" required>
          ${SWPBS.data.students.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">행동</label>
        <input type="text" class="form-input" name="behavior" required>
      </div>
      <div class="form-group">
        <label class="form-label">강도 (1-5)</label>
        <input type="number" class="form-input" name="intensity" min="1" max="5" required>
      </div>
      <div class="form-group">
        <label class="form-label">장소</label>
        <input type="text" class="form-input" name="location" required>
      </div>
    </form>
  `, [
    { label: '취소', class: 'btn-secondary', onClick: 'UIManager.closeModal("customModal")' },
    { label: '저장', class: 'btn-primary', onClick: 'submitODR()' }
  ]);
}

function recordPraise() {
  UIManager.showNotification('칭찬 포인트 기능이 곧 제공됩니다.', 'info');
}

function generateReport() {
  UIManager.showModal('리포트 생성', '<p>리포트를 생성하시겠습니까?</p>', [
    { label: '취소', class: 'btn-secondary', onClick: 'UIManager.closeModal("customModal")' },
    { label: '생성', class: 'btn-primary', onClick: 'createReport()' }
  ]);
}

// ===== 페이지 로드 시 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  // 로컬 저장소에서 데이터 불러오기
  DataManager.loadFromLocalStorage();

  // 대시보드 업데이트
  UIManager.updateDashboard();

  // Chart.js 플러그인 등록
  if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }

  console.log('SW-PBS 플랫폼이 초기화되었습니다.');
});

// ===== 전역 객체로 노출 =====
window.SWPBS = SWPBS;
window.CSVParser = CSVParser;
window.DataManager = DataManager;
window.AnalyticsEngine = AnalyticsEngine;
window.ChartManager = ChartManager;
window.UIManager = UIManager;
