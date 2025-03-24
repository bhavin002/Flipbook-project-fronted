import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectGroupMember from "./SelectGroupMember";
import { useState } from "react";

export default function CreateGroupDialog() {
    const [createdByFilter, setCreatedByFilter] = useState([]);

    const filters = [
        {
            id: 'createdBy',
            options: [
                { value: 'bhavinv', label: 'BhavinV' },
                { value: 'satyamg', label: 'SatyamG' },
                { value: 'utsavp', label: 'UtsavP' },
                { value: 'nirav', label: 'Nirav' },
                { value: 'parth', label: 'Parth' },
                { value: 'pratik', label: 'Pratik' },
            ],
            selectedValues: createdByFilter,
            onChange: setCreatedByFilter
        }
    ];
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    New group
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Create a new group</DialogTitle>
                    <DialogDescription>
                        Organize your readers into groups for easy sharing.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Group name
                    </Label>
                    <Input
                        id="email"
                        placeholder="e.g Marketing (min 3 characters)"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Add group members
                    </Label>
                    {filters.map((filter) => (
                        <SelectGroupMember
                            key={filter.id}
                            options={filter.options}
                            selectedValues={filter.selectedValues}
                            onChange={filter.onChange}
                        />
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>
                        Create group
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}