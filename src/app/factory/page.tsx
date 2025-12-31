"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Wrench, AlertTriangle, CheckCircle, ExternalLink, Plus, Layers, Filter } from 'lucide-react';

// 설비 데이터
const machineData = [
  { 
    id: 'MC-001', 
    name: 'Extruder #1', 
    zone: 'A', 
    status: 'online', 
    uptime: '98.7%', 
    temperature: 72.5,
    pressure: 4.2,
    nextMaintenance: '2023-08-15',
    operator: 'Operator A',
    lastIncident: 'None',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  { 
    id: 'MC-002', 
    name: 'Extruder #2', 
    zone: 'A', 
    status: 'online', 
    uptime: '99.1%', 
    temperature: 71.2,
    pressure: 4.3,
    nextMaintenance: '2023-09-10',
    operator: 'Operator B',
    lastIncident: '2023-03-05: Overheating Warning',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  { 
    id: 'MC-003', 
    name: 'Injection Machine #1', 
    zone: 'B', 
    status: 'offline', 
    uptime: '95.2%', 
    temperature: 68.9,
    pressure: 0.0,
    nextMaintenance: '2023-07-20',
    operator: 'Operator C',
    lastIncident: '2023-06-10: Motor Overheating',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  { 
    id: 'MC-004', 
    name: 'Assembly Line', 
    zone: 'C', 
    status: 'online', 
    uptime: '97.8%', 
    temperature: 24.5,
    pressure: null,
    nextMaintenance: '2023-08-05',
    operator: 'Operator D',
    lastIncident: '2023-05-15: Sensor Error',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  { 
    id: 'MC-005', 
    name: 'Packaging Machine', 
    zone: 'D', 
    status: 'maintenance', 
    uptime: '92.4%', 
    temperature: 23.1,
    pressure: null,
    nextMaintenance: 'In Progress',
    operator: 'Operator E',
    lastIncident: '2023-06-10: Regular Maintenance',
    image: 'https://images.unsplash.com/photo-1565611424608-43e6bce47bec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  { 
    id: 'MC-006', 
    name: 'Conveyor #1', 
    zone: 'B', 
    status: 'online', 
    uptime: '99.4%', 
    temperature: 29.7,
    pressure: null,
    nextMaintenance: '2023-10-15',
    operator: 'Operator F',
    lastIncident: 'None',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

export default function FactoryPage() {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('list');
  const [filterZone, setFilterZone] = useState<string | null>(null);
  
  // 존별로 그룹화
  const zones = Array.from(new Set(machineData.map(m => m.zone)));
  
  // 선택된 설비 정보
  const selectedMachineData = machineData.find(m => m.id === selectedMachine);
  
  // 필터된 설비 목록
  const filteredMachines = filterZone 
    ? machineData.filter(m => m.zone === filterZone)
    : machineData;
  
  return (
    <MainLayout>
      <div className="col-span-12 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Equipment Management</h1>
            <p className="text-slate-500 mt-1">Monitor and manage production equipment status</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Wrench className="h-4 w-4" />
              Schedule Maintenance
            </Button>
            <Button className="gap-1.5 bg-[#EB6100] text-white hover:bg-[#EB6100]/90" size="sm">
              <Plus className="h-4 w-4" />
              Add Equipment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="list" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Factory Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMachines.map((machine) => (
                <motion.div 
                  key={machine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`overflow-hidden transition-all cursor-pointer hover:border-[#EB6100] ${selectedMachine === machine.id ? 'ring-2 ring-[#EB6100]' : ''}`}
                    onClick={() => setSelectedMachine(machine.id)}
                  >
                    <div className="h-32 overflow-hidden relative">
                      <img 
                        src={machine.image} 
                        alt={machine.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {machine.status === 'online' && (
                          <Badge className="bg-green-100 text-green-800">Running</Badge>
                        )}
                        {machine.status === 'offline' && (
                          <Badge className="bg-red-100 text-red-800">Offline</Badge>
                        )}
                        {machine.status === 'maintenance' && (
                          <Badge className="bg-amber-100 text-amber-800">Maintenance</Badge>
                        )}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{machine.name}</CardTitle>
                          <CardDescription>ID: {machine.id} | Zone: {machine.zone}</CardDescription>
                        </div>
                        <Badge variant="outline">{machine.uptime}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500">Temperature</span>
                          <span className="font-medium">{machine.temperature}°C</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500">Next Maintenance</span>
                          <span className="font-medium">{machine.nextMaintenance}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Factory Layout</CardTitle>
                <CardDescription>Visually check equipment locations and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-slate-500 text-center">
                    <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>3D Factory Map Area</p>
                    <p className="text-sm text-slate-400 mt-1">Map can be displayed using Three.js</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {selectedMachine && selectedMachineData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedMachineData.name}
                    {selectedMachineData.status === 'online' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {selectedMachineData.status === 'offline' && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    {selectedMachineData.status === 'maintenance' && (
                      <Settings className="h-4 w-4 text-amber-500" />
                    )}
                  </CardTitle>
                  <CardDescription>Equipment details and status</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Basic Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Equipment ID</span>
                          <span className="font-medium">{selectedMachineData.id}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Location</span>
                          <span className="font-medium">Zone {selectedMachineData.zone}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Uptime</span>
                          <span className="font-medium">{selectedMachineData.uptime}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Operator</span>
                          <span className="font-medium">{selectedMachineData.operator}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Operating Status</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Temperature</span>
                          <span className="font-medium">{selectedMachineData.temperature}°C</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Pressure</span>
                          <span className="font-medium">
                            {selectedMachineData.pressure ? `${selectedMachineData.pressure} bar` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Last Incident</span>
                          <span className="font-medium">
                            {selectedMachineData.lastIncident}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-500">Next Maintenance</span>
                          <span className="font-medium">
                            {selectedMachineData.nextMaintenance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-md p-4 flex items-center justify-center">
                    <div className="text-center">
                      <Settings className="h-12 w-12 mx-auto mb-4 text-slate-400 animate-spin" style={{ animationDuration: '3s' }} />
                      <p className="text-slate-500">Real-time Monitoring Graph</p>
                      <p className="text-sm text-slate-400 mt-1">Equipment status charts can be displayed in this area</p>
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