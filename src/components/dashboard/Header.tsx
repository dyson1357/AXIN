'use client'

import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FiSearch,
  FiMoon,
  FiSun,
  FiBell,
  FiCpu,
  FiHardDrive,
  FiDatabase,
  FiPlus,
  FiUploadCloud,
  FiPlay,
  FiServer
} from 'react-icons/fi'
import { useState } from 'react'

const QuickActions = [
  {
    name: 'New Experiment',
    icon: FiPlus,
    description: 'Start a new ML experiment',
    shortcut: '⌘N',
    color: 'blue.500',
  },
  {
    name: 'Upload Dataset',
    icon: FiUploadCloud,
    description: 'Upload a new dataset',
    shortcut: '⌘U',
    color: 'green.500',
  },
  {
    name: 'Run Pipeline',
    icon: FiPlay,
    description: 'Execute ML pipeline',
    shortcut: '⌘R',
    color: 'purple.500',
  },
  {
    name: 'Deploy Model',
    icon: FiServer,
    description: 'Deploy trained model',
    shortcut: '⌘D',
    color: 'orange.500',
  },
]

const ResourceMetrics = [
  {
    name: 'CPU Usage',
    icon: FiCpu,
    value: '75%',
    color: 'red.500',
  },
  {
    name: 'Memory',
    icon: FiHardDrive,
    value: '60%',
    color: 'blue.500',
  },
  {
    name: 'GPU Usage',
    icon: FiDatabase,
    value: '90%',
    color: 'green.500',
  },
]

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [searchQuery, setSearchQuery] = useState('')

  // Mock resource usage data (should fetch from API in production)
  const resourceUsage = {
    cpu: '45%',
    memory: '60%',
    storage: '35%',
    gpu: '25%'
  }

  const bgColor = useColorModeValue('white', 'dark.card')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center">
        {/* Search Bar */}
        <Box flex={1} maxW="600px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search projects, models, datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="filled"
              _focus={{
                borderColor: 'brand.primary',
                boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
              }}
            />
          </InputGroup>
        </Box>

        {/* Quick Actions */}
        <HStack spacing={4} ml={8}>
          <Tooltip label="Create new project" placement="bottom">
            <Button
              leftIcon={<FiPlus />}
              variant="primary"
              size="sm"
            >
              New Project
            </Button>
          </Tooltip>

          <HStack spacing={2}>
            {QuickActions.map((action) => (
              <Tooltip key={action.name} label={action.description} placement="bottom">
                <IconButton
                  aria-label={action.name}
                  icon={<Icon as={action.icon} />}
                  variant="ghost"
                  size="sm"
                  color={action.color}
                />
              </Tooltip>
            ))}
          </HStack>

          {/* Resource Monitoring */}
          <Menu>
            <Tooltip label="Resource Monitoring" placement="bottom">
              <MenuButton
                as={IconButton}
                aria-label="Resource Monitoring"
                icon={<FiCpu />}
                variant="ghost"
                size="sm"
              />
            </Tooltip>
            <MenuList>
              {ResourceMetrics.map((metric) => (
                <MenuItem key={metric.name} closeOnSelect={false}>
                  <HStack spacing={3}>
                    <Icon as={metric.icon} />
                    <Text>{metric.name}</Text>
                    <Text color={metric.color} fontWeight="bold">{metric.value}</Text>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          {/* Notifications */}
          <Tooltip label="Notifications" placement="bottom">
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              size="sm"
            />
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Tooltip label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'} placement="bottom">
            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  )
}
