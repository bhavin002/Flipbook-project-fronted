import { useFlipbook } from '@/context/FlipbookContext';
import Flipbooks from '@/utils/Flipbooks';
import ZeroState from '@/utils/ZeroState';

export default function MyFlipbooks({ isSidebarOpen }) {
    const { flipbooks, isLoading, isTemplateView } = useFlipbook();

    if (flipbooks.length === 0 && !isLoading) {
        return (
            <ZeroState
                title="Folder is empty"
                description="Get started on your first flipbook – just click the button below!"
            />
        );
    }

    return (
        <Flipbooks 
            isLoading={isLoading} 
            flipbooks={flipbooks} 
            isSidebarOpen={isSidebarOpen} 
            view={isTemplateView ? 'template' : 'flipbook'} 
        />
    );
}