import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import DeleteAccountDialog from "./DeleteAccountDialog";


export default function MyAccountDetails() {
    return (
        <div className="max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Account details</h1>
                <p className="text-gray-500">View and update your account information.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Edit your account image and name</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>
                            Account image
                        </Label>
                        <div className="flex items-center gap-4">
                            <span className="flex shrink-0 p-2 overflow-hidden justify-center items-center size-20 border-2 border-dotted border-gray-300 text-gray-400 rounded-full dark:border-neutral-700 dark:text-neutral-600">
                                <img src="/assets/profile.jpg" className="w-auto h-auto max-w-[76px] max-h-[76px] object-cover" alt="Profile" />
                            </span>
                            <div className="space-y-2">
                                <Button variant="outline" size="sm">
                                    <Upload size={14} className="mr-2" />
                                    Add image
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Full name
                        </Label>
                        <Input placeholder="Your name" defaultValue="Bhavin Vasavada" className="md:w-[25%]" />
                    </div>
                    <Button>Save changes</Button>
                </CardContent>
            </Card>
            {/* <Card>
                <CardHeader>
                    <CardTitle>Edit your email address and password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>
                            Email adress
                        </Label>
                        <div className="flex gap-4">
                            <Input defaultValue="bhavin@flipnova.com" className="md:w-[30%]" disabled />
                            <ChangeEmail />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Current password
                        </Label>
                        <div className="flex gap-4">
                            <Input type="password" defaultValue="80908090" className="md:w-[30%]" disabled />
                            <ChangePassword />
                        </div>
                    </div>
                    <Button>Save changes</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Two-factor authentification</CardTitle>
                    <CardDescription>Two-factor authentication is a second step when you log in that helps protect your account.
                        To set this up you must download authenticator app from the app store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>Configure now</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Delete your account</CardTitle>
                    <CardDescription>You are about to delete your account. Are you sure you want to do that?</CardDescription>
                </CardHeader>
                <CardContent>
                    <DeleteAccountDialog />
                </CardContent>
            </Card> */}
        </div>
    )
}