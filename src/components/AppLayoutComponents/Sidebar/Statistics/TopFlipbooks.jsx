import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getData } from "@/utils/datas";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopFlipbooks({ topFlipbooks = null, loading = false }) {
  const [showAll, setShowAll] = useState(false);

  // Show only skeleton when loading
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Top 10 flipbooks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="md:hidden">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 items-center">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-4 w-20 ml-6" />
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="grid grid-cols-12 py-3 border-b last:border-b-0 items-center">
                  <div className="col-span-1 text-gray-500"><Skeleton className="h-4 w-4" /></div>
                  <div className="col-span-7"><Skeleton className="h-5 w-32" /></div>
                  <div className="col-span-2 text-right"><Skeleton className="h-4 w-12" /></div>
                  <div className="col-span-2 text-right"><Skeleton className="h-4 w-12" /></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback to getData for legacy/demo
  const flipbooksData = topFlipbooks || getData("flipbooksData");
  const displayData = showAll ? flipbooksData : flipbooksData.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top 10 flipbooks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="md:hidden">
            {displayData.map((flipbook, index) => (
              <div key={flipbook.flipbookId || flipbook.id} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex gap-2">
                    <span className="text-gray-500 whitespace-nowrap">{index + 1}.</span>
                    <span className="font-medium text-purple-600 break-words">
                      {flipbook.name}
                    </span>
                  </div>
                  <span className="text-right text-sm ml-2 flex-shrink-0">
                    {flipbook.percentage?.toFixed(2)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1 ml-6">
                  {flipbook.impressions} impressions
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-12 py-2 text-sm text-gray-500 border-b">
              <div className="col-span-1">#</div>
              <div className="col-span-7">Flipbook names</div>
              <div className="col-span-2 text-right">impressions</div>
              <div className="col-span-2 text-right">% total impressions</div>
            </div>

            {displayData.map((flipbook, index) => (
              <div key={flipbook.flipbookId || flipbook.id} className="grid grid-cols-12 py-3 border-b last:border-b-0 items-center">
                <div className="col-span-1 text-gray-500">{index + 1}.</div>
                <div className="col-span-7">
                  <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">
                    {flipbook.name}
                  </a>
                </div>
                <div className="col-span-2 text-right">{flipbook.impressions}</div>
                <div className="col-span-2 text-right">{flipbook.percentage?.toFixed(2)}%</div>
              </div>
            ))}
          </div>

          {!showAll && flipbooksData.length > 3 && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="ghost"
                className="text-primary hover:bg-primary/10"
                onClick={() => setShowAll(true)}
              >
                View top 10 flipbooks
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}