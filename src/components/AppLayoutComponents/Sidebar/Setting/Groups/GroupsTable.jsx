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
import EditGroupDialog from './EditGroupDialog';
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { DeleteWorkspaceGroupsApi } from "@/service/workspace.group.service";
import { toast } from "sonner";

export default function GroupsTable({
    currentGroups,
    selectedGroups,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected,
    setGroups,
    isLoading
}) {
    const headerCheckboxRef = useRef(null);
    const currentGroupIds = currentGroups.map(group => group._id);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeletingGroup, setIsDeletingGroup] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);

    const allCurrentSelected = currentGroups.length > 0 &&
        currentGroupIds.every(id => selectedGroups.includes(id));

    const someCurrentSelected = currentGroups.length > 0 &&
        currentGroupIds.some(id => selectedGroups.includes(id)) &&
        !allCurrentSelected;

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = someCurrentSelected;
        }
    }, [someCurrentSelected]);

    const handleDeleteSingleGroup = (group) => {
        setGroupToDelete(group);
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmation = async (confirmed) => {
        if (confirmed && groupToDelete) {
            setIsDeletingGroup(true);
            try {
                const response = await DeleteWorkspaceGroupsApi({
                    groupIds: [groupToDelete._id]
                });

                setGroups(prevGroups => prevGroups.filter(group => group._id !== groupToDelete._id));

                toast.success("Group deleted", {
                    description: response.message || "Group has been removed successfully."
                });
            } catch (error) {
                toast.error("Failed to delete group", {
                    description: error.message || "Something went wrong."
                });
            } finally {
                setIsDeletingGroup(false);
                setIsDeleteConfirmOpen(false);
                setGroupToDelete(null);
            }
        } else {
            setIsDeleteConfirmOpen(false);
            setGroupToDelete(null);
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
                            <TableHead className="font-medium">Group name</TableHead>
                            <TableHead className="font-medium">Members</TableHead>
                            <TableHead className="font-medium text-center">Actions</TableHead>
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
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-1" />
                                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-1" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (currentGroups.length === 0) {
        return (
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-12">
                                <Checkbox disabled />
                            </TableHead>
                            <TableHead className="font-medium">Group name</TableHead>
                            <TableHead className="font-medium">Members</TableHead>
                            <TableHead className="font-medium text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                No groups found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            {selectedGroups.length > 0 && (
                <div className="flex items-center justify-between py-3 px-4 border-b">
                    <div className="text-primary font-medium">
                        {selectedGroups.length} Selected
                    </div>
                    <Button
                        variant="ghost"
                        onClick={onDeleteSelected}
                        className="text-red-600 hover:text-red-600 hover:bg-red-50"
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
                                onCheckedChange={() => onToggleSelectAll(currentGroupIds)}
                            />
                        </TableHead>
                        <TableHead className="font-medium">Group name</TableHead>
                        <TableHead className="font-medium">Members</TableHead>
                        <TableHead className="font-medium text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentGroups.map((group) => (
                        <TableRow key={group._id} className={selectedGroups.includes(group._id) ? 'bg-muted/50' : ''}>
                            <TableCell className="w-12">
                                <Checkbox
                                    checked={selectedGroups.includes(group._id)}
                                    onCheckedChange={() => onToggleSelect(group._id)}
                                />
                            </TableCell>
                            <TableCell className="text-sm">{group.name}</TableCell>
                            <TableCell className="text-sm">{group.readerIds ? group.readerIds.length : 0} member{group.readerIds && group.readerIds.length !== 1 ? 's' : ''}</TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center space-x-2">
                                    <EditGroupDialog group={group} setGroups={setGroups} />
                                    <Button 
                                        variant="ghost" 
                                        className="hover:text-red-500" 
                                        size="sm" 
                                        onClick={() => handleDeleteSingleGroup(group)}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteConfirmOpen}
                setIsConfirmModalOpen={setIsDeleteConfirmOpen}
                title="Delete group"
                description={groupToDelete ? `Are you sure you want to delete "${groupToDelete.name}" group?` : "Are you sure you want to delete this group?"}
                isLoading={isDeletingGroup}
                onConfirm={() => handleDeleteConfirmation(true)}
                onCancel={() => handleDeleteConfirmation(false)}
            />
        </div>
    );
}