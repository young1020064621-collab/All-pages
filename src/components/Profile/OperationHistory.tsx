import React from 'react';
import { 
  CheckSquare, 
  Users, 
  Settings, 
  Calendar, 
  Database, 
  FileText, 
  Video, 
  Clock 
} from 'lucide-react';

interface HistoryItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  date: string;
  icon: React.ComponentType<any>;
  category: 'task' | 'meeting' | 'system' | 'integration';
}

const OperationHistory: React.FC = () => {
  const historyData: HistoryItem[] = [
    {
      id: '1',
      action: 'Created Task',
      description: 'Created new task "Redesign user dashboard" assigned to Development team',
      timestamp: '2:45 PM',
      date: 'Jan 15, 2025',
      icon: CheckSquare,
      category: 'task'
    },
    {
      id: '2',
      action: 'Scheduled Meeting',
      description: 'Prepared quarterly review meeting with stakeholders for next week',
      timestamp: '11:30 AM',
      date: 'Jan 15, 2025',
      icon: Calendar,
      category: 'meeting'
    },
    {
      id: '3',
      action: 'Updated Profile',
      description: 'Changed job title from "Product Manager" to "Senior Product Manager"',
      timestamp: '9:15 AM',
      date: 'Jan 15, 2025',
      icon: Settings,
      category: 'system'
    },
    {
      id: '4',
      action: 'CRM Integration',
      description: 'Successfully integrated Salesforce CRM with project management system',
      timestamp: '4:20 PM',
      date: 'Jan 14, 2025',
      icon: Database,
      category: 'integration'
    },
    {
      id: '5',
      action: 'Team Meeting',
      description: 'Conducted sprint planning meeting with 12 team members',
      timestamp: '2:00 PM',
      date: 'Jan 14, 2025',
      icon: Users,
      category: 'meeting'
    },
    {
      id: '6',
      action: 'Document Created',
      description: 'Created project requirements document for Q1 roadmap',
      timestamp: '10:45 AM',
      date: 'Jan 14, 2025',
      icon: FileText,
      category: 'task'
    },
    {
      id: '7',
      action: 'Calendar Integration',
      description: 'Connected Google Calendar with team scheduling system',
      timestamp: '3:30 PM',
      date: 'Jan 13, 2025',
      icon: Calendar,
      category: 'integration'
    },
    {
      id: '8',
      action: 'Video Conference',
      description: 'Hosted client presentation for new product features demo',
      timestamp: '1:15 PM',
      date: 'Jan 13, 2025',
      icon: Video,
      category: 'meeting'
    },
    {
      id: '9',
      action: 'Task Completed',
      description: 'Completed user research analysis and shared findings with team',
      timestamp: '5:45 PM',
      date: 'Jan 12, 2025',
      icon: CheckSquare,
      category: 'task'
    },
    {
      id: '10',
      action: 'System Update',
      description: 'Updated notification preferences and email settings',
      timestamp: '9:00 AM',
      date: 'Jan 12, 2025',
      icon: Settings,
      category: 'system'
    },
    {
      id: '11',
      action: 'Team Standup',
      description: 'Facilitated daily standup meeting with development team',
      timestamp: '9:30 AM',
      date: 'Jan 11, 2025',
      icon: Users,
      category: 'meeting'
    },
    {
      id: '12',
      action: 'Project Planning',
      description: 'Created milestone timeline for Q1 product launch',
      timestamp: '2:15 PM',
      date: 'Jan 10, 2025',
      icon: Clock,
      category: 'task'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'task':
        return 'bg-white text-gray-700';
      case 'meeting':
        return 'bg-white text-gray-700';
      case 'system':
        return 'bg-white text-gray-700';
      case 'integration':
        return 'bg-white text-gray-700';
      default:
        return 'bg-white text-gray-700';
    }
  };

  const getIconBgColor = (category: string) => {
    switch (category) {
      case 'task':
        return 'bg-white text-gray-600';
      case 'meeting':
        return 'bg-white text-gray-600';
      case 'system':
        return 'bg-pwhite text-gray-600';
      case 'integration':
        return 'bg-white text-gray-600';
      default:
        return 'bg-white text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">My History</h3>
        <p className="text-sm text-gray-600 mt-1">Track all your recent activities and changes</p>
      </div>
      
      <div className="p-6 space-y-4 max-h-[510px] overflow-y-auto">
          {historyData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="relative">
                {/* Timeline line */}
                {index !== historyData.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getIconBgColor(item.category)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{item.action}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OperationHistory;