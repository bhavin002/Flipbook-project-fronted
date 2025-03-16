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
import { Switch } from "@/components/ui/switch";

export default function ReadersTable({
    currentReaders,
    selectedReaders,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected
}) {
    const headerCheckboxRef = useRef(null);
    const currentReaderIds = currentReaders.map(teammate => teammate.id);

    const allCurrentSelected = currentReaders.length > 0 &&
        currentReaderIds.every(id => selectedReaders.includes(id));

    const someCurrentSelected = currentReaders.length > 0 &&
        currentReaderIds.some(id => selectedReaders.includes(id)) &&
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
            {selectedReaders.length > 0 && (
                <div className="flex items-center justify-between py-3 px-4 border-b">
                    <div className="text-primary font-medium">
                        {selectedReaders.length} Selected
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
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="font-medium">SSO only</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentReaders.map((teammate) => (
                        <TableRow key={teammate.id} className={selectedReaders.includes(teammate.id) ? 'bg-primary/10 hover:bg-primary/10' : ''}>
                            <TableCell className="w-12">
                                <Checkbox
                                    checked={selectedReaders.includes(teammate.id)}
                                    onCheckedChange={() => onToggleSelect(teammate.id)}
                                />
                            </TableCell>
                            <TableCell className="text-sm">{teammate.email}</TableCell>
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