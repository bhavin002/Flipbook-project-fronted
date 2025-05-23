import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Settings from "./Settings";
import Details from "./Details";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "./contactForm.schema";
import { useState } from "react";
import { createContactFormApi, getContactFormApi, updateContactFormApi } from "@/service/contactForm.service";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function ContactFormDialog({ selectedShape, mainStage, setMainStage, selectedIndex }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const variantId = selectedShape[0]?.attrs?.htmlData?.variantId || null;

    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            formTitle: "Untitled form",
            description: "",
            tooltip: "Click to answer question",
            buttonLabel: "Submit",
            thankYouMessage: "Your response has been submitted.",
            settings: {
                collectEmail: false,
                addPrivacyPolicy: false,
                companyName: "Flipnova",
                privacyPolicyLink: "https://legal.flipnova.com/privacy-policy",
                addGDPRCompliance: false,
                gdprMessage: "I agree to receive marketing materials."
            },
            customerFields: [
                {
                    label: "Full Name",
                    type: "full_name",
                    required: true
                },
                {
                    label: "Email Address",
                    type: "email",
                    required: true
                },
                {
                    label: "Phone Number",
                    type: "phone_number",
                    required: false
                },
                {
                    label: "Your Message",
                    type: "paragraph",
                    required: true
                }
            ]
        }
    });

    const { formState: { errors }, clearErrors } = form;

    console.log("errors ??", errors)

    const fetchContactForm = async () => {
        if (!variantId) {
            setOpen(true); // Open modal directly if no variantId (new form)
            return;
        }

        try {
            setIsFetching(true);
            const response = await getContactFormApi(variantId);
            form.reset(response.data);
            setOpen(true);
        } catch (error) {
            toast.error("Failed to fetch contact form", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            let response;

            if (variantId) {
                response = await updateContactFormApi(variantId, data);
            } else {
                response = await createContactFormApi(data);
            }

            console.log("response.data.contactForm._id ??", response.data.contactForm._id)

            const output = {
                data: {
                    variantId: response.data.contactForm._id,
                }
            };

            addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
            setOpen(false);
        } catch (error) {
            toast.error("Failed to save contact form", {
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
                onClick={fetchContactForm}
                disabled={isFetching}
            >
                {
                    isFetching ? <LoadingButton isLoading={isFetching} /> : <> <Pencil /> Edit form </>
                }
            </Button>

            {open && (<Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[640px] w-[90vw]">
                    <DialogHeader>
                        <DialogTitle>Contact Form</DialogTitle>
                        <DialogDescription className="sr-only">
                            Description
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="lg:max-h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)] overflow-y-auto">
                            <Tabs defaultValue="details" className="flex flex-col h-full align-items-start">
                                <TabsList className="justify-start w-fit">
                                    <TabsTrigger value="details">
                                        Details
                                    </TabsTrigger>
                                    <TabsTrigger value="settings">
                                        Settings
                                    </TabsTrigger>
                                </TabsList>
                                <div className="flex-grow overflow-y-auto">
                                    <TabsContent value="details" className="my-4 px-2">
                                        <Details form={form} />
                                    </TabsContent>
                                    <TabsContent value="settings" className="my-4 px-2">
                                        <Settings form={form} clearErrors={clearErrors} />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {
                                    isLoading ? <LoadingButton isLoading={isLoading} /> : "Save changes"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            )}
        </>
    )
}