import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { CircleUser, BookUser, Settings, Wrench, LogOut, ChevronRight, Check, Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useWorkspaces } from "@/context/WorkspaceContext";

export default function ProfileDropDownCom() {
    const navigate = useNavigate();
    const { logout, userMeta } = useAuth();
    console.log("userMeta ??",userMeta)
    const { workspaces, isLoading, setIsNeededRefetch } = useWorkspaces();

    const currentWorkspace = workspaces.find(w => w.isCurrent) || workspaces[0];

    const handleItemClick = (action) => {
        if (action === "setting") {
            navigate("/settings/workspace");
        } else if (action === "my-account") {
            navigate("/account/details");
        } else if (action === "logout") {
            logout();
            navigate("/auth/sign-in");
        }
    };

    const switchWorkspace = (workspaceId) => {
        // Store selected workspace ID in session storage
        sessionStorage.setItem("fn_workspace_id", workspaceId);
        setIsNeededRefetch(true)
        navigate("/auth/sign-in");
    };

    // Function to get initials from workspace name
    const getInitials = (name) => {
        return name ? name.split(' ').map(word => word[0]).join('').substring(0, 1).toUpperCase() : "W";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="/src/assets/profile.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src="/src/assets/profile.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <DropdownMenuLabel className="p-0 px-2 pb-1.5">{userMeta.firstName + userMeta.lastName}</DropdownMenuLabel>
                        <p className="text-xs ml-2 text-muted-foreground truncate max-w-40 -mt-2">{userMeta.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer">
                            <div className="flex items-center gap-2">
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[14px] bg-primary text-primary-foreground">
                                            {currentWorkspace ? getInitials(currentWorkspace.name) : "W"}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <span className="text-sm font-medium">
                                    {isLoading
                                        ? "Loading workspaces..."
                                        : currentWorkspace
                                            ? currentWorkspace.name
                                            : "No workspace selected"}
                                </span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent side="left" className="w-64 p-2">
                        <h4 className="text-sm font-medium mb-2 px-2">My workspaces</h4>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                <span className="text-sm">Loading workspaces...</span>
                            </div>
                        ) : workspaces.length === 0 ? (
                            <div className="text-sm text-muted-foreground text-center py-4">
                                No workspaces available
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {workspaces.map(workspace => (
                                    <div
                                        key={workspace._id}
                                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${workspace.isCurrent ? 'bg-accent' : 'hover:bg-accent'}`}
                                        onClick={() => switchWorkspace(workspace._id)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-[14px] bg-primary text-primary-foreground">
                                                    {getInitials(workspace.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{workspace.name}</span>
                                            {workspace.isOwner && (
                                                <span className="text-xs bg-muted px-1.5 py-0.5 rounded-md">Owner</span>
                                            )}
                                        </div>
                                        {workspace.isCurrent && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </PopoverContent>
                </Popover>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <CircleUser className="mr-2 h-4 w-4" /> My profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleItemClick("my-account")}>
                        <BookUser className="mr-2 h-4 w-4" /> My account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleItemClick("setting")}>
                        <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Wrench className="mr-2 h-4 w-4" /> Help and support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick("logout")}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}