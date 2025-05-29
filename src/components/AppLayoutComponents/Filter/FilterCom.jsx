import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ListFilter } from 'lucide-react';
import * as React from "react"
import { useState, useEffect } from "react"
import FilterDropdownCom from "./FilterDropdownCom";
import FilterSelectCom from "./FilterSelectCom";
import CreatedByFilter from "./CreatedByFilter"; // Import the new component
import { GetTeammatesApi } from "@/service/teammate.service";
import { toast } from "sonner";
import { flipbookVisibility, flipbookStatus } from "@/utils/enum";
import { useFlipbook } from "@/context/FlipbookContext";
import { useLocation } from "react-router-dom";

export default function FilterCom() {
    const [createdByFilter, setCreatedByFilter] = useState([]);
    const [visibilityFilter, setVisibilityFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState([]);
    const [dateCreatedFilter, setDateCreatedFilter] = useState("anytime");
    const [lastUpdatedFilter, setLastUpdatedFilter] = useState("anytime");
    const [isLoading, setIsLoading] = useState(false);
    const [teammates, setTeammates] = useState([]);
    const [filterCount, setFilterCount] = useState(0);
    const { fetchFlipbooks } = useFlipbook();
    const location = useLocation();

    useEffect(() => {
        const GetTeammates = async () => {
            try {
                setIsLoading(true);
                const response = await GetTeammatesApi();
                console.log("Teammates fetched successfully:", response);
                setTeammates(response.data.teammateData || []);
            } catch (error) {
                toast.error("Failed to fetch teammates", {
                    description: error.message
                });
            } finally {
                setIsLoading(false);
            }
        }
        GetTeammates();
    }, [])


    useEffect(() => {
        setFilterCount(0);
        // Reset filters when the path changes
        setCreatedByFilter([]);
        setVisibilityFilter([]);
        setStatusFilter([]);
        setDateCreatedFilter("anytime");
        setLastUpdatedFilter("anytime");
    }, [location.pathname]);

    // Calculate active filter count
    const calculateFilterCount = () => {
        let count = 0;
        if (createdByFilter.length > 0) count++;
        if (visibilityFilter.length > 0) count++;
        if (statusFilter.length > 0) count++;
        if (dateCreatedFilter !== "anytime") count++;
        if (lastUpdatedFilter !== "anytime") count++;
        return count;
    };

    // Helper function to calculate date ranges
    const getDateRange = (filterValue) => {
        const today = new Date();
        const formatDate = (date) => date.toISOString().split('T')[0];

        switch (filterValue) {
            case 'today':
                return {
                    start: formatDate(today),
                    end: formatDate(today)
                };
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return {
                    start: formatDate(yesterday),
                    end: formatDate(yesterday)
                };
            case 'last7days':
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                return {
                    start: formatDate(sevenDaysAgo),
                    end: formatDate(today)
                };
            case 'last30days':
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);
                return {
                    start: formatDate(thirtyDaysAgo),
                    end: formatDate(today)
                };
            case 'last90days':
                const ninetyDaysAgo = new Date(today);
                ninetyDaysAgo.setDate(today.getDate() - 90);
                return {
                    start: formatDate(ninetyDaysAgo),
                    end: formatDate(today)
                };
            default:
                return null;
        }
    };

    // Helper function to parse custom date range
    const parseCustomDateRange = (customValue) => {
        if (customValue.includes(' - ')) {
            const [startStr, endStr] = customValue.split(' - ');
            try {
                const startDate = new Date(startStr);
                const endDate = new Date(endStr);
                return {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            } catch (error) {
                return null;
            }
        }
        return null;
    };

    // Build API payload
    const buildApiPayload = () => {
        const payload = {};

        // Handle visibility filter
        if (visibilityFilter.length > 0) {
            const visibilityValues = [];
            let isVisible = true;

            visibilityFilter.forEach(visibility => {
                switch (visibility) {
                    case 'Public':
                        visibilityValues.push(flipbookVisibility.PUBLIC);
                        break;
                    case 'Unlisted':
                        visibilityValues.push(flipbookVisibility.PUBLIC);
                        isVisible = false;
                        break;
                    case 'Password protected':
                        visibilityValues.push(flipbookVisibility.PASSWORD);
                        break;
                    case 'Private with specific people':
                        visibilityValues.push(flipbookVisibility.PRIVATE);
                        break;
                }
            });

            if (visibilityValues.length > 0) {
                payload.visibility = [...new Set(visibilityValues)]; // Remove duplicates
                payload.isVisible = isVisible;
            }
        }

        // Handle status filter
        if (statusFilter.length > 0) {
            const statusValues = [];
            statusFilter.forEach(status => {
                switch (status) {
                    case 'Published':
                        statusValues.push(flipbookStatus.PUBLISHED);
                        break;
                    case 'Not Published':
                        statusValues.push(flipbookStatus.NOT_PUBLISHED);
                        break;
                    case 'Draft':
                        statusValues.push(flipbookStatus.DRAFT);
                        break;
                }
            });
            if (statusValues.length > 0) {
                payload.status = statusValues;
            }
        }

        // Handle createdBy filter - now works with IDs directly
        if (createdByFilter.length > 0) {
            payload.createdBy = createdByFilter; // Direct assignment since we're already storing IDs
        }

        // Handle date created filter
        if (dateCreatedFilter && dateCreatedFilter !== 'anytime') {
            let dateRange = getDateRange(dateCreatedFilter);

            // Check if it's a custom date range
            if (!dateRange && dateCreatedFilter.includes(' - ')) {
                dateRange = parseCustomDateRange(dateCreatedFilter);
            }

            if (dateRange) {
                payload.dateCreated = dateRange.start;
                payload.dateCreatedEnd = dateRange.end;
            }
        }

        // Handle last updated filter
        if (lastUpdatedFilter && lastUpdatedFilter !== 'anytime') {
            let dateRange = getDateRange(lastUpdatedFilter);

            // Check if it's a custom date range
            if (!dateRange && lastUpdatedFilter.includes(' - ')) {
                dateRange = parseCustomDateRange(lastUpdatedFilter);
            }

            if (dateRange) {
                payload.lastUpdated = dateRange.start;
                payload.lastUpdatedEnd = dateRange.end;
            }
        }

        return payload;
    };

    // Apply filters function
    const applyFilters = async () => {
        try {
            setIsLoading(true);
            const payload = buildApiPayload();
            console.log("Filter payload:", payload);

            await fetchFlipbooks(payload);
            // Update filter count only after successfully applying filters
            setFilterCount(calculateFilterCount());
        } catch (error) {
            console.error("Filter error:", error);
            toast.error("Failed to apply filters", {
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearAllFilters = async () => {
        try {
            setIsLoading(true);
            // Clear all filters
            setCreatedByFilter([]);
            setVisibilityFilter([]);
            setStatusFilter([]);
            setDateCreatedFilter("anytime");
            setLastUpdatedFilter("anytime");
            // Reset filter count
            setFilterCount(0);
            // Fetch all flipbooks without filters
            await fetchFlipbooks();
        } catch (error) {
            console.error("Clear filters error:", error);
            toast.error("Failed to clear filters", {
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Generate filter options from teammates data
    const getCreatedByOptions = () => {
        return teammates
            .filter(teammate => teammate.status === 1) // Only show active teammates
            .map(teammate => {
                // Use name if available, otherwise use email username
                const displayName = teammate.name && teammate.name.trim()
                    ? teammate.name
                    : teammate.email.split('@')[0].charAt(0).toUpperCase() + teammate.email.split('@')[0].slice(1);

                return {
                    value: teammate.userId || teammate._id, // Use userId if available, fallback to _id
                    label: displayName
                };
            });
    };

    // Only visibility and status filters now use FilterDropdownCom
    const filters = [
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

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" disabled={isLoading} className="relative">
                    <ListFilter />
                    {filterCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {filterCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-4">
                    <SheetTitle>Filter options</SheetTitle>
                </SheetHeader>
                <div className="space-y-4">
                    {/* Separate CreatedByFilter component */}
                    <CreatedByFilter
                        label="Created by"
                        options={getCreatedByOptions()}
                        selectedValues={createdByFilter}
                        onChange={setCreatedByFilter}
                    />

                    {/* Other filters using FilterDropdownCom */}
                    {filters.map((filter) => (
                        <FilterDropdownCom
                            key={filter.id}
                            label={filter.label}
                            options={filter.options}
                            selectedValues={filter.selectedValues}
                            onChange={filter.onChange}
                        />
                    ))}

                    {/* Select filters */}
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
                        <Button onClick={applyFilters} disabled={isLoading}>
                            {isLoading ? "Applying..." : "Apply filters"}
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            onClick={clearAllFilters}
                            disabled={isLoading}
                        >
                            Clear filters
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}