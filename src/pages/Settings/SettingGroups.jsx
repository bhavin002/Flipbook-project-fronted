import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateGroupDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Groups/CreateGroupDialog"
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getData } from '@/utils/datas';
import GroupsTable from "../../components/AppLayoutComponents/Sidebar/Setting/Groups/GroupsTable";
import TablePagination from "@/utils/TablePagination";

export default function SettingGroups() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const recordsPerPage = 5;

    const groups = getData('groups');

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentGroups = filteredGroups.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredGroups.length / recordsPerPage);

    const toggleSelect = (id) => {
        if (selectedGroups.includes(id)) {
            setSelectedGroups(selectedGroups.filter(teamId => teamId !== id));
        } else {
            setSelectedGroups([...selectedGroups, id]);
        }
    };

    const toggleSelectAll = (currentTeammateIds) => {
        const allCurrentSelected = currentTeammateIds.every(id => selectedGroups.includes(id));

        if (allCurrentSelected) {
            setSelectedGroups(selectedGroups.filter(id => !currentTeammateIds.includes(id)));
        } else {
            const newSelectedGroups = [...selectedGroups];
            currentTeammateIds.forEach(id => {
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
        setSelectedGroups([]);
    };
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Groups</h1>
                <p className="text-gray-500">Create multiple groups of groups for different categories or departments.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Manage your groups</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateGroupDialog />
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
                        />

                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChangePage={changePage}
                        />
                        <div className="text-sm text-gray-500 mt-4 text-center">
                            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredGroups.length)} of {filteredGroups.length} groups
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}