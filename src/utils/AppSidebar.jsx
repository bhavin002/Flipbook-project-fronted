import { Sidebar, SidebarRail } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import HomeSidebarPanel from '../components/AppLayoutComponents/Sidebar/Home/HomeSidebarPanel';
import BrandingSidebarPanel from '../components/AppLayoutComponents/Sidebar/Branding/BrandingSidebarPanel';
import SettingSidebarPanel from '../components/AppLayoutComponents/Sidebar/Setting/SettingSidebarPanel';
import TemplateSidebarPanel from '@/components/EditorLayoutComponents/Templates/TemplateSidebarPanel';
import InteractionsSidebarPanel from '@/components/EditorLayoutComponents/Interactions/InteractionsSidebarPanel';
import TextSidebarPanel from '@/components/EditorLayoutComponents/Text/TextSidebarPanel';
import UploadsSidebarPanel from '@/components/EditorLayoutComponents/Uploads/UploadsSidebarPanel';
import ElementsSidebarPanel from '@/components/EditorLayoutComponents/Elements/ElementsSidebarPanel';
import AutomationSidebarPanel from '@/components/EditorLayoutComponents/Automation/AutomationSidebarPanel';

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
            case 'templates':
                return <TemplateSidebarPanel />;
            case 'interactions':
                return <InteractionsSidebarPanel/>;
            case 'text':
                return <TextSidebarPanel />;
            case 'uploads':
                return <UploadsSidebarPanel />;
            case 'elements':
                return <ElementsSidebarPanel />;
            case 'automation':
                return <AutomationSidebarPanel />;
            default:
                return null;
        }
    };

    return (
        <Sidebar className="rounded-tr-xl overflow-hidden">
            {renderPanel()}
            <SidebarRail />
        </Sidebar>
    )
}