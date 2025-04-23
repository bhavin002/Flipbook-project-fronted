import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { CircleArrowDown, MailPlus, PhoneOutgoing } from "lucide-react";

export default function OrderOptions() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <MailPlus className="h-5 w-5" />  <span className="text-sm font-semibold">Send order via email</span>
                    </div>
                    <Switch
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Your customers can send their orders directly via email through Flipsnack.
                </p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <PhoneOutgoing className="h-5 w-5" />  <span className="text-sm font-semibold">WhatsApp checkout</span>
                    </div>
                    <Switch
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Your customers can send their orders to you via WhatsApp.
                </p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <CircleArrowDown className="h-5 w-5" />  <span className="text-sm font-semibold">PDF Download</span>
                    </div>
                    <Switch
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Make your PDF order list look professional by adding your company information in the text boxes below.
                </p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <CircleArrowDown className="h-5 w-5" />  <span className="text-sm font-semibold">CSV Download</span>
                    </div>
                    <Switch
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Enable the option to download the order as a CSV file.                </p>
            </div>
        </>
    )
}