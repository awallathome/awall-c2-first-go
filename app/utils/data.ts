import { Connection, Milestone } from '../types';

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function parseConnections(csvText: string): Connection[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  const connections: Connection[] = [];
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length >= 7 && fields[0]) {
      const connectedOn = fields[6];
      connections.push({
        firstName: fields[0],
        lastName: fields[1],
        url: fields[2],
        email: fields[3],
        company: fields[4],
        position: fields[5],
        connectedOn: connectedOn,
        connectedDate: parseConnectionDate(connectedOn)
      });
    }
  }
  
  return connections.sort((a, b) => a.connectedDate.getTime() - b.connectedDate.getTime());
}

export function parseConnectionDate(dateStr: string): Date {
  // Format: "DD MMM YYYY" (e.g., "03 Nov 2025")
  const months: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const parts = dateStr.trim().split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  }
  
  return new Date(0);
}

export function parseMilestones(csvText: string): Milestone[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  const milestones: Milestone[] = [];
  
  // Milestone colors - unique for each type
  const colors: { [key: string]: string } = {
    'Education': '#0077B5',
    'Career': '#00A0DC',
    'Personal': '#8B5CF6',
    'Family': '#EC4899',
    'Achievement': '#10B981',
    'Adventure': '#F59E0B'
  };
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length >= 3 && fields[0]) {
      const type = fields[1];
      milestones.push({
        date: fields[0],
        milestoneType: type,
        description: fields[2],
        dateObj: new Date(fields[0]),
        color: colors[type] || '#6B7280'
      });
    }
  }
  
  return milestones.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
}

export function calculateAge(birthDate: Date, targetDate: Date): number {
  let age = targetDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = targetDate.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function getConnectionsAfterMilestone(
  connections: Connection[],
  milestone: Milestone,
  nextMilestone?: Milestone
): Connection[] {
  return connections.filter(conn => {
    const connDate = conn.connectedDate.getTime();
    const milestoneDate = milestone.dateObj.getTime();
    const nextDate = nextMilestone ? nextMilestone.dateObj.getTime() : Date.now();
    
    return connDate >= milestoneDate && connDate < nextDate;
  });
}

export function getConnectionsBeforeMilestone(
  connections: Connection[],
  milestone: Milestone
): Connection[] {
  return connections.filter(conn => {
    return conn.connectedDate.getTime() < milestone.dateObj.getTime();
  });
}

export function filterConnectionsByMilestones(
  connections: Connection[],
  selectedMilestones: string[]
): { milestone: Milestone | null; connections: Connection[] }[] {
  // Returns grouped connections by milestone
  return [];
}

