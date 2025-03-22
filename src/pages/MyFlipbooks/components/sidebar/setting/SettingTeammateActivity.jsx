import ActivityLogsTable from "./TeammateActivity/ActivityLogsTable";
import FilterActivity from "./TeammateActivity/FilterActivity";


export default function SettingTeammateActivity() {

    return (
        <div className="p-4 md:p-6 max-w-[100vw] overflow-auto space-y-6 md:space-y-4">
            <div className="p-4 md:p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-2">Teammate activity logs</h1>
                <p className="text-gray-500">See what your teammates are doing and investigate changes in your workspace.</p>
            </div>
            <FilterActivity/>
            <ActivityLogsTable />
        </div>
    )
}