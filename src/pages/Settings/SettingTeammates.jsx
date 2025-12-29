import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from 'lucide-react';
import InviteTeammateDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/InviteTeammateDialog"
import { Input } from '@/components/ui/input';
import TeammatesTable from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/TeammatesTable"
import RolesInfo from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/RolesInfo"
import TFA from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/TFA"
import TablePagination from '@/utils/TablePagination';
import { GetTeammatesApi, ResendTeammaterTokenApi, DeleteTeammatesApi } from '@/service/teammate.service';
import { GetUserRolesApi } from "@/service/user.role.service";
import { toast } from 'sonner';
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { useWorkspaces } from '@/context/WorkspaceContext';
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingTeammates() {
    const [selectedTeammates, setSelectedTeammates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [teammates, setTeammates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);
    const [resendingId, setResendingId] = useState(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeletingTeammates, setIsDeletingTeammates] = useState(false);
    const { currentWorkspace, isLoading: workspaceLoading } = useWorkspaces();
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Fetch teammates
                const teammatesResponse = await GetTeammatesApi();
                setTeammates(teammatesResponse.data.teammateData || []);

                // Fetch roles
                setIsLoadingRoles(true);
                const rolesResponse = await GetUserRolesApi();
                setRoles(rolesResponse.data || []);
            } catch (error) {
                toast.error("Failed to fetch data", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
                setIsLoadingRoles(false);
            }
        };

        fetchData();
    }, []);

    const handleResendInvitation = async (teammateId) => {
        try {
            setResendingId(teammateId);
            const response = await ResendTeammaterTokenApi(teammateId);
            toast.success("Invitation resent", {
                description: response.message
            });
        } catch (error) {
            toast.error("Failed to resend invitation", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setResendingId(null);
        }
    };

    const filteredTeammates = teammates.filter(teammate =>
        teammate.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentTeammates = filteredTeammates.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredTeammates.length / recordsPerPage);

    const toggleSelect = (id) => {
        // Don't select owners
        const teammate = teammates.find(t => t._id === id);
        if (teammate && teammate.isOwner) return;

        if (selectedTeammates.includes(id)) {
            setSelectedTeammates(selectedTeammates.filter(teamId => teamId !== id));
        } else {
            setSelectedTeammates([...selectedTeammates, id]);
        }
    };

    const toggleSelectAll = (currentTeammateIds) => {
        // Filter out owners from the selection
        const selectableIds = currentTeammateIds.filter(id => {
            const teammate = teammates.find(t => t._id === id);
            return teammate && !teammate.isOwner;
        });

        const allCurrentSelected = selectableIds.every(id => selectedTeammates.includes(id));

        if (allCurrentSelected) {
            setSelectedTeammates(selectedTeammates.filter(id => !selectableIds.includes(id)));
        } else {
            const newSelectedTeammates = [...selectedTeammates];
            selectableIds.forEach(id => {
                if (!newSelectedTeammates.includes(id)) {
                    newSelectedTeammates.push(id);
                }
            });
            setSelectedTeammates(newSelectedTeammates);
        }
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteSelectedTeammates = () => {
        if (selectedTeammates.length > 0) {
            setIsDeleteConfirmOpen(true);
        }
    };

    const handleDeleteConfirmation = async (confirmed) => {
        if (confirmed) {
            setIsDeletingTeammates(true);
            try {
                const response = await DeleteTeammatesApi({
                    teammateIds: selectedTeammates
                });

                setTeammates(teammates.filter(teammate => !selectedTeammates.includes(teammate._id)));
                setSelectedTeammates([]);

                toast.success("Teammates deleted", {
                    description: response.message || "Selected teammates have been removed successfully."
                });
            } catch (error) {
                toast.error("Failed to delete teammates", {
                    description: error.message || "Something went wrong."
                });
            } finally {
                setIsDeletingTeammates(false);
                setIsDeleteConfirmOpen(false);
            }
        } else {
            setIsDeleteConfirmOpen(false);
        }
    };

    const handleTeammateRoleUpdate = (teammateId, newRoleId) => {
        // Update the local state with the new role
        setTeammates(teammates.map(teammate =>
            teammate._id === teammateId
                ? { ...teammate, userRole: newRoleId }
                : teammate
        ));
    };

    return (
        <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Teammates</h1>
                <p className="text-gray-500">Add or remove teammates from this workspace, and manage roles.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage your teammates</CardTitle>
                </CardHeader>

                <CardContent>
                    <InviteTeammateDialog setTeammates={setTeammates} />
                    <div className="flex justify-center flex-wrap mt-8 mb-6 border shadow-sm rounded-lg p-4 gap-1">
                        The owner of this workspace is : {workspaceLoading ? <Skeleton className="h-5 w-32" /> : <p className="font-semibold">{currentWorkspace?.ownerName}</p>}
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between mb-4 gap-4">
                            <h2 className="text-lg font-medium w-full">Teammates ({filteredTeammates.length})</h2>
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
                                    }}
                                />
                            </div>
                        </div>

                        <>
                            <TeammatesTable
                                currentTeammates={currentTeammates}
                                selectedTeammates={selectedTeammates}
                                onToggleSelect={toggleSelect}
                                onToggleSelectAll={toggleSelectAll}
                                onDeleteSelected={deleteSelectedTeammates}
                                roles={roles}
                                isLoading={isLoading}
                                isLoadingRoles={isLoadingRoles}
                                resendingId={resendingId}
                                onResendInvitation={handleResendInvitation}
                                isTeammateOwner={true} // handle this is dynamic based on permission
                                onTeammateRoleUpdate={handleTeammateRoleUpdate}
                            />

                            <TablePagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onChangePage={changePage}
                            />
                            <div className="text-sm text-gray-500 mt-4 text-center">
                                Showing {filteredTeammates.length > 0 ? indexOfFirstRecord + 1 : 0}-
                                {Math.min(indexOfLastRecord, filteredTeammates.length)} of {filteredTeammates.length} teammates
                            </div>
                        </>
                    </div>
                </CardContent>
            </Card>
            <RolesInfo />
            {/* <TFA /> */}

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteConfirmOpen}
                setIsConfirmModalOpen={setIsDeleteConfirmOpen}
                title="Delete teammates"
                description={`Are you sure you want to delete ${selectedTeammates.length} ${selectedTeammates.length === 1 ? 'teammate' : 'teammates'}?`}
                isLoading={isDeletingTeammates}
                onConfirm={() => handleDeleteConfirmation(true)}
                onCancel={() => handleDeleteConfirmation(false)}
            />
        </div>
    );
}