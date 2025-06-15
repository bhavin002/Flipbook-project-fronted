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

export function AppSidebar({setIsEditorDrawerOpen, setMainStage, currentView, setCurrentView, mainStage, selectedIndex, stageWidth, stageHeight }) {
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
                return <TemplateSidebarPanel stageWidth={stageWidth} stageHeight={stageHeight} />;
            case 'interactions':
                return <InteractionsSidebarPanel setIsEditorDrawerOpen={setIsEditorDrawerOpen} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />;
            case 'text':
                return <TextSidebarPanel mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage}/>;
            case 'uploads':
                return <UploadsSidebarPanel mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage} setIsEditorDrawerOpen={setIsEditorDrawerOpen}/>;
            case 'elements':
                return <ElementsSidebarPanel setIsEditorDrawerOpen={setIsEditorDrawerOpen} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} currentView={currentView} setCurrentView={setCurrentView} />;
            case 'automation':
                return <AutomationSidebarPanel />;
            default:
                return null;
        }
    };

    return (
        <Sidebar className="overflow-hidden">
            {renderPanel()}
            <SidebarRail />
        </Sidebar>
    )
}