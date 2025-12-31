/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { kpiData } from '@/lib/dummyData';

interface KPITooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueUnit: string;
}

const KPITooltip: React.FC<KPITooltipProps> = ({ active, payload, label, valueUnit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-2 shadow-md">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-sm font-bold text-brand">
          {payload[0].value}
          {valueUnit}
        </p>
      </div>
    );
  }

  return null;
};

type Period = 'daily' | 'weekly' | 'monthly';
type KpiType = 'production' | 'defectRate' | 'operationRate';

interface KPIChartProps {
  title: string;
  data: any[];
  type: KpiType;
  color: string;
  valueUnit: string;
}

const KPIChart: React.FC<KPIChartProps> = ({ title, data, type, color, valueUnit }) => {
  // Legend label
  const legendLabel =
    type === 'production' ? 'Production' :
    type === 'defectRate' ? 'Defect Rate' :
    type === 'operationRate' ? 'Operation Rate' :
    'Metric';
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }} 
              tickLine={false}
              stroke="rgba(255,255,255,0.2)"
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              tickLine={false}
              stroke="rgba(255,255,255,0.2)"
              domain={type === 'defectRate' ? [0, 'auto'] : ['auto', 'auto']}
            />
            <RechartsTooltip content={<KPITooltip valueUnit={valueUnit} />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
              formatter={() => (
                <span style={{ color, fontWeight: 500 }}>{legendLabel}{valueUnit}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="value"
              name={legendLabel + valueUnit}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const KPICharts: React.FC = () => {
  const [period, setPeriod] = useState<Period>('daily');

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Key Performance Indicators (KPI)</CardTitle>
          <div className="flex space-x-1">
            <Button
              variant={period === 'daily' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('daily')}
              className="text-xs h-7"
            >
              Daily
            </Button>
            <Button
              variant={period === 'weekly' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('weekly')}
              className="text-xs h-7"
            >
              Weekly
            </Button>
            <Button
              variant={period === 'monthly' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange('monthly')}
              className="text-xs h-7"
            >
              Monthly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <KPIChart
              title="Production"
              data={kpiData[period].production}
              type="production"
              color="#3B82F6" // blue-500
              valueUnit=" units"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <KPIChart
              title="Defect Rate (%)"
              data={kpiData[period].defectRate}
              type="defectRate"
              color="#EF4444" // red-500
              valueUnit="%"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <KPIChart
              title="Operation Rate (%)"
              data={kpiData[period].operationRate}
              type="operationRate"
              color="#22C55E" // green-500
              valueUnit="%"
            />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICharts;