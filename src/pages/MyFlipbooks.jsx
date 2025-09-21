import CreateFirstFlipbook from '@/components/AppLayoutComponents/CreateFirstFlipbook';
import { useFlipbook } from '@/context/FlipbookContext';
import Flipbooks from '@/utils/Flipbooks';
import ZeroState from '@/utils/ZeroState';

export default function MyFlipbooks({ isSidebarOpen }) {
    const { flipbooks, isLoading, isTemplateView, setFlipbooks } = useFlipbook();


    if (flipbooks.length === 0 && !isLoading && !isTemplateView) {
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