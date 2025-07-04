import FlipBookPreview from "@/components/EditorLayoutComponents/Preview/Components/FlipBookPreview";
import { useParams } from "react-router-dom";

export default function PublicFlipbook() {
    const { id } = useParams();
    return (
        <div className="h-[100vh] w-[100vw]">
            <FlipBookPreview flipbookId={id} component="publicFlipbook" isPublicView={true} />
        </div>
    );
}