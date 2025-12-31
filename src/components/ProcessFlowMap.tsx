"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  AlertCircle,
  RefreshCw,
  Cpu,
  Database,
  Settings,
  BarChart2,
  Package,
  Zap,
  Bot,
  Activity
} from 'lucide-react';

// 노드 유형별 초기 데이터 (한국어)
const initialNodes = [
  {
    id: '1',
    type: 'dataSource',
    data: {
      label: '원자재 입고',
      status: 'active',
      metrics: { throughput: '2.3톤/시', quality: '99.1%' }
    },
    position: { x: 50, y: 180 },
  },
  {
    id: '2',
    type: 'process',
    data: {
      label: '전처리 공정',
      status: 'active',
      metrics: { throughput: '2.1톤/시', quality: '98.7%' }
    },
    position: { x: 280, y: 180 },
  },
  {
    id: '3',
    type: 'process',
    data: {
      label: '사출 성형',
      status: 'warning',
      metrics: { throughput: '1.9톤/시', quality: '97.2%' }
    },
    position: { x: 510, y: 180 },
  },
  {
    id: '4',
    type: 'process',
    data: {
      label: '냉각 공정',
      status: 'active',
      metrics: { throughput: '1.9톤/시', quality: '99.3%' }
    },
    position: { x: 740, y: 180 },
  },
  {
    id: '5',
    type: 'process',
    data: {
      label: '품질 검사',
      status: 'active',
      metrics: { throughput: '1.9톤/시', quality: '100%' }
    },
    position: { x: 970, y: 180 },
  },
  {
    id: '6',
    type: 'dataSink',
    data: {
      label: '완제품 출고',
      status: 'active',
      metrics: { throughput: '1.8톤/시', quality: '99.8%' }
    },
    position: { x: 1200, y: 180 },
  },

  // AI 에이전트 노드
  {
    id: 'agent1',
    type: 'agent',
    data: {
      label: '품질 모니터링 AI',
      status: 'active',
      metrics: { accuracy: '98.5%', latency: '12ms' }
    },
    position: { x: 510, y: 350 },
  },
  {
    id: 'agent2',
    type: 'agent',
    data: {
      label: '온도 제어 AI',
      status: 'active',
      metrics: { accuracy: '99.2%', latency: '8ms' }
    },
    position: { x: 740, y: 350 },
  },
  {
    id: 'agent3',
    type: 'agent',
    data: {
      label: '공정 최적화 AI',
      status: 'active',
      metrics: { accuracy: '97.8%', latency: '15ms' }
    },
    position: { x: 970, y: 350 },
  },

  // 데이터베이스 노드
  {
    id: 'db1',
    type: 'database',
    data: {
      label: '생산 이력 DB',
      status: 'active',
      metrics: { size: '1.2TB', queries: '850건/분' }
    },
    position: { x: 740, y: 20 },
  },
];

// 에지(연결선) 초기 데이터
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 3, stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeWidth: 3, stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { strokeWidth: 3, stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { strokeWidth: 3, stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { strokeWidth: 3, stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },

  // 에이전트 연결
  {
    id: 'eagent1-3',
    source: 'agent1',
    target: '3',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2, strokeDasharray: '6,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' }
  },
  {
    id: 'eagent2-4',
    source: 'agent2',
    target: '4',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2, strokeDasharray: '6,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' }
  },
  {
    id: 'eagent3-5',
    source: 'agent3',
    target: '5',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2, strokeDasharray: '6,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' }
  },

  // 데이터베이스 연결
  {
    id: 'edb1-3',
    source: 'db1',
    target: '3',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
  },
  {
    id: 'edb1-4',
    source: 'db1',
    target: '4',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
  },
  {
    id: 'edb1-5',
    source: 'db1',
    target: '5',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
  },
];

// 데이터 소스 노드 (원자재 입고)
const DataSourceNode = ({ data }: { data: any }) => {
  return (
    <div className="group relative rounded-xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 p-4 min-w-[200px] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-500 transition-all duration-200">
      <div className="absolute -top-3 left-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">입고</div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
          <Package className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-blue-900 text-sm">{data.label}</div>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-white/60 rounded-lg p-2">
        <div className="text-blue-600 font-medium">처리량</div>
        <div className="font-bold text-blue-900 text-right">{data.metrics.throughput}</div>
        <div className="text-blue-600 font-medium">품질</div>
        <div className="font-bold text-blue-900 text-right">{data.metrics.quality}</div>
      </div>
    </div>
  );
};

// 프로세스 노드 (가공, 성형 등)
const ProcessNode = ({ data }: { data: any }) => {
  const isWarning = data.status === 'warning';
  return (
    <div className={`group relative rounded-xl border-2 ${isWarning ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100' : 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-indigo-100'} p-4 min-w-[200px] shadow-lg ${isWarning ? 'shadow-amber-500/10 hover:shadow-amber-500/20 hover:border-amber-500' : 'shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:border-indigo-500'} transition-all duration-200`}>
      <div className={`absolute -top-3 left-4 ${isWarning ? 'bg-amber-500' : 'bg-indigo-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>공정</div>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${isWarning ? 'bg-amber-500' : 'bg-indigo-500'} rounded-lg shadow-sm`}>
          <Settings className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className={`font-bold ${isWarning ? 'text-amber-900' : 'text-indigo-900'} text-sm`}>{data.label}</div>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className={`grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-white/60 rounded-lg p-2`}>
        <div className={`${isWarning ? 'text-amber-600' : 'text-indigo-600'} font-medium`}>처리량</div>
        <div className={`font-bold ${isWarning ? 'text-amber-900' : 'text-indigo-900'} text-right`}>{data.metrics.throughput}</div>
        <div className={`${isWarning ? 'text-amber-600' : 'text-indigo-600'} font-medium`}>품질</div>
        <div className={`font-bold ${isWarning ? 'text-amber-900' : 'text-indigo-900'} text-right`}>{data.metrics.quality}</div>
      </div>
    </div>
  );
};

// 데이터 싱크 노드 (출고)
const DataSinkNode = ({ data }: { data: any }) => {
  return (
    <div className="group relative rounded-xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 min-w-[200px] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:border-emerald-500 transition-all duration-200">
      <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">출고</div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-emerald-500 rounded-lg shadow-sm">
          <BarChart2 className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-emerald-900 text-sm">{data.label}</div>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-white/60 rounded-lg p-2">
        <div className="text-emerald-600 font-medium">처리량</div>
        <div className="font-bold text-emerald-900 text-right">{data.metrics.throughput}</div>
        <div className="text-emerald-600 font-medium">품질</div>
        <div className="font-bold text-emerald-900 text-right">{data.metrics.quality}</div>
      </div>
    </div>
  );
};

// AI 에이전트 노드
const AgentNode = ({ data }: { data: any }) => {
  return (
    <div className="group relative rounded-xl border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 p-4 min-w-[200px] shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:border-orange-500 transition-all duration-200">
      <div className="absolute -top-3 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <Zap className="w-2.5 h-2.5" />
        AI Agent
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md shadow-orange-500/30">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-orange-900 text-sm">{data.label}</div>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-white/60 rounded-lg p-2">
        <div className="text-orange-600 font-medium">정확도</div>
        <div className="font-bold text-orange-900 text-right">{data.metrics.accuracy}</div>
        <div className="text-orange-600 font-medium">응답속도</div>
        <div className="font-bold text-orange-900 text-right">{data.metrics.latency}</div>
      </div>
    </div>
  );
};

// 데이터베이스 노드
const DatabaseNode = ({ data }: { data: any }) => {
  return (
    <div className="group relative rounded-xl border-2 border-cyan-400 bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 min-w-[200px] shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-200">
      <div className="absolute -top-3 left-4 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <Database className="w-2.5 h-2.5" />
        DB
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-cyan-500 rounded-lg shadow-sm">
          <Database className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-cyan-900 text-sm">{data.label}</div>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-white/60 rounded-lg p-2">
        <div className="text-cyan-600 font-medium">데이터 크기</div>
        <div className="font-bold text-cyan-900 text-right">{data.metrics.size}</div>
        <div className="text-cyan-600 font-medium">쿼리 처리</div>
        <div className="font-bold text-cyan-900 text-right">{data.metrics.queries}</div>
      </div>
    </div>
  );
};

// 상태 표시 배지
const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') {
    return (
      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-1 text-[10px] font-bold border border-emerald-200 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        정상
      </div>
    );
  } else if (status === 'warning') {
    return (
      <div className="flex items-center gap-1 bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 text-[10px] font-bold border border-amber-200 shadow-sm">
        <AlertCircle className="h-3 w-3" />
        주의
      </div>
    );
  } else if (status === 'error') {
    return (
      <div className="flex items-center gap-1 bg-red-100 text-red-700 rounded-full px-2.5 py-1 text-[10px] font-bold border border-red-200 shadow-sm">
        <AlertCircle className="h-3 w-3" />
        오류
      </div>
    );
  } else if (status === 'pending') {
    return (
      <div className="flex items-center gap-1 bg-slate-100 text-slate-600 rounded-full px-2.5 py-1 text-[10px] font-bold border border-slate-200 shadow-sm">
        <RefreshCw className="h-3 w-3 animate-spin" />
        처리중
      </div>
    );
  }
  return null;
};

// 사용자 정의 노드 유형
const nodeTypes: NodeTypes = {
  dataSource: DataSourceNode,
  process: ProcessNode,
  dataSink: DataSinkNode,
  agent: AgentNode,
  database: DatabaseNode,
};

export default function ProcessFlowMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedView, setSelectedView] = useState('all');

  // 새 연결선 추가
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  // 뷰 변경 처리
  const handleViewChange = (view: string) => {
    setSelectedView(view);

    if (view === 'all') {
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else if (view === 'production') {
      const filteredNodes = initialNodes.filter(node =>
        ['1', '2', '3', '4', '5', '6'].includes(node.id)
      );
      const filteredEdges = initialEdges.filter(edge =>
        ['e1-2', 'e2-3', 'e3-4', 'e4-5', 'e5-6'].includes(edge.id)
      );
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } else if (view === 'agents') {
      const filteredNodes = initialNodes.filter(node =>
        ['3', '4', '5', 'agent1', 'agent2', 'agent3'].includes(node.id)
      );
      const filteredEdges = initialEdges.filter(edge =>
        ['e3-4', 'e4-5', 'eagent1-3', 'eagent2-4', 'eagent3-5'].includes(edge.id)
      );
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } else if (view === 'data') {
      const filteredNodes = initialNodes.filter(node =>
        ['3', '4', '5', 'db1'].includes(node.id)
      );
      const filteredEdges = initialEdges.filter(edge =>
        ['e3-4', 'e4-5', 'edb1-3', 'edb1-4', 'edb1-5'].includes(edge.id)
      );
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Controls
          className="!bg-white !border-slate-200 !shadow-lg !rounded-xl overflow-hidden"
        />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="!bg-white/90 !border !border-slate-200 !shadow-lg !rounded-xl"
          maskColor="rgba(241, 245, 249, 0.7)"
          nodeColor={(node) => {
            switch (node.type) {
              case 'dataSource':
                return '#3b82f6';
              case 'process':
                return '#6366f1';
              case 'dataSink':
                return '#10b981';
              case 'agent':
                return '#f97316';
              case 'database':
                return '#06b6d4';
              default:
                return '#94a3b8';
            }
          }}
        />
        <Background color="#cbd5e1" gap={20} size={1} />

        {/* 뷰 선택 패널 */}
        <Panel position="top-right" className="!m-3">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Activity className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-bold text-slate-700">뷰 선택</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '전체 보기' },
                { id: 'production', label: '생산 라인' },
                { id: 'agents', label: 'AI Agent' },
                { id: 'data', label: '데이터 흐름' },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => handleViewChange(view.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedView === view.id
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                    }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            {/* 범례 */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 mb-2 block">범례</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500 shadow-sm"></span>
                  <span className="text-slate-600 font-medium">원자재</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-indigo-500 shadow-sm"></span>
                  <span className="text-slate-600 font-medium">공정</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500 shadow-sm"></span>
                  <span className="text-slate-600 font-medium">완제품</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-orange-500 shadow-sm"></span>
                  <span className="text-slate-600 font-medium">AI Agent</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-cyan-500 shadow-sm"></span>
                  <span className="text-slate-600 font-medium">데이터베이스</span>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}