import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Bold, Italic, Underline, Strikethrough, RotateCcw, ChevronDown, Calendar, Clock, ClipboardPlus } from 'lucide-react';

interface AddTaskPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
}

const AddTaskPopup: React.FC<AddTaskPopupProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    taskSubject: '',
    type: '',
    priority: '',
    queue: '',
    status: '',
    dueDatePreset: '',
    dueTime: '',
    assignedTo: '',
    association: 'None',
    associationContacts: [] as string[],
    notes: ''
  });

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const dueDateOptions = [
    'Today',
    'Tomorrow', 
    'In 1 business days (Thursday)',
    'In 2 business days (Friday)',
    'In 3 business days (Saturday)',
    'In 1 week (August 27)',
    'In 2 weeks (September 03)',
    'In 1 month (September 20)',
    'In 3 month (November 20)',
    'In 6 month (February 20)',
    'Custom Date'
  ];
  
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return time;
  });
  
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    setFormData(prev => ({ ...prev, dueTime: currentTime }));
  }, []);
  
  const contactOptions = [
    'John Doe',
    'Jane Smith', 
    'Mike Johnson',
    'Sarah Wilson',
    'David Brown'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSelect = (contact: string) => {
    if (!selectedContacts.includes(contact)) {
      const newContacts = [...selectedContacts, contact];
      setSelectedContacts(newContacts);
      setFormData(prev => ({ ...prev, associationContacts: newContacts }));
    }
  };

  const removeContact = (contact: string) => {
    const newContacts = selectedContacts.filter(c => c !== contact);
    setSelectedContacts(newContacts);
    setFormData(prev => ({ ...prev, associationContacts: newContacts }));
    // If we removed a contact and were showing all, check if we should collapse
    if (newContacts.length <= 2) {
      setShowAllContacts(false);
    }
  };

  const handleAddContact = (contact: string) => {
    if (contact && !selectedContacts.includes(contact)) {
      const newContacts = [...selectedContacts, contact];
      setSelectedContacts(newContacts);
      setFormData(prev => ({ ...prev, associationContacts: newContacts }));
    }
  };

  const applyTextStyle = useCallback((command: string) => {
    if (!notesRef.current) return;
    
    const textarea = notesRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (selectedText) {
      let styledText = selectedText;
      
      switch (command) {
        case 'bold':
          styledText = `**${selectedText}**`;
          break;
        case 'italic':
          styledText = `*${selectedText}*`;
          break;
        case 'underline':
          styledText = `<u>${selectedText}</u>`;
          break;
        case 'strikethrough':
          styledText = `~~${selectedText}~~`;
          break;
        case 'clear':
          styledText = selectedText.replace(/\*\*|__|~~|<\/?u>/g, '');
          break;
      }
      
      const newValue = textarea.value.substring(0, start) + styledText + textarea.value.substring(end);
      setFormData(prev => ({ ...prev, notes: newValue }));
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + styledText.length);
      }, 0);
    }
  }, []);

  const handleSubmit = () => {
    console.log('Task submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[900px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardPlus size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">Create task</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Task Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Subject
              </label>
              <input
                type="text"
                value={formData.taskSubject}
                onChange={(e) => handleInputChange('taskSubject', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all duration-200"
                placeholder="Enter task subject"
              />
            </div>

            {/* First Row: Type, Priority, Queue, Status, Due Date */}
            <div className="grid grid-cols-12 gap-3">
              {/* Type */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                  >
                    <option value="">To Do</option>
                    <option value="bug">Coaching</option>
                    <option value="feature">Email</option>
                    <option value="task">Call</option>
                    <option value="task">Demo</option>
                    <option value="task">Other</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="relative">
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                  >
                    <option value="">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Queue */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Queue
                </label>
                <div className="relative">
                  <select
                    value={formData.queue}
                    onChange={(e) => handleInputChange('queue', e.target.value)}
                    className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                    disabled 
                  >
                    <option value="">None</option>
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">Review</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                  >
                    <option value="open">Open</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="closed">Canceled</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Due Date */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due date
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <select
                      value={formData.dueDatePreset}
                      onChange={(e) => handleInputChange('dueDatePreset', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                    >
                      <option value="">Today</option>
                      {dueDateOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1">
                    <select
                      value={formData.dueTime}
                      onChange={(e) => handleInputChange('dueTime', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                    >
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <Clock size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row: Assigned to, Association, Add Contact */}
            <div className="grid grid-cols-12 gap-3">
              {/* Assigned to */}
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned to
                </label>
                <div className="relative">
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                  >
                    <option value="">Username</option>
                    {contactOptions.map(contact => (
                      <option key={contact} value={contact}>{contact}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Association */}
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Association
                </label>
                <div className="relative">
                  <select
                    value={formData.association}
                    onChange={(e) => handleInputChange('association', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none bg-white transition-all duration-200"
                  >
                    <option value="None">None</option>
                    <option value="Contact">Contact</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Add Contact */}
              <div className="col-span-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Add Contact
                </label>
                {formData.association === 'Contact' && (
                  <div className="relative">
                    <div className="min-h-[45.5px] border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-[#605BFF] focus-within:border-transparent transition-all duration-200">
                      <div className="flex flex-wrap gap-1 items-center">
                        {/* Show first 2 contacts */}
                        {selectedContacts.slice(0, 2).map(contact => (
                          <span
                            key={contact}
                            className="inline-flex items-center px-2 py-1 bg-[#605BFF] bg-opacity-10 text-[#605BFF] text-xs rounded-full"
                          >
                            {contact}
                            <button
                              onClick={() => removeContact(contact)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        
                        {/* Show "X more" if there are more than 2 contacts */}
                        {selectedContacts.length > 2 && !showAllContacts && (
                          <button
                            onClick={() => setShowAllContacts(true)}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {selectedContacts.length - 2} more
                          </button>
                        )}
                        
                        {/* Show remaining contacts when expanded */}
                        {showAllContacts && selectedContacts.slice(2).map(contact => (
                          <span
                            key={contact}
                            className="inline-flex items-center px-2 py-1 bg-[#605BFF] bg-opacity-10 text-[#605BFF] text-xs rounded-full"
                          >
                            {contact}
                            <button
                              onClick={() => removeContact(contact)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        
                        <div className="relative flex-1 min-w-[120px]">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                handleAddContact(e.target.value);
                                e.target.value = '';
                              }
                            }}
                            className="w-full border-0 bg-transparent focus:outline-none text-sm appearance-none pr-6"
                          >
                            {selectedContacts.length === 0 ? (
                              <option value="">Associate with Contacts</option>
                            ) : (
                              <option value=""></option>
                            )}
                            {contactOptions.filter(contact => !selectedContacts.includes(contact)).map(contact => (
                              <option key={contact} value={contact}>{contact}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#605BFF] focus-within:border-transparent transition-all duration-200">
                <div className="flex items-center px-3 py-2 border-b border-gray-100 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => applyTextStyle('bold')}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors mr-1"
                    title="Bold"
                  >
                    <Bold size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTextStyle('italic')}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors mr-1"
                    title="Italic"
                  >
                    <Italic size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTextStyle('underline')}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors mr-1"
                    title="Underline"
                  >
                    <Underline size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTextStyle('strikethrough')}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors mr-1"
                    title="Strikethrough"
                  >
                    <Strikethrough size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTextStyle('clear')}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title="Remove styling"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
                <textarea
                  ref={notesRef}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-3 resize-none border-0 focus:outline-none min-h-[120px]"
                  placeholder="Enter your notes here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded-lg transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPopup;