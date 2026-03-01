import React, { useState } from 'react';
import { X, Target, Handshake, TrendingUp, FileText, AlarmClock, User } from 'lucide-react';

interface UserInfo1Props {
  isVisible: boolean;
  onClose: () => void;
  onNext: () => void;
}

const UserInfo1: React.FC<UserInfo1Props> = ({
  isVisible,
  onClose,
  onNext
}) => {
  const [currentRole, setCurrentRole] = useState('');
  const [crmUsing, setCrmUsing] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const roles = [
    'Sales Manager',
    'Sales Representative',
    'Business Development',
    'Account Executive',
    'Sales Director',
    'Other'
  ];

  const crmOptions = [
    'Salesforce',
    'HubSpot',
    'Pipedrive',
    'Zoho CRM',
    'Microsoft Dynamics',
    'Other',
    'None'
  ];

  const goals = [
    { id: 'leads', text: 'Find more qualified leads', icon: Target },
    { id: 'meetings', text: 'Be more prepared for client meetings in less time', icon: Handshake },
    { id: 'deals', text: 'Close deals faster', icon: TrendingUp },
    { id: 'notes', text: 'Take notes more effectively', icon: FileText },
    { id: 'crm', text: 'Spend less time updating CRM', icon: AlarmClock }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[550px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">Complete Signup</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Current Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your current role?
              </label>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem 1rem'
                  }}
              >
                <option value="">Select your role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* CRM Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What CRM are you using?
              </label>
              <select
                value={crmUsing}
                onChange={(e) => setCrmUsing(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem 1rem'
                  }}
              >
                <option value="">Select your CRM</option>
                {crmOptions.map(crm => (
                  <option key={crm} value={crm}>{crm}</option>
                ))}
              </select>
            </div>

            {/* Goals Multi-select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What you want to achieve?
              </label>
              <div className="space-y-2">
                {goals.map(goal => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#605BFF] bg-opacity-10 border-[#605BFF] text-[#605BFF]'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} className={`mr-3 ${isSelected ? 'text-[#605BFF]' : 'text-gray-500'}`} />
                      <span className="text-sm font-medium">{goal.text}</span>
                      {isSelected && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-[#605BFF] flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button
            onClick={onNext}
            className="w-full px-4 py-2.5 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded-lg transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo1;