'use client'

import { Box } from '@chakra-ui/react'
import { ExperimentDetails } from '@/components/experiments/ExperimentDetails'

// 임시 데이터
const mockExperiment = {
  id: '1',
  name: 'MNIST Classification',
  dataset: 'MNIST',
  model: 'CNN',
  status: 'completed',
  accuracy: 0.98,
  f1Score: 0.97,
  loss: 0.05,
  runtime: '1h 23m',
  created: '2024-01-10 09:30',
  hyperparameters: {
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
  },
  metrics: {
    trainAcc: [0.5, 0.7, 0.8, 0.85, 0.9, 0.92, 0.94, 0.96, 0.97, 0.98],
    valAcc: [0.45, 0.65, 0.75, 0.8, 0.85, 0.87, 0.9, 0.92, 0.94, 0.95],
    trainLoss: [0.8, 0.6, 0.4, 0.3, 0.25, 0.2, 0.15, 0.1, 0.08, 0.05],
    valLoss: [0.9, 0.7, 0.5, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.12],
  },
}

interface ExperimentPageProps {
  params: {
    id: string
  }
}

export default function ExperimentPage({ params }: ExperimentPageProps) {
  // 실제 구현에서는 params.id를 사용하여 해당 실험 데이터를 가져옵니다
  return (
    <Box py={8}>
      <ExperimentDetails experiment={mockExperiment} />
    </Box>
  )
}
