import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const PHONE_PATTERN = /^\+?[0-9\s\-\(\)]{7,20}$/;

const phoneSchema = z.object({
    phoneNumber: z.string()
        .trim()
        .min(1, { message: "Phone number is required" })
        .refine(phone => PHONE_PATTERN.test(phone), {
            message: "Please enter a valid phone number"
        })
});

export default function PhoneNumber({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialPhoneNumber = selectedShape[0]?.attrs?.htmlData?.phoneNumber || "";
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [previousPhoneNumber, setPreviousPhoneNumber] = useState(initialPhoneNumber);

    const form = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phoneNumber: initialPhoneNumber
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newPhoneNumber = selectedShape[0]?.attrs?.htmlData?.phoneNumber || "";
            form.setValue("phoneNumber", newPhoneNumber, { shouldValidate: true });
            setPreviousPhoneNumber(newPhoneNumber);
            if (PHONE_PATTERN.test(newPhoneNumber)) {
                setIsPhoneValid(true);
            } else {
                setIsPhoneValid(false);
            }
        } else {
            form.setValue("phoneNumber", "", { shouldValidate: true });
            setPreviousPhoneNumber("");
            setIsPhoneValid(false);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        if (!isPhoneValid) return;
        
        const output = {
            data: {
                action: "phone-call",
                phoneNumber: data.phoneNumber
            }
        };
        
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
        setPreviousPhoneNumber(data.phoneNumber);
    };

    const { formState } = form;

    useEffect(() => {
        setIsPhoneValid(formState.isValid);
    }, [formState]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        form.setValue("phoneNumber", value, { shouldValidate: true });
        
        if (PHONE_PATTERN.test(value) && value !== previousPhoneNumber) {
            updateMainStage({ phoneNumber: value });
        }
    };

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="phone-number" className="text-xs">Phone Number</Label>
                        <FormControl>
                            <Input
                                type="text"
                                id="phone-number"
                                placeholder="Enter phone number"
                                className={`placeholder:text-gray-400 ${formState.errors.phoneNumber ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                onChange={handleInputChange}
                                value={field.value}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </Form>
    );
}