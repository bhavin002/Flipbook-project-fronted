import ActivityLogsTable from "../../components/AppLayoutComponents/Sidebar/Setting/TeammateActivity/ActivityLogsTable"
import FilterActivity from "../../components/AppLayoutComponents/Sidebar/Setting/TeammateActivity/FilterActivity"


export default function SettingTeammateActivity() {
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Teammate activity logs</h1>
                <p className="text-gray-500">
                See what your teammates are doing and investigate changes in your workspace.
                </p>
            </div>
            <FilterActivity/>
            <ActivityLogsTable />
        </div>
    )
}