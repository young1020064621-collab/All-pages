import React from 'react';
import { Calendar, Clock, MapPin, Users, Building2, Share, FileText, Briefcase, User } from 'lucide-react';
import { MeetingData } from './MeetingPreparation';

interface Step4Props {
  data: MeetingData;
  updateData: (data: Partial<MeetingData>) => void;
}

const Step4: React.FC<Step4Props> = ({ data }) => {

  // 示例数据，如果没有传入数据则使用默认值
  const sampleData = {
    clientCompany: data.clientCompany || 'TechCorp Solutions Pty. Ltd.',
    deal: data.deal || 'Enterprise Software License - $250K',
    subject: data.subject || 'Q1 Implementation Planning & Technical Review',
    startDate: data.startDate || '2024-01-15',
    startTime: data.startTime || '14:00',
    endTime: data.endTime || '15:30',
    discussionPoints: data.discussionPoints && data.discussionPoints.length > 0 ? data.discussionPoints : [
      {
        content: 'Review technical requirements and system architecture',
        stakeholder: 'John Smith',
        jobTitle: 'Chief Technology Officer'
      },
      {
        content: 'Discuss implementation timeline and milestones',
        stakeholder: 'Sarah Johnson',
        jobTitle: 'Senior Project Manager'
      },
      {
        content: 'Budget allocation and resource planning',
        stakeholder: 'Michael Chen',
        jobTitle: 'Chief Financial Officer'
      },
      {
        content: 'Training requirements for end users',
        stakeholder: 'Emily Davis',
        jobTitle: 'HR Director'
      }
    ],
    attendees: data.attendees && data.attendees.length > 0 ? data.attendees : [
      {
        name: 'John Smith',
        jobTitle: 'Chief Technology Officer',
        company: 'TechCorp Solutions'
      },
      {
        name: 'Sarah Johnson',
        jobTitle: 'Senior Project Manager',
        company: 'TechCorp Solutions'
      },
      {
        name: 'Michael Chen',
        jobTitle: 'Chief Financial Officer',
        company: 'TechCorp Solutions'
      },
      {
        name: 'Emily Davis',
        jobTitle: 'HR Director',
        company: 'TechCorp Solutions'
      },
      {
        name: 'David Wilson',
        jobTitle: 'Sales Representative',
        company: 'Our Company'
      }
    ]
  };
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleContactClick = (contact: any) => {
    // 简单显示联系人信息，避免弹窗导致的空白页问题
    const contactName = typeof contact === 'string' ? contact : contact.name || 'Unknown';
    const jobTitle = typeof contact === 'object' ? contact.jobTitle || 'N/A' : 'N/A';
    const company = typeof contact === 'object' ? contact.company || sampleData.clientCompany : sampleData.clientCompany;
    
    alert(`Will Open Edit Popup for:\nName: ${contactName}\nTitle: ${jobTitle}\nCompany: ${company}`);
  };

  return (
    <div className="bg-white p-2 h-[calc(100vh-16rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Meeting Information Card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-white px-6 py-4 pb-2">
            <h2 className="text-lg font-semibold text-gray-900 text-base">Meeting Information</h2>
          </div>
          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <Calendar size={18} className="text-[#605BFF]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 tracking-wide">Date & Time</span>
                  <div className="font-semibold text-gray-600 text-sm">
                    {formatDate(sampleData.startDate)}
                  </div>
                  <div className="font-semibold text-gray-600 text-sm">
                    {formatTime(sampleData.startTime)} - {formatTime(sampleData.endTime)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <FileText size={18} className="text-[#605BFF]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 tracking-wide">Subject</span>
                  <div className="font-semibold text-gray-600 text-sm">{sampleData.subject}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <Building2 size={18} className="text-[#605BFF]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 tracking-wide">Client</span>
                  <div className="font-semibold text-gray-600 text-sm">{sampleData.clientCompany}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <Briefcase size={18} className="text-[#605BFF]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 tracking-wide">Deal</span>
                  <div className="font-semibold text-gray-600 text-sm">{sampleData.deal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agenda Section - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-[480px] flex flex-col">
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 text-base">Agenda</h3>
              </div>
              {/* Table Container with Scroll */}
              <div className="flex-1 overflow-auto">
                {sampleData.discussionPoints && sampleData.discussionPoints.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-white border-b border-gray-100 sticky top-0">
                      <tr>
                        <th className="text-left py-3 px-4 pr-4 text-sm font-medium text-gray-500">Discussion Points</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stakeholder</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Job Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.discussionPoints.map((point, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="text-sm font-semibold text-gray-900">{point.content || point}</div>
                          </td>
                          <td className="py-4 px-6">
                            {point.stakeholder && point.stakeholder !== 'N/A' ? (
                              <button
                                onClick={() => handleContactClick({
                                  name: point.stakeholder,
                                  jobTitle: point.jobTitle,
                                  company: sampleData.clientCompany
                                })}
                                className="text-sm text-left text-gray-600 font-medium hover:text-[#605BFF] transition-colors cursor-pointer bg-transparent border-none p-0 m-0"
                              >
                                {point.stakeholder}
                              </button>
                            ) : (
                              <span className="text-gray-600 font-medium">N/A</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-600">{point.jobTitle || 'N/A'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm italic">No discussion points added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attendees Section - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-[480px] flex flex-col">
              <div className="px-6 py-4 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 text-base">Attendees</h3>
                  <div className="bg-purple-100 px-3 py-1 rounded-full">
                    <span className="text-xs text-[#605BFF]">{sampleData.attendees?.length || 0} people</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto px-6 pb-6 pt-2">
                {sampleData.attendees && sampleData.attendees.length > 0 ? (
                  <div className="space-y-2">
                    {sampleData.attendees.map((attendee, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
                      >
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-base">
                            {(typeof attendee === 'string' ? attendee : attendee.name || 'N')?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <a
                            onClick={() => handleContactClick(attendee)}
                            className="w-full text-left"
                          >
                            <h4 className="font-semibold text-gray-900 truncate hover:text-[#605BFF] transition-colors cursor-pointer">
                              {typeof attendee === 'string' ? attendee : attendee.name || 'N/A'}
                            </h4>
                          </a>
                          <p className="text-sm text-gray-600 truncate">
                            {typeof attendee === 'object' ? attendee.jobTitle || 'N/A' : 'N/A'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {typeof attendee === 'object' ? attendee.company || sampleData.clientCompany || 'N/A' : sampleData.clientCompany || 'N/A'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm italic">No attendees added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Step4;