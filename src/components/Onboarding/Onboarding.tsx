import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Chrome, 
  Smartphone, 
  Play, 
  Settings, 
  Calendar, 
  FileText, 
  Users, 
  Target,
  ArrowRight,
  User,
  Edit,
  Lock,
  X
} from 'lucide-react';
import ChromeIcon from '../../assets/chrome-icon.svg';
import EdgeIcon from '../../assets/edge-icon.svg';
import GooglePlayIcon from '../../assets/google-play-icon.svg';
import AppleAppStoreIcon from '../../assets/apple-app-store-icon.svg';
import ZoomLogo from '../../assets/zoom-logo.svg';
import GoogleCalendarLogo from '../../assets/google-calendar-logo.svg';
import MicrosoftTeamsLogo from '../../assets/microsoft-teams-logo.svg';
import SalesforceLogo from '../../assets/salesforce-logo.svg';
import HubspotLogo from '../../assets/hubspot-logo.svg';

interface OnboardingStep {
  id: number;
  title: string;
  //description: string;
  isCompleted: boolean;
  isExpanded: boolean;
  content: React.ReactNode;
}

const Onboarding: React.FC = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrType, setQRType] = useState<'playstore' | 'appstore' | null>(null);

  const handleQRClick = (type: 'playstore' | 'appstore') => {
    setQRType(type);
    setShowQRModal(true);
  };

  const closeQRModal = () => {
    setShowQRModal(false);
    setQRType(null);
  };

  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: "Download SAM's Meeting Recorder",
      isCompleted: false,
      isExpanded: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed w-full">
              Effortlessly capture every key interaction with the SAM Chrome Extension, SAM Mobile Apps. <br />Record, transcribe, and summarize meetings with actionable insights in 101 languages, even if you're not the organizer. No meeting bot needed.
            </p>
            <div className="flex flex-wrap gap-3">
                <button className="flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                  <Play className="w-4 h-4 mr-2 text-[#F5A623]" />
                  <span>Watch Demo</span>
                </button>
                <button className="flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                  <img src={ChromeIcon} alt="Chrome" className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Chrome Extension</span>
                </button>
                <button className="flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                  <img src={EdgeIcon} alt="Edge" className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Edge Extension</span>
                </button>
                <button 
                  onClick={() => handleQRClick('playstore')}
                  className="flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
                >
                  <img src={GooglePlayIcon} alt="Google Play" className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Play Store</span>
                </button>
                <button 
                  onClick={() => handleQRClick('appstore')}
                  className="flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
                >
                  <img src={AppleAppStoreIcon} alt="Apple App Store" className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Apple Store</span>
                </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Integrate with your favorite tools",
      isCompleted: false,
      isExpanded: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed w-full">
              Connect SAM with your existing workflow for seamless productivity. Integrate SAM with Zoom, Google Meet, and Microsoft Teams to automatically 
              capture meeting transcripts. Enhance your workflow by connecting SAM with 
              HubSpot, Salesforce, Google Calendar, and Outlook for a unified CRM and 
              calendar experience.
            </p>
            <p className="text-sm text-gray-500 w-full">
              After completing Step 1 and Step 2, you can launch your meetings directly 
              from the SAM Chrome Extension.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <img src={ZoomLogo} alt="Zoom" className="w-8 h-8" />
              <img src={GoogleCalendarLogo} alt="Google Calendar" className="w-8 h-8" />
              <img src={MicrosoftTeamsLogo} alt="Microsoft Teams" className="w-8 h-8" />
              <img src={SalesforceLogo} alt="Salesforce" className="w-8 h-8" />
              <img src={HubspotLogo} alt="HubSpot" className="w-8 h-8" />
            </div>
            <div className="flex justify-start gap-3">
              <button className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                <Play className="w-4 h-4 mr-2 text-[#F5A623]" />
                Watch Demo
              </button>
              <button 
                onClick={() => markStepAsCompleted(2)}
                className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
              >
                Let's Integrate
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Unlock Meeting Intelligence",
      isCompleted: false,
      isExpanded: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed w-full">
              Get AI-powered insights and summaries from your meetings. After completing Step 2, SAM will automatically capture meeting transcripts 
              from the paid versions of Zoom, Google Meet, and Microsoft Teams. 
              Alternatively, you can upload a transcript, audio, or video file to unlock 
              the full potential of SAM's Meeting Intelligence: Get Enterprise-Grade Meeting 
              Summaries, Follow-Ups and Coaching in One Click!
            </p>
            <div className="flex justify-start gap-3">
              <button className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                <Play className="w-4 h-4 mr-2 text-[#F5A623]" />
                Watch Demo
              </button>
              <button 
                onClick={() => markStepAsCompleted(3)}
                className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
              >
                Create or Add Transcript
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Manage Meeting Transcripts",
      isCompleted: false,
      isExpanded: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed w-full">
              Access and organize all your meeting transcripts in one place. Easily access your transcript history and manage all transcripts from multiple 
              integrated online meeting platforms in one convenient, centralized location.
            </p>
            <div className="flex justify-start gap-3">
              <button className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                <Play className="w-4 h-4 mr-2 text-[#F5A623]" />
                Watch Demo
              </button>
              <button 
                onClick={() => markStepAsCompleted(4)}
                className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
              >
                View Transcripts
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Access Meeting List and Calendar",
      isCompleted: false,
      isExpanded: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed w-full">
              Stay organized with integrated calendar and meeting management. View all your upcoming meetings in SAM. With automatic synchronization to 
              your Outlook and Google calendars, SAM keeps you organized and focused 
              on what truly matters.
            </p>
            <div className="flex justify-start gap-3">
              <button className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                <Play className="w-4 h-4 mr-2 text-[#F5A623]" />
                Watch Demo
              </button>
              <button 
                onClick={() => markStepAsCompleted(5)}
                className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
              >
                Explore
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Optimize Meeting Preparation",
      isCompleted: false,
      isExpanded: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed w-full">
              Prepare more effectively with AI-powered meeting insights. SAM's meeting preparation helps you prepare more thoroughly for client 
              meetings by providing persona-based discussion points and qualification 
              questions to assess the likelihood of deal success.
            </p>
            <div className="flex justify-start gap-3">
              <button className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap">
                <Play className="w-4 h-4 mr-2 text-[#F5A623]" />
                Watch Demo
              </button>
              <button 
                onClick={() => markStepAsCompleted(6)}
                className="inline-flex items-center px-4 py-2 text-sm bg-white border border-[#8b87ff] text-[#605bff] rounded-lg hover:bg-[#605bff] hover:text-white transition-colors whitespace-nowrap"
              >
                Prepare
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]);

  const toggleStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, isExpanded: !step.isExpanded }
        : step
    ));
  };

  const markStepAsCompleted = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, isCompleted: true }
        : step
    ));
  };

  const completedSteps = steps.filter(step => step.isCompleted).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {qrType === 'playstore' ? 'Download from Play Store' : 'Download from App Store'}
              </h3>
              <button 
                onClick={closeQRModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center">
              <div className="rounded-lg p-8 mb-4">
                <svg 
                  width="200" 
                  height="200" 
                  viewBox="0 0 200 200" 
                  className="mx-auto"
                >
                  {/* Sample QR Code Pattern */}
                  <rect width="200" height="200" fill="white" />
                  <g fill="black">
                    {/* Corner squares */}
                    <rect x="10" y="10" width="60" height="60" />
                    <rect x="130" y="10" width="60" height="60" />
                    <rect x="10" y="130" width="60" height="60" />
                    
                    {/* Inner corner squares */}
                    <rect x="20" y="20" width="40" height="40" fill="white" />
                    <rect x="140" y="20" width="40" height="40" fill="white" />
                    <rect x="20" y="140" width="40" height="40" fill="white" />
                    
                    <rect x="30" y="30" width="20" height="20" />
                    <rect x="150" y="30" width="20" height="20" />
                    <rect x="30" y="150" width="20" height="20" />
                    
                    {/* Sample data pattern */}
                    <rect x="90" y="20" width="10" height="10" />
                    <rect x="110" y="20" width="10" height="10" />
                    <rect x="80" y="30" width="10" height="10" />
                    <rect x="100" y="30" width="10" height="10" />
                    <rect x="120" y="30" width="10" height="10" />
                    <rect x="90" y="40" width="10" height="10" />
                    <rect x="110" y="40" width="10" height="10" />
                    
                    {/* More sample patterns */}
                    <rect x="80" y="80" width="10" height="10" />
                    <rect x="100" y="80" width="10" height="10" />
                    <rect x="120" y="80" width="10" height="10" />
                    <rect x="90" y="90" width="10" height="10" />
                    <rect x="110" y="90" width="10" height="10" />
                    <rect x="80" y="100" width="10" height="10" />
                    <rect x="100" y="100" width="10" height="10" />
                    <rect x="120" y="100" width="10" height="10" />
                    
                    <rect x="80" y="160" width="10" height="10" />
                    <rect x="100" y="160" width="10" height="10" />
                    <rect x="120" y="160" width="10" height="10" />
                    <rect x="90" y="170" width="10" height="10" />
                    <rect x="110" y="170" width="10" height="10" />
                    <rect x="80" y="180" width="10" height="10" />
                    <rect x="100" y="180" width="10" height="10" />
                    <rect x="120" y="180" width="10" height="10" />
                  </g>
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Scan this QR code with your mobile device to download the SAM app from the {qrType === 'playstore' ? 'Google Play Store' : 'Apple App Store'}.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                *This is a sample QR code for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Onboarding</h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Welcome to SAM! This onboarding guide will help you master key features to qualify deals effectively, 
            focus on high-priority opportunities, and close more deals faster. Let's get started!
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-2">


        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 mb-8 w-1/2 mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-gray-900">Your Progress</h3>
            <span className="text-sm font-medium text-gray-600">
              {completedSteps} of {steps.length} steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#605BFF] h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {progressPercentage === 100 ? "Congratulations! You've completed all steps." : `${Math.round(progressPercentage)}% complete`}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {/* Onboarding Steps */}
          <div className="space-y-4 mb-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg border border-gray-200">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {step.id}
                        </div>
                      </div>
                      {step.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      {/*<p className="text-gray-600 mt-1">{step.description}</p>*/}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!step.isCompleted && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          markStepAsCompleted(step.id);
                        }}
                        className="flex items-center gap-2 text-sm text-[#605bff] cursor-pointer hover:text-[#4c47d9] transition-colors mr-4"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as Complete
                      </div>
                    )}
                    {step.isCompleted && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                    {step.isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {step.isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {step.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

          {/* Completion Section - Only show when all steps are completed */}
          {progressPercentage === 100 && (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You are all set!</h2>
                <p className="text-gray-600 mb-6">You are ready to use SAM. Enjoy!</p>
                <p className="text-sm text-gray-500 mb-6">
                  If you want to come back to this page later and re-play tutorials, you can find it in the profile dropdown.
                </p>
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-2 text-white rounded-lg hover:opacity-90 transition-colors font-medium" style={{ backgroundColor: '#605bff' }}>
                  Let's go!
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
