'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiGrid, FiList, FiSearch, FiServer, FiZap } from 'react-icons/fi'
import { ModelCard } from '@/components/models/ModelCard'
import { CreateModelModal } from '@/components/models/CreateModelModal'
import Link from 'next/link'

// 임시 모델 데이터
const mockModels = [
  {
    id: '1',
    name: 'MNIST Classifier v2.1',
    description: 'Improved MNIST classification model with CNN architecture',
    framework: 'PyTorch',
    version: '2.1.0',
    status: 'deployed',
    accuracy: 0.985,
    trainTime: '2h 15m',
    dataset: 'MNIST',
    createdAt: '2025-02-07',
    updatedAt: '2025-02-07',
    thumbnail: '/model-thumbnails/mnist-cnn.png',
    servingStatus: {
      isDeployed: true,
      health: 'healthy',
    },
  },
  {
    id: '2',
    name: 'CIFAR-10 ResNet',
    description: 'ResNet model for CIFAR-10 image classification',
    framework: 'TensorFlow',
    version: '1.0.0',
    status: 'training',
    accuracy: 0.92,
    trainTime: '4h 30m',
    dataset: 'CIFAR-10',
    createdAt: '2025-02-06',
    updatedAt: '2025-02-07',
    thumbnail: '/model-thumbnails/cifar-resnet.png',
    servingStatus: {
      isDeployed: false,
      health: 'none',
    },
  },
  {
    id: '3',
    name: 'Customer Churn Predictor',
    description: 'XGBoost model for predicting customer churn',
    framework: 'XGBoost',
    version: '1.2.0',
    status: 'failed',
    accuracy: 0.88,
    trainTime: '1h 45m',
    dataset: 'Customer Data',
    createdAt: '2025-02-05',
    updatedAt: '2025-02-07',
    thumbnail: '/model-thumbnails/churn-predictor.png',
    servingStatus: {
      isDeployed: false,
      health: 'error',
    },
  },
]

export default function ModelsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const bgCard = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'green'
      case 'training':
        return 'blue'
      case 'failed':
        return 'red'
      default:
        return 'gray'
    }
  }
  // 상태 및 헬스 아이콘 반환 함수
  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return { icon: FiZap, color: 'green.500' }
      case 'warning':
        return { icon: FiZap, color: 'yellow.500' }
      case 'error':
        return { icon: FiZap, color: 'red.500' }
      default:
        return { icon: FiServer, color: 'gray.500' }
    }
  }

  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || model.servingStatus.health === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Box as="main" pt="80px" px="4" maxW="100%">
      <Stack spacing={6} mt="-70px">
        {/* ✅ 헤더 */}
        <HStack justify="space-between">
          <Stack>
            <Text fontSize="2xl" fontWeight="bold">모델 관리</Text>
            <Text color="gray.500">학습된 모델을 관리하고 배포 상태를 모니터링하세요</Text>
          </Stack>
          <Button colorScheme="orange" onClick={() => setIsCreateModalOpen(true)}>
            새 모델 등록
          </Button>
        </HStack>

        {/* 검색 및 필터 */}
        <HStack spacing={4}>
          <InputGroup maxW="320px">
            <InputLeftElement>
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="모델 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Select
            maxW="200px"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">모든 상태</option>
            <option value="healthy">정상</option>
            <option value="warning">주의</option>
            <option value="error">오류</option>
            <option value="none">미배포</option>
          </Select>
          <HStack spacing={2}>
            <IconButton
              aria-label="Grid view"
              icon={<Icon as={FiGrid} />}
              variant={viewMode === 'grid' ? 'solid' : 'ghost'}
              colorScheme={viewMode === 'grid' ? 'brand' : 'gray'}
              onClick={() => setViewMode('grid')}
            />
            <IconButton
              aria-label="List view"
              icon={<Icon as={FiList} />}
              variant={viewMode === 'list' ? 'solid' : 'ghost'}
              colorScheme={viewMode === 'list' ? 'brand' : 'gray'}
              onClick={() => setViewMode('list')}
            />
          </HStack>
        </HStack>

        {/* 모델 목록 */}
        {viewMode === 'grid' ? (
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}
          >
            {filteredModels.map(model => (
              <Link key={model.id} href={`/dashboard/models/${model.id}`}>
                <ModelCard
                  model={model}
                  viewMode="grid"
                  onViewDetails={() => {}}
                />
              </Link>
            ))}
          </Grid>
        ) : (
          <Card bg={bgCard} borderColor={borderColor} borderWidth={1}>
            <CardBody>
              <Stack spacing={4}>
                {filteredModels.map(model => (
                  <Link key={model.id} href={`/dashboard/models/${model.id}`}>
                    <ModelCard
                      model={model}
                      viewMode="list"
                      onViewDetails={() => {}}
                    />
                  </Link>
                ))}
              </Stack>
            </CardBody>
          </Card>
        )}
      </Stack>

      {/* 모델 생성 모달 */}
      <CreateModelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Box>
  )
}
