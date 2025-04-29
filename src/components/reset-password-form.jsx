import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import LoadingButton from "@/utils/LoadingButton"
import { ForgotPasswordVerifyTokenApi, ResetPasswordApi } from "@/service/auth.service"
import { Loader } from "./ui/loader"

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(1, "Please fill in this field")
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
        .string()
        .min(1, "Please fill in this field")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export function ResetPasswordForm({
    className,
    ...props
}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        const verifyToken = async () => {
            try {
                setIsVerifying(true);
                if (!token) {
                    navigate("/auth/sign-in");
                    return;
                }

                const response = await ForgotPasswordVerifyTokenApi(token);
                if (response.status !== 200) {
                    navigate("/auth/sign-in");
                }
            } catch (error) {
                navigate("/auth/sign-in");
            } finally {
                setIsVerifying(false);
            }
        };

        verifyToken();
    }, [navigate]);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setIsLoading(true);

            const resetData = {
                token: token,
                password: data.password
            };

            const response = await ResetPasswordApi(resetData);
            toast.success("Password reset", {
                description: response.message,
            });
            navigate("/auth/sign-in");
        } catch (error) {
            toast.error("Password reset failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isVerifying) {
        return (
            <Loader />
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="shadow rounded-xl">
                <CardHeader className="text-center space-y-4">
                    <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                        <img src="/src/assets/logo.png" width={200} className="my-2" alt="Logo" />
                    </div>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        Create a new password to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className={`${errors.password ? "text-red-500" : ""}`}>
                                        Password
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    className={`${errors.password ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-xs font-medium">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword" className={`${errors.confirmPassword ? "text-red-500" : ""}`}>
                                        Confirm Password
                                    </Label>
                                </div>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="********"
                                    className={`${errors.confirmPassword ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-xs font-medium">
                                        {errors.confirmPassword.message}
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
                                    'Reset Password'
                                )}
                            </Button>
                            <div className="text-center text-sm">
                                Remember your password?{" "}
                                <a
                                    onClick={() => navigate("/auth/sign-in")}
                                    className="text-primary cursor-pointer font-medium"
                                >
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}