"use client"

import React, { useState } from 'react';
import { Bot, Calendar, Check, Clock, Cpu, AlertCircle, BarChart3, RefreshCw, Filter, ChevronRight, ArrowDownUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Agent activity data
const agentActivities = [
  {
    id: 1,
    agentId: 'A-001',
    agentName: 'Quality Inspection Agent',
    action: 'Quality Analysis Complete',
    result: 'success',
    timestamp: '2023-06-10T10:23:45',
    details: 'Analyzed 150 product samples, 99.2% match to quality standards',
    metrics: {
      accuracy: 99.2,
      processTime: 12.5,
      resourceUsage: 34.2
    }
  },
  {
    id: 2,
    agentId: 'A-002',
    agentName: 'Production Optimization Agent',
    action: 'Production Line Optimization',
    result: 'success',
    timestamp: '2023-06-10T10:18:32',
    details: 'Adjusted conveyor speed, production volume increased by 5.7%',
    metrics: {
      accuracy: 96.5,
      processTime: 8.2,
      resourceUsage: 28.7
    }
  },
  {
    id: 3,
    agentId: 'A-003',
    agentName: 'Maintenance Planning Agent',
    action: 'Equipment Status Analysis',
    result: 'warning',
    timestamp: '2023-06-10T10:15:17',
    details: 'Detected low lubricant in Extruder #2, maintenance schedule created',
    metrics: {
      accuracy: 92.8,
      processTime: 15.3,
      resourceUsage: 45.1
    }
  },
  {
    id: 4,
    agentId: 'A-001',
    agentName: 'Quality Inspection Agent',
    action: 'Anomaly Detected',
    result: 'error',
    timestamp: '2023-06-10T10:12:04',
    details: 'Detected temperature variation in injection mold, action request issued',
    metrics: {
      accuracy: 98.7,
      processTime: 3.6,
      resourceUsage: 22.9
    }
  },
  {
    id: 5,
    agentId: 'A-004',
    agentName: 'Inventory Management Agent',
    action: 'Inventory Optimization',
    result: 'success',
    timestamp: '2023-06-10T10:08:51',
    details: 'Optimized raw material order schedule, storage costs reduced by 8.2%',
    metrics: {
      accuracy: 97.1,
      processTime: 42.8,
      resourceUsage: 31.5
    }
  },
  {
    id: 6,
    agentId: 'A-005',
    agentName: 'Energy Efficiency Agent',
    action: 'Energy Consumption Analysis',
    result: 'success',
    timestamp: '2023-06-10T10:05:23',
    details: 'Identified energy savings opportunities, potential 12% reduction in power usage',
    metrics: {
      accuracy: 94.3,
      processTime: 18.7,
      resourceUsage: 29.8
    }
  },
  {
    id: 7,
    agentId: 'A-002',
    agentName: 'Production Optimization Agent',
    action: 'Schedule Adjustment',
    result: 'success',
    timestamp: '2023-06-10T10:01:15',
    details: 'Optimized production schedule for next shift, reduced idle time by 15%',
    metrics: {
      accuracy: 95.6,
      processTime: 9.4,
      resourceUsage: 26.3
    }
  },
  {
    id: 8,
    agentId: 'A-006',
    agentName: 'Safety Monitoring Agent',
    action: 'Safety Protocol Check',
    result: 'warning',
    timestamp: '2023-06-10T09:58:42',
    details: 'Detected minor safety compliance issue in Zone B, recommendation issued',
    metrics: {
      accuracy: 98.9,
      processTime: 6.2,
      resourceUsage: 19.4
    }
  },
  {
    id: 9,
    agentId: 'A-001',
    agentName: 'Quality Inspection Agent',
    action: 'Batch Quality Report',
    result: 'success',
    timestamp: '2023-06-10T09:55:30',
    details: 'Completed quality report for batch #1245, all parameters within normal range',
    metrics: {
      accuracy: 99.5,
      processTime: 11.3,
      resourceUsage: 32.1
    }
  },
  {
    id: 10,
    agentId: 'A-003',
    agentName: 'Maintenance Planning Agent',
    action: 'Predictive Maintenance Alert',
    result: 'warning',
    timestamp: '2023-06-10T09:52:18',
    details: 'Predicted maintenance needed for Cooling Unit #3 within 48 hours',
    metrics: {
      accuracy: 93.7,
      processTime: 20.5,
      resourceUsage: 38.6
    }
  },
  {
    id: 11,
    agentId: 'A-004',
    agentName: 'Inventory Management Agent',
    action: 'Stock Level Monitoring',
    result: 'success',
    timestamp: '2023-06-10T09:48:55',
    details: 'All inventory levels within optimal range, no restocking required',
    metrics: {
      accuracy: 96.8,
      processTime: 5.1,
      resourceUsage: 24.7
    }
  },
  {
    id: 12,
    agentId: 'A-007',
    agentName: 'Process Control Agent',
    action: 'Temperature Regulation',
    result: 'success',
    timestamp: '2023-06-10T09:45:12',
    details: 'Maintained optimal temperature range in Injection Molding Machine #1',
    metrics: {
      accuracy: 97.4,
      processTime: 4.8,
      resourceUsage: 21.3
    }
  }
];

// 에이전트 성능 데이터
const agentPerformance = [
  {
    agentId: 'A-001',
    agentName: 'Quality Inspection Agent',
    status: 'active',
    tasks: 254,
    successRate: 98.2,
    averageProcessTime: 14.7,
    lastActive: '2023-06-10T10:23:45',
    cpuUsage: 42,
    memoryUsage: 38
  },
  {
    agentId: 'A-002',
    agentName: 'Production Optimization Agent',
    status: 'active',
    tasks: 187,
    successRate: 96.5,
    averageProcessTime: 22.3,
    lastActive: '2023-06-10T10:18:32',
    cpuUsage: 56,
    memoryUsage: 45
  },
  {
    agentId: 'A-003',
    agentName: 'Maintenance Planning Agent',
    status: 'warning',
    tasks: 129,
    successRate: 92.8,
    averageProcessTime: 30.1,
    lastActive: '2023-06-10T10:15:17',
    cpuUsage: 67,
    memoryUsage: 61
  },
  {
    agentId: 'A-004',
    agentName: 'Inventory Management Agent',
    status: 'active',
    tasks: 146,
    successRate: 97.3,
    averageProcessTime: 18.5,
    lastActive: '2023-06-10T10:08:51',
    cpuUsage: 48,
    memoryUsage: 42
  }
];

// 상태별 색상 클래스
const statusColors: Record<string, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  active: 'bg-blue-100 text-blue-800',
  inactive: 'bg-gray-100 text-gray-800'
};

// 심플 프로그레스 바 컴포넌트
const SimpleProgressBar = ({ value, className = "" }: { value: number, className?: string }) => (
  <div className={`relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden ${className}`}>
    <div 
      className="h-full bg-indigo-500 rounded-full"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

// Timestamp formatting function (Las Vegas - Pacific Time)
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  }).format(date);
};

// 에이전트 활동 아이템 컴포넌트 - 단순화
const ActivityItem = ({ activity }: { activity: typeof agentActivities[0] }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="mb-3 border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
            ${activity.result === 'success' ? 'bg-green-100' : 
              activity.result === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
            {activity.result === 'success' && <Check className="h-4 w-4 text-green-600" />}
            {activity.result === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
            {activity.result === 'error' && <AlertCircle className="h-4 w-4 text-red-600" />}
          </div>
          
          <div>
            <div className="font-medium">{activity.action}</div>
            <div className="text-xs text-gray-500">{activity.agentName}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">{formatTimestamp(activity.timestamp)}</span>
          <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t bg-gray-50">
          <div className="text-sm mb-4">{activity.details}</div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Accuracy</div>
              <div className="flex items-center">
                <SimpleProgressBar value={activity.metrics.accuracy} className="mr-2" />
                <span className="text-sm font-medium">{activity.metrics.accuracy}%</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Process Time</div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                <span className="text-sm font-medium">{activity.metrics.processTime}s</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Resource Usage</div>
              <div className="flex items-center">
                <Cpu className="h-3 w-3 mr-1 text-gray-500" />
                <span className="text-sm font-medium">{activity.metrics.resourceUsage}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 에이전트 성능 카드 컴포넌트 - 개선됨
const AgentPerformanceCard = ({ agent }: { agent: typeof agentPerformance[0] }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
              ${agent.status === 'active' ? 'bg-blue-100' : 
                agent.status === 'warning' ? 'bg-yellow-100' : 
                agent.status === 'error' ? 'bg-red-100' : 'bg-gray-100'}`}>
              <Bot className={`h-4 w-4 
                ${agent.status === 'active' ? 'text-blue-600' : 
                  agent.status === 'warning' ? 'text-yellow-600' : 
                  agent.status === 'error' ? 'text-red-600' : 'text-gray-600'}`} />
            </div>
            <CardTitle className="text-base font-medium">{agent.agentName}</CardTitle>
          </div>
          <Badge className={
            agent.status === 'active' ? statusColors.active :
            agent.status === 'warning' ? statusColors.warning :
            agent.status === 'error' ? statusColors.error :
            statusColors.inactive
          }>
            {agent.status === 'active' ? 'Active' : 
             agent.status === 'warning' ? 'Warning' : 
             agent.status === 'error' ? 'Error' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Success Rate</div>
            <div className="flex items-center">
              <SimpleProgressBar value={agent.successRate} className="mr-2" />
              <span className="text-sm font-medium">{agent.successRate}%</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Tasks Processed</div>
            <span className="text-sm font-medium">{agent.tasks.toLocaleString()}</span>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Avg Process Time</div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-sm font-medium">{agent.averageProcessTime}s</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Last Active</div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-sm font-medium">{formatTimestamp(agent.lastActive)}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">CPU Usage</div>
              <div className="flex items-center">
                <SimpleProgressBar 
                  value={agent.cpuUsage} 
                  className={
                    agent.cpuUsage > 80 ? "bg-red-100" : 
                    agent.cpuUsage > 60 ? "bg-yellow-100" : "bg-blue-100"
                  }
                />
                <span className="text-sm font-medium ml-2">{agent.cpuUsage}%</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Memory Usage</div>
              <div className="flex items-center">
                <SimpleProgressBar 
                  value={agent.memoryUsage} 
                  className={
                    agent.memoryUsage > 80 ? "bg-red-100" : 
                    agent.memoryUsage > 60 ? "bg-yellow-100" : "bg-blue-100"
                  }
                />
                <span className="text-sm font-medium ml-2">{agent.memoryUsage}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AgentActivityBoard() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [activeTab, setActiveTab] = useState('activities');
  
  // 활동 로그 필터링 및 정렬
  const filteredActivities = agentActivities
    .filter(activity => activeFilter === 'all' || activity.result === activeFilter)
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col min-h-0">
        <div className="px-4 pt-2 pb-0 bg-white border-b flex-shrink-0">
          <TabsList className="w-full justify-start bg-transparent h-auto p-0">
            <TabsTrigger 
              value="activities"
              className="py-3 px-4 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none"
            >
              <Clock className="h-4 w-4 mr-2" />
              Activity Log
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="py-3 px-4 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Metrics
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="activities" className="flex-1 overflow-hidden flex flex-col mt-0 p-0 min-h-0">
          <div className="py-3 px-4 flex items-center justify-between bg-white border-b flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Button 
                variant={activeFilter === 'all' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('all')}
                className="h-8 text-xs"
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'success' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('success')}
                className="h-8 text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Success
              </Button>
              <Button 
                variant={activeFilter === 'warning' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('warning')}
                className="h-8 text-xs"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Warning
              </Button>
              <Button 
                variant={activeFilter === 'error' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('error')}
                className="h-8 text-xs"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Error
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="h-8 text-xs flex items-center"
            >
              <ArrowDownUp className="h-3 w-3 mr-1" />
              {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {filteredActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Filter className="h-10 w-10 mb-2 opacity-50" />
                <p>No activities match the filter criteria.</p>
              </div>
            ) : (
              filteredActivities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="flex-1 overflow-y-auto mt-0 p-4 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agentPerformance.map(agent => (
              <AgentPerformanceCard key={agent.agentId} agent={agent} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 