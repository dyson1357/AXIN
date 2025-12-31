'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ROCChartProps {
  data: Array<{
    x: number
    y: number
  }>
  height?: number
}

export default function ROCChart({ data, height = 400 }: ROCChartProps) {
  const textColor = useColorModeValue('#1A202C', '#E2E8F0')
  const gridColor = useColorModeValue('#E2E8F0', '#4A5568')
  const bgColor = useColorModeValue('#fff', '#1A202C')

  // Transform data for Recharts - combine ROC and Random line data
  const transformedData = data.map((point) => ({
    fpr: point.x,
    tpr: point.y,
    random: point.x, // Random classifier line (y = x)
  }))

  // Ensure we have start and end points for the random line
  if (transformedData.length > 0) {
    if (transformedData[0].fpr !== 0) {
      transformedData.unshift({ fpr: 0, tpr: 0, random: 0 })
    }
    if (transformedData[transformedData.length - 1].fpr !== 1) {
      transformedData.push({ fpr: 1, tpr: 1, random: 1 })
    }
  }

  return (
    <Box h={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={transformedData}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="fpr"
            type="number"
            domain={[0, 1]}
            tickCount={6}
            tick={{ fill: textColor, fontSize: 12 }}
            label={{
              value: 'False Positive Rate',
              position: 'insideBottom',
              offset: -10,
              fill: textColor,
            }}
          />
          <YAxis
            type="number"
            domain={[0, 1]}
            tickCount={6}
            tick={{ fill: textColor, fontSize: 12 }}
            label={{
              value: 'True Positive Rate',
              angle: -90,
              position: 'insideLeft',
              fill: textColor,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: bgColor,
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '8px 12px',
              color: textColor,
            }}
            formatter={(value: number) => value.toFixed(3)}
            labelFormatter={(label: number) => `FPR: ${label.toFixed(3)}`}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Line
            name="ROC Curve"
            type="monotone"
            dataKey="tpr"
            stroke="#EB6100"
            strokeWidth={2}
            dot={{ fill: '#fff', stroke: '#EB6100', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            name="Random"
            type="linear"
            dataKey="random"
            stroke="#7AC943"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
