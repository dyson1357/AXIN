"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Loader2, X, Command, Download, PanelRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getSimulatedResponse } from '@/lib/getSimulatedResponse';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  onAgentFlowUpdate?: (flowData: any) => void;
  onShowReport?: (show: boolean) => void;
}

const QuickPromptItem: React.FC<{ text: string; onSelect: (text: string) => void }> = ({ text, onSelect }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-3 rounded-lg border border-border hover:bg-card cursor-pointer"
      onClick={() => onSelect(text)}
    >
      <div className="flex items-start">
        <Command className="w-4 h-4 mt-0.5 mr-2 text-muted-foreground" />
        <p className="text-sm">{text}</p>
      </div>
    </motion.div>
  );
};

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  onAgentFlowUpdate,
  onShowReport
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  // 타이핑 애니메이션 효과
  useEffect(() => {
    if (!isTyping || !messages.length) return;
    
    const currentMessage = messages[messages.length - 1];
    if (currentMessage.role === 'assistant') {
      const fullResponse = currentMessage.content;
      
      if (responseIndex < fullResponse.length) {
        const timer = setTimeout(() => {
          setCurrentResponse(fullResponse.substring(0, responseIndex + 1));
          setResponseIndex(prev => prev + 1);
        }, 15); // 타이핑 속도 조절
        
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
      }
    }
  }, [isTyping, responseIndex, messages]);

  // 메시지 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // 응답 시뮬레이션
    const response = getSimulatedResponse(input);
    
    if (response) {
      // 응답 메시지 추가
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(true);
        setCurrentResponse('');
        setResponseIndex(0);
        
        // 에이전트 흐름 정보 상위 컴포넌트로 전달
        if (onAgentFlowUpdate) {
          onAgentFlowUpdate(response.agentFlow);
        }
        
        // 보고서 명령 감지
        if (input.includes('report') && onShowReport) {
          onShowReport(true);
        }
      }, 500);
    }
  };
  
  // 음성 인식 토글 (실제 구현이 아닌 시뮬레이션)
  const toggleVoiceRecognition = () => {
    setIsListening(prev => !prev);
    
    if (!isListening) {
      // 음성 인식 시작 시뮬레이션
      setTimeout(() => {
        setIsListening(false);
        setInput('Tell me about the factory status');
        // 자동으로 메시지 전송
        setTimeout(() => {
          handleSubmit(new Event('submit') as any);
        }, 500);
      }, 2000);
    }
  };
  
  // 빠른 질문 선택 핸들러
  const handleQuickPromptSelect = (promptText: string) => {
    setInput(promptText);
    // 자동으로 메시지 전송
    setTimeout(() => {
      handleSubmit(new Event('submit') as any);
    }, 100);
  };
  
  // 미리 정의된 빠른 질문 목록
  const quickPrompts = [
    'Tell me about the factory status',
    'Suggest solutions for dryer issues',
    'Analyze quality improvement plans',
    'Generate a report',
    'Predict tomorrow's production volume'
  ];
  
  // 대화 내용 다운로드 (시뮬레이션)
  const handleDownloadChat = () => {
    alert('Conversation has been downloaded. (Actual download is not implemented)');
  };
  
  // 대화 내용 지우기
  const handleClearChat = () => {
    setMessages([]);
  };
  
  // 채팅 패널 토글
  const toggleChatPanel = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      {/* 펼쳐진 상태 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-[calc(100vh-2rem)] flex flex-col">
              <CardHeader className="border-b p-4 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                    <Badge variant="brand" className="ml-2">Autonomous Factory Control</Badge>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Command className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Quick Commands</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <p className="text-sm text-muted-foreground">Select frequently used commands to quickly ask questions.</p>
                          <div className="grid grid-cols-1 gap-2">
                            {quickPrompts.map((prompt, index) => (
                              <QuickPromptItem 
                                key={index} 
                                text={prompt} 
                                onSelect={(text) => {
                                  handleQuickPromptSelect(text);
                                  // 대화 상자 닫기
                                  const closeButton = document.querySelector('[data-state="open"] button[data-state="closed"]');
                                  if (closeButton) {
                                    (closeButton as HTMLButtonElement).click();
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={handleDownloadChat}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save Conversation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={handleClearChat}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clear Conversation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={toggleChatPanel}
                          >
                            <PanelRight className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Close Panel</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-8">
                      <div className="bg-brand/10 p-4 rounded-full mb-4">
                        <Command className="h-8 w-8 text-brand" />
                      </div>
                      <p className="text-center text-lg font-medium mb-2">
                        Hello! I'm the Autonomous Factory AI Agent.
                      </p>
                      <p className="text-center text-muted-foreground mb-8">
                        Feel free to ask about anything you'd like to know or check.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-2 w-full max-w-md">
                        {quickPrompts.map((prompt, index) => (
                          <QuickPromptItem 
                            key={index} 
                            text={prompt} 
                            onSelect={handleQuickPromptSelect}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-brand text-brand-foreground'
                              : 'bg-card border border-border shadow'
                          }`}
                        >
                          {message.role === 'assistant' && index === messages.length - 1 && isTyping
                            ? (
                              <>
                                {currentResponse}
                                <span className="inline-block w-1 h-4 ml-0.5 bg-primary animate-pulse"></span>
                              </>
                            )
                            : message.content}
                        </motion.div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                      disabled={isListening}
                    />
                    {isListening && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                        <div className="flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin text-brand mr-2" />
                          <span>Listening...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="button" 
                    variant={isListening ? "secondary" : "outline"} 
                    size="icon"
                    onClick={toggleVoiceRecognition}
                    className={`${isListening ? 'bg-brand text-brand-foreground' : ''}`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  
                  <Button type="submit" variant="brand">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 접힌 상태 */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button 
            variant="brand" 
            size="lg" 
            className="rounded-full h-14 w-14 shadow-lg"
            onClick={toggleChatPanel}
          >
            <Command className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ChatPanel; 