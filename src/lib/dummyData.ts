// 설비 상태 데이터
export const equipmentData = [
  {
    id: "equip-001",
    name: "주입 성형기 #1",
    status: "normal", // normal, warning, error
    sensors: [
      { name: "압력", value: "45.2 MPa", unit: "MPa", status: "normal" },
      { name: "온도", value: "175.3", unit: "°C", status: "normal" },
      { name: "습도", value: "42", unit: "%", status: "normal" },
      { name: "진동", value: "0.12", unit: "mm/s", status: "normal" },
    ],
    position: { x: -2, y: 0, z: 1 },
  },
  {
    id: "equip-002",
    name: "주입 성형기 #2",
    status: "warning",
    sensors: [
      { name: "압력", value: "47.8", unit: "MPa", status: "warning" },
      { name: "온도", value: "182.5", unit: "°C", status: "warning" },
      { name: "습도", value: "45", unit: "%", status: "normal" },
      { name: "진동", value: "0.25", unit: "mm/s", status: "warning" },
    ],
    position: { x: -2, y: 0, z: -1 },
  },
  {
    id: "equip-003",
    name: "냉각기 #1",
    status: "normal",
    sensors: [
      { name: "온도", value: "18.5", unit: "°C", status: "normal" },
      { name: "습도", value: "38", unit: "%", status: "normal" },
      { name: "유량", value: "125", unit: "L/min", status: "normal" },
    ],
    position: { x: 0, y: 0, z: 1 },
  },
  {
    id: "equip-004",
    name: "건조기 #1",
    status: "error",
    sensors: [
      { name: "온도", value: "45.2", unit: "°C", status: "normal" },
      { name: "습도", value: "15", unit: "%", status: "normal" },
      { name: "팬 속도", value: "0", unit: "RPM", status: "error" },
    ],
    position: { x: 0, y: 0, z: -1 },
  },
  {
    id: "equip-005",
    name: "혼합기 #1",
    status: "normal",
    sensors: [
      { name: "모터 전류", value: "12.3", unit: "A", status: "normal" },
      { name: "모터 온도", value: "58.2", unit: "°C", status: "normal" },
      { name: "교반 속도", value: "120", unit: "RPM", status: "normal" },
    ],
    position: { x: 2, y: 0, z: 0 },
  },
];

// 에이전트 데이터
export const agentData = [
  {
    id: "agent-000",
    name: "중앙 LLM",
    role: "조정 및 통제",
    status: "idle", // idle, thinking, working, completed
    description: "모든 도메인 에이전트의 활동을 조율하고 최종 의사결정을 담당합니다.",
    type: "central",
    position: { x: 0, y: 0 }
  },
  {
    id: "agent-001",
    name: "품질 에이전트",
    role: "품질 모니터링",
    status: "idle",
    description: "생산품의 품질을 모니터링하고 불량률을 최소화하는 전략을 제시합니다.",
    type: "domain",
    position: { x: 0, y: -2 }
  },
  {
    id: "agent-002",
    name: "설비 에이전트",
    role: "설비 유지보수",
    status: "idle",
    description: "공장 내 모든 장비의 상태를 모니터링하고 유지보수 일정을 최적화합니다.",
    type: "domain",
    position: { x: 2, y: 0 }
  },
  {
    id: "agent-003",
    name: "생산 에이전트",
    role: "생산 일정 관리",
    status: "idle",
    description: "생산 일정을 최적화하고 생산성을 향상시키는 방안을 제시합니다.",
    type: "domain",
    position: { x: 0, y: 2 }
  },
  {
    id: "agent-004",
    name: "재고 에이전트",
    role: "재고 관리",
    status: "idle",
    description: "원자재 및 완제품 재고를 관리하고 최적의 재고 수준을 유지합니다.",
    type: "domain",
    position: { x: -2, y: 0 }
  },
  {
    id: "agent-005",
    name: "에너지 에이전트",
    role: "에너지 최적화",
    status: "idle",
    description: "공장 전체의 에너지 사용량을 모니터링하고 에너지 효율을 최적화합니다.",
    type: "domain",
    position: { x: -1.5, y: -1.5 }
  },
  {
    id: "agent-006",
    name: "안전 에이전트",
    role: "안전 관리",
    status: "idle",
    description: "작업장 안전을 모니터링하고 위험 요소를 사전에 식별합니다.",
    type: "domain",
    position: { x: 1.5, y: -1.5 }
  },
  {
    id: "agent-007",
    name: "물류 에이전트",
    role: "물류 최적화",
    status: "idle",
    description: "원자재 수급 및 제품 출하 물류를 최적화합니다.",
    type: "domain",
    position: { x: 1.5, y: 1.5 }
  }
];

// KPI 데이터
export const kpiData = {
  daily: {
    production: [
      { name: "00:00", value: 42 },
      { name: "02:00", value: 38 },
      { name: "04:00", value: 35 },
      { name: "06:00", value: 40 },
      { name: "08:00", value: 65 },
      { name: "10:00", value: 75 },
      { name: "12:00", value: 78 },
      { name: "14:00", value: 82 },
      { name: "16:00", value: 80 },
      { name: "18:00", value: 78 },
      { name: "20:00", value: 70 },
      { name: "22:00", value: 55 },
    ],
    defectRate: [
      { name: "00:00", value: 1.2 },
      { name: "02:00", value: 1.1 },
      { name: "04:00", value: 1.3 },
      { name: "06:00", value: 1.2 },
      { name: "08:00", value: 0.9 },
      { name: "10:00", value: 1.0 },
      { name: "12:00", value: 1.1 },
      { name: "14:00", value: 1.2 },
      { name: "16:00", value: 1.8 },
      { name: "18:00", value: 1.5 },
      { name: "20:00", value: 1.3 },
      { name: "22:00", value: 1.2 },
    ],
    operationRate: [
      { name: "00:00", value: 92 },
      { name: "02:00", value: 94 },
      { name: "04:00", value: 95 },
      { name: "06:00", value: 97 },
      { name: "08:00", value: 98 },
      { name: "10:00", value: 99 },
      { name: "12:00", value: 99 },
      { name: "14:00", value: 98 },
      { name: "16:00", value: 95 },
      { name: "18:00", value: 96 },
      { name: "20:00", value: 94 },
      { name: "22:00", value: 93 },
    ],
  },
  weekly: {
    production: [
      { name: "월", value: 520 },
      { name: "화", value: 550 },
      { name: "수", value: 570 },
      { name: "목", value: 560 },
      { name: "금", value: 580 },
      { name: "토", value: 520 },
      { name: "일", value: 480 },
    ],
    defectRate: [
      { name: "월", value: 1.3 },
      { name: "화", value: 1.2 },
      { name: "수", value: 1.1 },
      { name: "목", value: 1.2 },
      { name: "금", value: 1.3 },
      { name: "토", value: 1.1 },
      { name: "일", value: 1.0 },
    ],
    operationRate: [
      { name: "월", value: 94 },
      { name: "화", value: 96 },
      { name: "수", value: 97 },
      { name: "목", value: 98 },
      { name: "금", value: 97 },
      { name: "토", value: 95 },
      { name: "일", value: 92 },
    ],
  },
  monthly: {
    production: [
      { name: "1주", value: 3650 },
      { name: "2주", value: 3780 },
      { name: "3주", value: 3820 },
      { name: "4주", value: 3900 },
    ],
    defectRate: [
      { name: "1주", value: 1.2 },
      { name: "2주", value: 1.1 },
      { name: "3주", value: 1.0 },
      { name: "4주", value: 0.9 },
    ],
    operationRate: [
      { name: "1주", value: 95 },
      { name: "2주", value: 96 },
      { name: "3주", value: 97 },
      { name: "4주", value: 98 },
    ],
  },
};

// 이벤트 타임라인 데이터
export const eventTimelineData = [
  {
    id: "event-001",
    timestamp: "2023-07-05T09:32:15",
    level: "info", // info, warning, error
    agent: "설비 에이전트",
    message: "설비 정기 점검 일정이 업데이트되었습니다.",
  },
  {
    id: "event-002",
    timestamp: "2023-07-05T10:15:22",
    level: "warning",
    agent: "품질 에이전트",
    message: "주입 성형기 #2의 압력 수치가 임계값에 근접했습니다.",
  },
  {
    id: "event-003",
    timestamp: "2023-07-05T11:05:43",
    level: "error",
    agent: "안전 에이전트",
    message: "건조기 #1의 팬이 작동을 멈췄습니다. 즉시 확인이 필요합니다.",
  },
  {
    id: "event-004",
    timestamp: "2023-07-05T11:32:18",
    level: "info",
    agent: "중앙 LLM",
    message: "설비 에이전트와 안전 에이전트를 건조기 #1 문제 해결에 할당했습니다.",
  },
  {
    id: "event-005",
    timestamp: "2023-07-05T12:10:05",
    level: "info",
    agent: "생산 에이전트",
    message: "건조기 #1 문제로 인한 생산 일정 조정을 완료했습니다.",
  },
];

export const aiResponsesSimulation = {
  "공장 상태 알려줘": {
    text: "현재 공장 상태는 전반적으로 양호합니다. 총 5개 설비 중 3개가 정상 작동 중이고, 1개는 경고 상태, 1개는 오류 상태입니다. 주요 이슈는 다음과 같습니다:\n\n- 건조기 #1: 팬 작동 중단 (오류)\n- 주입 성형기 #2: 압력 및 온도 수치 상승 (경고)\n\n현재 생산성은 정상의 85% 수준으로 유지되고 있으며, 품질 불량률은 1.3%입니다. 건조기 #1 문제 해결을 위해 유지보수팀이 투입되었습니다.",
    agentFlow: [
      { 
        from: "agent-000", 
        to: "agent-002", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-001", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-003", 
        state: "completed" 
      }
    ]
  },
  "건조기 문제 해결책 제시해줘": {
    text: "건조기 #1의 팬 작동 중단 문제에 대한 해결책을 분석했습니다:\n\n1. **긴급 조치 (즉시)**\n   - 건조기 전원 차단 및 안전 점검\n   - 팬 모터 과열 여부 확인\n   - 팬 벨트 및 베어링 마모 점검\n\n2. **단기 해결 방안 (4시간 내)**\n   - 팬 모터 교체 (예비품 창고 재고 확인 완료)\n   - 제어 회로 점검 및 필요시 교체\n\n3. **장기 대책**\n   - 정기 점검 주기 단축 (월 1회 → 주 1회)\n   - 진동 감지 센서 추가 설치로 사전 이상 감지\n   - 유사 모델 교체 검토 (현 모델은 노후화)\n\n예상 복구 시간은 4-6시간이며, 이 기간 동안 생산 일정은 냉각기 #2로 대체 가능합니다. 해당 조치는 생산량 95% 수준을 유지하면서 진행 가능합니다.",
    agentFlow: [
      { 
        from: "agent-000", 
        to: "agent-002", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-006", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-003", 
        state: "completed" 
      },
      { 
        from: "agent-003", 
        to: "agent-004", 
        state: "completed" 
      }
    ]
  },
  "품질 개선 방안 분석해줘": {
    text: "현재 품질 데이터를 분석한 결과, 불량률 개선을 위한 다음 방안을 제안합니다:\n\n1. **주요 불량 원인 분석**\n   - 성형 불량: 45% (주입 압력 불안정)\n   - 표면 흠집: 30% (냉각 과정 개선 필요)\n   - 치수 오차: 15% (금형 마모)\n   - 기타: 10%\n\n2. **단기 개선 방안**\n   - 주입 성형기 #2의 압력 안정화 (현재 47.8MPa → 목표 45.0MPa)\n   - 냉각 속도 10% 감소로 급격한 온도 변화 방지\n   - 품질 검사 샘플링 빈도 증가 (현 2시간 → 1시간)\n\n3. **장기 개선 방안**\n   - 마모된 금형 교체 (예상 비용: 1,200만원)\n   - 원료 공급업체 다변화 및 품질 표준 강화\n   - 자동 비전 검사 시스템 도입\n\n해당 방안을 적용할 경우, 불량률을 현재 1.3%에서 0.8% 수준으로 개선할 수 있으며, 이는 연간 약 1억 5천만원의 비용 절감 효과가 있을 것으로 예상됩니다.",
    agentFlow: [
      { 
        from: "agent-000", 
        to: "agent-001", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-002", 
        state: "completed" 
      },
      { 
        from: "agent-001", 
        to: "agent-003", 
        state: "completed" 
      },
      { 
        from: "agent-001", 
        to: "agent-004", 
        state: "completed" 
      }
    ]
  },
  "보고서 만들어줘": {
    text: "## 주간 생산 현황 보고서\n\n### 1. 생산 실적 요약\n- **계획 생산량**: 3,800 유닛\n- **실제 생산량**: 3,780 유닛 (99.5% 달성)\n- **불량률**: 1.1% (전주 대비 0.2%p 감소)\n- **가동률**: 96.2% (전주 대비 1.5%p 증가)\n\n### 2. 주요 이슈 및 조치사항\n- **건조기 #1 팬 고장**: 화요일 발생, 수요일까지 복구 완료\n  - 원인: 팬 베어링 마모\n  - 조치: 베어링 교체 및 모터 점검\n  - 후속: 유사 설비 예방 점검 완료\n\n- **주입 성형기 #2 압력 불안정**: 목요일~금요일\n  - 원인: 압력 센서 오차 발생\n  - 조치: 센서 교정 및 제어 파라미터 최적화\n  - 결과: 금요일 오후부터 안정화\n\n### 3. 품질 현황\n- 주요 불량 유형: 성형 불량(45%), 표면 흠집(30%), 치수 오차(15%)\n- 개선 조치: 냉각 속도 조정, 금형 일부 교체\n- 불량률 추세: 지속적 감소 중 (1.3% → 1.1%)\n\n### 4. 에너지 사용 현황\n- 전력 사용량: 12,800 kWh (목표 대비 2% 절감)\n- 가스 사용량: 2,300 m³ (목표 대비 1% 초과)\n- 용수 사용량: 850 톤 (목표 대비 3% 절감)\n\n### 5. 안전 현황\n- 안전사고: 0건 (무사고 32주 달성)\n- 아차사고: 1건 (지게차 적재물 이탈 위험)\n- 안전 교육: 화재 대피 훈련 실시 (참여율 98%)\n\n### 6. 다음 주 중점 사항\n- 주입 성형기 #1, #2 정기 유지보수 예정 (화요일)\n- 신규 원자재 테스트 생산 (목요일~금요일)\n- 품질 개선 TFT 1차 회의 (수요일)\n\n### 7. 제안 및 권고사항\n- 주입 성형기 금형 교체 계획 수립 필요 (마모 진행 중)\n- 에너지 절감을 위한 냉각수 시스템 개선 검토\n- 불량률 추가 감소를 위한 자동 비전 검사 시스템 도입 검토\n\n보고서 작성자: 공장 AI 관리 시스템\n작성일: 2023-07-06",
    agentFlow: [
      { 
        from: "agent-000", 
        to: "agent-003", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-001", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-002", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-004", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-005", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-006", 
        state: "completed" 
      }
    ]
  },
  "내일 생산량 예측해줘": {
    text: "내일의 생산량을 예측하기 위해 여러 요소를 분석했습니다:\n\n### 생산량 예측: 590 유닛 (±15)\n\n**예측 근거:**\n\n1. **설비 상태 분석**\n   - 주입 성형기 #1: 100% 가동 가능\n   - 주입 성형기 #2: 압력 불안정 해소로 95% 효율 예상\n   - 건조기 #1: 팬 수리 완료, 정상 가동 예상\n   - 기타 설비: 정상 가동 예상\n\n2. **원자재 상황**\n   - 주요 원자재 재고: 5일치 (충분)\n   - 부자재 재고: 안정적\n\n3. **인력 상황**\n   - 출근 예정 인원: 정상 (휴가/결근 없음)\n   - 교대 일정: 정상\n\n4. **주문 상황**\n   - 예정 주문량: 580 유닛\n   - 긴급 주문 가능성: 있음 (20 유닛 이내)\n\n5. **예상 불량률: 1.0%**\n   - 압력 안정화로 인한 품질 개선 예상\n\n6. **날씨 영향**\n   - 내일 날씨: 맑음, 온도 24-28°C\n   - 습도: 45-55% (생산에 적합)\n\n7. **리스크 요소**\n   - 주입 성형기 #2 압력 변동 가능성 (낮음)\n   - 원자재 품질 변동 가능성 (매우 낮음)\n\n최근 5일 생산량 추세(550→565→570→580→575)와 설비 상태 개선을 고려했을 때, 내일은 590 유닛의 생산이 가능할 것으로 예측됩니다.",
    agentFlow: [
      { 
        from: "agent-000", 
        to: "agent-003", 
        state: "completed" 
      },
      { 
        from: "agent-000", 
        to: "agent-002", 
        state: "completed" 
      },
      { 
        from: "agent-003", 
        to: "agent-004", 
        state: "completed" 
      },
      { 
        from: "agent-003", 
        to: "agent-001", 
        state: "completed" 
      },
      { 
        from: "agent-003", 
        to: "agent-007", 
        state: "completed" 
      }
    ]
  }
};

// 에이전트 협업 흐름 상태
export const agentFlowsData = {
  connections: [],
  // 연결 상태는 UI에서 동적으로 관리
};

// 보고서 미리보기용 데이터
export const reportPreviewData = {
  title: "주간 생산 현황 보고서",
  createdAt: "2023-07-06",
  author: "공장 AI 관리 시스템",
  content: "## 주간 생산 현황 보고서\n\n### 1. 생산 실적 요약\n- **계획 생산량**: 3,800 유닛\n- **실제 생산량**: 3,780 유닛 (99.5% 달성)\n- **불량률**: 1.1% (전주 대비 0.2%p 감소)\n- **가동률**: 96.2% (전주 대비 1.5%p 증가)\n\n### 2. 주요 이슈 및 조치사항\n- **건조기 #1 팬 고장**: 화요일 발생, 수요일까지 복구 완료\n  - 원인: 팬 베어링 마모\n  - 조치: 베어링 교체 및 모터 점검\n  - 후속: 유사 설비 예방 점검 완료\n\n- **주입 성형기 #2 압력 불안정**: 목요일~금요일\n  - 원인: 압력 센서 오차 발생\n  - 조치: 센서 교정 및 제어 파라미터 최적화\n  - 결과: 금요일 오후부터 안정화\n\n### 3. 품질 현황\n- 주요 불량 유형: 성형 불량(45%), 표면 흠집(30%), 치수 오차(15%)\n- 개선 조치: 냉각 속도 조정, 금형 일부 교체\n- 불량률 추세: 지속적 감소 중 (1.3% → 1.1%)\n\n### 4. 에너지 사용 현황\n- 전력 사용량: 12,800 kWh (목표 대비 2% 절감)\n- 가스 사용량: 2,300 m³ (목표 대비 1% 초과)\n- 용수 사용량: 850 톤 (목표 대비 3% 절감)\n\n### 5. 안전 현황\n- 안전사고: 0건 (무사고 32주 달성)\n- 아차사고: 1건 (지게차 적재물 이탈 위험)\n- 안전 교육: 화재 대피 훈련 실시 (참여율 98%)\n\n### 6. 다음 주 중점 사항\n- 주입 성형기 #1, #2 정기 유지보수 예정 (화요일)\n- 신규 원자재 테스트 생산 (목요일~금요일)\n- 품질 개선 TFT 1차 회의 (수요일)\n\n### 7. 제안 및 권고사항\n- 주입 성형기 금형 교체 계획 수립 필요 (마모 진행 중)\n- 에너지 절감을 위한 냉각수 시스템 개선 검토\n- 불량률 추가 감소를 위한 자동 비전 검사 시스템 도입 검토",
}; 