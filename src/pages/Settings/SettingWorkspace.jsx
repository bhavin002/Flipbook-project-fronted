import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SelectLogoDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";

export default function SettingWorkspace() {
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Workspace</h1>
                <p className="text-gray-500">Each workspace is a completely separate entity,
                    where you can create and manage flipbooks, payments, branding and teams.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Name your workspace</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-base font-medium mb-2">Name</h3>
                        </div>
                        <Input
                            placeholder="Your workspace name"
                            className="max-w-md mb-2"
                            defaultValue="My Workspace"
                        />
                        <Button>
                            Save changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Brand your workspace</CardTitle>
                    <CardDescription>
                        Your logo will be displayed in the top left corner of this workspace, replacing the Flipnova logo.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <p className="text-xs text-gray-500">Recommended: 5:1 ratio, 2MB size.</p>
                            <SelectLogoDialog/> 
                        </div>
                        <Button>
                            Save changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}