import { useBookshelf } from "@/context/BookshelfContext";
import CustomizeEmail from "./SendEmail/CustomizeEmail";
import EmailClient from "./SendEmail/EmailClient";
import EmailPreview from "./SendEmail/EmailPreview";
import { EmailCustomizationProvider } from "@/context/EmailCustomizationContext";

export default function SendEmail({flipbookId}) {
    const { bookshelfSettings } = useBookshelf();

    return (
        <EmailCustomizationProvider>
            <div className="py-6 max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
                <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Send <span className="text-primary">{bookshelfSettings?.bookshelfName || "New Flipbook"}</span> by email</h1>
                    <p className="text-gray-500">Personalize your email (texts and colors) and send it using our services.</p>
                </div>
                <div className="flex max-lg:flex-wrap gap-4">
                    <div className="lg:w-[40%] w-full lg:block space-y-4 lg:h-full">
                        <CustomizeEmail />
                        <EmailClient flipbookId={flipbookId} />
                    </div>
                    <div className="lg:w-[60%] w-full sticky top-[-22px] h-fit">
                        <EmailPreview flipbookId={flipbookId}/>
                    </div>
                </div>
            </div>
        </EmailCustomizationProvider>
    )
}

