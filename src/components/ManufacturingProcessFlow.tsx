"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    Settings,
    Thermometer,
    CheckCircle2,
    Truck,
    Activity,
    Bot,
    ArrowRight
} from 'lucide-react';

// Process step data
const processSteps = [
    {
        id: 1,
        name: 'Material Receiving',
        icon: Package,
        status: 'completed',
        progress: 100,
        throughput: '2.3 tons/hr',
        agent: 'Logistics AI'
    },
    {
        id: 2,
        name: 'Pre-processing',
        icon: Settings,
        status: 'completed',
        progress: 100,
        throughput: '2.1 tons/hr',
        agent: 'Quality AI'
    },
    {
        id: 3,
        name: 'Injection Molding',
        icon: Thermometer,
        status: 'in-progress',
        progress: 67,
        throughput: '1.9 tons/hr',
        agent: 'Temp Control AI'
    },
    {
        id: 4,
        name: 'Cooling',
        icon: Thermometer,
        status: 'waiting',
        progress: 0,
        throughput: '-',
        agent: 'Process AI'
    },
    {
        id: 5,
        name: 'Quality Inspection',
        icon: CheckCircle2,
        status: 'waiting',
        progress: 0,
        throughput: '-',
        agent: 'Vision AI'
    },
    {
        id: 6,
        name: 'Shipping',
        icon: Truck,
        status: 'waiting',
        progress: 0,
        throughput: '-',
        agent: 'Delivery AI'
    }
];

export default function ManufacturingProcessFlow() {
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    const completedSteps = processSteps.filter(s => s.status === 'completed').length;
    const currentStep = processSteps.find(s => s.status === 'in-progress');
    const totalSteps = processSteps.length;
    const overallProgress = Math.round((completedSteps / totalSteps) * 100 +
        (currentStep?.progress || 0) / totalSteps);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Top Summary */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-xs text-slate-500">Overall Progress</p>
                        <p className="text-2xl font-bold text-slate-800">{overallProgress}%</p>
                    </div>
                    <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-orange-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${overallProgress}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-slate-600">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        <span className="text-slate-600">Waiting</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                        <span className="text-slate-600">Completed</span>
                    </div>
                </div>
            </div>

            {/* Process Timeline */}
            <div className="flex-1 p-6">
                <div className="relative flex items-start justify-between">
                    {/* Connection Line */}
                    <div className="absolute top-8 left-8 right-8 h-0.5 bg-slate-200" />
                    <div
                        className="absolute top-8 left-8 h-0.5 bg-slate-800 transition-all duration-1000"
                        style={{ width: `calc(${(completedSteps) / (totalSteps - 1) * 100}% - 2rem)` }}
                    />

                    {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = step.status === 'completed';
                        const isInProgress = step.status === 'in-progress';
                        const isSelected = selectedStep === step.id;

                        return (
                            <div key={step.id} className="relative flex flex-col items-center" style={{ width: `${100 / totalSteps}%` }}>
                                {/* Node */}
                                <motion.button
                                    onClick={() => setSelectedStep(isSelected ? null : step.id)}
                                    className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all border-2 ${isCompleted
                                            ? 'bg-slate-800 border-slate-800 text-white'
                                            : isInProgress
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                                                : 'bg-white border-slate-200 text-slate-400'
                                        } ${isSelected ? 'ring-4 ring-slate-200' : ''}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Icon className="w-6 h-6" />

                                    {/* In Progress Indicator */}
                                    {isInProgress && (
                                        <motion.span
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-orange-500 rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        />
                                    )}
                                </motion.button>

                                {/* Label */}
                                <p className={`mt-3 text-sm font-semibold text-center ${isCompleted || isInProgress ? 'text-slate-800' : 'text-slate-400'
                                    }`}>
                                    {step.name}
                                </p>

                                {/* Progress */}
                                {(isCompleted || isInProgress) && (
                                    <div className="mt-2 text-center">
                                        <p className="text-xs text-slate-500">{step.throughput}</p>
                                        {isInProgress && (
                                            <p className="text-xs font-bold text-orange-500 mt-0.5">{step.progress}%</p>
                                        )}
                                    </div>
                                )}

                                {/* AI Agent */}
                                <div className={`mt-2 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] ${isCompleted || isInProgress ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 text-slate-400'
                                    }`}>
                                    <Bot className="w-3 h-3" />
                                    <span className="font-medium">{step.agent}</span>
                                </div>

                                {/* Arrow (except last) */}
                                {index < totalSteps - 1 && (
                                    <ArrowRight className={`absolute top-7 -right-2 w-4 h-4 ${isCompleted ? 'text-slate-800' : 'text-slate-300'
                                        }`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Selected Process Details */}
                {selectedStep && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-100"
                    >
                        {(() => {
                            const step = processSteps.find(s => s.id === selectedStep);
                            if (!step) return null;
                            const Icon = step.icon;
                            const isInProgress = step.status === 'in-progress';

                            return (
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-xl ${isInProgress ? 'bg-orange-500 text-white' : 'bg-slate-800 text-white'}`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-800">{step.name}</h4>
                                        <p className="text-sm text-slate-500 mt-0.5">Managed by {step.agent}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 text-center">
                                        <div>
                                            <p className="text-xs text-slate-500">Throughput</p>
                                            <p className="text-lg font-bold text-slate-800">{step.throughput}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Progress</p>
                                            <p className={`text-lg font-bold ${isInProgress ? 'text-orange-500' : 'text-slate-800'}`}>{step.progress}%</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Status</p>
                                            <p className={`text-lg font-bold ${step.status === 'completed' ? 'text-slate-800' :
                                                    step.status === 'in-progress' ? 'text-orange-500' : 'text-slate-400'
                                                }`}>
                                                {step.status === 'completed' ? 'Done' : step.status === 'in-progress' ? 'Active' : 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
