import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getData } from '@/utils/datas';

export default function SettingBillingSubscription() {
    const [isYearly, setIsYearly] = useState(true);

    const mainPlans = getData('mainPlans');

    const enterprisePlans = getData('enterprisePlans');

    const activeMainPlans = isYearly ? mainPlans.yearly : mainPlans.monthly;
    const activeEnterprisePlan = isYearly ? enterprisePlans.yearly : enterprisePlans.monthly;

    const [activeTab, setActiveTab] = useState("starter");

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-8">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Subscription</h1>
                <p className="text-gray-500">Update your payment option and see all the features in your current plan.</p>
            </div>
            
            <Card className="shadow-sm rounded-lg">
                <CardHeader>
                    <CardTitle>Current plan: Free trial</CardTitle>
                    <CardDescription>
                        You are currently on a free plan. At any time, you can upgrade your account to one of the plans below.
                    </CardDescription>
                </CardHeader>
            </Card>
            
            <Card className="shadow-sm rounded-lg">
                <CardHeader>
                    <CardTitle>Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`font-medium ${!isYearly ? 'text-violet-600' : 'text-gray-500'}`}>Monthly</span>
                        <Switch 
                            checked={isYearly} 
                            onCheckedChange={setIsYearly}
                            className="data-[state=checked]:bg-violet-600"
                        />
                        <span className={`font-medium ${isYearly ? 'text-violet-600' : 'text-gray-500'}`}>Yearly</span>
                    </div>
                    
                    <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
                        {activeMainPlans.map((plan, index) => (
                            <div key={index} className="border rounded-lg p-6 flex flex-col h-full">
                                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className="text-gray-500">/mo</span>
                                    <p className="text-sm text-gray-500 mt-1">{plan.billedAs}</p>
                                </div>
                                
                                <Button className="mb-6">
                                    Upgrade
                                </Button>
                                
                                {plan.showContactSales && (
                                    <div className="text-primary text-center mb-6 cursor-pointer hover:underline text-sm">
                                        Or contact sales
                                    </div>
                                )}
                                
                                <div className="space-y-3 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <Check className="text-primary h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="text-primary text-center mt-6 cursor-pointer hover:underline text-sm">
                                    See all the features
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="lg:hidden mb-8">
                        <Tabs defaultValue="starter" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-3 mb-6">
                                <TabsTrigger value="starter">Starter</TabsTrigger>
                                <TabsTrigger value="professional">Professional</TabsTrigger>
                                <TabsTrigger value="business">Business</TabsTrigger>
                            </TabsList>
                            
                            {activeMainPlans.map((plan) => (
                                <TabsContent key={plan.id} value={plan.id} className="border rounded-lg p-6">
                                    <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">{plan.price}</span>
                                        <span className="text-gray-500">/mo</span>
                                        <p className="text-sm text-gray-500 mt-1">{plan.billedAs}</p>
                                    </div>
                                    
                                    <Button className="w-full mb-6">
                                        Upgrade
                                    </Button>
                                    
                                    {plan.showContactSales && (
                                        <div className="text-primary text-center mb-6 cursor-pointer hover:underline text-sm">
                                            Or contact sales
                                        </div>
                                    )}
                                    
                                    <div className="space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <Check className="text-primary h-5 w-5 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="text-primary text-center mt-6 cursor-pointer hover:underline text-sm">
                                        See all the features
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                    
                    <div className="border rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-6">{activeEnterprisePlan.title}</h3>
                        
                        <div className="space-y-4">
                            {activeEnterprisePlan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <Check className="text-primary h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                            <Button>
                                Contact sales
                            </Button>
                            
                            <span className="text-primary cursor-pointer hover:underline">
                                See all the features
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}