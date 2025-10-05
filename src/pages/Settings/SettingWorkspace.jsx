import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SelectLogoDialog from "../../components/AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { UpdateWorkspaceApi, GetWorkspaceInfoApi } from "@/service/workspace.service";
import LoadingButton from "@/utils/LoadingButton";
import { Trash2 } from "lucide-react";
import { useWorkspaces } from "@/context/WorkspaceContext";
import { Skeleton } from "@/components/ui/skeleton";

const workspaceSchema = z.object({
    name: z.string()
        .min(1, "Workspace name is required")
        .max(50, "Workspace name must be less than 50 characters")
});

export default function SettingWorkspace() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogoLoading, setIsLogoLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [workspaceData, setWorkspaceData] = useState(null);
    const { myWorkspaceId, updateWorkspaceName, updateWorkspaceAvatar } = useWorkspaces();

    const form = useForm({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: ""
        }
    });

    // Fetch workspace data on component mount
    useEffect(() => {
        const fetchWorkspaceData = async () => {
            try {
                setIsDataLoading(true);
                const response = await GetWorkspaceInfoApi();
                setWorkspaceData(response);

                // Set form default value
                form.setValue("name", response.data.name || "");

                // Set previewBrandLogoId if exists
                if (response.data.previewBrandLogoId) {
                    setSelectedLogo({
                        src: response.data.previewBrandLogoId,
                        alt: `${response.data.name} previewBrandLogoId`
                    });
                }
            } catch (error) {
                toast.error("Failed to load workspace data", {
                    description: error.message || "Something went wrong"
                });
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchWorkspaceData();
    }, [form]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await UpdateWorkspaceApi(data);
            toast.success("Workspace updated successfully", {
                description: response.message || "Workspace updated successfully"
            });

            // Update local state
            setWorkspaceData(prev => ({ ...prev, name: data.name }));
            // Update context
            updateWorkspaceName(myWorkspaceId, data.name);
        } catch (error) {
            toast.error("Failed to update workspace", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoSave = async () => {
        try {
            if (!selectedLogo?.id) {
                return;
            }
            setIsLogoLoading(true);
            const logoData = {
                previewBrandLogoId: selectedLogo?.id || ""
            };
            const response = await UpdateWorkspaceApi(logoData);
            toast.success("Logo updated successfully", {
                description: response.message || "Logo updated successfully"
            });

            // Update local state
            setWorkspaceData(prev => ({ ...prev, previewBrandLogoId: selectedLogo?.src || null }));
            updateWorkspaceAvatar(myWorkspaceId, selectedLogo?.src || null);
        } catch (error) {
            toast.error("Failed to update previewBrandLogoId", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsLogoLoading(false);
        }
    };

    const handleLogoSelect = (previewBrandLogoId) => {
        setSelectedLogo(previewBrandLogoId);
    };

    const handleLogoDelete = async () => {
        try {
            setIsLogoLoading(true);
            const logoData = { previewBrandLogoId: "null" };
            const response = await UpdateWorkspaceApi(logoData);

            setSelectedLogo(null);
            setWorkspaceData(prev => ({ ...prev, previewBrandLogoId: null }));
            updateWorkspaceAvatar(myWorkspaceId, null);
            toast.success("Logo removed successfully", {
                description: response.message
            });
        } catch (error) {
            toast.error("Failed to remove previewBrandLogoId", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsLogoLoading(false);
        }
    };
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Workspace</h1>
                <p className="text-gray-500">Each workspace is a completely separate entity,
                    where you can create and manage flipbooks, payments, branding and teams.</p>
            </div>
            {
                isDataLoading ?
                    <>
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-48" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-96 max-w-md" />
                                    <Skeleton className="h-10 w-32" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-full max-w-2xl" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Skeleton className="h-4 w-64" />
                                    <div className="flex items-center gap-4 w-[26%]">
                                        <Skeleton className="w-16 h-12 rounded" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </> : <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Name your workspace</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Your workspace name"
                                                            className={`max-w-md ${!field.value && "border-red-500 focus:outline-none focus-visible:ring-0"}`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading ? <LoadingButton /> : "Save changes"}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Logo your workspace</CardTitle>
                                {/* <CardDescription>
                                    Your previewBrandLogoId will be displayed in the top left corner of this workspace, replacing the Flipnova previewBrandLogoId.
                                </CardDescription> */}
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        <p className="text-xs text-gray-500">Recommended: 5:1 ratio, 2MB size.</p>

                                        {selectedLogo || workspaceData?.previewBrandLogoId ? (
                                            <div className="flex items-center gap-4 w-[26%]">
                                                <div className="relative w-16 h-12 bg-white border rounded overflow-hidden">
                                                    <div
                                                        className="absolute inset-0 bg-center bg-repeat opacity-20"
                                                        style={{ backgroundImage: 'url(https://cdn.flipsnack.com/site/images/transparent-bg-pattern.png)' }}
                                                    />
                                                    <img
                                                        src={selectedLogo?.src || workspaceData?.previewBrandLogoId}
                                                        alt={selectedLogo?.alt || `${workspaceData?.name} previewBrandLogoId`}
                                                        className="w-full h-full object-contain relative z-10"
                                                    />
                                                </div>
                                                <SelectLogoDialog
                                                    onLogoSelect={handleLogoSelect}
                                                    mode="replace"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handleLogoDelete}
                                                    className="h-8 w-8"
                                                    disabled={isLogoLoading}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        ) : (
                                            <SelectLogoDialog
                                                onLogoSelect={handleLogoSelect}
                                                mode="select"
                                            />
                                        )}
                                    </div>

                                    {selectedLogo && (
                                        <Button onClick={handleLogoSave} disabled={isLogoLoading}>
                                            {isLogoLoading ? <LoadingButton /> : "Save changes"}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </>
            }
        </div>
    );
}