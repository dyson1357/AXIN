"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { 
  Bell, 
  Menu, 
  Search, 
  Settings, 
  Sun, 
  Moon, 
  LayoutDashboard, 
  BarChart, 
  FileText, 
  Users, 
  Cog, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Factory,
  Bot,
  User,
  MoreHorizontal,
  ArrowRight,
  AlertCircle,
  XCircle,
  CheckCircle,
  ChevronLeft,
  Command,
  Activity,
  Server,
  Database,
  Layers,
  GitBranch,
  Monitor,
  TrendingUp,
  Cpu,
  Package
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from 'next-themes';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../components/ui/dropdown-menu";
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchActive, setSearchActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  
  // 클라이언트 사이드에서만 렌더링되도록 설정
  useEffect(() => {
    setMounted(true);

    // Command + K 또는 Ctrl + K를 눌렀을 때 명령 팔레트 열기
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchActive(true);
      }
      if (e.key === 'Escape' && searchActive) {
        setSearchActive(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchActive]);

  // 현재 시간을 기반으로 인사말 생성
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const sidebarItems = [
    // Main Dashboard
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, link: '/', group: 'Main' },
    // MLOps
    { id: 'experiments', label: 'Experiments', icon: Activity, link: '/dashboard/experiments', group: 'MLOps' },
    { id: 'models', label: 'Models', icon: Server, link: '/dashboard/models', group: 'MLOps' },
    { id: 'datasets', label: 'Datasets', icon: Database, link: '/dashboard/datasets', group: 'MLOps' },
    { id: 'pipeline', label: 'Pipeline', icon: Layers, link: '/dashboard/pipeline', group: 'MLOps' },
    { id: 'versions', label: 'Version Control', icon: GitBranch, link: '/dashboard/versions', group: 'MLOps' },
    // Monitoring & Analytics
    { id: 'monitoring', label: 'Monitoring', icon: Monitor, link: '/dashboard/monitoring', group: 'Monitoring' },
    { id: 'analytics', label: 'Data Analytics', icon: BarChart, link: '/analytics', group: 'Monitoring' },
    { id: 'reports', label: 'Reports', icon: FileText, link: '/reports', group: 'Monitoring' },
    // Infrastructure
    { id: 'resources', label: 'Resources', icon: TrendingUp, link: '/dashboard/resources', group: 'Infrastructure' },
    // AI & Factory
    { id: 'agents', label: 'AI Agents', icon: Bot, link: '/agents', group: 'AI & Factory' },
    { id: 'factory', label: 'Equipment Management', icon: Factory, link: '/factory', group: 'AI & Factory' },
    // Settings
    { id: 'settings', label: 'Settings', icon: Settings, link: '/dashboard/settings', group: 'Settings' },
  ];
  
  // 그룹별로 메뉴 아이템 정리
  const groupedItems = sidebarItems.reduce((acc, item) => {
    const group = item.group || 'Other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, Array<typeof sidebarItems[0]>>);

  // 시스템 상태
  const systemStatus = [
    { name: 'API Server', status: 'online', time: '99.9%' },
    { name: 'Database', status: 'online', time: '99.8%' },
    { name: 'ML Model', status: 'online', time: '99.7%' },
  ];
  
  if (!mounted) {
    return null;
  }

  // 애니메이션 설정
  const sidebarAnimation = {
    open: { width: 280, transition: { type: "spring", stiffness: 300, damping: 25 } },
    closed: { width: 72, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };
  
  const menuItemAnimation = {
    hover: { 
      x: 5, 
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    }
  };
  
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <div className={cn(
          "min-h-screen bg-gray-50 text-gray-900 flex font-sans",
          className
        )}>
          {/* 사이드바 */}
          <motion.aside
            className="fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-gray-200 flex flex-col overflow-hidden shadow-sm"
            initial={false}
            animate={sidebarCollapsed ? "closed" : "open"}
            variants={sidebarAnimation}
          >
            {/* 로고 영역 */}
            <div className="h-16 flex items-center px-4 border-b border-gray-200">
              <Link href="/" className="flex items-center">
                <motion.div 
                  className="bg-[#EB6100] rounded-md w-9 h-9 flex items-center justify-center mr-3 shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="font-bold text-white text-base">4I</span>
                </motion.div>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.div 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="font-bold text-xl text-gray-900">4INLAB</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
              
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div 
                    className="ml-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSidebarCollapsed(true)}
                      className="h-8 w-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* 메뉴 아이템 */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
              {Object.entries(groupedItems).map(([groupName, items]) => (
                <div key={groupName} className={cn("mb-4", sidebarCollapsed && "mb-2")}>
                  {!sidebarCollapsed && groupName !== 'Main' && (
                    <div className="px-3 mb-2 mt-4 first:mt-0">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {groupName}
                      </h3>
                    </div>
                  )}
                  <div className="space-y-1">
                    {items.map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <motion.div whileHover="hover">
                      <Link 
                        href={item.link}
                        onClick={() => setActivePage(item.id)}
                        className={cn(
                          "flex items-center py-2.5 px-3 rounded-md text-sm group transition-all", 
                          activePage === item.id 
                            ? "bg-[#FFF1E9] text-[#EB6100] font-medium" 
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <motion.div
                          className={cn(
                            "flex items-center w-full",
                            sidebarCollapsed ? "justify-center" : ""
                          )}
                          variants={menuItemAnimation}
                        >
                          <item.icon className={cn(
                            "h-5 w-5", 
                            sidebarCollapsed ? "mr-0" : "mr-3",
                            activePage === item.id ? "text-[#EB6100]" : "text-gray-500"
                          )} />
                          
                          <AnimatePresence>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          
                          {(activePage === item.id && !sidebarCollapsed) && (
                            <motion.div 
                              className="ml-auto"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <ChevronRight className="h-4 w-4 text-[#EB6100]" />
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
              
              {!sidebarCollapsed && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="px-3 mb-3">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">System Status</h3>
                  </div>
                  <div className="space-y-2 px-3">
                    {systemStatus.map((item) => (
                      <motion.div 
                        key={item.name} 
                        className="flex items-center justify-between p-2 rounded-md bg-white border border-gray-200 text-sm hover:border-[#EB6100]/30 transition-colors duration-200"
                        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-center">
                          {item.status === 'online' ? (
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          )}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <Badge variant="secondary">{item.time}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </nav>
            
            {/* 사용자 정보 */}
            <div className={cn(
              "border-t border-gray-200 p-3",
              sidebarCollapsed ? "flex justify-center" : ""
            )}>
              {sidebarCollapsed ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto w-auto">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Avatar className="h-10 w-10 border border-gray-200 cursor-pointer hover:border-[#EB6100] transition-colors duration-200">
                          <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            Admin
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center p-2 border-b border-gray-200">
                      <Avatar className="h-9 w-9 mr-2">
                        <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                        <AvatarFallback>관리</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Administrator</p>
                        <p className="text-xs text-gray-500">admin@4inlab.com</p>
                      </div>
                    </div>
                    <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                      <Cog className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto w-auto">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Avatar className="h-10 w-10 border border-gray-200 cursor-pointer hover:border-[#EB6100] transition-colors duration-200">
                            <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              Admin
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center p-2 border-b border-gray-200">
                        <Avatar className="h-9 w-9 mr-2">
                          <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                          <AvatarFallback>관리</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Administrator</p>
                          <p className="text-xs text-gray-500">admin@4inlab.com</p>
                        </div>
                      </div>
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <Cog className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-500 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">관리자</p>
                    <p className="text-xs text-gray-500 truncate">admin@4inlab.com</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSidebarCollapsed(true)}
                    className="text-gray-500 hover:text-[#EB6100] transition-colors duration-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </motion.aside>
          
          {/* 메인 컨텐츠 */}
          <motion.div 
            className="flex-1 flex flex-col"
            initial={false}
            animate={{ 
              marginLeft: sidebarCollapsed ? "72px" : "280px" 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* 헤더/네비게이션 */}
            <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm backdrop-blur-sm bg-white/80">
              <div className="flex-1 flex items-center">
                <AnimatePresence>
                  {sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="mr-4"
                    >
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setSidebarCollapsed(false)}
                        className="rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Menu className="h-5 w-5 text-gray-500" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div>
                    <motion.h1 
                    className="text-xl font-semibold text-gray-900"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Manufacturing AI-Agent Platform
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {getGreeting()}
                  </motion.p>
                </div>
                
                <div className="ml-auto flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <AnimatePresence>
                      {searchActive ? (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 300, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Search... (Press Esc to close)" 
                            className="w-full h-9 rounded-full bg-gray-100 pl-10 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#EB6100] focus:bg-white transition-all"
                            autoFocus
                          />
                          <button 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            onClick={() => setSearchActive(false)}
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 px-1 py-0.5 border border-gray-200 rounded">
                            <kbd className="font-sans">Esc</kbd>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full hover:bg-gray-100 transition-colors duration-200" 
                                onClick={() => setSearchActive(true)}
                              >
                                <Search className="h-5 w-5 text-gray-500" />
                                <span className="sr-only">Search</span>
                                <div className="hidden sm:flex absolute right-1 top-1/2 transform -translate-y-1/2 h-5 items-center text-xs text-gray-400">
                                  <kbd className="px-1.5 py-0.5 border border-gray-200 rounded text-xs font-light text-gray-500">
                                    <span className="text-xs">⌘</span>K
                                  </kbd>
                                </div>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Search (⌘K)</TooltipContent>
                          </Tooltip>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full relative hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Bell className="h-5 w-5 text-gray-500" />
                          {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                              {notificationCount}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>
                  
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors duration-200">
                              {theme === 'dark' ? (
                                <Moon className="h-5 w-5 text-gray-500" />
                              ) : (
                                <Sun className="h-5 w-5 text-gray-500" />
                              )}
                            </Button>
                          </motion.div>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Change Theme</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>System Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors duration-200">
                          <Settings className="h-5 w-5 text-gray-500" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>Settings</TooltipContent>
                  </Tooltip>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="ghost" className="rounded-full flex items-center ml-2 gap-2 hover:bg-gray-100 transition-colors duration-200">
                          <Avatar className="h-8 w-8 border border-gray-200">
                            <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              Admin
                            </AvatarFallback>
                          </Avatar>
                          <span className="hidden md:inline text-sm font-medium text-gray-700">Administrator</span>
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center p-2 border-b border-gray-200">
                        <Avatar className="h-9 w-9 mr-2">
                          <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                          <AvatarFallback>관리</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Administrator</p>
                          <p className="text-xs text-gray-500">admin@4inlab.com</p>
                        </div>
                      </div>
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <Cog className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#FFF1E9] hover:text-[#EB6100] transition-colors duration-200">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-500 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            
            <main className="flex-1 overflow-y-auto">
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {children}
              </motion.div>
            </main>
            
            {/* 푸터 */}
            <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
              <div className="container mx-auto">
                <div className="flex items-center justify-center">
                  <p>© 2024 4INLAB. All rights reserved.</p>
                  <span className="mx-2">•</span>
                  <Link href="/privacy" className="hover:text-[#EB6100] transition-colors duration-200">Privacy Policy</Link>
                  <span className="mx-2">•</span>
                  <Link href="/terms" className="hover:text-[#EB6100] transition-colors duration-200">Terms of Service</Link>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      </TooltipProvider>
    </MotionConfig>
  );
};

export default MainLayout; 