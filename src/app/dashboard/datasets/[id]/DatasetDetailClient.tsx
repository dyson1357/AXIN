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
  Select,
  Divider,
  Progress,
  Alert,
  AlertIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import {
  FiDownload,
  FiShare2,
  FiDatabase,
  FiGrid,
  FiCpu,
  FiHardDrive,
  FiAlertCircle,
  FiCheckCircle,
  FiBarChart2,
  FiClock,
  FiTag,
  FiLayers,
} from 'react-icons/fi'
import { useState } from 'react'
import { DatasetPreview } from '@/components/datasets/DatasetPreview'
import { DatasetAnalysis } from '@/components/datasets/DatasetAnalysis'
import { DatasetMetadata } from '@/components/datasets/DatasetMetadata'
import DatasetVersions from '@/components/datasets/DatasetVersions'

interface DatasetDetailClientProps {
  datasetId: string
}

export default function DatasetDetailClient({ datasetId }: DatasetDetailClientProps) {
  const [selectedVersion, setSelectedVersion] = useState('latest')
  const bgCard = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const brandColor = '#EB6100'

  // 임시 데이터셋 데이터
  const mockDataset = {
    id: datasetId,
    name: '생산라인 센서 데이터셋 v2.1',
    description: '스마트 팩토리 생산라인의 실시간 센서 데이터 (온도, 압력, 진동, 속도)',
    type: 'TimeSeries',
    version: '2.1.0',
    previousVersion: '2.0.0',
    status: 'completed',
    size: 52428800, // 50MB
    rows: 87600,
    columns: 12,
    lastModified: '2024-02-07',
    createdAt: '2024-02-01',
    thumbnail: '/dataset-thumbnails/sensor-data.png',
    quality: {
      completeness: 99.2,
      consistency: 98.7,
      balance: 97.5,
      previous: {
        completeness: 98.5,
        consistency: 97.8,
        balance: 96.5,
      }
    },
    systemRequirements: {
      cpu: 'met',
      memory: 'met',
      storage: 'warning',
    },
    features: [
      { name: 'timestamp', type: 'datetime', missing: 0 },
      { name: 'temperature', type: 'float32', missing: 12 },
      { name: 'pressure', type: 'float32', missing: 8 },
      { name: 'vibration', type: 'float32', missing: 15 },
      { name: 'speed', type: 'float32', missing: 10 },
    ],
    statistics: {
      numerical: {
        mean: [18.5, 65.2, 2.1, 3.8],
        std: [8.2, 15.4, 5.6, 2.1],
        min: [-5.2, 20.0, 0.0, 0.0],
        max: [35.8, 100.0, 85.2, 15.6],
      },
    },
    versions: [
      { version: '2.1.0', date: '2024-02-07', status: 'current' },
      { version: '2.0.0', date: '2024-02-01', status: 'stable' },
      { version: '1.9.0', date: '2024-01-25', status: 'archived' },
    ],
    tags: ['시계열', '센서', '생산라인', '품질관리'],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return brandColor
      case 'processing':
        return 'blue'
      case 'failed':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: change.toFixed(1),
      isPositive: change > 0,
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Box as="main" px="4" ml="0" maxW="100%" mt="80px">
      <Stack spacing={6}>
        {/* 헤더 */}
        <HStack justify="space-between" align="flex-start">
          <Stack spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              {mockDataset.name}
            </Text>
            <Text color="gray.500">{mockDataset.description}</Text>
          </Stack>
          <HStack>
            <Button
              leftIcon={<Icon as={FiShare2} />}
              bg={brandColor}
              color="white"
              size="sm"
              _hover={{ bg: '#D55600' }}
            >
              공유
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

        {/* 주요 지표 */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <Card bg={bgCard} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.500">데이터 품질</StatLabel>
                <StatNumber>{mockDataset.quality.completeness}%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {getMetricChange(
                    mockDataset.quality.completeness,
                    mockDataset.quality.previous.completeness
                  ).value}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={bgCard} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.500">총 레코드</StatLabel>
                <StatNumber>{mockDataset.rows.toLocaleString()}</StatNumber>
                <StatHelpText>
                  <Icon as={FiBarChart2} color="green.500" mr={1} />
                  정상
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={bgCard} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.500">특성 수</StatLabel>
                <StatNumber>{mockDataset.columns}</StatNumber>
                <StatHelpText>
                  <Icon as={FiGrid} color="green.500" mr={1} />
                  정상
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={bgCard} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.500">데이터 크기</StatLabel>
                <StatNumber>{formatFileSize(mockDataset.size)}</StatNumber>
                <StatHelpText>
                  <Icon as={FiDatabase} color="green.500" mr={1} />
                  정상
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* 메인 컨텐츠 */}
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
                      src={mockDataset.thumbnail}
                      alt={mockDataset.name}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/300x200?text=No+Thumbnail"
                    />
                  </Box>
                  <Stack spacing={3}>
                    <HStack justify="space-between">
                      <Text color="gray.500">데이터 유형</Text>
                      <Text fontWeight="medium">{mockDataset.type}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">버전</Text>
                      <Text fontWeight="medium">v{mockDataset.version}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.500">상태</Text>
                      <Badge colorScheme={getStatusColor(mockDataset.status)}>
                        {mockDataset.status === 'completed' ? '완료됨' : '처리중'}
                      </Badge>
                    </HStack>
                    <Divider />
                    <Stack spacing={2}>
                      <Text color="gray.500" fontSize="sm">
                        데이터 품질 지표
                      </Text>
                      <Stack spacing={3}>
                        <Box>
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="sm">완전성</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {mockDataset.quality.completeness}%
                            </Text>
                          </HStack>
                          <Progress
                            value={mockDataset.quality.completeness}
                            size="sm"
                            colorScheme="orange"
                          />
                        </Box>
                        <Box>
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="sm">일관성</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {mockDataset.quality.consistency}%
                            </Text>
                          </HStack>
                          <Progress
                            value={mockDataset.quality.consistency}
                            size="sm"
                            colorScheme="orange"
                          />
                        </Box>
                        <Box>
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="sm">균형성</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {mockDataset.quality.balance}%
                            </Text>
                          </HStack>
                          <Progress
                            value={mockDataset.quality.balance}
                            size="sm"
                            colorScheme="orange"
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>

              {/* 시스템 요구사항 */}
              <Card bg={bgCard} borderColor={borderColor} mt={4}>
                <CardBody>
                  <Stack spacing={4}>
                    <Text fontWeight="medium">시스템 요구사항</Text>
                    <Stack spacing={3}>
                      <HStack justify="space-between">
                        <HStack>
                          <Icon
                            as={FiCpu}
                            color={mockDataset.systemRequirements.cpu === 'met' ? 'green.500' : 'orange.500'}
                          />
                          <Text>CPU</Text>
                        </HStack>
                        <Badge colorScheme={mockDataset.systemRequirements.cpu === 'met' ? 'green' : 'orange'}>
                          {mockDataset.systemRequirements.cpu === 'met' ? '충족됨' : '주의'}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <HStack>
                          <Icon
                            as={FiHardDrive}
                            color={mockDataset.systemRequirements.memory === 'met' ? 'green.500' : 'orange.500'}
                          />
                          <Text>메모리</Text>
                        </HStack>
                        <Badge colorScheme={mockDataset.systemRequirements.memory === 'met' ? 'green' : 'orange'}>
                          {mockDataset.systemRequirements.memory === 'met' ? '충족됨' : '주의'}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <HStack>
                          <Icon
                            as={FiDatabase}
                            color={mockDataset.systemRequirements.storage === 'met' ? 'green.500' : 'orange.500'}
                          />
                          <Text>스토리지</Text>
                        </HStack>
                        <Badge colorScheme={mockDataset.systemRequirements.storage === 'met' ? 'green' : 'orange'}>
                          {mockDataset.systemRequirements.storage === 'met' ? '충족됨' : '주의'}
                        </Badge>
                      </HStack>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>

              {/* 태그 */}
              <Card bg={bgCard} borderColor={borderColor} mt={4}>
                <CardBody>
                  <Stack spacing={3}>
                    <Text fontWeight="medium">태그</Text>
                    <HStack flexWrap="wrap" spacing={2}>
                      {mockDataset.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          colorScheme="orange"
                          variant="subtle"
                          px={2}
                          py={1}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </Stack>

          {/* 오른쪽: 탭 컨텐츠 */}
          <Stack spacing={6}>
            <Card bg={bgCard} borderColor={borderColor}>
              <CardBody>
                <Tabs>
                  <TabList>
                    <Tab>데이터 미리보기</Tab>
                    <Tab>통계 분석</Tab>
                    <Tab>메타데이터</Tab>
                    <Tab>버전 관리</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <DatasetPreview dataset={mockDataset} />
                    </TabPanel>
                    <TabPanel>
                      <DatasetAnalysis dataset={mockDataset} />
                    </TabPanel>
                    <TabPanel>
                      <DatasetMetadata dataset={mockDataset} />
                    </TabPanel>
                    <TabPanel>
                      <DatasetVersions dataset={mockDataset} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  )
}
