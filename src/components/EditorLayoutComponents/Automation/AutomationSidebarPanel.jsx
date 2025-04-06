import { Button } from "@/components/ui/button";

export default function AutomationSidebarPanel() {
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="space-y-2 bg-primary rounded-lg p-4">
                <p className="font-semibold">Speed up your work!</p>
                <p className="text-sm">Simplify your catalog creation by connecting different types of data sources.</p>
                <Button variant="outline" className="text-black hover:text-primary">
                    <a href="http://localhost:5173/automation" target="_blank">Create connections</a>
                </Button>
            </div>
        </div>
    )
}