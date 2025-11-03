export interface Connection {
  firstName: string;
  lastName: string;
  url: string;
  email: string;
  company: string;
  position: string;
  connectedOn: string;
  connectedDate: Date;
}

export interface Milestone {
  date: string;
  milestoneType: string;
  description: string;
  dateObj: Date;
  color: string;
}

