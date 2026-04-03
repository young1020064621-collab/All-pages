import React, { useState } from 'react';
import { 
  Calculator, 
  Target, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Plus,
  Minus,
  Info,
  Printer,
  Mail,
  Trash2,
  Download,
  X,
  ThumbsUp
} from 'lucide-react';
import runningIcon from '../../assets/running.svg';
import './IncomeGoals.css';

interface CommissionTier {
  id: number;
  salesTarget: number;
  commissionPlan: string;
  commissionRate: number;
  total: number;
}

const IncomeGoals: React.FC = () => {
  const [desiredIncome, setDesiredIncome] = useState(120000);
  const [workingHoursPerWeek, setWorkingHoursPerWeek] = useState(200);
  const [workingWeeksPerYear, setWorkingWeeksPerYear] = useState(48);
  const [baseSalary, setBaseSalary] = useState(90261);
  const [superannuation, setSuperannuation] = useState(10380);
  const [allowance, setAllowance] = useState(116546);
  const [pensionType, setPensionType] = useState<'superannuation' | '401k'>('superannuation');

  const [commissionTiers, setCommissionTiers] = useState<CommissionTier[]>([
    { id: 1, salesTarget: 0, commissionPlan: 'Base Rate', commissionRate: 0, total: 0 },
    { id: 2, salesTarget: 0, commissionPlan: 'Accelerator Rate', commissionRate: 0, total: 0 },
    { id: 3, salesTarget: 0, commissionPlan: 'Professional Services', commissionRate: 0, total: 0 },
    { id: 4, salesTarget: 0, commissionPlan: 'Multi-Year Bonus', commissionRate: 0, total: 0 }
  ]);

  // Calculations
  const totalWorkingHoursPerYear = workingHoursPerWeek * workingWeeksPerYear;
  const totalGuaranteedIncome = baseSalary + superannuation + allowance;
  const totalOnTargetCommission = commissionTiers.reduce((sum, tier) => sum + tier.total, 0);
  const totalOnTargetEarnings = totalGuaranteedIncome + totalOnTargetCommission;
  const desiredPersonalIncomeGap = desiredIncome - totalOnTargetEarnings;
  const hourlyRateTarget = totalGuaranteedIncome / totalWorkingHoursPerYear;
  const SUPER_RATE = 0.11;
  const superOnCommission = totalOnTargetCommission * SUPER_RATE;
  
  // Calculate additional sales needed
  const baseCommissionRate = commissionTiers.find(tier => tier.commissionPlan === 'Base Rate')?.commissionRate || 0;
  const additionalSalesNeeded = baseCommissionRate > 0 && desiredPersonalIncomeGap > 0 
    ? desiredPersonalIncomeGap / (baseCommissionRate / 100) 
    : 0;

  const updateCommissionTier = (id: number, field: keyof CommissionTier, value: number | string) => {
    setCommissionTiers(prev => prev.map(tier => {
      if (tier.id === id) {
        const updated = { ...tier, [field]: value };
        if (field === 'salesTarget' || field === 'commissionRate') {
          updated.total = (updated.salesTarget * updated.commissionRate) / 100;
        }
        return updated;
      }
      return tier;
    }));
  };

  const handleSetHigherGoal = () => {
    // 找到输入框并滚动到其位置
    const earningsInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    if (earningsInput) {
      // 滚动到输入框位置
      earningsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 延迟聚焦到输入框，确保滚动完成
      setTimeout(() => {
        earningsInput.focus();
        earningsInput.select();
      }, 500);
    }
  };

  const handleClearAll = () => {
    setDesiredIncome(0);
    setWorkingHoursPerWeek(0);
    setWorkingWeeksPerYear(0);
    setBaseSalary(0);
    setSuperannuation(0);
    setAllowance(0);
    setCommissionTiers([
      { id: 1, salesTarget: 0, commissionPlan: 'Base Rate', commissionRate: 0, total: 0 },
      { id: 2, salesTarget: 0, commissionPlan: 'Accelerator Rate', commissionRate: 0, total: 0 },
      { id: 3, salesTarget: 0, commissionPlan: 'Professional Services', commissionRate: 0, total: 0 },
      { id: 4, salesTarget: 0, commissionPlan: 'Multi-Year Bonus', commissionRate: 0, total: 0 }
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Income Calculator</h1>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-gray-400 hover:text-[#605BFF] hover:bg-gray-100 rounded-lg transition-colors"
                title="Clear All"
                onClick={handleClearAll}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-[#605BFF] hover:bg-gray-100 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-[#605BFF] hover:bg-gray-100 rounded-lg transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </button>
              {/*<button 
                className="p-2 text-gray-400 hover:text-[#605BFF] hover:bg-gray-100 rounded-lg transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>*/}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            Are you focusing on activities that pay more than the minimum hourly rate for your desired income target?
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <div className="p-3 sm:p-4 lg:p-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-0 mb-8">
            {/* Left Column - Desired Personal Income and Working Hours */}
            <div className="md:col-span-2 lg:col-span-2 space-y-6">
              {/* Top Row - Combined Income and Hours Card */}
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-6">
                  {/* Combined Section with unified layout */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                      {/* Earnings per year */}
                      <div className="flex-1 sm:max-w-[350px]">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            1
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">Desired Personal Income</h2>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">
                          Earnings per year
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="number"
                            value={desiredIncome}
                            onChange={(e) => setDesiredIncome(Number(e.target.value))}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      {/* 占位符 */}
                      <div className="hidden sm:flex items-center justify-center pb-1">
                        <span className="text-2xl font-bold">&nbsp;</span>
                      </div>
                      {/* Hours Per Week */}
                      <div className="flex-1 sm:max-w-[350px]">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            2
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">Desired Working Hours</h2>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">
                          Hours Per Week
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="number"
                            value={workingHoursPerWeek}
                            onChange={(e) => setWorkingHoursPerWeek(Number(e.target.value))}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      {/* 乘号 */}
                      <div className="hidden sm:flex items-center justify-center" style={{height: '40px'}}>
                        <span className="text-2xl font-bold text-[#605BFF]">×</span>
                      </div>
                      {/* Weeks Per Year */}
                      <div className="flex-1 sm:max-w-[350px]">
                        <div className="h-12 mb-4"></div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weeks Per Year
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="number"
                            value={workingWeeksPerYear}
                            onChange={(e) => setWorkingWeeksPerYear(Number(e.target.value))}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      {/* 等号 */}
                      <div className="hidden sm:flex items-center justify-center" style={{height: '40px'}}>
                        <span className="text-2xl font-bold text-[#FF8E1C]">=</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Right Column - Total Working Hours Per Year */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="relative">
              <div className=" md:mr-0 lg:mr-14 rounded-lg bg-gray-100 p-2 flex flex-col justify-center h-24 md:mx-0 lg:mx-2 md:mt-4 lg:mt-16">
              <div className="flex items-center justify-center mb-1">
                <h3 className="text-sm font-semibold text-gray-700">Total Working Hours Per Year</h3>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold text-gray-900">
                    {totalWorkingHoursPerYear.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 ml-1">hours</div>
                </div>
                </div>
              </div>
             </div>
          </div>
        </div>

        {/* First Row: Step 3 and Income Targets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-0">
          {/* Left Column - Step 3: Guaranteed Income */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 flex flex-col" style={{minHeight: '170px'}}>
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Guaranteed Income</h2>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                {/* Base Salary */}
                <div className="flex-1 sm:max-w-[350px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={baseSalary}
                      onChange={(e) => setBaseSalary(Number(e.target.value))}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                {/* 加号 */}
                <div className="hidden sm:flex items-center justify-center" style={{marginTop: '28px'}}>
                  <span className="text-2xl font-bold text-[#605BFF]">+</span>
                </div>
                {/* Superannuation */}
                <div className="flex-1 sm:max-w-[350px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="btn-container">
                      <div className="btn-color-mode-switch">
                        <input
                          value="1"
                          id="pension_mode"
                          name="pension_mode"
                          type="checkbox"
                          checked={pensionType === '401k'}
                          onChange={(e) => setPensionType(e.target.checked ? '401k' : 'superannuation')}
                        />
                        <label
                          className="btn-color-mode-switch-inner"
                          data-off="Super"
                          data-on="401(K)"
                          htmlFor="pension_mode"
                        />
                      </div>
                    </div>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={superannuation}
                      onChange={(e) => setSuperannuation(Number(e.target.value))}
                      disabled={false}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
                {/* 加号 */}
                <div className="hidden sm:flex items-center justify-center" style={{marginTop: '28px'}}>
                  <span className="text-2xl font-bold text-[#605BFF]">+</span>
                </div>
                {/* Allowance */}
                <div className="flex-1 sm:max-w-[350px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={allowance}
                      onChange={(e) => setAllowance(Number(e.target.value))}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                {/* 等于号 */}
                <div className="hidden sm:flex items-center justify-center" style={{marginTop: '28px'}}>
                  <span className="text-2xl font-bold text-[#FF8E1C]">=</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Income Targets */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 items-center">
                {/* Income Targets */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="text-sm font-semibold text-orange-600 text-center">Income Targets</h3>
                  </div>
                  {/* Total Guaranteed Income */}
                  <div className="flex items-center justify-center sm:justify-end p-3 bg-white border-4 border-gray-200 rounded-md w-full sm:w-60 h-32">
                    <div className="text-center sm:text-right">
                      <span className="block text-sm font-semibold text-gray-900 mb-2">Total Guaranteed Income</span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${totalGuaranteedIncome.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hourly Rate Targets */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="text-sm font-semibold text-indigo-600 text-center">Hourly Rate Targets</h3>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="1"
                          strokeDasharray="75, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative text-2xl font-bold text-gray-900">
                              ${totalWorkingHoursPerYear > 0 ? Math.round(hourlyRateTarget) : 0}
                              <span className="absolute bottom-2 text-xs text-gray-500 font-normal ml-1">ph</span>
                            </div>
                          <div className="text-[10px] text-gray-500 leading-tight text-center">
                             <div>Guaranteed</div>
                             <div>Income</div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Step 4 and Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-0">
          {/* Left Column - Step 4: On-Target Commission */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="md:mr-0 lg:mr-10 bg-white rounded-lg p-4" style={{minHeight: '170px'}}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">On-Target Commission</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-2 sm:py-3 sm:px-4 font-medium text-gray-700">Id</th>
                        <th className="text-left py-2 px-2 sm:py-3 sm:px-4 font-medium text-gray-700">Sales Target</th>
                        <th className="text-left py-2 px-2 sm:py-3 sm:px-4 font-medium text-gray-700">Commission Plan</th>
                        <th className="text-center py-2 px-2 sm:py-3 sm:px-4 font-medium text-gray-700">Commission Rate</th>
                        <th className="text-left py-2 px-2 sm:py-3 sm:px-4 font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionTiers.map((tier) => (
                        <tr key={tier.id} className="hover:bg-gray-50">
                          <td className="py-2 px-2 sm:py-3 sm:px-4 text-gray-900">{tier.id}</td>
                          <td className="py-2 px-2 sm:py-3 sm:px-4">
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="number"
                                value={tier.salesTarget || ''}
                                onChange={(e) => updateCommissionTier(tier.id, 'salesTarget', Number(e.target.value) || 0)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="0"
                              />
                            </div>
                          </td>
                          <td className="py-2 px-2 sm:py-3 sm:px-4 text-gray-900">{tier.commissionPlan}</td>
                          <td className="py-2 px-2 sm:py-3 sm:px-4">
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                              <input
                                type="number"
                                value={tier.commissionRate || ''}
                                onChange={(e) => updateCommissionTier(tier.id, 'commissionRate', Number(e.target.value) || 0)}
                                className="w-16 sm:w-24 px-2 sm:px-3 py-1 sm:py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="0"
                                step="0.01"
                                min="0"
                                max="100"
                              />
                              <span className="text-gray-500">%</span>
                            </div>
                          </td>
                          <td className="py-2 px-2 sm:py-3 sm:px-4 font-medium text-gray-900">
                            ${tier.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-gray-900">Total:</td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-gray-900">
                          ${commissionTiers.reduce((sum, tier) => sum + tier.salesTarget, 0).toLocaleString()}
                        </td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4"></td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-gray-900 text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-max">
                              <span>Total On-Target Commission:</span>
                              {/* {pensionType === 'superannuation' && (
                                <span className="block text-right text-[#FF8E1C]">Super (Commission):</span>
                              )} */}
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4 font-semibold text-gray-900">
                          <div className="flex flex-col items-start space-y-1">
                            <span>${totalOnTargetCommission.toLocaleString()}</span>
                            {/* {pensionType === 'superannuation' && (
                              <span>${Math.round(superOnCommission).toLocaleString()}</span>
                            )} */}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary Cards */}
          <div className="lg:col-span-1 space-y-4 mt-10">
            {/* Total On-Target Earnings */}
            <div className="bg-white rounded-lg p-2 flex flex-col" style={{minHeight: '180px'}}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 items-center">
                {/* Total Amount */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-center sm:justify-end p-3 bg-white border-4 border-[#FF8E1C]/20 rounded-md w-full sm:w-60 h-32">
                    <div className="text-center sm:text-right">
                      <h3 className="text-sm font-semibold text-gray-900">Total On-Target Earnings</h3>
                      <span className="block text-[10px] font-medium text-gray-500 mb-1">
                        <div>Guaranteed Income</div>
                        <div>+ On Target Commission</div>
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${totalOnTargetEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hourly Rate Chart */}
                <div className="flex flex-col">
                  <div className="relative flex items-center justify-center">
                    <div className="w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="1"
                          strokeDasharray="85, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative text-2xl font-bold text-gray-900">
                             ${totalWorkingHoursPerYear > 0 ? Math.round(totalOnTargetEarnings / totalWorkingHoursPerYear) : 0}
                              <span className="absolute bottom-2 text-xs text-gray-500 font-normal ml-1">ph</span>
                           </div>
                          <div className="text-[10px] text-gray-500 leading-tight text-center">
                             <div>On Target</div>
                             <div>Earnings</div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desired Personal Income Gap */}
            <div className="bg-white rounded-lg p-2 flex flex-col" style={{minHeight: '180px'}}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 items-center">
                {/* Gap Amount */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-center sm:justify-end p-3 bg-white border-4 border-[#605BFF]/20 rounded-md w-full sm:w-60 h-32">
                    <div className="text-center sm:text-right">
                      <h3 className="text-sm font-semibold text-gray-900">Desired Personal Income Gap</h3>
                      <span className="block text-[10px] font-medium text-gray-500 mb-1">
                        <div>Desired Personal Income</div>
                        <div>- On Target Earnings</div>
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {desiredPersonalIncomeGap < 0 ? '-' : ''}${Math.abs(desiredPersonalIncomeGap).toLocaleString()}
                      </span>
                      {/*{desiredPersonalIncomeGap < 0 && (
                         <div className="text-[10px] text-gray-400 font-medium mt-1">
                           You are ahead! <button 
                             onClick={handleSetHigherGoal}
                             className="text-[#605BFF] hover:text-[#4c47ff] cursor-pointer bg-transparent border-none p-0 font-medium"
                           >
                             Set a higher personal income goal
                           </button>
                         </div>
                       )}*/}
                    </div>
                  </div>
                </div>
                
                {/* Hourly Rate Chart */}
                <div className="flex flex-col">
                  <div className="relative flex items-center justify-center">
                    <div className="w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#605BFF"
                          strokeWidth="1"
                          strokeDasharray="75, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative text-2xl font-bold text-gray-900">
                             ${totalWorkingHoursPerYear > 0 ? Math.round(desiredIncome / totalWorkingHoursPerYear) : 0}
                              <span className="absolute bottom-2 text-xs text-gray-500 font-normal ml-1">ph</span>
                           </div>
                          <div className="text-[10px] text-gray-500 leading-tight text-center">
                             <div>Desired Personal</div>
                             <div>Income</div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Sales Needed */}
            {/*<div className="bg-white rounded-lg p-2 flex flex-col" style={{minHeight: '180px'}}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 items-center">
                {/* Sales Amount */}
                {/*<div className="flex flex-col">
                  <div className="flex items-center justify-center sm:justify-end p-3 bg-white border-4 border-green-500/20 rounded-md w-full sm:w-60 h-32">
                    <div className="text-center sm:text-right">
                      <h3 className="text-sm font-semibold text-gray-900">Additional Sales Needed</h3>
                      <span className="block text-[10px] font-medium text-gray-500 mb-1">
                        <div>Income Gap ÷ Base Commission Rate</div>
                        <div>({baseCommissionRate}%)</div>
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {desiredPersonalIncomeGap > 0 && baseCommissionRate > 0 
                          ? `$${additionalSalesNeeded.toLocaleString()}` 
                          : desiredPersonalIncomeGap <= 0 
                            ? 'Goal Met!' 
                            : 'Set Base Rate'}
                      </span>
                      {desiredPersonalIncomeGap <= 0 && (
                        <div className="text-[10px] text-green-600 font-medium mt-1">
                          No additional sales needed
                        </div>
                      )}
                      {baseCommissionRate === 0 && desiredPersonalIncomeGap > 0 && (
                        <div className="text-[10px] text-gray-400 font-medium mt-1">
                          Please set Base Rate commission
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Sales Target Chart */}
                {/*<div className="flex flex-col">
                  <div className="relative flex items-center justify-center">
                    <div className="w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="1"
                          strokeDasharray="90, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative text-lg font-bold text-gray-900">
                            {desiredPersonalIncomeGap > 0 && baseCommissionRate > 0 
                              ? `$${Math.round(additionalSalesNeeded / 1000)}K` 
                              : desiredPersonalIncomeGap <= 0 
                                ? '✓' 
                                : '?'}
                          </div>
                          <div className="text-[10px] text-gray-500 leading-tight text-center">
                            <div>Additional</div>
                            <div>Sales</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
        </div>
        {/* Additional Sales Needed - Full Width Bottom Banner */}
        <div className="w-full bg-white rounded-lg p-6 mt-2 mb-2">
          <div className="flex flex-col items-center justify-center">
            {/* Integrated Header and Content */}
            <div className="flex items-center justify-center gap-8 w-full max-w-6xl">
              {/* Main Content Card */}
              <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-6">
                {/* Title and Description */}
                <div className="text-right">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Additional Sales Needed</h3>
                  <p className="text-xs text-gray-500">
                    To achieve your desired personal income
                  </p>
                  <p className="text-xs text-gray-500">
                   goal based on the commission rate ({baseCommissionRate}%)
                  </p>
                </div>
                
                {/* Main Number Display */}
                <div className="text-4xl font-bold bg-white p-2 rounded-xl text-gray-900">
                  {desiredPersonalIncomeGap > 0 && baseCommissionRate > 0 
                    ? `$${additionalSalesNeeded.toLocaleString()}` 
                    : '$0'}
                </div>
              </div>
              
              {/* Status Messages - Outside Container */}
              <div className="flex items-center gap-2">
                {desiredPersonalIncomeGap <= 0 ? (
                  <>
                    <ThumbsUp className="w-6 h-6 text-green-500" />
                    <span className="text-lg text-sm text-gray-600">You're crushing it!</span>
                  </>
                ) : baseCommissionRate > 0 ? (
                  <>
                    <img 
                      src={runningIcon} 
                      alt="Running" 
                      className="w-6 h-6" 
                    />
                    <span className="text-lg text-sm text-gray-600">Keep pushing towards your goal!</span>
                  </>
                ) : (
                  <span className="text-lg text-sm text-gray-600">Please set Base Rate commission to calculate</span>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default IncomeGoals;
