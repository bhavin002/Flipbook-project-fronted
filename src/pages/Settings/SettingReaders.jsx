import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import {
    Info
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import InviteReaderDialog from "../../components/Sidebar/Setting/Readers/InviteReaderDialog"
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getData } from '@/utils/datas';
import ReadersTable from "../../components/Sidebar/Setting/Readers/ReadersTable"
import TablePagination from "@/utils/TablePagination";
import { Label } from "@/components/ui/label";

export default function SettingReaders() {
    const [selectedReaders, setSelectedReaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const recordsPerPage = 5;

    const readers = getData('readers');

    const filteredReaders = readers.filter(teammate =>
        teammate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teammate.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentReaders = filteredReaders.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredReaders.length / recordsPerPage);

    const toggleSelect = (id) => {
        if (selectedReaders.includes(id)) {
            setSelectedReaders(selectedReaders.filter(teamId => teamId !== id));
        } else {
            setSelectedReaders([...selectedReaders, id]);
        }
    };

    const toggleSelectAll = (currentTeammateIds) => {
        const allCurrentSelected = currentTeammateIds.every(id => selectedReaders.includes(id));

        if (allCurrentSelected) {
            setSelectedReaders(selectedReaders.filter(id => !currentTeammateIds.includes(id)));
        } else {
            const newSelectedTeammates = [...selectedReaders];
            currentTeammateIds.forEach(id => {
                if (!newSelectedTeammates.includes(id)) {
                    newSelectedTeammates.push(id);
                }
            });
            setSelectedReaders(newSelectedTeammates);
        }
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteSelectedTeammates = () => {
        setSelectedReaders([]);
    };
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4">
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
                    <InviteReaderDialog />
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
                            currentReaders={currentReaders}
                            selectedReaders={selectedReaders}
                            onToggleSelect={toggleSelect}
                            onToggleSelectAll={toggleSelectAll}
                            onDeleteSelected={deleteSelectedTeammates}
                        />

                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChangePage={changePage}
                        />
                        <div className="text-sm text-gray-500 mt-4 text-center">
                            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredReaders.length)} of {filteredReaders.length} readers
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}