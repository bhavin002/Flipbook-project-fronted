import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SelectRole({ 
    roles = [], 
    isLoading = false, 
    selectedRole = "", 
    onRoleChange, 
    error,
    disabled = false
}) {
    const selectedRoleName = () => {
        if (!selectedRole || roles.length === 0) return "";
        const role = roles.find(r => r._id === selectedRole);
        return role ? role.name : "";
    };

    return (
        <Select 
            value={selectedRole} 
            onValueChange={onRoleChange}
            disabled={isLoading || roles.length === 0 || disabled}
        >
            <SelectTrigger id="role" className={`w-full ${error ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select a role">
                    {selectedRoleName()}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {isLoading ? (
                    <SelectItem value="loading" disabled>
                        Loading roles...
                    </SelectItem>
                ) : roles.length === 0 ? (
                    <SelectItem value="none" disabled>
                        No roles available
                    </SelectItem>
                ) : (
                    roles.map((role) => (
                        <SelectItem 
                            key={role._id} 
                            value={role._id}
                            disabled={role.name.toLowerCase() === "owner"}
                        >
                            {role.name}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    )
}