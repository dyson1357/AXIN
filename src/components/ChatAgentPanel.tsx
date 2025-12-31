import React, { useState, useEffect, useRef } from 'react';
import { Bot, Paperclip, Send, User, Maximize2, Minimize2, X, Plus, MessageSquare, ChevronRight, Zap, Grip, BarChart3, LayoutDashboard, Settings, Layers, Workflow, FileText, Bell, Database, History, RotateCcw, Cpu, Check, Loader2, ArrowRight, Lightbulb, PlayCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { initialAgents, Agent } from './AgentMap';

// Types
interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  agent?: Agent;
  actions?: string[];
  isStreaming?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  description: string;
  date: string;
  messages: Message[];
}

// Typing Effect Component
const StreamingContent = ({ content, onComplete }: { content: string, onComplete?: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedContent('');

    const interval = setInterval(() => {
      if (indexRef.current < content.length) {
        setDisplayedContent((prev) => prev + content.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 12); // Slightly faster for better feel

    return () => clearInterval(interval);
  }, [content, onComplete]);

  return (
    <div className="prose prose-slate prose-p:text-slate-600 prose-p:leading-7 prose-li:text-slate-600 max-w-none">
      <ReactMarkdown>{displayedContent}</ReactMarkdown>
    </div>
  );
};

export default function ChatAgentPanel({
  minimized,
  onClose
}: {
  minimized?: boolean;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I am your AXIN Manufacturing AI. I can help optimize lines, prevent defects, and adjust schedules. How can I assist you?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<ChatSession[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, thinkingStep]);

  useEffect(() => {
    const mockHistory: ChatSession[] = [
      { id: '1', title: 'Line 2 Optimization', description: 'Efficiency analysis for Assembly Line 2', date: 'Today', messages: [] },
      { id: '2', title: 'Defect Rate Analysis', description: 'Investigating recent quality spikes', date: 'Yesterday', messages: [] },
      { id: '3', title: 'Energy Report Q3', description: 'Quarterly energy consumption review', date: '2 days ago', messages: [] },
    ];
    setHistory(mockHistory);
  }, []);

  const suggestions = [
    { icon: activityIcon, text: "Tell me the actual performance vs plan for this week", label: "Performance" },
    { icon: searchIcon, text: "Which items have the highest defect rate?", label: "Quality Analysis" },
    { icon: boxIcon, text: "What is the current inventory status?", label: "Inventory" },
    { icon: calendarIcon, text: "Generate a production schedule for next week", label: "Scheduling" }
  ];

  const quickActions = [
    { icon: Zap, label: "Auto-Generate Schedule" },
    { icon: Settings, label: "Create Maintenance Plan" },
    { icon: Database, label: "Run Inventory Opt." },
    { icon: FileText, label: "Generate AI Report" }
  ]

  const generateResponse = async (userMsg: string) => {
    setIsTyping(true);

    setThinkingStep("Analyzing request context...");
    await new Promise(resolve => setTimeout(resolve, 800));

    setThinkingStep("Querying Real-time Data Lake...");
    await new Promise(resolve => setTimeout(resolve, 1000));

    setThinkingStep("Running Multi-Agent Simulation...");
    await new Promise(resolve => setTimeout(resolve, 800));

    let responseContent = "";
    let matchedAgent = initialAgents.find(a => a.name === "Production Manager AI");
    let actions: string[] = [];

    const lowerMsg = userMsg.toLowerCase();

    if (lowerMsg.includes("performance") || lowerMsg.includes("plan")) {
      matchedAgent = initialAgents.find(a => a.name === "Production Manager AI");
      responseContent = `### Weekly Production Performance Report

Here is the comparison of **Planned vs. Actual Production** for the current week (Week 42):

**1. Assembly Line A**
*   Planned: **15,000** | Actual: **14,850**
*   Achievement: **99.0%** (On Track)

**2. Assembly Line B**
*   Planned: **12,500** | Actual: **11,200**
*   Achievement: **89.6%** (Behind Schedule)

**3. Packaging Unit**
*   Planned: **28,000** | Actual: **28,150**
*   Achievement: **100.5%** (Exceeding Target)

**Key Insights:**
*   **Line B Variance**: The shortfall in Line B is primarily due to the *servo motor downtime* (3.5 hours) occurred on Tuesday.
*   **Recommendation**: To meet the monthly target, I suggest running **Line B for an extended 4-hour shift** this Saturday.

Would you like me to adjust the schedule accordingly?`;
      actions = ["Adjust Schedule for Line B", "View Downtime Log", "Send Report to Management"];
    }
    else if (lowerMsg.includes("defect") || lowerMsg.includes("quality") || lowerMsg.includes("items")) {
      matchedAgent = initialAgents.find(a => a.name === "Quality Control AI");
      responseContent = `### Defect Analysis: Top Contributors

I have analyzed the quality inspection data from the last 48 hours. The overall defect rate is **2.4%** (Target: <1.5%).

**Top 3 Defect Categories:**

1.  **Surface Scratches (Item: Body Panel L)**
    *   **Rate**: 4.8%
    *   **Root Cause**: Detected debris in the stamping die (Press #04).
    *   **Trend**: Increasing since 09:00 AM today.

2.  **Paint Adhesion Fail (Item: Cover 330)**
    *   **Rate**: 1.2%
    *   **Root Cause**: Curing oven temperature fluctuated below critical limit (180°C).

3.  **Dimensional Variance (Item: Gear Shaft)**
    *   **Rate**: 0.5% (Within Limits)

**Recommended Actions:**
I strongly recommend stopping **Press #04** immediately for cleaning. The vision system indicates a 95% probability of debris buildup.`;
      actions = ["Stop Press #04", "Dispatch Maintenance Team", "View Vision System Images"];
    }
    else if (lowerMsg.includes("inventory") || lowerMsg.includes("stock")) {
      matchedAgent = initialAgents.find(a => a.name === "Supply Chain AI");
      responseContent = `### Real-time Inventory Status Alert

Current inventory health score is **Good (88%)**, but there are **2 critical low-stock alerts** requiring attention:

**Critical Low Stock:**
*   **Component**: *Lithium-Ion Battery Pack (Type-C)*
    *   **Current Stock**: 450 units
    *   **Daily Consumption**: 120 units
    *   **Days on Hand**: **3.7 Days** (Threshold: 5 Days)
    *   *Next shipment expected in 6 days.*

*   **Component**: *Thermal Paste (Grade A)*
    *   **Status**: 15% Remaining
    *   **Risk**: High risk of line stoppage on Line A by Friday morning.

**Healthy Stock:**
*   **Chassis Frames**: 14 days supply
*   **Display Units**: 22 days supply

**AI Suggestion:**
I can expedite the *Battery Pack* shipment order (Cost: +$450) to arrive within 2 days. Shall I proceed?`;
      actions = ["Expedite Shipment", "Contact Supplier", "Check Alternative Stock"];
    }
    else if (lowerMsg.includes("schedule") || lowerMsg.includes("plan")) {
      matchedAgent = initialAgents.find(a => a.name === "Production Manager AI");
      responseContent = `### Proposed Production Schedule: Next Week (Week 43)

Based on the current order backlog (14,200 units) and machine availability, I have generated an optimized schedule:

**Strategy: Maximize Line A Utilization**

*   **Monday - Wednesday**:
    *   **Line A**: Product X (High Volume) - *3 Shifts/Day*
    *   **Line B**: Product Y (Complex Assembly) - *2 Shifts/Day*
*   **Thursday - Friday**:
    *   **Line A**: Changeover to Product Z (10:00 AM Thu) -> Full Production
    *   **Line B**: Maintenance Block (Thu PM) -> Resume Production

**Predicted Outcome:**
*   **Total Output**: 15,400 Units (+8% vs Demand)
*   **OTIF Probability**: 99.2%
*   **Energy Savings**: 12% (via peak load shifting)

Do you want to publish this schedule to the shop floor tablets?`;
      actions = ["Publish Schedule", "Edit Constraints", "View Shift Details"];
    } else {
      matchedAgent = initialAgents.find(a => a.name === "Generic Agent");
      responseContent = `I can assist with that. To give you the most accurate answer, could you specify which production line or system you are referring to?

I have real-time access to:
*   **Line 1 & 2** (Assembly)
*   **CNC Machining Center**
*   **Warehouse A** (Raw Materials)
*   **QA Vision Systems**

You can ask me about *efficiency details*, *specific machine errors*, *work order status*, or *energy consumption*.`;
      actions = ["Show Line 1 Status", "Check Material Stock", "View Open Work Orders"];
    }

    setThinkingStep("");
    setIsTyping(false);

    const newMsg: Message = {
      id: Date.now(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: matchedAgent,
      actions: actions,
      isStreaming: true
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: false
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    generateResponse(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAction = (action: string) => {
    setInput(action);
  };

  const startNewChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      content: 'Hello! I am your AXIN Manufacturing AI. How can I assist you with your operations today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: false
    }]);
  };

  const loadChat = (id: string) => {
    console.log("Loading chat", id);
  }

  function activityIcon() { return <Activity className="w-5 h-5 text-blue-500" /> }
  function searchIcon() { return <Lightbulb className="w-5 h-5 text-amber-500" /> }
  function boxIcon() { return <LayoutDashboard className="w-5 h-5 text-purple-500" /> }
  function calendarIcon() { return <PlayCircle className="w-5 h-5 text-emerald-500" /> }

  if (isFullscreen) {
    return createPortal(
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        className="fixed inset-0 z-[9999] bg-[#f8f9fa] flex font-sans"
      >
        {/* Sidebar */}
        <div className="w-[300px] bg-[#f0f4f9] flex flex-col flex-shrink-0 h-full font-sans border-r border-slate-200/60">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-800 tracking-tight text-[16px] block">AXIN AI</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block -mt-0.5">Enterprise</span>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 hover:bg-[#dce3e9] rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              title="Collapse Sidebar"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 mb-8">
            <button
              onClick={startNewChat}
              className="w-full h-12 flex items-center gap-3 bg-[#dde3ea]/50 hover:bg-white hover:shadow-lg hover:shadow-blue-50/50 text-slate-700 px-5 rounded-full transition-all duration-300 group border border-transparent hover:border-slate-200"
            >
              <div className="bg-white p-1 rounded-full group-hover:bg-blue-50 transition-colors shadow-sm">
                <Plus className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
              </div>
              <span className="font-semibold text-[14px] text-slate-600 group-hover:text-slate-800">New Chat Session</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 space-y-10 scrollbar-thin scrollbar-thumb-slate-200">
            <div>
              <div className="flex items-center justify-between px-2 mb-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</div>
                <History className="w-3 h-3 text-slate-300" />
              </div>
              <div className="space-y-1.5">
                {history.map(chat => (
                  <button key={chat.id} onClick={() => loadChat(chat.id)} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#dde3ea]/70 text-slate-700 text-[13px] truncate transition-colors flex items-center gap-3 group relative overflow-hidden">
                    <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span className="truncate flex-1 font-medium">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-2 mb-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Agents</div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="space-y-1.5">
                {initialAgents.slice(0, 5).map(agent => (
                  <div key={agent.id} className="flex items-center gap-3 px-3 py-2.5 text-slate-700 text-[13px] hover:bg-[#dde3ea]/70 rounded-lg transition-colors cursor-pointer group">
                    <div className="p-1 rounded bg-slate-100 group-hover:bg-white transition-colors">
                      <agent.icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700" />
                    </div>
                    <span>{agent.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 mt-auto border-t border-slate-200/50 bg-[#eef2f6]/50">
            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm cursor-pointer transition-all duration-200">
              <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm">U</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800 truncate">Manufacturing Admin</div>
                <div className="text-[11px] text-slate-500 font-medium">Enterprise License</div>
              </div>
              <Settings className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-8 py-5 w-full z-10 sticky top-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-900 tracking-tight">AI Assistant</span>
                <div className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-200">Beta 4.0</div>
              </div>
              <span className="text-xs text-slate-500 mt-0.5 font-medium">Real-time production monitoring enabled</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[12px] font-semibold text-slate-600 shadow-sm border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>System Connected</span>
                <span className="w-px h-3 bg-slate-200 mx-1"></span>
                <span className="text-slate-400">14ms latency</span>
              </div>
              <button
                onClick={() => {
                  setIsFullscreen(false);
                  if (onClose) onClose();
                }}
                className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all shadow-sm hover:shadow"
                title="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className="max-w-[900px] mx-auto w-full px-8 pt-6 pb-40">
              {/* Zero State */}
              {messages.length <= 1 && !isTyping ? (
                <div className="flex flex-col items-center justify-center w-full min-h-[60vh] animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-full space-y-10">

                    <div className="text-center space-y-4 mb-10">
                      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                        Good Afternoon, Admin
                      </h1>
                      <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
                        I'm monitoring <span className="text-slate-900 font-semibold">2 production lines</span> and <span className="text-slate-900 font-semibold">1,617 data points</span>.
                        How can I optimize your operations today?
                      </p>
                    </div>

                    <div className="bg-white border border-slate-300 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-default group">
                      <div className="flex items-start gap-5">
                        <div className="mt-1.5 relative">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500 relative ring-4 ring-emerald-50"></div>
                        </div>
                        <div>
                          <div className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Real-time Data Stream Active</div>
                          <div className="text-[13px] text-slate-500 mt-1 font-medium flex items-center gap-3">
                            <span>2 Lines Synced</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>19 Products</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>Last sync: 13:45:52</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>

                    {/* REDESIGNED Suggestions */}
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Suggested Inquiries</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleAction(s.text)}
                            className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-300 hover:border-blue-400 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 text-left group relative overflow-hidden"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-300 shadow-inner">
                              <div className="text-slate-500 group-hover:text-white transition-colors duration-300 transform scale-110">
                                {s.icon()}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{s.label}</div>
                              <span className="text-[15px] text-slate-700 font-semibold leading-snug group-hover:text-slate-900 transition-colors">{s.text}</span>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300">
                              <ChevronRight className="w-5 h-5 text-blue-500" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* REDESIGNED Quick Actions */}
                    <div className="space-y-5 pt-6 border-t border-slate-200/60">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Quick Actions</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAction(action.label)}
                            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-slate-300 rounded-2xl hover:border-orange-300 hover:bg-orange-50/10 hover:shadow-md transition-all duration-200 group h-[110px]"
                          >
                            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors ring-1 ring-slate-100 group-hover:ring-orange-200">
                              <action.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[13px] font-semibold text-slate-600 group-hover:text-slate-800 text-center leading-tight px-2">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="space-y-12 py-8">
                  {messages.slice(1).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'user' ? (
                        <div className="bg-slate-900 text-white px-8 py-5 rounded-[24px] rounded-tr-sm max-w-[80%] text-[16px] leading-relaxed font-medium shadow-lg shadow-slate-200/50">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="w-full group">
                          <div className="flex items-start gap-5 mb-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200/50 mt-1">
                              <Cpu className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-1 pt-1">
                              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                {msg.agent?.fullName || 'AXIN AI'}
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wide">AI Agent</span>
                              </div>
                              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                                <span>Thinking Process Complete</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-emerald-600 flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Confidence 98%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pl-[60px]">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed text-[15px]">
                              {msg.isStreaming ? (
                                <StreamingContent
                                  content={msg.content}
                                />
                              ) : (
                                <div className="prose prose-slate prose-p:text-slate-600 prose-p:leading-7 prose-li:text-slate-600 max-w-none prose-strong:text-slate-900 prose-headings:text-slate-800 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic">
                                  <ReactMarkdown>
                                    {msg.content}
                                  </ReactMarkdown>
                                </div>
                              )}
                            </div>

                            {!isTyping && msg.actions && msg.actions.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 flex flex-wrap gap-3"
                              >
                                {msg.actions.map((action, idx) => (
                                  <button key={idx} onClick={() => handleAction(action)} className="px-5 py-3 rounded-xl border border-blue-100 text-[13px] text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-semibold bg-blue-50/50 flex items-center gap-2.5 group shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-white transition-colors" />
                                    {action}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Enhanced Thinking Indicator */}
                  {isTyping && (
                    <div className="w-full pl-[60px]">
                      <div className="inline-flex items-center gap-4 px-5 py-3 bg-white rounded-full border border-slate-100 shadow-sm">
                        <div className="relative flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-[bounce_1s_infinite_-0.3s]"></span>
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-[bounce_1s_infinite_-0.15s]"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[bounce_1s_infinite]"></span>
                        </div>
                        <span className="text-[13px] font-semibold text-slate-600 animate-pulse">{thinkingStep || "Processing..."}</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 w-full bg-white border-t border-slate-100 p-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
            <div className="max-w-[900px] mx-auto w-full">
              <div className="relative bg-[#f8fafc] rounded-[24px] px-6 py-4 flex items-end gap-4 focus-within:bg-white focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.08)] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300 border border-slate-300 focus-within:border-blue-200 group">
                <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex-shrink-0 mb-0.5">
                  <Plus className="w-6 h-6" />
                </button>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything about production..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 text-[16px] py-2.5 max-h-[200px] resize-none overflow-y-auto leading-relaxed font-medium"
                  rows={1}
                />

                <div className="flex items-center gap-2 flex-shrink-0 mb-0.5">
                  <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" title="Use Microphone">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
                    </div>
                  </button>
                  <div className="h-6 w-px bg-slate-200 mx-1"></div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={`p-2.5 rounded-xl transition-all duration-200 ${input.trim() && !isTyping
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-[12px] text-slate-400 font-medium flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  AXIN AI is trained on your specific production data. Verify critical actions manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>,
      document.body
    );
  }

  // Embedded Panel
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Messages */}
      {/* (Kept simpler for brevity, as fullscreen is the main focus of polish) */}
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900">AI Assistant</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-slate-500">Online</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsFullscreen(true)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List - Compact */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${msg.role === 'user'
              ? 'bg-slate-900 text-white rounded-tr-sm'
              : 'bg-slate-100 text-slate-900 rounded-tl-sm'
              }`}>
              {msg.agent && (
                <div className="flex items-center gap-1.5 mb-1">
                  <msg.agent.icon className="w-3 h-3 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500">{msg.agent.name}</span>
                </div>
              )}
              <div className={`text-sm prose prose-sm max-w-none leading-relaxed ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-3 py-2 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
              <span className="text-sm text-slate-600">{thinkingStep}...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-3 pb-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {suggestions.slice(0, 3).map((s, i) => (
              <button
                key={i}
                onClick={() => handleAction(s.text)}
                className="flex-shrink-0 px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors whitespace-nowrap"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 p-3 border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`p-1.5 rounded-lg transition-all ${input.trim() && !isTyping ? 'bg-slate-900 text-white' : 'text-slate-400'
              }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}