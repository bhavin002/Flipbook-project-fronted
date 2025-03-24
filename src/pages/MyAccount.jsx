import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, Mail } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import MyAccountDetails from "../components/AppLayoutComponents/MyAccount/MyAccountDetails"
import EmailPreferences from "../components/AppLayoutComponents/MyAccount/EmailPreferences"

export default function MyAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const pathParts = location.pathname.split('/');
    const activeTab = pathParts[2] || 'details';
    
    const handleTabChange = (value) => {
        navigate(`/account/${value}`);
    };
    
    return (
        <div className="p-6 max-md:w-[100vw] h-full overflow-y-hidden">
            <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={handleTabChange}
                className="flex flex-col h-full"
            >
                <TabsList className="overflow-x-auto w-fit justify-start overflow-y-hidden">
                    <TabsTrigger className="py-2 gap-2" value="details">
                        <UserRound className="w-4 h-4" />Account Details
                    </TabsTrigger>
                    <TabsTrigger className="py-2 gap-2" value="email-preferences">
                        <Mail className="w-4 h-4" />Email Preferences
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="h-full overflow-y-auto">
                    <MyAccountDetails />
                </TabsContent>
                <TabsContent value="email-preferences" className="h-full overflow-y-auto">
                    <EmailPreferences />
                </TabsContent>
            </Tabs>
        </div>
    );
}