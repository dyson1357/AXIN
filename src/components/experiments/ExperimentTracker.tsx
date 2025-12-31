'use client'

import React from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Text,
  HStack,
  Icon,
  Tooltip,
} from '@chakra-ui/react'
import { FiClock, FiCheck, FiX } from 'react-icons/fi'

// 실험 상태에 따른 배지 색상 설정
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green'
    case 'running':
      return 'blue'
    case 'failed':
      return 'red'
    default:
      return 'gray'
  }
}

// 더미 데이터 - 실제로는 API에서 가져올 데이터
const experiments = [
  {
    id: 'exp_001',
    name: 'Image Classification v1',
    model: 'ResNet50',
    status: 'Completed',
    accuracy: '89.5%',
    loss: '0.234',
    runtime: '2h 15m',
    timestamp: '2024-02-20 14:30'
  },
  {
    id: 'exp_002',
    name: 'Text Classification v2',
    model: 'BERT-base',
    status: 'Running',
    accuracy: '87.2%',
    loss: '0.312',
    runtime: '1h 45m',
    timestamp: '2024-02-20 16:45'
  },
  {
    id: 'exp_003',
    name: 'Object Detection v1',
    model: 'YOLO v5',
    status: 'Failed',
    accuracy: '-',
    loss: '-',
    runtime: '0h 25m',
    timestamp: '2024-02-20 17:30'
  },
  {
    id: 'exp_004',
    name: 'Sentiment Analysis v1',
    model: 'KoBERT',
    status: 'Completed',
    accuracy: '91.2%',
    loss: '0.189',
    runtime: '3h 30m',
    timestamp: '2024-02-20 18:15'
  },
]

const ExperimentTracker = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const headerBg = useColorModeValue('gray.50', 'gray.700')
  const rowHoverBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      overflow="hidden"
    >
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg={headerBg}>
            <Tr>
              <Th>실험 ID</Th>
              <Th>실험명</Th>
              <Th>모델</Th>
              <Th>상태</Th>
              <Th>정확도</Th>
              <Th>Loss</Th>
              <Th>실행 시간</Th>
              <Th>타임스탬프</Th>
            </Tr>
          </Thead>
          <Tbody>
            {experiments.map((exp) => (
              <Tr
                key={exp.id}
                _hover={{ bg: rowHoverBg }}
                cursor="pointer"
                transition="background-color 0.2s"
              >
                <Td fontSize="sm">{exp.id}</Td>
                <Td fontSize="sm">
                  <Text fontWeight="medium">{exp.name}</Text>
                </Td>
                <Td fontSize="sm">{exp.model}</Td>
                <Td>
                  <Badge
                    colorScheme={getStatusColor(exp.status)}
                    borderRadius="full"
                    px={2}
                    py={1}
                  >
                    <HStack spacing={1}>
                      <Icon
                        as={
                          exp.status === 'Completed'
                            ? FiCheck
                            : exp.status === 'Running'
                            ? FiClock
                            : FiX
                        }
                        boxSize={3}
                      />
                      <Text fontSize="xs">{exp.status}</Text>
                    </HStack>
                  </Badge>
                </Td>
                <Td fontSize="sm">{exp.accuracy}</Td>
                <Td fontSize="sm">{exp.loss}</Td>
                <Td fontSize="sm">
                  <Tooltip label="Total runtime" placement="top">
                    <Text>{exp.runtime}</Text>
                  </Tooltip>
                </Td>
                <Td fontSize="sm">{exp.timestamp}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default ExperimentTracker
