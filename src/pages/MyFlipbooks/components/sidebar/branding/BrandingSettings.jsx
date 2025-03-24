import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomDomainSettings from "./Setting/CustomDomainSettings";
import { Label } from "@/components/ui/label";

export default function BrandingSettings() {
  return (
    <div className="p-6 max-w-[100vw] overflow-auto space-y-4">
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
              <Switch id="profile-privacy" />
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
              placeholder="https://www.flipnova.com/"
              className="max-w-md"
              defaultValue="https://www.flipsnack.com/"
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