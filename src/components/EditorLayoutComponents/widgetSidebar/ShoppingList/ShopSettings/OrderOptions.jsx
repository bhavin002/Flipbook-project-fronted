import { Label } from "@/components/ui/label";
import { Info, MailPlus, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SelectLogoDialog from "@/components/AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";
import { useState } from "react";

export default function OrderOptions({ form, clearErrors, errors }) {
    const [workspaceLogo, setWorkspaceLogo] = useState(null);
    const [pdfLogo, setPdfLogo] = useState(null);
    const [isLogoLoading, setIsLogoLoading] = useState(false);

    const handleLogoSelect = (logo, type) => {
        if (type === "workspace") {
            setWorkspaceLogo(logo);
            form.setValue("workspaceLogoId", logo?.id || "");
        } else {
            setPdfLogo(logo);
            form.setValue("pdfLogoId", logo?.id || "");
        }
    };

    const handleLogoDelete = async (type) => {
        try {
            setIsLogoLoading(true);
            if (type === "workspace") {
                setWorkspaceLogo(null);
                form.setValue("workspaceLogoId", "");
            } else {
                setPdfLogo(null);
                form.setValue("pdfLogoId", "");
            }
        } catch (error) {
            toast.error(`Failed to remove ${type} logo`, {
                description: error.message || "Something went wrong",
            });
        } finally {
            setIsLogoLoading(false);
        }
    };

    const handleEmailCheckoutChange = (checked) => {
        clearErrors(["checkoutButtonLabel", "notificationMessageInternal", "notificationMessageCustomer"]);
        form.setValue("emailCheckout", checked);
        if (checked) {
            form.setValue("checkoutButtonLabel", "Place Order");
            form.setValue("notificationMessageInternal", "A new order has been placed.");
            form.setValue("notificationMessageCustomer", "Thank you for your purchase!");
        } else {
            form.setValue("checkoutButtonLabel", "");
            form.setValue("notificationMessageInternal", "");
            form.setValue("notificationMessageCustomer", "");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center">
                <MailPlus className="h-5 w-5" />
                <span className="text-sm font-semibold">Send order via email</span>
            </div>
            <p className="text-sm text-gray-500">
                Your customers can send their orders directly via email through Flipsnack.
            </p>
            <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Enable Email Checkout</Label>
                <Switch
                    checked={form.watch("emailCheckout")}
                    onCheckedChange={handleEmailCheckoutChange}
                />
            </div>
            {form.watch("emailCheckout") && (
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="checkoutButtonLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs">Button label</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Place Order"
                                        {...field}
                                        className={errors.checkoutButtonLabel ? "border-red-500" : ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notificationMessageInternal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs">Internal Notification Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="A new order has been placed."
                                        className={`resize-none ${errors.notificationMessageInternal ? "border-red-500" : ""}`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notificationMessageCustomer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs">Customer Notification Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Thank you for your purchase!"
                                        className={`resize-none ${errors.notificationMessageCustomer ? "border-red-500" : ""}`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <div className='flex gap-2 items-center'>
                            <Label className="text-xs">Workspace Logo</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-3 w-3 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        align="center"
                                        className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                    >
                                        <p className="text-sm">Recommended: 5:1 ratio, 1MB size.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="border flex justify-between p-2 rounded-sm my-2 items-center">
                            {workspaceLogo ? (
                                <>
                                    <img
                                        src={workspaceLogo.src}
                                        alt={workspaceLogo.alt}
                                        className="max-w-[142px] max-h-[40px] object-contain"
                                    />
                                    <div className="flex gap-1 items-center">
                                        <SelectLogoDialog
                                            onLogoSelect={(logo) => handleLogoSelect(logo, "workspace")}
                                            mode="replace"
                                        />
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleLogoDelete("workspace")}
                                            disabled={isLogoLoading}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <SelectLogoDialog
                                    onLogoSelect={(logo) => handleLogoSelect(logo, "workspace")}
                                    mode="select"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">PDF Download</Label>
                    <Switch
                        checked={form.watch("allowPdfDownload")}
                        onCheckedChange={(checked) => form.setValue("allowPdfDownload", checked)}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Make your PDF order list look professional by adding your company information in the text boxes below.
                </p>
                {form.watch("allowPdfDownload") && (
                    <div className="space-y-2">
                        <div>
                            <div className='flex gap-2 items-center'>
                                <Label className="text-xs">PDF Logo</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-3 w-3 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            align="center"
                                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                        >
                                            <p className="text-sm">Recommended: 5:1 ratio, 1MB size.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="border flex justify-between p-2 rounded-sm my-2 items-center">
                                {pdfLogo ? (
                                    <>
                                        <img
                                            src={pdfLogo.src}
                                            alt={pdfLogo.alt}
                                            className="max-w-[142px] max-h-[40px] object-contain"
                                        />
                                        <div className="flex gap-1 items-center">
                                            <SelectLogoDialog
                                                onLogoSelect={(logo) => handleLogoSelect(logo, "pdf")}
                                                mode="replace"
                                            />
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleLogoDelete("pdf")}
                                                disabled={isLogoLoading}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <SelectLogoDialog
                                        onLogoSelect={(logo) => handleLogoSelect(logo, "pdf")}
                                        mode="select"
                                    />
                                )}
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="headerText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Header</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="E.g. company name, your address, contact info"
                                            className={`h-16 resize-none ${errors.headerText ? "border-red-500" : ""}`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="footerText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Footer</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="E.g. Thank you for your order."
                                            className={`h-16 resize-none ${errors.footerText ? "border-red-500" : ""}`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">CSV Download</Label>
                    <Switch
                        checked={form.watch("allowCsvDownload")}
                        onCheckedChange={(checked) => form.setValue("allowCsvDownload", checked)}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Enable the option to download the order as a CSV file.
                </p>
            </div>
        </div>
    );
}