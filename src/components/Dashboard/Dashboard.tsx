import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Target, 
  Calendar, 
  UserCheck, 
  Shield,
  Lightbulb,
  CheckCircle,
  BookOpen,  
  Settings,
  Zap,
  DollarSign,
  PieChart,
  Brain,
  Clipboard,
  Clock
} from 'lucide-react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Weekly');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const fixedDate = new Date('2024-03-31');
    const formatted = fixedDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDateTime(formatted);
  }, []);

  const timeRanges = [
    { label: 'Current', value: 'Today', description: 'Today' },
    { label: 'Daily', value: 'Daily', description: 'Last 7 days' },
    { label: 'Weekly', value: 'Weekly', description: 'Last 4 weeks' },
    { label: 'Monthly', value: 'Monthly', description: 'Last 6 months' },
    { label: 'Quarterly', value: 'Quarterly', description: 'Last 4 quarters' }
  ];
  const tenants = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
  const users = ['John Smith', 'Sarah Wilson', 'Michael Johnson', 'Lisa Chen'];

  const executiveSummaryData = [
    { metric: 'Forecasted ARR (Commit)', value: '$12.4M', notes: 'Deals tagged "Commit" by managers' },
    { metric: 'Forecasted ARR (Best Case)', value: '$8.2M', notes: 'Includes upside deals' },
    { metric: 'Forecasted ARR (SAM AI Model)', value: '$10.1M', notes: 'SAM AI-generated projection using past data' },
    { metric: 'Pipeline Coverage Ratio', value: '0.9:1', notes: 'Current pipeline / target quota' },
    { metric: 'Forecast Confidence Level', value: 'High', notes: 'Based on SAM AI + historical close accuracy' }
  ];

  const revenueTypeData = [
    { type: 'New Business', forecasted: '$5.2M', percentage: '63%', notes: 'Strong growth trajectory' },
    { type: 'Expansion', forecasted: '$2.1M', percentage: '26%', notes: 'Upsells & Cross-sells' },
    { type: 'Renewal', forecasted: '$0.9M', percentage: '11%', notes: 'Existing customer base' }
  ];

  const segmentData = [
    { segment: 'Enterprise', pipeline: '$6.8M', commit: '$4.2M', bestCase: '$5.5M', avgDeal: '$125K', winRate: '28%', cycle: '125 days' },
    { segment: 'Mid-Market', pipeline: '$3.9M', commit: '$2.8M', bestCase: '$3.2M', avgDeal: '$45K', winRate: '32%', cycle: '78 days' },
    { segment: 'Strategic', pipeline: '$1.7M', commit: '$1.2M', bestCase: '$1.4M', avgDeal: '$12K', winRate: '41%', cycle: '42 days' }
  ];

  const predictiveInsightsData = [
    { indicator: 'SAM AI Forecast Delta vs Commit', value: '+$2.8M', trend: '+0.5', commentary: 'Confidence calibration' },
    { indicator: 'Deal Slippage Rate', value: '15%', trend: '+3%', commentary: 'Measure of pushed deals' },
    { indicator: 'Average Stage Velocity (Days)', value: '23', trend: '-2%', commentary: 'Deal momentum' },
    { indicator: 'Forecast Accuracy (Last 3 Qs)', value: '94%', trend: '+6%', commentary: 'Track record consistency' },
    { indicator: 'Stalled Deals (No Move in 14+ d)', value: '34%', trend: '+6%', commentary: 'Needs inspection' }
  ];

  const forecastByRepData = [
    { ae: 'Sarah Chen', region: 'West', pipeline: '$2.1M', commit: '$1.4M', bestCase: '$1.8M', aiForecast: '$1.6M', winRate: '28%', coverage: '3.2x', riskFlags: 'Low' },
    { ae: 'Mike Johnson', region: 'East', pipeline: '$1.8M', commit: '$1.2M', bestCase: '$1.5M', aiForecast: '$1.3M', winRate: '25%', coverage: '2.8x', riskFlags: 'Medium' },
    { ae: 'Lisa Rodriguez', region: 'Central', pipeline: '$2.3M', commit: '$1.6M', bestCase: '$1.9M', aiForecast: '$1.7M', winRate: '31%', coverage: '3.5x', riskFlags: 'Low' },
    { ae: 'David Kim', region: 'West', pipeline: '$1.9M', commit: '$1.1M', bestCase: '$1.4M', aiForecast: '$1.2M', winRate: '22%', coverage: '2.4x', riskFlags: 'High' }
  ];

  const timeForecastData = [
    { month: 'January', commit: '$2.8M', bestCase: '$3.2M', aiForecast: '$3.0M', revenue: '$2.7M' },
    { month: 'February', commit: '$2.6M', bestCase: '$3.1M', aiForecast: '$2.9M', revenue: '$2.8M' },
    { month: 'March', commit: '$2.8M', bestCase: '$3.8M', aiForecast: '$3.2M', revenue: '$3.1M' }
  ];

  const cohortData = [
    { cohort: 'Q1 2024 Hires', aes: 5, months: 9, pipeline: '$285K', commit: '$190K', performance: '105% of plan' },
    { cohort: 'Q4 2023 Hires', aes: 3, months: 12, pipeline: '$420K', commit: '$315K', performance: '98% of plan' },
    { cohort: 'Q3 2023 Hires', aes: 4, months: 15, pipeline: '$510K', commit: '$385K', performance: '112% of plan' }
  ];

  const riskData = [
    { type: 'Budget Constraints', description: 'Economic uncertainty affecting spending', value: '8 deals / $2.1M' },
    { type: 'Competitive Pressure', description: 'Increased competition in enterprise segment', value: '5 deals / $1.4M' },
    { type: 'Technical Delays', description: 'Integration complexity causing delays', value: '3 deals / $890K' },
    { type: 'Champion Departure', description: 'Key contacts leaving organizations', value: '4 deals / $650K' }
  ];

  const atRiskDeals = [
    { ae: 'Mike Johnson', stage: 'Proposal', risk: 'Budget freeze' },
    { ae: 'David Kim', stage: 'Negotiation', risk: 'Competitive threat' },
    { ae: 'Sarah Chen', stage: 'Demo', risk: 'Technical concerns' },
    { ae: 'Lisa Rodriguez', stage: 'Qualification', risk: 'Champion departure' },
    { ae: 'Mike Johnson', stage: 'Proposal', risk: 'Decision delay' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm" style={{fontSize: '13px'}}>{currentDateTime}</span>
              </div>
            </div>
            
            {/* Time Range Dropdown */}
            <div className="relative">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-md px-2 py-1"
                style={{fontSize: '13px'}}
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label} - {range.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdowns */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                className="bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-md pl-2 pr-8 py-1"
                style={{fontSize: '13px'}}
              >
                <option value="">Select Team</option>
                {tenants.map(tenant => (
                  <option key={tenant} value={tenant}>{tenant}</option>
                ))}
              </select>

              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-md px-2 py-1"
                style={{fontSize: '13px'}}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div>
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'pipeline', label: 'Pipeline', icon: Target },
              { id: 'insights', label: 'Insights', icon: Lightbulb }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-[#605BFF] text-[#605BFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">            {/* Executive Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<BarChart3 className="w-6 h-6 text-[#605BFF]" /> */}
                <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-800 tracking-wide">Metric</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-800 tracking-wide">Value</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-800 tracking-wide">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {executiveSummaryData.map((row, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                          {row.metric === 'Forecasted ARR (SAM AI Model)' ? (
                            <span>
                              Forecasted ARR (<span style={{color: 'rgb(253, 126, 20)'}}>SAM AI</span>)
                            </span>
                          ) : (
                            row.metric
                          )}
                        </td>
                        <td className={`py-4 px-6 text-sm font-bold ${
                          row.metric === 'Forecasted ARR (SAM AI Model)' ? '' : 'text-[#605BFF]'
                        }`} style={row.metric === 'Forecasted ARR (SAM AI Model)' ? {color: 'rgb(253, 126, 20)'} : {}}>
                          {row.value}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Forecast Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<Target className="w-6 h-6 text-[#605BFF]" />*/}
                <h2 className="text-xl font-semibold text-gray-900">Forecast Breakdown</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Type Breakdown */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-[#605BFF]" />
                    <h3 className="text-base font-semibold text-gray-900">Revenue Type Breakdown</h3>
                  </div>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Revenue Type</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Forecasted</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">% of Total</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {revenueTypeData.map((row, index) => (
                          <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.type}</td>
                            <td className="py-4 px-6 text-sm text-[#605BFF] font-bold">{row.forecasted}</td>
                            <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.percentage}</td>
                            <td className="py-4 px-6 text-sm text-gray-700">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Forecast by Segment */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <PieChart className="w-5 h-5 text-[#605BFF]" />
                    <h3 className="text-base font-semibold text-gray-900">Forecast by Segment</h3>
                  </div>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Segment</th>
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Pipeline</th>
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Commit</th>
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Best Case</th>
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Avg Deal</th>
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Win Rate</th>
                          <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Cycle</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {segmentData.map((row, index) => (
                          <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.segment}</td>
                            <td className="py-4 px-4 text-sm text-[#605BFF] font-bold">{row.pipeline}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.commit}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.bestCase}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.avgDeal}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.winRate}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.cycle}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Insights */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<Brain className="w-6 h-6 text-[#605BFF]" />*/}
                <h2 className="text-xl font-semibold text-gray-900">Predictive Insights</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Indicator</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Value</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Trend vs Last Q</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Commentary</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {predictiveInsightsData.map((row, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                          {row.indicator === 'SAM AI Forecast Delta vs Commit' ? (
                            <span>
                              <span style={{color: 'rgb(253, 126, 20)'}}>SAM AI</span> Forecast Delta vs Commit
                            </span>
                          ) : (
                            row.indicator
                          )}
                        </td>
                        <td className={`py-4 px-6 text-sm font-bold ${
                          row.indicator === 'SAM AI Forecast Delta vs Commit' ? '' : 'text-[#605BFF]'
                        }`} style={row.indicator === 'SAM AI Forecast Delta vs Commit' ? {color: 'rgb(253, 126, 20)'} : {}}>{row.value}</td>
                        <td className="py-4 px-6 text-sm text-green-600 font-semibold">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            {row.trend}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">{row.commentary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            {/* Forecast by Rep */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<Users className="w-6 h-6 text-[#605BFF]" />*/}
                <h2 className="text-xl font-semibold text-gray-900">Forecast by Rep</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">AE Name</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Region</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Pipeline</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Commit</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Best Case</th>
                      <th className="text-left py-4 px-4 text-sm font-bold tracking-wide" style={{color: 'rgb(253, 126, 20)'}}>SAM AI</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Win Rate</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Coverage</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 tracking-wide">Risk Flags</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {forecastByRepData.map((row, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.ae}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{row.region}</td>
                        <td className="py-4 px-4 text-sm text-[#605BFF] font-bold">{row.pipeline}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.commit}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.bestCase}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.aiForecast}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.winRate}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{row.coverage}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            row.riskFlags === 'Low' ? 'bg-green-100 text-green-800' :
                            row.riskFlags === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {row.riskFlags}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Time-Based Forecast */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<Calendar className="w-6 h-6 text-[#605BFF]" />*/}
                <h2 className="text-xl font-semibold text-gray-900">Time-Based Forecast</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Month</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Commit</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Best Case</th>
                      <th className="text-left py-4 px-6 text-sm font-bold tracking-wide" style={{color: 'rgb(253, 126, 20)'}}>SAM AI</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Revenue Recognition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeForecastData.map((row, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
                        title={row.month === 'March' ? 'Current Month' : ''}
                      >
                        <td 
                          className="py-4 px-6 text-sm font-semibold"
                          style={row.month === 'March' ? {color: 'rgb(253, 126, 20)'} : {color: '#111827'}}
                        >
                          {row.month}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#605BFF] font-bold">{row.commit}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.bestCase}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.aiForecast}</td>
                        <td className="py-4 px-6 text-sm text-green-600 font-bold">{row.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rep Cohort & Ramp Performance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<UserCheck className="w-6 h-6 text-[#605BFF]" />*/}
                <h2 className="text-xl font-semibold text-gray-900">Rep Cohort & Ramp Performance</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Cohort</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide"># of AEs</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Months Since Start</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Avg Pipeline</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Commit</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Performance vs Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((row, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
                        title={row.cohort === 'Q1 2024 Hires' ? 'Current Quarter' : ''}
                      >
                        <td 
                          className="py-4 px-6 text-sm font-semibold"
                          style={row.cohort === 'Q1 2024 Hires' ? {color: 'rgb(253, 126, 20)'} : {color: '#111827'}}
                        >
                          {row.cohort}
                        </td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.aes}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.months}</td>
                        <td className="py-4 px-6 text-sm text-[#605BFF] font-bold">{row.pipeline}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.commit}</td>
                        <td className="py-4 px-6 text-sm text-green-600 font-bold">{row.performance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {/*<Shield className="w-6 h-6 text-[#605BFF]" />*/}
                <h2 className="text-xl font-semibold text-gray-900">Risk Assessment</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Risk Type</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Description</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 tracking-wide">Affected Deals/Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150">
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">{row.type}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-600">{row.description}</td>
                        <td className="py-4 px-6 text-sm text-red-600 font-bold">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* Recommendations & Action Plan */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recommendations & Action Plan</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top 5 At-Risk Deals */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-[#605BFF]" />
                    <h3 className="text-base font-semibold text-gray-900">Top 5 At-Risk Deals to Save</h3>
                  </div>
                  <div className="space-y-3">
                    {atRiskDeals.map((deal, index) => (
                      <div key={index} className="bg-white border border-red-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{deal.ae}</p>
                            <p className="text-sm text-gray-600">Stage: {deal.stage}</p>
                          </div>
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                            {deal.risk}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Recommendations */}
                <div className="space-y-6">
                  {/* Coaching Focus Areas */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-5 h-5 text-[#605BFF]" />
                      <h3 className="text-base font-semibold text-gray-900">Coaching Focus Areas</h3>
                    </div>
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#605BFF] rounded-full mt-2 flex-shrink-0"></div>
                          <span>Low conversion at stage 3</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#605BFF] rounded-full mt-2 flex-shrink-0"></div>
                          <span>AE ramp velocity improvement needed</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Process Improvements */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Settings className="w-5 h-5 text-[#605BFF]" />
                      <h3 className="text-base font-semibold text-gray-900">Process Improvements</h3>
                    </div>
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Lead scoring optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Forecast commit criteria tightening</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Next 30-Day Focus */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-5 h-5 text-[#605BFF]" />
                      <h3 className="text-base font-semibold text-gray-900">Next 30-Day Focus</h3>
                    </div>
                    <div className="bg-white border border-yellow-200 rounded-lg p-4">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Maximize win rate in $250K–$500K band</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Requalify stale opportunities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Dashboard;