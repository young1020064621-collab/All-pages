import React from 'react';
import { X, Edit, Trash2, Users } from 'lucide-react';

// 示例数据
const sampleTeamData = {
  name: "Team A",
  description: "This is a high-performing development team focused on building innovative web applications.",
  leader: {
    name: "John Smith",
    avatar: undefined // 使用初始字母
  },
  members: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      jobTitle: "Senior Frontend Developer",
      avatar: undefined
    },
    {
      id: "2", 
      name: "Bob Wilson",
      email: "bob.wilson@company.com",
      jobTitle: "Backend Developer",
      avatar: undefined
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.davis@company.com", 
      jobTitle: "UX/UI Designer",
      avatar: undefined
    },
    {
      id: "4",
      name: "David Brown",
      email: "david.brown@company.com",
      jobTitle: "DevOps Engineer",
      avatar: undefined
    },
    {
      id: "5",
      name: "Emma Taylor",
      email: "emma.taylor@company.com",
      jobTitle: "QA Engineer", 
      avatar: undefined
    }
  ]
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  avatar?: string;
}

interface TeamData {
  name: string;
  description: string;
  leader: {
    name: string;
    avatar?: string;
  };
  members: TeamMember[];
}

interface ViewTeamPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onEditMember?: (memberId: string) => void;
  onDeleteMember?: (memberId: string) => void;
}

const ViewTeamPopup: React.FC<ViewTeamPopupProps> = ({
  isVisible,
  onClose,
  onEditMember,
  onDeleteMember
}) => {
  if (!isVisible) return null;

  const teamData = sampleTeamData;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[800px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">{teamData.name}</h3>
            </div>
            <div className="flex items-center gap-4">
              {/* Team Leader */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Team Leader:</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-medium">
                    {teamData.leader.avatar ? (
                      <img
                        src={teamData.leader.avatar}
                        alt={teamData.leader.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      getInitials(teamData.leader.name)
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{teamData.leader.name}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            {/* Team Description */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Team Description</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{teamData.description}</p>
            </div>

            {/* Members Table */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Team Members ({teamData.members.length})</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamData.members.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                              {member.avatar ? (
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                getInitials(member.name)
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-600">{member.email}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-600">{member.jobTitle}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onEditMember?.(member.id)}
                              className="p-1.5 text-gray-400 hover:text-[#605BFF] hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Edit member"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => onDeleteMember?.(member.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Delete member"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTeamPopup;