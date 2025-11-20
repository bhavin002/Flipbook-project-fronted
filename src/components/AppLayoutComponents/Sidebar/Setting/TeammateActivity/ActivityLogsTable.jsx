import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetActivityLogApi } from "@/service/activityLog.service";
import { useEffect, useState, useRef, useCallback } from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export default function ActivityLogsTable({ filterParams }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef();
  const lastLogElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchLogs = async (params) => {
    try {
      setLoading(true);
      const response = await GetActivityLogApi(params);
      if (params.page === 1) {
        setLogs(response.data.logs);
      } else {
        setLogs(prevLogs => [...prevLogs, ...response.data.logs]);
      }
      setHasMore(response.data.isNext);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setLogs([]);
    setHasMore(true);
    fetchLogs({ ...filterParams, page: 1 });
  }, [filterParams]);

  useEffect(() => {
    if (page > 1) {
      fetchLogs({ ...filterParams, page });
    }
  }, [page]);

  return (
    <Card className="shadow-sm rounded-lg mt-8">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-1/3 font-medium">Activity</TableHead>
                <TableHead className="w-1/3 font-medium">Date</TableHead>
                <TableHead className="w-1/3 font-medium">IP address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                logs.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      No logs found
                    </TableCell>
                  </TableRow>
                )
              }
              {logs.map((log, index) => (
                <TableRow
                  key={log._id}
                  className="border-t hover:bg-slate-50"
                  ref={index === logs.length - 1 ? lastLogElementRef : null}
                >
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700">{log.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">
                    {format(new Date(log.createdAt), "MMM d, yyyy h:mm a")}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
              {loading && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    <div className="flex gap-1 items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin"/> Loading...
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}