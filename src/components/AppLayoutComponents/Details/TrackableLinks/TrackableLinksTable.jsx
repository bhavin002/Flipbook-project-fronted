import { useRef, useEffect, useState } from 'react';
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
import { ChartPie, Check, Copy, Trash2 } from 'lucide-react';
import EditTrackableLinkDialog from './EditTrackableLinkDialog';
import DeleteTrackableLinkDialog from './DeleteTrackableLinkDialog';
import { Input } from '@/components/ui/input';

export default function TrackableLinksTable({
    currentTrackableLinks,
    selectedTrackableLinks,
    onToggleSelect,
    onToggleSelectAll,
    onDeleteSelected
}) {
    const [copiedLinks, setCopiedLinks] = useState({});
    const handleCopy = (id, linkText) => {
        navigator.clipboard.writeText(linkText).then(() => {
            setCopiedLinks(prev => ({
                ...prev,
                [id]: true
            }));
            setTimeout(() => {
                setCopiedLinks(prev => ({
                    ...prev,
                    [id]: false
                }));
            }, 2000);
        });
    };
    const headerCheckboxRef = useRef(null);
    const currentReaderIds = currentTrackableLinks.map(trackableLink => trackableLink.id);

    const allCurrentSelected = currentTrackableLinks.length > 0 &&
        currentReaderIds.every(id => selectedTrackableLinks.includes(id));

    const someCurrentSelected = currentTrackableLinks.length > 0 &&
        currentReaderIds.some(id => selectedTrackableLinks.includes(id)) &&
        !allCurrentSelected;

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = someCurrentSelected;
        }
    }, [someCurrentSelected]);

    return (
        <div className="border rounded-lg overflow-hidden">
            {selectedTrackableLinks.length > 0 && (
                <div className="flex items-center justify-between py-3 px-4 border-b">
                    <div className="text-primary font-medium">
                        {selectedTrackableLinks.length} Selected
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
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Created</TableHead>
                        <TableHead className="font-medium">Link</TableHead>
                        <TableHead className="font-medium">Last viewed</TableHead>
                        <TableHead className="font-medium text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentTrackableLinks.map((trackableLink) => (
                        <TableRow key={trackableLink.id} className={selectedTrackableLinks.includes(trackableLink.id) ? 'bg-muted/50' : ''}>
                            <TableCell className="w-12">
                                <Checkbox
                                    checked={selectedTrackableLinks.includes(trackableLink.id)}
                                    onCheckedChange={() => onToggleSelect(trackableLink.id)}
                                />
                            </TableCell>
                            <TableCell className="text-sm">{trackableLink.name}</TableCell>
                            <TableCell className="text-sm">{trackableLink.created}</TableCell>
                            <TableCell className="text-sm">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        value={trackableLink.link}
                                        className="min-w-48"
                                        readOnly
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => handleCopy(trackableLink.id, trackableLink.link)}
                                    >
                                        {copiedLinks[trackableLink.id] ? (
                                            <>
                                                <Check className="h-4 w-4 mr-2" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">{trackableLink.lastViewed}</TableCell>
                            <TableCell className="flex items-center justify-center">
                                <EditTrackableLinkDialog />
                                <Button variant="ghost" size="sm"><ChartPie /></Button>
                                <DeleteTrackableLinkDialog />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}