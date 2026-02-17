import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubscriptionPlans from '@/utils/SubscriptionPlans';

export default function SettingBillingSubscription() {
    return (
        <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Lifetime Deals</h1>
                <p className="text-gray-500">Choose your lifetime deal plan and get lifetime access to all features.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lifetime Deals</CardTitle>
                </CardHeader>
                <CardContent>
                    <SubscriptionPlans />
                </CardContent>
            </Card>
        </div>
    );
}