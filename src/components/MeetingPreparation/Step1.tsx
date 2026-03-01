import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Edit2, Building2, Briefcase, Video, Phone, MoreVertical, FileText, Settings } from 'lucide-react';
import { MeetingData, Attendee } from './MeetingPreparation';
import SelectContact from './popup/SelectContact';
import CreateCompany from './popup/CreateCompany';
import CreateDeal from './popup/CreateDeal';
import CreateAttendee from './popup/CreateAttendee';

interface Step1Props {
  data: MeetingData;
  updateData: (data: Partial<MeetingData>) => void;
}

const Step1: React.FC<Step1Props> = ({ data, updateData }) => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const [showCreateAttendee, setShowCreateAttendee] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [editingAttendee, setEditingAttendee] = useState<{index: number, name: string, company: string, title: string} | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Format date to display as "08 Aug 2025"
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const locationOptions = [
    'Zoom', 'Teams', 'Google Meet', 'Skype', 'Webex', 'Chime', 'Other'
  ];

  const [clientCompanyOptions, setClientCompanyOptions] = useState([
    'Tech Solutions Inc',
    'Client Corp',
    'Partner LLC',
    'Innovation Labs',
    'Digital Dynamics',
    'Future Systems',
    'Global Enterprises'
  ]);

  const [dealOptions, setDealOptions] = useState([
    'Q1 Software License Deal',
    'Enterprise Integration Project',
    'Cloud Migration Services',
    'Digital Transformation Initiative',
    'AI Implementation Project',
    'Security Audit Contract',
    'Custom Development Agreement'
  ]);

  const handleInputChange = (field: keyof MeetingData, value: any) => {
    updateData({ [field]: value });
  };

  const handleCreateCompany = (companyName: string) => {
    setClientCompanyOptions(prev => [...prev, companyName]);
    handleInputChange('clientCompany', companyName);
  };

  const handleCreateDeal = (dealName: string) => {
    setDealOptions(prev => [...prev, dealName]);
    handleInputChange('deal', dealName);
  };

  const handleCreateAttendee = (attendeeName: string) => {
    const newAttendee: Attendee = {
      name: attendeeName,
      company: data.clientCompany || 'Unknown Company'
    };
    const newAttendees = [...data.attendees, newAttendee];
    handleInputChange('attendees', newAttendees);
  };

  const handleEditAttendee = (index: number, newName: string, newCompany: string, newTitle: string) => {
    const newAttendees = [...data.attendees];
    newAttendees[index] = { ...newAttendees[index], name: newName, company: newCompany, title: newTitle };
    handleInputChange('attendees', newAttendees);
    setEditingAttendee(null);
    setActiveDropdown(null);
  };

  const handleRemoveAttendee = (index: number) => {
    const newAttendees = data.attendees.filter((_, i) => i !== index);
    handleInputChange('attendees', newAttendees);
    setActiveDropdown(null);
  };

  return (
    <div className="bg-white rounded-lg p-2">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-3 rounded-2xl border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-8">When</h3>
          {/* Meeting Type */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Type</label>
            </div>
            <div className="flex gap-3">
              {[
                { type: 'Meeting', icon: Video },
                { type: 'Call', icon: Phone }
              ].map(({ type, icon: Icon }) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.meetingType === type
                      ? 'text-[#605BFF]'
                      : 'text-gray-500 hover:text-[#605BFF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="meetingType"
                    value={type}
                    checked={data.meetingType === type}
                    onChange={() => handleInputChange('meetingType', type as 'Meeting' | 'Call')}
                    className="sr-only"
                  />
                  <Icon size={16} />
                  <span className="text-sm font-semibold">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Meeting Subject */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-bold text-gray-700">Meeting Subject</label>
            </div>
            <input
              type="text"
              value={data.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#605BFF] transition-colors duration-200 placeholder-gray-400"
              placeholder="Enter meeting subject"
            />
          </div>

          {/* Date and Time */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-bold text-gray-700">Date & Time</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                <div className="relative">
                  <input
                    id="startDate"
                    type="date"
                    value={data.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    onFocus={(e) => {
                      e.target.showPicker?.();
                    }}
                    className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#605BFF] cursor-pointer opacity-0 absolute inset-0 transition-colors duration-200"
                  />
                  <div className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent cursor-pointer text-gray-900 flex items-center justify-between hover:border-gray-400 transition-colors duration-200">
                    <span>{formatDateDisplay(data.startDate) || 'Select start date'}</span>
                    <Calendar size={18} className="text-[#605BFF]" />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">Start Time</label>
                <div className="relative">
                  <input
                    id="startTime"
                    type="time"
                    value={data.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    onFocus={(e) => {
                      if (!data.allDay) {
                        e.target.showPicker?.();
                      }
                    }}
                    disabled={data.allDay}
                    className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#605BFF] cursor-pointer disabled:cursor-not-allowed opacity-0 absolute inset-0 transition-colors duration-200"
                  />
                  <div className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent cursor-pointer text-gray-900 flex items-center justify-between hover:border-gray-400 transition-colors duration-200">
                    <span>{data.startTime || 'Select start time'}</span>
                    <Clock size={18} className="text-[#605BFF]" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                <div className="relative">
                  <input
                    id="endDate"
                    type="date"
                    value={data.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    onFocus={(e) => {
                      e.target.showPicker?.();
                    }}
                    className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#605BFF] cursor-pointer opacity-0 absolute inset-0 transition-colors duration-200"
                  />
                  <div className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent cursor-pointer text-gray-900 flex items-center justify-between hover:border-gray-400 transition-colors duration-200">
                    <span>{formatDateDisplay(data.endDate) || 'Select end date'}</span>
                    <Calendar size={18} className="text-[#605BFF]" />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">End Time</label>
                <div className="relative">
                  <input
                    id="endTime"
                    type="time"
                    value={data.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    onFocus={(e) => {
                      if (!data.allDay) {
                        e.target.showPicker?.();
                      }
                    }}
                    disabled={data.allDay}
                    className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#605BFF] cursor-pointer disabled:cursor-not-allowed opacity-0 absolute inset-0 transition-colors duration-200"
                  />
                  <div className="w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent cursor-pointer text-gray-900 flex items-center justify-between hover:border-gray-400 transition-colors duration-200">
                    <span>{data.endTime || 'Select end time'}</span>
                    <Clock size={18} className="text-[#605BFF]" />
                  </div>
                </div>
              </div>
            </div>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.allDay}
                onChange={(e) => handleInputChange('allDay', e.target.checked)}
                className="w-5 h-5 text-[#605BFF] focus:ring-[#605BFF] rounded transition-all duration-200"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">All Day</span>
            </label>
          </div>

          {/* Location */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-bold text-gray-700">Location</label>
            </div>
            <select
              value={data.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={`w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:outline-none appearance-none transition-colors duration-200 ${data.location === '' ? 'text-gray-400' : 'text-gray-900'}`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              {data.location === '' && <option value="" disabled hidden style={{color: '#9CA3AF', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>Select location</option>}
                {locationOptions.map((location) => (
                  <option key={location} value={location} style={{color: '#111827', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>{location}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col space-y-4 rounded-2xl border border-gray-100 p-6">
          {/* Client Company and Deal Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Company Card */}
            <div className="bg-white backdrop-blur-sm rounded-2xl p-6 h-[180px] transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-[#605BFF]" />
                  <h3 className="text-lg font-bold text-gray-900">Client Company</h3>
                  {data.clientCompany && (
                    <Edit2 
                      size={18} 
                      className="text-gray-400 hover:text-[#FF8E1C] cursor-pointer transition-all duration-200 hover:scale-110"
                      onClick={() => setShowCreateCompany(true)}
                    />
                  )}
                </div>
                <Plus 
                  size={24} 
                  className="text-gray-400 hover:text-[#605BFF] cursor-pointer transition-all duration-200 hover:scale-110 hover:rotate-90"
                  onClick={() => setShowCreateCompany(true)}
                />
              </div>
              <select
              value={data.clientCompany}
              onChange={(e) => handleInputChange('clientCompany', e.target.value)}
              className={`w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:outline-none appearance-none transition-colors duration-200 ${data.clientCompany === '' ? 'text-gray-400' : 'text-gray-900'}`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              {data.clientCompany === '' && <option value="" disabled hidden style={{color: '#374151', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>Select client company</option>}
                {clientCompanyOptions.map((company) => (
                  <option key={company} value={company} style={{color: '#111827', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>{company}</option>
                ))}
            </select>
            </div>

            {/* Deal Card */}
            <div className="bg-white backdrop-blur-sm rounded-2xl p-6 h-[180px] transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-[#605BFF]" />
                  <h3 className="text-lg font-bold text-gray-900">Deal</h3>
                  {data.deal && (
                    <Edit2 
                      size={18} 
                      className="text-gray-400 hover:text-[#FF8E1C] cursor-pointer transition-all duration-200 hover:scale-110"
                      onClick={() => setShowCreateDeal(true)}
                    />
                  )}
                </div>
                <Plus 
                  size={24} 
                  className="text-gray-400 hover:text-[#605BFF] cursor-pointer transition-all duration-200 hover:scale-110 hover:rotate-90"
                  onClick={() => setShowCreateDeal(true)}
                />
              </div>
              <select
              value={data.deal}
              onChange={(e) => handleInputChange('deal', e.target.value)}
              className={`w-full px-4 py-3 text-sm border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:outline-none appearance-none transition-colors duration-200 ${data.deal === '' ? 'text-gray-400' : 'text-gray-900'}`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              {data.deal === '' && <option value="" disabled hidden style={{color: '#374151', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>Select deal</option>}
                {dealOptions.map((deal) => (
                  <option key={deal} value={deal} style={{color: '#111827', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>{deal}</option>
                ))}
            </select>
            </div>
          </div>

          {/* Meeting Attendees Card */}
          <div className="bg-white backdrop-blur-sm rounded-2xl p-6 flex-1 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-[#605BFF]" />
                <h3 className="text-lg font-bold text-gray-900">Who</h3>
              </div>
              <Plus 
                size={24} 
                className="text-gray-400 hover:text-[#605BFF] cursor-pointer transition-all duration-200 hover:scale-110 hover:rotate-90"
                onClick={() => setShowCreateAttendee(true)}
              />
            </div>
            <div className="flex flex-col h-96">
              <div 
                className="space-y-3 flex-1 bg-gray-50 overflow-y-auto overflow-x-visible cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-200 p-2"
                onClick={() => setShowContactPopup(true)}
              >
                {data.attendees.map((attendee, index) => (
                  <div key={index} className="relative">
                    {editingAttendee?.index === index ? (
                      <div className="flex flex-col gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                        <input
                          type="text"
                          value={editingAttendee.name}
                          onChange={(e) => setEditingAttendee({...editingAttendee, name: e.target.value})}
                          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#605BFF] transition-colors duration-200"
                          placeholder="Name"
                          autoFocus
                        />
                        <input
                          type="text"
                          value={editingAttendee.title}
                          onChange={(e) => setEditingAttendee({...editingAttendee, title: e.target.value})}
                          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#605BFF] transition-colors duration-200"
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={editingAttendee.company}
                          onChange={(e) => setEditingAttendee({...editingAttendee, company: e.target.value})}
                          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#605BFF] transition-colors duration-200"
                          placeholder="Company"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEditAttendee(index, editingAttendee.name, editingAttendee.company, editingAttendee.title);
                            } else if (e.key === 'Escape') {
                              setEditingAttendee(null);
                            }
                          }}
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditAttendee(index, editingAttendee.name, editingAttendee.company, editingAttendee.title)}
                            className="text-green-500 hover:text-green-700 text-sm font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors duration-200"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => setEditingAttendee(null)}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium px-2 py-1 rounded hover:bg-gray-50 transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                         className="flex items-center justify-between bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200"
                         onClick={(e) => e.stopPropagation()}
                       >
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {attendee.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{attendee.name}</div>
                          {attendee.title && (
                            <div className="text-xs text-gray-600">{attendee.title} • {attendee.company}</div>
                          )}
                          {!attendee.title && (
                            <div className="text-xs text-gray-500">{attendee.company}</div>
                          )}
                          </div>
                        </div>
                        <div className="relative" ref={activeDropdown === index ? dropdownRef : null}>
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               setActiveDropdown(activeDropdown === index ? null : index);
                             }}
                             className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                           >
                             <MoreVertical size={16} />
                           </button>
                           {activeDropdown === index && (
                             <div className="fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] min-w-[120px] backdrop-blur-sm" style={{top: '50%', right: '20px', transform: 'translateY(-50%)'}}>
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   setEditingAttendee({index, name: attendee.name, company: attendee.company, title: attendee.title || ''});
                                   setActiveDropdown(null);
                                 }}
                                 className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-t-xl transition-colors duration-200"
                               >
                                 <Edit2 size={14} />
                                 Edit
                               </button>
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleRemoveAttendee(index);
                                 }}
                                 className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-xl transition-colors duration-200"
                               >
                                 ×
                                 Remove
                               </button>
                             </div>
                           )}
                         </div>
                       </div>
                     )}
                   </div>
                 ))}
                 {data.attendees.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 py-16">
                      <Users size={48} className="text-gray-300 mb-4" />
                      <div className="text-sm font-medium">Click here to search and add attendees</div>
                      <div className="text-xs text-gray-400 mt-1">Build your meeting participant list</div>
                    </div>
                  )}
               </div>
               {data.attendees.length > 0 && (
                 <div 
                   className="mt-4 text-center py-2 text-sm text-[#605BFF] hover:text-[#5248FF] cursor-pointer border-t border-gray-200 font-medium transition-colors duration-200"
                   onClick={() => setShowContactPopup(true)}
                 >
                   + Click to add more attendees
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* Select Contact Popup */}
      {showContactPopup && (
        <SelectContact
          onClose={() => setShowContactPopup(false)}
          onSelect={(contacts) => {
            const newAttendees = [...data.attendees, ...contacts];
            handleInputChange('attendees', newAttendees);
            setShowContactPopup(false);
          }}
          selectedCompany={data.clientCompany}
        />
      )}

      {/* Create Company Popup */}
      {showCreateCompany && (
        <CreateCompany
          onClose={() => setShowCreateCompany(false)}
          onSave={handleCreateCompany}
        />
      )}

      {/* Create Deal Popup */}
      {showCreateDeal && (
        <CreateDeal
          onClose={() => setShowCreateDeal(false)}
          onSave={handleCreateDeal}
        />
      )}

      {/* Create Attendee Popup */}
      {showCreateAttendee && (
        <CreateAttendee
          onClose={() => setShowCreateAttendee(false)}
          onSave={handleCreateAttendee}
        />
      )}
    </div>
  );
};

export default Step1;