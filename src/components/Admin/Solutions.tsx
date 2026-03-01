import React, { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import AddSolutionsPopup from './popup/AddSolutionsPopup';

const SolutionsPage: React.FC = () => {
  const [showAddSolutionsPopup, setShowAddSolutionsPopup] = useState(false);
  
  const solutions = [
    {
      id: 1,
      name: "AI Coaching Platform",
      description: "Personalized AI-driven coaching solutions that adapt to individual learning styles and goals. Our platform uses advanced machine learning algorithms to provide real-time feedback and customized learning paths.",
      keyCompetitors: ["Coursera", "Udemy", "LinkedIn Learning", "MasterClass"]
    },
    {
      id: 2,
      name: "Performance Analytics Suite",
      description: "Advanced analytics and reporting tools to track progress and identify improvement areas. Comprehensive dashboard with real-time metrics and predictive insights for better decision making.",
      keyCompetitors: ["Tableau", "Power BI", "Google Analytics", "Adobe Analytics"]
    },
    {
      id: 3,
      name: "Skill Development Hub",
      description: "Comprehensive skill-building programs with interactive modules and real-time feedback. Features include video tutorials, hands-on exercises, and peer collaboration tools.",
      keyCompetitors: ["Pluralsight", "Skillshare", "Khan Academy", "edX"]
    },
    {
      id: 4,
      name: "Team Collaboration Tools",
      description: "Collaborative tools and shared workspaces to enhance team performance and communication. Includes project management, file sharing, and real-time messaging capabilities.",
      keyCompetitors: ["Slack", "Microsoft Teams", "Asana", "Trello"]
    },
    {
      id: 5,
      name: "Customer Relationship Management",
      description: "Intelligent CRM system that automates customer interactions and provides deep insights into customer behavior. Features include lead scoring, automated follow-ups, and predictive sales analytics.",
      keyCompetitors: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"]
    }
  ];

  const handleAddNewClick = () => {
    setShowAddSolutionsPopup(true);
  };

  const handleAddSolutions = (newSolutions: any[]) => {
    // 这里可以添加处理新解决方案的逻辑
    console.log('New solutions added:', newSolutions);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Solutions</h1>
          <button 
            onClick={handleAddNewClick}
            className="bg-[#605BFF] text-white px-4 py-2 rounded-lg hover:bg-[#5248E6] transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 min-h-full pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {solutions.map((solution) => (
              <div key={solution.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{solution.name}</h3>
                    <div className="flex gap-2">
                      <button className="text-[#FF8E1C] hover:text-[#FF8E1C] p-1">
                        <Edit3 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="px-6 pb-4">
                  <div className="border-t border-dashed border-gray-300 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{solution.description}</p>
                  </div>
                </div>

                {/* Key Competitors Section */}
                <div className="px-6 pb-6">
                  <div className="border-t border-dashed border-gray-300 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Key Competitors</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.keyCompetitors.map((competitor, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {competitor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add Solutions Popup */}
      <AddSolutionsPopup
        isOpen={showAddSolutionsPopup}
        onClose={() => setShowAddSolutionsPopup(false)}
        onAddSolutions={handleAddSolutions}
      />
    </div>
  );
};

export default SolutionsPage;