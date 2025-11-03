'use client';

import { Milestone } from '../types';
import { useState } from 'react';
import { calculateAge } from '../utils/data';

interface MilestoneCardProps {
  milestone: Milestone;
  birthDate: Date;
}

export default function MilestoneCard({ milestone, birthDate }: MilestoneCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const age = calculateAge(birthDate, milestone.dateObj);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div 
        className="inline-block px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
        style={{ 
          backgroundColor: milestone.color + '20',
          color: milestone.color,
          borderLeft: `4px solid ${milestone.color}`
        }}
      >
        {milestone.description}
      </div>
      
      {showDetails && (
        <div 
          className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 whitespace-nowrap animate-fade-in"
        >
          <div className="text-xs text-gray-500 mb-1">{milestone.milestoneType}</div>
          <div className="text-sm font-medium text-gray-900">{milestone.date}</div>
          <div className="text-sm text-gray-600 mt-1">Age: {age}</div>
        </div>
      )}
    </div>
  );
}

