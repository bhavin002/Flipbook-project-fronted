import { useBookshelf } from "@/context/BookshelfContext";
import { EmailCustomizationProvider } from "@/context/EmailCustomizationContext";
import { GetThumbnailApi } from "@/service/flipbook.service";
import CustomizeEmail from "@/utils/SendEmail/CustomizeEmail";
import EmailClient from "@/utils/SendEmail/EmailClient";
import EmailPreview from "@/utils/SendEmail/EmailPreview";
import { useEffect, useState } from "react";

export default function SendEmail({ flipbookId }) {
    const { bookshelfSettings } = useBookshelf();

    const [isLoading, setIsLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        const getThumbnail = async () => {
            try {
                setIsLoading(true);
                const response = await GetThumbnailApi(flipbookId);
                setThumbnail(response.data.url);
            } catch (error) {
                toast.error("Error fetching thumbnail", {
                    description: error.message || "Oops! Something went wrong."
                });
            } finally {
                setIsLoading(false);
            }
        }
        if (flipbookId) {
            getThumbnail();
        }
    }, [flipbookId])

    return (
        <EmailCustomizationProvider>
            <div className="py-6 max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
                <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Send <span className="text-primary">{bookshelfSettings?.bookshelfName || "New Flipbook"}</span> by email</h1>
                    <p className="text-gray-500">Personalize your email (texts and colors) and send it using our services.</p>
                </div>
                <div className="flex max-lg:flex-wrap gap-4">
                    <div className="lg:w-[40%] w-full lg:block space-y-4 lg:h-full">
                        <CustomizeEmail flipbookId={flipbookId} thumbnail={thumbnail} component={"bookshelf"}/>
                        <EmailClient flipbookId={flipbookId} isLoading={isLoading} thumbnail={thumbnail} component={"bookshelf"} />
                    </div>
                    <div className="lg:w-[60%] w-full sticky top-[-22px] h-fit">
                        <EmailPreview flipbookId={flipbookId} isLoading={isLoading} thumbnail={thumbnail} component={"bookshelf"} />
                    </div>
                </div>
            </div>
        </EmailCustomizationProvider>
    )
}

