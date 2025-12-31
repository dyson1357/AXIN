'use client'

import { Box, Flex } from '@chakra-ui/react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { useState } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <Flex h="100vh">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Box
        flex="1"
        ml={{ base: 0, lg: isSidebarCollapsed ? '80px' : '280px' }}
        transition="margin-left 0.3s"
      >
        <Header />
        <Box as="main" p={0} overflowY="auto" h="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
