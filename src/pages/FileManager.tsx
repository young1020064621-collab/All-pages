import { useState, useMemo } from "react";
import { FileManagerSidebar } from "@/components/file-manager/FileManagerSidebar";
import { FileManagerHeader } from "@/components/file-manager/FileManagerHeader";
import { FileGrid } from "@/components/file-manager/FileGrid";
import { FileList } from "@/components/file-manager/FileList";
import { FileItem, FolderNode, Team, Deal, ViewMode, SortBy, SortOrder } from "@/types/fileManager";
import { sortItems, generateId } from "@/lib/fileUtils";
import { useToast } from "@/hooks/useToast";
import { Plus, Upload, FolderPlus, Folder, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoveToDialog } from "@/components/file-manager/MoveToDialog";
import { ShareDialog } from "@/components/file-manager/ShareDialog";
import { RenameDialog } from "@/components/file-manager/RenameDialog";
import { CopyToDialog } from "@/components/file-manager/CopyToDialog";
import { DeleteConfirmDialog } from "@/components/file-manager/DeleteConfirmDialog";
import { AccessManagementDialog } from "@/components/file-manager/AccessManagementDialog";
import { mockTeams, mockFiles } from "@/data/mockData";

export function FileManager() {
  const { showSuccess, showError, showInfo, showAlert } = useToast();
  
  // State management
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [currentTeam] = useState<Team | null>(null);
  const [currentDeal] = useState<Deal | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>('transcript-history');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // Dialog states
  const [moveToDialogOpen, setMoveToDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [copyToDialogOpen, setCopyToDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accessManagementDialogOpen, setAccessManagementDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importPreviewDialogOpen, setImportPreviewDialogOpen] = useState(false);
  // Dialog data states
  const [itemsToMove, setItemsToMove] = useState<string[]>([]);
  const [itemsToShare, setItemsToShare] = useState<string[]>([]);
  const [itemToRename, setItemToRename] = useState<FileItem | null>(null);
  const [itemsToCopy, setItemsToCopy] = useState<string[]>([]);
  const [itemsToDelete, setItemsToDelete] = useState<FileItem[]>([]);
  const [itemToManageAccess, setItemToManageAccess] = useState<FileItem | null>(null);

  // Computed values
  const filteredFiles = useMemo(() => {
    let filtered = files;
    
    // Filter by team/deal context
    if (currentCategory) {
      filtered = filtered.filter(file => file.category === currentCategory);
    }
    
    // Filter by current folder
    if (currentFolderId) {
      filtered = filtered.filter(file => file.parentId === currentFolderId);
    } else {
      filtered = filtered.filter(file => !file.parentId);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return sortItems(filtered, sortBy, sortOrder);
  }, [files, currentFolderId, currentCategory, searchQuery, sortBy, sortOrder]);

  const folderTree = useMemo(() => {
    const buildTree = (parentId?: string): FolderNode[] => {
      let folders = files.filter(f => f.type === 'folder' && f.parentId === parentId);
      
      // Filter by category if set
      if (currentCategory) {
        folders = folders.filter(f => f.category === currentCategory);
      }
      
      return folders.map(folder => ({
        item: folder,
        children: buildTree(folder.id),
        isExpanded: false
      }));
    };
    
    return buildTree();
  }, [files, currentCategory]);

  const breadcrumbs = useMemo(() => {
    const getCategoryName = (category: string | null) => {
      const categories = {
        'transcripts': 'Transcripts',
        'recordings': 'Recordings', 
        'documents': 'Documents',
        'images': 'Images',
        'videos': 'Videos',
        'audio': 'Audio',
        'archives': 'Archives',
        'other': 'Other',
        'transcript-history': 'Transcript History',
        'customers': 'Customers',
        'share-with-me': 'Share with me',
        'email': 'Email',
        'deal': 'Deals',
        'proposals': 'Proposals & Quotes',
        'contract': 'Contract Management',
        'personal': 'Personal Files'
      };
      return category ? categories[category as keyof typeof categories] || category : null;
    };

    const formatFolderName = (name: string) => {
      return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };
    
    const crumbs = [{
      id: 'root',
      name: currentCategory ? getCategoryName(currentCategory) || 'All Files' : 'All Files'
    }];

    if (currentFolderId) {
      const buildPath = (folderId: string): Array<{ id: string; name: string }> => {
        const folder = files.find(f => f.id === folderId && f.type === 'folder');
        if (!folder) return [];
        
        const path = folder.parentId ? buildPath(folder.parentId) : [];
        return [...path, { id: folder.id, name: formatFolderName(folder.name) }];
      };
      
      crumbs.push(...buildPath(currentFolderId));
    }
    
    return crumbs;
  }, [currentFolderId, files, currentCategory]);

  // Event handlers
  const handleItemSelect = (id: string, selected: boolean) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentFolderId(item.id);
    }
  };

  const handleSort = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const handleCategorySelect = (category: string | null) => {
    setCurrentCategory(category);
    setCurrentFolderId(null);
    setSelectedItems(new Set()); // Clear selections when switching categories
  };

  const handleCreateFolder = (parentId?: string, folderName?: string, isTeamFolder = false, isDealFolder = false) => {
    console.log('handleCreateFolder called with:', { parentId, folderName, isTeamFolder, isDealFolder, currentFolderId, currentCategory });
    
    const newFolder: FileItem = {
      id: generateId(),
      name: folderName || 'New Folder',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(),
      createdAt: new Date(),
      modifiedDate: new Date(),
      modifiedBy: 'Current User',
      parentId: (parentId ?? currentFolderId) ?? undefined,
      isShared: false,
      category: currentCategory,
      teamId: currentTeam?.id,
      dealId: currentDeal?.id
    };
    
    console.log('Creating new folder:', newFolder);
    
    setFiles(prev => {
      const updated = [...prev, newFolder];
      console.log('Updated files array:', updated);
      return updated;
    });
    
    showSuccess(`"${newFolder.name}" has been created successfully.`);
    
    console.log('Toast notification sent');
  };

  const handleItemDelete = (id: string) => {
    const item = files.find(f => f.id === id);
    if (item) {
      setItemsToDelete([item]);
      setDeleteDialogOpen(true);
    }
  };

  const handleBulkDelete = () => {
    const items = Array.from(selectedItems).map(id => files.find(f => f.id === id)).filter(Boolean) as FileItem[];
    setItemsToDelete(items);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const idsToDelete = itemsToDelete.map(item => item.id);
    setFiles(prev => prev.filter(f => !idsToDelete.includes(f.id)));
    
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      idsToDelete.forEach(id => newSet.delete(id));
      return newSet;
    });
    
    const itemCount = itemsToDelete.length;
    const msg = itemCount === 1 
      ? `"${itemsToDelete[0].name}" has been deleted.`
      : `${itemCount} items have been deleted.`;
    showAlert(msg);
    
    setItemsToDelete([]);
  };

  const handleItemShare = (id: string) => {
    const item = files.find(f => f.id === id);
    showSuccess(`Share link for "${item?.name}" has been copied to clipboard.`);
  };

  const handleItemRename = (id: string) => {
    const item = files.find(f => f.id === id);
    if (item) {
      setItemToRename(item);
      setRenameDialogOpen(true);
    }
  };

  const handleRename = (id: string, newName: string) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, name: newName } : file
    ));
    
    showSuccess(`Successfully renamed to "${newName}".`);
  };

  const handleItemCopy = (id: string) => {
    setItemsToCopy([id]);
    setCopyToDialogOpen(true);
  };

  const handleCopyItems = (targetFolderId: string | null) => {
    const itemNames = itemsToCopy.map(id => {
      const item = files.find(f => f.id === id);
      return item?.name;
    }).filter(Boolean);
    
    const newItems = itemsToCopy.map(id => {
      const originalItem = files.find(f => f.id === id);
      if (!originalItem) return null;
      
      return {
        ...originalItem,
        id: generateId(),
        parentId: targetFolderId,
        name: `${originalItem.name} - Copy`,
      };
    }).filter(Boolean) as FileItem[];
    
    setFiles(prev => [...prev, ...newItems]);
    setItemsToCopy([]);
    setCopyToDialogOpen(false);
    
    showSuccess(`${itemNames.length} items have been copied successfully.`);
  };

  const handleItemDownload = (id: string) => {
    const item = files.find(f => f.id === id);
    showInfo(`Downloading "${item?.name}"...`);
  };

  const handleFolderColorChange = (id: string, color: FileItem['color']) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, color } : file
    ));
  };

  const handleManageAccess = (id: string) => {
    const item = files.find(f => f.id === id);
    if (item) {
      setItemToManageAccess(item);
      setAccessManagementDialogOpen(true);
    }
  };

  const handleBulkDownload = () => {
    showInfo(`Downloading ${selectedItems.size} items...`);
  };

  const handleBulkShare = () => {
    setItemsToShare(Array.from(selectedItems));
    setShareDialogOpen(true);
  };

  const handleBulkMove = () => {
    setItemsToMove(Array.from(selectedItems));
    setMoveToDialogOpen(true);
  };

  const handleMoveItems = (targetFolderId: string | null) => {
    const itemNames = itemsToMove.map(id => {
      const item = files.find(f => f.id === id);
      return item?.name;
    }).filter(Boolean);
    
    setFiles(prev => prev.map(file => 
      itemsToMove.includes(file.id) 
        ? { ...file, parentId: targetFolderId ?? undefined }
        : file
    ));
    
    setSelectedItems(new Set());
    setItemsToMove([]);
    setMoveToDialogOpen(false);
    
    showSuccess(`${itemNames.length} items have been moved successfully.`);
  };

  const handleShareItems = (shareData: { users: string[], teams: string[], copyLink: boolean }) => {
    const itemNames = itemsToShare.map(id => {
      const item = files.find(f => f.id === id);
      return item?.name;
    }).filter(Boolean);
    
    setFiles(prev => prev.map(file => 
      itemsToShare.includes(file.id) 
        ? { ...file, isShared: true }
        : file
    ));
    
    setSelectedItems(new Set());
    setItemsToShare([]);
    setShareDialogOpen(false);
    
    let description = `${itemNames.length} items have been shared`;
    if (shareData.users.length > 0) {
      description += ` with ${shareData.users.length} users`;
    }
    if (shareData.teams.length > 0) {
      description += ` and ${shareData.teams.length} teams`;
    }
    if (shareData.copyLink) {
      description += '. Share link copied to clipboard';
    }
    
    showSuccess(description);
  };

  // Add button functionality handlers
  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        Array.from(files).forEach(file => {
          const newFile: FileItem = {
            id: generateId(),
            name: file.name,
            type: 'file',
            size: file.size,
            modifiedAt: new Date(file.lastModified),
            createdAt: new Date(),
            parentId: currentFolderId ?? undefined,
            isShared: false,
            category: currentCategory,
            teamId: currentTeam?.id,
            dealId: currentDeal?.id,
            fileType: file.type || 'unknown'
          };
          setFiles(prev => [...prev, newFile]);
        });
        
        showSuccess(`${files.length} file(s) have been uploaded successfully.`);
      }
    };
    input.click();
  };

  const handleFolderUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const folderStructure = new Map<string, string>();
        const createdFolders = new Set<string>();
        
        // First pass: create folder structure
        Array.from(files).forEach(file => {
          const pathParts = file.webkitRelativePath.split('/');
          let currentPath = '';
          let currentParentId = currentFolderId;
          
          for (let i = 0; i < pathParts.length - 1; i++) {
            const folderName = pathParts[i];
            const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;
            
            if (!createdFolders.has(folderPath)) {
              const folderId = generateId();
              const newFolder: FileItem = {
                id: folderId,
                name: folderName,
                type: 'folder',
                size: 0,
                modifiedAt: new Date(),
                createdAt: new Date(),
            parentId: currentParentId ?? undefined,
                isShared: false,
                category: currentCategory,
                teamId: currentTeam?.id,
                dealId: currentDeal?.id
              };
              
              setFiles(prev => [...prev, newFolder]);
              folderStructure.set(folderPath, folderId);
              createdFolders.add(folderPath);
              currentParentId = folderId;
            } else {
              currentParentId = folderStructure.get(folderPath) || currentFolderId;
            }
            
            currentPath = folderPath;
          }
        });
        
        // Second pass: create files
        Array.from(files).forEach(file => {
          const pathParts = file.webkitRelativePath.split('/');
          const fileName = pathParts[pathParts.length - 1];
          const folderPath = pathParts.slice(0, -1).join('/');
          const parentId = folderPath ? folderStructure.get(folderPath) : currentFolderId;
          
          const newFile: FileItem = {
            id: generateId(),
            name: fileName,
            type: 'file',
            size: file.size,
            modifiedAt: new Date(file.lastModified),
            createdAt: new Date(),
            parentId: (parentId ?? currentFolderId) ?? undefined,
            isShared: false,
            category: currentCategory,
            teamId: currentTeam?.id,
            dealId: currentDeal?.id,
            fileType: file.type || 'unknown'
          };
          
          setFiles(prev => [...prev, newFile]);
        });
        
        showSuccess(`Folder with ${files.length} file(s) has been uploaded successfully.`);
      }
    };
    input.click();
  };

  const handleCreateLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      try {
        new URL(url); // Validate URL
        const linkName = prompt('Enter a name for this link:', new URL(url).hostname) || 'New Link';
        
        const newLink: FileItem = {
          id: generateId(),
          name: linkName,
          type: 'file',
          size: 0,
          modifiedAt: new Date(),
          createdAt: new Date(),
          parentId: currentFolderId ?? undefined,
          isShared: false,
          category: currentCategory,
          teamId: currentTeam?.id,
          dealId: currentDeal?.id,
          fileType: 'link',
          url: url
        };
        
        setFiles(prev => [...prev, newLink]);
        
        showSuccess(`Link "${linkName}" has been created successfully.`);
      } catch {
        showError("Please enter a valid URL.");
      }
    }
  };
  const [selectedImportSource, setSelectedImportSource] = useState<string | null>(null);
  const handleImportSelect = (sourceId: string) => {
    setImportDialogOpen(false);
    setSelectedImportSource(sourceId);
    setImportPreviewDialogOpen(true);
  };

  const importSources = [
    { id: 'sam', name: 'SAM' },
    { id: 'google-meet', name: 'Google Meeting Transcript' },
    { id: 'hubspot', name: 'HubSpot Call' },
    { id: 'teams', name: 'Microsoft Team Transcript' },
    { id: 'zoom', name: 'Zoom Transcript' }
  ];
  
  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">SAM Drive</h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                All your meeting transcripts and deal files in one place. Accelerate every deal.
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            {currentCategory === 'transcript-history' && (
              <Button 
                size="sm" 
                variant="outline"
                className="gap-2 border border-gray-600 text-gray-600 bg-white hover:bg-gray-600"
                onClick={() => setImportDialogOpen(true)}
              >
                <Upload className="h-4 w-4 align-middle" />
                Import
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white">
                  <Plus className="h-4 w-4 align-middle" />
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.preventDefault();
                  handleCreateFolder();
                }}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.preventDefault();
                  handleFileUpload();
                }}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.preventDefault();
                  handleFolderUpload();
                }}>
                  <Folder className="h-4 w-4 mr-2" />
                  Upload Folder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.preventDefault();
                  handleCreateLink();
                }}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r border-border shrink-0 bg-white overflow-y-auto h-full">
          <FileManagerSidebar
            folderTree={folderTree}
            currentFolderId={currentFolderId}
            onFolderSelect={setCurrentFolderId}
            onCreateFolder={handleCreateFolder}
            currentCategory={currentCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <FileManagerHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={(sortBy, sortOrder) => {
              setSortBy(sortBy);
              setSortOrder(sortOrder);
            }}
            selectedCount={selectedItems.size}
            onDownloadSelected={handleBulkDownload}
            onDeleteSelected={handleBulkDelete}
            onShareSelected={handleBulkShare}
            onMoveSelected={handleBulkMove}
            breadcrumbs={breadcrumbs}
            onBreadcrumbClick={(id) => setCurrentFolderId(id === 'root' ? null : id)}
            category={currentCategory ?? undefined}
          />
          
          <div className="flex-1 overflow-hidden">
            {viewMode === 'grid' ? (
              <FileGrid
                items={filteredFiles}
                selectedItems={selectedItems}
                onItemSelect={handleItemSelect}
                onItemDoubleClick={handleItemDoubleClick}
                onItemDelete={handleItemDelete}
                onItemShare={handleItemShare}
                onItemRename={handleItemRename}
                onItemDownload={handleItemDownload}
                onItemCopy={handleItemCopy}
                onFolderColorChange={handleFolderColorChange}
                onManageAccess={handleManageAccess}
              />
            ) : (
              <FileList
                items={filteredFiles}
                selectedItems={selectedItems}
                sortBy={sortBy}
                sortOrder={sortOrder}
                category={currentCategory ?? undefined}
                breadcrumbs={breadcrumbs}
                onItemSelect={handleItemSelect}
                onItemDoubleClick={handleItemDoubleClick}
                onItemDelete={handleItemDelete}
                onItemShare={handleItemShare}
                onItemRename={handleItemRename}
                onItemDownload={handleItemDownload}
                onItemCopy={handleItemCopy}
                onFolderColorChange={handleFolderColorChange}
                onManageAccess={handleManageAccess}
                onSort={handleSort}
              />
            )}
          </div>
        </main>
      </div>

      {/* Move To Dialog */}
      <MoveToDialog
        open={moveToDialogOpen}
        onOpenChange={setMoveToDialogOpen}
        folderTree={folderTree}
        currentFolderId={currentFolderId}
        onMove={handleMoveItems}
        itemCount={itemsToMove.length}
      />

      {/* Share Dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        teams={mockTeams}
        onShare={handleShareItems}
        itemCount={itemsToShare.length}
      />

      {/* Rename Dialog */}
      <RenameDialog
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
        item={itemToRename}
        onRename={handleRename}
      />

      {/* Copy To Dialog */}
      <CopyToDialog
        open={copyToDialogOpen}
        onOpenChange={setCopyToDialogOpen}
        items={itemsToCopy}
        files={files}
        onCopy={handleCopyItems}
      />

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        items={itemsToDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Access Management Dialog */}
      <AccessManagementDialog
        open={accessManagementDialogOpen}
        onOpenChange={setAccessManagementDialogOpen}
        itemName={itemToManageAccess?.name || ''}
        itemType={itemToManageAccess?.type || 'file'}
      />
      {/* Import Source Selection Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import From</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {importSources.map((source) => (
              <Button
                key={source.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleImportSelect(source.id)}
              >
                {source.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Preview Dialog */}
      <Dialog open={importPreviewDialogOpen} onOpenChange={setImportPreviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import Preview</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              A popup will open to select or import links.
            </p>
            {selectedImportSource && (
              <p className="mt-2 text-sm">
                Selected source: {importSources.find(s => s.id === selectedImportSource)?.name || selectedImportSource}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setImportPreviewDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
