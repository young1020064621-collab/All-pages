import React, { useState } from 'react';
import { Check, Crown, Zap, TrendingUp, Edit3, ArrowRight, SkipForward, ChevronLeft } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showFeatureSelector, setShowFeatureSelector] = useState(true);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null);

  const availableFeatures = [
    'Meeting Intelligence',
    'Contact',
    'Task Management', 
    'SDR Management',
    'Company',
    'Meetings',
    'Calendar Integration',
    'Deal',
    'Meeting Preparation',
    'Meeting Simulation'
  ];

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
      ],
      supportedFeatures: ['Meeting Intelligence', 'Meetings']
    },
    {
      name: 'Business',
      subtitle: 'Enterprise Grade',
      price: billingCycle === 'monthly' ? 61 : 588,
      originalPrice: billingCycle === 'monthly' ? null : 854,
      icon: null,
      popular: true,
      features: [
        'Everything in AI Meeting Recorder',
        'Meeting Preparation',
        'Team Coaching',
        'Meeting Analytics',
        'CRM & Dialer Integration',
        'Task Management',
        'Calendar Integration'
      ],
      supportedFeatures: ['Meeting Intelligence', 'Contact', 'Task Management', 'Company', 'Meetings', 'Calendar Integration', 'Meeting Preparation']
    },
    {
      name: 'Enterprise',
      subtitle: 'End-to-End',
      price: billingCycle === 'monthly' ? 99 : 948,
      originalPrice: billingCycle === 'monthly' ? null : 1386,
      icon: null,
      popular: false,
      features: [
        'Everything in Revenue Intelligence',
        'Meeting Simulation',
        'Deal Intelligence',
        'Win-Loss analysis',
        'AI Recruiter',
        'SDR Management'
      ],
      supportedFeatures: ['Meeting Intelligence', 'Contact', 'Task Management', 'SDR Management', 'Company', 'Meetings', 'Calendar Integration', 'Deal', 'Meeting Preparation', 'Meeting Simulation']
    }
  ];

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const getRecommendedPlan = () => {
    if (selectedFeatures.length === 0) return null;
    
    let bestPlan = plans[0];
    let bestScore = 0;
    
    plans.forEach(plan => {
      const matchingFeatures = selectedFeatures.filter(feature => 
        plan.supportedFeatures.includes(feature)
      );
      const score = matchingFeatures.length;
      
      if (score > bestScore) {
        bestScore = score;
        bestPlan = plan;
      }
    });
    
    return bestScore > 0 ? bestPlan.name : null;
  };

  const handleContinue = () => {
    const recommended = getRecommendedPlan();
    setRecommendedPlan(recommended);
    setShowFeatureSelector(false);
  };

  const handleSkip = () => {
    setShowFeatureSelector(false);
    setRecommendedPlan(null);
  };

  const handleBack = () => {
    setShowFeatureSelector(true);
    setSelectedFeatures([]);
    setRecommendedPlan(null);
  };

  if (showFeatureSelector) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="bg-white px-6 py-4">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Plan</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What features do you need?</h2>
            <p className="text-lg text-gray-600">
              Select the features that matter most to you, and we'll recommend the best plan.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableFeatures.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    selectedFeatures.includes(feature)
                      ? 'border-[#605BFF] bg-[#605BFF]/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{feature}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedFeatures.includes(feature)
                        ? 'border-[#605BFF] bg-[#605BFF]'
                        : 'border-gray-300'
                    }`}>
                      {selectedFeatures.includes(feature) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContinue}
              disabled={selectedFeatures.length === 0}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedFeatures.length > 0
                  ? 'bg-[#605BFF] text-white hover:bg-[#5451e5] shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Get Recommendation
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            
            <button
              onClick={handleSkip}
              className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip & View All Plans
            </button>
          </div>

          {selectedFeatures.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Selected features:</strong> {selectedFeatures.join(', ')}
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Pricing</h1>
          
          {/* Additional Info in Header - Centered */}
          <div className="flex items-center justify-center">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#605BFF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Need Help? Contact Support
            </button>
          </div>
          
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Feature Selection
          </button>
        </div>
      </div>

      {/* Main Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
          {/* Recommendation Banner */}
          {recommendedPlan && (
            <div className="mb-3 py-1.5 px-3 bg-gradient-to-r from-[#605BFF]/10 to-[#605BFF]/5 rounded-md border border-[#605BFF]/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-[#605BFF] rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="ml-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Recommended for you: {recommendedPlan}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Choose Your Plan Section */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
            <p className="text-lg text-gray-600 mb-6">
              Select the perfect plan for your business needs
            </p>
            
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
              const isRecommended = recommendedPlan === plan.name;
              const isPopular = plan.popular || isRecommended;
              
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-gray-200`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg ${
                        isRecommended ? 'bg-green-500' : 'bg-[#605BFF]'
                      }`}>
                        {isRecommended ? 'Recommended' : 'Most Popular'}
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg ${
                        isRecommended ? 'bg-green-100' : isPopular ? 'bg-[#605BFF]' : 'bg-gray-100'
                      }`}>
                        <div className={isRecommended ? 'text-green-600' : isPopular ? 'text-white' : 'text-gray-600'}>
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
                        isRecommended
                          ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
                          : isPopular
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
    </div>
  );
}

export default Pricing;