import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from "./GeneralSettings";
import OrderOptions from "./OrderOptions";
export default function ShopSettings() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full text-black hover:text-primary"
                    variant="outline"
                >
                    <CreditCard />
                    Shop settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Shop settings</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
                    <Tabs defaultValue="general">
                        <TabsList>
                            <TabsTrigger value="general">
                                General
                            </TabsTrigger>
                            <TabsTrigger value="order-options">
                                Order options
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="my-4 px-2">
                            <GeneralSettings />
                        </TabsContent>
                        <TabsContent value="order-options" className="my-4 px-2">
                            <OrderOptions />
                        </TabsContent>
                    </Tabs>
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}