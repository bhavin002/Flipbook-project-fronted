
import { SignUpForm } from "@/components/sign-up-form"
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
    const location = useLocation();
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignUpForm
                    defaultEmail={location.state?.email}
                    emailReadOnly={location.state?.emailReadOnly}
                    teammateToken={location.state?.teammateToken}
                />
            </div>
        </div>
    )
}
