import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { VerifyReaderTokenApi } from "@/service/helper.service";

export default function VerifyReader() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (!token) {
                    navigate("/auth/sign-in");
                    return;
                }

                if (!isLoading && isAuthenticated) {
                    setIsProcessing(true);
                    await VerifyReaderTokenApi(token);
                    setIsVerified(true);
                    setIsProcessing(false);
                    localStorage.removeItem("fn_invite_token");
                } else if (!isLoading && !isAuthenticated) {
                    setIsVerified(false);
                    setError("authentication");
                    setIsProcessing(false);
                }
            } catch (error) {
                setIsVerified(false);
                setIsProcessing(false);

                if (error.status === 401) {
                    setError("authentication");
                } else {
                    setError("general");
                }
            }
        };

        if (!isLoading && token) {
            verifyToken();
        }
    }, [token, navigate, isAuthenticated, isLoading]);

    const handleSignIn = () => {
        if (error === "authentication") {
            localStorage.setItem("fn_invite_token", token);
        }
        navigate("/auth/sign-in");
    };

    // Show loading while auth state is being determined
    if (isLoading || isProcessing) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card className="shadow rounded-xl">
                        <CardHeader className="text-center space-y-4">
                            <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                                <img src="/src/assets/logo.png" width={200} className="my-2" alt="Logo" />
                            </div>
                            <CardTitle>Verifying Invitation...</CardTitle>
                            <CardDescription>
                                Please wait while we verify your invitation.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card className="shadow rounded-xl">
                        <CardHeader className="text-center space-y-4">
                            <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                                <img src="/src/assets/logo.png" width={200} className="my-2" alt="Logo" />
                            </div>
                            {isVerified ? (
                                <CardTitle>Invitation Accepted Successfully!</CardTitle>
                            ) : (
                                <CardTitle>
                                    {error === "authentication" ? "Authentication Required" : "Verification Failed"}
                                </CardTitle>
                            )}

                            <CardDescription>
                                {isVerified ? (
                                    "Your invitation has been accepted successfully. You now have access to the flipbooks."
                                ) : error === "authentication" ? (
                                    "You need to sign in or create an account with Flipnova to accept this invitation."
                                ) : (
                                    "We couldn't verify your invitation. The link may have expired or is invalid."
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                {isVerified ? (
                                    <button
                                        onClick={() => navigate("/myflipbooks")}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium"
                                    >
                                        Go to My Flipbooks
                                    </button>
                                ) : <div className="text-center text-sm">
                                    {error === "authentication" ? (
                                        <>
                                            After signing in, you'll be able to accept this invitation.
                                            <a
                                                onClick={handleSignIn}
                                                className="text-primary cursor-pointer ml-1 font-medium"
                                            >
                                                Return to sign in
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            Having trouble?
                                            <a
                                                onClick={handleSignIn}
                                                className="text-primary cursor-pointer ml-1 font-medium"
                                            >
                                                Return to sign in
                                            </a>
                                        </>
                                    )}
                                </div>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}