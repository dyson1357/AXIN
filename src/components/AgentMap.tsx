"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Cpu, Zap, ArrowRight, Network, RefreshCw, DatabaseIcon, Filter } from 'lucide-react';

// Agent Types
export interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  reliability: number;
  connections: string[];
  icon: any;
  fullName?: string;
}

// Agent data - with icons for ChatAgentPanel
export const initialAgents: Agent[] = [
  {
    id: 'central',
    name: 'AXIN Orchestrator',
    fullName: 'AXIN Orchestrator',
    type: 'central',
    status: 'active',
    reliability: 99.9,
    connections: ['quality', 'production', 'maintenance', 'energy', 'inventory', 'data'],
    icon: Cpu
  },
  {
    id: 'quality',
    name: 'Quality Agent',
    fullName: 'Quality Assurance AI',
    type: 'monitor',
    status: 'active',
    reliability: 98,
    connections: ['production'],
    icon: Filter
  },
  {
    id: 'production',
    name: 'Production Agent',
    fullName: 'Production Manager AI',
    type: 'control',
    status: 'active',
    reliability: 97,
    connections: ['maintenance'],
    icon: Cpu // Using Cpu as generic for production if no better icon imported, or reuse
  },
  {
    id: 'maintenance',
    name: 'Maintenance Agent',
    fullName: 'Preventive Maintenance AI',
    type: 'optimize',
    status: 'warning',
    reliability: 94,
    connections: ['energy'],
    icon: RefreshCw
  },
  {
    id: 'energy',
    name: 'Energy Agent',
    fullName: 'Energy Efficiency AI',
    type: 'optimize',
    status: 'active',
    reliability: 96,
    connections: [],
    icon: Zap
  },
  {
    id: 'inventory',
    name: 'Inventory Agent',
    fullName: 'Inventory Optimization AI',
    type: 'analyze',
    status: 'active',
    reliability: 97,
    connections: ['production'],
    icon: DatabaseIcon
  },
  {
    id: 'data',
    name: 'Data Agent',
    fullName: 'Data Analysis AI',
    type: 'analyze',
    status: 'active',
    reliability: 99,
    connections: ['quality', 'maintenance'],
    icon: Network
  }
];

// Compatibility alias for internal use if needed
const agentData = initialAgents;

// Generate link data between agents
const getLinks = (agents: typeof agentData) => {
  const links: { source: string; target: string; value: number }[] = [];

  agents.forEach(agent => {
    agent.connections.forEach(targetId => {
      links.push({
        source: agent.id,
        target: targetId,
        value: 2 // Fixed value for consistency
      });
    });
  });

  return links;
};

// Agent type colors
const typeColors = {
  monitor: '#6366f1',
  analyze: '#8b5cf6',
  control: '#f97316',
  optimize: '#10b981',
  central: '#ef4444'
};

// Agent status color classes
const statusClasses = {
  active: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  inactive: 'bg-gray-100 text-gray-800'
};

// Agent type icon component
const AgentTypeIcon = ({ type }: { type: keyof typeof typeColors }) => {
  switch (type) {
    case 'monitor':
      return <Cpu className="h-4 w-4" />;
    case 'analyze':
      return <DatabaseIcon className="h-4 w-4" />;
    case 'control':
      return <Zap className="h-4 w-4" />;
    case 'optimize':
      return <RefreshCw className="h-4 w-4" />;
    case 'central':
      return <Network className="h-4 w-4" />;
    default:
      return <Cpu className="h-4 w-4" />;
  }
};

export default function AgentMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Data filtering
  const filteredAgents = activeFilter
    ? agentData.filter(agent => agent.type === activeFilter || agent.id === 'central')
    : agentData;

  const links = useMemo(() => getLinks(filteredAgents), [filteredAgents]);

  useEffect(() => {
    if (!svgRef.current) return;

    let simulation: d3.Simulation<any, any> | null = null;
    let animationFrameId: number | null = null;

    const updateDimensions = () => {
      if (!svgRef.current) return;

      const svgContainer = svgRef.current.parentElement;
      if (!svgContainer) return;

      const width = svgContainer.clientWidth || 800;
      const height = svgContainer.clientHeight || 600;

      // Initialize SVG
      d3.select(svgRef.current).selectAll("*").remove();

      // SVG setup
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // 데이터 설정 - fix orchestrator position at top
      const nodes = filteredAgents.map(d => {
        const node: any = { ...d };
        if (d.id === 'central') {
          node.fx = width / 2;  // Fixed X at center
          node.fy = 130;        // Fixed Y at top (lowered)
        }
        return node;
      });

      // Convert links to node objects
      const linksWithNodes = links.map(link => ({
        source: nodes.find(n => n.id === link.source) || link.source,
        target: nodes.find(n => n.id === link.target) || link.target,
        value: link.value
      }));

      // Simulation settings - orchestrator at top, agents spread below
      simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(linksWithNodes).id((d: any) => d.id).distance(120))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2 + 50))
        .force('collision', d3.forceCollide().radius(65))
        .force('y', d3.forceY((d: any) => d.id === 'central' ? 180 : height / 2 + 30).strength(0.3));

      // Background grid
      const gridSize = 20;
      const gridG = svg.append('g').attr('class', 'grid');

      // Horizontal grid lines
      for (let i = 0; i < height; i += gridSize) {
        gridG.append('line')
          .attr('x1', 0)
          .attr('y1', i)
          .attr('x2', width)
          .attr('y2', i)
          .attr('stroke', '#e5e7eb')
          .attr('stroke-width', 1);
      }

      // Vertical grid lines
      for (let i = 0; i < width; i += gridSize) {
        gridG.append('line')
          .attr('x1', i)
          .attr('y1', 0)
          .attr('x2', i)
          .attr('y2', height)
          .attr('stroke', '#e5e7eb')
          .attr('stroke-width', 1);
      }

      // Draw links
      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(linksWithNodes)
        .enter()
        .append('line')
        .attr('stroke-width', (d: any) => Math.sqrt(d.value || 2))
        .attr('stroke', '#9ca3af')
        .attr('stroke-opacity', 0.6);

      // Data flow animation
      const dataFlow = svg.append('g')
        .attr('class', 'data-flow')
        .selectAll('circle')
        .data(linksWithNodes)
        .enter()
        .append('circle')
        .attr('r', 3)
        .attr('fill', (d: any) => {
          const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source);
          return source ? typeColors[source.type as keyof typeof typeColors] : '#9ca3af';
        })
        .style('opacity', 0.8);

      // Create node groups
      const node = svg.append('g')
        .selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        ) as any;

      // Draw node circles
      node.append('circle')
        .attr('r', (d: any) => d.type === 'central' ? 25 : 20)
        .attr('fill', (d: any) => typeColors[d.type as keyof typeof typeColors])
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .style('opacity', (d: any) => d.status === 'inactive' ? 0.4 : 1)
        .style('cursor', 'pointer')
        .style('filter', 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))')
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(300)
            .attr('r', (d: any) => d.type === 'central' ? 28 : 22)
            .attr('stroke-width', 3)
            .attr('stroke', '#e0e7ff');
        })
        .on('mouseout', function (event: MouseEvent, d: any) {
          if (d.id !== selectedAgentId) {
            d3.select(this)
              .transition()
              .duration(300)
              .attr('r', (d: any) => d.type === 'central' ? 25 : 20)
              .attr('stroke-width', 2)
              .attr('stroke', '#ffffff');
          }
        })
        .on('click', (event: MouseEvent, d: any) => {
          setSelectedAgentId(d.id === selectedAgentId ? null : d.id);

          // Click ripple effect
          const x = d.x;
          const y = d.y;

          svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 10)
            .attr('fill', 'none')
            .attr('stroke', typeColors[d.type as keyof typeof typeColors])
            .attr('stroke-width', 2)
            .style('opacity', 1)
            .transition()
            .duration(500)
            .attr('r', 50)
            .style('opacity', 0)
            .remove();
        });

      // Add icons
      node.each(function (d: any) {
        const iconG = d3.select(this).append('g').attr('class', 'icon');
        const iconSize = d.type === 'central' ? 16 : 14;

        switch (d.type) {
          case 'monitor':
            iconG.append('rect')
              .attr('x', -iconSize / 2)
              .attr('y', -iconSize / 2)
              .attr('width', iconSize)
              .attr('height', iconSize)
              .attr('fill', 'white')
              .attr('rx', 2);
            break;
          case 'analyze':
            iconG.append('circle')
              .attr('cx', 0)
              .attr('cy', 0)
              .attr('r', iconSize / 2)
              .attr('fill', 'white');
            break;
          case 'control':
            iconG.append('path')
              .attr('d', `M-${iconSize / 2},-${iconSize / 4} L${iconSize / 2},0 L-${iconSize / 2},${iconSize / 4} Z`)
              .attr('fill', 'white');
            break;
          case 'optimize':
            iconG.append('circle')
              .attr('cx', 0)
              .attr('cy', 0)
              .attr('r', iconSize / 2)
              .attr('fill', 'none')
              .attr('stroke', 'white')
              .attr('stroke-width', 2);
            break;
          case 'central':
            iconG.append('polygon')
              .attr('points', `0,-${iconSize / 2} ${iconSize / 2},${iconSize / 2} -${iconSize / 2},${iconSize / 2}`)
              .attr('fill', 'white');
            break;
          default:
            iconG.append('rect')
              .attr('x', -iconSize / 2)
              .attr('y', -iconSize / 2)
              .attr('width', iconSize)
              .attr('height', iconSize)
              .attr('fill', 'white');
        }
      });

      // Add labels
      node.append('text')
        .text((d: any) => d.name)
        .attr('text-anchor', 'middle')
        .attr('dy', (d: any) => d.type === 'central' ? 40 : 35)
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .attr('fill', '#374151')
        .style('pointer-events', 'none');

      // Drag functions
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation!.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation!.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // Simulation update
      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        dataFlow
          .attr('cx', function (d: any) {
            const progress = (Date.now() % 3000) / 3000;
            return d.source.x + (d.target.x - d.source.x) * progress;
          })
          .attr('cy', function (d: any) {
            const progress = (Date.now() % 3000) / 3000;
            return d.source.y + (d.target.y - d.source.y) * progress;
          });

        node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);

        // Highlight selected node
        node.filter((d: any) => d.id === selectedAgentId)
          .select('circle')
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 3);

        // Highlight links connected to selected node
        link.filter((d: any) =>
          d.source.id === selectedAgentId ||
          d.target.id === selectedAgentId ||
          d.source === selectedAgentId ||
          d.target === selectedAgentId
        )
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 3)
          .attr('stroke-opacity', 0.8);

        link.filter((d: any) =>
          d.source.id !== selectedAgentId &&
          d.target.id !== selectedAgentId &&
          d.source !== selectedAgentId &&
          d.target !== selectedAgentId
        )
          .attr('stroke', '#9ca3af')
          .attr('stroke-width', (d: any) => Math.sqrt(d.value))
          .attr('stroke-opacity', 0.6);
      });

      // Animation frame
      function animate() {
        d3.selectAll(dataFlow.nodes()).each(function () {
          d3.select(this).attr('cx', function (d: any) {
            const progress = (Date.now() % 3000) / 3000;
            return d.source.x + (d.target.x - d.source.x) * progress;
          })
            .attr('cy', function (d: any) {
              const progress = (Date.now() % 3000) / 3000;
              return d.source.y + (d.target.y - d.source.y) * progress;
            });
        });

        animationFrameId = requestAnimationFrame(animate);
      }

      animate();
    };

    updateDimensions();

    // Detect size changes with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (simulation) simulation.stop();
      updateDimensions();
    });

    const svgContainer = svgRef.current.parentElement;
    if (svgContainer) {
      resizeObserver.observe(svgContainer);
    }

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (simulation) simulation.stop();
    };
  }, [links, selectedAgentId, filteredAgents]);

  // Selected agent information
  const selectedAgent = selectedAgentId ? filteredAgents.find(a => a.id === selectedAgentId) : null;

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-gradient-to-br from-slate-50 to-white">
      {/* Filter toolbar with status indicator */}
      <div className="flex-shrink-0 p-3 flex flex-wrap items-center gap-2 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600">Live Network</span>
        </div>
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(null)}
          className="flex items-center text-xs gap-1"
        >
          <Filter className="h-3 w-3" />
          All Agents
        </Button>
        <Button
          variant={activeFilter === 'monitor' ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter('monitor')}
          className="flex items-center text-xs gap-1"
          style={{ color: activeFilter === 'monitor' ? 'white' : typeColors.monitor }}
        >
          <Cpu className="h-3 w-3" />
          Monitoring
        </Button>
        <Button
          variant={activeFilter === 'analyze' ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter('analyze')}
          className="flex items-center text-xs gap-1"
          style={{ color: activeFilter === 'analyze' ? 'white' : typeColors.analyze }}
        >
          <DatabaseIcon className="h-3 w-3" />
          Analysis
        </Button>
        <Button
          variant={activeFilter === 'control' ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter('control')}
          className="flex items-center text-xs gap-1"
          style={{ color: activeFilter === 'control' ? 'white' : typeColors.control }}
        >
          <Zap className="h-3 w-3" />
          Control
        </Button>
        <Button
          variant={activeFilter === 'optimize' ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter('optimize')}
          className="flex items-center text-xs gap-1"
          style={{ color: activeFilter === 'optimize' ? 'white' : typeColors.optimize }}
        >
          <RefreshCw className="h-3 w-3" />
          Optimization
        </Button>

        {/* Agent count */}
        <div className="ml-auto flex items-center gap-3 text-xs">
          <span className="text-slate-500">{filteredAgents.filter(a => a.status === 'active').length} Active</span>
          <span className="text-orange-500">{filteredAgents.filter(a => a.status === 'warning').length} Warning</span>
        </div>
      </div>

      {/* Main graph area with subtle pattern */}
      <div className="relative flex-1 overflow-hidden min-h-0 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <svg ref={svgRef} className="w-full h-full" style={{ display: 'block' }} />

        {/* Selected agent details */}
        {selectedAgent && (
          <div className="absolute bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs z-10">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1 rounded-full"
                style={{ backgroundColor: typeColors[selectedAgent.type as keyof typeof typeColors] }}
              >
                <AgentTypeIcon type={selectedAgent.type as keyof typeof typeColors} />
              </div>
              <div className="font-medium">{selectedAgent.name}</div>
              <Badge className={statusClasses[selectedAgent.status as keyof typeof statusClasses]}>
                {selectedAgent.status === 'active' ? 'Active' :
                  selectedAgent.status === 'warning' ? 'Warning' :
                    selectedAgent.status === 'error' ? 'Error' : 'Inactive'}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Connections:</span>
                <span className="font-medium">{selectedAgent.connections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reliability:</span>
                <span className="font-medium">{selectedAgent.reliability}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium capitalize">{selectedAgent.type}</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setSelectedAgentId(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tooltip element */}
        <div
          ref={tooltipRef}
          className="absolute hidden z-10 pointer-events-none"
          style={{ top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}
