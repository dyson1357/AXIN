'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Box,
  Text,
  Icon,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FiUploadCloud, FiFile } from 'react-icons/fi'
import { useState } from 'react'

interface DatasetUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DatasetUploadModal({ isOpen, onClose }: DatasetUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const accentColor = '#EB6100'
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    // TODO: 실제 업로드 로직 구현
    console.log('Uploading file:', selectedFile)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>새 데이터셋 업로드</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6}>
            <Box
              w="full"
              h="200px"
              borderWidth={2}
              borderStyle="dashed"
              borderColor={selectedFile ? accentColor : 'gray.300'}
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={selectedFile ? 'orange.50' : 'gray.50'}
              position="relative"
              transition="all 0.2s"
              _hover={{ borderColor: accentColor }}
            >
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept=".csv,.json,.parquet,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                cursor="pointer"
              />
              <VStack spacing={2}>
                <Icon
                  as={selectedFile ? FiFile : FiUploadCloud}
                  boxSize={10}
                  color={selectedFile ? accentColor : 'gray.400'}
                />
                <Text fontWeight="medium" color={selectedFile ? 'black' : mutedTextColor}>
                  {selectedFile ? selectedFile.name : '파일을 드래그하거나 클릭하여 업로드'}
                </Text>
                <Text fontSize="sm" color={mutedTextColor}>
                  {selectedFile
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                    : 'CSV, JSON, Parquet, 이미지 파일 지원'}
                </Text>
              </VStack>
            </Box>

            <FormControl>
              <FormLabel>데이터셋 이름</FormLabel>
              <Input placeholder="데이터셋 이름을 입력하세요" />
            </FormControl>

            <FormControl>
              <FormLabel>설명</FormLabel>
              <Textarea
                placeholder="데이터셋에 대한 설명을 입력하세요"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>태그</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  #
                </InputLeftElement>
                <Input placeholder="쉼표로 구분하여 태그를 입력하세요" />
              </InputGroup>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button
            bg={accentColor}
            color="white"
            _hover={{ bg: 'orange.500' }}
            onClick={handleUpload}
            isDisabled={!selectedFile}
          >
            업로드
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
