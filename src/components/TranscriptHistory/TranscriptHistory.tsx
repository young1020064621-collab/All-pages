import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  X, 
  RotateCcw, 
  ChevronDown, 
  Edit3, 
  Plus,
  ChevronLeft,
  ChevronRight,
  File,
  Share2,
  Upload,
  Filter,
  RefreshCw,
  FolderOpen,
  Folder,
  MoreHorizontal,
  Trash2,
  Edit,
  Expand,
  Minimize2,
  Import,
  Send,
  Mic, 
  Bot
} from 'lucide-react';
import ImportPopup from './ImportPopup';
import ImportThirdPartPopup from './ImportThirdPartPopup';
import MobileFiltersPopup from './MobileFiltersPopup';
import QAPopup from './QAPopup';

interface TranscriptItem {
  id: string;
  dateUploaded: string;
  transcript: string;
  source: string;
  category?: string;
}

interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
  isExpanded?: boolean;
}

interface TranscriptHistoryProps {
  onNavigate?: (view: string) => void;
  onToggleEmpty?: (showEmpty: boolean) => void;
}

const TranscriptHistory: React.FC<TranscriptHistoryProps> = () => {
  const [activeTab, setActiveTab] = useState('my-history');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [showImportThirdPartPopup, setShowImportThirdPartPopup] = useState(false);
  const [showMobileFiltersPopup, setShowMobileFiltersPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>([
    {
      id: 'all-transcripts',
      name: 'All Transcripts',
      isExpanded: true,
      children: [
        {
          id: 'business',
          name: 'Client Meeting',
          isExpanded: false,
          children: [
            { id: 'meetings', name: 'Meetings' },
            { id: 'reports', name: 'Reports' }
          ]
        },
        { id: 'internal', name: 'Internal Meeting'},
        {
          id: 'personal',
          name: 'Personal',
          isExpanded: false,
          children: [
            { id: 'notes', name: 'Notes' },
            { id: 'ideas', name: 'Ideas' }
          ]
        },
        { id: 'coaching', name: 'Coaching' },
        { id: 'education', name: 'Education' }
      ]
    }
  ]);
  const [showAddFolderDialog, setShowAddFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedParentFolder, setSelectedParentFolder] = useState<string | null>(null);
  const [chatAreaWidth, setChatAreaWidth] = useState(25); // Default sidebar width 25%
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [showImportDropdown, setShowImportDropdown] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [samQuestion, setSamQuestion] = useState('');
  const [showQAPopup, setShowQAPopup] = useState(false);
  const [currentQA, setCurrentQA] = useState({ question: '', answer: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAIInputPopup, setShowAIInputPopup] = useState(false);
  const [showAIResultPopup, setShowAIResultPopup] = useState(false);

  // Sample data with categories
  const myHistoryData: TranscriptItem[] = [
    {
      id: '1',
      dateUploaded: '2024-01-15T10:30:00Z',
      transcript: 'Meeting with Client A',
      source: 'Zoom Recording',
      category: 'meetings'
    },
    {
      id: '2',
      dateUploaded: '2024-01-14T14:20:00Z',
      transcript: 'Quarterly Report Discussion',
      source: 'Teams Recording',
      category: 'reports'
    },
    {
      id: '3',
      dateUploaded: '2024-01-13T09:15:00Z',
      transcript: 'Personal Notes Session',
      source: 'Voice Memo',
      category: 'notes'
    },
    {
      id: '4',
      dateUploaded: '2024-01-12T16:45:00Z',
      transcript: 'Project Ideas Brainstorm',
      source: 'Audio File',
      category: 'ideas'
    },
    {
      id: '5',
      dateUploaded: '2024-01-11T11:30:00Z',
      transcript: 'Online Course Lecture',
      source: 'Video Upload',
      category: 'education'
    }
  ];

  const sharedWithMeData: TranscriptItem[] = [
    {
      id: '6',
      dateUploaded: '2024-01-10T13:20:00Z',
      transcript: 'Team Standup Meeting',
      source: 'Shared Recording',
      category: 'meetings'
    },
    {
      id: '7',
      dateUploaded: '2024-01-09T15:10:00Z',
      transcript: 'Sales Report Review',
      source: 'Shared Document',
      category: 'reports'
    }
  ];

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const updateNodeExpansion = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        if (node.id === categoryId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: updateNodeExpansion(node.children) };
        }
        return node;
      });
    };
    setCategoryTree(prev => updateNodeExpansion(prev));
  };

  // Find category name recursively
  const findCategoryName = (nodes: CategoryNode[], categoryId: string): string | null => {
    for (const node of nodes) {
      if (node.id === categoryId) {
        return node.name;
      }
      if (node.children) {
        const result = findCategoryName(node.children, categoryId);
        if (result) return result;
      }
    }
    return null;
  };

  const addNewFolder = (parentId: string | null, folderName: string) => {
    const newFolder: CategoryNode = {
      id: `folder-${Date.now()}`,
      name: folderName,
      isExpanded: false,
      children: []
    };

    const addToNode = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newFolder],
            isExpanded: true
          };
        }
        if (node.children) {
          return { ...node, children: addToNode(node.children) };
        }
        return node;
      });
    };

    if (parentId === null) {
      // Add to root level (under All Transcripts)
      setCategoryTree(prev => 
        prev.map(node => 
          node.id === 'all-transcripts'
            ? { ...node, children: [...(node.children || []), newFolder] }
            : node
        )
      );
    } else {
      setCategoryTree(prev => addToNode(prev));
    }
  };

  const handleAddFolder = (parentId: string | null) => {
    setSelectedParentFolder(parentId);
    setShowAddFolderDialog(true);
  };

  const handleSaveNewFolder = () => {
    if (newFolderName.trim()) {
      addNewFolder(selectedParentFolder, newFolderName.trim());
      setNewFolderName('');
      setShowAddFolderDialog(false);
      setSelectedParentFolder(null);
    }
  };

  const handleCancelAddFolder = () => {
    setShowAddFolderDialog(false);
    setNewFolderName('');
    setSelectedParentFolder(null);
  };

  // Handle sidebar resizing
  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    const constrainedWidth = Math.max(20, Math.min(80, newWidth));
    setChatAreaWidth(constrainedWidth);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners for resizing
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Close submenu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveSubmenu(null);
    };
    
    if (activeSubmenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeSubmenu]);

  // Close import dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = target.closest('.import-dropdown');
      if (!dropdown && showImportDropdown) {
        setShowImportDropdown(false);
      }
    };
    
    if (showImportDropdown) {
      // Add a small delay to prevent immediate closure
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showImportDropdown]);

  // Handle folder operations
  const handleRenameFolder = (folderId: string, newName: string) => {
    const updateNode = (node: CategoryNode): CategoryNode => {
      if (node.id === folderId) {
        return { ...node, name: newName };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }
      return node;
    };
    setCategoryTree(prev => prev.map(updateNode));
    setIsRenaming(null);
    setRenameValue('');
  };

  const handleDeleteFolder = (folderId: string) => {
    const removeNode = (node: CategoryNode): CategoryNode => {
      if (node.children) {
        return {
          ...node,
          children: node.children.filter(child => child.id !== folderId).map(removeNode)
        };
      }
      return node;
    };
    setCategoryTree(prev => prev.map(removeNode));
    if (selectedCategory === folderId) {
      setSelectedCategory('all-transcripts');
    }
  };

  const handleSubmenuAction = (action: string, folderId: string) => {
    setActiveSubmenu(null);
    switch (action) {
      case 'add':
        handleAddFolder(folderId);
        break;
      case 'rename':
        const folderName = findCategoryName(categoryTree, folderId) || '';
        setIsRenaming(folderId);
        setRenameValue(folderName);
        break;
      case 'delete':
        if (folderId !== 'all-transcripts') {
          handleDeleteFolder(folderId);
        }
        break;
    }
  };

  const renderFolderNode = (node: CategoryNode, level: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedCategory === node.id;
    const isRootNode = node.id === 'all-transcripts';
    
    return (
      <div key={node.id} style={{ marginLeft: `${level * 16}px` }}>
        <div 
          className={`group flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
            isSelected 
              ? 'text-[#F5A623] font-medium bg-[#F5A623]/10' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => {
            if (isRootNode) {
              handleCategorySelect(null); // Show all transcripts
              toggleCategoryExpansion(node.id);
            } else if (hasChildren) {
              toggleCategoryExpansion(node.id);
            } else {
              handleCategorySelect(node.id);
            }
          }}
        >
          {hasChildren ? (
            node.isExpanded ? (
              <FolderOpen className="h-4 w-4 text-[#F5A623]" />
            ) : (
              <Folder className="h-4 w-4 text-gray-500" />
            )
          ) : (
            <Folder className="h-4 w-4 text-gray-500" />
          )}
          {isRenaming === node.id ? (
             <input
               type="text"
               value={renameValue}
               onChange={(e) => setRenameValue(e.target.value)}
               onBlur={() => {
                 if (renameValue.trim()) {
                   handleRenameFolder(node.id, renameValue.trim());
                 } else {
                   setIsRenaming(null);
                   setRenameValue('');
                 }
               }}
               onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                   if (renameValue.trim()) {
                     handleRenameFolder(node.id, renameValue.trim());
                   }
                 } else if (e.key === 'Escape') {
                   setIsRenaming(null);
                   setRenameValue('');
                 }
               }}
               className="text-sm flex-1 bg-white border border-[#F5A623] rounded px-1 focus:outline-none"
               autoFocus
             />
           ) : (
             <span className="text-sm flex-1">{node.name}</span>
           )}
           <div className="relative">
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 setActiveSubmenu(activeSubmenu === node.id ? null : node.id);
               }}
               className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
               title="More options"
             >
               <MoreHorizontal className="h-3 w-3 text-gray-500" />
             </button>
             {activeSubmenu === node.id && (
               <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-[120px]">
                 <button
                   onClick={() => handleSubmenuAction('add', node.id)}
                   className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-2"
                 >
                   <Plus className="h-3 w-3" />
                   Add
                 </button>
                 <button
                   onClick={() => handleSubmenuAction('rename', node.id)}
                   className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-2"
                 >
                   <Edit3 className="h-3 w-3" />
                   Rename
                 </button>
                 {node.id !== 'all-transcripts' && (
                   <button
                     onClick={() => handleSubmenuAction('delete', node.id)}
                     className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
                   >
                     <Trash2 className="h-3 w-3" />
                     Delete
                   </button>
                 )}
               </div>
             )}
           </div>
        </div>
        {hasChildren && node.isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFolderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const currentData = activeTab === 'my-history' ? myHistoryData : sharedWithMeData;
  
  // Filter data by selected category
  const filteredData = selectedCategory && selectedCategory !== 'all-transcripts'
    ? currentData.filter(item => item.category === selectedCategory)
    : currentData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (id: string) => {
    console.log('Edit transcript:', id);
  };

  const handleReview = (id: string) => {
    console.log('Review transcript:', id);
  };

  const handleImportPopupClose = () => {
    setShowImportPopup(false);
  };

  const handleImportSave = (data: any) => {
    console.log('Import save:', data);
    setShowImportPopup(false);
  };

  const handleImportThirdPartPopupClose = () => {
    setShowImportThirdPartPopup(false);
  };

  const handleThirdPartImport = (data: any) => {
    console.log('Third part import:', data);
    setShowImportThirdPartPopup(false);
  };

  const handleFilterClick = () => {
    setShowMobileFiltersPopup(true);
  };

  const handleMobileFiltersClose = () => {
    setShowMobileFiltersPopup(false);
  };

  const handleMobileFiltersApply = (filters: any) => {
    console.log('Apply filters:', filters);
    setShowMobileFiltersPopup(false);
  };

  const handleMobileFiltersClear = () => {
    console.log('Clear filters');
  };

  const handleMobileFiltersSave = (filters: any) => {
    console.log('Save filters:', filters);
  };

  // Handle Sam input
  const handleSamSubmit = async () => {
    if (!samQuestion.trim() || isProcessing) return;
    
    setIsProcessing(true);
    const question = samQuestion.trim();
    setSamQuestion('');
    
    // Simulate API call to get answer
    setTimeout(() => {
      const mockAnswer = `Based on your question "${question}", here's what I found:\n\nThis is a sample response from Sam. In a real implementation, this would be connected to an AI service that analyzes your transcripts and provides intelligent answers based on the content.\n\nThe system would search through your transcript history, identify relevant information, and provide contextual responses to help you find the information you need.`;
      
      setCurrentQA({ question, answer: mockAnswer });
      setShowQAPopup(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    // Placeholder for voice input functionality
    console.log('Voice input clicked');
    // In a real implementation, this would start voice recognition
  };

  const handleSaveToHistory = (question: string, answer: string) => {
    console.log('Saving to history:', { question, answer });
    // In a real implementation, this would save the Q&A to the transcript history
  };

  const handleSaveNote = (question: string, answer: string, note: string) => {
    console.log('Saving note:', { question, answer, note });
    // In a real implementation, this would save the Q&A with notes
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="flex items-center text-2xl font-bold text-gray-900">
              <span className="mr-4">
                SAM Drive
              </span>
              <button className="text-gray-400 hover:text-[#F5A623]">
                <RefreshCw className="w-5 h-5" />
              </button>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Import Dropdown */}
            <div className="relative import-dropdown">
              <button
                onClick={() => setShowImportDropdown(!showImportDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Import size={16} />
                <span className="text-sm font-medium">Import</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showImportDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setShowImportPopup(true);
                      setShowImportDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                  >
                    <Upload className="w-4 h-4" />
                    Import File
                  </button>
                  <button
                    onClick={() => {
                      setShowImportThirdPartPopup(true);
                      setShowImportDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg"
                  >
                    <Upload className="w-4 h-4" />
                    Import from 3rd Party
                  </button>
                </div>
              )}
            </div>
            
            <button className="flex items-center gap-2 px-3 py-2 text-white bg-[#F5A623] rounded-lg hover:bg-[#E67E0C] transition-colors">
              <Plus size={16} />
              <span className="text-sm font-medium">Add Transcript</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex" ref={containerRef}>
        {/* Left Sidebar - Tree View */}
        <div 
          className="bg-white border-r border-gray-200 flex flex-col relative transition-all duration-300"
          style={{ width: isSidebarCollapsed ? '48px' : `${chatAreaWidth}%` }}
        >
          {isSidebarCollapsed ? (
            <div 
              onClick={() => setIsSidebarCollapsed(false)}
              className="h-full bg-gradient-to-b from-[#F5A623]/10 to-[#F5A623]/5 hover:from-[#F5A623]/20 hover:to-[#F5A623]/10 cursor-pointer transition-all duration-300 flex flex-col items-center group py-4"
            >
              <Expand size={20} className="text-[#F5A623] group-hover:text-[#E67E0C] transition-colors mb-4" />
              <div className="transform -rotate-90 text-sm font-medium text-[#F5A623] whitespace-nowrap group-hover:text-[#E67E0C] flex-1 flex items-center justify-center">
                Grouping
              </div>
            </div>
          ) : (
            <>
              {/* Sidebar Toggle Button */}
              <div className="flex items-center justify-between p-3">
                <span className="text-sm font-medium text-gray-700"></span>
                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  title="Collapse sidebar"
                >
                  <Minimize2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {categoryTree.map((node) => renderFolderNode(node))}
                </div>
              </div>
            </>
          )}
            
        </div>

        {/* Drag Bar - positioned between panels */}
          {!isSidebarCollapsed && (
            <div
              className={`w-0.5 h-full cursor-col-resize z-20 ${
                isDragging ? 'bg-[#F5A623]' : 'bg-gray-100 hover:bg-[#F5A623]'
              } transition-colors flex-shrink-0`}
              onMouseDown={handleDragStart}
            />
          )}

        {/* Right Content Area */}
          <div className="flex-1 flex flex-col px-6 py-6 overflow-hidden">
          {/* View Mode Switcher and Search */}
          <div className="flex items-center justify-between mb-6 mt-6">
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('my-history')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'my-history'
                      ? 'bg-white text-[#F5A623] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <File size={16} />
                  <span className="text-sm font-medium">Transcript History</span>
                </button>
                <button
                  onClick={() => setActiveTab('shared')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'shared'
                      ? 'bg-white text-[#F5A623] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Share2 size={16} />
                  <span className="text-sm font-medium"> Shared with Me</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 items-center">
              {/* AI Q&A Button */}
              <button
                onClick={() => setShowAIInputPopup(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-[#F5A623] rounded-lg hover:bg-gray-100 transition-colors"
                title="Ask SAM"
              >
                <div className="flex items-center justify-center">
                  <Bot size={22} />
                  <span className="ml-2">Ask SAM</span>
                </div>
              </button>
              
              {/* Search Box */}
              <div className="min-w-[12rem] max-w-[16rem]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search transcripts..."
                    className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>
              </div>
            
              {/* Search Button */}
              <button className="px-4 py-1.5 text-sm font-medium bg-white text-[#F5A623] border border-[#F5A623] rounded-lg hover:bg-[#F5A623] hover:text-white transition-colors">
                Search
              </button>
            
              {/* Filter Button */}
              <div className="relative">
                <button 
                  onClick={handleFilterClick}
                  className="flex items-center gap-2 px-3 py-1.5 text-[#F5A623] rounded-lg border border-[#F5A623] hover:bg-[#F5A623] hover:text-white transition-colors"
                >
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filter</span>
                </button>
                
                <MobileFiltersPopup
                  isOpen={showMobileFiltersPopup}
                  onClose={handleMobileFiltersClose}
                  onApply={handleMobileFiltersApply}
                  onClear={handleMobileFiltersClear}
                  onSave={handleMobileFiltersSave}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col mb-12" style={{height: 'calc(100vh - 240px)'}}>
            <div className="overflow-x-auto flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Date Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Transcript Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.dateUploaded).toLocaleDateString()} {new Date(item.dateUploaded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span>{item.transcript}</span>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-[#F5A623] hover:text-[#E67E0C] transition-colors"
                            title="Edit transcript"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleReview(item.id)}
                          className="px-3 py-1 bg-white text-[#F5A623] border border-[#F5A623] rounded-md hover:bg-[#F5A623] hover:text-white hover:shadow-md transform hover:scale-105 transition-all duration-200 text-sm"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded transition-colors ${
                          currentPage === pageNum
                            ? 'text-[#F5A623] font-bold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                  >
                    &gt;
                  </button>
                </div>
                
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border-0 bg-transparent text-sm text-gray-700 focus:outline-none appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem',
                    paddingRight: '2rem'
                  }}
                >
                  <option value={10}>10 / Page</option>
                  <option value={20}>20 / Page</option>
                  <option value={50}>50 / Page</option>
                  <option value={100}>100 / Page</option>
                </select>
              </div>

              <div className="text-sm text-gray-700">
                <span className="font-bold">Total : {filteredData.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Import Popups */}
      <ImportPopup
        isVisible={showImportPopup}
        onClose={handleImportPopupClose}
        onSave={handleImportSave}
      />
      
      <ImportThirdPartPopup
        isVisible={showImportThirdPartPopup}
        onClose={handleImportThirdPartPopupClose}
        onImport={handleThirdPartImport}
      />

      {/* Q&A Popup */}
      <QAPopup
        isVisible={showQAPopup}
        onClose={() => setShowQAPopup(false)}
        question={currentQA.question}
        answer={currentQA.answer}
        onSaveToHistory={handleSaveToHistory}
        onSaveNote={handleSaveNote}
      />

      {/* AI Q&A Popup */}
      <QAPopup
        isVisible={showAIInputPopup}
        onClose={() => setShowAIInputPopup(false)}
        question=""
        answer=""
        isAIMode={true}
        onAISubmit={(client, deal, question) => {
          setShowAIInputPopup(false);
          setIsProcessing(true);
          
          // Simulate AI processing
          setTimeout(() => {
            const mockAnswer = `Based on your question "${question}" regarding the selected client and deal:\n\nAfter analyzing the relevant transcripts, here's what I found:\n\n• Key insights from recent meetings show strong engagement from the client\n• Previous discussions indicate budget approval is likely\n• Timeline expectations align with our delivery capabilities\n• Risk factors are minimal based on historical data\n\nRecommendation: Proceed with the proposed approach while maintaining regular communication checkpoints.\n\nThis analysis is based on 5 relevant transcript segments from recent client interactions.`;
            
            setCurrentQA({ question, answer: mockAnswer });
            setIsProcessing(false);
            setShowAIResultPopup(true);
          }, 2000);
        }}
      />
      
      {/* AI Result Popup */}
      <QAPopup
        isVisible={showAIResultPopup}
        onClose={() => setShowAIResultPopup(false)}
        question={currentQA.question}
        answer={currentQA.answer}
        isAIMode={false}
        isAIResult={true}
        onSaveToHistory={handleSaveToHistory}
        onSaveNote={handleSaveNote}
      />
      
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[80]">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#F5A623] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium">Almost there… SAM’s doing the heavy lifting.</p>
            <p className="text-sm text-gray-400">This may take a few moments</p>
          </div>
        </div>
      )}

      {/* Add Folder Dialog */}
      {showAddFolderDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Folder</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveNewFolder();
                  } else if (e.key === 'Escape') {
                    handleCancelAddFolder();
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelAddFolder}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewFolder}
                disabled={!newFolderName.trim()}
                className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E67E0C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Folder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptHistory;
