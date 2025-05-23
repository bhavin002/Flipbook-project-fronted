import { z } from "zod";

const customerFieldSchema = z.object({
    label: z.string().optional(),
    type: z.enum([
        "email",
        "phone_number",
        "custom_input",
        "website"
    ]),
    required: z.boolean()
});

export const contactFormSchema = z.object({
    formTitle: z.string().optional(),
    description: z.string().optional(),
    settings: z.object({
        tooltip: z.string().optional(),
        buttonLabel: z.string().min(1, "Button label is required"),
        thankYouMessage: z.string().min(1, "Thank you message is required"),
        collectEmail: z.boolean(),
        addPrivacyPolicy: z.boolean(),
        companyName: z.string().optional(),
        privacyPolicyLink: z.string().optional(),
        addGDPRCompliance: z.boolean(),
        gdprMessage: z.string().optional()
    }).superRefine((data, ctx) => {
        // Privacy policy validation
        if (data.addPrivacyPolicy) {
            if (!data.companyName) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['companyName'],
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

        // GDPR compliance validation
        if (data.addGDPRCompliance) {
            if (!data.gdprMessage) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['gdprMessage'],
                    message: 'GDPR message is required when GDPR compliance is enabled',
                });
            }
        }
    }),
    customerFields: z.array(customerFieldSchema).min(1, "At least one customer field is required")
});