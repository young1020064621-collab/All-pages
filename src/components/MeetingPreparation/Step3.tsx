import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Building2, ChevronLeft, ChevronRight, Plus, Sparkles, HelpCircle, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Maximize2, Minimize2, Mic, Album, Search, ChevronDown, History, MoreVertical, Edit3, Trash2, FilePlus2, MessageCircleQuestion, FileText, CheckCircle, Info, ArrowUpDown, List, ArrowLeft } from 'lucide-react';
import { MeetingData } from './MeetingPreparation';
import AddDiscussionPoints from './popup/AddDiscussionPoints';
import PastDiscussionPoints from './popup/PastDiscussionPoints';
import MeetingIntelligenceHistory from './popup/MeetingIntelligenceHistory';

interface Step3Props {
  data: MeetingData;
  updateData: (data: Partial<MeetingData>) => void;
  discussionPoints?: Array<{content: string, objective: string, keyResults: string, stakeholder: string, qualificationQuestions?: string[]}>;
}

const Step3: React.FC<Step3Props> = ({ data, updateData, discussionPoints = [] }) => {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [showAddDiscussionPopup, setShowAddDiscussionPopup] = useState(false);
  const [showPastDiscussionPopup, setShowPastDiscussionPopup] = useState(false);
  const [showMeetingHistoryPopup, setShowMeetingHistoryPopup] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // AI Generation inputs
  const [aiInputs, setAiInputs] = useState({
    attendeeJobTitle: '',
    clientIndustry: '',
    clientCompanySize: '',
    clientKeyCompetitors: '',
    clientProducts: '',
    ourSolutions: '',
    meetingDescription: ''
  });

  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [selectedMethodology, setSelectedMethodology] = useState('IMPACT');
  const [showMethodologyDropdown, setShowMethodologyDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Question Bank');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMainItems, setExpandedMainItems] = useState<Set<string>>(new Set());
  const [selectedDiscussionIndex, setSelectedDiscussionIndex] = useState<number | null>(0);
  const [expandedCustomerQuestions, setExpandedCustomerQuestions] = useState<Set<number>>(new Set());
  const [expandedObjections, setExpandedObjections] = useState<Set<number>>(new Set());
  
  const [solutionOptions] = useState([
    'CRM Solutions',
    'Marketing Automation',
    'Sales Analytics',
    'Customer Support Platform',
    'Integration Services',
    'Custom Development'
  ]);
  const methodologyOptions = ['Challenger', 'Customer Centric Selling', 'Holden', 'IMPACT', 'MEDDIC', 'Sandler', 'Solution Selling', 'Spin', 'TAS', 'Value Prompter'];
  const tabs = ['My Qualification Questions', 'Question Bank', 'Customer Questions', 'Customer Objections'];

  // IMPACT methodology main items and questions
  const impactMainItems = {
    'Identify NEEDS, Influencers, Issues and Implications': [
      'What are your current pain points with your existing solution?',
      'Who are the key influencers in this decision?',
      'What issues are you trying to solve?',
      'What are the implications of not solving this problem?',
      'What needs are not being met by your current approach?'
    ],
    'Money, Metrics': [
      'What is your budget range for this solution?',
      'How do you currently measure success in this area?',
      'What ROI are you expecting from this investment?',
      'What metrics will you use to evaluate success?',
      'How do you justify technology investments?'
    ],
    'Processes and Parameters for Decision': [
      'What is your decision-making process?',
      'What criteria will you use to evaluate solutions?',
      'What are your must-have requirements?',
      'What parameters are non-negotiable?',
      'How do you typically evaluate vendors?'
    ],
    'Access to Approvers, Champions, Coach and Decision Makers': [
      'Who has the final decision-making authority?',
      'Who are your internal champions for this project?',
      'Can you introduce me to the key stakeholders?',
      'Who else should be involved in these discussions?',
      'What is the approval process for this type of investment?'
    ],
    'Competition, Clarification and Closing': [
      'What other solutions are you considering?',
      'How does this compare to your current solution?',
      'What would make you choose one vendor over another?',
      'When do you need to make a final decision?',
      'What questions do you still have about our solution?'
    ],
    'Timing and Time Frame': [
      'What is your ideal implementation timeline?',
      'When do you need this solution to be operational?',
      'Are there any seasonal considerations?',
      'What could delay this project?',
      'How does this fit into your overall roadmap?'
    ]
  };

  const [aiGeneratedPoints, setAiGeneratedPoints] = useState<string[]>([]);
  const [showGeneratedPoints, setShowGeneratedPoints] = useState(false);
  const [discussionTable, setDiscussionTable] = useState<Array<{
    content: string;
    objective: string;
    keyResults: string;
    stakeholder: string;
    qualificationQuestions?: string[];
  }>>([{
    content: "Discuss Q4 sales strategy and market expansion opportunities",
    objective: "Align on strategic direction for next quarter",
    keyResults: "Key Results",
    stakeholder: "John Smith\nSales Director",
    qualificationQuestions: []
  }, {
    content: "Review current product roadmap and feature prioritization",
    objective: "Ensure product development aligns with market demands",
    keyResults: "Roadmap updated, Feature priorities defined, Resource allocation confirmed",
    stakeholder: "Sarah Johnson\nProduct Manager",
    qualificationQuestions: ["What features are most requested by customers?", "How do you prioritize development resources?"]
  }]);

  // 确保至少有一个面板是展开的
  const handleLeftPanelToggle = () => {
    if (!leftPanelCollapsed && rightPanelCollapsed) {
      setRightPanelCollapsed(false);
    }
    setLeftPanelCollapsed(!leftPanelCollapsed);
  };

  const handleRightPanelToggle = () => {
    if (!rightPanelCollapsed && leftPanelCollapsed) {
      setLeftPanelCollapsed(false);
    }
    setRightPanelCollapsed(!rightPanelCollapsed);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (showSolutionsDropdown && !(event.target as Element).closest('.solutions-dropdown')) {
        setShowSolutionsDropdown(false);
      }
      if (showMethodologyDropdown && !(event.target as Element).closest('.methodology-dropdown')) {
        setShowMethodologyDropdown(false);
      }
    };

    if (activeDropdown !== null || showSolutionsDropdown || showMethodologyDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown, showSolutionsDropdown, showMethodologyDropdown]);

  const handleAddDiscussionPoint = (content: string, objective: string = '', stakeholder: string = '', keyResults: string = '') => {
    const newItem = { content, objective, keyResults: keyResults || 'Key Results', stakeholder, qualificationQuestions: [] };
    setDiscussionTable(prev => [...prev, newItem]);
  };

  const handleAddQualificationQuestion = (question: string, discussionIndex: number = 0) => {
    setDiscussionTable(prev => prev.map((item, index) => 
      index === discussionIndex 
        ? { ...item, qualificationQuestions: [...(item.qualificationQuestions || []), question] }
        : item
    ));
  };

  const handleRemoveDiscussionPoint = (index: number) => {
    setDiscussionTable(prev => prev.filter((_, i) => i !== index));
    setActiveDropdown(null);
  };

  const handleEditDiscussionPoint = (index: number, content: string, stakeholder: string, objective: string = '', keyResults: string = '') => {
    setDiscussionTable(prev => prev.map((item, i) => 
      i === index ? { content, objective, keyResults: keyResults || 'Key Results', stakeholder } : item
    ));
    setActiveDropdown(null);
  };

  const toggleMainItemExpansion = (mainItem: string) => {
    const newExpanded = new Set(expandedMainItems);
    if (newExpanded.has(mainItem)) {
      newExpanded.delete(mainItem);
    } else {
      newExpanded.add(mainItem);
    }
    setExpandedMainItems(newExpanded);
  };

  const handleSavePastDiscussionPoints = (selectedPoints: Array<{content: string; objective: string; keyResults: string[]; qualificationQuestions?: string[]}>) => {
    selectedPoints.forEach(point => {
      const keyResultsString = point.keyResults.join(', ');
      const newItem = { 
        content: point.content, 
        objective: point.objective, 
        keyResults: keyResultsString, 
        stakeholder: '', 
        qualificationQuestions: point.qualificationQuestions || [] 
      };
      setDiscussionTable(prev => [...prev, newItem]);
    });
  };

  return (
    <div className="bg-white p-2 h-[calc(100vh-16rem)]">
      <div className="flex h-[650px] gap-4">
        {/* Left Panel */}
        <div className={`${leftPanelCollapsed ? 'w-12' : rightPanelCollapsed ? 'flex-1' : 'w-[60%]'} bg-white backdrop-blur-sm rounded-2xl border border-gray-100 transition-all flex flex-col overflow-hidden`}>
          {leftPanelCollapsed ? (
             <div 
               onClick={() => setLeftPanelCollapsed(false)}
               className="h-full bg-gradient-to-b from-[#605BFF]/10 to-[#605BFF]/5 hover:from-[#605BFF]/20 hover:to-[#605BFF]/10 cursor-pointer transition-all duration-300 flex flex-col items-center group py-4"
             >
               <Maximize2 size={20} className="text-[#605BFF] group-hover:text-[#5248FF] transition-colors mb-4" />
               <div className="transform -rotate-90 text-sm font-medium text-[#605BFF] whitespace-nowrap group-hover:text-[#5248FF] flex-1 flex items-center justify-center">
                 Meeting Overview
               </div>
             </div>
          ) : (
            <div className="flex-1 p-0">
              {/* Meeting Summary Bar */}
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-[#605BFF]" />
                    <span className="font-bold text-gray-600">Time:</span>
                    <span className="text-gray-900">{data.startDate} {data.startTime}-{data.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={12} className="text-[#605BFF]" />
                    <span className="font-bold text-gray-600">Subject:</span>
                    <span className="text-gray-900 truncate max-w-40">{data.subject || 'No subject'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={12} className="text-[#605BFF]" />
                    <span className="font-bold text-gray-600">Client:</span>
                    <span className="text-gray-900 truncate max-w-32">{data.clientCompany}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} className="text-[#605BFF]" />
                    <span className="font-bold text-gray-600">Attendees:</span>
                    <span className="text-gray-900">{data.attendees.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-[#605BFF]" />
                    <span className="font-bold text-gray-600">Readiness:</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={handleLeftPanelToggle}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors group"
                    title="Toggle Panel"
                  >
                    <Minimize2 size={20} className="text-gray-600 group-hover:text-[#605BFF] transition-colors" />
                  </button>
                </div>
              </div>
              
              {/* Discussion Points - Core Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 text-base">Discussion Points</h3>
                    <button className="p-1 text-gray-400 hover:text-[#605BFF] rounded-full hover:bg-[#605BFF]/10 transition-all duration-200" title="Information">
                      <Info size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-[#605BFF] rounded hover:bg-[#605BFF]/10 transition-all duration-200" title="Reorder">
                      <ArrowUpDown size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      {data.attendees.slice(0, 3).map((attendee, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm"
                          title={attendee.name}
                        >
                          {attendee.name.charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {data.attendees.length > 3 && (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm">
                          +{data.attendees.length - 3}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => setShowPastDiscussionPopup(true)}
                      className="p-2 text-[#605BFF] hover:text-[#5248FF] hover:bg-[#605BFF]/10 rounded-lg transition-all duration-200"
                      title="Past discussion points"
                    >
                      <List size={20} />
                    </button>
                    <button 
                      onClick={() => setShowMeetingHistoryPopup(true)}
                      className="p-2 text-[#605BFF] hover:text-[#5248FF] hover:bg-[#605BFF]/10 rounded-lg transition-all duration-200"
                      title="Meeting Intelligence History"
                    >
                      <History size={20} />
                    </button>
                    <button
                      onClick={() => setShowAddDiscussionPopup(true)}
                      className="p-2 text-[#605BFF] hover:text-[#5248FF] hover:bg-[#605BFF]/10 rounded-lg transition-all duration-200"
                      title="Add Discussion Point"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                    
                {/* Discussion Table */}
                <div className="space-y-3 h-[450px] overflow-y-auto">
                  {discussionTable.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedDiscussionIndex(selectedDiscussionIndex === index ? null : index)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedDiscussionIndex === index 
                          ? 'bg-[#605BFF]/10 shadow-md' 
                          : 'bg-white/90 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start">
                        {/* Left area - 60% */}
                        <div className="w-[60%] space-y-2">
                          <div className="font-semibold text-gray-900">{item.content}</div>
                          <div className="text-sm text-gray-600">{item.objective}</div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-gray-600">Key Results:</span>
                              <FilePlus2 size={14} className="text-[#605BFF]" />
                            </div>
                            <div className="text-xs text-gray-700 ml-2">
                              {item.keyResults.split(',').map((result, resultIndex) => (
                                <div key={resultIndex} className="flex items-start gap-1 mb-1">
                                  <span className="text-gray-400 mt-0.5">•</span>
                                  <span>{result.trim()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* My Qualification Questions */}
                          {item.qualificationQuestions && item.qualificationQuestions.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-600">My Qualification Questions:</span>
                                <HelpCircle size={14} className="text-[#605BFF]" />
                              </div>
                              <div className="text-xs text-gray-700 ml-2">
                                {item.qualificationQuestions.map((question, questionIndex) => (
                                  <div key={questionIndex} className="flex items-start gap-1 mb-1">
                                    <span className="text-gray-400 mt-0.5">•</span>
                                    <span>{question}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Middle area - 30% */}
                        <div className="w-[30%] px-4">
                          {item.stakeholder && (
                            <div className="space-y-1">
                              <div className="text-sm font-semibold text-gray-600">Stakeholder:</div>
                              <div className="text-sm text-gray-700">
                                <div className="font-medium">{item.stakeholder.split('\n')[0] || 'Name'}</div>
                                <div className="text-gray-500">{item.stakeholder.split('\n')[1] || 'Title'}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Right area - Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit action here
                            }}
                            className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveDiscussionPoint(index);
                            }}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {discussionTable.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Users size={48} className="text-gray-300 mx-auto mb-4" />
                      <div className="text-lg font-medium mb-2">No discussion points yet</div>
                      <div className="text-sm">Use AI suggestions or add them manually</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className={`${rightPanelCollapsed ? 'w-12' : leftPanelCollapsed ? 'flex-1' : 'w-[40%]'} bg-white backdrop-blur-sm rounded-2xl border border-gray-100 transition-all flex flex-col overflow-hidden`}>
          {rightPanelCollapsed ? (
            <div 
              onClick={() => setRightPanelCollapsed(false)}
              className="h-full bg-gradient-to-b from-[#605BFF]/10 to-[#605BFF]/5 hover:from-[#605BFF]/20 hover:to-[#605BFF]/10 cursor-pointer transition-all duration-300 flex flex-col items-center group py-4"
            >
              <Maximize2 size={20} className="text-[#605BFF] group-hover:text-[#5248FF] transition-colors mb-4" />
              <div className="transform -rotate-90 text-sm font-medium text-[#605BFF] whitespace-nowrap group-hover:text-[#5248FF] flex-1 flex items-center justify-center">
                Recommended Questions
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-900">Recommended Questions</h3>
                  {selectedDiscussionIndex === null && activeTab === 'Question Bank' && (
                    <div className="text-xs text-orange-600 mt-1">Select a discussion point to add questions</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Sales Methodology Icon - Only show for Question Bank */}
                  {activeTab === 'Question Bank' && (
                    <div className="relative methodology-dropdown">
                      <button
                        onClick={() => setShowMethodologyDropdown(!showMethodologyDropdown)}
                        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors group"
                        title="Sales Methodology"
                      >
                        <Album size={20} className="text-gray-600 group-hover:text-[#605BFF] transition-colors" />
                      </button>
                      {showMethodologyDropdown && (
                        <div className="absolute z-10 right-0 mt-1 w-60 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {methodologyOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSelectedMethodology(option);
                                setShowMethodologyDropdown(false);
                              }}
                              className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                                selectedMethodology === option ? 'bg-[#605BFF]/10 text-[#605BFF]' : 'text-gray-900'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    onClick={handleRightPanelToggle}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors group"
                    title="Toggle Panel"
                  >
                    <Minimize2 size={20} className="text-gray-600 group-hover:text-[#605BFF] transition-colors" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-4">

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-[#605BFF] border-b-2 border-[#605BFF]'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                  />
                </div>

                {/* Tab Content */}
                <div className="space-y-2 h-80 overflow-y-auto">
                  {activeTab === 'My Qualification Questions' && (
                    <div className="space-y-2">
                      {discussionTable.flatMap((item, itemIndex) => 
                        (item.qualificationQuestions || []).map((question, qIndex) => ({
                          question,
                          itemIndex,
                          qIndex
                        }))
                      ).filter(({question}) => question.toLowerCase().includes(searchQuery.toLowerCase())).map(({question, itemIndex, qIndex}, index) => (
                        <div
                          key={`${itemIndex}-${qIndex}`}
                          className="p-3"
                        >
                          <div className="text-sm text-gray-700">{question}</div>
                        </div>
                      ))}
                      {discussionTable.every(item => !item.qualificationQuestions || item.qualificationQuestions.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <MessageCircleQuestion size={32} className="text-gray-300 mx-auto mb-2" />
                          <div className="text-sm">No qualification questions added yet</div>
                          <div className="text-xs">Add questions to discussion points to see them here</div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'Question Bank' && selectedMethodology === 'IMPACT' && (
                    <div className="space-y-1">
                      {Object.entries(impactMainItems).map(([mainItem, questions]) => (
                        <div key={mainItem} className="">
                          <div
                            onClick={() => toggleMainItemExpansion(mainItem)}
                            className="p-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                          >
                            <div className="text-sm font-medium text-gray-800 flex-1">{mainItem}</div>
                            <ChevronDown 
                              size={16} 
                              className={`text-gray-500 transition-transform ${
                                expandedMainItems.has(mainItem) ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                          
                          {expandedMainItems.has(mainItem) && (
                            <div className="">
                              {questions.filter(q => q.toLowerCase().includes(searchQuery.toLowerCase())).map((question, qIndex) => (
                                <div
                                  key={qIndex}
                                  className="p-3 hover:bg-gray-50 transition-colors flex items-center gap-2 group"
                                >
                                  {selectedDiscussionIndex !== null && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddQualificationQuestion(question, selectedDiscussionIndex);
                                      }}
                                      className="p-1.5 rounded-lg bg-[#605BFF]/10 hover:bg-[#605BFF]/20 transition-all duration-200 group flex-shrink-0"
                                      title="Add Qualification Questions to left"
                                    >
                                      <ArrowLeft size={16} className="text-[#605BFF] group-hover:text-[#4F46E5] group-hover:scale-105 transition-all duration-200" />
                                    </button>
                                  )}
                                  <div className="text-sm text-gray-700 flex-1">{question}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'Question Bank' && selectedMethodology !== 'IMPACT' && (
                    <div className="space-y-2">
                      {[
                        "What integrations are critical for your workflow?",
                        "What are your security and compliance requirements?",
                        "How do you handle data migration from existing systems?",
                        "What's your budget range for this solution?",
                        "How do you evaluate vendor partnerships?"
                      ].filter(q => q.toLowerCase().includes(searchQuery.toLowerCase())).map((question, index) => (
                        <div
                           key={index}
                           className="p-3 hover:bg-gray-50 transition-colors flex items-center gap-2 group"
                         >
                           {selectedDiscussionIndex !== null && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddQualificationQuestion(question, selectedDiscussionIndex);
                                }}
                                className="p-1.5 rounded-lg bg-[#605BFF]/10 hover:bg-[#605BFF]/20 transition-all duration-200 group flex-shrink-0"
                                title="Add to My Qualification Questions"
              >
                                <ArrowLeft size={16} className="text-[#605BFF] group-hover:text-[#4F46E5] group-hover:scale-105 transition-all duration-200" />
                              </button>
                            )}
                           <div className="text-sm text-gray-700 flex-1">{question}</div>
                         </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'Customer Questions' && (
                    <div className="space-y-3">
                      {[
                        {
                          question: "How does this compare to our current solution?",
                          answer: "Our solution offers enhanced integration capabilities, better user experience, and 24/7 support compared to most legacy systems."
                        },
                        {
                          question: "What kind of support do you provide?",
                          answer: "We provide 24/7 technical support, dedicated account management, comprehensive training, and ongoing consultation services."
                        },
                        {
                          question: "Can you provide references from similar companies?",
                          answer: "Yes, we have successfully implemented solutions for companies in your industry. We can arrange reference calls with similar-sized organizations."
                        },
                        {
                          question: "What's the implementation timeline?",
                          answer: "Typical implementation takes 6-12 weeks depending on complexity, with phased rollout options available to minimize business disruption."
                        },
                        {
                          question: "How do you handle data privacy and security?",
                          answer: "We maintain SOC 2 Type II compliance, GDPR compliance, and use enterprise-grade encryption. All data is stored in secure, geographically distributed data centers."
                        }
                      ].filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => {
                        const isExpanded = expandedCustomerQuestions.has(index);
                        return (
                          <div
                            key={index}
                            className="p-3 cursor-pointer"
                            onClick={() => {
                              const newExpanded = new Set(expandedCustomerQuestions);
                              if (isExpanded) {
                                newExpanded.delete(index);
                              } else {
                                newExpanded.add(index);
                              }
                              setExpandedCustomerQuestions(newExpanded);
                            }}
                          >
                            <div className="text-sm font-medium text-gray-800 mb-2 flex items-center justify-between">
                              {item.question}
                              <ChevronDown 
                                size={16} 
                                className={`text-gray-500 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                            {isExpanded && (
                              <div className="text-sm text-gray-600 mt-2">{item.answer}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'Customer Objections' && (
                    <div className="space-y-2">
                      {discussionTable.map((item, index) => (
                        item.objective && item.objective.toLowerCase().includes(searchQuery.toLowerCase()) ? (() => {
                          const isExpanded = expandedObjections.has(index);
                          return (
                            <div
                              key={index}
                              className="p-3 cursor-pointer"
                              onClick={() => {
                                const newExpanded = new Set(expandedObjections);
                                if (isExpanded) {
                                  newExpanded.delete(index);
                                } else {
                                  newExpanded.add(index);
                                }
                                setExpandedObjections(newExpanded);
                              }}
                            >
                              <div className="text-sm text-gray-700 mb-2 flex items-center justify-between">
                                {item.objective}
                                <ChevronDown 
                                  size={16} 
                                  className={`text-gray-500 transition-transform ${
                                    isExpanded ? 'rotate-180' : ''
                                  }`} 
                                />
                              </div>
                              {isExpanded && (
                                <div className="text-sm text-gray-600 mt-2">
                                  Our solution is designed to integrate seamlessly with your existing projects, requiring minimal time and effort from your team while delivering immediate benefits.
                                </div>
                              )}
                            </div>
                          );
                        })() : null
                      )).filter(Boolean)}
                      {discussionTable.filter(item => item.objective && item.objective.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <MessageCircleQuestion size={32} className="text-gray-300 mx-auto mb-2" />
                          <div className="text-sm">No customer objections identified yet</div>
                          <div className="text-xs">Objectives from discussion points will appear here</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Discussion Points Popup */}
      {showAddDiscussionPopup && (
        <AddDiscussionPoints
          onClose={() => setShowAddDiscussionPopup(false)}
          onAdd={(discussionPoint, objective, stakeholder, keyResults) => {
            handleAddDiscussionPoint(discussionPoint, objective, stakeholder, keyResults);
            setShowAddDiscussionPopup(false);
          }}
          attendees={data.attendees}
        />
      )}
      
      {/* Past Discussion Points Popup */}
      {showPastDiscussionPopup && (
        <PastDiscussionPoints
          onClose={() => setShowPastDiscussionPopup(false)}
          onSave={handleSavePastDiscussionPoints}
          dealName={data.deal}
        />
      )}

      {/* Meeting Intelligence History Popup */}
      {showMeetingHistoryPopup && (
        <MeetingIntelligenceHistory
          onClose={() => setShowMeetingHistoryPopup(false)}
        />
      )}
    </div>
  );
};

export default Step3;