'use client'

import {
  Box,
  Button,
  Container,
  Text,
  useColorModeValue,
  Flex,
  Image,
  ButtonGroup,
} from '@chakra-ui/react'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function NotFound() {
  const bgColor = useColorModeValue('#FAFAFA', '#1A1A1A')
  const textColor = useColorModeValue('#1A1A1A', '#FAFAFA')
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('#FF6B00', '#FF8533')
  const circleColor = useColorModeValue('#FF6B00', '#FF8533')

  return (
    <Box 
      minH="100vh" 
      bg={bgColor} 
      position="relative"
      overflow="hidden"
      suppressHydrationWarning
    >
      {/* Logo */}
      <Box
        position="absolute"
        top={{ base: "4", md: "8" }}
        left={{ base: "4", md: "8" }}
      >
        <Image
          src="/4inlab_logo.png"
          alt="4INLAB Logo"
          height={{ base: "40px", md: "50px" }}
        />
      </Box>

      {/* Floating circles */}
      {[
        { left: 10, top: 15 },
        { left: 85, top: 20 },
        { left: 70, top: 50 },
        { left: 20, top: 60 },
        { left: 90, top: 75 },
        { left: 15, top: 80 },
        { left: 65, top: 30 },
        { left: 35, top: 45 },
      ].map((pos, i) => (
        <Box
          key={i}
          position="absolute"
          width={{ base: "40px", md: "60px" }}
          height={{ base: "40px", md: "60px" }}
          borderRadius="full"
          border="2px solid"
          borderColor={circleColor}
          left={`${pos.left}%`}
          top={`${pos.top}%`}
          opacity={0.15}
          sx={{
            '@keyframes float': {
              '0%': { transform: 'translate(0, 0) rotate(0deg)' },
              '50%': { transform: 'translate(15px, -15px) rotate(180deg)' },
              '100%': { transform: 'translate(0, 0) rotate(360deg)' }
            },
            animation: `float ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}

      <Container maxW="container.xl" h="100vh">
        <Flex
          direction="column"
          justify="center"
          align="flex-start"
          h="full"
          px={{ base: 4, md: 8 }}
          position="relative"
        >
          <Box position="relative" mb={8}>
            <Text
              fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }}
              fontWeight="bold"
              color="transparent"
              letterSpacing="tight"
              lineHeight="1"
              sx={{
                WebkitTextStroke: `2px ${accentColor}`,
                position: 'relative',
                zIndex: 2,
              }}
            >
              404
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              color={textColor}
              letterSpacing="tight"
              lineHeight="1"
              mt={2}
            >
              Page not found
            </Text>
          </Box>

          <Box maxW="md" mb={12}>
            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              color={mutedTextColor}
              mb={2}
              fontWeight="medium"
            >
              Sorry, this page is under construction..🛠️
            </Text>
            <Text 
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              We are working hard to remodel for a more convenient MLOps service.
              <br />
              Please wait a moment, and we'll be back with a great makeover!
            </Text>
          </Box>

          <ButtonGroup spacing={4}>
            <Button
              onClick={() => window.history.back()}
              leftIcon={<FiArrowLeft />}
              variant="outline"
              size="lg"
              borderColor={accentColor}
              color={accentColor}
              _hover={{
                bg: 'transparent',
                transform: 'translateX(-10px)',
              }}
              transition="all 0.2s"
            >
              Previous Page
            </Button>

            <Button
              as={Link}
              href="/"
              rightIcon={<FiArrowRight />}
              bg={accentColor}
              color="white"
              size="lg"
              px={8}
              _hover={{
                bg: accentColor,
                transform: 'translateX(10px)',
                textDecoration: 'none'
              }}
              _active={{
                bg: accentColor,
              }}
              transition="all 0.2s"
            >
              Go to Dashboard
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  )
}
