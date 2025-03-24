import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmailPreview() {
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
                    <p className="text-md">hopoleh620 hopoleh620 shared a flipbook with you!</p>
                </div>

                <div className="bg-gray-200 p-4">
                    <div className="flex justify-center mb-4">
                        <img src="/src/assets/logo.png" width={200} alt="Cover" />
                    </div>

                    <div className="bg-white rounded-md overflow-hidden mx-auto max-w-md">
                        <div className="py-8 bg-primary flex justify-center">
                            <img
                                width="40%"
                                className="max-w-full mx-auto"
                                src="/src/assets/page_1.jpg"
                                alt="page_1"
                            />
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-4xl text-primary mb-4">This is my masterpiece</h2>
                            <p className="text-lg text-gray-500 mb-6">
                                Take a look at this publication to see my recent work. I made this flipbook using Flipnova.
                            </p>
                            <Button>READ BOOK</Button>
                        </div>
                    </div>

                    <div className="text-gray-600 text-xs text-center mt-6">
                        Flipnova LLC - 535 Mission St. FL 14, San Francisco, CA 94105, USA
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}