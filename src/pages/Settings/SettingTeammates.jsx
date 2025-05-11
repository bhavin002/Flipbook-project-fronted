import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from 'lucide-react';
import InviteTeammateDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/InviteTeammateDialog"
import { Input } from '@/components/ui/input';
import { getData } from '@/utils/datas';
import TeammatesTable from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/TeammatesTable"
import RolesInfo from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/RolesInfo"
import TFA from "../../components/AppLayoutComponents/Sidebar/Setting/Teammates/TFA"
import TablePagination from '@/utils/TablePagination';

export default function SettingTeammates() {
    const [selectedTeammates, setSelectedTeammates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const recordsPerPage = 5;

    const teammates = getData('teammates');

    const filteredTeammates = teammates.filter(teammate =>
        teammate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teammate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teammate.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentTeammates = filteredTeammates.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredTeammates.length / recordsPerPage);

    const toggleSelect = (id) => {
        if (selectedTeammates.includes(id)) {
            setSelectedTeammates(selectedTeammates.filter(teamId => teamId !== id));
        } else {
            setSelectedTeammates([...selectedTeammates, id]);
        }
    };

    const toggleSelectAll = (currentTeammateIds) => {
        const allCurrentSelected = currentTeammateIds.every(id => selectedTeammates.includes(id));

        if (allCurrentSelected) {
            setSelectedTeammates(selectedTeammates.filter(id => !currentTeammateIds.includes(id)));
        } else {
            const newSelectedTeammates = [...selectedTeammates];
            currentTeammateIds.forEach(id => {
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
        setSelectedTeammates([]);
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Teammates</h1>
                <p className="text-gray-500">Add or remove teammates from this workspace, and manage roles.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Manage your teammates</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center justify-between">
                        <InviteTeammateDialog />
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" /> <span className="text-sm">2/3 members</span>
                        </div>
                    </div>
                    <div className="flex justify-center flex-wrap mt-8 mb-6 border shadow-sm rounded-lg p-4 gap-1">
                        The owner of this workspace is : <p className="font-semibold">Bhavin Vasavada</p>
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

                        <TeammatesTable
                            currentTeammates={currentTeammates}
                            selectedTeammates={selectedTeammates}
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
                            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredTeammates.length)} of {filteredTeammates.length} teammates
                        </div>
                    </div>
                </CardContent>
            </Card>
            <RolesInfo />
            <TFA />
        </div>
    );
}