import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useWorkspaces } from "@/context/WorkspaceContext"
import { MoveToWorkspaceApi } from "@/service/flipbook.service"
import { toast } from "sonner"
import LoadingButton from "@/utils/LoadingButton"

export default function MoveToWorkspaceDialog({ isMoveToWorkspaceModalOpen, setIsMoveToWorkspaceModalOpen, flipbookId, setFlipbooks }) {
    console.log("MoveToWorkspaceDialog rendered with flipbookId:", flipbookId)
    const { workspaces } = useWorkspaces()
    const [selectedWorkspace, setSelectedWorkspace] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Find current workspace and set as default when dialog opens
    useEffect(() => {
        if (isMoveToWorkspaceModalOpen && workspaces && workspaces.length > 0) {
            const currentWorkspace = workspaces.find(workspace => workspace.isCurrent)
            if (currentWorkspace) {
                setSelectedWorkspace(currentWorkspace._id)
            }
            // Reset states when dialog opens
            setAgreed(false)
        }
    }, [isMoveToWorkspaceModalOpen, workspaces])

    // Check if selected workspace is different from current workspace
    const isWorkspaceChanged = () => {
        if (!workspaces || !selectedWorkspace) return false
        const currentWorkspace = workspaces.find(workspace => workspace.isCurrent)
        return currentWorkspace && currentWorkspace._id !== selectedWorkspace
    }

    const handleMoveWorkspace = async () => {
        console.log("!selectedWorkspace || !flipbookId || !isWorkspaceChanged() ????", !selectedWorkspace, !flipbookId, !isWorkspaceChanged())
        if (!selectedWorkspace || !flipbookId || !isWorkspaceChanged()) return

        setIsLoading(true)

        try {
            const data = {
                workspaceId: selectedWorkspace,
                flipbookId: flipbookId
            }

            const response = await MoveToWorkspaceApi(data)

            setIsMoveToWorkspaceModalOpen(false)

            setFlipbooks(prev => prev.filter(flipbook => flipbook._id !== flipbookId))

            toast.success("Flipbook moved successfully", {
                description: response.message || "Flipbook has been moved to the selected workspace"
            })

        } catch (err) {
            toast.error("Failed to move flipbook", {
                description: err.message || "Something went wrong"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setIsMoveToWorkspaceModalOpen(false)
        setSelectedWorkspace("")
        setAgreed(false)
    }

    // Check if move button should be enabled
    const isMoveButtonEnabled = agreed && isWorkspaceChanged() && !isLoading

    return (
        <Dialog open={isMoveToWorkspaceModalOpen} onOpenChange={setIsMoveToWorkspaceModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Move to another workspace</DialogTitle>
                    <DialogDescription>
                        Select a workspace to move your flipbook to
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="workspace-select">
                            Your workspaces
                        </Label>
                        <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace} disabled={isLoading}>
                            <SelectTrigger id="workspace-select">
                                <SelectValue placeholder="Select a workspace" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {workspaces && workspaces.map((workspace) => (
                                        <SelectItem
                                            key={workspace._id}
                                            value={workspace._id}
                                        >
                                            {workspace.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Alert variant="warning" className="bg-amber-50 border border-amber-400">
                        <AlertTriangle className="h-4 w-4" color="#705a0e" />
                        <AlertDescription className="text-[#705a0e]" >
                            Any custom fonts used in this flipbook will be copied and transferred to the selected
                            workspace, and users of the workspace will have access to them. You agree that you
                            have the necessary and valid license to use any custom fonts present in this flipbook
                            and to grant access to users of the selected workspace to use these custom fonts.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="warning" className="bg-amber-50 border border-amber-400">
                        <AlertTriangle className="h-4 w-4" color="#705a0e" />
                        <AlertDescription className="text-[#705a0e]">
                            Be aware that moving this flipbook to other workspace, all your current generated links
                            will be lost and new ones will be created.
                        </AlertDescription>
                    </Alert>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="agree"
                            checked={agreed}
                            onCheckedChange={setAgreed}
                            disabled={isLoading}
                        />
                        <Label htmlFor="agree" className="text-sm font-medium leading-none">
                            I understand and agree
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!isMoveButtonEnabled}
                        onClick={handleMoveWorkspace}
                    >
                        {isLoading ? <LoadingButton /> : "Move now"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}