import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HoverParagraph from "@/components/ui/HoverParagraph";
import { BookOpenText } from 'lucide-react';
import { BookCopy } from 'lucide-react';
import { Clock } from 'lucide-react';

export default function RecentSearchTabCom() {
    return (
        <Tabs defaultValue="flipbooks" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flipbooks">
                    <BookOpenText className="w-4 h-4 mr-2" /> Flipbooks</TabsTrigger>
                <TabsTrigger value="templates">
                    <BookCopy className="w-4 h-4 mr-2" /> Templates</TabsTrigger>
            </TabsList>
            <TabsContent value="flipbooks">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Recent searches
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <HoverParagraph>
                            <Clock className="w-4 h-4 mr-2" /> Harry Potter
                        </HoverParagraph>
                        <HoverParagraph>
                            <Clock className="w-4 h-4 mr-2" />Ikigai
                        </HoverParagraph>
                        <HoverParagraph>
                            <Clock className="w-4 h-4 mr-2" /> Rich Dad Poor Dad
                        </HoverParagraph>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="templates">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Recent searches
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <HoverParagraph>
                            <Clock className="w-4 h-4 mr-2" /> Think and Grow Rich
                        </HoverParagraph>
                        <HoverParagraph>
                            <Clock className="w-4 h-4 mr-2" /> Think like a Monk
                        </HoverParagraph>
                        <HoverParagraph>
                            <Clock className="w-4 h-4 mr-2" /> The Kite Runner
                        </HoverParagraph>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}