export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modifiedAt?: Date;
  createdAt?: Date;
  modifiedDate?: Date;
  modifiedBy?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'pink';
  parentId?: string;
  isShared: boolean;
  permissions?: Permission[];
  teamId?: string;
  dealId?: string;
  ownerId?: string;
  isTeamFile?: boolean;
  category?: 'transcript-history' | 'customers' | 'personal' | string | null;
  fileType?: 'transcript' | 'video' | 'audio' | 'pdf' | 'word' | 'excel' | 'txt' | 'email' | 'image' | 'other' | string;
  url?: string;
  uploadedAt?: Date;
  uploadedBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  company?: string;
  status?: string;
  dealName?: string;
  source?: string;
}

export interface Permission {
  userId: string;
  role: 'viewer' | 'editor' | 'admin';
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
  isPublic: boolean;
}

export interface Deal {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'closed';
  value: number;
  company: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'member';
  teams: string[];
}

export interface FolderNode {
  item: FileItem;
  children: FolderNode[];
  isExpanded: boolean;
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'name' | 'modified' | 'size' | 'type' | 'created' | 'updated' | 'status' | 'client' | 'source' | 'dealName' | 'contractName';
export type SortOrder = 'asc' | 'desc';
