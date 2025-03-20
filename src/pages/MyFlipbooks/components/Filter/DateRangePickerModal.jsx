import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

export function DateRangePickerModal({
  open,
  onOpenChange,
  value,
  onApply,
}) {
  const [date, setDate] = useState(value || undefined);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleApply = () => {
    onApply(date);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setDate(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
          <DialogDescription className="sr-only">
            Description
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}