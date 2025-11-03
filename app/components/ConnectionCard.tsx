'use client';

import { Connection } from '../types';
import { useState } from 'react';

interface ConnectionCardProps {
  connection: Connection;
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
  const [showUrl, setShowUrl] = useState(false);
  
  return (
    <div 
      className="flex justify-between items-center py-2 px-4 hover:bg-gray-50 transition-colors rounded group"
      onMouseEnter={() => setShowUrl(true)}
      onMouseLeave={() => setShowUrl(false)}
    >
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {connection.firstName} {connection.lastName}
        </div>
        {showUrl && connection.url && (
          <a 
            href={connection.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline animate-fade-in"
          >
            {connection.url}
          </a>
        )}
      </div>
      <div className="text-sm text-gray-600 ml-4">
        {connection.connectedOn}
      </div>
    </div>
  );
}

