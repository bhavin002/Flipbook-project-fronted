import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingIntegrations() {
    return (
        <div className="flex justify-center items-center flex-grow">
                    <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center justify-center space-y-6 text-center">
                        <div className="space-y-2">
                          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Coming Soon</h1>
                          <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            We're working hard to bring you an amazing new product. Sign up to be the first to know when we
                            launch.
                          </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                          <div className="flex gap-2">
                            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                            <Button>Notify Me</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            We'll never share your email. Read our{" "}
                            <a className="underline underline-offset-2">
                              privacy policy
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                </div>
    )
}