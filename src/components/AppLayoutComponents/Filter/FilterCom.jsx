import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ListFilter } from 'lucide-react';
import * as React from "react"
import { useState, useEffect } from "react"
import FilterDropdownCom from "./FilterDropdownCom";
import FilterSelectCom from "./FilterSelectCom";
import CreatedByFilter from "./CreatedByFilter";
import { GetTeammatesApi } from "@/service/teammate.service";
import { toast } from "sonner";
import { flipbookVisibility, flipbookStatus } from "@/utils/enum";
import { useFlipbook } from "@/context/FlipbookContext";
import { useLocation, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const encodeFiltersToUrl = (filterData) => {
        try {
            const jsonString = JSON.stringify(filterData);
            return btoa(jsonString);
        } catch (error) {
            console.error("Error encoding filters:", error);
            return null;
        }
    };

    const decodeFiltersFromUrl = (encodedString) => {
        try {
            const jsonString = atob(encodedString);
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Error decoding filters:", error);
            return null;
        }
    };

    const getCurrentFilterState = () => {
        return {
            status: statusFilter,
            visibility: visibilityFilter,
            createdBy: createdByFilter,
            dateCreated: dateCreatedFilter !== "anytime" ? dateCreatedFilter : "",
            lastUpdated: lastUpdatedFilter !== "anytime" ? lastUpdatedFilter : ""
        };
    };

    const updateUrlWithFilters = (filterData = null) => {
        const filtersToEncode = filterData || getCurrentFilterState();
        const hasActiveFilters =
            filtersToEncode.status.length > 0 ||
            filtersToEncode.visibility.length > 0 ||
            filtersToEncode.createdBy.length > 0 ||
            (filtersToEncode.dateCreated && filtersToEncode.dateCreated !== "anytime") ||
            (filtersToEncode.lastUpdated && filtersToEncode.lastUpdated !== "anytime");

        const searchParams = new URLSearchParams();
        if (hasActiveFilters) {
            const encodedFilters = encodeFiltersToUrl(filtersToEncode);
            if (encodedFilters) {
                searchParams.set('filter', encodedFilters);
            }
        }

        const basePath = '/myflipbooks/flipbooks';
        const newUrl = `${basePath}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        navigate(newUrl, { replace: true });
    };

    const loadFiltersFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const encodedFilters = searchParams.get('filter');

        if (encodedFilters) {
            try {
                const decodedFilters = decodeFiltersFromUrl(encodedFilters);

                if (decodedFilters && typeof decodedFilters === 'object') {
                    const statusArray = Array.isArray(decodedFilters.status) ? decodedFilters.status : [];
                    const visibilityArray = Array.isArray(decodedFilters.visibility) ? decodedFilters.visibility : [];
                    const createdByArray = Array.isArray(decodedFilters.createdBy) ? decodedFilters.createdBy : [];
                    const dateCreated = decodedFilters.dateCreated || "anytime";
                    const lastUpdated = decodedFilters.lastUpdated || "anytime";

                    setStatusFilter(statusArray);
                    setVisibilityFilter(visibilityArray);
                    setCreatedByFilter(createdByArray);
                    setDateCreatedFilter(dateCreated);
                    setLastUpdatedFilter(lastUpdated);

                    return decodedFilters;
                }
            } catch (error) {
                console.error("Error processing filters from URL:", error);
            }

            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.delete('filter');
            navigate(`/myflipbooks/flipbooks${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`, { replace: true });
        }

        setCreatedByFilter([]);
        setVisibilityFilter([]);
        setStatusFilter([]);
        setDateCreatedFilter("anytime");
        setLastUpdatedFilter("anytime");
        return null;
    };

    useEffect(() => {
        const GetTeammates = async () => {
            try {
                setIsLoading(true);
                const response = await GetTeammatesApi();
                setTeammates(response.data.teammateData || []);
            } catch (error) {
                toast.error("Failed to fetch teammates", {
                    description: error.message || "Oops! Something went wrong."
                });
            } finally {
                setIsLoading(false);
            }
        }
        GetTeammates();
    }, []);

    useEffect(() => {
        const applyFiltersFromUrl = async () => {
            try {
                setIsLoading(true);
                const filtersFromUrl = loadFiltersFromUrl();

                if (filtersFromUrl) {
                    const hasActiveFilters =
                        (filtersFromUrl.status && filtersFromUrl.status.length > 0) ||
                        (filtersFromUrl.visibility && filtersFromUrl.visibility.length > 0) ||
                        (filtersFromUrl.createdBy && filtersFromUrl.createdBy.length > 0) ||
                        (filtersFromUrl.dateCreated && filtersFromUrl.dateCreated !== "anytime" && filtersFromUrl.dateCreated !== "") ||
                        (filtersFromUrl.lastUpdated && filtersFromUrl.lastUpdated !== "anytime" && filtersFromUrl.lastUpdated !== "");

                    if (hasActiveFilters) {
                        const payload = buildApiPayloadFromFilterData(filtersFromUrl);
                        await fetchFlipbooks(payload);
                    } else {
                        await fetchFlipbooks();
                    }
                } else {
                    await fetchFlipbooks();
                }
            } catch (error) {
                toast.error("Failed to load filtered data");
            } finally {
                setIsLoading(false);
            }
        };

        if (teammates.length > 0 || !location.search.includes('filter=')) {
            applyFiltersFromUrl();
        }
    }, [location.search, teammates]);

    const calculateFilterCount = () => {
        let count = 0;
        if (createdByFilter.length > 0) count++;
        if (visibilityFilter.length > 0) count++;
        if (statusFilter.length > 0) count++;
        if (dateCreatedFilter !== "anytime") count++;
        if (lastUpdatedFilter !== "anytime") count++;
        return count;
    };

    useEffect(() => {
        if (location.search.includes('filter=')) {
            setFilterCount(calculateFilterCount());
        } else {
            setFilterCount(0);
        }
    }, [createdByFilter, visibilityFilter, statusFilter, dateCreatedFilter, lastUpdatedFilter]);

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

    const buildApiPayload = () => {
        const filterData = getCurrentFilterState();
        return buildApiPayloadFromFilterData(filterData);
    };

    const buildApiPayloadFromFilterData = (filterData) => {
        const payload = {};

        if (filterData.visibility && filterData.visibility.length > 0) {
            const visibilityValues = [];
            let isVisible = true;

            filterData.visibility.forEach(visibility => {
                const visibilityLower = visibility.toLowerCase();
                switch (visibilityLower) {
                    case 'public':
                        visibilityValues.push(flipbookVisibility.PUBLIC);
                        break;
                    case 'unlisted':
                        visibilityValues.push(flipbookVisibility.PUBLIC);
                        isVisible = false;
                        break;
                    case 'password':
                    case 'password protected':
                        visibilityValues.push(flipbookVisibility.PASSWORD);
                        break;
                    case 'private':
                    case 'private with specific people':
                        visibilityValues.push(flipbookVisibility.PRIVATE);
                        break;
                    default:
                        console.warn("Unknown visibility value:", visibility);
                }
            });

            if (visibilityValues.length > 0) {
                payload.visibility = [...new Set(visibilityValues)];
                if (filterData.visibility.some(v => v.toLowerCase() === 'unlisted')) {
                    payload.isVisible = false;
                } else {
                    payload.isVisible = true;
                }
            }
        }

        if (filterData.status && filterData.status.length > 0) {
            const statusValues = [];
            filterData.status.forEach(status => {
                const statusLower = status.toLowerCase();
                switch (statusLower) {
                    case 'published':
                        statusValues.push(flipbookStatus.PUBLISHED);
                        break;
                    case 'not published':
                        statusValues.push(flipbookStatus.NOT_PUBLISHED);
                        break;
                    case 'draft':
                        statusValues.push(flipbookStatus.DRAFT);
                        break;
                    default:
                        console.warn("Unknown status value:", status);
                }
            });
            if (statusValues.length > 0) {
                payload.status = statusValues;
            }
        }

        if (filterData.createdBy && filterData.createdBy.length > 0) {
            if (teammates.length > 0) {
                const validTeammateIds = teammates.map(t => t.userId || t._id);
                const validCreatedByIds = filterData.createdBy.filter(id => validTeammateIds.includes(id));
                if (validCreatedByIds.length > 0) {
                    payload.createdBy = validCreatedByIds;
                }
            } else {
                payload.createdBy = filterData.createdBy;
            }
        }

        if (filterData.dateCreated && filterData.dateCreated !== 'anytime' && filterData.dateCreated !== '') {
            let dateRange = getDateRange(filterData.dateCreated);

            if (!dateRange && filterData.dateCreated.includes(' - ')) {
                dateRange = parseCustomDateRange(filterData.dateCreated);
            }

            if (dateRange) {
                payload.dateCreated = dateRange.start;
                payload.dateCreatedEnd = dateRange.end;
            }
        }

        if (filterData.lastUpdated && filterData.lastUpdated !== 'anytime' && filterData.lastUpdated !== '') {
            let dateRange = getDateRange(filterData.lastUpdated);

            if (!dateRange && filterData.lastUpdated.includes(' - ')) {
                dateRange = parseCustomDateRange(filterData.lastUpdated);
            }

            if (dateRange) {
                payload.lastUpdated = dateRange.start;
                payload.lastUpdatedEnd = dateRange.end;
            }
        }

        return payload;
    };

    const applyFilters = async () => {
        try {
            setIsLoading(true);
            navigate(`/myflipbooks/flipbooks`);
            const payload = buildApiPayload();
            await fetchFlipbooks(payload);
            updateUrlWithFilters();
        } catch (error) {
            console.error("Filter error:", error);
            toast.error("Failed to apply filters", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearAllFilters = async () => {
        try {
            setIsLoading(true);
            setCreatedByFilter([]);
            setVisibilityFilter([]);
            setStatusFilter([]);
            setDateCreatedFilter("anytime");
            setLastUpdatedFilter("anytime");
            setFilterCount(0);

            navigate('/myflipbooks/flipbooks', { replace: true });
            await fetchFlipbooks();
        } catch (error) {
            console.error("Clear filters error:", error);
            toast.error("Failed to clear filters", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getCreatedByOptions = () => {
        return teammates
            .filter(teammate => teammate.status === 1)
            .map(teammate => {
                const displayName = teammate.name && teammate.name.trim()
                    ? teammate.name
                    : teammate.email.split('@')[0].charAt(0).toUpperCase() + teammate.email.split('@')[0].slice(1);

                return {
                    value: teammate.userId || teammate._id,
                    label: displayName
                };
            });
    };

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
                    <CreatedByFilter
                        label="Created by"
                        options={getCreatedByOptions()}
                        selectedValues={createdByFilter}
                        onChange={setCreatedByFilter}
                    />

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