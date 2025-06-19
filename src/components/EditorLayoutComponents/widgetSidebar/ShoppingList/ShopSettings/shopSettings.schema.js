import { z } from "zod";

const customerFieldSchema = z.object({
    type: z.enum(["text", "email", "phone"]),
    label: z.string().min(1, "Label is required"),
    placeholder: z.string().optional(),
    required: z.boolean(),
});

const conditionalInboxOptionSchema = z.object({
    option: z.string().min(1, "Option name is required"),
    emails: z.array(z.string().email("Invalid email address")).min(1, "At least one email is required"),
});

export const shopSettingsSchema = z.object({
    shopAppearance: z.number().min(1).max(4),
    shopEmailType: z.number().min(0).max(1),
    simpleInboxEmails: z.array(z.string().email("Invalid email address")).optional(),
    conditionalInboxDescription: z.string().optional(),
    conditionalInboxOptions: z.array(conditionalInboxOptionSchema).optional(),
    showOrderNumber: z.boolean(),
    orderConfirmationMessage: z.string().min(1, "Order confirmation message is required"),
    hasMinimumOrderValue: z.boolean(),
    minimumOrderValue: z.number().min(0, "Minimum order value must be positive").optional(),
    contactTitle: z.string().min(1, "Contact title is required"),
    contactDescription: z.string().optional(),
    customerFields: z.array(customerFieldSchema).min(1, "At least one customer field is required"),
    showPrivacyPolicy: z.boolean(),
    privacyPolicyCompanyName: z.string().optional(),
    privacyPolicyLink: z.string().optional(),
    emailCheckout: z.boolean(),
    checkoutButtonLabel: z.string().min(1, "Checkout button label is required"),
    notificationMessageInternal: z.string().min(1, "Internal notification message is required"),
    notificationMessageCustomer: z.string().min(1, "Customer notification message is required"),
    workspaceLogoId: z.string().nullable(),
    allowPdfDownload: z.boolean(),
    pdfLogoId: z.string().nullable(),
    headerText: z.string().optional(),
    footerText: z.string().optional(),
    allowCsvDownload: z.boolean(),
    currencyId: z.string().min(1, "Currency ID is required"),
}).superRefine((data, ctx) => {
    // Simple inbox validation
    if (data.shopEmailType === 0 && (!data.simpleInboxEmails || data.simpleInboxEmails.length === 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['simpleInboxEmails'],
            message: 'At least one email is required for simple inbox',
        });
    }

    // Conditional inbox validation
    if (data.shopEmailType === 1) {
        if (!data.conditionalInboxDescription) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['conditionalInboxDescription'],
                message: 'Description is required for conditional inbox',
            });
        }
        if (!data.conditionalInboxOptions || data.conditionalInboxOptions.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['conditionalInboxOptions'],
                message: 'At least one option is required for conditional inbox',
            });
        }
    }

    // Minimum order value validation
    if (data.hasMinimumOrderValue && !data.minimumOrderValue) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['minimumOrderValue'],
            message: 'Minimum order value is required when enabled',
        });
    }

    // Privacy policy validation
    if (data.showPrivacyPolicy) {
        if (!data.privacyPolicyCompanyName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['privacyPolicyCompanyName'],
                message: 'Company name is required when privacy policy is enabled',
            });
        }
        if (!data.privacyPolicyLink) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['privacyPolicyLink'],
                message: 'Privacy policy link is required when privacy policy is enabled',
            });
        } else {
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            if (!urlPattern.test(data.privacyPolicyLink)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['privacyPolicyLink'],
                    message: 'Please enter a valid URL (e.g., https://example.com)',
                });
            }
        }
    }
});