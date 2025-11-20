import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateGroupDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Groups/CreateGroupDialog";
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import GroupsTable from "../../components/AppLayoutComponents/Sidebar/Setting/Groups/GroupsTable";
import TablePagination from "@/utils/TablePagination";
import { GetWorkspaceGroupsApi, DeleteWorkspaceGroupsApi } from "@/service/workspace.group.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";

export default function SettingGroups() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeletingGroups, setIsDeletingGroups] = useState(false);
    
    const recordsPerPage = 5;

    const fetchGroups = async () => {
        try {
            setIsLoading(true);
            const response = await GetWorkspaceGroupsApi();
            if (response.data) {
                setGroups(response.data);
            } else {
                setGroups([]);
            }
        } catch (error) {
            toast.error("Failed to fetch groups", {
                description: error.message || "Oops! Something went wrong.",
            });
            setGroups([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentGroups = filteredGroups.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredGroups.length / recordsPerPage);

    const toggleSelect = (id) => {
        if (selectedGroups.includes(id)) {
            setSelectedGroups(selectedGroups.filter(groupId => groupId !== id));
        } else {
            setSelectedGroups([...selectedGroups, id]);
        }
    };

    const toggleSelectAll = (currentGroupIds) => {
        const allCurrentSelected = currentGroupIds.every(id => selectedGroups.includes(id));

        if (allCurrentSelected) {
            setSelectedGroups(selectedGroups.filter(id => !currentGroupIds.includes(id)));
        } else {
            const newSelectedGroups = [...selectedGroups];
            currentGroupIds.forEach(id => {
                if (!newSelectedGroups.includes(id)) {
                    newSelectedGroups.push(id);
                }
            });
            setSelectedGroups(newSelectedGroups);
        }
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteSelectedGroups = () => {
        if (selectedGroups.length > 0) {
            setIsDeleteConfirmOpen(true);
        }
    };

    const handleDeleteConfirmation = async (confirmed) => {
        if (confirmed) {
            setIsDeletingGroups(true);
            try {
                const response = await DeleteWorkspaceGroupsApi({
                    groupIds: selectedGroups
                });

                setGroups(groups.filter(group => !selectedGroups.includes(group._id)));
                setSelectedGroups([]);

                toast.success("Groups deleted", {
                    description: response.message || "Selected groups have been removed successfully."
                });
            } catch (error) {
                toast.error("Failed to delete groups", {
                    description: error.message || "Something went wrong."
                });
            } finally {
                setIsDeletingGroups(false);
                setIsDeleteConfirmOpen(false);
            }
        } else {
            setIsDeleteConfirmOpen(false);
        }
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Groups</h1>
                <p className="text-gray-500">Create multiple groups of readers for different categories or departments.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage your groups</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateGroupDialog setGroups={setGroups} />
                    <div className="mt-8">
                        <div className="flex justify-between mb-4 gap-4">
                            <h2 className="text-lg font-medium w-full">Groups ({filteredGroups.length})</h2>
                            <div className="relative">
                                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                    <Search className="h-4 w-4" />
                                </div>
                                <Input
                                    id="search"
                                    autoComplete="off"
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1); // Reset to first page on search
                                    }}
                                />
                            </div>
                        </div>

                        <GroupsTable
                            currentGroups={currentGroups}
                            selectedGroups={selectedGroups}
                            onToggleSelect={toggleSelect}
                            onToggleSelectAll={toggleSelectAll}
                            onDeleteSelected={deleteSelectedGroups}
                            setGroups={setGroups}
                            isLoading={isLoading}
                        />

                        {!isLoading && groups.length > 0 && (
                            <>
                                <TablePagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onChangePage={changePage}
                                />
                                <div className="text-sm text-gray-500 mt-4 text-center">
                                    Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredGroups.length)} of {filteredGroups.length} groups
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteConfirmOpen}
                setIsConfirmModalOpen={setIsDeleteConfirmOpen}
                title="Delete groups"
                description={`Are you sure you want to delete ${selectedGroups.length} ${selectedGroups.length === 1 ? 'group' : 'groups'}?`}
                isLoading={isDeletingGroups}
                onConfirm={() => handleDeleteConfirmation(true)}
                onCancel={() => handleDeleteConfirmation(false)}
            />
        </div>
    );
}