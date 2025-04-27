import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function ForgotPasswordForm({
    className,
    ...props
}) {
    const navigate = useNavigate();

    return (
        (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="shadow rounded-xl">
                    <CardHeader className="text-center space-y-4">
                        <div style={{ "transform": "scale(1)", "margin": "auto" }}><img src="/src/assets/logo.png" width={200} className="my-2" /> </div>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>
                            Get a password reset link via email.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-6">

                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Reset Password
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    <a onClick={() => {
                                        navigate("/auth/sign-in")
                                    }} className="text-primary cursor-pointer font-medium">
                                        Back to login
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>)
    );
}
