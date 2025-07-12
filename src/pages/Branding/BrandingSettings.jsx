import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomDomainSettings from "../../components/AppLayoutComponents/Sidebar/Branding/Setting/CustomDomainSettings"
import { Label } from "@/components/ui/label";
import { useWorkspaces } from "@/context/WorkspaceContext";
import { useState, useEffect } from "react";
import { UpdateWorkspaceApi } from "@/service/workspace.service";
import { toast } from "sonner";

export default function BrandingSettings() {
  const { myWorkspaceId } = useWorkspaces();
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfilePrivacyChange = async (checked) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('isProfileInfoHidden', checked);

      const response = await UpdateWorkspaceApi(formData);

      setIsProfilePrivate(checked);
      toast.success("Profile privacy",
        {
          description: response.message,
        }
      );
    } catch (error) {
      toast.error("Failed to update profile privacy", {
        description: error.message || "Something went wrong while updating your profile privacy.",
      });
      setIsProfilePrivate(!checked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
      <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500">Set your profile private and add advanced integrations.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Settings</CardTitle>
            <Button variant="outline">See my profile</Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-base font-medium">Profile privacy</h3>
            <div className="flex items-center">
              <Switch
                id="profile-privacy"
                checked={isProfilePrivate}
                onCheckedChange={handleProfilePrivacyChange}
                disabled={isLoading}
              />
              <Label htmlFor="profile-privacy" className="ml-3 text-gray-700">
                Make my profile private
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium">Default workspace profile URL</h3>
            </div>

            <Input
              className="max-w-md"
              value={import.meta.env.VITE_APP_URL + `/profile/${myWorkspaceId}`}
              readOnly
              disabled
            />

            <p className="text-gray-500 text-sm">
              This username cannot be changed later on.
            </p>
          </div>
        </CardContent>
      </Card>
      <CustomDomainSettings />
    </div>

  );
}