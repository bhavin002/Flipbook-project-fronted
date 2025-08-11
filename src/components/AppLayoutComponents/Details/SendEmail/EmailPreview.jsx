import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEmailCustomization } from "@/context/EmailCustomizationContext";

export default function EmailPreview({ flipbookId, isLoading, thumbnail }) {
    const { emailData } = useEmailCustomization();

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-0">
                <div className="p-2 bg-gray-200 flex flex-row items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div className="py-2 px-4 bg-gray-100 border-b">
                    <p className="text-md">{emailData.subject}</p>
                </div>

                <div className="bg-gray-200 p-4" style={{ backgroundColor: emailData.backgroundColor }}>
                    <div className="flex justify-center mb-4">
                        <img src={emailData.logo} className="max-w-[200px] max-h-[100px]" alt="Logo" />
                    </div>

                    <div className="bg-white rounded-md overflow-hidden mx-auto max-w-md">
                        {isLoading ? (
                            <div className="py-8 flex justify-center" style={{ backgroundColor: emailData.accentColor }}>
                                <div className="w-[40%] h-48 bg-gray-300/50 rounded animate-pulse"></div>
                            </div>
                        ) : (
                            <a className="py-8 flex justify-center cursor-pointer" target="_blank" rel="noopener noreferrer" href={`${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`} style={{ backgroundColor: emailData.accentColor }}>
                                <img
                                    width="40%"
                                    className="max-w-full mx-auto"
                                    src={thumbnail}
                                    alt="page_1"
                                />
                            </a>
                        )}

                        <div className="p-8 text-center">
                            <h2
                                className="text-4xl mb-4"
                                style={{ color: emailData.accentColor }}
                            >
                                {emailData.title}
                            </h2>
                            <p className="text-lg text-gray-500 mb-6">
                                {emailData.description}
                            </p>
                            <a href={`${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`} target="_blank" rel="noopener noreferrer">
                                <Button
                                    style={{
                                        backgroundColor: emailData.accentColor,
                                        color: emailData.backgroundColor
                                    }}
                                >
                                    {emailData.label}
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="text-gray-600 text-xs text-center mt-6">
                        {emailData.footerDescription}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}