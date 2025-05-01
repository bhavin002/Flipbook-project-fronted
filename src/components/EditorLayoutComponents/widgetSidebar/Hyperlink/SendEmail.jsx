import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailSchema = z.object({
    email: z.string()
        .trim()
        .min(1, { message: "Email is required" })
        .refine(email => EMAIL_PATTERN.test(email), {
            message: "Please enter a valid email address"
        })
});

export default function SendEmail({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialEmail = selectedShape[0]?.attrs?.htmlData?.email || "";
    const [isEmailValid, setIsEmailValid] = useState(false);

    const form = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: initialEmail
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (initialEmail) {
            form.setValue("email", initialEmail, { shouldValidate: true });
            if (EMAIL_PATTERN.test(initialEmail)) {
                setIsEmailValid(true);
            }
        } else {
            form.setValue("email", "", { shouldValidate: true });
            setIsEmailValid(false);
        }
    }, [selectedShape]);

    const updateMainStage = (data) => {
        if (!isEmailValid) return;
        const output = {
            data: {
                action: "send-email",
                email: data.email
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const { formState } = form;

    useEffect(() => {
        setIsEmailValid(formState.isValid);
    }, [formState]);

    const onSubmit = (data) => {
        if (isEmailValid) {
            updateMainStage(data);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        form.setValue("email", value, { shouldValidate: true });
    };

    return (
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="email" className="text-xs">Email</Label>
                        <FormControl>
                            <Input
                                type="text"
                                id="email"
                                placeholder="Recipient email"
                                className={`placeholder:text-gray-400 ${formState.errors.email ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                onChange={handleInputChange}
                                value={field.value}
                                onBlur={() => {
                                    if (isEmailValid) {
                                        form.handleSubmit(onSubmit)();
                                    }
                                }}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </Form>
    );
}