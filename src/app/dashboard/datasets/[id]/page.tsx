/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  Badge,
  Divider,
  Progress,
  Alert,
  AlertIcon,
  Container,
  VStack,
  Heading,
} from '@chakra-ui/react'
import {
  FiDownload,
  FiDatabase,
  FiBarChart2,
  FiGitBranch,
  FiEye,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi'
import { DatasetPreview } from '@/components/datasets/DatasetPreview'
import { DatasetVersions } from '@/components/datasets/DatasetVersions'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface DatasetDetailPageProps {
  params: {
    id: string
  }
}

// 임시 데이터
const getMockDataset = (id: string) => {
  const datasets = {
    'production-timeseries': {
      id: 'production-timeseries',
      name: '생산라인 센서 데이터',
      description: '제조 라인의 실시간 센서 데이터 (온도, 압력, 진동, 속도)',
      type: 'TimeSeries',
      createdAt: '2025-02-14T00:00:00Z',
      updatedAt: '2025-02-14T09:30:00Z',
      size: 2458000000,
      format: 'parquet',
      status: 'active',
      version: '1.0.0',
      tags: ['제조', '센서', '실시간'],
      quality: {
        completeness: 99.8,
        consistency: 98.5,
        balance: 97.2,
      },
      stats: {
        rows: 8640000,
        columns: 6,
        timeRange: '2024-01-01 ~ 2025-02-14',
        sampleRate: '10초',
        sensors: 4,
      },
      features: [
        { name: 'timestamp', type: 'datetime', missing: 0, description: '데이터 수집 시간' },
        { name: 'temperature', type: 'float32', missing: 12, description: '온도 센서 측정값 (°C)' },
        { name: 'pressure', type: 'float32', missing: 8, description: '압력 센서 측정값 (bar)' },
        { name: 'vibration', type: 'float32', missing: 15, description: '진동 센서 측정값 (mm/s)' },
        { name: 'speed', type: 'float32', missing: 10, description: '속도 센서 측정값 (rpm)' }
      ],
      data: [
        { timestamp: '2025-02-14 10:00:00', temperature: 25.3, pressure: 101.3, vibration: 0.15, speed: 60 },
        { timestamp: '2025-02-14 10:00:10', temperature: 25.5, pressure: 101.4, vibration: 0.16, speed: 61 },
        { timestamp: '2025-02-14 10:00:20', temperature: 25.4, pressure: 101.2, vibration: 0.14, speed: 60 },
        { timestamp: '2025-02-14 10:00:30', temperature: 25.6, pressure: 101.5, vibration: 0.17, speed: 62 },
        { timestamp: '2025-02-14 10:00:40', temperature: 25.2, pressure: 101.1, vibration: 0.15, speed: 59 },
        { timestamp: '2025-02-14 10:00:50', temperature: 25.4, pressure: 101.3, vibration: 0.16, speed: 60 },
        { timestamp: '2025-02-14 10:01:00', temperature: 25.5, pressure: 101.4, vibration: 0.15, speed: 61 },
        { timestamp: '2025-02-14 10:01:10', temperature: 25.3, pressure: 101.2, vibration: 0.14, speed: 60 },
        { timestamp: '2025-02-14 10:01:20', temperature: 25.6, pressure: 101.5, vibration: 0.17, speed: 62 },
        { timestamp: '2025-02-14 10:01:30', temperature: 25.4, pressure: 101.3, vibration: 0.15, speed: 60 }
      ],
      columns: ['timestamp', 'temperature', 'pressure', 'vibration', 'speed'],
      versions: [
        { version: '1.0.0', date: '2025-02-14', changes: '데이터 품질 개선 및 이상치 제거', author: '김엔지니어' },
        { version: '0.9.0', date: '2025-02-13', changes: '새로운 센서 데이터 추가', author: '박매니저' },
        { version: '0.8.0', date: '2025-02-12', changes: '초기 데이터셋 구성', author: '이연구원' }
      ]
    },
    'quality-inspection': {
      id: 'quality-inspection',
      name: '품질 검사 이미지 데이터',
      description: '제품 품질 검사를 위한 고해상도 이미지 데이터셋',
      type: 'Image',
      createdAt: '2025-02-13T00:00:00Z',
      updatedAt: '2025-02-14T08:45:00Z',
      size: 15360000000,
      format: 'jpeg',
      status: 'active',
      version: '2.1.0',
      tags: ['품질관리', '이미지', 'AI검사'],
      quality: {
        completeness: 100.0,
        consistency: 99.5,
        balance: 95.8,
      },
      stats: {
        rows: 25000,
        columns: 4,
        resolution: '2048x2048',
        channels: 3,
        classes: ['정상', '불량']
      },
      features: [
        { name: 'image_path', type: 'string', missing: 0, description: '이미지 파일 경로' },
        { name: 'label', type: 'string', missing: 0, description: '품질 상태 라벨' },
        { name: 'timestamp', type: 'datetime', missing: 0, description: '검사 시간' },
        { name: 'inspector', type: 'string', missing: 12, description: '검사자 ID' }
      ],
      data: [
        { image_path: 'path/to/image1.jpg', label: '정상', timestamp: '2025-02-14 10:00:00', inspector: '김검사' },
        { image_path: 'path/to/image2.jpg', label: '불량', timestamp: '2025-02-14 10:00:10', inspector: '박검사' },
        { image_path: 'path/to/image3.jpg', label: '정상', timestamp: '2025-02-14 10:00:20', inspector: '이검사' },
        { image_path: 'path/to/image4.jpg', label: '불량', timestamp: '2025-02-14 10:00:30', inspector: '김검사' },
        { image_path: 'path/to/image5.jpg', label: '정상', timestamp: '2025-02-14 10:00:40', inspector: '박검사' },
        { image_path: 'path/to/image6.jpg', label: '불량', timestamp: '2025-02-14 10:00:50', inspector: '이검사' },
        { image_path: 'path/to/image7.jpg', label: '정상', timestamp: '2025-02-14 10:01:00', inspector: '김검사' },
        { image_path: 'path/to/image8.jpg', label: '불량', timestamp: '2025-02-14 10:01:10', inspector: '박검사' },
        { image_path: 'path/to/image9.jpg', label: '정상', timestamp: '2025-02-14 10:01:20', inspector: '이검사' },
        { image_path: 'path/to/image10.jpg', label: '불량', timestamp: '2025-02-14 10:01:30', inspector: '김검사' }
      ],
      columns: ['image_path', 'label', 'timestamp', 'inspector'],
      versions: [
        { version: '2.1.0', date: '2025-02-14', changes: '새로운 불량 유형 데이터 추가', author: '박품질' },
        { version: '2.0.0', date: '2025-02-13', changes: '고해상도 이미지로 업데이트', author: '김매니저' },
        { version: '1.0.0', date: '2025-02-12', changes: '초기 데이터셋 구성', author: '이연구원' }
      ]
    },
    'maintenance-logs': {
      id: 'maintenance-logs',
      name: '설비 유지보수 로그',
      description: '설비 유지보수 이력 및 부품 교체 기록',
      type: 'Structured',
      createdAt: '2025-02-12T00:00:00Z',
      updatedAt: '2025-02-14T10:15:00Z',
      size: 156000000,
      format: 'csv',
      status: 'active',
      version: '1.2.0',
      tags: ['유지보수', '설비관리', '이력관리'],
      quality: {
        completeness: 97.5,
        consistency: 96.8,
        balance: 94.2,
      },
      stats: {
        rows: 85000,
        columns: 8,
        timeRange: '2023-01-01 ~ 2025-02-14',
        equipmentCount: 25
      },
      features: [
        { name: 'maintenance_id', type: 'string', missing: 0, description: '유지보수 ID' },
        { name: 'equipment_id', type: 'string', missing: 0, description: '설비 ID' },
        { name: 'maintenance_type', type: 'string', missing: 5, description: '유지보수 유형' },
        { name: 'parts_replaced', type: 'string', missing: 15, description: '교체 부품 목록' },
        { name: 'cost', type: 'float32', missing: 8, description: '유지보수 비용' },
        { name: 'duration', type: 'float32', missing: 12, description: '소요 시간 (시간)' },
        { name: 'timestamp', type: 'datetime', missing: 0, description: '작업 시간' },
        { name: 'technician', type: 'string', missing: 3, description: '담당 기술자' }
      ],
      data: [
        { maintenance_id: 'MT-001', equipment_id: 'EQ-001', maintenance_type: '정기점검', parts_replaced: '오일필터', cost: 100000, duration: 2, timestamp: '2025-02-14 10:00:00', technician: '기술자' },
        { maintenance_id: 'MT-002', equipment_id: 'EQ-002', maintenance_type: '수리', parts_replaced: '베어링', cost: 200000, duration: 4, timestamp: '2025-02-14 10:00:10', technician: '기술자' },
        { maintenance_id: 'MT-003', equipment_id: 'EQ-003', maintenance_type: '정기점검', parts_replaced: '오일필터', cost: 100000, duration: 2, timestamp: '2025-02-14 10:00:20', technician: '기술자' },
        { maintenance_id: 'MT-004', equipment_id: 'EQ-004', maintenance_type: '수리', parts_replaced: '베어링', cost: 200000, duration: 4, timestamp: '2025-02-14 10:00:30', technician: '기술자' },
        { maintenance_id: 'MT-005', equipment_id: 'EQ-005', maintenance_type: '정기점검', parts_replaced: '오일필터', cost: 100000, duration: 2, timestamp: '2025-02-14 10:00:40', technician: '기술자' },
        { maintenance_id: 'MT-006', equipment_id: 'EQ-006', maintenance_type: '수리', parts_replaced: '베어링', cost: 200000, duration: 4, timestamp: '2025-02-14 10:00:50', technician: '기술자' },
        { maintenance_id: 'MT-007', equipment_id: 'EQ-007', maintenance_type: '정기점검', parts_replaced: '오일필터', cost: 100000, duration: 2, timestamp: '2025-02-14 10:01:00', technician: '기술자' },
        { maintenance_id: 'MT-008', equipment_id: 'EQ-008', maintenance_type: '수리', parts_replaced: '베어링', cost: 200000, duration: 4, timestamp: '2025-02-14 10:01:10', technician: '기술자' },
        { maintenance_id: 'MT-009', equipment_id: 'EQ-009', maintenance_type: '정기점검', parts_replaced: '오일필터', cost: 100000, duration: 2, timestamp: '2025-02-14 10:01:20', technician: '기술자' },
        { maintenance_id: 'MT-010', equipment_id: 'EQ-010', maintenance_type: '수리', parts_replaced: '베어링', cost: 200000, duration: 4, timestamp: '2025-02-14 10:01:30', technician: '기술자' }
      ],
      columns: ['maintenance_id', 'equipment_id', 'maintenance_type', 'parts_replaced', 'cost', 'duration', 'timestamp', 'technician'],
      versions: [
        { version: '1.2.0', date: '2025-02-14', changes: '비용 데이터 추가', author: '김관리' },
        { version: '1.1.0', date: '2025-02-13', changes: '신규 설비 데이터 추가', author: '이매니저' },
        { version: '1.0.0', date: '2025-02-12', changes: '초기 데이터셋 구성', author: '박연구원' }
      ]
    }
  }
  return datasets[id as keyof typeof datasets]
}

export default function DatasetDetailPage() {
  const params = useParams()
  const [dataset, setDataset] = useState<any>(null)
  const [selectedFormat, setSelectedFormat] = useState('csv')
  const bgCard = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const brandColor = '#EB6100'

  useEffect(() => {
    const data = getMockDataset(params.id as string)
    setDataset(data)
  }, [params.id])

  const getQualityIcon = (score: number) => {
    if (score >= 95) return FiCheckCircle
    if (score >= 80) return FiAlertCircle
    return FiAlertCircle
  }

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'green.500'
    if (score >= 80) return 'orange.500'
    return 'red.500'
  }

  if (!dataset) {
    return (
      <Box pt="80px">
        <Container maxW="container.xl" centerContent py={16}>
          <VStack spacing={6} align="center">
            <Icon as={FiDatabase} boxSize={12} color="gray.400" />
            <Heading size="lg" color="gray.500">데이터셋을 찾을 수 없습니다</Heading>
            <Text color="gray.500">요청하신 데이터셋이 존재하지 않거나 접근 권한이 없습니다.</Text>
            <Button
              leftIcon={<Icon as={FiDatabase} />}
              colorScheme="orange"
              onClick={() => window.history.back()}
            >
              데이터셋 목록으로 돌아가기
            </Button>
          </VStack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="main" px="4" ml="0" maxW="100%" mt="80px">
      <Stack spacing={6}>
        {/* 헤더 */}
        <HStack justify="space-between" align="flex-start">
          <Stack spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              {dataset.name}
            </Text>
            <Text color="gray.500">{dataset.description}</Text>
          </Stack>
          <HStack>
            <Button
              leftIcon={<Icon as={FiEye} />}
              bg={brandColor}
              color="white"
              size="sm"
              _hover={{ bg: '#D55600' }}
            >
              미리보기
            </Button>
            <Button
              leftIcon={<Icon as={FiDownload} />}
              variant="outline"
              size="sm"
              borderColor={brandColor}
              color={brandColor}
              _hover={{ bg: '#FFF5ED' }}
            >
              다운로드
            </Button>
          </HStack>
        </HStack>

        {/* 데이터셋 정보 */}
        <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
          {/* 왼쪽: 썸네일 및 기본 정보 */}
          <Stack spacing={6}>
            <Card bg={bgCard} borderColor={borderColor}>
              <CardBody>
                <Stack spacing={4}>
                  <Box
                    borderRadius="md"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={borderColor}
                  >
                    <Image
                      src="/dataset-thumbnails/default.png"
                      alt={dataset.name}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/300x200?text=No+Thumbnail"
                    />
                  </Box>
                  <Stack spacing={3}>
                    <HStack justify="space-between">
                      <Text color="gray.500">타입</Text>
                      <Text fontWeight="medium">{dataset.type}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">버전</Text>
                      <Text fontWeight="medium">v{dataset.version}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">상태</Text>
                      <Badge colorScheme="green" variant="subtle">
                        {dataset.status}
                      </Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">크기</Text>
                      <Text fontWeight="medium">{(dataset.size / 1000000000).toFixed(2)} GB</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">행 수</Text>
                      <Text fontWeight="medium">{dataset.stats.rows.toLocaleString()}</Text>
                    </HStack>
                  </Stack>

                  <Divider />

                  {/* 데이터 품질 */}
                  <Stack spacing={3}>
                    <Text fontWeight="medium">데이터 품질</Text>
                    <HStack justify="space-between">
                      <Text color="gray.500">완전성</Text>
                      <HStack>
                        <Icon
                          as={getQualityIcon(dataset.quality.completeness)}
                          color={getQualityColor(dataset.quality.completeness)}
                        />
                        <Text fontWeight="medium">
                          {dataset.quality.completeness}%
                        </Text>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">일관성</Text>
                      <HStack>
                        <Icon
                          as={getQualityIcon(dataset.quality.consistency)}
                          color={getQualityColor(dataset.quality.consistency)}
                        />
                        <Text fontWeight="medium">
                          {dataset.quality.consistency}%
                        </Text>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">균형성</Text>
                      <HStack>
                        <Icon
                          as={getQualityIcon(dataset.quality.balance)}
                          color={getQualityColor(dataset.quality.balance)}
                        />
                        <Text fontWeight="medium">
                          {dataset.quality.balance}%
                        </Text>
                      </HStack>
                    </HStack>
                  </Stack>

                  <Divider />

                  {/* 데이터셋 내보내기 */}
                  <Stack spacing={3}>
                    <Text fontWeight="medium">데이터셋 내보내기</Text>
                    <Button
                      leftIcon={<Icon as={FiPackage} />}
                      variant="outline"
                      size="sm"
                      borderColor={brandColor}
                      color={brandColor}
                      _hover={{ bg: '#FFF5ED' }}
                    >
                      {selectedFormat.toUpperCase()} 형식으로 내보내기
                    </Button>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Stack>

          {/* 오른쪽: 상세 정보 탭 */}
          <Card bg={bgCard} borderColor={borderColor}>
            <CardBody>
              <Tabs>
                <TabList>
                  <Tab
                    _selected={{
                      color: brandColor,
                      borderColor: brandColor,
                    }}
                  >
                    <HStack spacing={2}>
                      <Icon as={FiEye} />
                      <Text>미리보기</Text>
                    </HStack>
                  </Tab>
                  <Tab
                    _selected={{
                      color: brandColor,
                      borderColor: brandColor,
                    }}
                  >
                    <HStack spacing={2}>
                      <Icon as={FiBarChart2} />
                      <Text>통계</Text>
                    </HStack>
                  </Tab>
                  <Tab
                    _selected={{
                      color: brandColor,
                      borderColor: brandColor,
                    }}
                  >
                    <HStack spacing={2}>
                      <Icon as={FiGitBranch} />
                      <Text>버전</Text>
                    </HStack>
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* 미리보기 탭 */}
                  <TabPanel>
                    <DatasetPreview datasetId={params.id} />
                  </TabPanel>

                  {/* 통계 탭 */}
                  <TabPanel>
                    <Stack spacing={6}>
                      <Card>
                        <CardBody>
                          <Stack spacing={4}>
                            <Text fontWeight="medium">데이터 분포</Text>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                              <Card variant="outline">
                                <CardBody>
                                  <Stack spacing={2}>
                                    <Text color="gray.500" fontSize="sm">
                                      학습 데이터
                                    </Text>
                                    <Text fontSize="xl" fontWeight="bold">
                                      {dataset.stats.rows * 0.8}
                                    </Text>
                                    <Progress
                                      value={85.7}
                                      size="sm"
                                      colorScheme="orange"
                                    />
                                  </Stack>
                                </CardBody>
                              </Card>
                              <Card variant="outline">
                                <CardBody>
                                  <Stack spacing={2}>
                                    <Text color="gray.500" fontSize="sm">
                                      테스트 데이터
                                    </Text>
                                    <Text fontSize="xl" fontWeight="bold">
                                      {dataset.stats.rows * 0.2}
                                    </Text>
                                    <Progress
                                      value={14.3}
                                      size="sm"
                                      colorScheme="orange"
                                    />
                                  </Stack>
                                </CardBody>
                              </Card>
                            </Grid>
                          </Stack>
                        </CardBody>
                      </Card>

                      <Alert status="info" borderRadius="md">
                        <AlertIcon />
                        데이터셋에 대한 자세한 통계는 실험 관리 페이지에서 확인할 수
                        있습니다.
                      </Alert>
                    </Stack>
                  </TabPanel>

                  {/* 버전 탭 */}
                  <TabPanel>
                    <DatasetVersions datasetId={params.id} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Grid>
      </Stack>
    </Box>
  )
}
