import { z } from "zod";

const stringToNumberOrNull = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
};

const numberAsStringSchema = z
    .string()
    .regex(/^$|^[0-9]*\.?[0-9]*$/, "Only numbers are allowed")
    .transform(stringToNumberOrNull)
    .nullable();

const positiveNumberAsStringSchema = numberAsStringSchema.refine(
    (val) => val === null || val >= 0,
    {
        message: "Value must be a non-negative number",
    }
);

const strictlyPositiveNumberAsStringSchema = numberAsStringSchema.refine(
    (val) => val === null || val > 0,
    {
        message: "Value must be greater than 0.",
    }
);

const requiredPositiveNumberAsStringSchema = z
    .string()
    .regex(/^[0-9]*\.?[0-9]+$/, "")
    .transform((val) => {
        const num = parseFloat(val);
        return isNaN(num) ? null : num;
    })
    .refine((val) => val !== null && val > 0, {
        message: "Price must be greater than 0",
    });

export const productSchema = z.object({
    productTitle: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    price: requiredPositiveNumberAsStringSchema,
    onSale: z.boolean(),
    discountPrice: positiveNumberAsStringSchema,
    images: z.array(z.object({
        imageId: z.string(),
    })).max(3, "Maximum 3 images allowed").optional().default([]),
    quantityOption: z.boolean(),
    enableMinMaxQuantity: z.boolean(),
    minQuantity: positiveNumberAsStringSchema,
    maxQuantity: positiveNumberAsStringSchema,
    restrictToMoqMultiples: z.boolean(),
    customizableProduct: z.boolean(),
    instructionMessage: z.string().optional(),
    instructionMessageRequired: z.boolean(),
    paidPersonalization: z.boolean(),
    pricingMethod: z.enum(["FLAT_FEE", "PER_CHAR"]).optional(),
    personalizationPrice: strictlyPositiveNumberAsStringSchema,
    charLimit: strictlyPositiveNumberAsStringSchema,
    productAttributes: z.array(z.object({
        attributeName: z.string().min(1, "Attribute name is required"),
        optionValues: z.array(z.string().min(1, "Option value is required")),
    })).optional().default([]),
    productVariants: z.array(z.object({
        _id: z.string().optional(),
        variantName: z.string().min(1, "Variant name is required"),
        price: positiveNumberAsStringSchema.optional(),
        discountPrice: positiveNumberAsStringSchema.optional(),
        sku: z.string().optional(),
        visibility: z.boolean()
    })).optional().default([]),
    variantImages: z.union([
        z.object({
            selectedAttribute: z.string().optional(),
            attributeValues: z.array(
                z.object({
                    value: z.string().min(1, "Value is required"),
                    image: z.array(
                        z.object({
                            imageId: z.string().min(1, "Image ID is required"),
                        })
                    ).optional()
                })
            ).optional()
        }).optional(),
        z.literal(null)
    ])
}).superRefine((data, ctx) => {
    if (data.price !== null && data.discountPrice !== null && data.discountPrice > data.price) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Discount price cannot be greater than the original price",
            path: ["discountPrice"]
        });
    }

    if (data.quantityOption && data.enableMinMaxQuantity) {
        if (data.minQuantity === null || data.minQuantity <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Minimum quantity must be greater than 0.",
                path: ["minQuantity"]
            });
        }
        if (data.maxQuantity === null || data.maxQuantity <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Maximum quantity must be greater than 0.",
                path: ["maxQuantity"]
            });
        }
        if (
            data.minQuantity !== null &&
            data.maxQuantity !== null
        ) {
            if (data.maxQuantity < data.minQuantity) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Maximum quantity must be greater than or equal to minimum quantity.",
                    path: ["maxQuantity"]
                });
            } else if (data.restrictToMoqMultiples) {
                // Only check for multiples if restrictToMoqMultiples is true
                if (data.maxQuantity % data.minQuantity !== 0) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "The max. value must be a multiple of the min.",
                        path: ["maxQuantity"]
                    });
                }
            }
        }
    }

    if (data.customizableProduct && !data.instructionMessage) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field cannot be left empty. Please enter a value.",
            path: ["instructionMessage"]
        });
    }

    if (data.customizableProduct && data.paidPersonalization) {
        if (data.personalizationPrice === null || data.personalizationPrice <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Value must be greater than 0.",
                path: ["personalizationPrice"]
            });
        }
        if (data.charLimit === null || data.charLimit <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Value must be greater than 0.",
                path: ["charLimit"]
            });
        }
    }
});