import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ListFilter } from 'lucide-react';
import * as React from "react"
import { useState } from "react"
import FilterDropdownCom from "./FilterDropdownCom";
import FilterSelectCom from "./FilterSelectCom";

export default function FilterCom() {
    const [createdByFilter, setCreatedByFilter] = useState([]);
    const [visibilityFilter, setVisibilityFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateCreatedFilter, setDateCreatedFilter] = useState("anytime");
    const [lastUpdatedFilter, setLastUpdatedFilter] = useState("anytime");

    const filters = [
        {
            id: 'createdBy',
            label: 'Created by',
            options: [
                { value: 'bhavinv', label: 'BhavinV' },
                { value: 'satyamg', label: 'SatyamG' },
                { value: 'utsavp', label: 'UtsavP' }
            ],
            selectedValues: createdByFilter,
            onChange: setCreatedByFilter
        },
        {
            id: 'visibility',
            label: 'Visibility',
            options: [
                { value: 'public', label: 'Public' },
                { value: 'unlisted', label: 'Unlisted' },
                { value: 'password', label: 'Password protected' },
                { value: 'private', label: 'Private with specific people' }
            ],
            selectedValues: visibilityFilter,
            onChange: setVisibilityFilter
        },
        {
            id: 'status',
            label: 'Status',
            options: [
                { value: 'published', label: 'Published' },
                { value: 'notPublished', label: 'Not Published' },
                { value: 'draft', label: 'Draft' },
            ],
            selectedValues: statusFilter,
            onChange: setStatusFilter
        }
    ];

    const selectFilters = [
        {
            id: 'dateCreated',
            label: 'Date created',
            options: [
                { value: 'anytime', label: 'Any time' },
                { value: 'today', label: 'Today' },
                { value: 'yesterday', label: 'Yesterday' },
                { value: 'last7days', label: 'Last 7 days' },
                { value: 'last30days', label: 'Last 30 days' },
                { value: 'last90days', label: 'Last 90 days' },
                { value: 'custom', label: 'Custom...' }
            ],
            value: dateCreatedFilter,
            onChange: setDateCreatedFilter,
            placeholder: "Any time"
        },
        {
            id: 'lastUpdated',
            label: 'Last updated',
            options: [
                { value: 'anytime', label: 'Any time' },
                { value: 'today', label: 'Today' },
                { value: 'yesterday', label: 'Yesterday' },
                { value: 'last7days', label: 'Last 7 days' },
                { value: 'last30days', label: 'Last 30 days' },
                { value: 'last90days', label: 'Last 90 days' },
                { value: 'custom', label: 'Custom...' }
            ],
            value: lastUpdatedFilter,
            onChange: setLastUpdatedFilter,
            placeholder: "Any time"
        }
    ];

    const clearAllFilters = () => {
        setCreatedByFilter([]);
        setVisibilityFilter([]);
        setDateCreatedFilter("anytime");
        setLastUpdatedFilter("anytime");
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <ListFilter />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-4">
                    <SheetTitle>Filter options</SheetTitle>
                </SheetHeader>
                <div className="space-y-4">
                    {filters.map((filter) => (
                        <FilterDropdownCom
                            key={filter.id}
                            label={filter.label}
                            options={filter.options}
                            selectedValues={filter.selectedValues}
                            onChange={filter.onChange}
                        />
                    ))}
                    {selectFilters.map((filter) => (
                        <FilterSelectCom
                            key={filter.id}
                            label={filter.label}
                            options={filter.options}
                            value={filter.value}
                            onChange={filter.onChange}
                            placeholder={filter.placeholder}
                        />
                    ))}
                </div>

                <SheetFooter className="mt-4">
                    <SheetClose asChild>
                        <Button>Apply filters</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            onClick={clearAllFilters}
                        >
                            Clear filters
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}