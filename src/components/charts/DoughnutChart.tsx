'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DoughnutChartProps {
  data: Array<{
    label: string
    value: number
  }>
  height?: number
}

const COLORS = ['#EB6100', '#00A3E0', '#7AC943']

export default function DoughnutChart({ data, height = 400 }: DoughnutChartProps) {
  const textColor = useColorModeValue('#1A202C', '#E2E8F0')
  const bgColor = useColorModeValue('#fff', '#1A202C')

  // Transform data for Recharts
  const transformedData = data.map((item) => ({
    name: item.label,
    value: item.value,
  }))

  return (
    <Box h={height}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
          <Pie
            data={transformedData}
            cx="50%"
            cy="45%"
            innerRadius="50%"
            outerRadius="75%"
            paddingAngle={2}
            cornerRadius={3}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={{ stroke: textColor, strokeWidth: 1 }}
          >
            {transformedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: bgColor,
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '8px 12px',
              color: textColor,
            }}
            formatter={(value: number) => [value, 'Value']}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
            iconSize={12}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}
