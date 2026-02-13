import { z } from 'zod';

export const emailSchema = z.object({
    emails: z.array(z.string().email('Invalid email address')).min(1, 'At least one email is required'),
    subject: z.string().min(1, 'Subject is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    label: z.string().min(1, 'Label is required'),
    footerDescription: z.string().min(1, 'Footer description is required'),
    backgroundColor: z.string().min(1, 'Background color is required'),
    accentColor: z.string().min(1, 'Accent color is required'),
    logo: z.string().min(1, 'Logo is required'),
});