import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createCheckoutSession, getAllPlans } from '@/service/subscription.service';
import { toast } from 'sonner';
import { PlanCardSkeleton, TabContentSkeleton } from '@/utils/Skeleton';
import { getData } from '@/utils/datas';

export default function SettingBillingSubscription() {
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const [isYearly, setIsYearly] = useState(false);
    const [activeTab, setActiveTab] = useState("starter");
    const [upgradeLoading, setUpgradeLoading] = useState(null);

    useEffect(() => {
        const getPlans = async () => {
            try {
                setIsLoading(true);
                const plansData = await getAllPlans();
                setPlans(plansData.data || []);
            } catch (error) {
                toast.error("Failed to get plans", {
                    description: error.message
                });
            } finally {
                setIsLoading(false);
            }
        }
        getPlans();
    }, []);

    const processPlans = () => {
        if (!plans.length) return { monthly: [], yearly: [] };

        const monthly = [];
        const yearly = [];

        const planGroups = {};
        let trialPlan = null;

        plans.forEach(plan => {
            if (plan.isTrialPlan) {
                trialPlan = plan;
                return;
            }

            const planType = plan.name.split(' ')[0].toLowerCase();

            if (!planGroups[planType]) {
                planGroups[planType] = { monthly: null, yearly: null };
            }

            if (plan.interval === 0) {
                planGroups[planType].monthly = plan;
            } else if (plan.interval === 1) {
                planGroups[planType].yearly = plan;
            }
        });

        // Add trial plan first if it exists
        if (trialPlan) {
            const trialFeatures = getFeaturesByPlanType('trial');
            const trialPlanData = {
                id: 'trial',
                title: trialPlan.name,
                price: 'Free',
                billedAs: '14 day free trial',
                features: trialFeatures,
                planId: trialPlan._id,
                buttonLabel: trialPlan.buttonLabel
            };
            monthly.unshift(trialPlanData); // Add to beginning of monthly
            yearly.unshift(trialPlanData);  // Add to beginning of yearly
        }

        Object.entries(planGroups).forEach(([type, planData]) => {
            const baseFeatures = getFeaturesByPlanType(type);

            if (planData.monthly) {
                monthly.push({
                    id: type,
                    title: planData.monthly.name.replace(' Monthly', ''),
                    price: `₹${planData.monthly.rate}`,
                    billedAs: 'Billed monthly',
                    features: baseFeatures,
                    planId: planData.monthly._id,
                    buttonLabel: planData.monthly.buttonLabel
                });
            }

            if (planData.yearly) {
                const monthlyRate = Math.round(planData.yearly.rate / 12);
                yearly.push({
                    id: type,
                    title: planData.yearly.name.replace(' Yearly', ''),
                    price: `₹${monthlyRate}`,
                    billedAs: `₹${planData.yearly.rate} billed annually`,
                    features: baseFeatures,
                    planId: planData.yearly._id,
                    buttonLabel: planData.yearly.buttonLabel
                });
            }
        });

        return { monthly, yearly };
    };

    const getFeaturesByPlanType = (planType) => {
        const featuresMap = getData("planFeatures")
        return featuresMap[planType] || [];
    };

    const processedPlans = processPlans();
    const activePlans = isYearly ? processedPlans.yearly : processedPlans.monthly;

    useEffect(() => {
        if (activePlans.length > 0 && !activePlans.find(p => p.id === activeTab)) {
            setActiveTab(activePlans[0].id);
        }
    }, [activePlans, activeTab]);

    const handleUpgrade = async (planId, action) => {
        console.log("action ???", action);
        try {
            setUpgradeLoading(planId);
            const response = await createCheckoutSession(planId);
            if (response.data.checkoutUrl) {
                console.log
                window.open(response.data.checkoutUrl, '_blank');
            } else {
                toast.error("Invalid checkout response", {
                    description: "No checkout URL received"
                });
            }
        } catch (error) {
            toast.error("Failed to create checkout", {
                description: error.message
            });
        } finally {
            setUpgradeLoading(null);
        }
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Subscription</h1>
                <p className="text-gray-500">Update your payment option and see all the features in your current plan.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Current plan: Free trial</CardTitle>
                    <CardDescription>
                        You are currently on a free plan. At any time, you can upgrade your account to one of the plans below.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
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
                            disabled={isLoading}
                        />
                        <span className={`font-medium ${isYearly ? 'text-violet-600' : 'text-gray-500'}`}>Yearly</span>
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
                        {isLoading ? (
                            Array(3).fill(0).map((_, index) => (
                                <PlanCardSkeleton key={index} />
                            ))
                        ) : (
                            activePlans.map((plan, index) => (
                                <div key={index} className="border rounded-lg p-6 flex flex-col h-full">
                                    <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">{plan.price}</span>
                                        <span className="text-gray-500">/mo</span>
                                        <p className="text-sm text-gray-500 mt-1">{plan.billedAs}</p>
                                    </div>

                                    <Button 
                                        className="mb-6" 
                                        onClick={() => handleUpgrade(plan.planId, plan.action)}
                                        disabled={upgradeLoading === plan.planId}
                                    >
                                        {upgradeLoading === plan.planId ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            plan.buttonLabel || 'Upgrade'
                                        )}
                                    </Button>

                                    <div className="space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <Check className="text-primary h-5 w-5 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="lg:hidden mb-8">
                        {isLoading ? (
                            <div className="space-y-4">
                                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                <TabContentSkeleton />
                            </div>
                        ) : activePlans.length > 0 ? (
                            <Tabs defaultValue={activePlans[0]?.id} value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid gap-2 mb-6" style={{ gridTemplateColumns: `repeat(${activePlans.length}, 1fr)` }}>
                                    {activePlans.map((plan) => (
                                        <TabsTrigger key={plan.id} value={plan.id} className="capitalize">
                                            {plan.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {activePlans.map((plan) => (
                                    <TabsContent key={plan.id} value={plan.id} className="border rounded-lg p-6">
                                        <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                                        <div className="mb-6">
                                            <span className="text-3xl font-bold">{plan.price}</span>
                                            {plan.id !== 'trial' && <span className="text-gray-500">/mo</span>}
                                            <p className="text-sm text-gray-500 mt-1">{plan.billedAs}</p>
                                        </div>

                                        <Button
                                            className="w-full mb-6"
                                            onClick={() => handleUpgrade(plan.planId, plan.action)}
                                            disabled={upgradeLoading === plan.planId}
                                        >
                                            {upgradeLoading === plan.planId ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                plan.buttonLabel || 'Upgrade'
                                            )}
                                        </Button>

                                        <div className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <Check className="text-primary h-5 w-5 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No plans available
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}