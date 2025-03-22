import FlipbookVisibility from "./General/FlipbookVisibility";
import BookShelfVisibility from "./General/BookShelfVisibility";

export default function SettingGeneral() {

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">General</h1>
                <p className="text-gray-500">Here you can set your default visibility for your flipbooks.</p>
            </div>
            <FlipbookVisibility/>
            <BookShelfVisibility/>
        </div>
    )
}