import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { LibraryBig, LayoutDashboard, List, Brain, CheckSquare, Plus, Bell, Mail, User, ChevronDown, Unplug, Settings, ChevronRight, CircleDollarSign, Trophy, Route, FileClock, Target, Phone, Share2, BarChart3, Menu, Heart, Folders } from 'lucide-react';
import UserInfo1 from './components/UserInfo1';
import UserInfo2 from './components/UserInfo2';
import MeetingIntelligence from './components/MeetingIntelligence';
import EmptyMeetingIntelligence from './components/MeetingIntelligence/EmptyMeetingIntelligence';
import Dashboard from './components/Dashboard/Dashboard';
import IFSDashboard from './components/Dashboard/IFSDashboard';
import TaskDashboardPage from './components/Dashboard/TaskDashboardPage';
import { FileManager } from './pages/FileManager';
import Tasks from './components/Tasks/Tasks';
import Integrations from './components/Integrations/Integrations';
import samAvatar from './assets/sam-avatar.svg';
import hubspotNav from './assets/hubspot-nav.svg';
import UserPage from './components/Admin/User';
import Billing from './components/Admin/Billing';
//import Billing from './components/Admin/BillingWithPricing';
import Pricing from './components/Admin/Pricing';
import Solutions from './components/Admin/Solutions';
import MeetingPreparation from './components/MeetingPreparation/MeetingPreparation';
import TranscriptHistory from './components/TranscriptHistory';
import MeetingList from './components/MeetingList/MeetingList';
import HubSpotCalls from './components/Calls/HubSpotCalls';
import SharedCalls from './components/Calls/SharedCalls';
import CallsReports from './components/Calls/CallsReports';
import IncomeGoals from './components/IncomeGoals/IncomeGoals';
import Onboarding from './components/Onboarding/Onboarding';
import ProfilePage from './components/Profile/ProfilePage';
import FolderPage from './components/FolderPage/FolderPage';
import KBPage from './components/KnowledgeBase/KnowledgeBasePage';
import ToastManager from './components/CommonComponents/ToastManager';
import { ToastProvider, useToastContext } from './contexts/ToastContext';

const RoleSelectionPopup: React.FC<{
  isVisible: boolean;
  selectedRole: string | null;
  onSelect: (role: string) => void;
  onSave: () => void;
}> = ({ isVisible, selectedRole, onSelect, onSave }) => {
  if (!isVisible) return null;
  const roles = ['Boss', 'Manager', 'Sales'];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[420px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">What is your role?</h3>
            </div>
          </div>
        </div>
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-3">
            {roles.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <div
                  key={role}
                  onClick={() => onSelect(role)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#605BFF] bg-opacity-10 border-[#605BFF] text-[#605BFF]'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">{role}</span>
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
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button
            onClick={onSave}
            disabled={!selectedRole}
            className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              selectedRole
                ? 'text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white'
                : 'text-gray-400 bg-white border border-gray-200 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'file-manager' | 'folder' | 'profile' | 'pricing' | 'hubspot-calls' | 'shared-calls' | 'calls-reports' | 'onboarding' | 'income-goals' | 'dashboard' | 'meeting-intelligence' | 'tasks' | 'integrations' | 'user' | 'billing' | 'solution' | 'prep' | 'transcript' | 'meeting-list' | 'knowledge-base'>('dashboard'); 
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEmptyMeetingIntelligence, setShowEmptyMeetingIntelligence] = useState(false);
  const [dashboardType, setDashboardType] = useState<'default' | 'ifs' | 'task'>('ifs');
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showCallsPanel, setShowCallsPanel] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showHubSpotMenu, setShowHubSpotMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showUserInfo1, setShowUserInfo1] = useState(false);
  const [showUserInfo2, setShowUserInfo2] = useState(false);
  const navItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Toast 功能
  const { toasts, removeToast, showSuccess, showAlert, showError, showInfo } = useToastContext();

  const handleUserInfo1Next = () => {
    setShowUserInfo1(false);
    setShowUserInfo2(true);
  };

  const handleUserInfo2Back = () => {
    setShowUserInfo2(false);
    setShowUserInfo1(true);
  };

  const handleUserInfo2Save = () => {
    setShowUserInfo2(false);
  };

  const handleCloseUserInfo = () => {
    setShowUserInfo1(false);
    setShowUserInfo2(false);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setSelectedRole(storedRole);
      setShowRolePopup(false);
    } else {
      setShowRolePopup(true);
    }
  }, []);

  const handleSaveRole = () => {
    if (selectedRole) {
      localStorage.setItem('userRole', selectedRole);
      setShowRolePopup(false);
    }
  };

  // Type-safe navigation handler for components that expect string parameter
  const handleNavigate = (view: string) => {
    const validViews = ['file-manager', 'folder', 'profile', 'pricing', 'hubspot-calls', 'shared-calls', 'calls-reports', 'onboarding', 'income-goals', 'dashboard', 'meeting-intelligence', 'tasks', 'integrations', 'user', 'billing', 'solution', 'prep', 'transcript', 'meeting-list', 'knowledge-base'] as const;
    if (validViews.includes(view as any)) {
      setActiveView(view as typeof activeView);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'onboarding':
        return <Onboarding />;
      case 'dashboard':
        switch (dashboardType) {
          case 'ifs':
            return <IFSDashboard />;
          case 'task':
            return <TaskDashboardPage />;
          default:
            return <Dashboard />;
        }
      case 'income-goals':
        return <IncomeGoals />;
      case 'meeting-intelligence':
        return showEmptyMeetingIntelligence ? 
          <EmptyMeetingIntelligence onNavigate={handleNavigate} onToggleEmpty={setShowEmptyMeetingIntelligence} /> : 
          <MeetingIntelligence onNavigate={handleNavigate} onToggleEmpty={setShowEmptyMeetingIntelligence} />;
      case 'tasks':
        return <Tasks />;
      case 'integrations':
        return <Integrations />;
      case 'user':
        return <UserPage />;
      case 'billing':
        return <Billing />;
      case 'pricing':
        return <Pricing />;
      case 'solution':
        return <Solutions />;
      case 'prep':
        return <MeetingPreparation onNavigate={handleNavigate} />;
      case 'transcript':
        return <TranscriptHistory onNavigate={handleNavigate} onToggleEmpty={setShowEmptyMeetingIntelligence} />;
      case 'meeting-list':
        return <MeetingList onNavigate={handleNavigate} />;
      case 'hubspot-calls':
        return <HubSpotCalls />;
      case 'shared-calls':
        return <SharedCalls />;
      case 'calls-reports':
        return <CallsReports />;
      case 'file-manager':
        return <FileManager />;
      case 'profile':
        return <ProfilePage />;
      case 'folder':
        return <FolderPage />;
      case 'knowledge-base':
        return <KBPage />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <img src={samAvatar} alt="SAM Logo" className="w-20 h-20" />
        </div>
        
        {/* Center - Feedback Message */}
        <div className="flex-1 text-center">
          <span className="text-gray-600 flex items-center justify-center gap-1">
            We would <Heart className="w-4 h-4 text-[#605BFF] fill-current" /> to hear your feedback!
          </span>
        </div>
        
        {/* Right - Icons and User Menu */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Mail className="w-5 h-5" />
          </button>
          <span className="text-gray-700 font-medium">SAM.Coach</span>
          
          {/* User Avatar and Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              {/*<ChevronDown className="w-4 h-4 text-gray-600" />*/}
            </button>
            
            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Onboarding
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  ref={(el) => navItemRefs.current['profile'] = el}
                  onClick={() => setActiveView('profile')}
                  >
                  Profile
                </button>

                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Upgrade
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Switch Account
                </button>
                <button 
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    const nextType = dashboardType === 'default' ? 'ifs' : 
                                   dashboardType === 'ifs' ? 'task' : 'default';
                    setDashboardType(nextType);
                  }}
                >
                  Switch Dashboard ({dashboardType === 'default' ? 'Default' : 
                                   dashboardType === 'ifs' ? 'IFS' : 'Task'})
                </button>
                <hr className="my-1" />
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Left Navigation Sidebar */}
      <div className={`fixed left-0 top-12 ${isNavCollapsed ? 'w-20' : 'w-64'} h-[calc(100vh-3rem)] bg-white border-r-[0.5px] border-gray-200 flex flex-col z-10 transition-all duration-300`}>
        {/* Toggle Button */}
        <div className={`${isNavCollapsed ? 'px-2 pb-0' : 'px-4 pb-1'}`}>
          <button
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'justify-start px-4'} py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className={`flex-1 ${isNavCollapsed ? 'px-2 pt-1 pb-2' : 'px-4 pt-2 pb-4'} overflow-y-auto custom-scrollbar relative`}>
          <div className="space-y-2">
            <div className="relative">
              <button
                  ref={(el) => navItemRefs.current['onboarding'] = el}
                  onClick={() => setActiveView('onboarding')}
                  onMouseEnter={(e) => {
                    setHoveredItem('onboarding');
                    if (isNavCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                    activeView === 'onboarding'
                      ? 'bg-[#605BFF] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                <User className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Onboarding</span>}
              </button>

            </div>

            <div className="relative">
                <button
                  ref={(el) => navItemRefs.current['income-goals'] = el}
                  onClick={() => setActiveView('income-goals')}
                  onMouseEnter={(e) => {
                    setHoveredItem('income-goals');
                    if (isNavCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                    activeView === 'income-goals'
                      ? 'bg-[#605BFF] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Target className="w-5 h-5 flex-shrink-0" />
                  {!isNavCollapsed && <span className="font-medium">Income Calculator</span>}
                </button>
              </div>
            
            <div className="relative">
                <button
                  ref={(el) => navItemRefs.current['dashboard'] = el}
                  onClick={() => setActiveView('dashboard')}
                  onMouseEnter={(e) => {
                    setHoveredItem('dashboard');
                    if (isNavCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                    activeView === 'dashboard'
                      ? 'bg-[#605BFF] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                  {!isNavCollapsed && <span className="font-medium">Dashboard</span>}
                </button>
              </div>

            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['tasks'] = el}
                onClick={() => setActiveView('tasks')}
                onMouseEnter={(e) => {
                  setHoveredItem('tasks');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'tasks'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CheckSquare className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Tasks</span>}
                {/* 新增代码：任务计数气泡 */}
                {!isNavCollapsed && (
                  <span className="ml-auto min-w-[20px] px-2 py-0.5 text-xs font-semibold rounded-full bg-[#FF8E1C] text-white flex items-center justify-center">
                    3
                  </span>
                )}
              </button>
            </div>
            
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['meeting-list'] = el}
                onClick={() => setActiveView('meeting-list')}
                onMouseEnter={(e) => {
                  setHoveredItem('meeting-list');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'meeting-list'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Meetings</span>}
              </button>
            </div>
            {/* Calls Panel */}
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['hubspot'] = el}
                onClick={() => isNavCollapsed ? setShowHubSpotMenu(!showHubSpotMenu) : setShowCallsPanel(!showCallsPanel)}
                onMouseEnter={(e) => {
                  setHoveredItem('hubspot');
                  if (isNavCollapsed) {
                    setShowHubSpotMenu(true);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  if (isNavCollapsed) setShowHubSpotMenu(false);
                }}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100 whitespace-nowrap`}
              >
                {isNavCollapsed ? (
                  <img src={hubspotNav} alt="HubSpot" className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <img src={hubspotNav} alt="HubSpot" className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">SDR Management</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      showCallsPanel ? 'rotate-90' : ''
                    }`} />
                  </>
                )}
              </button>
              

              
              {/* Right-side menu for collapsed state */}
              {isNavCollapsed && showHubSpotMenu && (
                <div 
                  className="fixed w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[9999]"
                  style={{
                    top: `${tooltipPosition.top}px`,
                    left: `${tooltipPosition.left}px`
                  }}
                  onMouseEnter={() => setShowHubSpotMenu(true)}
                  onMouseLeave={() => setShowHubSpotMenu(false)}
                >
                  <button
                    onClick={() => setActiveView('hubspot-calls')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'hubspot-calls'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Calls</span>
                  </button>
                  <button
                    onClick={() => setActiveView('shared-calls')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'shared-calls'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Share2 className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Shared</span>
                  </button>
                  <button
                    onClick={() => setActiveView('calls-reports')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'calls-reports'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Reports</span>
                  </button>
                </div>
              )}

              {/* Calls Sub-panel - only show in expanded state */}
              {!isNavCollapsed && showCallsPanel && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => setActiveView('hubspot-calls')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                      activeView === 'hubspot-calls'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Calls</span>
                  </button>

                  <button
                    onClick={() => setActiveView('shared-calls')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                      activeView === 'shared-calls'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Share2 className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Shared</span>
                  </button>

                  <button
                    onClick={() => setActiveView('calls-reports')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                      activeView === 'calls-reports'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Reports</span>
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['prep'] = el}
                onClick={() => setActiveView('prep')}
                onMouseEnter={(e) => {
                  setHoveredItem('prep');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'prep'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Route className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Meeting Preparation</span>}
              </button>
            </div>
            
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['meeting-intelligence'] = el}
                onClick={() => setActiveView('meeting-intelligence')}
                onMouseEnter={(e) => {
                  setHoveredItem('meeting-intelligence');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'meeting-intelligence'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Brain className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Meeting Intelligence</span>}
              </button>
            </div>

            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['transcript'] = el}
                onClick={() => setActiveView('transcript')}
                onMouseEnter={(e) => {
                  setHoveredItem('transcript');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'transcript'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Folders className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">SAM Drive</span>}
              </button>
            </div>
            
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['file-manager'] = el}
                onClick={() => setActiveView('file-manager')}
                onMouseEnter={(e) => {
                  setHoveredItem('dashboard');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'file-manager'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Folders className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">SAM Drive(future)</span>}
              </button>
            </div>

            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['knowledge-base'] = el}
                onClick={() => setActiveView('knowledge-base')}
                onMouseEnter={(e) => {
                  setHoveredItem('knowledge-base');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors whitespace-nowrap ${
                  activeView === 'knowledge-base'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LibraryBig className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Knowledge Base</span>}
              </button>
            </div>
            
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['integrations'] = el}
                onClick={() => setActiveView('integrations')}
                onMouseEnter={(e) => {
                  setHoveredItem('integrations');
                  if (isNavCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-left transition-colors ${
                  activeView === 'integrations'
                    ? 'bg-[#605BFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Unplug className="w-5 h-5 flex-shrink-0" />
                {!isNavCollapsed && <span className="font-medium">Integrations</span>}
              </button>
            </div>

            {/* Settings Panel */}
            <div className="relative">
              <button
                ref={(el) => navItemRefs.current['settings'] = el}
                onClick={() => isNavCollapsed ? setShowSettingsMenu(!showSettingsMenu) : setShowSettingsPanel(!showSettingsPanel)}
                onMouseEnter={(e) => {
                  setHoveredItem('settings');
                  if (isNavCollapsed) {
                    setShowSettingsMenu(true);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ top: rect.top, left: rect.right + 8 });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  if (isNavCollapsed) setShowSettingsMenu(false);
                }}
                className={`w-full flex items-center ${isNavCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100 whitespace-nowrap`}
              >
                {isNavCollapsed ? (
                  <Settings className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">Settings</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      showSettingsPanel ? 'rotate-90' : ''
                    }`} />
                  </>
                )}
              </button>
              

              
              {/* Right-side menu for collapsed state */}
              {isNavCollapsed && showSettingsMenu && (
                <div 
                  className="fixed w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[9999]"
                  style={{
                    top: `${tooltipPosition.top}px`,
                    left: `${tooltipPosition.left}px`
                  }}
                  onMouseEnter={() => setShowSettingsMenu(true)}
                  onMouseLeave={() => setShowSettingsMenu(false)}
                >
                  <button
                    onClick={() => setActiveView('user')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'user'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">User</span>
                  </button>
                  <button
                    onClick={() => setActiveView('billing')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'billing'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <CircleDollarSign className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Billing</span>
                  </button>
                  {/*<button
                    onClick={() => setActiveView('pricing')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'pricing'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <CircleDollarSign className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Pricing</span>
                  </button>*/}
                  <button
                    onClick={() => setActiveView('solution')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'solution'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Trophy className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Solutions</span>
                  </button>
                </div>
              )}
              
              {/* Settings Sub-panel - only show in expanded state */}
              {!isNavCollapsed && showSettingsPanel && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => setActiveView('user')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                      activeView === 'user'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">User</span>
                  </button>

                  <button
                    onClick={() => setActiveView('billing')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                      activeView === 'billing'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <CircleDollarSign className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Billing</span>
                  </button>

                  {/*<button
                    onClick={() => setActiveView('pricing')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      activeView === 'pricing'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <CircleDollarSign className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Pricing</span>
                  </button>*/}

                  <button
                    onClick={() => setActiveView('solution')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                      activeView === 'solution'
                        ? 'bg-[#605BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Trophy className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Solutions</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      
      {/* Right Content Area */}
      <div className={`${isNavCollapsed ? 'ml-20' : 'ml-64'} mt-12 h-[calc(100vh-3rem)] overflow-hidden transition-all duration-300`}>
        <div className="h-full">
          {renderContent()}
        </div>
      </div>
      
      {/* Global Tooltip */}
      {isNavCollapsed && hoveredItem && !showHubSpotMenu && !showSettingsMenu && (
        <div 
          className="fixed px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-[9999] pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`
          }}
        >
          {hoveredItem === 'onboarding' && 'Onboarding'}
          {hoveredItem === 'dashboard' && 'Dashboard'}
          {hoveredItem === 'income-goals' && 'Income Goals'}
          {hoveredItem === 'meeting-list' && 'Meeting List'}
          {hoveredItem === 'prep' && 'Meeting Preparation'}
          {hoveredItem === 'meeting-intelligence' && 'Meeting Intelligence'}
          {hoveredItem === 'transcript' && 'Transcript History'}
          {hoveredItem === 'tasks' && 'Tasks'}
          {hoveredItem === 'hubspot' && 'HubSpot'}
          {hoveredItem === 'integrations' && 'Integrations'}
          {hoveredItem === 'settings' && 'Settings'}
        </div>
      )}
      
      {/* UserInfo Modals */}
      <UserInfo1 
        isVisible={showUserInfo1}
        onClose={handleCloseUserInfo}
        onNext={handleUserInfo1Next} 
      />
      
      <UserInfo2 
        isVisible={showUserInfo2}
        onClose={handleCloseUserInfo}
        onBack={handleUserInfo2Back} 
        onSave={handleUserInfo2Save} 
      />

      <RoleSelectionPopup
        isVisible={showRolePopup}
        selectedRole={selectedRole}
        onSelect={setSelectedRole}
        onSave={handleSaveRole}
      />
       
       {/* Toast 通知管理器 */}
       <ToastManager toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
