import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useState } from "react"
import LoadingButton from "@/utils/LoadingButton"
import { SignInApi } from "@/service/auth.service"
import { useAuth } from "@/context/AuthContext"
import { useGoogleLogin } from "@react-oauth/google"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please fill in this field")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Please fill in this field")
})

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const continueWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsGoogleLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google-callback?code=${codeResponse.code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const responseData = await response.json();
        login(responseData.data)
        navigate("/");

      } catch (error) {
        toast.error("Google Sign-In Failed", {
          description: "Failed to connect with Google. Please try again."
        });
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (err) => {
      setIsGoogleLoading(false);
      console.error("Google OAuth error:", err);
      toast.error("Google Sign-In Failed", {
        description: "Google authentication failed. Please try again."
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await SignInApi(data);
      login(response.data)
      navigate("/");
    } catch (error) {
      toast.error("Login failed", {
        description: error.message || "Oops! Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow rounded-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div style={{ "transform": "scale(1)", "margin": "auto" }}>
                <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
              </div>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => continueWithGoogle()}
                disabled={isGoogleLoading || isLoading}
              >
                {isGoogleLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="mr-2">
                      <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Login with Google
                  </>
                )}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className={`${errors.email ? "text-red-500" : ""}`}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className={`${errors.email ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className={`${errors.password ? "text-red-500" : ""}`}>
                    Password
                  </Label>
                  <a
                    onClick={() => navigate("/auth/forgot-password")}
                    className="ml-auto text-sm underline-offset-2 hover:underline cursor-pointer"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className={`${errors.password ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="w-full gap-1"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  'Login'
                )}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  onClick={() => navigate("/auth/sign-up")}
                  className="text-primary cursor-pointer font-medium"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div
            className="relative hidden md:block"
            style={{
              'background': 'linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgb(124 58 237 / 55%) 100%)'
            }}
          >
            <img
              src="/assets/sign-up-img.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
