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
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function MoveToWorkspaceDialog({ isMoveToWorkspaceModalOpen, setIsMoveToWorkspaceModalOpen }) {
    const [selectedWorkspace, setSelectedWorkspace] = useState("workspace1")
    const [agreed, setAgreed] = useState(false)

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
                        <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                            <SelectTrigger id="workspace-select">
                                <SelectValue placeholder="Select a workspace" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="workspace1">Workspace 1</SelectItem>
                                    <SelectItem value="workspace2">Workspace 2</SelectItem>
                                    <SelectItem value="workspace3">Workspace 3</SelectItem>
                                    <SelectItem value="workspace4">Workspace 4</SelectItem>
                                    <SelectItem value="workspace5">Workspace 5</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Alert variant="warning" className="bg-amber-50 border border-amber-400">
                        <AlertTriangle className="h-4 w-4" color="#705a0e"/>
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
                        />
                        <Label htmlFor="agree" className="text-sm font-medium leading-none">
                            I understand and agree
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsMoveToWorkspaceModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button disabled={!agreed}>
                        Move now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}