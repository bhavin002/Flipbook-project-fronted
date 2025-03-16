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
import SelectRole from './SelectRole';
import { Switch } from "@/components/ui/switch";

export default function TeammatesTable({
    currentTeammates,
    selectedTeammates,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected
}) {
    const headerCheckboxRef = useRef(null);
    const currentTeammateIds = currentTeammates.map(teammate => teammate.id);

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

    return (
        <div className="border rounded-lg overflow-hidden">
            {selectedTeammates.length > 0 && (
                <div className="flex items-center justify-between py-3 px-4 border-b">
                    <div className="text-primary font-medium">
                        {selectedTeammates.length} Selected
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
                                onCheckedChange={() => onToggleSelectAll(currentTeammateIds)}
                            />
                        </TableHead>
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="font-medium">Role</TableHead>
                        <TableHead className="font-medium">SSO only</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentTeammates.map((teammate) => (
                        <TableRow key={teammate.id} className={selectedTeammates.includes(teammate.id) ? 'bg-primary/10 hover:bg-primary/10' : ''}>
                            <TableCell className="w-12">
                                <Checkbox
                                    checked={selectedTeammates.includes(teammate.id)}
                                    onCheckedChange={() => onToggleSelect(teammate.id)}
                                />
                            </TableCell>
                            <TableCell className="text-sm">{teammate.email}</TableCell>
                            <TableCell>
                                <SelectRole defaultRole={teammate.role} />
                            </TableCell>
                            <TableCell>
                                <Switch />
                            </TableCell>
                            <TableCell>
                                <span className={`px-3 py-1 text-xs rounded-full ${statusStyles[teammate.status] || statusStyles.default}`}>
                                    {teammate.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm">Resend</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}