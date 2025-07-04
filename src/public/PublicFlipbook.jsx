import FlipBookPreview from "@/components/EditorLayoutComponents/Preview/Components/FlipBookPreview";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPublishFlipbookApi } from "@/service/flipbook.service";
import { FlipbookSettingsProvider } from "@/context/FlipbookSettingsProvider";
import { ShopSettingsProvider } from "@/context/ShopSettingsContext";
import { toast } from "sonner";

export default function PublicFlipbook() {
    const { id } = useParams();
    const [publicData, setPublicData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetPublishFlipbookApi(id);
                setPublicData(response.data);
            } catch (e) {
                toast.error('Failed to fetch flipbook data', {
                    description: e.message,
                });
            }
        }
        fetchData();
    }, [id]);

    return (
        publicData && <FlipbookSettingsProvider publicData={publicData}>
            <ShopSettingsProvider publicData={publicData}>
                <div className="h-[100vh] w-[100vw]">
                    <FlipBookPreview flipbookId={id} component="publicFlipbook" isPublicView={true} />
                </div>
            </ShopSettingsProvider>
        </FlipbookSettingsProvider>
    );
}