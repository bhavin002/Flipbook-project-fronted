import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getData } from "@/utils/datas";

export default function TopFlipbooks() {
  const [showAll, setShowAll] = useState(false);

  const flipbooksData = getData("flipbooksData");

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
              <div key={flipbook.id} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span className="text-right">{flipbook.percentage.toFixed(2)}%</span>
                </div>
                <div className="font-medium text-purple-600">
                  {flipbook.name}
                </div>
                <div className="text-sm text-gray-600 mt-1">
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
              <div key={flipbook.id} className="grid grid-cols-12 py-3 border-b last:border-b-0 items-center">
                <div className="col-span-1 text-gray-500">{index + 1}.</div>
                <div className="col-span-7">
                  <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">
                    {flipbook.name}
                  </a>
                </div>
                <div className="col-span-2 text-right">{flipbook.impressions}</div>
                <div className="col-span-2 text-right">{flipbook.percentage.toFixed(2)}%</div>
              </div>
            ))}
          </div>

          {!showAll && (
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