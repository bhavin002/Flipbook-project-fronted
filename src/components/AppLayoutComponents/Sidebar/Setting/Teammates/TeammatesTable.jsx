import { useRef, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import SelectRole from './SelectRole';
import { UpdateTeammateRoleApi } from '@/service/teammate.service';
import { toast } from 'sonner';

export default function TeammatesTable({
    currentTeammates,
    selectedTeammates,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected,
    roles = [],
    isLoading,
    isLoadingRoles = false,
    resendingId,
    onResendInvitation,
    isTeammateOwner = false,
    onTeammateRoleUpdate
}) {
    const headerCheckboxRef = useRef(null);
    const currentTeammateIds = currentTeammates.map(teammate => teammate._id);
    const [updatingRoleId, setUpdatingRoleId] = useState(null);

    const allCurrentSelected = currentTeammates.length > 0 &&
        currentTeammateIds.every(id => selectedTeammates.includes(id));

    const someCurrentSelected = currentTeammates.length > 0 &&
        currentTeammateIds.some(id => selectedTeammates.includes(id)) &&
        !allCurrentSelected;

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = someCurrentSelected;
        }
    }, [someCurrentSelected]);

    const statusStyles = {
        "Active": "bg-green-100 text-green-800",
        "Pending": "bg-yellow-100 text-yellow-800",
        "default": "bg-gray-100 text-gray-800"
    };

    const getStatusText = (status) => {
        return status === 1 ? "Active" : "Pending";
    };

    const handleRoleChange = async (teammateId, newRoleId) => {
        try {
            setUpdatingRoleId(teammateId);
            const response = await UpdateTeammateRoleApi({
                teammateId,
                roleId: newRoleId
            });
            
            // Update the role in the parent component
            if (onTeammateRoleUpdate) {
                onTeammateRoleUpdate(teammateId, newRoleId);
            }
            
            toast.success("Role updated", {
                description: response.message || "Teammate role has been updated successfully."
            });
        } catch (error) {
            toast.error("Failed to update role", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setUpdatingRoleId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-12">
                                <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                            </TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Role</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-12">
                                    <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (currentTeammates.length === 0) {
        return (
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-12">
                                <Checkbox disabled />
                            </TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Role</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                No teammates found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            {selectedTeammates.length > 0 && isTeammateOwner && (
                <div className="flex items-center justify-between py-3 px-4 border-b">
                    <div className="text-primary font-medium">
                        {selectedTeammates.length} Selected
                    </div>
                    <Button
                        variant="ghost"
                        onClick={onDeleteSelected}
                        className="text-red-600 hover:text-red-600 hover:bg-red-50"
                        disabled={currentTeammates.some(teammate => 
                            selectedTeammates.includes(teammate._id) && teammate.isOwner
                        )}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="w-12">
                            <Checkbox
                                ref={headerCheckboxRef}
                                checked={allCurrentSelected}
                                onCheckedChange={() => onToggleSelectAll(currentTeammateIds)}
                                disabled={!isTeammateOwner}
                            />
                        </TableHead>
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="font-medium">Role</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentTeammates.map((teammate) => {
                        const statusText = getStatusText(teammate.status);
                        return (
                            <TableRow key={teammate._id} className={selectedTeammates.includes(teammate._id) ? 'bg-muted/50' : ''}>
                                <TableCell className="w-12">
                                    <Checkbox
                                        checked={selectedTeammates.includes(teammate._id)}
                                        onCheckedChange={() => onToggleSelect(teammate._id)}
                                        disabled={teammate.isOwner || !isTeammateOwner}
                                    />
                                </TableCell>
                                <TableCell className="text-sm">
                                    {teammate.email}
                                    {teammate.isOwner && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                            Owner
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <SelectRole 
                                        roles={roles} 
                                        isLoading={isLoadingRoles || updatingRoleId === teammate._id}
                                        selectedRole={teammate.userRole}
                                        onRoleChange={(roleId) => handleRoleChange(teammate._id, roleId)}
                                        disabled={teammate.isOwner || !isTeammateOwner}
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 text-xs rounded-full ${statusStyles[statusText] || statusStyles.default}`}>
                                        {statusText}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {teammate.status === 0 && isTeammateOwner && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={resendingId === teammate._id}
                                            onClick={() => onResendInvitation(teammate._id)}
                                        >
                                            {resendingId === teammate._id ? (
                                                <>
                                                    Sending...
                                                </>
                                            ) : "Resend"}
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}