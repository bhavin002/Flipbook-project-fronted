import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TablePagination from "@/utils/TablePagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularProductsTable({ products, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(products.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentProducts = products.slice(indexOfFirstRecord, indexOfLastRecord);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium">Product Title</TableHead>
                <TableHead className="font-medium">SKU</TableHead>
                <TableHead className="font-medium">Ordered Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  </TableRow>
                ))
              ) : (
                currentProducts.map((product, idx) => (
                  <TableRow key={product.sku || idx}>
                    <TableCell className="text-sm">{product.productTitle}</TableCell>
                    <TableCell className="text-sm">{product.sku}</TableCell>
                    <TableCell className="text-sm">{product.orderedCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {products.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={changePage}
          />
        )}
        <div className="text-sm text-gray-500 mt-4 text-center">
          Showing {products.length === 0 ? 0 : indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, products.length)} of {products.length} products
        </div>
      </CardContent>
    </Card>
  );
} 