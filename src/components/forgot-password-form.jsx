import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useState } from "react"
import LoadingButton from "@/utils/LoadingButton"
import { SendResetLinkApi } from "@/service/auth.service"

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Please fill in this field")
        .email("Please enter a valid email address")
})

export function ForgotPasswordForm({
    className,
    ...props
}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await SendResetLinkApi(data.email)
            setSubmittedEmail(data.email);
            setIsSuccess(true);
            toast.success("Reset link sent", {
                description: `We've sent a password reset link to ${data.email}`,
            });
        } catch (error) {
            toast.error("Request failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="shadow rounded-xl">
                    <CardHeader className="text-center space-y-4">
                        <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                            <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                        </div>
                        <CardTitle>Your reset link is on the way!</CardTitle>
                        <CardDescription>
                            We've sent password reset instructions to
                            <div className="font-medium text-foreground my-1">{submittedEmail}</div>
                            If you don't see it in a few minutes, check your spam folder just in case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="text-center text-sm">
                                Remembered your password?{" "}
                                <a
                                    onClick={() => navigate("/auth/sign-in")}
                                    className="text-primary cursor-pointer font-medium"
                                >
                                    Log in instead
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="shadow rounded-xl">
                <CardHeader className="text-center space-y-4">
                    <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                        <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                    </div>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        Get a password reset link via email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className={`${errors.email ? "text-red-500" : ""}`}>
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className={`${errors.email ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs font-medium">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full gap-1"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <LoadingButton />
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>
                            <div className="text-center text-sm">
                                <a
                                    onClick={() => navigate("/auth/sign-in")}
                                    className="text-primary cursor-pointer font-medium"
                                >
                                    Back to login
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}