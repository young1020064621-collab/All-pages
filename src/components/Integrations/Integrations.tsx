import React from 'react';
import ZoomLogoSvg from '../../assets/zoom-logo.svg';
import GoogleCalendarLogoSvg from '../../assets/google-meet-meeting.svg';
import MicrosoftTeamsLogoSvg from '../../assets/microsoft-teams-svgrepo-com.svg';
import HubSpotLogoSvg from '../../assets/hubspot-logo.svg';
import SalesforceLogoSvg from '../../assets/salesforce-logo.svg';

interface IntegrationCardProps {
  title: string;
  icon: React.ReactNode;
  description: string | React.ReactNode;
  connected?: boolean;
  onToggle?: () => void;
  labels?: Array<{ text: string; color: string; bgColor: string }>;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#605BFF] focus:ring-offset-2 ${
        enabled ? 'bg-[#605BFF]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

// Company Logo Components
const ZoomLogo = () => (
  <img src={ZoomLogoSvg} alt="Zoom" width="24" height="24" />
);

const GoogleLogo = () => (
  <img src={GoogleCalendarLogoSvg} alt="Google Calendar" width="24" height="24" />
);

const OutlookLogo = () => (
  <img src={MicrosoftTeamsLogoSvg} alt="Microsoft Teams" width="24" height="24" />
);

const HubSpotLogo = () => (
  <img src={HubSpotLogoSvg} alt="HubSpot" width="24" height="24" />
);

const SalesforceLogo = () => (
  <img src={SalesforceLogoSvg} alt="Salesforce" width="24" height="24" />
);

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  title, 
  icon, 
  description, 
  connected = false, 
  onToggle = () => {},
  labels = []
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-[#605BFF]/30 group h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[#605BFF]/10 transition-colors duration-300">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {labels.map((label, index) => (
                  <span
                    key={index}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${label.bgColor} ${label.color}`}
                  >
                    {label.text}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <ToggleSwitch enabled={connected} onToggle={onToggle} />
      </div>
      <div className="border-b border-dotted border-gray-300 mb-4"></div>
      <div className="flex-grow space-y-3">
        {typeof description === 'string' ? (
          <>
            <p className="text-gray-600 text-sm">{description}</p>
          </>
        ) : (
          <>
            {React.Children.map(description.props.children, (child, index) => (
              <div key={index}>
                {child}
                {index < React.Children.count(description.props.children) - 1 && (
                  <div className="border-b border-dotted border-gray-300 my-3"></div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = React.useState({
    zoom: true,
    google: false,
    outlook: false,
    hubspot: false,
    salesforce: false,
  });

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 overflow-auto" style={{height: 'calc(100vh - 120px)'}}>
        {/* Calendar Integrations Section */}
        <div className="mb-10">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Conferencing</h2>
            <p className="text-sm text-gray-600 text-base max-w-4xl">
              Connect seamlessly with multiple platforms like Zoom, Outlook, and Google to enhance your workflow and collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <IntegrationCard
              title="Zoom"
             icon={<ZoomLogo />}
              description={
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    Our Zoom integration allows you to seamlessly create Zoom meetings directly within the platform and sync with your calendar.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Moreover, for those with a paid Zoom account, retrieving meeting transcripts is a breeze, making it effortless to generate meeting summaries and follow-up letters.
                  </p>
                </div>
              }
              connected={integrations.zoom}
              onToggle={() => toggleIntegration('zoom')}
            />
            <IntegrationCard
              title="Google"
              icon={<GoogleLogo />}
              description={
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    Our Google integration allows you to directly access transcripts generated from recorded Google Meets for users with paid Google accounts.
                  </p>
                  <p className="text-gray-600 text-sm">
                    It also enables Google Calendar integration to import events, allowing automatic synchronization with the calendar for seamless scheduling and organization.
                  </p>
                </div>
              }
              connected={integrations.google}
              onToggle={() => toggleIntegration('google')}
              labels={[
                { text: 'Google Meet + Calendar', color: 'text-blue-700', bgColor: 'bg-blue-100' }
              ]}
            />
            <IntegrationCard
              title="Microsoft"
              icon={<OutlookLogo />}
              description={
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    Our Microsoft integration allows you to seamlessly create Teams meetings directly within the platform and sync with your Outlook calendar.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Moreover, for those with a paid Microsoft account, retrieving meeting transcripts is straightforward, making it effortless to generate meeting summaries and follow-up letters.
                  </p>
                </div>
              }
              connected={integrations.outlook}
              onToggle={() => toggleIntegration('outlook')}
              labels={[
                { text: 'Teams + Calendar', color: 'text-blue-700', bgColor: 'bg-blue-100' }
              ]}
            />
          </div>
        </div>

        {/* CRM Integration Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">CRM</h2>
            <p className="text-sm text-gray-600 text-base max-w-4xl">
              Choose one powerful CRM integration from HubSpot or Salesforce to streamline your customer relationship management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <IntegrationCard
              title="HubSpot"
              icon={<HubSpotLogo />}
              description={
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    Our HubSpot integration allows you to directly access transcripts generated from recorded HubSpot Meets for users with paid HubSpot accounts.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Supported HubSpot Account editions for this feature: Business Standard; Business Plus; Enterprise Standard and Enterprise Plus; Teaching and Learning Upgrade and Education Plus.
                  </p>
                </div>
              }
              connected={integrations.hubspot}
              onToggle={() => toggleIntegration('hubspot')}
            />
            <IntegrationCard
              title="Salesforce"
              icon={<SalesforceLogo />}
              description={
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    Integrate your Salesforce account to seamlessly synchronize deals, companies, and contacts with our system.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Gain access to real-time updates and insights by connecting your Salesforce data with our platform. Ensure all your crucial business information is always up-to-date and easily accessible.
                  </p>
                </div>
              }
              connected={integrations.salesforce}
              onToggle={() => toggleIntegration('salesforce')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;