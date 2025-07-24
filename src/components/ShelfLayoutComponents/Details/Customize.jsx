import Size from "./Embed/Size";
import EmbedCode from "./Embed/EmbedCode";
import DomainRestriction from "./Embed/DomainRestriction";
import EmbedPreview from "./Embed/EmbedPreview";

export default function Customize() {
    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Customize</h1>
                <p className="text-gray-500">Choose your width and height size, responsiveness and the page where your flipbook should start. Copy the embed code and paste it in your website.</p>
            </div>
            <div className="flex max-lg:flex-wrap gap-4">
                <div className="lg:w-[40%] w-full lg:block space-y-4 lg:h-full">
                    <Size />
                    <EmbedCode />
                    <DomainRestriction />
                </div>
                <div className="lg:w-[60%] w-full sticky top-[-22px] h-fit">
                    <EmbedPreview />
                </div>
            </div>
        </div>
    )
}