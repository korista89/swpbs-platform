/**
 * Onboarding Wizard Module
 * 신규 학교를 위한 SW-PBS 온보딩 마법사
 * 단계별 학교 설정 및 초기 구성 가이드
 */

class OnboardingWizard {
  static currentStep = 1;
  static totalSteps = 7;
  static wizardData = {
    schoolInfo: {},
    teamMembers: [],
    baselineData: {},
    expectations: [],
    environments: [],
    initialGoals: {}
  };

  static initialize() {
    // Check if onboarding is already completed
    const onboardingComplete = localStorage.getItem('swpbs_onboarding_complete');
    if (!onboardingComplete) {
      // Show onboarding wizard on first visit
      setTimeout(() => {
        this.show();
      }, 1000);
    }
  }

  static show() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'onboarding-modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
        <div id="onboarding-wizard-content">
          ${this.renderStep(this.currentStep)}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  static hide() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) modal.remove();
  }

  static renderStep(step) {
    const steps = {
      1: this.renderStep1_Welcome,
      2: this.renderStep2_SchoolInfo,
      3: this.renderStep3_Team,
      4: this.renderStep4_Baseline,
      5: this.renderStep5_Expectations,
      6: this.renderStep6_Goals,
      7: this.renderStep7_Summary
    };

    return `
      <div class="wizard-container">
        ${this.renderProgressBar()}
        ${steps[step].call(this)}
        ${this.renderNavButtons()}
      </div>
    `;
  }

  static renderProgressBar() {
    let stepsHTML = '';
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepClass = i === this.currentStep ? 'active' : (i < this.currentStep ? 'completed' : '');
      stepsHTML += `
        <div class="wizard-step ${stepClass}">
          <div class="wizard-step-circle">${i}</div>
          <div class="wizard-step-label">${this.getStepLabel(i)}</div>
        </div>
      `;
    }

    return `
      <div class="wizard-steps">
        ${stepsHTML}
      </div>
    `;
  }

  static getStepLabel(step) {
    const labels = {
      1: '환영합니다',
      2: '학교 정보',
      3: '팀 구성',
      4: '기준선 데이터',
      5: '기대행동',
      6: '목표 설정',
      7: '완료'
    };
    return labels[step];
  }

  static renderStep1_Welcome() {
    return `
      <div style="text-align: center; padding: var(--space-8) 0;">
        <div style="font-size: 4rem; margin-bottom: var(--space-4);">🎯</div>
        <h1>SW-PBS 통합 플랫폼에 오신 것을 환영합니다!</h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); margin: var(--space-4) 0;">
          학교 차원 긍정적 행동지원 시스템 구축을 시작합니다
        </p>

        <div class="card mt-5" style="text-align: left;">
          <div class="card-body">
            <h3>이 마법사는 다음을 도와드립니다:</h3>
            <ul class="feature-list" style="font-size: 1.1rem;">
              <li><strong>학교 정보 설정:</strong> 기본 정보 및 연락처 입력</li>
              <li><strong>리더십 팀 구성:</strong> 팀원 역할 및 책임 정의</li>
              <li><strong>기준선 데이터 수집:</strong> 현재 행동 데이터 평가</li>
              <li><strong>기대행동 정의:</strong> 학교 전체 행동 매트릭스 구축</li>
              <li><strong>목표 설정:</strong> SMART 목표 및 실행 계획 수립</li>
            </ul>

            <div class="alert alert-info mt-4">
              <span>💡</span>
              <div>
                <strong>예상 소요 시간:</strong> 약 15-20분<br>
                언제든지 저장하고 나중에 다시 시작할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderStep2_SchoolInfo() {
    const schoolInfo = this.wizardData.schoolInfo;
    return `
      <div>
        <h2>📚 학교 정보 입력</h2>
        <p class="text-secondary">학교의 기본 정보를 입력해주세요</p>

        <div class="card mt-4">
          <div class="card-body">
            <form id="school-info-form">
              <div class="form-group">
                <label>학교명 *</label>
                <input type="text" class="form-input" id="school-name"
                  value="${schoolInfo.name || ''}" required>
              </div>

              <div class="grid grid-2">
                <div class="form-group">
                  <label>학교 유형 *</label>
                  <select class="form-select" id="school-type">
                    <option value="">선택하세요</option>
                    <option value="elementary" ${schoolInfo.type === 'elementary' ? 'selected' : ''}>초등학교</option>
                    <option value="middle" ${schoolInfo.type === 'middle' ? 'selected' : ''}>중학교</option>
                    <option value="high" ${schoolInfo.type === 'high' ? 'selected' : ''}>고등학교</option>
                    <option value="special" ${schoolInfo.type === 'special' ? 'selected' : ''}>특수학교</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>전체 학생 수 *</label>
                  <input type="number" class="form-input" id="student-count"
                    value="${schoolInfo.studentCount || ''}" required>
                </div>
              </div>

              <div class="grid grid-2">
                <div class="form-group">
                  <label>교직원 수</label>
                  <input type="number" class="form-input" id="staff-count"
                    value="${schoolInfo.staffCount || ''}">
                </div>

                <div class="form-group">
                  <label>SW-PBS 시작 연도 *</label>
                  <input type="number" class="form-input" id="start-year"
                    value="${schoolInfo.startYear || new Date().getFullYear()}"
                    min="2000" max="2030" required>
                </div>
              </div>

              <div class="form-group">
                <label>학교 주소</label>
                <input type="text" class="form-input" id="school-address"
                  value="${schoolInfo.address || ''}">
              </div>

              <div class="grid grid-2">
                <div class="form-group">
                  <label>총괄 담당자 이름 *</label>
                  <input type="text" class="form-input" id="coordinator-name"
                    value="${schoolInfo.coordinatorName || ''}" required>
                </div>

                <div class="form-group">
                  <label>총괄 담당자 이메일 *</label>
                  <input type="email" class="form-input" id="coordinator-email"
                    value="${schoolInfo.coordinatorEmail || ''}" required>
                </div>
              </div>

              <div class="form-group">
                <label>총괄 담당자 연락처</label>
                <input type="tel" class="form-input" id="coordinator-phone"
                  value="${schoolInfo.coordinatorPhone || ''}">
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  static renderStep3_Team() {
    const members = this.wizardData.teamMembers;
    let membersHTML = '';

    members.forEach((member, index) => {
      membersHTML += `
        <tr>
          <td>${member.name}</td>
          <td>${member.role}</td>
          <td>${member.responsibility}</td>
          <td>${member.email}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="OnboardingWizard.removeMember(${index})">삭제</button>
          </td>
        </tr>
      `;
    });

    return `
      <div>
        <h2>👥 리더십 팀 구성</h2>
        <p class="text-secondary">SW-PBS 리더십 팀원을 추가하세요 (권장: 5-8명)</p>

        <div class="card mt-4">
          <div class="card-header">
            <h4>팀원 추가</h4>
          </div>
          <div class="card-body">
            <form id="team-member-form" onsubmit="OnboardingWizard.addTeamMember(event); return false;">
              <div class="grid grid-2">
                <div class="form-group">
                  <label>이름 *</label>
                  <input type="text" class="form-input" id="member-name" required>
                </div>

                <div class="form-group">
                  <label>역할 *</label>
                  <select class="form-select" id="member-role" required>
                    <option value="">선택하세요</option>
                    <option value="leadership">리더십팀원</option>
                    <option value="tier2">표적집단 담당</option>
                    <option value="tier3">개별지원 담당</option>
                    <option value="teacher">담임교사</option>
                    <option value="counselor">상담교사</option>
                    <option value="admin">행정담당</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-2">
                <div class="form-group">
                  <label>주요 책임 *</label>
                  <input type="text" class="form-input" id="member-responsibility"
                    placeholder="예: ODR 데이터 관리" required>
                </div>

                <div class="form-group">
                  <label>이메일</label>
                  <input type="email" class="form-input" id="member-email">
                </div>
              </div>

              <button type="submit" class="btn btn-primary">+ 팀원 추가</button>
            </form>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h4>현재 팀원 (${members.length}명)</h4>
          </div>
          <div class="card-body">
            ${members.length === 0 ? `
              <div class="alert alert-info">
                <span>💡</span>
                <div>아직 추가된 팀원이 없습니다. 위 양식을 사용하여 팀원을 추가하세요.</div>
              </div>
            ` : `
              <table class="data-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>역할</th>
                    <th>책임</th>
                    <th>이메일</th>
                    <th>작업</th>
                  </tr>
                </thead>
                <tbody>
                  ${membersHTML}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>
    `;
  }

  static renderStep4_Baseline() {
    const baseline = this.wizardData.baselineData;
    return `
      <div>
        <h2>📊 기준선 데이터 수집</h2>
        <p class="text-secondary">현재 학교의 행동 데이터를 입력하여 향후 진전도를 측정하세요</p>

        <div class="card mt-4">
          <div class="card-body">
            <form id="baseline-form">
              <h4>작년도 데이터 (참고용)</h4>
              <div class="grid grid-3">
                <div class="form-group">
                  <label>총 ODR 건수</label>
                  <input type="number" class="form-input" id="baseline-odr-total"
                    value="${baseline.odrTotal || ''}">
                  <small class="form-help">학년도 전체 ODR 건수</small>
                </div>

                <div class="form-group">
                  <label>학생 1인당 평균 ODR</label>
                  <input type="number" step="0.1" class="form-input" id="baseline-odr-per-student"
                    value="${baseline.odrPerStudent || ''}">
                  <small class="form-help">총 ODR ÷ 학생 수</small>
                </div>

                <div class="form-group">
                  <label>주요 문제행동 ODR %</label>
                  <input type="number" step="0.1" class="form-input" id="baseline-major-percent"
                    value="${baseline.majorPercent || ''}">
                  <small class="form-help">주요 문제행동 비율</small>
                </div>
              </div>

              <h4 class="mt-4">가장 빈번한 행동 유형 (상위 3개)</h4>
              <div class="grid grid-3">
                <div class="form-group">
                  <input type="text" class="form-input" id="top-behavior-1"
                    value="${baseline.topBehavior1 || ''}" placeholder="1위">
                </div>
                <div class="form-group">
                  <input type="text" class="form-input" id="top-behavior-2"
                    value="${baseline.topBehavior2 || ''}" placeholder="2위">
                </div>
                <div class="form-group">
                  <input type="text" class="form-input" id="top-behavior-3"
                    value="${baseline.topBehavior3 || ''}" placeholder="3위">
                </div>
              </div>

              <h4 class="mt-4">가장 빈번한 장소 (상위 3개)</h4>
              <div class="grid grid-3">
                <div class="form-group">
                  <input type="text" class="form-input" id="top-location-1"
                    value="${baseline.topLocation1 || ''}" placeholder="1위">
                </div>
                <div class="form-group">
                  <input type="text" class="form-input" id="top-location-2"
                    value="${baseline.topLocation2 || ''}" placeholder="2위">
                </div>
                <div class="form-group">
                  <input type="text" class="form-input" id="top-location-3"
                    value="${baseline.topLocation3 || ''}" placeholder="3위">
                </div>
              </div>

              <div class="alert alert-info mt-4">
                <span>💡</span>
                <div>
                  <strong>참고:</strong> 기준선 데이터가 없다면 비워두셔도 됩니다.
                  향후 데이터를 입력하면서 추세를 분석할 수 있습니다.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  static renderStep5_Expectations() {
    const expectations = this.wizardData.expectations;
    let expectationsHTML = '';

    expectations.forEach((exp, index) => {
      expectationsHTML += `
        <div class="card mb-3">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <h4>${exp.name}</h4>
            <button class="btn btn-sm btn-danger" onclick="OnboardingWizard.removeExpectation(${index})">삭제</button>
          </div>
          <div class="card-body">
            <p><strong>설명:</strong> ${exp.description}</p>
            <p><strong>예시:</strong> ${exp.examples}</p>
          </div>
        </div>
      `;
    });

    return `
      <div>
        <h2>⭐ 학교 기대행동 정의</h2>
        <p class="text-secondary">학교 전체에서 가르치고 강화할 3-5개의 긍정적 기대행동을 정의하세요</p>

        <div class="alert alert-info mt-4">
          <span>💡</span>
          <div>
            <strong>권장 기대행동 예시:</strong> 안전, 존중, 책임, 배려, 성실, 협력 등<br>
            각 기대행동은 구체적이고 긍정적이며 가르칠 수 있어야 합니다.
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h4>기대행동 추가</h4>
          </div>
          <div class="card-body">
            <form id="expectation-form" onsubmit="OnboardingWizard.addExpectation(event); return false;">
              <div class="form-group">
                <label>기대행동 이름 * (예: 안전)</label>
                <input type="text" class="form-input" id="expectation-name" required>
              </div>

              <div class="form-group">
                <label>설명 *</label>
                <textarea class="form-input" id="expectation-description" rows="2"
                  placeholder="이 기대행동이 무엇을 의미하는지 간단히 설명하세요" required></textarea>
              </div>

              <div class="form-group">
                <label>구체적 예시 * (쉼표로 구분)</label>
                <textarea class="form-input" id="expectation-examples" rows="3"
                  placeholder="예: 복도에서 걷기, 계단 난간 잡기, 위험한 장난 하지 않기" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary">+ 기대행동 추가</button>
            </form>
          </div>
        </div>

        <div class="mt-4">
          <h4>현재 기대행동 (${expectations.length}개)</h4>
          ${expectations.length === 0 ? `
            <div class="alert alert-warning">
              <span>⚠️</span>
              <div>아직 추가된 기대행동이 없습니다. 최소 3개 이상 추가하는 것을 권장합니다.</div>
            </div>
          ` : expectationsHTML}
        </div>
      </div>
    `;
  }

  static renderStep6_Goals() {
    const goals = this.wizardData.initialGoals;
    return `
      <div>
        <h2>🎯 연간 목표 설정</h2>
        <p class="text-secondary">올해의 SW-PBS 목표를 SMART 형식으로 설정하세요</p>

        <div class="card mt-4">
          <div class="card-body">
            <form id="goals-form">
              <h4>Tier 1 보편적 지원 목표</h4>
              <div class="form-group">
                <label>ODR 감소 목표 (%) *</label>
                <input type="number" class="form-input" id="goal-odr-reduction"
                  value="${goals.odrReduction || '20'}" min="0" max="100" required>
                <small class="form-help">예: 작년 대비 20% 감소</small>
              </div>

              <div class="form-group">
                <label>TFI 목표 점수 (%) *</label>
                <input type="number" class="form-input" id="goal-tfi-score"
                  value="${goals.tfiScore || '80'}" min="0" max="100" required>
                <small class="form-help">목표: 80% 이상 (우수 실행)</small>
              </div>

              <div class="form-group">
                <label>교직원 훈련 목표 (%) *</label>
                <input type="number" class="form-input" id="goal-staff-training"
                  value="${goals.staffTraining || '90'}" min="0" max="100" required>
                <small class="form-help">목표: 교직원의 90% 이상 훈련 참여</small>
              </div>

              <h4 class="mt-5">Tier 2/3 추가 지원 목표</h4>
              <div class="form-group">
                <label>Tier 2 프로그램 목표</label>
                <textarea class="form-input" id="goal-tier2" rows="3"
                  placeholder="예: CICO 프로그램 운영, 연간 30명 이상 참여, 70% 이상 긍정적 반응률">${goals.tier2 || ''}</textarea>
              </div>

              <div class="form-group">
                <label>Tier 3 개별지원 목표</label>
                <textarea class="form-input" id="goal-tier3" rows="3"
                  placeholder="예: 10명 학생에 대한 FBA/BIP 완성, 행동 감소 50% 달성">${goals.tier3 || ''}</textarea>
              </div>

              <h4 class="mt-5">시스템 구축 목표</h4>
              <div class="form-group">
                <label>리더십 팀 회의 빈도 *</label>
                <select class="form-select" id="goal-meeting-frequency" required>
                  <option value="weekly" ${goals.meetingFrequency === 'weekly' ? 'selected' : ''}>매주</option>
                  <option value="biweekly" ${goals.meetingFrequency === 'biweekly' ? 'selected' : ''}>격주</option>
                  <option value="monthly" ${goals.meetingFrequency === 'monthly' ? 'selected' : ''}>매월</option>
                </select>
              </div>

              <div class="form-group">
                <label>데이터 검토 빈도 *</label>
                <select class="form-select" id="goal-data-review" required>
                  <option value="weekly" ${goals.dataReview === 'weekly' ? 'selected' : ''}>매주</option>
                  <option value="biweekly" ${goals.dataReview === 'biweekly' ? 'selected' : ''}>격주</option>
                  <option value="monthly" ${goals.dataReview === 'monthly' ? 'selected' : ''}>매월</option>
                </select>
              </div>

              <div class="form-group">
                <label>가족 참여 목표</label>
                <textarea class="form-input" id="goal-family" rows="3"
                  placeholder="예: 학기당 2회 가족 워크숍 개최, 뉴스레터 발송">${goals.family || ''}</textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  static renderStep7_Summary() {
    const data = this.wizardData;
    return `
      <div>
        <h2 style="text-align: center;">🎉 설정 완료!</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 1.1rem;">
          SW-PBS 시스템이 성공적으로 구성되었습니다
        </p>

        <div class="card mt-4">
          <div class="card-header">
            <h4>설정 요약</h4>
          </div>
          <div class="card-body">
            <div class="grid grid-2">
              <div>
                <h5>학교 정보</h5>
                <p><strong>학교명:</strong> ${data.schoolInfo.name || 'N/A'}</p>
                <p><strong>학생 수:</strong> ${data.schoolInfo.studentCount || 'N/A'}명</p>
                <p><strong>시작 연도:</strong> ${data.schoolInfo.startYear || 'N/A'}</p>
                <p><strong>총괄 담당자:</strong> ${data.schoolInfo.coordinatorName || 'N/A'}</p>
              </div>

              <div>
                <h5>팀 구성</h5>
                <p><strong>리더십 팀원:</strong> ${data.teamMembers.length}명</p>
                <p><strong>기대행동 정의:</strong> ${data.expectations.length}개</p>
                <p><strong>TFI 목표:</strong> ${data.initialGoals.tfiScore || 80}%</p>
                <p><strong>ODR 감소 목표:</strong> ${data.initialGoals.odrReduction || 20}%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h4>다음 단계</h4>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li><strong>데이터 업로드:</strong> 데이터센터에서 CSV 파일을 업로드하세요</li>
              <li><strong>기대행동 매트릭스 완성:</strong> Tier 1 모듈에서 장소별 행동을 정의하세요</li>
              <li><strong>교직원 훈련 계획:</strong> 기대행동 교육 일정을 수립하세요</li>
              <li><strong>학생 교육 시작:</strong> 기대행동을 학생들에게 가르치기 시작하세요</li>
              <li><strong>ODR 기록 시작:</strong> 문제행동 사건을 기록하고 데이터를 수집하세요</li>
              <li><strong>첫 팀 회의 개최:</strong> 2-4주 후 첫 데이터 검토 회의를 계획하세요</li>
            </ul>
          </div>
        </div>

        <div class="alert alert-success mt-4">
          <span>✅</span>
          <div>
            <strong>축하합니다!</strong> SW-PBS 여정을 시작하셨습니다.
            지속적인 데이터 기반 의사결정과 팀 협력을 통해 학교 문화를 긍정적으로 변화시켜 나가세요.
          </div>
        </div>

        <div style="text-align: center; margin-top: var(--space-6);">
          <button class="btn btn-primary btn-lg" onclick="OnboardingWizard.complete()">
            시작하기 →
          </button>
        </div>
      </div>
    `;
  }

  static renderNavButtons() {
    return `
      <div class="modal-footer" style="display: flex; justify-content: space-between; margin-top: var(--space-6);">
        <button class="btn btn-secondary" onclick="OnboardingWizard.previousStep()"
          ${this.currentStep === 1 ? 'disabled' : ''}>
          ← 이전
        </button>

        ${this.currentStep < this.totalSteps ? `
          <button class="btn btn-primary" onclick="OnboardingWizard.nextStep()">
            다음 →
          </button>
        ` : ''}

        ${this.currentStep < this.totalSteps ? `
          <button class="btn btn-outline" onclick="OnboardingWizard.skipOnboarding()">
            건너뛰기
          </button>
        ` : ''}
      </div>
    `;
  }

  static nextStep() {
    // Save current step data
    this.saveCurrentStepData();

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateWizard();
    }
  }

  static previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateWizard();
    }
  }

  static updateWizard() {
    const content = document.getElementById('onboarding-wizard-content');
    if (content) {
      content.innerHTML = this.renderStep(this.currentStep);
    }
  }

  static saveCurrentStepData() {
    switch(this.currentStep) {
      case 2:
        this.wizardData.schoolInfo = {
          name: document.getElementById('school-name')?.value || '',
          type: document.getElementById('school-type')?.value || '',
          studentCount: parseInt(document.getElementById('student-count')?.value) || 0,
          staffCount: parseInt(document.getElementById('staff-count')?.value) || 0,
          startYear: parseInt(document.getElementById('start-year')?.value) || new Date().getFullYear(),
          address: document.getElementById('school-address')?.value || '',
          coordinatorName: document.getElementById('coordinator-name')?.value || '',
          coordinatorEmail: document.getElementById('coordinator-email')?.value || '',
          coordinatorPhone: document.getElementById('coordinator-phone')?.value || ''
        };
        break;

      case 4:
        this.wizardData.baselineData = {
          odrTotal: parseInt(document.getElementById('baseline-odr-total')?.value) || 0,
          odrPerStudent: parseFloat(document.getElementById('baseline-odr-per-student')?.value) || 0,
          majorPercent: parseFloat(document.getElementById('baseline-major-percent')?.value) || 0,
          topBehavior1: document.getElementById('top-behavior-1')?.value || '',
          topBehavior2: document.getElementById('top-behavior-2')?.value || '',
          topBehavior3: document.getElementById('top-behavior-3')?.value || '',
          topLocation1: document.getElementById('top-location-1')?.value || '',
          topLocation2: document.getElementById('top-location-2')?.value || '',
          topLocation3: document.getElementById('top-location-3')?.value || ''
        };
        break;

      case 6:
        this.wizardData.initialGoals = {
          odrReduction: parseInt(document.getElementById('goal-odr-reduction')?.value) || 20,
          tfiScore: parseInt(document.getElementById('goal-tfi-score')?.value) || 80,
          staffTraining: parseInt(document.getElementById('goal-staff-training')?.value) || 90,
          tier2: document.getElementById('goal-tier2')?.value || '',
          tier3: document.getElementById('goal-tier3')?.value || '',
          meetingFrequency: document.getElementById('goal-meeting-frequency')?.value || 'monthly',
          dataReview: document.getElementById('goal-data-review')?.value || 'monthly',
          family: document.getElementById('goal-family')?.value || ''
        };
        break;
    }

    // Save to localStorage
    localStorage.setItem('swpbs_wizard_data', JSON.stringify(this.wizardData));
  }

  static addTeamMember(event) {
    event.preventDefault();

    const member = {
      name: document.getElementById('member-name').value,
      role: document.getElementById('member-role').value,
      responsibility: document.getElementById('member-responsibility').value,
      email: document.getElementById('member-email').value
    };

    this.wizardData.teamMembers.push(member);

    // Clear form
    document.getElementById('team-member-form').reset();

    // Update display
    this.updateWizard();
  }

  static removeMember(index) {
    this.wizardData.teamMembers.splice(index, 1);
    this.updateWizard();
  }

  static addExpectation(event) {
    event.preventDefault();

    const expectation = {
      name: document.getElementById('expectation-name').value,
      description: document.getElementById('expectation-description').value,
      examples: document.getElementById('expectation-examples').value
    };

    this.wizardData.expectations.push(expectation);

    // Clear form
    document.getElementById('expectation-form').reset();

    // Update display
    this.updateWizard();
  }

  static removeExpectation(index) {
    this.wizardData.expectations.splice(index, 1);
    this.updateWizard();
  }

  static complete() {
    // Save all data
    this.saveCurrentStepData();

    // Apply data to SWPBS global state
    SWPBS.schoolConfig = this.wizardData.schoolInfo;
    SWPBS.data.teamMembers = this.wizardData.teamMembers;
    SWPBS.data.expectations = this.wizardData.expectations;
    SWPBS.config.goals = this.wizardData.initialGoals;

    // Save to localStorage
    DataManager.saveToLocalStorage();
    localStorage.setItem('swpbs_onboarding_complete', 'true');

    // Close wizard
    this.hide();

    // Show success notification
    UIManager.showNotification('온보딩이 완료되었습니다! SW-PBS를 시작하세요.', 'success');

    // Refresh dashboard
    UIManager.updateDashboard();
  }

  static skipOnboarding() {
    if (confirm('온보딩을 건너뛰시겠습니까? 나중에 설정에서 다시 시작할 수 있습니다.')) {
      localStorage.setItem('swpbs_onboarding_complete', 'true');
      this.hide();
    }
  }

  static restart() {
    // Clear onboarding data
    localStorage.removeItem('swpbs_onboarding_complete');
    localStorage.removeItem('swpbs_wizard_data');

    // Reset wizard
    this.currentStep = 1;
    this.wizardData = {
      schoolInfo: {},
      teamMembers: [],
      baselineData: {},
      expectations: [],
      environments: [],
      initialGoals: {}
    };

    // Show wizard
    this.show();
  }
}

// Make functions globally accessible
window.OnboardingWizard = OnboardingWizard;
