/**
 * Sample Data Generator
 * data1024.csv 형식에 최적화된 샘플 데이터 생성
 * 차트 및 분석을 위한 다양한 패턴의 데이터 제공
 */

class SampleDataGenerator {
  static studentNames = [
    '김민주', '박민혁', '양준민', '이서연', '최지훈',
    '강하은', '윤도현', '임채원', '정시우', '한지안',
    '송예준', '조서진', '배우진', '남가은', '오준서',
    '권서현', '홍민재', '신다은', '장현우', '문지유'
  ];

  static behaviors = [
    '신체적 공격', '심각한 수업방해', '언어적 폭력', '재산 손괴',
    '불복종', '부적절한 언어', '괴롭힘', '기물 파손',
    '수업 이탈', '과제 거부', '지각', '물건 던지기'
  ];

  static locations = [
    '교실', '복도', '운동장', '급식실', '화장실',
    '체육관', '도서관', '계단', '현관', '교무실 앞'
  ];

  static functions = [
    '관심끌기', '회피', '통제/지배', '감각 자극',
    '과제 회피', '또래 관심', '성인 관심', '자기 규제 실패'
  ];

  static timeSlots = ['오전', '오후', '점심시간', '쉬는시간'];
  static weekdays = ['월요일', '화요일', '수요일', '목요일', '금요일'];
  static teachers = ['홍길동', '이영희', '박철수', '김미영', '최수진', '정동욱', '한서연'];

  static antecedents = [
    '활동 전환', '과제 제시', '또래 상호작용', '교사 지시',
    '자유 시간 종료', '그룹 활동', '개별 과제', '체육 활동',
    '시험 준비', '발표 요청', '규칙 상기', '주의 환기'
  ];

  static consequences = [
    '타임아웃', '면담', '학부모 연락', '경고',
    '문제 해결', '또래 중재', '행동 계약', '보상 철회',
    '대안 행동 교육', '쿨다운', '반성문', '서비스 제공'
  ];

  /**
   * Generate comprehensive sample data
   * @param {number} count - Number of ODR events to generate
   * @param {number} months - Number of months to span
   * @returns {Array} Array of ODR events
   */
  static generate(count = 100, months = 3) {
    const events = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - months);

    // Create student profiles with different risk levels
    const studentProfiles = this.createStudentProfiles();

    for (let i = 0; i < count; i++) {
      // Random date within range
      const randomDate = new Date(
        startDate.getTime() + Math.random() * (today.getTime() - startDate.getTime())
      );

      // Select student based on weighted probability (higher risk = more events)
      const student = this.selectWeightedStudent(studentProfiles);

      // Generate event based on student profile
      const event = this.generateEvent(student, randomDate);
      events.push(event);
    }

    // Sort by date
    events.sort((a, b) => new Date(b['행동 발생일']) - new Date(a['행동 발생일']));

    return events;
  }

  static createStudentProfiles() {
    return this.studentNames.map((name, index) => {
      // Assign different risk levels
      let tier, weight, avgIntensity;

      if (index < 3) {
        // High risk - Tier 3
        tier = 'Tier 3';
        weight = 8;
        avgIntensity = 4.5;
      } else if (index < 8) {
        // Medium risk - Tier 2
        tier = 'Tier 2';
        weight = 4;
        avgIntensity = 3;
      } else {
        // Low risk - Tier 1
        tier = 'Tier 1';
        weight = 1;
        avgIntensity = 2;
      }

      return {
        name,
        tier,
        weight,
        avgIntensity,
        preferredBehaviors: this.selectRandom(this.behaviors, 2),
        preferredLocations: this.selectRandom(this.locations, 2),
        preferredFunctions: this.selectRandom(this.functions, 2)
      };
    });
  }

  static selectWeightedStudent(profiles) {
    const totalWeight = profiles.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;

    for (const profile of profiles) {
      random -= profile.weight;
      if (random <= 0) {
        return profile;
      }
    }

    return profiles[0];
  }

  static generateEvent(studentProfile, date) {
    const weekNumber = Math.ceil(
      (date - new Date(date.getFullYear(), date.getMonth(), 1)) / (7 * 24 * 60 * 60 * 1000)
    );

    // Generate intensity based on student profile with some variance
    const intensity = Math.max(1, Math.min(5,
      Math.round(studentProfile.avgIntensity + (Math.random() - 0.5) * 2)
    ));

    // Select behavior and location based on student preferences
    const behavior = Math.random() < 0.7
      ? this.selectRandom(studentProfile.preferredBehaviors, 1)[0]
      : this.selectRandom(this.behaviors, 1)[0];

    const location = Math.random() < 0.7
      ? this.selectRandom(studentProfile.preferredLocations, 1)[0]
      : this.selectRandom(this.locations, 1)[0];

    const func = Math.random() < 0.7
      ? this.selectRandom(studentProfile.preferredFunctions, 1)[0]
      : this.selectRandom(this.functions, 1)[0];

    // Generate notes for high-intensity events
    const notes = intensity >= 4
      ? this.generateNotes(behavior, intensity)
      : '';

    return {
      '행동 발생일': this.formatDate(date),
      '발생 시간대': this.selectRandom(this.timeSlots, 1)[0],
      '발생 요일': this.weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1] || '월요일',
      '학생명': studentProfile.name,
      '발생한 위기행동': behavior,
      '강도or5점 척도': intensity.toString(),
      '추정되는 기능(동기)': func,
      '행동 발생 장소': location,
      '현재지원단계': studentProfile.tier,
      '입력 교사명': this.selectRandom(this.teachers, 1)[0],
      '특이사항': notes,
      '주요선행사건': this.selectRandom(this.antecedents, 1)[0],
      '주요후속결과': this.selectRandom(this.consequences, 1)[0],
      '발생 주차': weekNumber.toString()
    };
  }

  static generateNotes(behavior, intensity) {
    const noteOptions = {
      '신체적 공격': ['또래 학생과 충돌', '갑작스런 폭발', '반복적 경고 무시'],
      '심각한 수업방해': ['지속적 소음 발생', '다른 학생 학습 방해', '교사 지시 무시'],
      '언어적 폭력': ['욕설 사용', '위협적 언어', '또래 모욕'],
      '재산 손괴': ['교구 파손', '의도적 손상', '물건 던짐'],
      '불복종': ['직접적 거부', '규칙 무시', '대안 행동 거부']
    };

    const options = noteOptions[behavior] || ['특이사항 없음'];
    return intensity >= 4 ? this.selectRandom(options, 1)[0] : '';
  }

  static generatePraiseData(count = 150) {
    const praiseEvents = [];
    const today = new Date();

    const praiseReasons = [
      '기대행동 실천', '도움 행동', '모범 참여', '친절',
      '책임감', '협력', '존중', '안전 행동', '긍정적 태도'
    ];

    for (let i = 0; i < count; i++) {
      const randomDate = new Date(today);
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 90));

      praiseEvents.push({
        id: `praise_${Date.now()}_${i}`,
        date: this.formatDate(randomDate),
        studentName: this.selectRandom(this.studentNames, 1)[0],
        points: Math.floor(Math.random() * 5) + 1,
        reason: this.selectRandom(praiseReasons, 1)[0],
        location: this.selectRandom(this.locations, 1)[0],
        teacher: this.selectRandom(this.teachers, 1)[0]
      });
    }

    return praiseEvents;
  }

  static generateCICOData(studentCount = 12) {
    const cicoStudents = this.selectRandom(this.studentNames, studentCount);
    const cicoRecords = [];
    const today = new Date();

    cicoStudents.forEach(studentName => {
      // Generate 4 weeks of CICO data
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 5; day++) {
          const recordDate = new Date(today);
          recordDate.setDate(recordDate.getDate() - (28 - (week * 7 + day)));

          // Random but realistic scores (improving over time for some students)
          const baseScore = 60 + Math.random() * 20 + (week * 5);
          const dailyScore = Math.min(100, Math.round(baseScore));

          cicoRecords.push({
            id: `cico_${studentName}_${week}_${day}`,
            studentName,
            date: this.formatDate(recordDate),
            week: week + 1,
            checkInTime: '08:00',
            checkOutTime: '15:30',
            dailyScore: dailyScore,
            goalMet: dailyScore >= 80,
            teacherNotes: dailyScore < 70 ? '추가 지원 필요' : '잘하고 있음',
            parentContact: day === 4 // Weekly parent contact on Fridays
          });
        }
      }
    });

    return cicoRecords;
  }

  static generateFBAData(studentCount = 5) {
    const tier3Students = this.studentNames.slice(0, studentCount);
    const fbaAssessments = [];

    tier3Students.forEach((studentName, index) => {
      fbaAssessments.push({
        id: `fba_${studentName}`,
        studentName,
        dateStarted: this.formatDate(new Date(Date.now() - (30 - index * 5) * 24 * 60 * 60 * 1000)),
        targetBehavior: this.selectRandom(this.behaviors.slice(0, 4), 1)[0],
        operationalDefinition: '관찰 가능한 구체적 행동 정의',
        baselineFrequency: Math.floor(Math.random() * 10) + 5,
        functionHypothesis: this.selectRandom(this.functions, 1)[0],
        confidenceLevel: Math.floor(Math.random() * 30) + 70,
        antecedentData: this.selectRandom(this.antecedents, 3),
        consequenceData: this.selectRandom(this.consequences, 3),
        settingEvents: ['수면 부족', '가정 스트레스', '약물 미복용'],
        replacementBehavior: '손 들어 도움 요청',
        status: index < 2 ? 'completed' : 'in-progress'
      });
    });

    return fbaAssessments;
  }

  static generateBIPData(studentCount = 5) {
    const tier3Students = this.studentNames.slice(0, studentCount);
    const bipPlans = [];

    tier3Students.forEach((studentName, index) => {
      bipPlans.push({
        id: `bip_${studentName}`,
        studentName,
        dateCreated: this.formatDate(new Date(Date.now() - (20 - index * 3) * 24 * 60 * 60 * 1000)),
        targetBehavior: this.selectRandom(this.behaviors.slice(0, 4), 1)[0],
        function: this.selectRandom(this.functions, 1)[0],
        preventionStrategies: [
          '과제 난이도 조정',
          '예측 가능한 일과',
          '시각적 지원'
        ],
        teachingStrategies: [
          '대체 행동 교육',
          '자기 조절 기술',
          '사회적 기술 훈련'
        ],
        reinforcementPlan: '토큰 이코노미, 10분마다 체크인',
        responseStrategies: [
          '초기 신호 대응',
          '쿨다운 공간 제공',
          '재지시'
        ],
        goalBehavior: '수업 중 앉아있기 80% 이상',
        progressMonitoring: 'weekly',
        status: index < 3 ? 'active' : 'draft'
      });
    });

    return bipPlans;
  }

  static generateMeetingData() {
    const meetings = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const meetingDate = new Date(today);
      meetingDate.setMonth(meetingDate.getMonth() - i);

      meetings.push({
        id: `meeting_${i}`,
        date: this.formatDate(meetingDate),
        type: i === 0 ? 'upcoming' : 'completed',
        attendees: Math.floor(Math.random() * 3) + 5,
        agenda: [
          '데이터 검토',
          'ODR 추세 분석',
          '학생 배치 결정',
          '충실도 평가'
        ],
        decisions: i > 0 ? [
          `${this.selectRandom(this.studentNames, 1)[0]} Tier 2 배치`,
          '복도 감독 강화',
          '기대행동 재교육 계획'
        ] : [],
        actionItems: [
          { task: '월간 리포트 작성', assignee: '홍길동', dueDate: this.formatDate(new Date(meetingDate.getTime() + 7 * 24 * 60 * 60 * 1000)), status: i > 0 ? 'completed' : 'pending' },
          { task: 'TFI 평가 실시', assignee: '이영희', dueDate: this.formatDate(new Date(meetingDate.getTime() + 14 * 24 * 60 * 60 * 1000)), status: 'pending' }
        ]
      });
    }

    return meetings;
  }

  // Utility functions
  static selectRandom(array, count = 1) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Generate complete dataset for the platform
   */
  static generateCompleteDataset() {
    console.log('🎲 Generating comprehensive sample data...');

    const odrData = this.generate(120, 3);
    const praiseData = this.generatePraiseData(180);
    const cicoData = this.generateCICOData(12);
    const fbaData = this.generateFBAData(5);
    const bipData = this.generateBIPData(5);
    const meetingData = this.generateMeetingData();

    console.log(`✅ Generated:
      - ${odrData.length} ODR events
      - ${praiseData.length} praise points
      - ${cicoData.length} CICO records
      - ${fbaData.length} FBA assessments
      - ${bipData.length} BIP plans
      - ${meetingData.length} leadership meetings`);

    return {
      odrData,
      praiseData,
      cicoData,
      fbaData,
      bipData,
      meetingData
    };
  }

  /**
   * Export sample data as CSV (data1024.csv format)
   */
  static exportAsCSV(data) {
    const headers = [
      '행동 발생일', '발생 시간대', '발생 요일', '학생명',
      '발생한 위기행동', '강도or5점 척도', '추정되는 기능(동기)',
      '행동 발생 장소', '현재지원단계', '입력 교사명',
      '특이사항', '주요선행사건', '주요후속결과', '발생 주차'
    ];

    const csvRows = [headers.join(',')];

    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  }
}

// Make globally accessible
window.SampleDataGenerator = SampleDataGenerator;
