export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  dateJoined: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  startDate: string;
  dueDate: string;
  currentPhase: 'Planning' | 'Design' | 'Development' | 'Review' | 'Completed';
  status: 'Not Started' | 'In Progress' | 'Behind Schedule' | 'Completed';
  progress: number;
  description: string;
}

export interface Deliverable {
  id: string;
  fileName: string;
  projectId: string;
  fileType: 'Invoice' | 'Design Proof' | 'Report' | 'Contract' | 'Other';
  uploadDate: string;
  approvalStatus: 'Pending' | 'Approved' | 'Needs Revision';
  fileSize: string;
}

export const clients: Client[] = [
  {
    id: 'client-1',
    companyName: 'Acme Corporation',
    contactName: 'John Smith',
    contactEmail: 'john@acmecorp.com',
    phone: '555-1234',
    dateJoined: '2024-01-15',
  },
  {
    id: 'client-2',
    companyName: 'TechStart Inc',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@techstart.io',
    phone: '555-5678',
    dateJoined: '2024-02-20',
  },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    clientId: 'client-1',
    startDate: '2024-11-01',
    dueDate: '2024-12-20',
    currentPhase: 'Development',
    status: 'In Progress',
    progress: 65,
    description: 'Complete overhaul of the company website with modern design, improved UX, and mobile responsiveness. Includes new content management system integration.',
  },
  {
    id: 'project-2',
    name: 'Brand Identity Package',
    clientId: 'client-1',
    startDate: '2024-10-15',
    dueDate: '2024-11-30',
    currentPhase: 'Review',
    status: 'In Progress',
    progress: 85,
    description: 'Comprehensive brand identity including logo design, color palette, typography guidelines, and brand book.',
  },
  {
    id: 'project-3',
    name: 'Mobile App Development',
    clientId: 'client-2',
    startDate: '2024-09-01',
    dueDate: '2025-02-28',
    currentPhase: 'Design',
    status: 'In Progress',
    progress: 35,
    description: 'Native iOS and Android application for customer engagement with push notifications and loyalty program integration.',
  },
  {
    id: 'project-4',
    name: 'Marketing Campaign',
    clientId: 'client-2',
    startDate: '2024-08-01',
    dueDate: '2024-10-31',
    currentPhase: 'Completed',
    status: 'Completed',
    progress: 100,
    description: 'Q4 digital marketing campaign including social media strategy, paid advertising, and email marketing automation.',
  },
];

export const deliverables: Deliverable[] = [
  {
    id: 'del-1',
    fileName: 'Homepage Mockup v2.fig',
    projectId: 'project-1',
    fileType: 'Design Proof',
    uploadDate: '2024-11-15',
    approvalStatus: 'Approved',
    fileSize: '24.5 MB',
  },
  {
    id: 'del-2',
    fileName: 'About Page Design.fig',
    projectId: 'project-1',
    fileType: 'Design Proof',
    uploadDate: '2024-11-18',
    approvalStatus: 'Pending',
    fileSize: '18.2 MB',
  },
  {
    id: 'del-3',
    fileName: 'Phase 1 Invoice.pdf',
    projectId: 'project-1',
    fileType: 'Invoice',
    uploadDate: '2024-11-01',
    approvalStatus: 'Approved',
    fileSize: '156 KB',
  },
  {
    id: 'del-4',
    fileName: 'Logo Concepts.pdf',
    projectId: 'project-2',
    fileType: 'Design Proof',
    uploadDate: '2024-10-20',
    approvalStatus: 'Approved',
    fileSize: '8.4 MB',
  },
  {
    id: 'del-5',
    fileName: 'Brand Guidelines.pdf',
    projectId: 'project-2',
    fileType: 'Report',
    uploadDate: '2024-11-25',
    approvalStatus: 'Needs Revision',
    fileSize: '12.1 MB',
  },
  {
    id: 'del-6',
    fileName: 'App Wireframes.fig',
    projectId: 'project-3',
    fileType: 'Design Proof',
    uploadDate: '2024-10-05',
    approvalStatus: 'Approved',
    fileSize: '32.7 MB',
  },
  {
    id: 'del-7',
    fileName: 'Campaign Report Q4.pdf',
    projectId: 'project-4',
    fileType: 'Report',
    uploadDate: '2024-10-31',
    approvalStatus: 'Approved',
    fileSize: '4.2 MB',
  },
];

export const getClientProjects = (clientId: string) => {
  return projects.filter(project => project.clientId === clientId);
};

export const getProjectDeliverables = (projectId: string) => {
  return deliverables.filter(del => del.projectId === projectId);
};

export const getClientById = (clientId: string) => {
  return clients.find(client => client.id === clientId);
};

export const getProjectById = (projectId: string) => {
  return projects.find(project => project.id === projectId);
};
