import { useRef, useEffect } from 'react';
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
import DeleteGroupDialog from './DeleteGroupDialog';

export default function GroupsTable({
    currentGroups,
    selectedGroups,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected
}) {
    const headerCheckboxRef = useRef(null);
    const currentReaderIds = currentGroups.map(group => group.id);

    const allCurrentSelected = currentGroups.length > 0 &&
        currentReaderIds.every(id => selectedGroups.includes(id));

    const someCurrentSelected = currentGroups.length > 0 &&
        currentReaderIds.some(id => selectedGroups.includes(id)) &&
        !allCurrentSelected;

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = someCurrentSelected;
        }
    }, [someCurrentSelected]);

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
                                onCheckedChange={() => onToggleSelectAll(currentReaderIds)}
                            />
                        </TableHead>
                        <TableHead className="font-medium">Group name</TableHead>
                        <TableHead className="font-medium">Members</TableHead>
                        <TableHead className="font-medium text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentGroups.map((group) => (
                        <TableRow key={group.id} className={selectedGroups.includes(group.id) ? 'bg-primary/10 hover:bg-primary/10' : ''}>
                            <TableCell className="w-12">
                                <Checkbox
                                    checked={selectedGroups.includes(group.id)}
                                    onCheckedChange={() => onToggleSelect(group.id)}
                                />
                            </TableCell>
                            <TableCell className="text-sm">{group.name}</TableCell>
                            <TableCell className="text-sm">{group.members}</TableCell>
                            <TableCell className="flex items-center justify-center">
                                <EditGroupDialog  />
                                <DeleteGroupDialog/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}