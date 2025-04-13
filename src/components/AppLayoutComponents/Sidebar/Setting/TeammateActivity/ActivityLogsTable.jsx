import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from "@/utils/datas";

export default function ActivityLogsTable() {
  const logs = getData("logs");

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
              {logs.map((log) => (
                <TableRow key={log.id} className="border-t hover:bg-slate-50">
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700">{log.user} {log.user}</span>
                      <span className="text-slate-600">{log.activity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{log.date}</TableCell>
                  <TableCell className="py-4 text-slate-600">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}