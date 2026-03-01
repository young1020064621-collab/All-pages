import React, { useState } from 'react';
import { Filter, Eye, Calendar, Clock, User, Users, BarChart3, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, PieChart as PieChartIcon, BarChart2, X, AlertTriangle, Target, Activity, CalendarCheck, CalendarX, CalendarDays, UserCheck, CheckCircle, Mic } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardMeetingFilter from '../Calls/DashboardMeetingFilter';
import DashboardTaskFilterPopup from '../Calls/DashboardTaskFilterPopup';

const IFSDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Weekly');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [meetingsCurrentPage, setMeetingsCurrentPage] = useState(1);
  const [coachingCurrentPage, setCoachingCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  // Filter popup states
  const [showMeetingsFilter, setShowMeetingsFilter] = useState(false);
  const [showCoachingFilter, setShowCoachingFilter] = useState(false);
  
  // Filter handlers
  const handleMeetingsFilterClick = () => {
    setShowMeetingsFilter(true);
  };
  
  const handleCoachingFilterClick = () => {
    setShowCoachingFilter(true);
  };
  
  const handleCloseMeetingsFilter = () => {
    setShowMeetingsFilter(false);
  };
  
  const handleCloseCoachingFilter = () => {
    setShowCoachingFilter(false);
  };

  // Fixed date display
  const currentDateTime = 'Sunday, March 31, 2024';

  const timeRanges = [
    { label: 'Current', value: 'Today', description: 'Today' },
    { label: 'Daily', value: 'Daily', description: 'Last 7 days' },
    { label: 'Weekly', value: 'Weekly', description: 'Last 4 weeks' },
    { label: 'Monthly', value: 'Monthly', description: 'Last 6 months' },
    { label: 'Quarterly', value: 'Quarterly', description: 'Last 4 quarters' }
  ];
  const tenants = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
  const users = ['John Smith', 'Sarah Wilson', 'Michael Johnson', 'Lisa Chen'];

  // Bar chart data
  const appointmentsData = [
    { name: 'Week 1', value: 21 },
    { name: 'Week 2', value: 27 },
    { name: 'Week 3', value: 31 },
    { name: 'Week 4', value: 22 }
  ];

  const meetingsRecordedData = [
    { name: 'Week 1', value: 8 },
    { name: 'Week 2', value: 14 },
    { name: 'Week 3', value: 11 },
    { name: 'Week 4', value:21 }
  ];

  const dealsWonData = [
    { name: 'Week 1', value: 7 },
    { name: 'Week 2', value: 9 },
    { name: 'Week 3', value: 6 },
    { name: 'Week 4', value: 10 }
  ];

  const dealsLostData = [
    { name: 'Week 1', value: 2 },
    { name: 'Week 2', value: 3 },
    { name: 'Week 3', value: 1 },
    { name: 'Week 4', value: 4 }
  ];

  // Pie chart data
  const meetingsStatusData = [
    { name: 'Won', value: 30, color: '#34D399' },
    { name: 'Lost', value: 25, color: '#F87171' },
    { name: 'Follow-up', value: 45, color: '#FBBF24' }
  ];

  const topWinLossReasons = [
  { name: "Pricing", value: 30, type: "win" },
  { name: "Quality", value: 25, type: "win" },
  { name: "Service", value: 12, type: "win" },
  { name: "Wife", value: 16, type: "loss" },
  { name: "Budget", value: 11, type: "loss" },
  { name: "Timing", value: 3, type: "loss" }
];

  const winReasons = topWinLossReasons.filter(item => item.type === "win");
  const lossReasons = topWinLossReasons.filter(item => item.type === "loss");

  const chartData = [
  ...winReasons.map(item => ({ name: item.name, win: item.value })),
  ...lossReasons.map(item => ({ name: item.name, loss: item.value })),
];

  // Table data
  const meetingsData = [
    { id: 1, name: 'John Smith', subject: 'Product Demo - Acme Corp', date: '2024-01-20', duration: '45 min' },
    { id: 2, name: 'Michael Johnson', subject: 'Discovery Call - TechStart', date: '2024-01-19', duration: '30 min' },
    { id: 3, name: 'Sarah Wilson', subject: 'Negotiation - Global Solutions', date: '2024-01-18', duration: '60 min' },
    { id: 4, name: 'John Smith', subject: 'Follow-up - Innovation Labs', date: '2024-01-17', duration: '25 min' },
    { id: 5, name: 'Lisa Chen', subject: 'Technical Review - StartupXYZ', date: '2024-01-16', duration: '40 min' },
    { id: 6, name: 'John Smith', subject: 'Contract Discussion - MegaCorp', date: '2024-01-15', duration: '55 min' },
    { id: 7, name: 'John Smith', subject: 'Demo Follow-up - TechCorp', date: '2024-01-14', duration: '35 min' }
  ];

  const coachingData = [
    { id: 1, name: 'John Smith', subject: 'Sales Technique Review', date: '2024-01-22', duration: '30 min' },
    { id: 2, name: 'Michael Johnson', subject: 'Objection Handling Training', date: '2024-01-23', duration: '45 min' },
    { id: 3, name: 'Sarah Wilson', subject: 'Closing Strategies Workshop', date: '2024-01-24', duration: '60 min' },
    { id: 4, name: 'John Smith', subject: 'Pipeline Review Session', date: '2024-01-25', duration: '40 min' },
    { id: 5, name: 'Lisa Chen', subject: 'Presentation Skills Training', date: '2024-01-26', duration: '50 min' },
    { id: 6, name: 'Lisa Chen', subject: 'Customer Relationship Management', date: '2024-01-27', duration: '45 min' },
    { id: 7, name: 'Sarah Wilson', subject: 'Negotiation Tactics Workshop', date: '2024-01-28', duration: '55 min' }
  ];

  // Pagination logic
  const getMeetingsPaginatedData = () => {
    const startIndex = (meetingsCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return meetingsData.slice(startIndex, endIndex);
  };

  const getCoachingPaginatedData = () => {
    const startIndex = (coachingCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return coachingData.slice(startIndex, endIndex);
  };

  const meetingsTotalPages = Math.ceil(meetingsData.length / itemsPerPage);
  const coachingTotalPages = Math.ceil(coachingData.length / itemsPerPage);


  const BarChartComponent = ({ data, color, title, percentage }: { data: any[], color: string, title: string, percentage: number }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 pb-2 flex-grow">
        {/* 标题和趋势 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {title === 'Deals Won' && <TrendingUp className="w-6 h-6" style={{ color: color }} />}
            {title === 'MeetingsMeetings Completed' && <CheckCircle className="w-6 h-6" style={{ color: color }} />}
            {title === 'Meetings Recorded' && <Mic className="w-6 h-6" style={{ color: color }} />}
            {title === 'Deals Lost' && <Target className="w-6 h-6" style={{ color: color }} />}
            <p className="text-lg font-semibold text-gray-900">{title}</p>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-sm font-semibold text-green-600">+12%</p>
          </div>
        </div>
        
        {/* 描述 */}
        <div className="mb-3">
          {title === 'Deals Won' && (
            <p className="text-sm text-gray-500">Total deals won in last 4 weeks</p>
          )}
          {title === 'Meetings Completed' && (
            <p className="text-sm text-gray-500">Total meetings completed in last 4 weeks</p>
          )}
          {title === 'Meetings Recorded' && (
            <p className="text-sm text-gray-500">Total meetings recorded in last 4 weeks</p>
          )}
        </div>
        
        {/* 数字 */}
        <div className="mb-2">
          <h4 className="text-3xl font-semibold text-gray-900">{data.reduce((sum, item) => sum + item.value, 0)}</h4>
        </div>
        
        {/* 占比 */}
        <div>
          {title === 'Meetings Completed' && (
            <p className="text-base text-gray-500">{percentage}% of meetings booked</p>
          )}
          {title === 'Meetings Recorded' && (
            <p className="text-base text-gray-500">{percentage}% of meetings completed</p>
          )}
        </div>
      </div>
      <div className="px-4 pt-2 pb-1">
        <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data}>
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#64748b' }}
          />
          <YAxis hide />
          <Bar 
            dataKey="value" 
            fill={color} 
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );

  const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-[#605BFF]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );

  const PaginationComponent = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalItems, 
    itemsPerPage 
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
  }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === page
                  ? 'text-[#605BFF] font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Total: {totalItems}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
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

            {/* Alternative: Button Group Style (commented out) */}
            {/* <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedTimeRange === range.value
                      ? 'bg-[#605BFF] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div> */}

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

      {/* Body */}
      <main className="p-6 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto bg-white">
        {/* First Row - Deals Won, Meeting Status, Appointments Completed, Meetings Recorded */}
        <div className="grid grid-cols-4 gap-2">
          {/* Deals Won Card */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="p-4 pb-2 flex-grow">
              {/* 标题和趋势 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6" style={{ color: '#34D399' }} />
                  <p className="text-lg font-semibold text-gray-900">Deals Won</p>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-semibold text-green-600">+12%</p>
                </div>
              </div>
              
              {/* 描述 */}
              <div className="mb-3">
                <p className="text-sm text-gray-500">Total deals won in last 4 weeks</p>
              </div>
              
              {/* 数字 */}
              <div className="mb-2">
                <h4 className="text-3xl font-semibold text-gray-900">{dealsWonData.reduce((sum, item) => sum + item.value, 0)}</h4>
              </div>
              
              {/* 最高win次数的deal名字 */}
              <div>
                <p className="text-base text-gray-500">Top deal: Service Renewal</p>
              </div>
            </div>
            <div className="px-4 pt-2 pb-1">
              <ResponsiveContainer width="100%" height={140}>
              <BarChart data={dealsWonData}>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="value" 
                  fill="#34D399" 
                  radius={[2, 2, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
          
          {/* Meetings Status Pie Chart */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="p-4 pb-2">
              {/* 标题和趋势 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-blue-500" />
                  <p className="text-lg font-semibold text-gray-900">Win Rate</p>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-semibold text-green-600">+8%</p>
                </div>
              </div>
            </div>
            
            {/* 左中右三列布局 - 相对定位容器 */}
            <div className="flex-grow flex px-4 pb-4 relative">
              {/* 左侧容器 - 30%数字 - 绝对定位 */}
              <div className="absolute left-4 top-6 z-30 w-16">
                <h4 className="text-3xl font-semibold text-gray-900">30%</h4>
              </div>
              
              {/* 右侧容器 - 空白 - 绝对定位 */}
              <div className="absolute right-4 top-6 z-10 w-16">
                {/* 空白区域 */}
              </div>
              
              {/* 中间容器 - 环状图 - 占满整个宽度 */}
              <div className="w-full flex flex-col justify-center items-center relative z-20">
              <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Pie
                  data={meetingsStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {meetingsStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
                <div className="flex justify-center space-x-1 mt-2 flex-wrap">
                  {meetingsStatusData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">{item.name} {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <BarChartComponent data={appointmentsData} color="#60A5FA" title="Meetings Completed" percentage={Math.round((appointmentsData.reduce((sum, item) => sum + item.value, 0) / 136) * 100)}/>
          <BarChartComponent data={meetingsRecordedData} color="#FBBF24" title="Meetings Recorded" percentage={Math.round((meetingsRecordedData.reduce((sum, item) => sum + item.value, 0) / appointmentsData.reduce((sum, item) => sum + item.value, 0)) * 100)} />
        </div>

        {/* Second Row - Won/Loss Summary, Deals Lost, Empty1, Empty2 */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {/* Won/Loss Summary */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Win/Loss Insights</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-semibold text-green-600 mb-0">+5%</p>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Win Chart */}
                 <div>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={winReasons} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Tooltip 
                        formatter={(value, name) => [value, 'Won']}
                        labelFormatter={(label) => `${label}`}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        height={25}
                      />
                      <YAxis hide />
                      <Bar 
                        dataKey="value" 
                        fill="#34D399" 
                        radius={[2, 2, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                   <div className="flex items-center justify-center space-x-2 mt-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#34D399' }}></div>
                     <span className="text-xs text-gray-600">Won</span>
                   </div>
                </div>
                
                {/* Loss Chart */}
                 <div>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={lossReasons} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Tooltip 
                        formatter={(value, name) => [value, 'Lost']}
                        labelFormatter={(label) => `${label}`}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        height={25}
                      />
                      <YAxis hide />
                      <Bar 
                        dataKey="value" 
                        fill="#F87171" 
                        radius={[2, 2, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                   <div className="flex items-center justify-center space-x-2 mt-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F87171' }}></div>
                     <span className="text-xs text-gray-600">Lost</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Meeting Booked Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* 标题和趋势 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <CalendarCheck className="w-6 h-6 text-green-500" />
                <p className="text-lg font-semibold text-gray-900">Meetings Booked</p>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">+15%</span>
              </div>
            </div>
            
            {/* 描述 */}
            <div className="mb-3 h-10 flex items-start">
              <p className="text-sm text-gray-500">Number of meetings scheduled</p>
            </div>
            
            {/* 数字 */}
            <div className="mb-2">
              <h4 className="text-3xl font-semibold text-gray-900">136</h4>
            </div>
          </div>
          
          {/* Meeting Cancelled Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* 标题和趋势 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <CalendarX className="w-6 h-6 text-red-500" />
                <p className="text-lg font-semibold text-gray-900">Meetings Cancelled</p>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">+3%</span>
              </div>
            </div>
            
            {/* 描述 */}
            <div className="mb-3 h-10 flex items-start">
              <p className="text-sm text-gray-500">Number of scheduled meetings cancelled</p>
            </div>
            
            {/* 数字 */}
            <div className="mb-2">
              <h4 className="text-3xl font-semibold text-gray-900">18</h4>
            </div>
            
            {/* 占比 */}
            <div>
              <p className="text-base text-gray-500">13% of meetings booked</p>
            </div>
          </div>
          
          {/* Meeting No-Show Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* 标题和趋势 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <CalendarDays className="w-6 h-6 text-orange-500" />
                <p className="text-lg font-semibold text-gray-900">Meetings No-Show</p>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDown className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600">-2%</span>
              </div>
            </div>
            
            {/* 描述 */}
            <div className="mb-3 h-10 flex items-start">
              <p className="text-sm text-gray-500">Meetings where prospect didn't show up</p>
            </div>
            
            {/* 数字 */}
            <div className="mb-2">
              <h4 className="text-3xl font-semibold text-gray-900">8</h4>
            </div>
            
            {/* 占比 */}
            <div>
              <p className="text-base text-gray-500">6% of meetings booked</p>
            </div>
          </div>
        </div>

        {/* Third Row - Meeting No-Show */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Meetings Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-[#605BFF]" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Meetings</p>
                </div>
              </div>
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 px-3 py-1 text-[#FF8E1C] rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={handleMeetingsFilterClick}
                >
                  <Filter className="w-4 h-4" />
                </button>
                {showMeetingsFilter && (
                  <DashboardMeetingFilter
                    isOpen={showMeetingsFilter}
                    onClose={handleCloseMeetingsFilter}
                    onApply={(filters) => {
                      console.log('Applied filters:', filters);
                      setShowMeetingsFilter(false);
                    }}
                    onClear={() => {
                      console.log('Cleared filters');
                    }}
                  />
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getMeetingsPaginatedData().map((meeting) => (
                    <tr key={meeting.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-2 text-sm text-gray-900">{meeting.name}</td>
                      <td className="py-2 px-2 text-sm text-gray-900">{meeting.subject}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">{meeting.date}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">{meeting.duration}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">
                        <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-transparent rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationComponent
                currentPage={meetingsCurrentPage}
                totalPages={meetingsTotalPages}
                onPageChange={setMeetingsCurrentPage}
                totalItems={meetingsData.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>

          {/* Coaching Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-3">
                <UserCheck className="w-6 h-6 text-[#605BFF]" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Coaching</p>
                </div>
              </div>
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 px-3 py-1 text-[#FF8E1C] rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={handleCoachingFilterClick}
                >
                  <Filter className="w-4 h-4" />
                </button>
                {showCoachingFilter && (
                  <DashboardTaskFilterPopup
                    isOpen={showCoachingFilter}
                    onClose={handleCloseCoachingFilter}
                    onApply={(filters) => {
                      console.log('Applied filters:', filters);
                      setShowCoachingFilter(false);
                    }}
                    onClear={() => {
                      console.log('Cleared filters');
                    }}
                  />
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getCoachingPaginatedData().map((coaching) => (
                    <tr key={coaching.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-2 text-sm text-gray-900">{coaching.name}</td>
                      <td className="py-2 px-2 text-sm text-gray-900">{coaching.subject}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">{coaching.date}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">{coaching.duration}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">
                        <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-transparent rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationComponent
                currentPage={coachingCurrentPage}
                totalPages={coachingTotalPages}
                onPageChange={setCoachingCurrentPage}
                totalItems={coachingData.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IFSDashboard;