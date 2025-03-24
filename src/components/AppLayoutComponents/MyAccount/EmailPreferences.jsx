import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function EmailPreferences() {
    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Email preferences</h1>
                <p className="text-gray-500">Uncheck the types of emails you do not want to receive.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage your notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <p className="text-md font-semibold">Newsletter</p>
                        <div className="flex items-start gap-4">
                            <Checkbox
                                id="news-letter"
                            />
                            <Label htmlFor="news-letter" className="text-sm font-medium leading-none">
                                Once a month we’ll send you an email packed with relevant content.
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-md font-semibold">Product updates</p>
                        <div className="flex items-start gap-4">
                            <Checkbox
                                id="product-updates"
                            />
                            <Label htmlFor="product-updates" className="text-sm font-medium leading-none">
                            Receive emails about important updates to our platform that will help you better engage with your readers.
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-md font-semibold">Promotions and offers</p>
                        <div className="flex items-start gap-4">
                            <Checkbox
                                id="promotions-offers"
                            />
                            <Label htmlFor="promotions-offers" className="text-sm font-medium leading-none">
                            Get occasional emails about exclusive promotions and offers that you might want to grab, such as price discounts for our plans.
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-md font-semibold">Blog</p>
                        <div className="flex items-start gap-4">
                            <Checkbox
                                id="blog"
                            />
                            <Label htmlFor="blog" className="text-sm font-medium leading-none">
                            Once a month we’ll send you an email packed with relevant content.
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-md font-semibold">Surveys and beta-testing</p>
                        <div className="flex items-start gap-4">
                            <Checkbox
                                id="surveys-beta"
                            />
                            <Label htmlFor="surveys-beta" className="text-sm font-medium leading-none">
                            We are continually working to improve our platform, so your feedback is extremely valuable to us. Get email invitations to join special campaigns about major new launches or take our surveys.
                            </Label>
                        </div>
                    </div>
                    <Button>Save changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}