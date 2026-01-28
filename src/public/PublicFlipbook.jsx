import { useParams } from "react-router-dom";
import NotFound404 from "../components/ui/NotFound404";

export default function PublicFlipbook({ idOverride }) {
    const { id: paramId } = useParams();
    const id = idOverride || paramId;

    if (!id) return <NotFound404 />;

    return (
        <div className="w-full h-full relative">
            <iframe data-src={`/embed-flipbook/${id}`} width="100%" height="100%" seamless="seamless" scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true" allow="clipboard-read; clipboard-write; autoplay;" autoFocus="true" src={`/embed-flipbook/${id}`}></iframe>
        </div>
    );
}