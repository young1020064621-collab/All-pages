import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Crown, 
  Calendar,
  Brain,
  Building2,
  Handshake,
  Users,
  Target,
  CheckSquare,
  Zap,
  UserCheck,
  Info,
  List,
  Receipt,
  CreditCard,
  FileText
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  isAvailable: boolean;
}

interface OrderHistoryItem {
  id: string;
  date: string;
  product: string;
  userLicenses: number;
  action: string;
}

const Billing = () => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'history'>('subscription');
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());
  
  // Current user's plan
  const currentPlan = {
    name: 'Free Plan',
    status: 'Active',
    period: '30 day(s)',
    seats: 1,
    startDate: 'May 6, 2025 04:28',
    endDate: 'Jun 5, 2026 04:28',
    nextBilling: null
  };

  // Order history data
  const orderHistory: OrderHistoryItem[] = [
    {
      id: '1',
      date: 'Jul 16, 2025',
      product: 'Revenue Accelerator',
      userLicenses: 16,
      action: 'Details'
    },
    {
      id: '2',
      date: 'Jun 11, 2025',
      product: 'Revenue Accelerator',
      userLicenses: 15,
      action: 'Details'
    },
    {
      id: '3',
      date: 'Jun 11, 2025',
      product: 'Revenue Accelerator',
      userLicenses: 5,
      action: 'Details'
    },
    {
      id: '4',
      date: 'Jun 11, 2025',
      product: 'Revenue Accelerator',
      userLicenses: 1,
      action: 'Details'
    },
    {
      id: '5',
      date: 'Jun 11, 2025',
      product: 'Revenue Accelerator',
      userLicenses: 1,
      action: 'Details'
    },
    {
      id: '6',
      date: 'May 22, 2025',
      product: 'Revenue Intelligence',
      userLicenses: 1,
      action: 'Details'
    },
    {
      id: '7',
      date: 'Feb 13, 2025',
      product: 'AI Meeting Recorder (Team)',
      userLicenses: 1,
      action: 'Details'
    },
    {
      id: '8',
      date: 'Oct 2, 2024',
      product: 'User Free Plan',
      userLicenses: 0,
      action: 'Details'
    }
  ];

  // Current plan sidebar info for order history
  const currentPlanSidebar = {
    name: 'Revenue Accelerator',
    renewsOn: 'June 11, 2026'
  };

  // Define all features with their availability per plan
  const allFeatures: Feature[] = [
    {
      id: 'meeting-intelligence',
      name: 'Meeting Intelligence',
      icon: Brain,
      description: 'AI-powered meeting insights, summaries, and action items extraction. Access to meeting analytics dashboard and intelligent meeting reports.',
      isAvailable: true
    },
    {
      id: 'calendar-integration',
      name: 'Calendar Integration',
      icon: Calendar,
      description: 'Sync with Google Calendar, Outlook, and other calendar providers. Automatic meeting scheduling, reminders, and calendar management.',
      isAvailable: true
    },
    {
      id: 'company',
      name: 'Company Management',
      icon: Building2,
      description: 'Manage company profiles, track interactions, and maintain comprehensive company databases. Access to company analytics and relationship mapping.',
      isAvailable: false
    },
    {
      id: 'deal',
      name: 'Deal Tracking',
      icon: Target,
      description: 'Pipeline management, deal stages, revenue forecasting, and win/loss analysis. Complete CRM functionality with deal progression tracking.',
      isAvailable: false
    },
    {
      id: 'contact',
      name: 'Contact Management',
      icon: Users,
      description: 'Advanced contact management, relationship mapping, and communication history tracking. Comprehensive contact database with interaction logs.',
      isAvailable: false
    },
    {
      id: 'meetings',
      name: 'Advanced Meetings',
      icon: Handshake,
      description: 'Enhanced meeting features including recording, transcription, and advanced analytics. Meeting performance insights and optimization suggestions.',
      isAvailable: false
    },
    {
      id: 'meeting-preparation',
      name: 'Meeting Preparation',
      icon: CheckSquare,
      description: 'AI-powered meeting preparation, agenda creation, and participant research. Automated briefings and meeting context analysis.',
      isAvailable: false
    },
    {
      id: 'task-management',
      name: 'Task Management',
      icon: CheckSquare,
      description: 'Task tracking, assignment, deadlines, and project management capabilities. Team collaboration and productivity monitoring tools.',
      isAvailable: false
    },
    {
      id: 'meeting-simulation',
      name: 'Meeting Simulation',
      icon: Zap,
      description: 'Practice meetings with AI, role-playing scenarios, and performance feedback. Sales training and presentation skill development.',
      isAvailable: false
    },
    {
      id: 'sdr-management',
      name: 'SDR Management',
      icon: UserCheck,
      description: 'Sales development representative tools, coaching, and performance tracking. Team management and sales process optimization.',
      isAvailable: false
    }
  ];

  const toggleFeatureExpansion = (featureId: string) => {
    setExpandedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  const availableFeatures = allFeatures.filter(f => f.isAvailable);
  const unavailableFeatures = allFeatures.filter(f => !f.isAvailable);

  const renderSubscriptionView = () => (
    <>
      {/* Current Plan Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{currentPlan.name}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                {currentPlan.status}
              </span>
            </div>
            <p className="text-gray-600">You're currently on the free plan with limited features</p>
          </div>
          <button
            onClick={() => setShowFeaturesModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <List className="h-4 w-4" />
            View Features
          </button>
        </div>

        {/* Plan Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Period</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.period}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Seats</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.seats}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Start Date</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.startDate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">End Date</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.endDate}</p>
          </div>
        </div>

        {/* Quick Feature Summary */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-blue-900">Current Features</h5>
              <p className="text-sm text-blue-700 mt-1">
                {availableFeatures.length} of {allFeatures.length} features available
              </p>
              <div className="flex items-center gap-4 mt-2">
                {availableFeatures.slice(0, 2).map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.id} className="flex items-center gap-2 text-sm text-blue-700">
                      <Icon className="h-4 w-4" />
                      <span>{feature.name}</span>
                    </div>
                  );
                })}
                {availableFeatures.length > 2 && (
                  <span className="text-sm text-blue-600">+{availableFeatures.length - 2} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans Section (Stripe iframe) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Plan</h3>
          <p className="text-gray-600">Select the plan that best fits your needs</p>
        </div>
        
        {/* Monthly/Yearly Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium transition-all duration-200">
              Monthly
            </button>
            <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-full font-medium transition-all duration-200">
              Yearly
            </button>
          </div>
        </div>
        
        {/* Stripe iframe would go here */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 font-medium">Stripe Pricing Component</p>
          <p className="text-sm text-gray-400 mt-2">Your existing Stripe iframe would be embedded here</p>
        </div>
      </div>
    </>
  );

  const renderOrderHistoryView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Order History Table */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Order History</h2>
            <p className="text-gray-600">Manage billing information and view receipts</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderHistory.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{order.product}</div>
                        <div className="text-gray-500">User Licences: {order.userLicenses}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="inline-flex items-center px-3 py-1 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors duration-150 font-medium">
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Current Plan Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{currentPlanSidebar.name}</h3>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                Active
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Your current subscription plan</p>
          </div>

          {/* Plan Details */}
          <div className="space-y-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Renewal Date</p>
              <p className="text-sm font-semibold text-gray-900">{currentPlanSidebar.renewsOn}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Billing Period</p>
              <p className="text-sm font-semibold text-gray-900">Annual</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">User Licenses</p>
              <p className="text-sm font-semibold text-gray-900">16 seats</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
              Update Subscription
            </button>
            <button 
              onClick={() => setShowFeaturesModal(true)}
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
            >
              <List className="h-4 w-4" />
              View Features
            </button>
          </div>

          {/* Feature Summary */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="text-xs font-medium text-blue-900 uppercase tracking-wide mb-2">Features</h5>
            <p className="text-sm text-blue-700 mb-2">
              {allFeatures.length} total features
            </p>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-green-700">{availableFeatures.length} active</span>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-amber-600" />
                <span className="text-amber-700">{unavailableFeatures.length} premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Billing
            <Crown className="h-7 w-7 text-blue-600" />
          </h1>
          <p className="text-gray-600 mt-2">Manage your subscription and view billing history</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('subscription')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'subscription'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Subscription
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  Order History
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'subscription' ? renderSubscriptionView() : renderOrderHistoryView()}

        {/* Features Modal */}
        {showFeaturesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Features Overview</h3>
                <button
                  onClick={() => setShowFeaturesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Available Features */}
                {availableFeatures.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-gray-900">Available Features ({availableFeatures.length})</h4>
                    </div>
                    <div className="space-y-3">
                      {availableFeatures.map((feature) => {
                        const Icon = feature.icon;
                        const isExpanded = expandedFeatures.has(feature.id);
                        
                        return (
                          <div key={feature.id} className="border border-green-200 rounded-lg bg-green-50 transition-all duration-200">
                            <div 
                              className="p-4 cursor-pointer hover:bg-green-100 transition-colors duration-200"
                              onClick={() => toggleFeatureExpansion(feature.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <Icon className="h-5 w-5 text-green-600" />
                                  </div>
                                  <span className="font-medium text-gray-900">{feature.name}</span>
                                  <Check className="h-4 w-4 text-green-600" />
                                </div>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="px-4 pb-4">
                                <div className="flex items-start gap-2 text-sm text-gray-600 bg-white p-3 rounded-lg border">
                                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <p>{feature.description}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Unavailable Features */}
                {unavailableFeatures.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <X className="h-5 w-5 text-gray-400" />
                      <h4 className="font-medium text-gray-900">Upgrade to Access ({unavailableFeatures.length})</h4>
                    </div>
                    <div className="space-y-3">
                      {unavailableFeatures.map((feature) => {
                        const Icon = feature.icon;
                        const isExpanded = expandedFeatures.has(feature.id);
                        
                        return (
                          <div key={feature.id} className="border border-gray-200 rounded-lg bg-gray-50 transition-all duration-200">
                            <div 
                              className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                              onClick={() => toggleFeatureExpansion(feature.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gray-100 rounded-lg">
                                    <Icon className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <span className="font-medium text-gray-500">{feature.name}</span>
                                  <X className="h-4 w-4 text-gray-400" />
                                </div>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="px-4 pb-4">
                                <div className="flex items-start gap-2 text-sm text-gray-500 bg-white p-3 rounded-lg border">
                                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <p>{feature.description}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Upgrade CTA */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-blue-900">Ready to unlock all features?</h5>
                          <p className="text-sm text-blue-700 mt-1">Upgrade to a paid plan to access advanced functionality</p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowFeaturesModal(false);
                            setActiveTab('subscription');
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          View Plans
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;