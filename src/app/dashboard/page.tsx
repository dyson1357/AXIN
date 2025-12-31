"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  Bell,
  PanelRight,
  X,
  ChevronRight,
  ExternalLink,
  Zap,
  Sparkles,
  Bot,
  Cpu,
  MemoryStick,
  Wifi,
  Calendar,
  Package,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  MoreHorizontal,
  Settings,
  Download,
  Filter,
  RefreshCw,
  Target,
  Wrench,
  ThermometerSun,
  Droplets,
  Wind,
  Timer,
  Users,
  MessageSquare,
  Layers,
  CircleDot,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// 컴포넌트 import
import ChatAgentPanel from '@/components/ChatAgentPanel';
import AgentMap from '@/components/AgentMap';
import AgentActivityBoard from '@/components/AgentActivityBoard';
import ProcessFlowMap from '@/components/ProcessFlowMap';
import ManufacturingProcessFlow from '@/components/ManufacturingProcessFlow';

// ===== 실제 제조 현장 데이터 =====

// 실시간 생산 데이터 (시뮬레이션)
const generateProductionData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      Output: Math.floor(850 + Math.random() * 150),
      Quality: Math.floor(96 + Math.random() * 4),
      Uptime: Math.floor(90 + Math.random() * 10),
    });
  }
  return data;
};

// Equipment status data
const machineStatus = [
  { id: 'EQ-001', name: 'Extruder #1', status: 'online', uptime: '98.7%', temp: '185°C', health: 95, line: 'Line A' },
  { id: 'EQ-002', name: 'Extruder #2', status: 'online', uptime: '99.1%', temp: '182°C', health: 98, line: 'Line A' },
  { id: 'EQ-003', name: 'Injection Molder #1', status: 'warning', uptime: '95.2%', temp: '210°C', health: 72, line: 'Line B' },
  { id: 'EQ-004', name: 'Assembly Line', status: 'online', uptime: '97.8%', temp: '25°C', health: 89, line: 'Line C' },
  { id: 'EQ-005', name: 'Packaging Unit', status: 'maintenance', uptime: '92.4%', temp: '-', health: 65, line: 'Line D' },
  { id: 'EQ-006', name: 'CNC Machine', status: 'online', uptime: '96.5%', temp: '45°C', health: 91, line: 'Line E' },
];

// Notification data
const notifications = [
  { id: 1, type: 'warning', title: 'Temperature Alert', message: 'Injection Molder #1 mold temp rising (210°C)', time: '10m ago', isNew: true },
  { id: 2, type: 'success', title: 'Target Achieved', message: 'Line A daily production target 100% met', time: '32m ago', isNew: true },
  { id: 3, type: 'info', title: 'Maintenance Due', message: 'Extruder #2 preventive maintenance D-3', time: '1h ago', isNew: false },
  { id: 4, type: 'error', title: 'Equipment Stopped', message: 'Packaging Unit under maintenance', time: '2h ago', isNew: false },
];

// AI Agent status
const agentStats = {
  activeAgents: 8,
  totalAgents: 12,
  tasksCompleted: 1247,
  avgResponseTime: '0.8s',
  accuracy: 99.2,
};

// Production summary
const productionSummary = {
  today: { target: 12000, actual: 11580, rate: 96.5 },
  defectRate: 0.42,
  oee: 87.3,
  energyUsage: 2847,
};

export default function Page() {
  const [showChatAgent, setShowChatAgent] = useState(false);
  const [minimizedChat, setMinimizedChat] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [productionData, setProductionData] = useState<ReturnType<typeof generateProductionData>>([]);
  const [timeRange, setTimeRange] = useState<'1H' | '6H' | '24H' | '7D'>('24H');
  const [isLive, setIsLive] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'Output' | 'Quality' | 'Uptime'>('Output');

  // Initialize after client mount
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    setProductionData(generateProductionData());
  }, []);

  // 실시간 시간 업데이트
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  // 실시간 데이터 업데이트 시뮬레이션
  useEffect(() => {
    if (!isLive || !mounted) return;
    const dataTimer = setInterval(() => {
      setProductionData(generateProductionData());
    }, 30000);
    return () => clearInterval(dataTimer);
  }, [isLive, mounted]);

  // Time-based greeting
  const getGreeting = () => {
    if (!currentTime) return 'Hello';
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-pretendard">
      {/* 대시보드 콘텐츠 */}
      <div className="p-6 space-y-6">

        {/* ===== 헤더 섹션 ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                {getGreeting()}, <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Admin</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  System Normal
                </span>
                {isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    <CircleDot className="w-3 h-3" />
                    Live
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {formatDate(currentTime)}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Real-time Toggle */}
            <button
              onClick={() => setIsLive(!isLive)}
              className={`p-2.5 rounded-xl transition-all ${isLive
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              title={isLive ? 'Real-time Monitoring' : 'Paused'}
            >
              {isLive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            {/* Download Report */}
            <button
              className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
              title="Download Report"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* AI Agent Status */}
            <button
              className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
              title="AI Agent Status"
            >
              <Bot className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* ===== Production Summary Banner ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 rounded-2xl p-5 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Today's Output</p>
              <p className="text-3xl font-bold text-white">{productionSummary.today.actual.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-1">
                Target {productionSummary.today.target.toLocaleString()} units
                <span className="text-emerald-400 font-semibold ml-1">{productionSummary.today.rate}%</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Defect Rate</p>
              <p className="text-3xl font-bold text-emerald-400">{productionSummary.defectRate}%</p>
              <p className="text-sm text-slate-400 mt-1">Target ≤ 0.5%</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">OEE</p>
              <p className="text-3xl font-bold text-blue-400">{productionSummary.oee}%</p>
              <p className="text-sm text-slate-400 mt-1">World-Class 85%+</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Energy Usage</p>
              <p className="text-3xl font-bold text-amber-400">{productionSummary.energyUsage.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-1">kWh (-3.2% vs yesterday)</p>
            </div>
          </div>
        </motion.div>

        {/* ===== KPI Card Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <KpiCard
            title="Production Efficiency"
            value={98.2}
            unit="%"
            change={2.1}
            isPositive={true}
            icon={<Target className="w-5 h-5" />}
            color="blue"
            sparklineData={[92, 94, 93, 96, 95, 97, 98, 97, 99, 98.2]}
            subLabel="vs Yesterday"
          />
          <KpiCard
            title="Quality Pass Rate"
            value={99.58}
            unit="%"
            change={0.12}
            isPositive={true}
            icon={<CheckCircle className="w-5 h-5" />}
            color="emerald"
            sparklineData={[99.2, 99.3, 99.4, 99.3, 99.5, 99.4, 99.5, 99.6, 99.5, 99.58]}
            subLabel="vs Yesterday"
          />
          <KpiCard
            title="Equipment Uptime"
            value={96.8}
            unit="%"
            change={-1.3}
            isPositive={false}
            icon={<Gauge className="w-5 h-5" />}
            color="violet"
            sparklineData={[98, 97, 99, 98, 97, 96, 95, 97, 96, 96.8]}
            subLabel="vs Yesterday"
          />
          <KpiCard
            title="AI Agents Active"
            value={agentStats.activeAgents}
            unit={`/${agentStats.totalAgents}`}
            change={agentStats.accuracy}
            isPositive={true}
            icon={<Bot className="w-5 h-5" />}
            color="orange"
            sparklineData={[5, 6, 7, 6, 8, 7, 8, 9, 8, 8]}
            isCount={true}
            subLabel="Accuracy"
          />
        </div>

        {/* ===== Main Chart Section ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Real-time Production Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Real-time Production</h3>
                <p className="text-sm text-slate-500 mt-0.5">Hourly Output, Quality & Uptime Trends</p>
              </div>
              <div className="flex items-center gap-2">
                {(['1H', '6H', '24H', '7D'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${timeRange === range
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {range}
                  </button>
                ))}
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors ml-1">
                  <RefreshCw className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-5">
              {/* Metric Selection Tab */}
              <div className="flex items-center gap-4 mb-4">
                {(['Output', 'Quality', 'Uptime'] as const).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedMetric === metric
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${metric === 'Output' ? 'bg-blue-500' :
                      metric === 'Quality' ? 'bg-emerald-500' : 'bg-orange-500'
                      }`}></span>
                    {metric}
                  </button>
                ))}
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={productionData}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={
                          selectedMetric === 'Output' ? '#3b82f6' :
                            selectedMetric === 'Quality' ? '#10b981' : '#f97316'
                        } stopOpacity={0.15} />
                        <stop offset="95%" stopColor={
                          selectedMetric === 'Output' ? '#3b82f6' :
                            selectedMetric === 'Quality' ? '#10b981' : '#f97316'
                        } stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      stroke="#e2e8f0"
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      stroke="#e2e8f0"
                      tickLine={false}
                      axisLine={false}
                      domain={selectedMetric === 'Output' ? [700, 1100] : [85, 101]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
                        padding: '12px'
                      }}
                      labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke={
                        selectedMetric === 'Output' ? '#3b82f6' :
                          selectedMetric === 'Quality' ? '#10b981' : '#f97316'
                      }
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorMetric)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* AI Agent Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-800">AI Agent Status</h3>
                <p className="text-sm text-slate-500 mt-0.5">Real-time Collaboration & Tasks</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Settings className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="p-5">
              {/* Agent Statistics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-orange-500 rounded-lg shadow-sm">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-orange-700">Active Agents</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{agentStats.activeAgents}<span className="text-sm font-medium text-slate-400">/{agentStats.totalAgents}</span></p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-blue-500 rounded-lg shadow-sm">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-blue-700">Tasks Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{agentStats.tasksCompleted.toLocaleString()}</p>
                </div>
              </div>

              {/* Real-time Agent Activity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Live Activity</span>
                  <span className="text-xs text-slate-400">Response: {agentStats.avgResponseTime}</span>
                </div>
                <div className="space-y-2">
                  {[
                    { agent: 'Quality AI', action: 'Anomaly pattern analysis complete', time: 'Just now', status: 'success', icon: '🔍' },
                    { agent: 'Predictive AI', action: 'EQ-003 maintenance prediction alert', time: '2m ago', status: 'warning', icon: '⚠️' },
                    { agent: 'Production AI', action: 'Optimizing production schedule', time: '5m ago', status: 'running', icon: '⚡' },
                    { agent: 'Energy AI', action: 'Energy consumption analysis done', time: '12m ago', status: 'success', icon: '🔋' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                      <span className="text-lg">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{activity.agent}</p>
                        <p className="text-xs text-slate-500 truncate">{activity.action}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${activity.status === 'success' ? 'bg-emerald-500' :
                          activity.status === 'warning' ? 'bg-amber-500' :
                            'bg-blue-500 animate-pulse'
                          }`}></span>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== AI Agent Network with Status Cards ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Agent Network - 2/3 width */}
          <div className="lg:col-span-2">
            <DashboardCard
              title="AI Agent Network"
              subtitle="Real-time Agent Communication Status"
              icon={<Users className="w-4 h-4" />}
            >
              <div className="h-[640px] rounded-xl overflow-hidden">
                <AgentMap />
              </div>
            </DashboardCard>
          </div>

          {/* Agent Status Cards - 1/3 width */}
          <div className="flex flex-col gap-4">
            {/* Active Agents */}
            <DashboardCard
              title="Agent Status"
              subtitle="Real-time monitoring"
              icon={<Activity className="w-4 h-4" />}
            >
              <div className="space-y-2">
                {[
                  { name: 'Quality Agent', status: 'active', task: 'Batch inspection', efficiency: 98 },
                  { name: 'Production Agent', status: 'active', task: 'Line monitoring', efficiency: 99 },
                  { name: 'Maintenance Agent', status: 'warning', task: 'PM scheduling', efficiency: 94 },
                  { name: 'Energy Agent', status: 'active', task: 'Load optimization', efficiency: 96 },
                  { name: 'Inventory Agent', status: 'active', task: 'Stock tracking', efficiency: 97 },
                  { name: 'Data Agent', status: 'active', task: 'Processing reports', efficiency: 99 },
                ].map((agent, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{agent.name}</p>
                      <p className="text-xs text-slate-500 truncate">{agent.task}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{agent.efficiency}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Agent Communication */}
            <DashboardCard
              title="Recent Activity"
              subtitle="Agent collaboration"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              <div className="space-y-2">
                {[
                  { from: 'Quality', to: 'Production', action: 'Inspection complete', time: '2m' },
                  { from: 'Maintenance', to: 'Energy', action: 'PM scheduled', time: '5m' },
                  { from: 'Data', to: 'Central', action: 'Report sent', time: '8m' },
                  { from: 'Inventory', to: 'Production', action: 'Stock alert', time: '12m' },
                ].map((comm, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-xs">
                    <span className="font-medium text-slate-700">{comm.from}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span className="font-medium text-slate-700">{comm.to}</span>
                    <span className="ml-auto text-slate-400">{comm.time}</span>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* ===== Bottom Section: Equipment Status, Notifications ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Equipment Status Table */}
          <div className="lg:col-span-2">
            <DashboardCard
              title="Equipment Status"
              subtitle="Real-time Equipment Health & Status"
              icon={<Wrench className="w-4 h-4" />}
              action={<button className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                Details <ChevronRight className="w-3 h-3" />
              </button>}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Equipment</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Line</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Temp</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Health</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Uptime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {machineStatus.map((machine) => (
                      <tr key={machine.id} className="hover:bg-orange-50/50 transition-colors cursor-pointer group">
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 font-mono">{machine.id}</span>
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">{machine.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-slate-600">{machine.line}</td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <StatusBadge status={machine.status} />
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className={`text-sm font-medium ${machine.status === 'warning' ? 'text-amber-600' : 'text-slate-600'
                            }`}>{machine.temp}</span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${machine.health >= 90 ? 'bg-emerald-500' :
                                  machine.health >= 70 ? 'bg-amber-500' :
                                    'bg-red-500'
                                  }`}
                                style={{ width: `${machine.health}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-bold ${machine.health >= 90 ? 'text-emerald-600' :
                              machine.health >= 70 ? 'text-amber-600' :
                                'text-red-600'
                              }`}>{machine.health}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-sm font-semibold text-slate-700">{machine.uptime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </div>

          {/* Notification Panel */}
          <div>
            <DashboardCard
              title={
                <div className="flex items-center gap-2">
                  <span>Notifications</span>
                  <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full text-xs font-bold bg-red-500 text-white px-1.5 shadow-sm">
                    {notifications.filter(n => n.isNew).length}
                  </span>
                </div>
              }
              subtitle="Real-time Events & Alerts"
              icon={<Bell className="w-4 h-4" />}
            >
              <div className="space-y-2 max-h-[360px] overflow-y-auto scrollbar-hide">
                {notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all hover:shadow-md ${notif.isNew
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 shadow-sm'
                      : 'bg-slate-50 border border-transparent hover:border-slate-200'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <NotificationIcon type={notif.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800">{notif.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                        <p className="text-xs text-slate-400 mt-1.5 font-medium">{notif.time}</p>
                      </div>
                      {notif.isNew && (
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100">
                <button className="w-full py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
                  View All Notifications
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* ===== System Resources Monitor ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700">System Resources</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Last Updated: {formatTime(currentTime)}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ResourceGauge label="CPU" value={42} icon={<Cpu className="w-4 h-4" />} color="blue" />
            <ResourceGauge label="Memory" value={68} icon={<MemoryStick className="w-4 h-4" />} color="violet" />
            <ResourceGauge label="Network" value={23} icon={<Wifi className="w-4 h-4" />} color="emerald" />
            <ResourceGauge label="Storage" value={71} icon={<Package className="w-4 h-4" />} color="orange" />
          </div>
        </motion.div>
      </div>

      {/* 채널톡 스타일 챗봇 (우측 하단에 고정) */}
      <AnimatePresence>
        {!showChatAgent && !minimizedChat && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowChatAgent(true)}
            className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/30 flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all z-50 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {minimizedChat && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setMinimizedChat(false);
            setShowChatAgent(true);
          }}
          className="fixed right-6 bottom-6 max-w-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-full shadow-xl shadow-orange-500/30 flex items-center cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all z-50"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">Manufacturing AI Assistant</span>
        </motion.div>
      )}

      {/* Chatbot Panel */}
      <AnimatePresence>
        {showChatAgent && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="fixed right-6 bottom-6 w-[400px] h-[540px] bg-white rounded-2xl shadow-2xl shadow-slate-900/15 overflow-hidden z-50 flex flex-col border border-slate-200"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Manufacturing AI Assistant</h3>
                  <p className="text-xs text-orange-100">AXIN Manufacturing Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setShowChatAgent(false);
                    setMinimizedChat(true);
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
                  aria-label="Minimize"
                >
                  <PanelRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowChatAgent(false);
                    setMinimizedChat(false);
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatAgentPanel onClose={() => {
                setShowChatAgent(false);
                setMinimizedChat(false);
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== 컴포넌트 정의 =====

// KPI 카드 컴포넌트
function KpiCard({
  title,
  value,
  unit,
  change,
  isPositive,
  icon,
  color,
  sparklineData,
  isCount = false,
  subLabel = "전일 대비",
}: {
  title: string;
  value: number;
  unit: string;
  change: number;
  isPositive: boolean;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'violet' | 'orange';
  sparklineData: number[];
  isCount?: boolean;
  subLabel?: string;
}) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100/30',
      iconBg: 'bg-blue-500',
      sparkline: '#3b82f6',
      border: 'border-blue-100',
      shadow: 'shadow-blue-500/10',
    },
    emerald: {
      bg: 'from-emerald-50 to-emerald-100/30',
      iconBg: 'bg-emerald-500',
      sparkline: '#10b981',
      border: 'border-emerald-100',
      shadow: 'shadow-emerald-500/10',
    },
    violet: {
      bg: 'from-violet-50 to-violet-100/30',
      iconBg: 'bg-violet-500',
      sparkline: '#8b5cf6',
      border: 'border-violet-100',
      shadow: 'shadow-violet-500/10',
    },
    orange: {
      bg: 'from-orange-50 to-orange-100/30',
      iconBg: 'bg-orange-500',
      sparkline: '#f97316',
      border: 'border-orange-100',
      shadow: 'shadow-orange-500/10',
    },
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden bg-gradient-to-br ${classes.bg} rounded-2xl border ${classes.border} p-5 shadow-lg ${classes.shadow}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${classes.iconBg} text-white shadow-lg`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {isCount ? `${change}%` : `${Math.abs(change)}%`}
        </div>
      </div>

      <div className="mb-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">
          {isCount ? value : value.toFixed(isCount ? 0 : value % 1 === 0 ? 0 : 2)}
          <span className="text-base font-semibold text-slate-400">{unit}</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">{subLabel}</p>
      </div>

      {/* Sparkline */}
      <div className="h-10 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData.map((v, i) => ({ value: v, index: i }))}>
            <defs>
              <linearGradient id={`sparkline-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={classes.sparkline} stopOpacity={0.4} />
                <stop offset="95%" stopColor={classes.sparkline} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={classes.sparkline}
              strokeWidth={2}
              fill={`url(#sparkline-${color})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// 대시보드 카드 컴포넌트
function DashboardCard({
  title,
  subtitle,
  icon,
  children,
  action,
}: {
  title: string | React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-start justify-between p-5 border-b border-slate-100">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
              {icon}
            </div>
          )}
          <div>
            {typeof title === 'string' ? (
              <h3 className="text-base font-bold text-slate-800">{title}</h3>
            ) : (
              <h3 className="text-base font-bold text-slate-800">{title}</h3>
            )}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
}

// 상태 뱃지 컴포넌트
function StatusBadge({ status }: { status: string }) {
  const configs = {
    online: { label: '가동중', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    offline: { label: '정지', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    maintenance: { label: '정비중', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    warning: { label: '주의', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  };
  const config = configs[status as keyof typeof configs] || configs.offline;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
}

// 알림 아이콘 컴포넌트
function NotificationIcon({ type }: { type: string }) {
  const configs = {
    warning: { icon: AlertCircle, bg: 'bg-amber-100', color: 'text-amber-600' },
    success: { icon: CheckCircle, bg: 'bg-emerald-100', color: 'text-emerald-600' },
    error: { icon: AlertTriangle, bg: 'bg-red-100', color: 'text-red-600' },
    info: { icon: Info, bg: 'bg-blue-100', color: 'text-blue-600' },
  };
  const config = configs[type as keyof typeof configs] || configs.info;
  const Icon = config.icon;

  return (
    <div className={`p-2 rounded-xl ${config.bg}`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
    </div>
  );
}

// 리소스 게이지 컴포넌트
function ResourceGauge({
  label,
  value,
  icon,
  color
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'violet' | 'emerald' | 'orange';
}) {
  const colorClasses = {
    blue: { bg: 'bg-blue-500', light: 'bg-blue-100' },
    violet: { bg: 'bg-violet-500', light: 'bg-violet-100' },
    emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-100' },
    orange: { bg: 'bg-orange-500', light: 'bg-orange-100' },
  };

  const classes = colorClasses[color];

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className={`p-2.5 rounded-xl ${classes.bg} text-white shadow-sm`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-slate-700">{label}</span>
          <span className="text-sm font-bold text-slate-800">{value}%</span>
        </div>
        <div className={`w-full h-2 ${classes.light} rounded-full overflow-hidden`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${classes.bg}`}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
