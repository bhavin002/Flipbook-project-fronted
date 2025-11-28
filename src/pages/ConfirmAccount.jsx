import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { toast } from "sonner";
import { ValidateEmailApi, VerifyAccountApi } from "@/service/auth.service";
import LoadingButton from "@/utils/LoadingButton";
import { useAuth } from "@/context/AuthContext";

export default function ConfirmAccount() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        setIsLoading(true);
        const confirmToken = localStorage.getItem("fd_confirm_token");
        if (!confirmToken) {
          navigate("/auth/sign-up");
          return;
        }
        const response = await ValidateEmailApi(confirmToken);
        setEmail(response.data.email);
        if (!response.data.success) {
          navigate("/auth/sign-up");
        }
      } catch (error) {
        toast.error("Account Confirmation failed", {
          description: error.message || "Oops! Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    confirmAccount();
  }, [])

  const handleVerify = async () => {
    try {
      setIsVerifyLoading(true);
      const confirmToken = localStorage.getItem("fd_confirm_token");
      const payload = {
        token: confirmToken,
        otp,
      }
      if (location.state.teammateToken) {
        payload.teammateToken = location.state.teammateToken;
      }
      const response = await VerifyAccountApi(payload);
      localStorage.removeItem("fd_confirm_token");
      await login(response.data);
    } catch (error) {
      toast.error("Account Confirmation failed", {
        description: error.message || "Oops! Something went wrong.",
      });
    } finally {
      setIsVerifyLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
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
                <CardTitle>Check your email</CardTitle>
                <CardDescription>
                  Excited to have you here! We've sent you a six-digit confirmation code to{" "}
                  <span className="font-medium">{email}</span>. Please enter the code
                  below to confirm your email address. Keep in mind that the code is active for 15 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleVerify();
                }}>
                  <div className="grid gap-6">
                    <div className="grid gap-4">
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <Button
                        type="submit"
                        className="w-full gap-1"
                        disabled={isVerifyLoading || otp.length !== 6}
                      >
                        {isVerifyLoading ? (
                          <LoadingButton />
                        ) : (
                          'Verify'
                        )}
                      </Button>
                    </div>

                    <div className="text-center text-sm">
                      <p className="text-sm text-muted-foreground mb-2">
                        Having trouble? <a href="#" className="text-primary hover:underline">Contact our support team for help.</a>
                      </p>
                      <a
                        onClick={() => {
                          navigate("/auth/sign-in");
                        }}
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
        </div>
      </div>
    </>
  );
}
