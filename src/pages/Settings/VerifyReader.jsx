import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VerifyReaderTokenApi } from "@/service/workspace.reader.service";

export default function VerifyReader() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (!token) {
                    navigate("/auth/sign-in");
                    return;
                }

                await VerifyReaderTokenApi(token);
                setIsVerified(true);
            } catch (error) {
                setIsVerified(false);
            }
        };

        verifyToken();
    }, []);

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
                                <CardTitle>Verification Failed</CardTitle>
                            )}

                            <CardDescription>
                                {isVerified ? (
                                    "Your invitation has been accepted successfully. You now have access to the flipbooks."
                                ) : (
                                    "We couldn't verify your invitation. The link may have expired or is invalid."
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                {isVerified && (
                                    <button
                                        onClick={() => navigate("/myflipbooks")}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium"
                                    >
                                        Go to My Flipbooks
                                    </button>
                                )}

                                <div className="text-center text-sm">
                                    {isVerified ? (
                                        "You can access your flipbooks anytime from your account."
                                    ) : (
                                        <>
                                            Having trouble?{" "}
                                            <a
                                                onClick={() => navigate("/auth/sign-in")}
                                                className="text-primary cursor-pointer font-medium"
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