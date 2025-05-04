import * as React from "react"
import { useState } from "react"
import { User, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MyUpload from "./MyUpload";
import TeamUpload from "./TeamUpload";
import MediaFilterDropDownCom from "./MediaFilterDropDownCom";

export default function UploadsSidebarPanel({ mainStage, selectedIndex }) {
    const [createdByFilter, setCreatedByFilter] = useState([]);
    const mediaTypes = {
        id: 'createdBy',
        options: [
            { value: 'jpg', label: 'JPG' },
            { value: 'jpeg', label: 'JPEG' },
            { value: 'png', label: 'PNG' },
            { value: 'gif', label: 'GIF' },
            { value: 'mp4', label: 'MP4' },
            { value: 'svg', label: 'SVG' },
        ],
        selectedValues: createdByFilter,
        onChange: setCreatedByFilter
    }

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <MediaFilterDropDownCom
                key={mediaTypes.id}
                options={mediaTypes.options}
                selectedValues={mediaTypes.selectedValues}
                onChange={mediaTypes.onChange}
            />
            <Tabs defaultValue="myUpload" className="flex flex-col space-y-4 flex-grow overflow-y-auto h-0">
                <TabsList className="w-full">
                    <TabsTrigger className="items-center gap-2 w-full" value="myUpload">
                        <User className="w-5 h-5" />
                        <span className="text-xs">My uploads</span>
                    </TabsTrigger>
                    <TabsTrigger className="items-center gap-2 w-full" value="teamUpload">
                        <Users className="w-5 h-5" />
                        <span className="text-xs">Team uploads</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="myUpload" className="space-y-4 hidden-cust flex-1 flex flex-col overflow-y-auto">
                    <MyUpload />
                </TabsContent>
                <TabsContent value="teamUpload" className="space-y-4 hidden-cust flex-1 flex flex-col  overflow-y-auto">
                    <TeamUpload />
                </TabsContent>
            </Tabs>
        </div>
    )
}