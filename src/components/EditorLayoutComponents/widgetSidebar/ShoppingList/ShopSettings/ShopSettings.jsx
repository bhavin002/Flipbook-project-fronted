import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from "./GeneralSettings";
import OrderOptions from "./OrderOptions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopSettingsSchema } from "./shopSettings.schema";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { Form } from "@/components/ui/form";
import { useShopSettings } from "@/context/ShopSettingsContext";
import { DEFAULT_CURRENCY_ID } from "@/utils/databaseStaticValue";

export default function ShopSettings() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const { shopSettings, fetchShopSettings, updateShopSettings } = useShopSettings();

    const form = useForm({
        resolver: zodResolver(shopSettingsSchema),
        defaultValues: {
            shopAppearance: 0,
            shopEmailType: 0,
            simpleInboxEmails: [],
            conditionalInboxDescription: "",
            conditionalInboxOptions: [],
            showOrderNumber: true,
            orderConfirmationMessage: "Thank you! Your order has been received.",
            hasMinimumOrderValue: false,
            minimumOrderValue: 0,
            contactTitle: "Contact details",
            contactDescription: "",
            customerFields: [
                {
                    type: "email",
                    label: "Email",
                    placeholder: "example@example.com",
                    required: true
                }
            ],
            showPrivacyPolicy: false,
            privacyPolicyCompanyName: "",
            privacyPolicyLink: "",
            emailCheckout: true,
            checkoutButtonLabel: "Place Order",
            notificationMessageInternal: "A new order has been placed.",
            notificationMessageCustomer: "Thank you for your purchase!",
            workspaceLogoId: "",
            workspaceLogoUrl: "",
            allowPdfDownload: false,
            pdfLogoId: "",
            pdfLogoUrl: "",
            headerText: "",
            footerText: "",
            allowCsvDownload: false,
            currencyId: DEFAULT_CURRENCY_ID,
        }
    });

    const { formState: { errors }, clearErrors } = form;
    
    console.log("errors from shop settings", errors);

    // Update form when shopSettings changes
    useEffect(() => {
        if (shopSettings && open) {
            const transformedData = {
                shopAppearance: shopSettings.shopAppearance || 0,
                shopEmailType: shopSettings.shopEmailType || 0,
                simpleInboxEmails: shopSettings.simpleInboxEmails || [],
                conditionalInboxDescription: shopSettings.conditionalInboxDescription || "",
                conditionalInboxOptions: shopSettings.conditionalInboxOptions || [],
                showOrderNumber: shopSettings.showOrderNumber || false,
                orderConfirmationMessage: shopSettings.orderConfirmationMessage || "Thank you! Your order has been received.",
                hasMinimumOrderValue: shopSettings.hasMinimumOrderValue || false,
                minimumOrderValue: shopSettings.minimumOrderValue || 0,
                contactTitle: shopSettings.contactTitle || "Contact details",
                contactDescription: shopSettings.contactDescription || "",
                customerFields: shopSettings.customerFields || [],
                showPrivacyPolicy: shopSettings.showPrivacyPolicy || false,
                privacyPolicyCompanyName: shopSettings.privacyPolicyCompanyName || "",
                privacyPolicyLink: shopSettings.privacyPolicyLink || "",
                emailCheckout: shopSettings.emailCheckout || false,
                checkoutButtonLabel: shopSettings.checkoutButtonLabel || "Place Order",
                notificationMessageInternal: shopSettings.notificationMessageInternal || "A new order has been placed.",
                notificationMessageCustomer: shopSettings.notificationMessageCustomer || "Thank you for your purchase!",
                workspaceLogoId: shopSettings.workspaceLogoId || "",
                workspaceLogoUrl: shopSettings.workspaceLogoUrl || "",
                allowPdfDownload: shopSettings.allowPdfDownload || false,
                pdfLogoId: shopSettings.pdfLogoId || "",
                pdfLogoUrl: shopSettings.pdfLogoUrl || "",
                headerText: shopSettings.headerText || "",
                footerText: shopSettings.footerText || "",
                allowCsvDownload: shopSettings.allowCsvDownload || false,
                currencyId: shopSettings.currencyId || "",
            };
            
            form.reset(transformedData);
        }
    }, [shopSettings, open, form]);

    const handleFetchShopSettings = async () => {
        try {
            setIsFetching(true);
            await fetchShopSettings();
            setOpen(true);
        } catch (error) {
            toast.error("Failed to fetch shop settings", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            
            const apiData = {
                shopAppearance: data.shopAppearance,
                shopEmailType: data.shopEmailType,
                simpleInboxEmails: data.shopEmailType === 0 ? data.simpleInboxEmails : [],
                conditionalInboxDescription: data.shopEmailType === 1 ? data.conditionalInboxDescription : "",
                conditionalInboxOptions: data.shopEmailType === 1 ? data.conditionalInboxOptions : [],
                showOrderNumber: data.showOrderNumber,
                orderConfirmationMessage: data.orderConfirmationMessage,
                hasMinimumOrderValue: data.hasMinimumOrderValue,
                minimumOrderValue: data.hasMinimumOrderValue ? data.minimumOrderValue : 0,
                contactTitle: data.contactTitle,
                contactDescription: data.contactDescription,
                customerFields: data.customerFields,
                showPrivacyPolicy: data.showPrivacyPolicy,
                privacyPolicyCompanyName: data.showPrivacyPolicy ? data.privacyPolicyCompanyName : "",
                privacyPolicyLink: data.showPrivacyPolicy ? data.privacyPolicyLink : "",
                emailCheckout: data.emailCheckout,
                checkoutButtonLabel: data.emailCheckout ? data.checkoutButtonLabel : "",
                notificationMessageInternal: data.emailCheckout ? data.notificationMessageInternal : "",
                notificationMessageCustomer: data.emailCheckout ? data.notificationMessageCustomer : "",
                workspaceLogoId: data.workspaceLogoId || "",
                allowPdfDownload: data.allowPdfDownload,
                pdfLogoId: data.pdfLogoId || "",
                headerText: data.allowPdfDownload ? data.headerText : "",
                footerText: data.allowPdfDownload ? data.footerText : "",
                allowCsvDownload: data.allowCsvDownload,
                currencyId: data.currencyId,
            };

            await updateShopSettings(apiData);
            setOpen(false);
        } catch (error) {
            toast.error("Failed to save shop settings", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                className="w-full text-black hover:text-primary"
                variant="outline"
                onClick={handleFetchShopSettings}
                disabled={isFetching}
            >
                {isFetching ? <LoadingButton isLoading={isFetching} /> : <> <CreditCard /> Shop settings </>}
            </Button>

            {open && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[640px] w-[90vw]">
                        <DialogHeader>
                            <DialogTitle>Shop Settings</DialogTitle>
                            <DialogDescription className="sr-only">
                                Description
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="lg:max-h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)] overflow-y-auto">
                                    <Tabs defaultValue="general" className="flex flex-col h-full align-items-start">
                                        <TabsList className="justify-start w-fit">
                                            <TabsTrigger value="general">General</TabsTrigger>
                                            <TabsTrigger value="order-options">Order Options</TabsTrigger>
                                        </TabsList>
                                        <div className="flex-grow overflow-y-auto">
                                            <TabsContent value="general" className="my-4 px-2">
                                                <GeneralSettings form={form} clearErrors={clearErrors} />
                                            </TabsContent>
                                            <TabsContent value="order-options" className="my-4 px-2">
                                                <OrderOptions form={form} clearErrors={clearErrors} errors={errors}/>
                                            </TabsContent>
                                        </div>
                                    </Tabs>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isLoading || Object.keys(errors).length > 0}>
                                        {isLoading ? <LoadingButton isLoading={isLoading} /> : "Save changes"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}