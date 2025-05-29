import { z } from "zod";

const footerLinkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
});

export const brandingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.any().nullable(),
  description: z.string().optional(),
  isProfileInfoHidden: z.boolean(),
  websiteLink: z.string().url("Invalid URL").optional(),
  facebook: z.string().url("Invalid URL").optional(),
  twitter: z.string().url("Invalid URL").optional(),
  youtube: z.string().url("Invalid URL").optional(),
  instagram: z.string().url("Invalid URL").optional(),
  linkedin: z.string().url("Invalid URL").optional(),
  footerLinks: z.array(footerLinkSchema),
  headerColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code"),
  elementColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code"),
  isHeaderVisible: z.boolean(),
  isSearchBarVisible: z.boolean(),
  isProfilePrivate: z.boolean(),
  profileImage: z.any().nullable(),
  socialMediaImage: z.any().nullable(),
  favicon: z.any().nullable(),
}); 