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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiGrid, FiList, FiSearch, FiPlus } from 'react-icons/fi'
import { DatasetCard } from '@/components/datasets/DatasetCard'
import { DatasetUploadModal } from '@/components/datasets/DatasetUploadModal'
import Link from 'next/link'

const mockDatasets = {
  'production-timeseries': {
    id: 'production-timeseries',
    name: '생산라인 센서 데이터',
    type: 'TimeSeries',
    size: 52428800,
    lastModified: '2024-02-07',
    rows: 87600,
    columns: 12,
    status: 'completed',
    progress: 100,
    tags: ['시계열', '생산', '센서'],
    description: '생산라인의 실시간 센서 데이터 (온도, 압력, 진동 등)',
    features: [
      { name: 'timestamp', type: 'datetime', missing: 0 },
      { name: 'temperature', type: 'float32', missing: 12 },
      { name: 'pressure', type: 'float32', missing: 8 },
      { name: 'vibration', type: 'float32', missing: 15 },
      { name: 'speed', type: 'float32', missing: 10 },
    ],
    statistics: {
      numerical: {
        mean: [85.2, 2.1, 0.15, 60.5],
        std: [5.4, 0.3, 0.05, 10.2],
        min: [70.0, 1.5, 0.05, 30.0],
        max: [95.0, 3.0, 0.25, 80.0],
      },
    },
    quality: {
      completeness: 99.2,
      consistency: 98.7,
      balance: 97.5,
    },
  },
  'quality-inspection': {
    id: 'quality-inspection',
    name: '품질 검사 데이터',
    type: 'Structured',
    size: 157286400,
    lastModified: '2024-02-06',
    rows: 250000,
    columns: 25,
    status: 'completed',
    progress: 100,
    tags: ['정형', '품질', '검사'],
    description: '제품 품질 검사 결과 데이터 (치수, 외관, 성능 등)',
    features: [
      { name: 'product_id', type: 'string', missing: 0 },
      { name: 'dimension_x', type: 'float32', missing: 0 },
      { name: 'dimension_y', type: 'float32', missing: 0 },
      { name: 'weight', type: 'float32', missing: 5 },
      { name: 'defect_type', type: 'string', missing: 85 },
    ],
    statistics: {
      numerical: {
        mean: [100.2, 50.5, 1.5],
        std: [0.2, 0.15, 0.05],
        min: [99.8, 50.0, 1.4],
        max: [100.6, 51.0, 1.6],
      },
      categorical: {
        unique: [5],
        top: ['정상', '치수미달', '표면불량'],
        freq: [220000, 15000, 10000],
      },
    },
    quality: {
      completeness: 99.8,
      consistency: 99.5,
      balance: 92.3,
    },
  },
  'defect-images': {
    id: 'defect-images',
    name: '제품 결함 이미지',
    type: 'Image',
    size: 5368709120,
    lastModified: '2024-02-05',
    rows: 100000,
    columns: 4,
    status: 'processing',
    progress: 85,
    tags: ['이미지', '결함', '검사'],
    description: '제품 표면 결함 검사 이미지 데이터',
    features: [
      { name: 'image_id', type: 'string', missing: 0 },
      { name: 'defect_class', type: 'string', missing: 0 },
      { name: 'image_path', type: 'string', missing: 0 },
      { name: 'metadata', type: 'json', missing: 150 },
    ],
    statistics: {
      numerical: {
        mean: [1024, 1024], // width, height
        std: [0, 0],
        min: [1024, 1024],
        max: [1024, 1024],
      },
      categorical: {
        unique: [8],
        top: ['스크래치', '찍힘', '변색'],
        freq: [35000, 25000, 15000],
      },
    },
    quality: {
      completeness: 99.9,
      consistency: 98.2,
      balance: 88.5,
    },
  },
}

export default function DatasetsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure()

  const bgCard = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const filteredDatasets = Object.values(mockDatasets).filter(dataset => {
    const matchesSearch = dataset.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesType =
      typeFilter === 'all' || dataset.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesType
  })

  return (
    <Box as="main" pt="80px" px="4" maxW="100%">
      <Stack spacing={6} mt="-70px">
        {/* 헤더 */}
        <HStack justify="space-between">
          <Stack>
            <Text fontSize="2xl" fontWeight="bold">데이터셋 관리</Text>
            <Text color="gray.500">데이터셋을 관리하고 분석하세요</Text>
          </Stack>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="orange"
            onClick={onUploadOpen}
          >
            새 데이터셋
          </Button>
        </HStack>

        {/* 검색 및 필터 */}
        <HStack spacing={4}>
          <InputGroup maxW="320px">
            <InputLeftElement>
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="데이터셋 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Select
            maxW="200px"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="all">모든 유형</option>
            <option value="timeseries">시계열</option>
            <option value="structured">정형</option>
            <option value="image">이미지</option>
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

        {/* 데이터셋 목록 */}
        {viewMode === 'grid' ? (
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}
          >
            {filteredDatasets.map(dataset => (
              <Link key={dataset.id} href={`/dashboard/datasets/${dataset.id}`}>
                <DatasetCard
                  dataset={dataset}
                  viewMode="grid"
                  isSelected={false}
                  onSelect={() => {}}
                />
              </Link>
            ))}
          </Grid>
        ) : (
          <Card bg={bgCard} borderColor={borderColor} borderWidth={1}>
            <CardBody>
              <Stack spacing={4}>
                {filteredDatasets.map(dataset => (
                  <Link key={dataset.id} href={`/dashboard/datasets/${dataset.id}`}>
                    <DatasetCard
                      dataset={dataset}
                      viewMode="list"
                      isSelected={false}
                      onSelect={() => {}}
                    />
                  </Link>
                ))}
              </Stack>
            </CardBody>
          </Card>
        )}
      </Stack>

      {/* 데이터셋 업로드 모달 */}
      <DatasetUploadModal isOpen={isUploadOpen} onClose={onUploadClose} />
    </Box>
  )
}
