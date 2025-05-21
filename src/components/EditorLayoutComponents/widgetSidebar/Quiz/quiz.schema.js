import { z } from "zod";

const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  options: z.array(optionSchema).min(1, "At least one option is required"),
  isMultipleAnswer: z.boolean(),
});

export const quizSchema = z.object({
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  settings: z.object({
    isShowCorrectAnswer: z.boolean(),
    tooltip: z.string().default("Click to answer question").optional(),
    quizName: z.string().default("Untitled quiz").optional(),
    quizButtonLabel: z.string().default("Submit").optional(),
    useDifferentMessages: z.boolean(),
    passedQuizMessage: z.string().default("Your response has been submitted.").optional(),
    failedQuizMessage: z.string().default("Your response has been submitted.").optional(),
    messageText: z.string().default("Your response has been submitted.").optional(),
    allowRetake: z.boolean(),
    collectEmail: z.boolean(),
    addPrivacyPolicy: z.boolean(),
    companyName: z.string().default("Flipnova").optional(),
    privacyPolicyLink: z.string().default("https://legal.flipsnack.com/privacy-policy").optional(),
    addGDPRCompliance: z.boolean(),
    gdprMessage: z.string().default("By clicking on the button below, you agree to our Privacy Policy and Terms of Service.").optional(),
  }).superRefine((data, ctx) => {
    if (data.addPrivacyPolicy) {
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
  }),
});