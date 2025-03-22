import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getData } from '@/utils/datas';
import CreateTrackableLinkDialog from "./TrackableLinks/CreateTrackableLinkDialog";
import TrackableLinksTable from "./TrackableLinks/TrackableLinksTable";
import TablePagination from "@/utils/TablePagination";

export default function TrackableLinks() {
    const [selectedTrackableLinks, setSelectedTrackableLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const recordsPerPage = 5;

    const trackableLinks = getData('trackableLinks');

    const filteredTrackableLinks = trackableLinks.filter(trackableLink =>
        trackableLink.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentTrackableLinks = filteredTrackableLinks.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredTrackableLinks.length / recordsPerPage);

    const toggleSelect = (id) => {
        if (selectedTrackableLinks.includes(id)) {
            setSelectedTrackableLinks(selectedTrackableLinks.filter(teamId => teamId !== id));
        } else {
            setSelectedTrackableLinks([...selectedTrackableLinks, id]);
        }
    };

    const toggleSelectAll = (currentTeammateIds) => {
        const allCurrentSelected = currentTeammateIds.every(id => selectedTrackableLinks.includes(id));

        if (allCurrentSelected) {
            setSelectedTrackableLinks(selectedTrackableLinks.filter(id => !currentTeammateIds.includes(id)));
        } else {
            const newselectedTrackableLinks = [...selectedTrackableLinks];
            currentTeammateIds.forEach(id => {
                if (!newselectedTrackableLinks.includes(id)) {
                    newselectedTrackableLinks.push(id);
                }
            });
            setSelectedTrackableLinks(newselectedTrackableLinks);
        }
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteSelectedTrackableLinks = () => {
        setSelectedTrackableLinks([]);
    };
    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-4 md:p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-2">Links for New flipbook</h1>
                <p className="text-sm md:text-base text-gray-500">Create unique links for your flipbook. Track the performance and engagement rate of each link.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Manage trackable links</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateTrackableLinkDialog />
                    <div className="mt-8">
                        <div className="flex justify-between mb-4 gap-4">
                            <h2 className="text-lg font-medium w-full">Total trackable links ({filteredTrackableLinks.length})</h2>
                            <div className="relative">
                                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                    <Search className="h-4 w-4" />
                                </div>
                                <Input
                                    id="search"
                                    autoComplete="off"
                                    type="search"
                                    placeholder="Search by name"
                                    className="w-full rounded-lg bg-background pl-8"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <TrackableLinksTable
                            currentTrackableLinks={currentTrackableLinks}
                            selectedTrackableLinks={selectedTrackableLinks}
                            onToggleSelect={toggleSelect}
                            onToggleSelectAll={toggleSelectAll}
                            onDeleteSelected={deleteSelectedTrackableLinks}
                        />

                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChangePage={changePage}
                        />
                        <div className="text-sm text-gray-500 mt-4 text-center">
                            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredTrackableLinks.length)} of {filteredTrackableLinks.length} trackable Links
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}