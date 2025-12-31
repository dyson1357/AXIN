'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewExperimentPage() {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dataset: '',
    model: '',
    learningRate: '0.001',
    batchSize: '32',
    epochs: '10',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: API 연동
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: '실험이 생성되었습니다.',
        status: 'success',
        duration: 3000,
      })
      
      router.push('/dashboard/experiments')
    } catch (error) {
      toast({
        title: '실험 생성 실패',
        description: '잠시 후 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box pt="80px" px="4">
      <Card>
        <CardBody>
          <Stack spacing={8} as="form" onSubmit={handleSubmit}>
            <Stack>
              <Heading size="lg">새 실험 생성</Heading>
              <Text color="gray.500">
                새로운 머신러닝 실험을 설정하고 시작하세요
              </Text>
            </Stack>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>실험 이름</FormLabel>
                  <Input
                    placeholder="실험 이름을 입력하세요"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl>
                  <FormLabel>설명</FormLabel>
                  <Input
                    placeholder="실험에 대한 설명을 입력하세요"
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel>데이터셋</FormLabel>
                  <Select
                    placeholder="데이터셋 선택"
                    value={formData.dataset}
                    onChange={e => setFormData(prev => ({ ...prev, dataset: e.target.value }))}
                  >
                    <option value="MNIST">MNIST</option>
                    <option value="CIFAR-10">CIFAR-10</option>
                    <option value="IMDB">IMDB Reviews</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel>모델</FormLabel>
                  <Select
                    placeholder="모델 선택"
                    value={formData.model}
                    onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  >
                    <option value="CNN">CNN</option>
                    <option value="ResNet18">ResNet18</option>
                    <option value="BERT">BERT</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Learning Rate</FormLabel>
                  <Input
                    type="number"
                    step="0.0001"
                    value={formData.learningRate}
                    onChange={e => setFormData(prev => ({ ...prev, learningRate: e.target.value }))}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Batch Size</FormLabel>
                  <Input
                    type="number"
                    value={formData.batchSize}
                    onChange={e => setFormData(prev => ({ ...prev, batchSize: e.target.value }))}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Epochs</FormLabel>
                  <Input
                    type="number"
                    value={formData.epochs}
                    onChange={e => setFormData(prev => ({ ...prev, epochs: e.target.value }))}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Stack direction="row" spacing={4} justify="flex-end">
              <Button
                variant="ghost"
                onClick={() => router.back()}
              >
                취소
              </Button>
              <Button
                type="submit"
                colorScheme="brand"
                isLoading={isLoading}
              >
                실험 생성
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}
