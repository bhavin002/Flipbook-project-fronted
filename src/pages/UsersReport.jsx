import React, { useEffect, useState } from 'react';
import { GetUsersWithFlipbookCountApi } from '@/service/auth.service';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, User, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function UsersReport() {
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [copiedEmail, setCopiedEmail] = useState(null);
    const limit = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Pass the current offset to the API
                const responseCallback = await GetUsersWithFlipbookCountApi(offset);

                // Based on the provided JSON: responseCallback.data.users and responseCallback.data.totalCount
                // But the previous implementation assumed responseCallback might be the data itself.
                // Let's handle both cases flexibly or stick to the new structure given by user.
                // User provided structure: { status: 200, data: { users: [], totalCount: 39 }, ... }

                let fetchedUsers = [];
                let fetchedTotal = 0;

                if (responseCallback?.data?.users) {
                    fetchedUsers = responseCallback.data.users;
                    fetchedTotal = responseCallback.data.totalCount || 0;
                } else if (responseCallback?.users) {
                    // Fallback for flat structure
                    fetchedUsers = responseCallback.users;
                    fetchedTotal = responseCallback.totalCount || 0;
                } else if (Array.isArray(responseCallback)) {
                    // Fallback if API returns just array
                    fetchedUsers = responseCallback;
                    fetchedTotal = responseCallback.length; // Can't know real total if just array
                }

                setUsers(fetchedUsers);
                setTotalCount(fetchedTotal);

            } catch (err) {
                console.error("Error fetching users report:", err);
                setError("Failed to load users report.");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [offset, navigate]);

    const handlePrevious = () => {
        setOffset((prev) => Math.max(0, prev - limit));
    };

    const handleNext = () => {
        setOffset((prev) => prev + limit);
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

    // Improved Next button logic:
    // Disable if loading
    // OR if we have displayed all available records (offset + users.length >= totalCount)
    // If totalCount is 0 or unavailable, fallback to checking if users.length < limit
    const isNextDisabled = loading || (totalCount > 0 ? (offset + users.length >= totalCount) : (users.length < limit));

    if (loading && offset === 0 && users.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="p-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl">Users Report</CardTitle>
                        <CardDescription>
                            Showing {users.length > 0 ? offset + 1 : 0} - {offset + users.length} of {totalCount} users
                        </CardDescription>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 font-normal">
                        Page {Math.floor(offset / limit) + 1}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60px]">#</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Flipbook Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    // Keep existing data with slight opacity or show skeleton if no data
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i} className="animate-pulse">
                                            <TableCell><div className="h-4 bg-muted rounded w-8"></div></TableCell>
                                            <TableCell><div className="h-4 bg-muted rounded w-32"></div></TableCell>
                                            <TableCell><div className="h-4 bg-muted rounded w-48"></div></TableCell>
                                            <TableCell><div className="h-4 bg-muted rounded w-24"></div></TableCell>
                                            <TableCell className="text-right"><div className="h-4 bg-muted rounded w-12 ml-auto"></div></TableCell>
                                        </TableRow>
                                    ))
                                ) : users.length > 0 ? (
                                    users.map((user, index) => (
                                        <TableRow key={user.id || index}>
                                            <TableCell className="font-medium">{offset + index + 1}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <span className="font-medium">
                                                        {user.name || (user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'N/A')}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
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
                                            <TableCell>
                                                {user.createdAt ? (
                                                    <span title={new Date(user.createdAt).toString()}>
                                                        {format(new Date(user.createdAt), 'PPP')}
                                                    </span>
                                                ) : 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-right font-bold">
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

                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrevious}
                            disabled={offset === 0 || loading}
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNext}
                            disabled={isNextDisabled}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
