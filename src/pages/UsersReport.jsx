import { useEffect, useState } from 'react';
import { GetUsersWithFlipbookCountApi } from '@/service/auth.service';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import TablePagination from '@/utils/TablePagination';
import { toast } from 'sonner';

export default function UsersReport() {
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedEmail, setCopiedEmail] = useState(null);
    const recordsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const offset = (currentPage - 1) * recordsPerPage;
                const response = await GetUsersWithFlipbookCountApi(offset, recordsPerPage);
                setUsers(response.data.users);
                setTotalCount(response.data.totalCount || 0);
            } catch (err) {
                toast.error("Users report fetch failed", {
                    description: err.message || "Oops! Something went wrong.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const totalPages = Math.ceil(totalCount / recordsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const copyToClipboard = async (email) => {
        try {
            await navigator.clipboard.writeText(email);
            setCopiedEmail(email);
            setTimeout(() => setCopiedEmail(null), 2000);
        } catch (err) {
            console.error("Failed to copy email:", err);
        }
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Users Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-medium w-[60px]">No</TableHead>
                                    <TableHead className="font-medium">User</TableHead>
                                    <TableHead className="font-medium">Email</TableHead>
                                    <TableHead className="font-medium">Created At</TableHead>
                                    <TableHead className="font-medium text-right">Flipbook Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    Array.from({ length: 10 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : users.length > 0 ? (
                                    users.map((user, index) => (
                                        <TableRow key={user.id || index}>
                                            <TableCell className="text-sm font-medium">{indexOfFirstRecord + index + 1}</TableCell>
                                            <TableCell className="text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {user.name || (user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'N/A')}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                <div className="flex items-center gap-2 group">
                                                    <span>{user.email || 'N/A'}</span>
                                                    {user.email && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={() => copyToClipboard(user.email)}
                                                            title="Copy Email"
                                                        >
                                                            {copiedEmail === user.email ? (
                                                                <Check className="h-3 w-3 text-green-500" />
                                                            ) : (
                                                                <Copy className="h-3 w-3 text-muted-foreground" />
                                                            )}
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {user.createdAt ? (
                                                    <span title={new Date(user.createdAt).toString()}>
                                                        {format(new Date(user.createdAt), 'PPP')}
                                                    </span>
                                                ) : 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-sm text-right font-bold">
                                                {user.flipbookCount ?? user.count ?? 0}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {users.length > 0 && (
                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChangePage={changePage}
                        />
                    )}
                    <div className="text-sm text-gray-500 mt-4 text-center">
                        Showing {users.length === 0 ? 0 : indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, totalCount)} of {totalCount} users
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
