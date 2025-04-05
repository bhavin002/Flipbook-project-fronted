import * as React from "react"
import { useState } from "react"
import { Search, User, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import MyUpload from "./MyUpload";
import TeamUpload from "./TeamUpload";

export default function UploadsSidebarPanel() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                    <Search className="h-4 w-4" />
                </div>
                <Input
                    id="search"
                    autoComplete="off"
                    type="search"
                    placeholder="Search uploads"
                    className="w-full rounded-lg bg-background text-black pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
            </div>
            <Tabs defaultValue="myUpload" className="flex flex-col space-y-4">
                <TabsList className="w-full">
                    <TabsTrigger className="items-center gap-2 w-full" value="myUpload">
                        <User className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">My uploads</span>
                    </TabsTrigger>
                    <TabsTrigger className="items-center gap-2 w-full" value="teamUpload">
                        <Users className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Team uploads</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="myUpload" className="space-y-4">
                    <MyUpload />
                </TabsContent>
                <TabsContent value="teamUpload" className="space-y-4">
                    <TeamUpload />
                </TabsContent>
            </Tabs>
        </div>
    )
}