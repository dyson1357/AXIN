import { aiResponsesSimulation } from './dummyData';

type ResponseType = {
  text: string;
  agentFlow: Array<{
    from: string;
    to: string;
    state: string; // 'thinking' | 'working' | 'completed'
  }>;
};

export function getSimulatedResponse(command: string): ResponseType | null {
  if (command in aiResponsesSimulation) {
    return aiResponsesSimulation[command as keyof typeof aiResponsesSimulation] as ResponseType;
  }

  const commandKeywords: Record<string, string[]> = {
    "공장 상태 알려줘": ["상태", "현황", "알려", "어때", "공장"],
    "건조기 문제 해결책 제시해줘": ["건조기", "문제", "해결", "고장", "팬", "수리"],
    "품질 개선 방안 분석해줘": ["품질", "개선", "불량", "분석", "방안"],
    "보고서 만들어줘": ["보고서", "리포트", "만들어", "요약", "작성"],
    "내일 생산량 예측해줘": ["예측", "생산량", "내일", "얼마나", "생산"],
  };

  let bestMatchCount = 0;
  let bestMatchCommand = "";

  for (const [cmd, keywords] of Object.entries(commandKeywords)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      if (command.includes(keyword)) {
        matchCount++;
      }
    }

    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestMatchCommand = cmd;
    }
  }

  if (bestMatchCount >= 2 && bestMatchCommand) {
    return aiResponsesSimulation[bestMatchCommand as keyof typeof aiResponsesSimulation] as ResponseType;
  }

  return {
    text: "죄송합니다. 명령을 이해하지 못했습니다. 다음과 같은 명령을 사용해 보세요:\n\n- 공장 상태 알려줘\n- 건조기 문제 해결책 제시해줘\n- 품질 개선 방안 분석해줘\n- 보고서 만들어줘\n- 내일 생산량 예측해줘",
    agentFlow: [
      { 
        from: "agent-000", 
        to: "agent-000", 
        state: "completed" 
      }
    ]
  };
} 