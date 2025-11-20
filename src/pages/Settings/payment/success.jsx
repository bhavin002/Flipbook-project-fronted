import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCheckoutSessionInfo } from "@/service/subscription.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export function Success() {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const [sessionInfo, setSessionInfo] = useState(null);

    useEffect(() => {
        const getSessionInfo = async () => {
            try {
                const response = await getCheckoutSessionInfo(sessionId);
                setSessionInfo(response.data)
            } catch (error) {
                navigate("/myflipbooks/flipbooks");
            }
        };

        getSessionInfo();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <Card className="shadow rounded-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex items-center gap-2 sm:gap-3 px-3 pr-2 py-2" style={{ "transform": "scale(1)", "margin": "auto" }}>
                            <div className="relative flex items-center">
                                <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                                <span className="absolute -right-6 top-3 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-[1px] rounded">
                                    BETA
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="/assets/Success.gif"
                            />
                        </div>
                        <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
                        <CardDescription className="text-base">
                            Thank you for your purchase. Your payment has been processed successfully.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                <h3 className="font-semibold text-lg mb-3">Payment Details</h3>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Customer:</span>
                                    <span className="font-medium">{sessionInfo?.userName}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Workspace:</span>
                                    <span className="font-medium">{sessionInfo?.workspaceName}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Plan:</span>
                                    <span className="font-medium">{sessionInfo?.planName}</span>
                                </div>

                                <div className="border-t pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground font-semibold">Amount Paid:</span>
                                        <span className="font-bold text-lg text-primary">{sessionInfo?.price} {sessionInfo?.currency === "inr" ? "₹" : "$"}</span>
                                    </div>
                                </div>
                            </div>
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