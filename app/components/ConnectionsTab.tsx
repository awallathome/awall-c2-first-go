'use client';

import { useState, useMemo } from 'react';
import { Connection, Milestone } from '../types';
import { getConnectionsAfterMilestone } from '../utils/data';
import ConnectionCard from './ConnectionCard';
import MilestoneCard from './MilestoneCard';

interface ConnectionsTabProps {
  connections: Connection[];
  milestones: Milestone[];
  birthDate: Date;
}

export default function ConnectionsTab({ connections, milestones, birthDate }: ConnectionsTabProps) {
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);
  
  const toggleMilestone = (milestoneDesc: string) => {
    setSelectedMilestones(prev => 
      prev.includes(milestoneDesc)
        ? prev.filter(m => m !== milestoneDesc)
        : [...prev, milestoneDesc]
    );
  };
  
  const groupedConnections = useMemo(() => {
    if (selectedMilestones.length === 0) {
      return [{ milestone: null, connections }];
    }
    
    const groups: { milestone: Milestone; connections: Connection[] }[] = [];
    
    selectedMilestones.forEach(desc => {
      const milestone = milestones.find(m => m.description === desc);
      if (milestone) {
        const milestoneIndex = milestones.indexOf(milestone);
        const nextMilestone = milestones[milestoneIndex + 1];
        const conns = getConnectionsAfterMilestone(connections, milestone, nextMilestone);
        groups.push({ milestone, connections: conns });
      }
    });
    
    return groups.sort((a, b) => 
      b.milestone.dateObj.getTime() - a.milestone.dateObj.getTime()
    );
  }, [connections, milestones, selectedMilestones]);
  
  return (
    <div className="space-y-6">
      {/* Milestone Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Filter by Milestones</h3>
        <div className="flex flex-wrap gap-3">
          {milestones.map(milestone => (
            <button
              key={milestone.description}
              onClick={() => toggleMilestone(milestone.description)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                selectedMilestones.includes(milestone.description)
                  ? 'ring-2 ring-offset-2'
                  : 'opacity-60'
              }`}
              style={{ 
                backgroundColor: milestone.color + '20',
                color: milestone.color,
                borderLeft: `4px solid ${milestone.color}`,
                ringColor: milestone.color
              }}
            >
              {milestone.description}
            </button>
          ))}
        </div>
        {selectedMilestones.length > 0 && (
          <button
            onClick={() => setSelectedMilestones([])}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      {/* Connections List */}
      <div className="space-y-4">
        {groupedConnections.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No connections found for selected milestones
          </div>
        )}
        
        {groupedConnections.map((group, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {group.milestone && (
              <div 
                className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-3"
                style={{ backgroundColor: group.milestone.color + '10' }}
              >
                <MilestoneCard milestone={group.milestone} birthDate={birthDate} />
                <span className="text-sm text-gray-600 ml-auto">
                  {group.connections.length} connection{group.connections.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            <div className={group.milestone ? 'bg-gray-50' : ''}>
              {!group.milestone && (
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                  <h3 className="font-semibold text-gray-900">
                    All Connections ({group.connections.length})
                  </h3>
                </div>
              )}
              <div className="divide-y divide-gray-100">
                {group.connections.map((connection, connIdx) => (
                  <ConnectionCard key={connIdx} connection={connection} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

