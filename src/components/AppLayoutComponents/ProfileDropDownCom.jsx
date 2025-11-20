import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { CircleUser, BookUser, Settings, Wrench, LogOut, ChevronRight, Check, Loader2, SquareArrowOutUpRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useWorkspaces } from "@/context/WorkspaceContext";

export default function ProfileDropDownCom() {
    const navigate = useNavigate();
    const { logout, userMeta, refreshUserInfo } = useAuth();
    const { currentWorkspace, workspaces, isLoading, setIsNeededRefetch, myWorkspaceId } = useWorkspaces();
    const { permissions } = useAuth();

    const handleItemClick = (action) => {
        if (action === "settings") {
            navigate("/settings/workspace");
        } else if (action === "my-account") {
            navigate("/account/details");
        } else if (action === "logout") {
            logout();
            navigate("/auth/sign-in");
        }
    };

    const handleMyProfileClick = () => {
        if (myWorkspaceId) {
            window.open(`/profile/${myWorkspaceId}`, '_blank');
        }
    };

    const switchWorkspace = async (workspaceId) => {
        localStorage.setItem("fn_workspace_id", workspaceId);
        setIsNeededRefetch(true);
        await refreshUserInfo();
        navigate("/auth/sign-in");
    };

    // Function to get initials from user's first and last name
    const getUserInitials = () => {
        const firstName = userMeta?.firstName || "";
        const lastName = userMeta?.lastName || "";
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    // Function to get initials from workspace name
    const getInitials = (name) => {
        return name ? name.split(' ').map(word => word[0]).join('').substring(0, 1).toUpperCase() : "W";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="inline-flex shrink-0 items-center size-9 gap-x-3 text-start rounded-full focus:outline-none border border-gray-100 dark:border-neutral-700 justify-center overflow-hidden">
                    {userMeta?.profileImage ? (
                        <img
                            src={userMeta.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover aspect-1"
                        />
                    ) : (
                        <div className="w-[35px] h-[34px] bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {getUserInitials()}
                        </div>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <div className="flex items-center">
                    <div className="inline-flex shrink-0 items-center size-9 gap-x-3 text-start rounded-full focus:outline-none border border-gray-100 dark:border-neutral-700 justify-center overflow-hidden">
                        {userMeta?.profileImage ? (
                            <img
                                src={userMeta.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover aspect-1"
                            />
                        ) : (
                            <div className="w-[35px] h-[34px] bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                {getUserInitials()}
                            </div>
                        )}
                    </div>
                    <div>
                        <DropdownMenuLabel className="p-0 px-2 pb-1.5">{userMeta.firstName + " " + userMeta.lastName}</DropdownMenuLabel>
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
                                ) : currentWorkspace?.logoUrl ? (
                                    <img
                                        src={currentWorkspace.logoUrl}
                                        alt="Workspace"
                                        className="w-full h-auto max-w-[24px] max-h-[24px] object-cover aspect-1 rounded-full"
                                    />
                                ) : (
                                    <div className="w-[24px] h-[24px] bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                        {currentWorkspace ? getInitials(currentWorkspace.name) : "W"}
                                    </div>
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
                    <PopoverContent side={window.innerWidth <= 768 ? "bottom" : "left"} className="w-64 p-2">
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
                                            {workspace.logoUrl ? (
                                                <img
                                                    src={workspace.logoUrl}
                                                    alt="Workspace"
                                                    className="w-full h-auto max-w-[24px] max-h-[24px] object-cover aspect-1 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-[24px] h-[24px] bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                                    {getInitials(workspace.name)}
                                                </div>
                                            )}
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
                    <DropdownMenuItem onClick={handleMyProfileClick}>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center">
                                <CircleUser className="mr-2 h-4 w-4" />
                                <span>My profile</span>
                            </div>
                            <SquareArrowOutUpRight className="h-4 w-4" />
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleItemClick("my-account")}>
                        <BookUser className="mr-2 h-4 w-4" /> My account
                    </DropdownMenuItem>
                    {permissions.settings && <DropdownMenuItem onClick={() => handleItemClick("settings")}>
                        <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>}
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>
                    <Wrench className="mr-2 h-4 w-4" /> Help and support
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick("logout")}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}