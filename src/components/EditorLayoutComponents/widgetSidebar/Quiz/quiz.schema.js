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
    tooltip: z.string().optional(),
    quizName: z.string().min(1, "Quiz name is required"),
    quizButtonLabel: z.string().min(1, "Button label is required"),
    useDifferentMessages: z.boolean(),
    passedQuizMessage: z.string().optional(),
    failedQuizMessage: z.string().optional(),
    messageText: z.string().optional(),
    allowRetake: z.boolean(),
    collectEmail: z.boolean(),
    addPrivacyPolicy: z.boolean(),
    companyName: z.string().optional(),
    privacyPolicyLink: z.string().optional(),
    addGDPRCompliance: z.boolean(),
    gdprMessage: z.string().optional(),
  }).superRefine((data, ctx) => {
    // Privacy policy validation
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

    // Message validation based on useDifferentMessages
    if (data.useDifferentMessages) {
      if (!data.passedQuizMessage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['passedQuizMessage'],
          message: 'Passed quiz message is required when using different messages',
        });
      }
      if (!data.failedQuizMessage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['failedQuizMessage'],
          message: 'Failed quiz message is required when using different messages',
        });
      }
    } else {
      if (!data.messageText) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['messageText'],
          message: 'Message text is required when not using different messages',
        });
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
});