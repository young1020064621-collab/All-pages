 
import { 
  Search, 
  LayoutGrid, 
  List, 
  Download, 
  Trash2, 
  Share2,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortBy, SortOrder } from "@/types/fileManager";

interface FileManagerHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
  selectedCount: number;
  onDownloadSelected: () => void;
  onDeleteSelected: () => void;
  onShareSelected: () => void;
  onMoveSelected: () => void;
  breadcrumbs: Array<{ id: string; name: string }>;
  onBreadcrumbClick: (id: string) => void;
  category?: string;
}

export function FileManagerHeader({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  sortOrder,
  onSortChange,
  selectedCount,
  onDownloadSelected,
  onDeleteSelected,
  onShareSelected,
  onMoveSelected,
  breadcrumbs,
  onBreadcrumbClick,
  category,
}: FileManagerHeaderProps) {
  
  const handleSortClick = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      onSortChange(newSortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(newSortBy, 'asc');
    }
  };

  const getSortOptions = (category?: string, breadcrumbs?: Array<{ id: string; name: string }>): Array<{ key: SortBy; label: string }> => {
    // Special handling for customers category based on folder depth
    if (category === 'customers' && breadcrumbs && breadcrumbs.length > 1) {
      // If we're in a company folder (first level under customers)
      if (breadcrumbs.length === 2) {
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'status', label: 'Sort by Status' },
          { key: 'created', label: 'Sort by Created Date' },
          { key: 'updated', label: 'Sort by Updated Date' },
        ];
      }
      // If we're in a deal folder or deeper (second level and beyond)
      else if (breadcrumbs.length >= 3) {
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'modified', label: 'Sort by Uploaded Date' },
        ];
      }
    }

    switch (category) {
      case 'transcript-history':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'modified', label: 'Sort by Uploaded' }
        ];
      case 'customers':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'created', label: 'Sort by created date' },
          { key: 'updated', label: 'Sort by updated date' }
        ];
      case 'customer-deals':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'status', label: 'Sort by status' },
          { key: 'created', label: 'Sort by created date' },
          { key: 'updated', label: 'Sort by updated date' }
        ];
      case 'deal-folders':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'modified', label: 'Sort by uploaded date' }
        ];
      case 'deal':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'created', label: 'Sort by created date' },
          { key: 'updated', label: 'Sort by updated date' }
        ];
      case 'proposals':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'dealName', label: 'Sort by deal' },
          { key: 'modified', label: 'Sort by uploaded date' }
        ];
      case 'contract':
        return [
          { key: 'name', label: 'Sort by name' },
          { key: 'dealName', label: 'Sort by deal' },
          { key: 'modified', label: 'Sort by uploaded date' }
        ];
      default:
        return [
          { key: 'name', label: 'Sort by Name' },
          { key: 'modified', label: 'Sort by modified' },
          { key: 'size', label: 'Sort by Size' },
          { key: 'type', label: 'Sort by Type' }
        ];
    }
  };

  const sortOptions = getSortOptions(category, breadcrumbs);

  return (
    <div className="border-b border-border bg-background">
      {/* Breadcrumbs */}
      <div className="px-6 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id || 'root'} className="flex items-center">
              {index > 0 && <span className="text-muted-foreground mx-2">/</span>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBreadcrumbClick(crumb.id)}
                className="h-auto p-1 font-medium text-foreground hover:text-primary"
              >
                {crumb.name}
              </Button>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex space-x-2 items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-secondary/50 border-border focus:bg-background transition-smooth"
            />
          </div>
          {/* Bulk Actions (shown when items are selected) */}
          {selectedCount > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={onMoveSelected} className="text-gray-600 bg-white border border-gray-200 hover:text-gray-600 hover:bg-gray-100">
                <Share2 className="h-4 w-4 mr-2" />
                Move to ({selectedCount})
              </Button>
              <Button variant="outline" size="sm" onClick={onShareSelected} className="text-gray-600 bg-white border border-gray-200 hover:text-gray-600 hover:bg-gray-100">
                <Share2 className="h-4 w-4 mr-2" />
                Share ({selectedCount})
              </Button>
              <Button variant="outline" size="sm" onClick={onDownloadSelected} className="text-gray-600 bg-white border border-gray-200 hover:text-gray-600 hover:bg-gray-100">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={onDeleteSelected} className="text-gray-600 bg-white border border-gray-200 hover:text-gray-600 hover:bg-gray-100">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>

        <div className="flex space-x-2 items-center gap-2">
          {/* Filter */}
          <Button variant="outline" size="sm" className="gap-2 flex items-center border border-[#FF8E1C] text-[#FF8E1C] bg-white hover:text-white Hover:bg-[#FF8E1C]">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          {/* Sort & Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 flex items-center border border-white text-gray-600 bg-white hover:text-gray-600 hover:bg-gray-100">
                {sortOrder === 'asc' ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.key}
                  onClick={() => handleSortClick(option.key)} 
                  className="text-gray-600 bg-white hover:text-gray-600 hover:bg-gray-100"
                >
                  {option.label} {sortBy === option.key && '✓'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg p-1 bg-secondary/50 space-x-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`h-8 w-8 p-0 flex items-center justify-center rounded-full transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm'
                  : 'bg-transparent hover:bg-gray-100'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`h-8 w-8 p-0 flex items-center justify-center rounded-full transition-colors ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm'
                  : 'bg-transparent hover:bg-gray-100'
              }`}
              aria-label="List view"
            >
              <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Action Buttons */}
          {/*<Button onClick={onUploadFile} size="sm" className="gap-2 bg-white text-black border border-black hover:bg-black hover:text-white">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary-hover">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onCreateFolder}>
                <Plus className="h-4 w-4 mr-2" />
                New Folder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUploadFile}>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>*/}
        </div>
      </div>
    </div>
  );
}
