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
import { DEFAULT_CURRENCY_ID } from "@/utils/databaseStaticValue";

export default function ShopSettings() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const {id : flipbookId} = useParams();

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

    const fetchShopSettings = async () => {
        try {
            setIsFetching(true);
            const response = await getShopSettingApi(flipbookId);

            console.log("response from shop settings", response.data);
            
            const transformedData = {
                shopAppearance: response.data.flipbookShopSettings.shopAppearance || 0,
                shopEmailType: response.data.flipbookShopSettings.shopEmailType || 0,
                simpleInboxEmails: response.data.flipbookShopSettings.simpleInboxEmails || [],
                conditionalInboxDescription: response.data.flipbookShopSettings.conditionalInboxDescription || "",
                conditionalInboxOptions: response.data.flipbookShopSettings.conditionalInboxOptions || [],
                showOrderNumber: response.data.flipbookShopSettings.showOrderNumber || false,
                orderConfirmationMessage: response.data.flipbookShopSettings.orderConfirmationMessage || "Thank you! Your order has been received.",
                hasMinimumOrderValue: response.data.flipbookShopSettings.hasMinimumOrderValue || false,
                minimumOrderValue: response.data.flipbookShopSettings.minimumOrderValue || 0,
                contactTitle: response.data.flipbookShopSettings.contactTitle || "Contact details",
                contactDescription: response.data.flipbookShopSettings.contactDescription || "",
                customerFields: response.data.flipbookShopSettings.customerFields || [],
                showPrivacyPolicy: response.data.flipbookShopSettings.showPrivacyPolicy || false,
                privacyPolicyCompanyName: response.data.flipbookShopSettings.privacyPolicyCompanyName || "",
                privacyPolicyLink: response.data.flipbookShopSettings.privacyPolicyLink || "",
                emailCheckout: response.data.flipbookShopSettings.emailCheckout || false,
                checkoutButtonLabel: response.data.flipbookShopSettings.checkoutButtonLabel || "Place Order",
                notificationMessageInternal: response.data.flipbookShopSettings.notificationMessageInternal || "A new order has been placed.",
                notificationMessageCustomer: response.data.flipbookShopSettings.notificationMessageCustomer || "Thank you for your purchase!",
                workspaceLogoId: response.data.flipbookShopSettings.workspaceLogoId || "",
                workspaceLogoUrl: response.data.flipbookShopSettings.workspaceLogoUrl || "",
                allowPdfDownload: response.data.flipbookShopSettings.allowPdfDownload || false,
                pdfLogoId: response.data.flipbookShopSettings.pdfLogoId || "",
                pdfLogoUrl: response.data.flipbookShopSettings.pdfLogoUrl || "",
                headerText: response.data.flipbookShopSettings.headerText || "",
                footerText: response.data.flipbookShopSettings.footerText || "",
                allowCsvDownload: response.data.flipbookShopSettings.allowCsvDownload || false,
                currencyId: response.data.flipbookShopSettings.currencyId || "",
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

            await updateShopSettingApi(flipbookId, apiData);

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