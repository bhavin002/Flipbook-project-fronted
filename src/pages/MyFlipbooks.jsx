import CreateFirstFlipbook from '@/components/AppLayoutComponents/CreateFirstFlipbook';
import { useAuth } from '@/context/AuthContext';
import { useFlipbook } from '@/context/FlipbookContext';
import Flipbooks from '@/utils/Flipbooks';
import ZeroState from '@/utils/ZeroState';

export default function MyFlipbooks({ isSidebarOpen }) {
    const { flipbooks, isLoading, isTemplateView, setFlipbooks } = useFlipbook();
    const { permissions } = useAuth();

    if (permissions?.flipbookDetails === false && flipbooks.length === 0 && !isLoading && !isTemplateView) {
        return (<ZeroState
            title="Not found shared flipbooks"
            description="Once a flipbook is shared with reader, it will appear here."
        />)
    } else if (flipbooks.length === 0 && !isLoading && !isTemplateView) {
        return (
            <CreateFirstFlipbook />
        );
    } else if (flipbooks.length === 0 && !isLoading && isTemplateView) {
        return (
            <ZeroState
                title="No templates yet"
                description="Create a flipbook and save it as a template."
            />
        )
    }

    return (
        <Flipbooks
            isLoading={isLoading}
            flipbooks={flipbooks}
            isSidebarOpen={isSidebarOpen}
            view={isTemplateView ? 'template' : 'flipbook'}
            setFlipbooks={setFlipbooks}
        />
    );
}