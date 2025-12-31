"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { agentData } from '@/lib/dummyData';

interface AgentNodeProps {
  agent: typeof agentData[0];
  isActive: boolean;
  onClick: (agent: typeof agentData[0]) => void;
}

const AgentNode: React.FC<AgentNodeProps> = ({ agent, isActive, onClick }) => {
  // 에이전트 유형에 따른 스타일 설정
  const isCentral = agent.type === 'central';
  const size = isCentral ? 80 : 60;
  
  // 상태에 따른 색상 설정
  const getStatusColor = () => {
    switch (agent.status) {
      case 'thinking':
        return 'bg-yellow-500';
      case 'working':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-muted';
    }
  };

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${agent.position.x * 50 + 50}%`,
        top: `${agent.position.y * 50 + 50}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        boxShadow: isActive ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
      }}
      transition={{ duration: 0.5 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              className={`rounded-full flex items-center justify-center cursor-pointer ${
                isCentral ? 'bg-brand text-brand-foreground' : 'bg-card text-card-foreground'
              } border-2 ${isActive ? 'border-brand' : 'border-border'}`}
              style={{ width: size, height: size }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onClick(agent)}
            >
              <div className="text-center">
                <div className="font-semibold text-xs">{agent.name.split(' ')[0]}</div>
                {isCentral && <div className="text-xs">LLM</div>}
              </div>
              
              {agent.status !== 'idle' && (
                <motion.div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor()}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="text-sm font-semibold">{agent.name}</div>
            <div className="text-xs">{agent.role}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

interface AgentConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  state: string;
}

const AgentConnection: React.FC<AgentConnectionProps> = ({ from, to, state }) => {
  // 상태에 따른 색상과 애니메이션 설정
  const getConnectionStyle = () => {
    switch (state) {
      case 'thinking':
        return {
          stroke: '#EAB308', // yellow-500
          strokeDasharray: '5,5',
          animate: {
            strokeDashoffset: [0, -10]
          }
        };
      case 'working':
        return {
          stroke: '#3B82F6', // blue-500
          strokeDasharray: '0',
          animate: {
            pathLength: [0, 1]
          }
        };
      case 'completed':
        return {
          stroke: '#22C55E', // green-500
          strokeDasharray: '0',
          animate: {
            pathLength: 1
          }
        };
      default:
        return {
          stroke: '#6B7280', // gray-500
          strokeDasharray: '0',
          animate: {}
        };
    }
  };
  
  const style = getConnectionStyle();
  
  // 시작점과 끝점 계산
  const fromX = from.x * 50 + 50;
  const fromY = from.y * 50 + 50;
  const toX = to.x * 50 + 50;
  const toY = to.y * 50 + 50;
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.line
        x1={`${fromX}%`}
        y1={`${fromY}%`}
        x2={`${toX}%`}
        y2={`${toY}%`}
        strokeWidth={2}
        stroke={style.stroke}
        strokeDasharray={style.strokeDasharray}
        initial={{ pathLength: 0 }}
        animate={style.animate}
        transition={{ duration: 1, repeat: state === 'thinking' ? Infinity : 0 }}
      />
    </svg>
  );
};

interface AgentDetailProps {
  agent: typeof agentData[0];
  onClose: () => void;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent, onClose }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card rounded-lg p-4 m-4 max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.role}</p>
          </div>
          <Badge 
            variant={
              agent.status === 'thinking' ? 'warning' : 
              agent.status === 'working' ? 'secondary' :
              agent.status === 'completed' ? 'success' : 'default'
            }
          >
            {agent.status === 'thinking' ? '분석 중' : 
             agent.status === 'working' ? '작업 중' :
             agent.status === 'completed' ? '완료됨' : '대기 중'}
          </Badge>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-semibold">역할 설명</h4>
          <p className="text-sm mt-1">{agent.description}</p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-semibold">최근 활동</h4>
          <ul className="mt-1 space-y-2">
            <li className="text-xs bg-background p-2 rounded">
              품질 데이터 분석 완료 (2분 전)
            </li>
            <li className="text-xs bg-background p-2 rounded">
              불량률 개선 방안 제시 (5분 전)
            </li>
            <li className="text-xs bg-background p-2 rounded">
              주간 품질 보고서 생성 (1시간 전)
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface AgentGraphProps {
  agentFlowData?: Array<{
    from: string;
    to: string;
    state: string;
  }>;
}

const AgentGraph: React.FC<AgentGraphProps> = ({ agentFlowData = [] }) => {
  const [agents, setAgents] = useState(agentData);
  const [connections, setConnections] = useState<Array<{
    from: { id: string; x: number; y: number };
    to: { id: string; x: number; y: number };
    state: string;
  }>>([]);
  const [selectedAgent, setSelectedAgent] = useState<typeof agentData[0] | null>(null);

  // 에이전트 흐름 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (agentFlowData.length === 0) return;
    
    // 모든 에이전트를 idle 상태로 초기화
    const resetAgents = agents.map(agent => ({
      ...agent,
      status: 'idle'
    }));
    
    // 연결 정보 생성
    const newConnections = agentFlowData.map(flow => {
      const fromAgent = agents.find(a => a.id === flow.from);
      const toAgent = agents.find(a => a.id === flow.to);
      
      if (!fromAgent || !toAgent) return null;
      
      return {
        from: { 
          id: fromAgent.id,
          x: fromAgent.position.x,
          y: fromAgent.position.y
        },
        to: { 
          id: toAgent.id,
          x: toAgent.position.x,
          y: toAgent.position.y
        },
        state: flow.state
      };
    }).filter(Boolean) as Array<{
      from: { id: string; x: number; y: number };
      to: { id: string; x: number; y: number };
      state: string;
    }>;
    
    // 상태가 있는 에이전트 업데이트
    const updatedAgents = resetAgents.map(agent => {
      const incomingFlow = agentFlowData.find(flow => flow.to === agent.id);
      const outgoingFlow = agentFlowData.find(flow => flow.from === agent.id);
      
      if (incomingFlow || outgoingFlow) {
        return {
          ...agent,
          status: incomingFlow?.state || outgoingFlow?.state || 'idle'
        };
      }
      
      return agent;
    });
    
    setAgents(updatedAgents);
    setConnections(newConnections);
  }, [agentFlowData]);
  
  // 에이전트 클릭 핸들러
  const handleAgentClick = (agent: typeof agentData[0]) => {
    setSelectedAgent(agent);
  };
  
  // 디테일 창 닫기 핸들러
  const handleCloseDetail = () => {
    setSelectedAgent(null);
  };

  return (
    <Card className="h-[calc(100vh-2rem)]">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">AI 에이전트 네트워크</CardTitle>
      </CardHeader>
      
      <CardContent className="h-[calc(100%-56px)] p-0 relative overflow-hidden">
        {/* 연결선 렌더링 */}
        {connections.map((connection, index) => (
          <AgentConnection
            key={`connection-${index}`}
            from={connection.from}
            to={connection.to}
            state={connection.state}
          />
        ))}
        
        {/* 에이전트 노드 렌더링 */}
        {agents.map(agent => (
          <AgentNode
            key={agent.id}
            agent={agent}
            isActive={selectedAgent?.id === agent.id}
            onClick={handleAgentClick}
          />
        ))}
        
        {/* 선택된 에이전트 상세 정보 */}
        {selectedAgent && (
          <AgentDetail
            agent={selectedAgent}
            onClose={handleCloseDetail}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AgentGraph; 