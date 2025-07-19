
import { SignUpForm } from "@/components/sign-up-form"
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
    const location = useLocation();
    const [defaultEmail, setDefaultEmail] = useState(location.state?.email || "");
    const [emailReadOnly, setEmailReadOnly] = useState(location.state?.emailReadOnly || false);
    const [teammateToken, setTeammateToken] = useState(location.state?.teammateToken || null);
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignUpForm
                    defaultEmail={defaultEmail}
                    setDefaultEmail={setDefaultEmail}
                    emailReadOnly={emailReadOnly}
                    setEmailReadOnly={setEmailReadOnly}
                    teammateToken={teammateToken}
                    setTeammateToken={setTeammateToken}
                />
            </div>
        </div>
    )
}
