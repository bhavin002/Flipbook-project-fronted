import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function Preview() {
    return (
         <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <Button disabled={true}>
                        Save Changes
                    </Button>
                    <Button variant="outline">
                        See my profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="border p-0 m-6 mt-0 rounded-sm">
                <div className="p-2 bg-gray-100 flex flex-row items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white rounded-md p-1 text-xs flex items-center gap-1">
                            <img src="/src/assets/book_logo.png" className="h-4 w-auto shrink-0" alt="Logo" />
                            <span className="text-gray-500 truncate overflow-hidden whitespace-nowrap">
                                https://www.flipnova.com/F9D7AD99E8C/
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <img src="/src/assets/logo.png" width={200} alt="Cover" />
                </div>
                <div className="py-4 px-8 flex max-md:flex-wrap gap-4">
                    <div class="flex items-start">
                        <img className="w-28 rounded-full" alt="profile" src="/src/assets/profile.jpg" />
                    </div>
                    <div className="w-fit space-y-2">
                        <p className="text-lg font-bold">Bhavin Vasavada</p>
                        <a href="https://www.flipnova.com/" className="text-[12px] font-medium text-blue-600 hover:underline">
                            https://www.flipnova.com/
                        </a>
                        <p className="text-gray-500 text-xs">
                            Founded in 1949, William Pitt - Julia B. Fee Sotheby's International Realty is the premier real estate brokerage firm managing a $4+ billion portfolio with more than 1,100 sales associates in 26 brokerages spanning Connecticut, Massachusetts, and Westchester County, New York.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" className="px-2">
                                <img className="w-5 h-5" src="/src/assets/social/theme/facebook.png" alt="facebook" />
                            </Button>
                            <Button variant="outline" className="px-2">
                                <img className="w-5 h-5" src="/src/assets/social/theme/x.png" alt="x" />
                            </Button>
                            <Button variant="outline" className="px-2">
                                <img className="w-5 h-5" src="/src/assets/social/theme/youtube.png" alt="youtube" />
                            </Button>
                            <Button variant="outline" className="px-2">
                                <img className="w-5 h-5" src="/src/assets/social/theme/instagram.png" alt="instagram" />
                            </Button>
                            <Button variant="outline" className="px-2">
                                <img className="w-5 h-5" src="/src/assets/social/theme/linkedin.png" alt="linkedin" />
                            </Button>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="px-4 py-6 space-y-6">
                    <div className="flex justify-between items-center gap-3">
                        <p className="text-md font-semibold">Publications</p>
                        <div className="grid items-center gap-1.5">
                            <div className="relative">
                                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                    <Search className="h-4 w-4" />
                                </div>
                                <Input
                                    id="search"
                                    autoComplete="off"
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex flex-col space-y-4">
                                <Skeleton className="w-full h-48 rounded-md" />
                                <Skeleton className="w-full h-6 rounded-md" />
                                <Skeleton className="w-3/4 h-6 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                <div className="px-4 py-6 gap-3 flex justify-evenly flex-wrap">
                    <a href="https://www.flipnova.com/" className="text-gray-500">Home</a>
                    <a href="https://www.flipnova.com/" className="text-gray-500">About</a>
                    <a href="https://www.flipnova.com/" className="text-gray-500">ContactUs</a>
                    <a href="https://www.flipnova.com/" className="text-gray-500">Service</a>
                </div>
            </CardContent>
        </Card>
    )
}
