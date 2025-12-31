"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { eventTimelineData } from '@/lib/dummyData';

interface EventItemProps {
  event: typeof eventTimelineData[0];
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  // 이벤트 레벨에 따른 배지 색상
  const getBadgeVariant = () => {
    switch (event.level) {
      case 'info':
        return 'secondary';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Timestamp formatting (Las Vegas - Pacific Time)
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Los_Angeles',
    }).format(date);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="p-3 border-b border-border last:border-0"
    >
      <div className="flex items-start gap-3">
        <Badge variant={getBadgeVariant()}>
          {event.level === 'info' ? 'Info' : 
           event.level === 'warning' ? 'Warning' : 'Error'}
        </Badge>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold">{event.agent}</span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(event.timestamp)}
            </span>
          </div>
          <p className="text-sm mt-1">{event.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface EventTimelineProps {
  maxItems?: number;
}

const EventTimeline: React.FC<EventTimelineProps> = ({ maxItems = 5 }) => {
  const [events, setEvents] = useState(eventTimelineData);
  
  // 실시간 이벤트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 랜덤으로 이벤트 추가 여부 결정 (30% 확률)
      if (Math.random() < 0.3) {
        // 임의 이벤트 생성
        const newEvent = {
          id: `event-${Date.now()}`,
          timestamp: new Date().toISOString(),
          level: ['info', 'info', 'info', 'warning', 'error'][Math.floor(Math.random() * 5)] as 'info' | 'warning' | 'error',
          agent: ['Central LLM', 'Quality Agent', 'Equipment Agent', 'Production Agent', 'Safety Agent'][Math.floor(Math.random() * 5)],
          message: [
            'Regular status check completed.',
            'Production schedule has been updated.',
            'Temperature data analysis completed.',
            'Pressure reading approaching threshold.',
            'Sensor data anomaly detected.',
            'Injection Molding Machine #2 temperature rising.',
            'Equipment maintenance schedule adjusted.',
          ][Math.floor(Math.random() * 7)],
        };
        
        // 새 이벤트를 맨 앞에 추가하고 최대 개수 유지
        setEvents(prev => [newEvent, ...prev].slice(0, maxItems));
      }
    }, 5000); // 5초마다 체크
    
    return () => clearInterval(interval);
  }, [maxItems]);
  
  return (
    <Card className="h-fit">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Event Timeline</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {events.length > 0 ? (
            events.map(event => (
              <EventItem key={event.id} event={event} />
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <p>No events.</p>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default EventTimeline; 