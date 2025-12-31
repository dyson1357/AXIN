/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Text,
  Html,
  Environment,
  Grid,
  RoundedBox,
  GizmoHelper,
  GizmoViewport
} from '@react-three/drei';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { equipmentData } from '@/lib/dummyData';
import * as THREE from 'three';

// 기본 바닥 구성 요소 (라이트 테마)
const Floor = () => {
  return (
    <>
      <Grid
        position={[0, -0.01, 0]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#e2e8f0"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#cbd5e1"
        fadeDistance={30}
        infiniteGrid
      />
      {/* 바닥면 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </>
  );
};

// 설비 주변 표시등
const StatusIndicator = ({ status, position }: { status: string; position: [number, number, number] }) => {
  const statusColors = {
    normal: '#22C55E',
    warning: '#EAB308',
    error: '#EF4444',
  };

  const color = statusColors[status as keyof typeof statusColors] || '#6B7280';

  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      // 상태에 따라 다른 애니메이션
      if (status === 'normal') {
        ringRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05);
      } else if (status === 'warning') {
        ringRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 3) * 0.1);
      } else if (status === 'error') {
        ringRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 5) * 0.2);
      }
    }
  });

  return (
    <group position={position}>
      {/* 중앙 구 */}
      <mesh castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* 외부 빛나는 링 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

interface EquipmentProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  name: string;
  status: 'normal' | 'warning' | 'error';
  onClick: () => void;
  isHovered: boolean;
  type: string;
}

const Equipment: React.FC<EquipmentProps> = ({
  position,
  size,
  color,
  name,
  status,
  onClick,
  isHovered,
  type,
}) => {
  // 마우스 호버 효과를 위한 색상 설정
  const [hoverScale, setHoverScale] = useState(1);

  const hoverColor = '#FFFFFF';
  const normalColor = color;

  useEffect(() => {
    setHoverScale(isHovered ? 1.05 : 1);
  }, [isHovered]);

  // 장비 타입에 따른 표현 변경 (고품질 PBR 재질)
  const renderEquipmentModel = () => {
    // 공통 메탈 재질 속성
    const metalMaterial = {
      color: isHovered ? '#ffffff' : normalColor,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.5,
    };

    const darkMetalMaterial = {
      color: isHovered ? '#e2e8f0' : '#1e293b',
      metalness: 0.9,
      roughness: 0.15,
      envMapIntensity: 1.2,
    };

    const accentMaterial = {
      color: isHovered ? '#f1f5f9' : '#64748b',
      metalness: 0.6,
      roughness: 0.3,
      envMapIntensity: 1.0,
    };

    if (type.includes('주입 성형기')) {
      return (
        <group>
          {/* 메인 본체 - 산업용 금속 외관 */}
          <RoundedBox args={size} radius={0.08} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial {...metalMaterial} />
          </RoundedBox>

          {/* 상단 유압 실린더 */}
          <group position={[0, size[1] / 2 + 0.25, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.35, 0.4, 0.5, 24]} />
              <meshStandardMaterial {...darkMetalMaterial} />
            </mesh>
            {/* 실린더 피스톤 */}
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>

          {/* 전면 컨트롤 패널 */}
          <group position={[0, 0.1, size[2] / 2 + 0.06]}>
            <mesh castShadow>
              <boxGeometry args={[size[0] * 0.6, 0.5, 0.12]} />
              <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.7} />
            </mesh>
            {/* LED 인디케이터 */}
            <mesh position={[0.15, 0.1, 0.07]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, 0.1, 0.07]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={1} />
            </mesh>
          </group>

          {/* 측면 배관 */}
          <mesh position={[size[0] / 2 + 0.08, -0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.8, 12]} />
            <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* 하단 베이스 */}
          <mesh position={[0, -size[1] / 2 - 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[size[0] * 1.1, 0.1, size[2] * 1.1]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
          </mesh>
        </group>
      );
    } else if (type.includes('건조기')) {
      return (
        <group>
          {/* 메인 본체 */}
          <RoundedBox args={size} radius={0.1} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial {...metalMaterial} />
          </RoundedBox>

          {/* 전면 유리창 */}
          <mesh position={[0, size[1] * 0.15, size[2] / 2 + 0.015]} castShadow>
            <planeGeometry args={[size[0] * 0.75, size[1] * 0.55]} />
            <meshStandardMaterial
              color="#1e293b"
              transparent
              opacity={0.85}
              metalness={0.1}
              roughness={0.05}
            />
          </mesh>

          {/* 디지털 디스플레이 */}
          <mesh position={[0, size[1] * 0.5, size[2] / 2 + 0.02]}>
            <boxGeometry args={[size[0] * 0.4, 0.15, 0.02]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.8} />
          </mesh>

          {/* 상단 환기구 */}
          <group position={[0, size[1] / 2 + 0.15, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.25, 0.3, 0.3, 20]} />
              <meshStandardMaterial {...darkMetalMaterial} />
            </mesh>
            {/* 환기 그릴 */}
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 20]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>

          {/* 하단 다리 */}
          {[[-0.35, 0, -0.35], [0.35, 0, -0.35], [-0.35, 0, 0.35], [0.35, 0, 0.35]].map((pos, i) => (
            <mesh key={i} position={[pos[0], -size[1] / 2 - 0.1, pos[2]]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 0.2, 12]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
            </mesh>
          ))}
        </group>
      );
    } else if (type.includes('냉각기')) {
      return (
        <group>
          {/* 메인 본체 */}
          <RoundedBox args={size} radius={0.12} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial {...metalMaterial} />
          </RoundedBox>

          {/* 냉각 핀 (방열판) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, size[1] * 0.2 - i * 0.12, size[2] / 2 + 0.02]}
              castShadow
            >
              <boxGeometry args={[size[0] * 0.9, 0.03, 0.04]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
            </mesh>
          ))}

          {/* 측면 배관 (입수/출수) */}
          <group position={[size[0] / 2 + 0.12, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
              <meshStandardMaterial color="#0ea5e9" metalness={0.7} roughness={0.25} />
            </mesh>
            {/* 파이프 연결부 */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
              <meshStandardMaterial {...darkMetalMaterial} />
            </mesh>
          </group>

          <group position={[-size[0] / 2 - 0.12, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
              <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.25} />
            </mesh>
          </group>

          {/* 상단 팬 유닛 */}
          <group position={[0, size[1] / 2 + 0.08, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.45, 0.45, 0.15, 24]} />
              <meshStandardMaterial {...darkMetalMaterial} />
            </mesh>
            {/* 팬 블레이드 (정적) */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
              <torusGeometry args={[0.3, 0.02, 8, 24]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        </group>
      );
    } else if (type.includes('혼합기')) {
      return (
        <group>
          {/* 원통형 탱크 */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[size[0] / 2, size[0] / 2 * 0.9, size[1], 32]} />
            <meshStandardMaterial {...metalMaterial} />
          </mesh>

          {/* 상단 덮개 */}
          <mesh position={[0, size[1] / 2 + 0.05, 0]} castShadow>
            <cylinderGeometry args={[size[0] / 2 * 1.05, size[0] / 2 * 1.05, 0.1, 32]} />
            <meshStandardMaterial {...darkMetalMaterial} />
          </mesh>

          {/* 모터 유닛 */}
          <group position={[0, size[1] / 2 + 0.35, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* 모터 축 */}
            <mesh position={[0, -0.25, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>

          {/* 내부 교반 블레이드 (투명 탱크 효과) */}
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[size[0] * 0.7, 0.08, 0.1]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* 하단 배출구 */}
          <mesh position={[0, -size[1] / 2 - 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.2, 16]} />
            <meshStandardMaterial {...accentMaterial} />
          </mesh>

          {/* 측면 레벨 게이지 */}
          <group position={[size[0] / 2 + 0.08, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.06, size[1] * 0.7, 0.06]} />
              <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} transparent opacity={0.9} />
            </mesh>
            {/* 액체 레벨 표시 */}
            <mesh position={[0, -size[1] * 0.1, 0.035]}>
              <boxGeometry args={[0.04, size[1] * 0.4, 0.01]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>
      );
    } else {
      // 기본 장비 모델 (고품질)
      return (
        <group>
          <RoundedBox args={size} radius={0.1} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial {...metalMaterial} />
          </RoundedBox>
          <mesh position={[0, -size[1] / 2 - 0.05, 0]} castShadow>
            <boxGeometry args={[size[0] * 1.05, 0.1, size[2] * 1.05]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
          </mesh>
        </group>
      );
    }
  };

  return (
    <group
      position={position}
      onClick={onClick}
      scale={[hoverScale, hoverScale, hoverScale]}
    >
      {/* 메인 장비 모델 */}
      {renderEquipmentModel()}

      {/* 상태 표시등 */}
      <StatusIndicator
        status={status}
        position={[0, size[1] / 2 + 0.4, 0]}
      />

      {/* 장비 이름 */}
      <Text
        position={[0, size[1] / 2 + 0.8, 0]}
        color="#1e293b"
        fontSize={0.25}
        maxWidth={2}
        textAlign="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#ffffff"
        font="/fonts/Pretendard-Bold.woff"
      >
        {name}
      </Text>

      {/* 장비 상태 */}
      <Text
        position={[0, size[1] / 2 + 0.5, 0]}
        color={status === 'normal' ? '#16a34a' : status === 'warning' ? '#ca8a04' : '#dc2626'}
        fontSize={0.18}
        anchorY="top"
        outlineWidth={0.01}
        outlineColor="#ffffff"
      >
        {status === 'normal' ? '정상' : status === 'warning' ? '주의' : '위험'}
      </Text>
    </group>
  );
};

// 카메라 자동 조작 컴포넌트
const CameraRig = ({ autoRotate = false }) => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (autoRotate) {
      const t = clock.getElapsedTime() * 0.1;
      camera.position.x = Math.sin(t) * 15;
      camera.position.z = Math.cos(t) * 15;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

const Factory: React.FC<{
  onEquipmentClick: (equipment: typeof equipmentData[0]) => void;
}> = ({ onEquipmentClick }) => {
  const [hoveredEquipment, setHoveredEquipment] = useState<string | null>(null);

  // 장비 렌더링
  const equipmentElements = useMemo(() => {
    return equipmentData.map((equipment) => {
      // 장비 유형에 따른 크기와 색상 설정
      let size: [number, number, number] = [1, 1, 1];
      let color = '#475569'; // slate-600

      if (equipment.name.includes('주입 성형기')) {
        size = [1.5, 1.2, 1.5];
        color = '#334155'; // slate-700
      } else if (equipment.name.includes('건조기')) {
        size = [1, 1.8, 1];
        color = '#475569'; // slate-600
      } else if (equipment.name.includes('냉각기')) {
        size = [1.2, 1, 1.2];
        color = '#1E40AF'; // blue-800
      } else if (equipment.name.includes('혼합기')) {
        size = [1.3, 1.3, 1.3];
        color = '#7C3AED'; // violet-600
      }

      const position: [number, number, number] = [
        equipment.position.x * 2,
        size[1] / 2,
        equipment.position.z * 2,
      ];

      return (
        <Equipment
          key={equipment.id}
          position={position}
          size={size}
          color={color}
          name={equipment.name}
          status={equipment.status as 'normal' | 'warning' | 'error'}
          onClick={() => onEquipmentClick(equipment)}
          isHovered={hoveredEquipment === equipment.id}
          type={equipment.name}
        />
      );
    });
  }, [onEquipmentClick, hoveredEquipment]);

  return (
    <>
      {/* 환경 설정 (라이트 테마) */}
      <fog attach="fog" args={['#f1f5f9', 15, 40]} />
      <Environment preset="city" background={false} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />

      {/* 바닥 */}
      <Floor />

      {/* 장비 요소들 */}
      {equipmentElements}

      {/* 좌표 표시기 (개발용) */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport labelColor="white" axisColors={['#ff3653', '#8adb00', '#2c8fff']} />
      </GizmoHelper>

      {/* 카메라 자동 조작 */}
      <CameraRig autoRotate={false} />
    </>
  );
};

interface SensorInfoProps {
  sensor: {
    name: string;
    value: string;
    unit: string;
    status: string;
  };
}

const SensorInfo: React.FC<SensorInfoProps> = ({ sensor }) => {
  // 상태에 따른 색상
  const getStatusColor = () => {
    switch (sensor.status) {
      case 'normal':
        return 'bg-green-500 border-green-600';
      case 'warning':
        return 'bg-yellow-500 border-yellow-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <motion.div
      className="flex justify-between items-center py-2 px-3 rounded-md bg-secondary/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-sm font-medium">{sensor.name}</span>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-bold">
          {sensor.value} <span className="text-xs text-muted-foreground">{sensor.unit}</span>
        </span>
        <span
          className={`inline-block w-3 h-3 rounded-full ${getStatusColor()}`}
        />
      </div>
    </motion.div>
  );
};

interface EquipmentDetailModalProps {
  equipment: typeof equipmentData[0] | null;
  onClose: () => void;
}

const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  equipment,
  onClose,
}) => {
  if (!equipment) return null;

  // 상태에 따른 배지 색상
  const getStatusVariant = () => {
    switch (equipment.status) {
      case 'normal':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'secondary';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card m-4 rounded-lg shadow-lg max-w-md w-full overflow-hidden border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{equipment.name}</h3>
            <Badge variant={getStatusVariant() as any}>
              {equipment.status === 'normal' ? 'Normal' :
                equipment.status === 'warning' ? 'Warning' : 'Error'}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-semibold mb-2">Sensor Data</h4>
          <div className="space-y-2">
            {equipment.sensors.map((sensor, index) => (
              <SensorInfo key={index} sensor={sensor} />
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold mb-2">Equipment Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-secondary/30 rounded">
                <span className="text-muted-foreground">Equipment ID</span>
                <p className="font-medium">{equipment.id}</p>
              </div>
              <div className="p-2 bg-secondary/30 rounded">
                <span className="text-muted-foreground">Location</span>
                <p className="font-medium">Zone {equipment.position.x > 0 ? 'A' : 'B'}-{Math.abs(equipment.position.z)}</p>
              </div>
              <div className="p-2 bg-secondary/30 rounded col-span-2">
                <span className="text-muted-foreground">Last Inspection</span>
                <p className="font-medium">2023-06-28</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              닫기
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                alert('정비 요청이 접수되었습니다.');
                onClose();
              }}
            >
              정비 요청
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 맵 컨트롤 패널 (라이트 테마)
const MapControls: React.FC<{
  onViewChange: (view: string) => void;
  currentView: string;
}> = ({ onViewChange, currentView }) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3">
      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">보기 모드</div>
      <div className="flex gap-1.5">
        <button
          onClick={() => onViewChange('2d')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentView === '2d'
            ? 'bg-slate-700 text-white'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          2D 평면도
        </button>
        <button
          onClick={() => onViewChange('3d')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentView === '3d'
            ? 'bg-slate-700 text-white'
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          3D 입체도
        </button>
      </div>
    </div>
  );
};

const FactoryMap: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<typeof equipmentData[0] | null>(null);
  const [viewMode, setViewMode] = useState<string>('3d');

  const handleEquipmentClick = (equipment: typeof equipmentData[0]) => {
    setSelectedEquipment(equipment);
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <div className="h-fit relative overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200">
      {/* 헤더 - 라이트 테마 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h3 className="text-base font-bold text-slate-800">공장 설비 상태 맵</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 font-medium">정상</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-600 font-medium">주의</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-slate-600 font-medium">위험</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-[420px] w-full bg-gradient-to-b from-slate-50 to-slate-100">
          <Canvas
            camera={{ position: [0, 10, 12], fov: 40 }}
            shadows
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            {/* 향상된 조명 */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 15, 10]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            <directionalLight position={[-5, 10, -5]} intensity={0.4} />
            <hemisphereLight args={['#87CEEB', '#f0f0f0', 0.5]} />

            <Factory onEquipmentClick={handleEquipmentClick} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={25}
              minPolarAngle={0.2}
              maxPolarAngle={Math.PI / 2 - 0.1}
            />
          </Canvas>

          <MapControls
            onViewChange={setViewMode}
            currentView={viewMode}
          />
        </div>

        {selectedEquipment && (
          <EquipmentDetailModal
            equipment={selectedEquipment}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default FactoryMap; 