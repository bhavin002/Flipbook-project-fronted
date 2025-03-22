import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm({
    className,
    ...props
}) {
    return (
        (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="shadow rounded-xl">
                    <CardHeader className="text-center" >
                        <div style={{ "transform": "scale(1)", "margin": "auto" }}><img src="/src/assets/logo.png" width={200} className="my-2" /> </div>
                        <CardTitle className="text-xl">Reset Password</CardTitle>
                        <CardDescription>
                            Create a new password to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-6">

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" type="password" placeholder="********" required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Confirm Password</Label>
                                    </div>
                                    <Input id="password" type="password" placeholder="********" required />
                                </div>
                                <Button type="submit" className="w-full">
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>)
    );
}
