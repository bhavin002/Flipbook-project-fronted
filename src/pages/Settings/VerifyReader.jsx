import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { VerifyReaderTokenApi } from "@/service/helper.service";
import { CheckStatusApi } from "@/service/helper.service";
import { tokenStatus } from "@/utils/enum";

export default function VerifyReader() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const handleInvitation = async () => {
            if (!token) {
                navigate("/auth/sign-in");
                return;
            }
            setIsProcessing(true);
            try {
                const statusRes = await CheckStatusApi(token);
                const code = statusRes?.data?.code;
                const email = statusRes?.data?.email;
                switch (code) {
                    case tokenStatus.READY_TO_ACCEPT:
                        await VerifyReaderTokenApi(token);
                        setIsVerified(true);
                        break;
                    case tokenStatus.NEED_TO_REGISTER:
                        navigate("/auth/sign-up", { state: { email, emailReadOnly: true, teammateToken: token } });
                        break;
                    case tokenStatus.ALREADY_REGISTERED:
                        setAlreadyRegistered(true);
                        break;
                    case tokenStatus.ERROR:
                    default:
                        setError("general");
                        setErrorMessage(statusRes?.message || "Invalid or expired invitation link.");
                        break;
                }
            } catch (err) {
                setError("general");
                setErrorMessage(err?.message || "Something went wrong.");
            } finally {
                setIsProcessing(false);
            }
        };
        if (!isLoading && token) {
            handleInvitation();
        }
    }, [token, navigate, isAuthenticated, isLoading]);

    const handleSignIn = () => {
        if (error === "authentication") {
            localStorage.setItem("fn_invite_token", token);
        }
        navigate("/auth/sign-in");
    };

    if (isLoading || isProcessing) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
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
                            <div className="flex items-center gap-2 sm:gap-3 px-3 pr-2 py-2" style={{ "transform": "scale(1)", "margin": "auto" }}>
                                <div className="relative flex items-center">
                                    <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                                    <span className="absolute -right-6 top-3 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-[1px] rounded">
                                        BETA
                                    </span>
                                </div>
                            </div>
                            {isVerified ? (
                                <CardTitle>Invitation Accepted Successfully!</CardTitle>
                            ) : alreadyRegistered ? (
                                <CardTitle>Invitation Already Accepted</CardTitle>
                            ) : (
                                <CardTitle>
                                    {error === "authentication" ? "Authentication Required" : "Verification Failed"}
                                </CardTitle>
                            )}
                            <CardDescription>
                                {isVerified ? (
                                    "Your invitation has been accepted successfully. You now have access to the flipbooks."
                                ) : alreadyRegistered ? (
                                    "You have already accepted this invitation. Please sign in to continue."
                                ) : error === "authentication" ? (
                                    "You need to sign in or create an account with FlipDrag to accept this invitation."
                                ) : (
                                    errorMessage || "We couldn't verify your invitation. The link may have expired or is invalid."
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="text-center text-sm">
                                    {(alreadyRegistered || isVerified || error === "authentication" || error === "general") && (
                                        <>
                                            <a
                                                onClick={handleSignIn}
                                                className="text-primary cursor-pointer ml-1 font-medium"
                                            >
                                                Return to sign in
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}