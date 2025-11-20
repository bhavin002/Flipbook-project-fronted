import { z } from "zod";

export const questionSchema = z.object({
    question: z.string().min(1, "Question is required"),
    tooltip: z.string().optional(),
    buttonLabel: z.string().min(1, "Button label is required"),
    thankYouMessage: z.string().min(1, "Thank you message is required"),
    collectEmailAddress: z.boolean(),
    addPrivacyPolicy: z.boolean(),
    companyName: z.string().optional(),
    privacyPolicyLink: z.string().optional(),
    addGDPRCompliance: z.boolean(),
    formulateMessage: z.string().optional()
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
        if (!data.formulateMessage) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['formulateMessage'],
                message: 'GDPR message is required when GDPR compliance is enabled',
            });
        }
    }
}); 