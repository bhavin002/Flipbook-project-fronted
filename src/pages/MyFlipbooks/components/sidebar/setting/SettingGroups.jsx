import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateGroupDialog from "./Groups/CreateGroupDialog";

export default function SettingGroups() {
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-8">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Groups</h1>
                <p className="text-gray-500">Create multiple groups of readers for different categories or departments.</p>
            </div>
            <Card className="shadow-sm rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Manage your readers</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateGroupDialog />
                </CardContent>
            </Card>
        </div>
    )
}