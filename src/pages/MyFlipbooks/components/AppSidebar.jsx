import * as React from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarRail,
} from "@/components/ui/sidebar"
import { BookOpen } from 'lucide-react';
import { Users } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { LayoutPanelLeft } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';
import { Separator } from "@/components/ui/separator"

export function AppSidebar({ ...props }) {
    return (
        <Sidebar {...props} className="rounded-tr-xl overflow-hidden">
            <SidebarContent className="flex-1">
                <SidebarGroup>
                    <SidebarGroupLabel className="items-center">
                        <BookOpen className="mr-1" /> Flipbooks
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Collapsible
                                    className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                                    defaultOpen={true}
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <ChevronRight className="transition-transform" />
                                            <Users /> Team
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuButton
                                                isActive={true}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 1
                                            </SidebarMenuButton>

                                            <SidebarMenuButton
                                                isActive={false}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 2
                                            </SidebarMenuButton>
                                            <SidebarMenuButton
                                                isActive={false}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 3
                                            </SidebarMenuButton>
                                            <SidebarMenuButton
                                                isActive={false}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 4
                                            </SidebarMenuButton>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <UserCheck />
                                    Share with me
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="items-center">
                        <LayoutPanelLeft className="mr-1" /> Template
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Collapsible
                                    className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                                    defaultOpen={true}
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <ChevronRight className="transition-transform" />
                                            <Users /> Team
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuButton
                                                isActive={true}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 1
                                            </SidebarMenuButton>

                                            <SidebarMenuButton
                                                isActive={false}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 2
                                            </SidebarMenuButton>
                                            <SidebarMenuButton
                                                isActive={false}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 3
                                            </SidebarMenuButton>
                                            <SidebarMenuButton
                                                isActive={false}
                                                className="data-[active=true]:bg-transparent"
                                            >
                                                <Folder />
                                                Folder 4
                                            </SidebarMenuButton>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarContent>
                <Separator />
                <SidebarGroup>
                    <SidebarGroupContent className="space-y-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Trash />
                                    Trash
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <div className="space-y-2">
                            <Button
                                className="w-full bg-violet-700"
                            >
                                <Users/>
                                Invite teammates
                            </Button>
                            <Button className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700">
                                <Crown/>Upgrade
                            </Button>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}