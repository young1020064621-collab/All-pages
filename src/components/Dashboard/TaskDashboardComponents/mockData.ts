export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'todo' | 'email' | 'call' | 'demo' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'overdue' | 'completed' | 'canceled' | 'deleted';
  dueDate: string;
  assignee: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    method: 'email' | 'phone' | 'Zoom' | 'teams';
  };
}

export interface Meeting {
  id: string;
  name: string;
  dateTime: Date;
  location: 'Zoom' | 'Teams' | 'Google Meet' | 'In Person';
  attendees: number;
  status: 'Scheduled' | 'Pending' | 'Confirmed' | 'Cancelled';
  organizer: string;
  agenda: string;
  duration: string;
  type: 'Internal' | 'External';
}

export interface Coaching {
  id: string;
  topic: string;
  dateTime: Date;
  location: string;
  organizer: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress';
  participant: string;
  duration: string;
  notes: string;
}

// Mock Tasks Data
export const tasksData: Task[] = [
  {
    id: 'T001',
    title: 'Follow-up Call with John Smith',
    type: 'todo',
    contact: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0101',
      method: 'phone'
    },
    status: 'open',
    priority: 'high',
    description: 'Follow up on product demo feedback and discuss next steps',
    assignee: 'Sarah Johnson',
    dueDate: '2025-10-20T10:00:00Z'
  },
  {
    id: 'T002',
    title: 'Proposal Review for Microsoft Corp',
    type: 'email',
    contact: {
      name: 'Microsoft Corp',
      email: 'contact@microsoft.com',
      phone: '+1-555-0102',
      method: 'email'
    },
    status: 'in-progress',
    priority: 'high',
    description: 'Review and finalize enterprise solution proposal',
    assignee: 'Mike Chen',
    dueDate: '2025-10-21T14:30:00Z'
  },
  {
    id: 'T003',
    title: 'Contract Negotiation with TechStart Inc',
    type: 'call',
    contact: {
      name: 'TechStart Inc',
      email: 'contracts@techstart.com',
      phone: '+1-555-0103',
      method: 'phone'
    },
    status: 'overdue',
    priority: 'high',
    description: 'Negotiate terms for annual software license agreement',
    assignee: 'Emily Davis',
    dueDate: '2025-10-18T09:00:00Z'
  },
  {
    id: 'T004',
    title: 'Demo Preparation for Global Solutions',
    type: 'demo',
    contact: {
      name: 'Global Solutions',
      email: 'demo@globalsolutions.com',
      phone: '+1-555-0104',
      method: 'Zoom'
    },
    status: 'open',
    priority: 'medium',
    description: 'Prepare technical demo for enterprise client meeting',
    assignee: 'David Wilson',
    dueDate: '2025-10-22T16:00:00Z'
  },
  {
    id: 'T005',
    title: 'Client Check-in with Anna Rodriguez',
    type: 'other',
    contact: {
      name: 'Anna Rodriguez',
      email: 'anna.rodriguez@client.com',
      phone: '+1-555-0105',
      method: 'phone'
    },
    status: 'open',
    priority: 'low',
    description: 'Monthly check-in with existing client for satisfaction review',
    assignee: 'Lisa Brown',
    dueDate: '2025-10-23T11:00:00Z'
  },
  {
    id: 'T006',
    title: 'Lead Qualification for Innovation Labs',
    type: 'other',
    contact: {
      name: 'Innovation Labs',
      email: 'leads@innovationlabs.com',
      phone: '+1-555-0106',
      method: 'email'
    },
    status: 'open',
    priority: 'medium',
    description: 'Qualify new lead and assess fit for our solutions',
    assignee: 'Tom Anderson',
    dueDate: '2025-10-24T13:15:00Z'
  },
  {
    id: 'T007',
    title: 'Renewal Discussion with Enterprise Co',
    type: 'call',
    contact: {
      name: 'Enterprise Co',
      email: 'renewals@enterpriseco.com',
      phone: '+1-555-0107',
      method: 'phone'
    },
    status: 'in-progress',
    priority: 'high',
    description: 'Discuss contract renewal terms and pricing options',
    assignee: 'Sarah Johnson',
    dueDate: '2025-10-25T10:30:00Z'
  },
  {
    id: 'T008',
    title: 'Technical Review for DevTech Solutions',
    type: 'other',
    contact: {
      name: 'DevTech Solutions',
      email: 'tech@devtechsolutions.com',
      phone: '+1-555-0108',
      method: 'teams'
    },
    status: 'open',
    priority: 'medium',
    description: 'Review technical requirements and integration possibilities',
    assignee: 'Mike Chen',
    dueDate: '2025-10-26T15:00:00Z'
  },
  {
    id: 'T009',
    title: 'Pricing Discussion with StartupXYZ',
    type: 'call',
    contact: {
      name: 'StartupXYZ',
      email: 'pricing@startupxyz.com',
      phone: '+1-555-0109',
      method: 'phone'
    },
    status: 'completed',
    priority: 'medium',
    description: 'Finalize pricing structure for startup package',
    assignee: 'Emily Davis',
    dueDate: '2025-10-15T12:00:00Z'
  },
  {
    id: 'T010',
    title: 'Onboarding Call with New Client Inc',
    type: 'call',
    contact: {
      name: 'New Client Inc',
      email: 'onboarding@newclient.com',
      phone: '+1-555-0110',
      method: 'Zoom'
    },
    status: 'open',
    priority: 'high',
    description: 'Initial onboarding call with new enterprise client',
    assignee: 'David Wilson',
    dueDate: '2025-10-27T09:30:00Z'
  },
  {
    id: 'T011',
    title: 'Support Escalation for Big Corp Ltd',
    type: 'other',
    contact: {
      name: 'Big Corp Ltd',
      email: 'support@bigcorp.com',
      phone: '+1-555-0111',
      method: 'email'
    },
    status: 'overdue',
    priority: 'high',
    description: 'Handle escalated support issue regarding system integration',
    assignee: 'Lisa Brown',
    dueDate: '2025-10-19T08:00:00Z'
  },
  {
    id: 'T012',
    title: 'Market Research Analysis',
    type: 'other',
    contact: {
      name: 'Internal Team',
      email: 'research@company.com',
      phone: '+1-555-0112',
      method: 'email'
    },
    status: 'open',
    priority: 'low',
    description: 'Research competitive landscape and market positioning',
    assignee: 'Tom Anderson',
    dueDate: '2025-10-28T14:00:00Z'
  },
  {
    id: 'T013',
    title: 'Product Training Session',
    type: 'other',
    contact: {
      name: 'Sales Team',
      email: 'sales@company.com',
      phone: '+1-555-0113',
      method: 'teams'
    },
    status: 'open',
    priority: 'medium',
    description: 'Conduct product training session for new sales team members',
    assignee: 'Sarah Johnson',
    dueDate: '2025-10-29T10:00:00Z'
  },
  {
    id: 'T014',
    title: 'Quarterly Budget Review',
    type: 'other',
    contact: {
      name: 'Finance Dept',
      email: 'finance@company.com',
      phone: '+1-555-0114',
      method: 'email'
    },
    status: 'open',
    priority: 'medium',
    description: 'Review quarterly budget allocations and adjustments',
    assignee: 'Mike Chen',
    dueDate: '2025-10-30T16:30:00Z'
  },
  {
    id: 'T015',
    title: 'Partnership Exploration Call',
    type: 'call',
    contact: {
      name: 'Partner Solutions',
      email: 'partnerships@partnersolutions.com',
      phone: '+1-555-0115',
      method: 'phone'
    },
    status: 'open',
    priority: 'low',
    description: 'Explore new partnership opportunities and collaboration',
    assignee: 'Emily Davis',
    dueDate: '2025-10-01T11:30:00Z'
  },
  {
    id: 'T016',
    title: 'Quality Assurance Review',
    type: 'other',
    contact: {
      name: 'QA Team',
      email: 'qa@company.com',
      phone: '+1-555-0116',
      method: 'teams'
    },
    status: 'completed',
    priority: 'high',
    description: 'Complete QA review for new product release',
    assignee: 'David Wilson',
    dueDate: '2025-09-16T13:00:00Z'
  },
  {
    id: 'T017',
    title: 'Customer Feedback Collection',
    type: 'email',
    contact: {
      name: 'Beta Users',
      email: 'beta@company.com',
      phone: '+1-555-0117',
      method: 'email'
    },
    status: 'open',
    priority: 'medium',
    description: 'Collect and analyze customer feedback from beta testing',
    assignee: 'Lisa Brown',
    dueDate: '2025-10-02T15:15:00Z'
  },
  {
    id: 'T018',
    title: 'Documentation Update',
    type: 'other',
    contact: {
      name: 'Technical Writers',
      email: 'docs@company.com',
      phone: '+1-555-0118',
      method: 'email'
    },
    status: 'open',
    priority: 'low',
    description: 'Update product documentation with latest features',
    assignee: 'Tom Anderson',
    dueDate: '2025-10-03T12:45:00Z'
  },
  {
    id: 'T019',
    title: 'Security Audit Review',
    type: 'other',
    contact: {
      name: 'Security Team',
      email: 'security@company.com',
      phone: '+1-555-0119',
      method: 'teams'
    },
    status: 'completed',
    priority: 'high',
    description: 'Conduct security audit and vulnerability assessment',
    assignee: 'Sarah Johnson',
    dueDate: '2025-09-17T07:30:00Z'
  },
  {
    id: 'T020',
    title: 'Monthly Sales Forecast',
    type: 'other',
    contact: {
      name: 'Sales Management',
      email: 'salesmanagement@company.com',
      phone: '+1-555-0120',
      method: 'email'
    },
    status: 'open',
    priority: 'medium',
    description: 'Prepare monthly sales forecast and pipeline analysis',
    assignee: 'Mike Chen',
    dueDate: '2025-10-04T17:00:00Z'
  },
  {
    id: 'T021',
    title: 'Team Coaching Session',
    type: 'other',
    contact: {
      name: 'Junior Analysts',
      email: 'juniorteam@company.com',
      phone: '+1-555-0121',
      method: 'teams'
    },
    status: 'open',
    priority: 'medium',
    description: 'Provide coaching session for junior team members',
    assignee: 'Emily Davis',
    dueDate: '2025-10-05T09:15:00Z'
  }
];

// Mock Meetings Data
export const meetingsData: Meeting[] = [
  {
    id: 'M001',
    name: 'Weekly Sales Review',
    dateTime: new Date('2025-10-20T09:00:00Z'),
    location: 'Zoom',
    attendees: 8,
    status: 'Confirmed',
    organizer: 'Sarah Johnson',
    agenda: 'Review weekly sales performance, discuss pipeline updates, and plan next week activities',
    duration: '1 hour',
    type: 'Internal'
  },
  {
    id: 'M002',
    name: 'Product Roadmap Discussion',
    dateTime: new Date('2025-10-21T15:30:00Z'),
    location: 'Teams',
    attendees: 12,
    status: 'Scheduled',
    organizer: 'Mike Chen',
    agenda: 'Discuss Q2 product roadmap, feature prioritization, and resource allocation',
    duration: '2 hours',
    type: 'Internal'
  },
  {
    id: 'M003',
    name: 'Client Presentation - TechCorp',
    dateTime: new Date('2025-10-22T14:00:00Z'),
    location: 'Google Meet',
    attendees: 6,
    status: 'Pending',
    organizer: 'Emily Davis',
    agenda: 'Present solution proposal and demonstrate key features to TechCorp stakeholders',
    duration: '1.5 hours',
    type: 'External'
  },
  {
    id: 'M004',
    name: 'Team Building Workshop',
    dateTime: new Date('2025-10-23T10:00:00Z'),
    location: 'In Person',
    attendees: 15,
    status: 'Confirmed',
    organizer: 'David Wilson',
    agenda: 'Team building activities, communication workshops, and goal alignment',
    duration: '4 hours',
    type: 'Internal'
  },
  {
    id: 'M005',
    name: 'Budget Planning Session',
    dateTime: new Date('2025-10-24T13:00:00Z'),
    location: 'Zoom',
    attendees: 5,
    status: 'Scheduled',
    organizer: 'Lisa Brown',
    agenda: 'Review Q1 budget performance and plan Q2 resource allocation',
    duration: '2 hours',
    type: 'Internal'
  },
  {
    id: 'M006',
    name: 'Customer Success Review',
    dateTime: new Date('2025-10-25T11:30:00Z'),
    location: 'Teams',
    attendees: 7,
    status: 'Confirmed',
    organizer: 'Tom Anderson',
    agenda: 'Review customer satisfaction scores and discuss improvement strategies',
    duration: '1 hour',
    type: 'Internal'
  },
  {
    id: 'M007',
    name: 'Partnership Strategy Meeting',
    dateTime: new Date('2025-10-26T16:00:00Z'),
    location: 'Google Meet',
    attendees: 4,
    status: 'Scheduled',
    organizer: 'Sarah Johnson',
    agenda: 'Explore strategic partnerships and collaboration opportunities',
    duration: '1.5 hours',
    type: 'External'
  },
  {
    id: 'M008',
    name: 'Technical Architecture Review',
    dateTime: new Date('2025-10-27T10:30:00Z'),
    location: 'Zoom',
    attendees: 9,
    status: 'Pending',
    organizer: 'Mike Chen',
    agenda: 'Review system architecture and discuss scalability improvements',
    duration: '2 hours',
    type: 'Internal'
  },
  {
    id: 'M009',
    name: 'Marketing Campaign Launch',
    dateTime: new Date('2025-10-28T14:15:00Z'),
    location: 'Teams',
    attendees: 11,
    status: 'Confirmed',
    organizer: 'Emily Davis',
    agenda: 'Launch new marketing campaign and coordinate cross-team activities',
    duration: '1 hour',
    type: 'Internal'
  },
  {
    id: 'M010',
    name: 'Quarterly Business Review',
    dateTime: new Date('2025-10-29T09:45:00Z'),
    location: 'In Person',
    attendees: 20,
    status: 'Confirmed',
    organizer: 'David Wilson',
    agenda: 'Review Q4 performance, set Q1 goals, and strategic planning session',
    duration: '3 hours',
    type: 'Internal'
  },
  {
    id: 'M011',
    name: 'Innovation Workshop',
    dateTime: new Date('2025-10-30T12:00:00Z'),
    location: 'Google Meet',
    attendees: 13,
    status: 'Scheduled',
    organizer: 'Lisa Brown',
    agenda: 'Brainstorm innovative solutions and evaluate new technologies',
    duration: '2.5 hours',
    type: 'Internal'
  },
  {
    id: 'M012',
    name: 'Security Compliance Audit',
    dateTime: new Date('2025-10-31T08:30:00Z'),
    location: 'Zoom',
    attendees: 6,
    status: 'Pending',
    organizer: 'Tom Anderson',
    agenda: 'Conduct security audit and ensure compliance with industry standards',
    duration: '2 hours',
    type: 'External'
  },
  {
    id: 'M013',
    name: 'Product Training Session',
    dateTime: new Date('2025-10-01T15:00:00Z'),
    location: 'Teams',
    attendees: 14,
    status: 'Scheduled',
    organizer: 'Sarah Johnson',
    agenda: 'Train sales team on new product features and capabilities',
    duration: '1.5 hours',
    type: 'Internal'
  },
  {
    id: 'M014',
    name: 'Customer Feedback Analysis',
    dateTime: new Date('2025-10-02T11:15:00Z'),
    location: 'Google Meet',
    attendees: 8,
    status: 'Confirmed',
    organizer: 'Mike Chen',
    agenda: 'Analyze customer feedback and prioritize product improvements',
    duration: '1 hour',
    type: 'External'
  },
  {
    id: 'M015',
    name: 'Competitive Analysis Workshop',
    dateTime: new Date('2025-10-03T13:45:00Z'),
    location: 'Zoom',
    attendees: 10,
    status: 'Scheduled',
    organizer: 'Emily Davis',
    agenda: 'Analyze competitive landscape and develop positioning strategy',
    duration: '2 hours',
    type: 'Internal'
  },
  {
    id: 'M016',
    name: 'Sales Performance Review',
    dateTime: new Date('2025-10-04T10:15:00Z'),
    location: 'In Person',
    attendees: 12,
    status: 'Confirmed',
    organizer: 'David Wilson',
    agenda: 'Review individual and team sales performance metrics',
    duration: '1.5 hours',
    type: 'Internal'
  },
  {
    id: 'M017',
    name: 'Technology Roadmap Planning',
    dateTime: new Date('2025-10-05T14:30:00Z'),
    location: 'Teams',
    attendees: 7,
    status: 'Pending',
    organizer: 'Lisa Brown',
    agenda: 'Plan technology roadmap and evaluate emerging technologies',
    duration: '2 hours',
    type: 'Internal'
  },
  {
    id: 'M018',
    name: 'Customer Onboarding Review',
    dateTime: new Date('2025-10-06T09:00:00Z'),
    location: 'Google Meet',
    attendees: 9,
    status: 'Scheduled',
    organizer: 'Tom Anderson',
    agenda: 'Review customer onboarding process and identify improvements',
    duration: '1 hour',
    type: 'External'
  },
  {
    id: 'M019',
    name: 'Strategic Planning Session',
    dateTime: new Date('2025-10-07T16:15:00Z'),
    location: 'Zoom',
    attendees: 16,
    status: 'Confirmed',
    organizer: 'Sarah Johnson',
    agenda: 'Strategic planning for next quarter and long-term vision alignment',
    duration: '3 hours',
    type: 'Internal'
  },
  {
    id: 'M020',
    name: 'Quality Assurance Review',
    dateTime: new Date('2025-10-08T11:45:00Z'),
    location: 'Teams',
    attendees: 5,
    status: 'Scheduled',
    organizer: 'Mike Chen',
    agenda: 'Review QA processes and discuss quality improvement initiatives',
    duration: '1.5 hours',
    type: 'Internal'
  },
  {
    id: 'M021',
    name: 'Market Research Presentation',
    dateTime: new Date('2025-10-09T13:30:00Z'),
    location: 'In Person',
    attendees: 11,
    status: 'Pending',
    organizer: 'Emily Davis',
    agenda: 'Present market research findings and discuss market opportunities',
    duration: '2 hours',
    type: 'External'
  }
];

// Mock Coaching Data
export const coachingData: Coaching[] = [
  {
    id: 'C001',
    topic: 'Sales Presentation Skills',
    dateTime: new Date('2025-10-20T14:00:00Z'),
    location: 'Conference Room A',
    organizer: 'Sarah Johnson',
    status: 'Scheduled',
    participant: 'John Smith',
    duration: '1 hour',
    notes: 'Focus on improving presentation confidence and storytelling techniques'
  },
  {
    id: 'C002',
    topic: 'Negotiation Strategies',
    dateTime: new Date('2025-10-21T10:30:00Z'),
    location: 'Zoom Meeting',
    organizer: 'Mike Chen',
    status: 'Scheduled',
    participant: 'Anna Rodriguez',
    duration: '1.5 hours',
    notes: 'Advanced negotiation techniques for complex B2B deals'
  },
  {
    id: 'C003',
    topic: 'Time Management',
    dateTime: new Date('2025-10-22T15:15:00Z'),
    location: 'Office 205',
    organizer: 'Emily Davis',
    status: 'In Progress',
    participant: 'David Wilson',
    duration: '45 minutes',
    notes: 'Strategies for managing multiple client relationships efficiently'
  },
  {
    id: 'C004',
    topic: 'Product Knowledge Deep Dive',
    dateTime: new Date('2025-10-23T09:45:00Z'),
    location: 'Training Room B',
    organizer: 'Lisa Brown',
    status: 'Scheduled',
    participant: 'Tom Anderson',
    duration: '2 hours',
    notes: 'Comprehensive product training for new features and capabilities'
  },
  {
    id: 'C005',
    topic: 'Customer Relationship Building',
    dateTime: new Date('2025-10-24T16:30:00Z'),
    location: 'Teams Meeting',
    organizer: 'David Wilson',
    status: 'Scheduled',
    participant: 'Lisa Brown',
    duration: '1 hour',
    notes: 'Best practices for building long-term customer relationships'
  },
  {
    id: 'C006',
    topic: 'Objection Handling',
    dateTime: new Date('2025-10-25T11:00:00Z'),
    location: 'Conference Room C',
    organizer: 'Tom Anderson',
    status: 'Completed',
    participant: 'Sarah Johnson',
    duration: '1.5 hours',
    notes: 'Effective techniques for handling common sales objections'
  },
  {
    id: 'C007',
    topic: 'Digital Marketing Fundamentals',
    dateTime: new Date('2025-10-26T13:20:00Z'),
    location: 'Google Meet',
    organizer: 'Sarah Johnson',
    status: 'Scheduled',
    participant: 'Mike Chen',
    duration: '2 hours',
    notes: 'Introduction to digital marketing strategies and tools'
  },
  {
    id: 'C008',
    topic: 'Leadership Development',
    dateTime: new Date('2025-10-27T14:45:00Z'),
    location: 'Executive Boardroom',
    organizer: 'Mike Chen',
    status: 'Scheduled',
    participant: 'Emily Davis',
    duration: '1 hour',
    notes: 'Leadership skills development for senior team members'
  },
  {
    id: 'C009',
    topic: 'Technical Sales Training',
    dateTime: new Date('2025-10-28T10:15:00Z'),
    location: 'Lab Room 1',
    organizer: 'Emily Davis',
    status: 'In Progress',
    participant: 'David Wilson',
    duration: '3 hours',
    notes: 'Technical training for complex enterprise solutions'
  },
  {
    id: 'C010',
    topic: 'Communication Skills',
    dateTime: new Date('2025-10-29T12:30:00Z'),
    location: 'Zoom Meeting',
    organizer: 'Lisa Brown',
    status: 'Scheduled',
    participant: 'Tom Anderson',
    duration: '1 hour',
    notes: 'Improving verbal and written communication effectiveness'
  },
  {
    id: 'C011',
    topic: 'Project Management Basics',
    dateTime: new Date('2025-10-30T15:50:00Z'),
    location: 'Training Room A',
    organizer: 'David Wilson',
    status: 'Scheduled',
    participant: 'Sarah Johnson',
    duration: '2.5 hours',
    notes: 'Introduction to project management methodologies and tools'
  },
  {
    id: 'C012',
    topic: 'Data Analysis for Sales',
    dateTime: new Date('2025-10-31T09:25:00Z'),
    location: 'Teams Meeting',
    organizer: 'Tom Anderson',
    status: 'Cancelled',
    participant: 'Mike Chen',
    duration: '1.5 hours',
    notes: 'Using data analytics to improve sales performance'
  },
  {
    id: 'C013',
    topic: 'Customer Success Strategies',
    dateTime: new Date('2025-10-01T16:40:00Z'),
    location: 'Conference Room B',
    organizer: 'Sarah Johnson',
    status: 'Scheduled',
    participant: 'Emily Davis',
    duration: '1 hour',
    notes: 'Strategies for ensuring customer success and retention'
  },
  {
    id: 'C014',
    topic: 'Competitive Intelligence',
    dateTime: new Date('2025-10-02T11:10:00Z'),
    location: 'Google Meet',
    organizer: 'Mike Chen',
    status: 'Scheduled',
    participant: 'Lisa Brown',
    duration: '1.5 hours',
    notes: 'Gathering and analyzing competitive intelligence'
  },
  {
    id: 'C015',
    topic: 'Sales Process Optimization',
    dateTime: new Date('2025-10-03T14:25:00Z'),
    location: 'Office 301',
    organizer: 'Emily Davis',
    status: 'Scheduled',
    participant: 'David Wilson',
    duration: '2 hours',
    notes: 'Optimizing sales processes for better efficiency'
  },
  {
    id: 'C016',
    topic: 'Emotional Intelligence',
    dateTime: new Date('2025-10-04T10:55:00Z'),
    location: 'Wellness Room',
    organizer: 'Lisa Brown',
    status: 'Completed',
    participant: 'Tom Anderson',
    duration: '1 hour',
    notes: 'Developing emotional intelligence for better team collaboration'
  },
  {
    id: 'C017',
    topic: 'Industry Trends Analysis',
    dateTime: new Date('2025-10-05T13:15:00Z'),
    location: 'Zoom Meeting',
    organizer: 'David Wilson',
    status: 'Scheduled',
    participant: 'Sarah Johnson',
    duration: '1.5 hours',
    notes: 'Understanding and leveraging current industry trends'
  },
  {
    id: 'C018',
    topic: 'Team Collaboration',
    dateTime: new Date('2025-10-06T15:35:00Z'),
    location: 'Collaboration Space',
    organizer: 'Tom Anderson',
    status: 'Scheduled',
    participant: 'Mike Chen',
    duration: '1 hour',
    notes: 'Improving team collaboration and cross-functional communication'
  },
  {
    id: 'C019',
    topic: 'Performance Metrics',
    dateTime: new Date('2025-10-07T12:05:00Z'),
    location: 'Teams Meeting',
    organizer: 'Sarah Johnson',
    status: 'Scheduled',
    participant: 'Emily Davis',
    duration: '2 hours',
    notes: 'Understanding and tracking key performance indicators'
  },
  {
    id: 'C020',
    topic: 'Innovation Mindset',
    dateTime: new Date('2025-10-08T09:40:00Z'),
    location: 'Innovation Lab',
    organizer: 'Mike Chen',
    status: 'Scheduled',
    participant: 'Lisa Brown',
    duration: '1.5 hours',
    notes: 'Developing an innovation mindset for continuous improvement'
  },
  {
    id: 'C021',
    topic: 'Stress Management',
    dateTime: new Date('2025-10-09T14:20:00Z'),
    location: 'Wellness Center',
    organizer: 'Emily Davis',
    status: 'Scheduled',
    participant: 'David Wilson',
    duration: '1 hour',
    notes: 'Techniques for managing stress in high-pressure environments'
  }
];