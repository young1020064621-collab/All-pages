import React, { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Link,
  RemoveFormatting 
} from 'lucide-react';
import SharePopupBase from './SharePopupBase';
import MultiSelectComboBox from './MultiSelectComboBox';
import SelectComboBox from './SelectComboBox';
import SingleSelectComboBox from './SingleSelectComboBox';

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (data: {
    shareWith: Array<{id: string; name: string; email?: string}>;
    callStatus: {id: string; label: string};
    notes: string;
  }) => void;
}

const SharePopup: React.FC<SharePopupProps> = ({
  isOpen,
  onClose,
  onShare,
}) => {
  const [isClientMode, setIsClientMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Array<{id: string; name: string; email?: string}>>([]);
  const [selectedCallStatus, setSelectedCallStatus] = useState<{id: string; label: string} | undefined>();
  const [notes, setNotes] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedClient, setSelectedClient] = useState('');
  // Mock data - replace with actual data source
  const internalUsers = [
    { id: '1', name: 'John Smith', email: 'john.smith@company.com' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
    { id: '3', name: 'Mike Wilson', email: 'mike.wilson@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' },
  ];

  const externalUsers = [
    { id: 'c1', name: 'ABC Corp', email: 'contact@abccorp.com' },
    { id: 'c2', name: 'XYZ Industries', email: 'info@xyzindustries.com' },
    { id: 'c3', name: 'Global Solutions', email: 'support@globalsolutions.com' },
  ];

  const callStatuses = [
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'rescheduled', label: 'Rescheduled' },
  ];

  const formatText = (command: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);
    
    let newText = notes;
    let newEnd = end;

    switch (command) {
      case 'bold':
        newText = notes.substring(0, start) + `**${selectedText}**` + notes.substring(end);
        newEnd = end + 4;
        break;
      case 'italic':
        newText = notes.substring(0, start) + `*${selectedText}*` + notes.substring(end);
        newEnd = end + 2;
        break;
      case 'underline':
        newText = notes.substring(0, start) + `<u>${selectedText}</u>` + notes.substring(end);
        newEnd = end + 7;
        break;
      case 'alignLeft':
        newText = notes.substring(0, start) + `<div style="text-align: left;">${selectedText}</div>` + notes.substring(end);
        newEnd = end + 48;
        break;
      case 'alignCenter':
        newText = notes.substring(0, start) + `<div style="text-align: center;">${selectedText}</div>` + notes.substring(end);
        newEnd = end + 50;
        break;
      case 'alignRight':
        newText = notes.substring(0, start) + `<div style="text-align: right;">${selectedText}</div>` + notes.substring(end);
        newEnd = end + 49;
        break;
      case 'bulletList':
        const bulletLines = selectedText.split('\n').map(line => line.trim() ? `• ${line}` : line).join('\n');
        newText = notes.substring(0, start) + bulletLines + notes.substring(end);
        newEnd = start + bulletLines.length;
        break;
      case 'numberList':
        const numberLines = selectedText.split('\n').map((line, index) => 
          line.trim() ? `${index + 1}. ${line}` : line
        ).join('\n');
        newText = notes.substring(0, start) + numberLines + notes.substring(end);
        newEnd = start + numberLines.length;
        break;
      case 'removeFormatting':
        const cleanText = selectedText
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/<u>(.*?)<\/u>/g, '$1')
          .replace(/<div[^>]*>(.*?)<\/div>/g, '$1')
          .replace(/^[•\d+\.]\s/gm, '');
        newText = notes.substring(0, start) + cleanText + notes.substring(end);
        newEnd = start + cleanText.length;
        break;
    }

    setNotes(newText);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, newEnd);
      }
    }, 0);
  };

  const handleShare = () => {
    if (selectedUsers.length === 0 || !selectedCallStatus) {
      return; // Could add validation feedback here
    }

    onShare({
      shareWith: selectedUsers,
      callStatus: selectedCallStatus,
      notes: notes,
    });

    // Reset form
    setSelectedUsers([]);
    setSelectedCallStatus(undefined);
    setNotes('');
    setIsClientMode(false);
    onClose();
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setSelectedCallStatus(undefined);
    setNotes('');
    setIsClientMode(false);
    onClose();
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { icon: AlignLeft, command: 'alignLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'alignCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'alignRight', title: 'Align Right' },
    { icon: List, command: 'bulletList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'numberList', title: 'Numbered List' },
    { icon: Link, command: 'insertLink', title: 'Insert Link' },
    { icon: RemoveFormatting, command: 'removeFormatting', title: 'Remove Formatting' },
  ];

  const footer = (
    <div className="flex justify-end space-x-3">
      <button
        onClick={handleClose}
        className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Close
      </button>
      <button
        onClick={handleShare}
        disabled={selectedUsers.length === 0 || !selectedCallStatus}
        className="px-4 py-2.5 text-sm font-medium bg-white border border-[#605BFF] text-[#605BFF] rounded-lg transition-all duration-200 hover:bg-[#605BFF] hover:text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#605BFF] disabled:hover:scale-100"
      >
        Share
      </button>
    </div>
  );

  return (
    <SharePopupBase
      isOpen={isOpen}
      onClose={handleClose}
      title="Share Calls"
      footer={footer}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Share With Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Share With</label>
            {/*<div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="clientMode"
                checked={isClientMode}
                onChange={(e) => {
                  setIsClientMode(e.target.checked);
                  setSelectedUsers([]); // Clear selections when switching modes
                }}
                className="w-4 h-4 text-[#605BFF] bg-gray-100 border-gray-300 rounded focus:ring-[#605BFF] focus:ring-2"
              />
              <label htmlFor="clientMode" className="text-sm text-gray-700 cursor-pointer">
                Client
              </label>
            </div>*/}
          </div>
          
          <div className="w-full flex space-x-4">
            <div className="flex-1">
              <MultiSelectComboBox
                options={isClientMode ? externalUsers : internalUsers}
                selectedOptions={selectedUsers}
                onSelectionChange={setSelectedUsers}
                placeholder="Select users to share with..."
              />
            </div>
            <div className="flex-1">
              <SingleSelectComboBox
                label=""
                options={externalUsers}
                value={selectedClient}
                onChange={setSelectedClient}
              />
            </div>
          </div>
        </div>

        {/* Call Status Section */}
        <SelectComboBox
          label="Call Status"
          options={callStatuses}
          selectedOption={selectedCallStatus}
          onSelectionChange={setSelectedCallStatus}
          placeholder="Select call status..."
        />

        {/* Notes Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
            {toolbarButtons.map(({ icon: Icon, command, title }) => (
              <button
                key={command}
                onClick={() => formatText(command)}
                title={title}
                className="p-2 rounded hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-gray-600" />
              </button>
            ))}
          </div>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes for the shared calls..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
          />
        </div>
      </div>
    </SharePopupBase>
  );
};

export default SharePopup;