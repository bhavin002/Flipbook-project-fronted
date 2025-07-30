import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import {
    Info,
    Search
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import InviteReaderDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Readers/InviteReaderDialog"
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import ReadersTable from "../../components/AppLayoutComponents/Sidebar/Setting/Readers/ReadersTable"
import TablePagination from "@/utils/TablePagination";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { DeleteTeammatesApi, GetWorkspaceReadersApi, ResendTeammaterTokenApi } from "@/service/teammate.service";

export default function SettingReaders() {
    const [selectedReaders, setSelectedReaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [readers, setReaders] = useState([]);
    const [resendingId, setResendingId] = useState(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeletingReaders, setIsDeletingReaders] = useState(false);

    const fetchReaders = async () => {
        try {
            setIsLoading(true);
            const response = await GetWorkspaceReadersApi();
            setReaders(response.data);
        } catch (error) {
            toast.error("Failed to fetch readers", {
                description: error.message || "Oops! Something went wrong.",
            });
            setReaders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReaders();
    }, []);

    const handleResendInvitation = async (readerId) => {
        try {
            setResendingId(readerId);
            const response = await ResendTeammaterTokenApi(readerId);
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

    const recordsPerPage = 5;

    const filteredReaders = readers?.filter(reader =>
        reader.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reader.status ? "active" : "pending").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentReaders = filteredReaders.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredReaders.length / recordsPerPage);

    const toggleSelect = (id) => {
        if (selectedReaders.includes(id)) {
            setSelectedReaders(selectedReaders.filter(readerId => readerId !== id));
        } else {
            setSelectedReaders([...selectedReaders, id]);
        }
    };

    const toggleSelectAll = (currentReaderIds) => {
        const allCurrentSelected = currentReaderIds.every(id => selectedReaders.includes(id));

        if (allCurrentSelected) {
            setSelectedReaders(selectedReaders.filter(id => !currentReaderIds.includes(id)));
        } else {
            const newSelectedReaders = [...selectedReaders];
            currentReaderIds.forEach(id => {
                if (!newSelectedReaders.includes(id)) {
                    newSelectedReaders.push(id);
                }
            });
            setSelectedReaders(newSelectedReaders);
        }
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteSelectedReaders = () => {
        if (selectedReaders.length > 0) {
            setIsDeleteConfirmOpen(true);
        }
    };

    const handleDeleteConfirmation = async (confirmed) => {
        if (confirmed) {
            setIsDeletingReaders(true);
            try {
                const response = await DeleteTeammatesApi({
                    teammateIds: selectedReaders
                });

                setReaders(readers.filter(reader => !selectedReaders.includes(reader._id)));

                setSelectedReaders([]);

                toast.success("Readers deleted", {
                    description: response.message || "Selected readers have been removed successfully."
                });
            } catch (error) {
                toast.error("Failed to delete readers", {
                    description: error.message || "Something went wrong."
                });
            } finally {
                setIsDeletingReaders(false);
                setIsDeleteConfirmOpen(false);
            }
        } else {
            setIsDeleteConfirmOpen(false);
        }
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Readers</h1>
                <p className="text-gray-500">Here you can add or remove account readers.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Show folders to your readers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3">
                        <Switch id="hide-profile-info" />
                        <Label htmlFor="hide-profile-info" className="text-gray-700">
                            Enable folder view
                        </Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    align="center"
                                    className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                >
                                    <p className="text-sm">By enabling folder view, the flipbooks shared with your readers will be neatly organized in different folders, hence, easier to access</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Manage your readers</CardTitle>
                </CardHeader>
                <CardContent>
                    <InviteReaderDialog setReaders={setReaders} />
                    <div className="mt-8">
                        <div className="flex justify-between mb-4 gap-4">
                            <h2 className="text-lg font-medium w-full">Readers ({filteredReaders.length})</h2>
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

                        <ReadersTable
                            currentReaders={currentReaders.map(reader => ({
                                id: reader._id,
                                email: reader.email,
                                status: reader.status ? "Active" : "Pending"
                            }))}
                            selectedReaders={selectedReaders}
                            onToggleSelect={toggleSelect}
                            onToggleSelectAll={toggleSelectAll}
                            onDeleteSelected={deleteSelectedReaders}
                            isLoading={isLoading}
                            resendingId={resendingId}
                            onResendInvitation={handleResendInvitation}
                        />

                        {!isLoading && readers.length > 0 && (
                            <>
                                <TablePagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onChangePage={changePage}
                                />
                                <div className="text-sm text-gray-500 mt-4 text-center">
                                    Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredReaders.length)} of {filteredReaders.length} readers
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteConfirmOpen}
                setIsConfirmModalOpen={setIsDeleteConfirmOpen}
                title="Delete readers"
                description={`Are you sure you want to delete ${selectedReaders.length} ${selectedReaders.length === 1 ? 'reader' : 'readers'}?`}
                isLoading={isDeletingReaders}
                onConfirm={() => handleDeleteConfirmation(true)}
                onCancel={() => handleDeleteConfirmation(false)}
            />
        </div>
    )
}