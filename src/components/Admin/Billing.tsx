import React, { useState } from 'react';
import { CreditCard, Calendar, X, Receipt, Check, Crown, List, Info, ChevronDown, ChevronUp, BarChart3, Users } from 'lucide-react';

interface BillingRecord {
  id: number;
  date: string;
  planName: string;
  userLicences: number;
  amount: string;
  paymentMethod: string;
  userName: string;
  status: string;
}

const billingData: BillingRecord[] = [
  {
    id: 1,
    date: "Jul 16, 2025 19:02",
    planName: "Enterprise",
    userLicences: 16,
    amount: "847.27 USD",
    paymentMethod: "Visa •••• 4242",
    userName: "Test New User",
    status: "Paid"
  },
  {
    id: 2,
    date: "Jun 16, 2025 14:30",
    planName: "Business",
    userLicences: 12,
    amount: "650.00 USD",
    paymentMethod: "Visa •••• 4242",
    userName: "John Smith",
    status: "Paid"
  },
  {
    id: 3,
    date: "May 16, 2025 09:15",
    planName: "Elite",
    userLicences: 8,
    amount: "320.00 USD",
    paymentMethod: "Mastercard •••• 8888",
    userName: "Sarah Johnson",
    status: "Paid"
  },
  {
    id: 4,
    date: "Apr 16, 2025 16:45",
    planName: "Starter",
    userLicences: 5,
    amount: "0.00 USD",
    paymentMethod: "N/A",
    userName: "Mike Chen",
    status: "Active"
  },
  {
    id: 5,
    date: "Mar 16, 2025 11:20",
    planName: "Enterprise",
    userLicences: 20,
    amount: "1,058.40 USD",
    paymentMethod: "Visa •••• 4242",
    userName: "Emily Davis",
    status: "Paid"
  }
];

const BillingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'history'>('history');
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

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

  const handleDetailsClick = (record: BillingRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleSendReceipt = () => {
    // Handle send receipt logic here
    console.log('Sending receipt for:', selectedRecord);
    // You can add actual email sending logic here
    alert('Receipt sent successfully!');
  };

  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Elite',
      subtitle: 'Not Just Another',
      price: billingCycle === 'monthly' ? 24 : 228,
      originalPrice: billingCycle === 'monthly' ? null : 348,
      icon: null,
      popular: false,
      features: [
        'Audio and Video recording',
        'Transcription',
        'Meeting summary',
        'Follow-up letter',
        'Advanced Coaching',
        'Ask SAM Anything',
        'Share with Anyone'
      ]
    },
    {
      name: 'Business',
      subtitle: 'Enterprise Grade',
      price: billingCycle === 'monthly' ? 61 : 588,
      originalPrice: billingCycle === 'monthly' ? null : 854,
      icon: null,
      popular: true,
      features: [
        'Everything in Elite',
        'Meeting Preparation',
        'Team Coaching',
        'Meeting Analytics',
        'CRM & Dialer Integration',
        'Task Management',
        'Calendar Integration'
      ]
    },
    {
      name: 'Enterprise',
      subtitle: 'End-to-End',
      price: billingCycle === 'monthly' ? 99 : 948,
      originalPrice: billingCycle === 'monthly' ? null : 1386,
      icon: null,
      popular: false,
      features: [
        'Everything in Business',
        'Meeting Simulation',
        'Deal Intelligence',
        'Win-Loss analysis',
        'AI Recruiter',
        'SDR Management'
      ]
    }
  ];

  const renderSubscriptionView = () => (
    <div className="px-6 pb-20">
      {/* Current subscription card */}
      <div className="bg-white rounded-2xl p-4 mb-2">
        <div className="space-y-2">
          {/* First row - Title */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-gray-900">Upgrade to accelerate revenue growth</h3>
          </div>
          
          {/* Second row - Free Trial and View Features */}
          {/*<div className="flex items-center justify-left gap-2">
            <h4 className="text-sm text-gray-500">You are currently on <span className="font-semibold text-gray-600">Starter Plan.</span></h4>
            <button 
              onClick={() => setIsFeaturesModalOpen(true)}
              className="px-3 py-1 bg-white text-sm text-[#605BFF] rounded-md underline hover:bg-[#605BFF] hover:text-white transition-colors"
            >
              View Features
            </button>
          </div>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-0.5 text-left">Current Plan</p>
            <p className="text-sm font-semibold text-gray-500">Starter</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-0.5 text-left">Remaining</p>
            <p className="text-sm font-semibold text-gray-500">0/300 mins</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-0.5 text-left">Licence</p>
            <p className="text-sm font-semibold text-gray-500">1 seat</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-0.5 text-left">Renewal Date</p>
            <p className="text-sm font-semibold text-gray-500">Sept 26, 2025</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-0.5 text-left">Billing Period</p>
            <p className="text-sm font-semibold text-gray-500">30 days</p>
          </div>
        </div>
      </div>

      {/* Choose Your Plan Section */}
      <div className="text-center mb-6">
        
        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Free Plan - Current Plan */}
        <div className="relative bg-white rounded-2xl shadow-sm border-2 border-gray-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg bg-[#FF8E1C]">
              Current Plan
            </span>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#FF8E1C]">
                <div className="text-white">
                  {null}
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-gray-900">Starter</h3>
                <p className="text-sm text-gray-500">Record, Transcribe and analyze</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500 ml-2">USD/user/mo</span>
              </div>
            </div>

            <div className="w-full py-3 px-4 rounded-lg text-base font-semibold text-center border-2 border-gray-300 text-gray-600">
              Renew at Aug 27, 2025
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 mb-3">This includes:</p>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Audio and Video recording (5 hours limit)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Transcription</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Meeting summary</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Follow-up letter</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Advanced Coaching</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Ask SAM Anything</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Share with Anyone</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {plans.map((plan, index) => {
          const isPopular = plan.popular;
          
          return (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-gray-200`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg bg-[#605BFF]">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${
                    isPopular ? 'bg-[#605BFF]' : 'bg-gray-100'
                  }`}>
                    <div className={isPopular ? 'text-white' : 'text-gray-600'}>
                      {plan.icon}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      ${billingCycle === 'yearly' ? Math.round(plan.price / 12) : plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">
                      USD/user/mo
                    </span>
                  </div>
                  {plan.originalPrice && billingCycle === 'monthly' && (
                    <div className="flex items-center mt-1">
                      <span className="text-lg text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                      <span className="ml-2 text-sm text-green-600 font-medium">
                        Save ${plan.originalPrice - plan.price}/mo
                      </span>
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg text-base font-semibold transition-all ${
                    isPopular
                      ? 'bg-[#605BFF] text-white hover:bg-[#5451e5] shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Subscribe
                </button>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900 mb-3">This includes:</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-4 h-4 text-[#605BFF] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderOrderHistoryView = () => (
    <div className="p-6 pb-20 flex gap-6 min-h-full">
        {/* Left Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {billingData.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-900">{record.planName}</div>
                          <div className="text-gray-500 text-xs">User Licences: {record.userLicences}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDetailsClick(record)}
                          className="bg-white text-[#605BFF] border border-[#605BFF] px-3 py-1 rounded-md hover:bg-[#605BFF] hover:text-white transition-colors text-sm font-medium"
                        >
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

        {/* Right Panel */}
        <div className="w-80">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            {/* Plan Name and Status */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-[#605BFF]">Enterprise</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">Your current subscription plan</p>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Renewal Date</p>
                <p className="text-sm font-semibold text-gray-900">Aug 16, 2025</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Billing Period</p>
                <p className="text-sm font-semibold text-gray-900">Monthly</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">User Licenses</p>
                <p className="text-sm font-semibold text-gray-900">16 / 20</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <button className="w-full bg-[#605BFF] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Update Subscription
              </button>
              
              <button 
                onClick={() => setIsFeaturesModalOpen(true)}
                className="w-full bg-white text-[#605BFF] border border-[#605BFF] py-2 px-4 rounded-lg hover:bg-[#605BFF] hover:text-white transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <List className="h-4 w-4" />
                View Features
              </button>
            </div>
            
            {/* Feature Summary */}
            <div className="mt-6 p-3 bg-white border border-blue-200 rounded-lg">
              <h5 className="text-xs font-medium text-blue-900 uppercase tracking-wide mb-2">Features</h5>
              <p className="text-sm text-gray-700 mb-2">
                19 total features
              </p>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-green-600" />
                  <span className="text-green-700">15 active</span>
                </div>
                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3 text-[#FF8E1C]" />
                  <span className="text-[#FF8E1C]">4 premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6">
        <div className="border-b border-gray-200">
          <nav className="mb-1 flex space-x-8">
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

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'subscription' ? renderSubscriptionView() : renderOrderHistoryView()}
      </div>

      {/* Billing Details Modal */}
      {isModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Billing Details</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-600">Date:</p>
                <p className="text-sm font-medium text-gray-900">{selectedRecord.date}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Product:</p>
                <p className="text-sm font-medium text-gray-900">{selectedRecord.planName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">User Licences:</p>
                <p className="text-sm font-medium text-gray-900">{selectedRecord.userLicences}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Amount:</p>
                <p className="text-sm font-medium text-gray-900">{selectedRecord.amount}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Payment Method:</p>
                <p className="text-sm font-medium text-gray-900">{selectedRecord.paymentMethod}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">User Name:</p>
                <p className="text-sm font-medium text-gray-900">{selectedRecord.userName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Status:</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedRecord.status === 'Paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedRecord.status}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSendReceipt}
                className="flex-1 bg-[#605BFF] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                <Receipt size={16} className="mr-2" />
                Send Receipt
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Features Modal */}
       {isFeaturesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Features Overview</h3>
              <button
                onClick={() => setIsFeaturesModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Available Features */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Available Features (15)</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'audio-video', name: 'Audio and Video recording', description: 'Record meetings with high-quality audio and video capture. Store recordings securely in the cloud.' },
                    { id: 'transcription', name: 'Transcription', description: 'Automatic speech-to-text conversion with high accuracy. Support for multiple languages and accents.' },
                    { id: 'share', name: 'Share with Anyone', description: 'Share meeting recordings and transcripts with team members and external stakeholders easily.' },
                    { id: 'summary', name: 'Meeting Summary', description: 'AI-generated meeting summaries highlighting key points, decisions, and action items.' },
                    { id: 'notes', name: 'Meeting Notes', description: 'Intelligent note-taking with automatic formatting and organization of meeting content.' },
                    { id: 'preparation', name: 'Meeting Preparation', description: 'AI-powered meeting preparation with agenda suggestions and participant research.' },
                    { id: 'analytics', name: 'Meeting Analytics', description: 'Detailed analytics on meeting performance, participation, and outcomes.' },
                    { id: 'coaching', name: 'Advanced Coaching', description: 'AI-powered coaching insights to improve meeting performance and communication skills.' },
                    { id: 'team-coaching', name: 'Team Coaching', description: 'Team-wide coaching analytics and performance tracking for managers.' },
                    { id: 'sam', name: 'Ask SAM Anything', description: 'AI assistant for answering questions about meetings, deals, and business insights.' },
                    { id: 'followup', name: 'Follow-up Letter', description: 'Automated follow-up email generation based on meeting content and outcomes.' },
                    { id: 'deal-intel', name: 'Deal Intelligence', description: 'AI-powered deal analysis and insights to improve sales outcomes.' },
                    { id: 'crm', name: 'CRM & Dialer Integration', description: 'Seamless integration with popular CRM systems and dialer platforms.' },
                    { id: 'calendar', name: 'Calendar Integration', description: 'Sync with Google Calendar, Outlook, and other calendar providers.' },
                    { id: 'tasks', name: 'Task Management', description: 'Track and manage action items and tasks generated from meetings.' }
                  ].map((feature) => {
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
                                <Check className="h-4 w-4 text-green-600" />
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

              {/* Unavailable Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <X className="h-5 w-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900">Upgrade to Access (4)</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'simulation', name: 'Meeting Simulation', description: 'Practice meetings with AI, role-playing scenarios, and performance feedback for sales training.' },
                    { id: 'win-loss', name: 'Win-Loss Analysis', description: 'Comprehensive analysis of won and lost deals to identify patterns and improvement opportunities.' },
                    { id: 'recruiter', name: 'AI Recruiter', description: 'AI-powered recruitment tools for identifying and engaging with potential candidates.' },
                    { id: 'sdr', name: 'SDR Management', description: 'Sales development representative tools, coaching, and performance tracking for teams.' }
                  ].map((feature) => {
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
                                <Crown className="h-4 w-4 text-gray-400" />
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
                      onClick={() => setIsFeaturesModalOpen(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;