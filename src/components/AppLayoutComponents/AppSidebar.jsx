import { Sidebar, SidebarRail } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import HomeSidebarPanel from '../AppLayoutComponents/Sidebar/Home/HomeSidebarPanel';
import BrandingSidebarPanel from '../AppLayoutComponents/Sidebar/Branding/BrandingSidebarPanel';
import SettingSidebarPanel from '../AppLayoutComponents/Sidebar/Setting/SettingSidebarPanel';

export function AppSidebar() {
    const { selectedItem } = useSidebar();

    const renderPanel = () => {
        switch (selectedItem) {
            case 'home':
                return <HomeSidebarPanel />;
            case 'branding':
                return <BrandingSidebarPanel />;
            case 'settings':
                return <SettingSidebarPanel />;
            default:
                return <HomeSidebarPanel />;
        }
    };

    return (
        <Sidebar className="rounded-tr-xl overflow-hidden">
            {renderPanel()}
            <SidebarRail />
        </Sidebar>
    )
}