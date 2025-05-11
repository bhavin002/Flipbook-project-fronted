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

export default function ReadersTable({
    currentReaders,
    selectedReaders,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected,
    isLoading,
    resendingId,
    onResendInvitation
}) {
    const headerCheckboxRef = useRef(null);
    const currentReaderIds = currentReaders.map(reader => reader.id);

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

    if (isLoading) {
        return (
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-12">
                                <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                            </TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-12">
                                    <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (currentReaders.length === 0) {
        return (
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-12">
                                <Checkbox disabled />
                            </TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                No readers found for the current search.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

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
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentReaders.map((reader) => (
                        <TableRow key={reader.id} className={selectedReaders.includes(reader.id) ? 'bg-muted/50' : ''}>
                            <TableCell className="w-12">
                                <Checkbox
                                    checked={selectedReaders.includes(reader.id)}
                                    onCheckedChange={() => onToggleSelect(reader.id)}
                                />
                            </TableCell>
                            <TableCell className="text-sm">{reader.email}</TableCell>
                            <TableCell>
                                <span className={`px-3 py-1 text-xs rounded-full ${statusStyles[reader.status] || statusStyles.default}`}>
                                    {reader.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                {reader.status === "Pending" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={resendingId === reader.id}
                                        onClick={() => onResendInvitation(reader.id)}
                                    >
                                        {resendingId === reader.id ? (
                                            <>
                                                Sending...
                                            </>
                                        ) : "Resend"}
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}