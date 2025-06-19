import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from "./GeneralSettings";
import OrderOptions from "./OrderOptions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopSettingsSchema } from "./shopSettings.schema";
import { useState } from "react";
import { getShopSettingApi, updateShopSettingApi } from "@/service/shopSettings.service";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { Form } from "@/components/ui/form";
import { useParams } from "react-router-dom";

export default function ShopSettings() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const {id : flipbookId} = useParams();

    const form = useForm({
        resolver: zodResolver(shopSettingsSchema),
        defaultValues: {
            shopAppearance: 1,
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
            workspaceLogoId: null,
            allowPdfDownload: false,
            pdfLogoId: null,
            headerText: "",
            footerText: "",
            allowCsvDownload: false,
            currencyId: "",
        }
    });

    const { formState: { errors }, clearErrors } = form;

    const fetchShopSettings = async () => {
        try {
            setIsFetching(true);
            const response = await getShopSettingApi(flipbookId);
            
            const transformedData = {
                shopAppearance: response.data.shopAppearance || 1,
                shopEmailType: response.data.shopEmailType || 0,
                simpleInboxEmails: response.data.simpleInboxEmails || [],
                conditionalInboxDescription: response.data.conditionalInboxDescription || "",
                conditionalInboxOptions: response.data.conditionalInboxOptions || [],
                showOrderNumber: response.data.showOrderNumber || false,
                orderConfirmationMessage: response.data.orderConfirmationMessage || "Thank you! Your order has been received.",
                hasMinimumOrderValue: response.data.hasMinimumOrderValue || false,
                minimumOrderValue: response.data.minimumOrderValue || 0,
                contactTitle: response.data.contactTitle || "Contact details",
                contactDescription: response.data.contactDescription || "",
                customerFields: response.data.customerFields || [],
                showPrivacyPolicy: response.data.showPrivacyPolicy || false,
                privacyPolicyCompanyName: response.data.privacyPolicyCompanyName || "",
                privacyPolicyLink: response.data.privacyPolicyLink || "",
                emailCheckout: response.data.emailCheckout || false,
                checkoutButtonLabel: response.data.checkoutButtonLabel || "Place Order",
                notificationMessageInternal: response.data.notificationMessageInternal || "A new order has been placed.",
                notificationMessageCustomer: response.data.notificationMessageCustomer || "Thank you for your purchase!",
                workspaceLogoId: response.data.workspaceLogoId || null,
                allowPdfDownload: response.data.allowPdfDownload || false,
                pdfLogoId: response.data.pdfLogoId || null,
                headerText: response.data.headerText || "",
                footerText: response.data.footerText || "",
                allowCsvDownload: response.data.allowCsvDownload || false,
                currencyId: response.data.currencyId || "",
            };
            
            form.reset(transformedData);
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

            let response;
            response = await updateShopSettingApi(flipbookId, apiData);

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
                onClick={fetchShopSettings}
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
                                    <Button type="submit" disabled={isLoading}>
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