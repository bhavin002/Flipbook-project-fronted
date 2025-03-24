
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SelectRole({ defaultRole = "admin" }) {
    console.log("defaultRole", defaultRole);
    return (
        <Select defaultValue={defaultRole.toLocaleLowerCase()}>
            <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="owner" disabled>Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
            </SelectContent>
        </Select>
    )
}