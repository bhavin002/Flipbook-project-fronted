import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function Cancel() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <Card className="shadow rounded-xl">
                    <CardHeader className="text-center space-y-4">
                        <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                            <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="/assets/Cancel.gif"
                                alt="Payment Cancelled"
                            />
                        </div>
                        <CardTitle className="text-2xl text-red-600">Payment Cancelled</CardTitle>
                        <CardDescription className="text-base">
                            Your payment was cancelled. No charges have been made to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">

                            <div className="grid gap-3">
                                <Button
                                    onClick={() => navigate("/myflipbooks/flipbooks")}
                                    className="w-full"
                                >
                                    Go to Application
                                </Button>
                            </div>
                            
                            <div className="text-center text-sm text-muted-foreground">
                                <p>
                                    Need help? <a href="/support" className="text-primary font-medium cursor-pointer">Contact Support</a>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}