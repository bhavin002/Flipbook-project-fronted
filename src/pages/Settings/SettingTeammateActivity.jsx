import ActivityLogsTable from "../../components/AppLayoutComponents/Sidebar/Setting/TeammateActivity/ActivityLogsTable"
import FilterActivity from "../../components/AppLayoutComponents/Sidebar/Setting/TeammateActivity/FilterActivity"
import { useState } from "react"
import { format } from "date-fns"

export default function SettingTeammateActivity() {
    const [filterParams, setFilterParams] = useState({
        activityType: "all",
        from: format(new Date("2025-04-16"), "yyyy-MM-dd"),
        to: format(new Date(), "yyyy-MM-dd"),
        userId: "all",
        page: 1,
        perPage: 30
    });

    const handleFilterChange = (newFilters) => {
        setFilterParams(newFilters);
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Teammate activity logs</h1>
                <p className="text-gray-500">
                See what your teammates are doing and investigate changes in your workspace.
                </p>
            </div>
            <FilterActivity onFilterChange={handleFilterChange}/>
            <ActivityLogsTable filterParams={filterParams} />
        </div>
    )
}