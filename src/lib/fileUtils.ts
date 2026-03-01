export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDate(date: Date | undefined): string {
  if (!date) {
    return 'Unknown';
  }
  
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

import type { SortBy } from "@/types/fileManager";

export function sortItems<T extends { name: string; modifiedAt?: Date; modifiedDate?: Date; size?: number; type: string; createdAt?: Date; updatedAt?: Date; status?: string; dealName?: string; company?: string; source?: string }>(
  items: T[],
  sortBy: SortBy,
  sortOrder: 'asc' | 'desc'
): T[] {
  const sorted = [...items].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'modified':
        {
          const aTime = (a.modifiedAt || a.modifiedDate)?.getTime() || 0;
          const bTime = (b.modifiedAt || b.modifiedDate)?.getTime() || 0;
          comparison = aTime - bTime;
        }
        break;
      case 'created':
        {
          const aTime = a.createdAt?.getTime() || 0;
          const bTime = b.createdAt?.getTime() || 0;
          comparison = aTime - bTime;
        }
        break;
      case 'updated':
        {
          const aTime = a.updatedAt?.getTime() || (a.modifiedAt || a.modifiedDate)?.getTime() || 0;
          const bTime = b.updatedAt?.getTime() || (b.modifiedAt || b.modifiedDate)?.getTime() || 0;
          comparison = aTime - bTime;
        }
        break;
      case 'size':
        {
          const aSize = a.size || 0;
          const bSize = b.size || 0;
          comparison = aSize - bSize;
        }
        break;
      case 'type':
        // Folders first, then files
        if (a.type === 'folder' && b.type === 'file') comparison = -1;
        else if (a.type === 'file' && b.type === 'folder') comparison = 1;
        else comparison = a.name.localeCompare(b.name);
        break;
      case 'status':
        {
          const aStatus = a.status || '';
          const bStatus = b.status || '';
          comparison = aStatus.localeCompare(bStatus);
        }
        break;
      case 'dealName':
        {
          const aDeal = a.dealName || '';
          const bDeal = b.dealName || '';
          comparison = aDeal.localeCompare(bDeal);
        }
        break;
      case 'client':
        {
          const aClient = a.company || '';
          const bClient = b.company || '';
          comparison = aClient.localeCompare(bClient);
        }
        break;
      case 'source':
        {
          const aSrc = a.source || '';
          const bSrc = b.source || '';
          comparison = aSrc.localeCompare(bSrc);
        }
        break;
      case 'contractName':
        comparison = a.name.localeCompare(b.name);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
}
