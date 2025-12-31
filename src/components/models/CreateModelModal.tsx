'use client'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FileUpload } from '../common/FileUpload'

interface CreateModelModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateModelModal({ isOpen, onClose }: CreateModelModalProps) {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [modelFile, setModelFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: 실제 모델 생성 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast({
        title: '모델이 생성되었습니다.',
        status: 'success',
        duration: 3000,
      })
      onClose()
    } catch (error) {
      toast({
        title: '모델 생성 실패',
        description: '잠시 후 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>새 모델 생성</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>모델명</FormLabel>
              <Input placeholder="예: MNIST Classifier v1.0" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>설명</FormLabel>
              <Textarea
                placeholder="모델에 대한 간단한 설명을 입력하세요."
                rows={3}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>프레임워크</FormLabel>
              <Select placeholder="프레임워크 선택">
                <option value="pytorch">PyTorch</option>
                <option value="tensorflow">TensorFlow</option>
                <option value="scikit-learn">Scikit-learn</option>
                <option value="xgboost">XGBoost</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>데이터셋</FormLabel>
              <Select placeholder="데이터셋 선택">
                <option value="mnist">MNIST</option>
                <option value="cifar10">CIFAR-10</option>
                <option value="imagenet">ImageNet</option>
                <option value="custom">Custom Dataset</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>모델 파일</FormLabel>
              <FileUpload
                accept={{
                  'application/x-python-pickle': ['.pkl'],
                  'application/octet-stream': ['.pth', '.h5', '.joblib'],
                }}
                onFileSelect={file => setModelFile(file)}
                placeholder="모델 파일을 드래그하여 업로드하거나 클릭하여 선택하세요"
              />
            </FormControl>

            <FormControl>
              <FormLabel>썸네일 이미지</FormLabel>
              <FileUpload
                accept={{
                  'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                }}
                onFileSelect={file => setThumbnailFile(file)}
                placeholder="이미지 파일을 드래그하여 업로드하거나 클릭하여 선택하세요"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            취소
          </Button>
          <Button colorScheme="orange" onClick={handleSubmit}>
            생성
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
