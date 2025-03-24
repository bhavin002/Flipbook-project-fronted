
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';

export default function TFA() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Two-factor authentication</CardTitle>
                <CardDescription className="flex justify-between">
                    All teammates are required to use a two factor authentication process to log in.
                    <div className="flex items-center">
                        <Switch id="two-factor-auth" />
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}