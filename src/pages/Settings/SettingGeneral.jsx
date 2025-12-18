import FlipbookVisibility from "../../components/AppLayoutComponents/Sidebar/Setting/General/FlipbookVisibility"
import BookShelfVisibility from "../../components/AppLayoutComponents/Sidebar/Setting/General/BookShelfVisibility"

export default function SettingGeneral() {

    return (
        <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">General</h1>
                <p className="text-gray-500">Here you can set your default visibility for your flipbooks.</p>
            </div>
            <FlipbookVisibility />
            <BookShelfVisibility />
        </div>
    )
}