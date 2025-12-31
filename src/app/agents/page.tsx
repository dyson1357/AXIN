"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Play, Pause, RefreshCw, Settings, Info, Plus, Cpu, Server, MessageSquare, BarChart, Clock, ArrowRight } from 'lucide-react';

// Agent data
const agentData = [
  {
    id: 'agent-001',
    name: 'Production Optimization Agent',
    status: 'active',
    type: 'optimizer',
    description: 'Optimizes production line work schedules and improves productivity.',
    metrics: {
      uptime: '99.8%',
      lastExecution: '3 minutes ago',
      accuracy: '94.2%',
      tasks: 152
    },
    capabilities: ['Scheduling', 'Line Balancing', 'Efficiency Analysis'],
    connections: ['설비 모니터링', '품질 관리']
  },
  {
    id: 'agent-002',
    name: 'Quality Monitoring Agent',
    status: 'active',
    type: 'monitor',
    description: 'Monitors product quality in real-time and predicts quality issues.',
    metrics: {
      uptime: '99.5%',
      lastExecution: '1 minute ago',
      accuracy: '96.7%',
      tasks: 289
    },
    capabilities: ['Image Analysis', 'Pattern Recognition', 'Quality Prediction'],
    connections: ['설비 모니터링', '보고서 생성']
  },
  {
    id: 'agent-003',
    name: 'Predictive Maintenance Agent',
    status: 'paused',
    type: 'maintenance',
    description: 'Predicts equipment failures and optimizes maintenance schedules.',
    metrics: {
      uptime: '95.2%',
      lastExecution: '3 hours ago',
      accuracy: '91.8%',
      tasks: 78
    },
    capabilities: ['Failure Prediction', 'Maintenance Schedule', 'Component Life Prediction'],
    connections: ['설비 모니터링', '재고 관리']
  },
  {
    id: 'agent-004',
    name: 'Energy Optimization Agent',
    status: 'active',
    type: 'optimizer',
    description: 'Monitors and optimizes factory energy consumption.',
    metrics: {
      uptime: '99.1%',
      lastExecution: '15 minutes ago',
      accuracy: '93.5%',
      tasks: 124
    },
    capabilities: ['Energy Monitoring', 'Consumption Optimization', 'Peak Load Management'],
    connections: ['설비 모니터링', '환경 센서']
  },
  {
    id: 'agent-005',
    name: 'Material Planning Agent',
    status: 'updating',
    type: 'planner',
    description: 'Predicts material consumption and optimizes purchase schedules.',
    metrics: {
      uptime: '97.3%',
      lastExecution: '1 hour ago',
      accuracy: '89.4%',
      tasks: 103
    },
    capabilities: ['Demand Forecasting', 'Inventory Optimization', 'Supply Chain Management'],
    connections: ['생산 계획', 'ERP 시스템']
  },
  {
    id: 'agent-006',
    name: 'Chatbot Agent',
    status: 'active',
    type: 'assistant',
    description: 'Answers employee questions and provides information.',
    metrics: {
      uptime: '99.9%',
      lastExecution: '1 minute ago',
      accuracy: '87.2%',
      tasks: 532
    },
    capabilities: ['Natural Language Processing', 'Information Retrieval', 'Inquiry Processing'],
    connections: ['지식 데이터베이스', '이슈 추적 시스템']
  }
];

// System metrics
const systemMetrics = {
  activeAgents: 4,
  totalAgents: 6,
  tasksToday: 1278,
  avgResponseTime: '0.8s',
  avgAccuracy: '92.1%'
};

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // 선택된 에이전트 정보
  const selectedAgentData = agentData.find(a => a.id === selectedAgent);
  
  // 필터된 에이전트
  const filteredAgents = activeTab === 'all' 
    ? agentData 
    : agentData.filter(a => a.status === activeTab);
  
  // 에이전트 유형별 색상
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'optimizer': return 'bg-blue-100 text-blue-800';
      case 'monitor': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-amber-100 text-amber-800';
      case 'planner': return 'bg-purple-100 text-purple-800';
      case 'assistant': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  // 상태별 아이콘 및 색상
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'active':
        return { 
          icon: <Play className="h-3 w-3" />, 
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Active'
        };
      case 'paused':
        return { 
          icon: <Pause className="h-3 w-3" />, 
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          label: 'Paused'
        };
      case 'updating':
        return { 
          icon: <RefreshCw className="h-3 w-3 animate-spin" />, 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Updating'
        };
      default:
        return { 
          icon: <Info className="h-3 w-3" />, 
          color: 'bg-slate-100 text-slate-800 border-slate-200',
          label: 'Unknown'
        };
    }
  };
  
  return (
    <MainLayout>
      <div className="col-span-12 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bot className="h-6 w-6 text-[#EB6100]" />
              AI Agents
            </h1>
            <p className="text-slate-500 mt-1">Intelligent agent monitoring and management</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button className="gap-1.5 bg-[#EB6100] text-white hover:bg-[#EB6100]/90" size="sm">
              <Plus className="h-4 w-4" />
              New Agent
            </Button>
          </div>
        </div>
        
        {/* 시스템 메트릭 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500 mb-1">Active Agents</div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <Bot className="h-4 w-4 text-green-500" />
                {systemMetrics.activeAgents}/{systemMetrics.totalAgents}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500 mb-1">Tasks Processed Today</div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <Cpu className="h-4 w-4 text-blue-500" />
                {systemMetrics.tasksToday}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500 mb-1">Avg Response Time</div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <Clock className="h-4 w-4 text-amber-500" />
                {systemMetrics.avgResponseTime}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500 mb-1">Avg Accuracy</div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <BarChart className="h-4 w-4 text-indigo-500" />
                {systemMetrics.avgAccuracy}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500 mb-1">AI Infrastructure Status</div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <Server className="h-4 w-4 text-green-500" />
                Normal
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 에이전트 필터 */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            className={`px-3 py-1 cursor-pointer ${activeTab === 'all' ? 'bg-[#EB6100] hover:bg-[#EB6100]/90 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('all')}
          >
            All Agents
          </Badge>
          <Badge 
            className={`px-3 py-1 cursor-pointer ${activeTab === 'active' ? 'bg-[#EB6100] hover:bg-[#EB6100]/90 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('active')}
          >
            활성화
          </Badge>
          <Badge 
            className={`px-3 py-1 cursor-pointer ${activeTab === 'paused' ? 'bg-[#EB6100] hover:bg-[#EB6100]/90 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('paused')}
          >
            일시정지
          </Badge>
          <Badge 
            className={`px-3 py-1 cursor-pointer ${activeTab === 'updating' ? 'bg-[#EB6100] hover:bg-[#EB6100]/90 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('updating')}
          >
            업데이트 중
          </Badge>
        </div>
        
        {/* 에이전트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const statusInfo = getStatusInfo(agent.status);
            
            return (
              <motion.div 
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`overflow-hidden hover:border-[#EB6100] transition-all cursor-pointer ${selectedAgent === agent.id ? 'ring-2 ring-[#EB6100]' : ''}`}
                  onClick={() => setSelectedAgent(agent.id === selectedAgent ? null : agent.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1.5">
                        <Badge className={getTypeColor(agent.type)} variant="secondary">
                          {agent.type}
                        </Badge>
                        <CardTitle className="flex items-center gap-1.5">
                          {agent.name}
                          <Badge className={`text-xs flex items-center gap-1 ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </Badge>
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                      {agent.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Uptime:</span>
                        <span className="font-medium">{agent.metrics.uptime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Last Execution:</span>
                        <span className="font-medium">{agent.metrics.lastExecution}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Accuracy:</span>
                        <span className="font-medium">{agent.metrics.accuracy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Tasks Processed:</span>
                        <span className="font-medium">{agent.metrics.tasks}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-6 flex gap-2">
                    {agent.status === 'active' ? (
                      <Button variant="outline" size="sm" className="w-full">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="h-4 w-4 mr-1" />
                        활성화
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="w-1/2">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {/* 에이전트 상세 정보 */}
        {selectedAgent && selectedAgentData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  {selectedAgentData.name} Details
                  <Badge className={getTypeColor(selectedAgentData.type)}>
                    {selectedAgentData.type}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  ID: {selectedAgentData.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Agent Description</h4>
                      <p className="text-slate-700">{selectedAgentData.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Performance Metrics</h4>
                      <div className="bg-slate-50 p-4 rounded-lg grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Uptime</p>
                          <p className="text-lg font-bold">{selectedAgentData.metrics.uptime}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Last Execution</p>
                          <p className="text-lg font-bold">{selectedAgentData.metrics.lastExecution}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Accuracy</p>
                          <p className="text-lg font-bold">{selectedAgentData.metrics.accuracy}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Tasks Processed</p>
                          <p className="text-lg font-bold">{selectedAgentData.metrics.tasks}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Capabilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAgentData.capabilities.map((capability, index) => (
                          <Badge key={index} variant="outline">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Connections</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAgentData.connections.map((connection, index) => (
                          <Badge key={index} variant="secondary">
                            {connection}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 flex flex-col h-full">
                    <h4 className="text-sm font-medium mb-2">Recent Conversation</h4>
                    <div className="flex-1 border rounded-lg bg-white p-4 space-y-4 mb-4 overflow-y-auto max-h-[300px]">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                          U
                        </div>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm">
                          <p>Please show the optimization results for today's production schedule.</p>
                          <p className="text-xs text-slate-500 mt-1">Today 10:42 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EB6100] flex items-center justify-center text-white shrink-0">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-[#FFF4ED] rounded-lg p-3 text-sm">
                          <p>I've analyzed today's production schedule. The optimization results show a 15.3% more efficient alternative than the current schedule. Key improvements include:</p>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Change in operation sequence for Equipment 1 and 3</li>
                            <li>Task rearrangement around lunch time</li>
                            <li>Optimization of cleaning and preparation time</li>
                          </ul>
                          <p className="mt-2">Would you like to see the detailed schedule?</p>
                          <p className="text-xs text-slate-500 mt-1">Today 10:43 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                          U
                        </div>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm">
                          <p>Yes, I'd like to see the detailed schedule. Please show it by time period.</p>
                          <p className="text-xs text-slate-500 mt-1">Today 10:44 AM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter message..." 
                        className="flex-1 h-10 rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EB6100] focus:border-transparent"
                      />
                      <Button size="sm" className="bg-[#EB6100] hover:bg-[#EB6100]/90">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
} 