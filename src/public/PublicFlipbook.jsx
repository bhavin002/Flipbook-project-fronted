import { useParams } from "react-router-dom";

export default function PublicFlipbook() {
    const { id } = useParams();

    return (
        <div className="w-full h-full relative">
            <iframe data-src={`http://localhost:5173/embed-flipbook/${id}`} width="100%" height="100%" seamless="seamless" scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true" allow="clipboard-read; clipboard-write; autoplay;" autoFocus="true" src={`http://localhost:5173/embed-flipbook/${id}`}></iframe>
        </div>
    );
}