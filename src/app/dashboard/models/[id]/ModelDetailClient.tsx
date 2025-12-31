'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Flex,
  Grid,
  GridItem,
  Heading,
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
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Wrap,
  Tag,
  TagLabel,
  TagCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  ChevronDownIcon,
} from '@chakra-ui/react'
import {
  FiCpu,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiServer,
  FiZap,
  FiDatabase,
  FiPackage,
  FiGitBranch,
  FiPlay,
  FiCheckCircle,
  FiAlertCircle,
  FiRotateCcw,
  FiBarChart2,
  FiHash,
} from 'react-icons/fi'
import React, { useState, useEffect } from 'react'
import { ModelDeployment } from '@/components/models/ModelDeployment'
import { ModelComparison } from '@/components/models/ModelComparison'
import PerformanceTab from '@/components/models/PerformanceTab'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface ModelDetailClientProps {
  modelId: string
}

export default function ModelDetailClient({ modelId }: ModelDetailClientProps) {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState('onnx')
  const bgCard = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const brandColor = '#EB6100'

  // 임시 모델 데이터 - 실제로는 API에서 가져와야 함
  const mockModel = {
    id: modelId,
    name: 'MNIST 분류기 v2.1',
    description: 'CNN 아키텍처를 사용한 개선된 MNIST 분류 모델',
    framework: 'PyTorch',
    version: '2.1.0',
    previousVersion: '2.0.0',
    status: '배포됨',
    accuracy: 0.985,
    previousAccuracy: 0.975,
    trainTime: '2시간 15분',
    dataset: {
      name: 'MNIST',
      size: '60,000개 이미지',
      split: '훈련 80%, 테스트 20%',
      format: 'PNG 이미지',
    },
    createdAt: '2025-02-07',
    updatedAt: '2025-02-07',
    deployedAt: '2025-02-07',
    author: '홍길동',
    task: '이미지 분류',
    thumbnail: '/model-thumbnails/mnist-cnn.png',
    servingStatus: {
      isDeployed: true,
      health: '정상',
      requirements: {
        cpu: '충족',
        memory: '충족',
        gpu: '경고',
      },
      latency: '45ms',
      throughput: '120 요청/초',
      uptime: '99.9%',
    },
    metrics: {
      accuracy: 0.985,
      precision: 0.982,
      recall: 0.987,
      f1Score: 0.984,
      auc: 0.991,
      latency: 45,
      throughput: 120,
    },
    previousMetrics: {
      accuracy: 0.975,
      precision: 0.973,
      recall: 0.976,
      f1Score: 0.974,
      auc: 0.982,
      latency: 50,
      throughput: 100,
    },
    versions: [
      {
        version: '2.1.0',
        status: 'deployed',
        createdAt: '2025-02-07',
        metrics: {
          accuracy: 0.985,
          precision: 0.982,
          recall: 0.987,
          f1Score: 0.984,
          auc: 0.991,
          latency: 45,
          throughput: 120,
        },
        trainingHistory: [
          { epoch: 1, trainAccuracy: 0.85, trainLoss: 0.42, valAccuracy: 0.84, valLoss: 0.43 },
          { epoch: 2, trainAccuracy: 0.89, trainLoss: 0.35, valAccuracy: 0.88, valLoss: 0.36 },
          { epoch: 3, trainAccuracy: 0.92, trainLoss: 0.28, valAccuracy: 0.91, valLoss: 0.29 },
          { epoch: 4, trainAccuracy: 0.94, trainLoss: 0.22, valAccuracy: 0.93, valLoss: 0.23 },
          { epoch: 5, trainAccuracy: 0.95, trainLoss: 0.18, valAccuracy: 0.94, valLoss: 0.19 },
          { epoch: 6, trainAccuracy: 0.96, trainLoss: 0.15, valAccuracy: 0.95, valLoss: 0.16 },
          { epoch: 7, trainAccuracy: 0.97, trainLoss: 0.13, valAccuracy: 0.96, valLoss: 0.14 },
          { epoch: 8, trainAccuracy: 0.975, trainLoss: 0.11, valAccuracy: 0.965, valLoss: 0.12 },
          { epoch: 9, trainAccuracy: 0.98, trainLoss: 0.10, valAccuracy: 0.97, valLoss: 0.11 },
          { epoch: 10, trainAccuracy: 0.985, trainLoss: 0.09, valAccuracy: 0.975, valLoss: 0.10 },
        ],
      },
      {
        version: '2.0.0',
        status: 'archived',
        createdAt: '2025-02-01',
        metrics: {
          accuracy: 0.975,
          precision: 0.973,
          recall: 0.976,
          f1Score: 0.974,
          auc: 0.982,
          latency: 50,
          throughput: 100,
        },
        trainingHistory: [
          { epoch: 1, trainAccuracy: 0.80, trainLoss: 0.45, valAccuracy: 0.79, valLoss: 0.46 },
          { epoch: 2, trainAccuracy: 0.85, trainLoss: 0.38, valAccuracy: 0.84, valLoss: 0.39 },
          { epoch: 3, trainAccuracy: 0.90, trainLoss: 0.31, valAccuracy: 0.89, valLoss: 0.32 },
          { epoch: 4, trainAccuracy: 0.92, trainLoss: 0.25, valAccuracy: 0.91, valLoss: 0.26 },
          { epoch: 5, trainAccuracy: 0.93, trainLoss: 0.21, valAccuracy: 0.92, valLoss: 0.22 },
          { epoch: 6, trainAccuracy: 0.94, trainLoss: 0.18, valAccuracy: 0.93, valLoss: 0.19 },
          { epoch: 7, trainAccuracy: 0.95, trainLoss: 0.16, valAccuracy: 0.94, valLoss: 0.17 },
          { epoch: 8, trainAccuracy: 0.96, trainLoss: 0.14, valAccuracy: 0.955, valLoss: 0.15 },
          { epoch: 9, trainAccuracy: 0.97, trainLoss: 0.13, valAccuracy: 0.96, valLoss: 0.14 },
          { epoch: 10, trainAccuracy: 0.975, trainLoss: 0.12, valAccuracy: 0.965, valLoss: 0.13 },
        ],
      },
    ],
  }

  // 관련 모델 데이터 추가
  const mockRelatedModels = [
    {
      id: 'model-2',
      name: 'MNIST 분류기 v2.0',
      version: '2.0.0',
      framework: 'PyTorch',
      task: '이미지 분류',
      status: '아카이브됨',
      accuracy: 0.975,
      f1Score: 0.973,
      precision: 0.971,
      recall: 0.975,
      createdAt: '2025-02-01',
      updatedAt: '2025-02-01',
      author: '홍길동',
    },
    {
      id: 'model-3',
      name: 'MNIST 분류기 v1.0',
      version: '1.0.0',
      framework: 'PyTorch',
      task: '이미지 분류',
      status: '아카이브됨',
      accuracy: 0.965,
      f1Score: 0.963,
      precision: 0.961,
      recall: 0.965,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
      author: '홍길동',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case '배포됨':
      case '정상':
      case '충족':
        return 'green'
      case '훈련중':
        return 'blue'
      case '실패':
      case '경고':
        return 'red'
      case '아카이브됨':
        return 'gray'
      default:
        return 'gray'
    }
  }

  const getMetricColor = (value: number) => {
    if (value >= 0.95) return 'green'
    if (value >= 0.9) return 'blue'
    if (value >= 0.8) return 'yellow'
    return 'red'
  }

  const formatMetric = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  const getBestMetric = (metric: keyof Pick<Model, 'accuracy' | 'f1Score' | 'precision' | 'recall'>) => {
    return Math.max(...models.map(model => model[metric]))
  }

  const handleComparisonClick = () => {
    setIsComparisonOpen(!isComparisonOpen)
  }

  // 성능 메트릭스 레이더 차트 데이터
  const performanceMetricsData = [
    {
      metric: '정확도',
      현재: mockModel.metrics.accuracy * 100,
      이전: mockModel.previousMetrics.accuracy * 100,
    },
    {
      metric: '정밀도',
      현재: mockModel.metrics.precision * 100,
      이전: mockModel.previousMetrics.precision * 100,
    },
    {
      metric: '재현율',
      현재: mockModel.metrics.recall * 100,
      이전: mockModel.previousMetrics.recall * 100,
    },
    {
      metric: 'F1 점수',
      현재: mockModel.metrics.f1Score * 100,
      이전: mockModel.previousMetrics.f1Score * 100,
    },
    {
      metric: 'AUC',
      현재: mockModel.metrics.auc * 100,
      이전: mockModel.previousMetrics.auc * 100,
    },
  ]

  // 학습 히스토리 데이터 변환
  const currentVersion = mockModel.versions.find(v => v.version === mockModel.version)
  const trainingHistoryData = currentVersion?.trainingHistory || []

  const [selectedVersions, setSelectedVersions] = useState<string[]>([mockModel.version])

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        {/* 모델 개요 카드 */}
        <GridItem colSpan={12}>
          <Card bg={bgCard} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={2}>
                  <Image
                    src={mockModel.thumbnail}
                    alt={mockModel.name}
                    borderRadius="lg"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </GridItem>
                <GridItem colSpan={7}>
                  <Stack spacing={2}>
                    <HStack>
                      <Text fontSize="2xl" fontWeight="bold">
                        {mockModel.name}
                      </Text>
                      <Badge colorScheme={mockModel.status === '배포됨' ? 'green' : 'gray'}>
                        {mockModel.status}
                      </Badge>
                    </HStack>
                    <Text color="gray.500">{mockModel.description}</Text>
                    <HStack spacing={4}>
                      <HStack>
                        <Icon as={FiPackage} />
                        <Text>{mockModel.framework}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiGitBranch} />
                        <Text>v{mockModel.version}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiDatabase} />
                        <Text>{mockModel.dataset.name}</Text>
                      </HStack>
                    </HStack>
                  </Stack>
                </GridItem>
                <GridItem colSpan={3}>
                  <VStack align="stretch" spacing={3}>
                    <Box>
                      <Text fontSize="sm" color="gray.500">서빙 상태</Text>
                      <HStack mt={1}>
                        <Icon
                          as={mockModel.servingStatus.health === '정상' ? FiCheckCircle : FiAlertCircle}
                          color={mockModel.servingStatus.health === '정상' ? 'green.500' : 'orange.500'}
                        />
                        <Text>{mockModel.servingStatus.health}</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">성능</Text>
                      <HStack mt={1}>
                        <Icon as={FiActivity} />
                        <Text>지연시간 {mockModel.servingStatus.latency}</Text>
                      </HStack>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>

        {/* 탭 섹션 */}
        <GridItem colSpan={12}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>개요</Tab>
              <Tab>배포</Tab>
              <Tab>성능</Tab>
              <Tab>버전</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  {/* 메트릭스 개요 */}
                  <GridItem colSpan={8}>
                    <Card bg={bgCard}>
                      <CardBody>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>성능 메트릭스</Text>
                        <Box height="300px" mb={6}>
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={performanceMetricsData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="metric" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} />
                              <Radar
                                name="현재 버전"
                                dataKey="현재"
                                stroke={brandColor}
                                fill={brandColor}
                                fillOpacity={0.3}
                              />
                              <Radar
                                name="이전 버전"
                                dataKey="이전"
                                stroke="#777777"
                                fill="#777777"
                                fillOpacity={0.3}
                              />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        </Box>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                          {Object.entries(mockModel.metrics)
                            .filter(([key]) => key !== 'confusionMatrix')
                            .map(([key, value]) => (
                              <GridItem key={key}>
                                <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                                  <HStack justify="space-between" align="center">
                                    <Text fontWeight="medium" color="gray.500" textTransform="capitalize">
                                      {key === 'accuracy' ? '정확도' :
                                       key === 'precision' ? '정밀도' :
                                       key === 'recall' ? '재현율' :
                                       key === 'f1Score' ? 'F1 점수' :
                                       key === 'auc' ? 'AUC' : key}
                                    </Text>
                                    <HStack spacing={2}>
                                      <Text fontWeight="bold">
                                        {typeof value === 'number' ? value.toFixed(3) : value}
                                      </Text>
                                      {mockModel.previousMetrics && mockModel.previousMetrics[key] && (
                                        <Badge
                                          colorScheme={
                                            value > mockModel.previousMetrics[key] ? 'green' : 'red'
                                          }
                                          fontSize="xs"
                                          display="flex"
                                          alignItems="center"
                                        >
                                          <Icon
                                            as={value > mockModel.previousMetrics[key] ? FiTrendingUp : FiTrendingDown}
                                            mr={1}
                                          />
                                          {(
                                            ((value - mockModel.previousMetrics[key]) /
                                              mockModel.previousMetrics[key]) *
                                            100
                                          ).toFixed(1)}
                                          %
                                        </Badge>
                                      )}
                                    </HStack>
                                  </HStack>
                                </Box>
                              </GridItem>
                            ))}
                        </Grid>
                      </CardBody>
                    </Card>
                  </GridItem>

                  {/* 리소스 요구사항 */}
                  <GridItem colSpan={4}>
                    <Card bg={bgCard}>
                      <CardBody>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>리소스 상태</Text>
                        <Stack spacing={4}>
                          <Box>
                            <HStack justify="space-between" mb={2}>
                              <Text>CPU 사용량</Text>
                              <Badge
                                colorScheme={mockModel.servingStatus.requirements.cpu === '충족' ? 'green' : 'orange'}
                              >
                                {mockModel.servingStatus.requirements.cpu}
                              </Badge>
                            </HStack>
                            <Progress
                              value={75}
                              colorScheme={mockModel.servingStatus.requirements.cpu === '충족' ? 'green' : 'orange'}
                            />
                          </Box>
                          <Box>
                            <HStack justify="space-between" mb={2}>
                              <Text>메모리 사용량</Text>
                              <Badge
                                colorScheme={mockModel.servingStatus.requirements.memory === '충족' ? 'green' : 'orange'}
                              >
                                {mockModel.servingStatus.requirements.memory}
                              </Badge>
                            </HStack>
                            <Progress
                              value={60}
                              colorScheme={mockModel.servingStatus.requirements.memory === '충족' ? 'green' : 'orange'}
                            />
                          </Box>
                          <Box>
                            <HStack justify="space-between" mb={2}>
                              <Text>GPU 사용량</Text>
                              <Badge
                                colorScheme={mockModel.servingStatus.requirements.gpu === '충족' ? 'green' : 'orange'}
                              >
                                {mockModel.servingStatus.requirements.gpu}
                              </Badge>
                            </HStack>
                            <Progress
                              value={90}
                              colorScheme={mockModel.servingStatus.requirements.gpu === '충족' ? 'green' : 'orange'}
                            />
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>
              </TabPanel>

              <TabPanel>
                <ModelDeployment
                  model={{
                    id: mockModel.id,
                    name: mockModel.name,
                    currentVersion: mockModel.version,
                    versions: mockModel.versions.map(v => v.version),
                  }}
                />
              </TabPanel>

              <TabPanel>
                <PerformanceTab
                  versions={mockModel.versions}
                  selectedVersions={selectedVersions}
                  setSelectedVersions={setSelectedVersions}
                />
              </TabPanel>

              <TabPanel>
                <Card bg={bgCard}>
                  <CardBody>
                    <Stack spacing={6}>
                      {mockModel.versions.map((version, index) => (
                        <Box
                          key={version.version}
                          p={6}
                          borderWidth="1px"
                          borderRadius="lg"
                          borderColor={borderColor}
                          transition="all 0.2s"
                          _hover={{
                            borderColor: brandColor,
                            transform: 'translateY(-2px)',
                            boxShadow: 'md'
                          }}
                        >
                          <Stack spacing={4}>
                            {/* 버전 헤더 */}
                            <Grid templateColumns="repeat(12, 1fr)" gap={4} alignItems="center">
                              <GridItem colSpan={3}>
                                <HStack>
                                  <Badge
                                    colorScheme={
                                      version.version === mockModel.version
                                        ? 'orange'
                                        : version.status === 'deployed'
                                        ? 'green'
                                        : 'gray'
                                    }
                                    fontSize="sm"
                                    px={2}
                                    py={1}
                                  >
                                    {version.version === mockModel.version ? '현재' : 
                                     version.status === 'deployed' ? '배포됨' : '아카이브'}
                                  </Badge>
                                  <Text fontWeight="bold">v{version.version}</Text>
                                </HStack>
                              </GridItem>
                              <GridItem colSpan={3}>
                                <HStack>
                                  <Icon as={FiClock} color={brandColor} />
                                  <Text color="gray.500">{version.createdAt}</Text>
                                </HStack>
                              </GridItem>
                              <GridItem colSpan={4}>
                                <SimpleGrid columns={3} spacing={4}>
                                  <Stat size="sm">
                                    <StatLabel color="gray.500">정확도</StatLabel>
                                    <StatNumber>{(version.metrics.accuracy * 100).toFixed(1)}%</StatNumber>
                                    {index < mockModel.versions.length - 1 && (
                                      <StatHelpText>
                                        <StatArrow 
                                          type={version.metrics.accuracy > mockModel.versions[index + 1].metrics.accuracy ? 'increase' : 'decrease'} 
                                        />
                                        {Math.abs((version.metrics.accuracy - mockModel.versions[index + 1].metrics.accuracy) * 100).toFixed(1)}%
                                      </StatHelpText>
                                    )}
                                  </Stat>
                                  <Stat size="sm">
                                    <StatLabel color="gray.500">F1 점수</StatLabel>
                                    <StatNumber>{(version.metrics.f1Score * 100).toFixed(1)}%</StatNumber>
                                    {index < mockModel.versions.length - 1 && (
                                      <StatHelpText>
                                        <StatArrow 
                                          type={version.metrics.f1Score > mockModel.versions[index + 1].metrics.f1Score ? 'increase' : 'decrease'} 
                                        />
                                        {Math.abs((version.metrics.f1Score - mockModel.versions[index + 1].metrics.f1Score) * 100).toFixed(1)}%
                                      </StatHelpText>
                                    )}
                                  </Stat>
                                  <Stat size="sm">
                                    <StatLabel color="gray.500">지연시간</StatLabel>
                                    <StatNumber>{version.metrics.latency}ms</StatNumber>
                                    {index < mockModel.versions.length - 1 && (
                                      <StatHelpText>
                                        <StatArrow 
                                          type={version.metrics.latency < mockModel.versions[index + 1].metrics.latency ? 'increase' : 'decrease'} 
                                        />
                                        {Math.abs(version.metrics.latency - mockModel.versions[index + 1].metrics.latency)}ms
                                      </StatHelpText>
                                    )}
                                  </Stat>
                                </SimpleGrid>
                              </GridItem>
                              <GridItem colSpan={2}>
                                <HStack justify="flex-end" spacing={2}>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    leftIcon={<Icon as={FiRotateCcw} />}
                                    isDisabled={version.version === mockModel.version}
                                    colorScheme="orange"
                                    _hover={{
                                      bg: 'orange.50',
                                      transform: 'scale(1.05)'
                                    }}
                                    _active={{
                                      bg: 'orange.100'
                                    }}
                                  >
                                    롤백
                                  </Button>
                                </HStack>
                              </GridItem>
                            </Grid>

                            {/* 버전 상세 정보 */}
                            <Divider />
                            <SimpleGrid columns={3} spacing={4}>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={2}>학습 데이터</Text>
                                <Stack spacing={2}>
                                  <HStack>
                                    <Icon as={FiDatabase} color={brandColor} />
                                    <Text>데이터셋: {mockModel.dataset.name}</Text>
                                  </HStack>
                                  <HStack>
                                    <Icon as={FiHash} color={brandColor} />
                                    <Text>샘플 수: {mockModel.dataset.size}</Text>
                                  </HStack>
                                </Stack>
                              </Box>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={2}>학습 시간</Text>
                                <Stack spacing={2}>
                                  <HStack>
                                    <Icon as={FiClock} color={brandColor} />
                                    <Text>{mockModel.trainTime}</Text>
                                  </HStack>
                                </Stack>
                              </Box>
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={2}>성능 지표</Text>
                                <Stack spacing={2}>
                                  <HStack>
                                    <Icon as={FiActivity} color={brandColor} />
                                    <Text>처리량: {version.metrics.throughput} 요청/초</Text>
                                  </HStack>
                                  <HStack>
                                    <Icon as={FiBarChart2} color={brandColor} />
                                    <Text>정밀도: {(version.metrics.precision * 100).toFixed(1)}%</Text>
                                  </HStack>
                                </Stack>
                              </Box>
                            </SimpleGrid>
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  )
}
