import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubscriptionPlans from '@/utils/SubscriptionPlans';

export default function SettingBillingSubscription() {
    return (
        <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Subscription</h1>
                <p className="text-gray-500">Update your payment option and see all the features in your current plan.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                    <SubscriptionPlans />
                </CardContent>
            </Card>
        </div>
    );
}