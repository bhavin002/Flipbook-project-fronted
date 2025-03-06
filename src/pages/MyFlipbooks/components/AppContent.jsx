import HomeContent from './sidebar/home/HomeContent';
import BrandingContent from './sidebar/branding/BrandingContent';
import SettingContent from './sidebar/setting/SettingContent';
import AutomationContent from './sidebar/automation/automationContent';
import StatisticsContent from './sidebar/statistics/StatisticsContent';

export function AppContent({ selectedItem }) {

    const renderContent = () => {
        switch (selectedItem) {
            case 'home':
                return <HomeContent />;
            case 'statistics':
                return <StatisticsContent />;
            case 'automation':
                return <AutomationContent />;
            case 'branding':
                return <BrandingContent />;
            case 'settings':
                return <SettingContent />;
            default:
                return <HomeContent />;
        }
    };

    return (
        <>
            {renderContent()}
        </>
    )
}