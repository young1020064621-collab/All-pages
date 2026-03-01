 
import { 
  FileText, 
  Folder, 
  MoreVertical, 
  Share2, 
  Download, 
  Trash2, 
  Edit, 
  Copy,
  Palette,
  ChevronUp,
  ChevronDown,
  Settings,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FileItem, SortBy, SortOrder } from "@/types/fileManager";
import { formatFileSize, formatDate } from "@/lib/fileUtils";

interface FileListProps {
  items: FileItem[];
  selectedItems: Set<string>;
  sortBy: SortBy;
  sortOrder: SortOrder;
  category?: string;
  breadcrumbs?: Array<{ id: string; name: string }>;
  onItemSelect: (id: string, selected: boolean) => void;
  onItemDoubleClick: (item: FileItem) => void;
  onItemDelete: (id: string) => void;
  onItemShare: (id: string) => void;
  onItemRename: (id: string) => void;
  onItemDownload: (id: string) => void;
  onItemCopy: (id: string) => void;
  onFolderColorChange: (id: string, color: FileItem['color']) => void;
  onManageAccess: (id: string) => void;
  onSort: (sortBy: SortBy) => void;
}

export function FileList({
  items,
  selectedItems,
  sortBy,
  sortOrder,
  category,
  breadcrumbs,
  onItemSelect,
  onItemDoubleClick,
  onItemDelete,
  onItemShare,
  onItemRename,
  onItemDownload,
  onItemCopy,
  onFolderColorChange,
  onManageAccess,
  onSort,
}: FileListProps) {
  const folderColors = ['blue', 'green', 'purple', 'orange', 'red', 'yellow'];

  // 根据category获取表头配置
  const getHeaderConfig = () => {
    // Special handling for customers category based on folder depth
    if (category === 'customers' && breadcrumbs && breadcrumbs.length > 1) {
      // If we're in a company folder (first level under customers)
      if (breadcrumbs.length === 2) {
        return [
          { key: 'name', label: 'Deal Name', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
          { key: 'created', label: 'Created Date', sortable: true },
          { key: 'updated', label: 'Updated Date', sortable: true },
          { key: 'updatedBy', label: 'Updated By', sortable: false }
        ];
      }
      // If we're in a deal folder or deeper (second level and beyond)
      else if (breadcrumbs.length >= 3) {
        return [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'modified', label: 'Uploaded Date', sortable: true },
          { key: 'uploadedBy', label: 'Uploaded By', sortable: false }
        ];
      }
    }

    switch (category) {
      case 'transcript-history':
        return [
          { key: 'name', label: 'Transcript Name', sortable: true },
          { key: 'company', label: 'Client', sortable: false },
          { key: 'modified', label: 'Uploaded Date', sortable: true },
          { key: 'uploadedBy', label: 'Uploaded By', sortable: false },
          { key: 'source', label: 'Source', sortable: false }
        ];
      case 'customers':
        return [
          { key: 'name', label: 'Client Name', sortable: true },
          { key: 'created', label: 'Created Date', sortable: true },
          { key: 'updated', label: 'Updated Date', sortable: true },
          { key: 'updatedBy', label: 'Updated By', sortable: false }
        ];
      case 'customer-deals':
        return [
          { key: 'name', label: 'Deal Name', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
          { key: 'created', label: 'Created Date', sortable: true },
          { key: 'updated', label: 'Updated Date', sortable: true },
          { key: 'updatedBy', label: 'Updated By', sortable: false }
        ];
      case 'deal-folders':
        return [
          { key: 'name', label: 'Folder Name', sortable: true },
          { key: 'modified', label: 'Uploaded Date', sortable: true },
          { key: 'uploadedBy', label: 'Uploaded By', sortable: false }
        ];
      case 'deal':
        return [
          { key: 'name', label: 'Deal Name', sortable: true },
          { key: 'created', label: 'Created Date', sortable: true },
          { key: 'updated', label: 'Updated Date', sortable: true },
          { key: 'updatedBy', label: 'Updated By', sortable: false }
        ];
      case 'proposals':
        return [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'dealName', label: 'Deals Name', sortable: true },
          { key: 'modified', label: 'Uploaded Date', sortable: true },
          { key: 'uploadedBy', label: 'Uploaded By', sortable: false }
        ];
      case 'contract':
        return [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'dealName', label: 'Deals Name', sortable: true },
          { key: 'modified', label: 'Uploaded Date', sortable: true },
          { key: 'uploadedBy', label: 'Uploaded By', sortable: false }
        ];
      default:
        return [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'modified', label: 'Modified', sortable: true },
          { key: 'modifiedBy', label: 'Modified By', sortable: false },
          { key: 'size', label: 'Size', sortable: true }
        ];
    }
  };

  const headerConfig = getHeaderConfig();

  // 根据header key获取item对应的值
  const getItemValue = (item: FileItem, key: string): string => {
    switch (key) {
      case 'name':
        return item.name;
      case 'modified':
        return (item.modifiedAt || item.modifiedDate) ? formatDate(item.modifiedAt || item.modifiedDate) : '';
      case 'modifiedBy':
        return item.modifiedBy || 'Unknown';
      case 'size':
        return item.type === 'folder' ? '' : formatFileSize(item.size ?? 0);
      case 'company':
        return item.company || 'Unknown Company';
      case 'uploadedDate':
        return item.uploadedAt ? formatDate(item.uploadedAt) : formatDate(item.modifiedAt);
      case 'uploadedBy':
        return item.uploadedBy || item.modifiedBy || 'Unknown';
      case 'source':
        return item.source || 'Manual';
      case 'created':
        return item.createdAt ? formatDate(item.createdAt) : '';
      case 'updated':
        return (item.updatedAt || item.modifiedAt || item.modifiedDate) ? formatDate(item.updatedAt || item.modifiedAt || item.modifiedDate) : '';
      case 'updatedBy':
        return item.updatedBy || item.modifiedBy || 'Unknown';
      case 'status':
        return item.status || 'Active';
      case 'dealName':
        return item.dealName || 'Unknown Deal';
      default:
        return '';
    }
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    const nextChecked = checked === true;
    items.forEach(item => {
      onItemSelect(item.id, nextChecked);
    });
  };

  const allSelected = items.length > 0 && items.every(item => selectedItems.has(item.id));
  const someSelected = items.some(item => selectedItems.has(item.id));

  const handleItemClick = (item: FileItem, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      onItemSelect(item.id, !selectedItems.has(item.id));
    } else {
      selectedItems.forEach(id => {
        if (id !== item.id) {
          onItemSelect(id, false);
        }
      });
      onItemSelect(item.id, !selectedItems.has(item.id));
    }
  };

  const SortableHeader = ({ column, children }: { column: SortBy; children: React.ReactNode }) => (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => onSort(column)}
        className="h-auto p-0 font-semibold hover:bg-transparent"
      >
        <div className="flex items-center gap-1">
          {children}
          {sortBy === column && (
            sortOrder === 'asc' ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )
          )}
        </div>
      </Button>
    </TableHead>
  );

  return (
    <div className="h-full overflow-y-auto px-6 pb-6">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected ? true : (someSelected && !allSelected) ? 'indeterminate' as const : false}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            {headerConfig.map((header) => (
              header.sortable ? (
                <SortableHeader key={header.key} column={header.key as SortBy}>
                  {header.label}
                </SortableHeader>
              ) : (
                <TableHead key={header.key}>{header.label}</TableHead>
              )
            ))}
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const isSelected = selectedItems.has(item.id);
            
            return (
              <TableRow
                key={item.id}
                className={cn(
                  "group cursor-pointer transition-smooth border-border hover:bg-file-item-hover",
                  isSelected && "bg-file-item-selected"
                )}
                onClick={(e) => handleItemClick(item, e)}
                onDoubleClick={() => onItemDoubleClick(item)}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onItemSelect(item.id, !!checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                
                {headerConfig.map((header) => {
                  if (header.key === 'name') {
                    return (
                      <TableCell key={header.key}>
                        <div className="flex items-center gap-3">
                          {item.type === 'folder' ? (
                            <Folder 
                              className={cn(
                                "w-5 h-5",
                                item.color ? `text-folder-${item.color}` : "text-primary"
                              )} 
                            />
                          ) : (
                            <FileText className="w-5 h-5 text-primary" />
                          )}
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{getItemValue(item, header.key)}</span>
                            {item.isShared && (
                              <Share2 className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </div>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={header.key} className="text-muted-foreground">
                        {getItemValue(item, header.key)}
                      </TableCell>
                    );
                  }
                })}
                
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onItemShare(item.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onItemShare(item.id)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onItemDownload(item.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onItemRename(item.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onItemCopy(item.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy to...
                      </DropdownMenuItem>
                      
                      {item.type === 'folder' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="p-0">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  className="w-full justify-start h-auto p-2"
                                >
                                  <Palette className="h-4 w-4 mr-2" />
                                  Change Color
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="left" align="start" className="w-32">
                                <div className="grid grid-cols-3 gap-2 p-2">
                                  {folderColors.map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => onFolderColorChange(item.id, color)}
                                      className="flex items-center justify-center p-1 rounded hover:bg-secondary transition-colors"
                                    >
                                      <div 
                                        className={cn(
                                          "w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors",
                                          `bg-folder-${color}`
                                        )}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onManageAccess(item.id)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Access
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onItemDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
