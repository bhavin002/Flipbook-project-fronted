import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Crown, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cancelSubscription, createCheckoutSession, getAllPlans, reactiveSubscription } from '@/service/subscription.service';
import { toast } from 'sonner';
import { PlanCardSkeleton, TabContentSkeleton } from '@/utils/Skeleton';
import ConfirmationDialog from '@/utils/ConfirmationDialog';

// Get plan description based on plan name
const getPlanDescription = (planName) => {
    if (planName === 'Starter') {
        return 'Get started with digital publishing create and share flipbooks in minutes.';
    }
    if (planName === 'Growth') {
        return 'Unlock advanced tools to design, brand, and analyze your interactive flipbooks.';
    }
    if (planName === 'Pro') {
        return 'For teams and agencies that need unlimited publishing, branding, and control.';
    }
    return '';
};

// Static features mapping based on plan price
const getStaticFeatures = (planName, price) => {

    // Plan 2 - Basic Plan ($129)
    if (planName === 'Starter') {
        return [
            '100 Flipbooks',
            '5 Bookshelves',
            '100 Pages allowed per book',
            'Custom Domain',
            'Domain Restriction',
            'Send Email',
            'Advanced customization & design tools',
            'Analytics & engagement stats'
        ];
    }

    // Plan 3 - Professional Plan ($249)
    if (planName === 'Growth') {
        return [
            '200 Flipbooks',
            '20 Bookshelves',
            '200 Pages allowed per book',
            'Custom Domain',
            'Domain Restriction',
            'Send Email',
            'All interactive elements unlocked',
            'Advanced customization & design tools',
            'Private & password-protected sharing',
            'Embed flipbooks anywhere',
            'Analytics & engagement stats',
            'Bookshelves & profile page',
            'Priority support'
        ];
    }

    // Plan 4 - Enterprise/Ultimate Plan ($399)
    if (planName === 'Pro') {
        return [
            '300 Flipbooks',
            '50 Bookshelves',
            '500 Pages allowed per book',
            'Teammate flow allow',
            'Custom Domain',
            'Domain Restriction',
            'Send Email',
            'All interactive elements unlocked',
            'Advanced customization & design tools',
            'Private & password-protected sharing',
            'Embed flipbooks anywhere',
            'Analytics & engagement stats',
            'Team collaboration',
            'Bookshelves & profile page',
            'Priority support'
        ];
    }

    // Default features if plan doesn't match
    return [
        'Custom Domain',
        'Domain Restriction',
        'Send Email',
        'Advanced customization & design tools'
    ];
};

export default function SubscriptionPlans({ showReactivationBanner = true }) {
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [activeTab, setActiveTab] = useState("starter");
    const [upgradeLoading, setUpgradeLoading] = useState(null);
    const [reactivatingPlan, setReactivatingPlan] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        planId: null,
        action: null
    });

    useEffect(() => {
        const getPlans = async () => {
            try {
                setIsLoading(true);
                const plansData = await getAllPlans();
                setPlans(plansData.data.plans || []);
                setCurrentSubscription(plansData.data.currentSubscription || null);
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
        if (!plans.length) return [];

        // Filter only LTD plans
        const ltdPlans = plans.filter(plan => plan.isLTDPlan === true);
        
        if (!ltdPlans.length) return [];

        // Sort by sequence and process LTD plans
        const sortedPlans = [...ltdPlans].sort((a, b) => a.sequence - b.sequence);

        const processedPlans = sortedPlans.map(plan => {
            const planId = plan.name.toLowerCase().replace(/\s+/g, '-');
            // Use static features instead of backend features
            const staticFeatures = getStaticFeatures(plan.name, plan.rate);
            const description = getPlanDescription(plan.name);
            return {
                id: planId,
                title: plan.name,
                price: `$${plan.rate}`,
                description: description,
                features: staticFeatures,
                planId: plan._id,
                buttonLabel: plan.buttonLabel,
                action: plan.action,
                isCurrentPlan: plan.isCurrentPlan,
                sequence: plan.sequence
            };
        });

        return processedPlans;
    };

    const getCurrentPlanName = () => {
        const currentPlan = plans.find(plan => plan.isCurrentPlan);
        return currentPlan ? currentPlan.name : 'Professional Monthly';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleReactivePlan = async () => {
        try {
            setReactivatingPlan(true);
            const response = await reactiveSubscription();
            if (!response.data.isRequiredToCheckout) {
                toast.success("Lifetime Deal reactivated", {
                    description: response.data.message || "Your lifetime deal has been reactivated."
                });
                const plansData = await getAllPlans();
                setPlans(plansData.data.plans || []);
                setCurrentSubscription(plansData.data.currentSubscription || null);
            } else {
                const checkoutResponse = await createCheckoutSession(response.data.planId);
                if (checkoutResponse.data.checkoutUrl) {
                    window.open(checkoutResponse.data.checkoutUrl, '_blank');
                } else {
                    toast.error("Invalid checkout response", {
                        description: "No checkout URL received"
                    });
                }
            }
        } catch (error) {
            toast.error("Failed to reactivate plan", {
                description: error.message
            });
        } finally {
            setReactivatingPlan(false);
        }
    };

    const activePlans = processPlans();

    // Determine the recommended plan (center plan)
    const getRecommendedPlanIndex = () => {
        if (activePlans.length === 0) return -1;
        // For 3 plans, the middle one (index 1) is recommended
        // For other odd numbers, use the middle index
        if (activePlans.length % 2 === 1) {
            return Math.floor(activePlans.length / 2);
        }
        // For even numbers, prefer the second-to-last (e.g., for 4 plans, index 1)
        return Math.floor(activePlans.length / 2) - 1;
    };

    const recommendedPlanIndex = getRecommendedPlanIndex();
    const isRecommendedPlan = (index) => index === recommendedPlanIndex;

    useEffect(() => {
        if (activePlans.length > 0 && !activePlans.find(p => p.id === activeTab)) {
            setActiveTab(activePlans[0].id);
        }
    }, [activePlans, activeTab]);

    const handleUpgrade = async (planId, action) => {
        if (action === "cancel") {
            setConfirmDialog({
                open: true,
                planId,
                action
            });
            return;
        }

        await executeAction(planId, action);
    };

    const executeAction = async (planId, action) => {
        try {
            setUpgradeLoading(planId);
            if (action === "checkout") {
                const response = await createCheckoutSession(planId);
                if (response.data.checkoutUrl) {
                    window.open(response.data.checkoutUrl, '_blank');
                } else {
                    toast.error("Invalid checkout response", {
                        description: "No checkout URL received"
                    });
                }
            }
            if (action === "upgrade" || action === "downgrade") {
                if (window.$crisp) {
                    window.$crisp.push(["do", "chat:open"]);
                } else {
                    toast.error("Chat support not available", {
                        description: "Please contact support directly"
                    });
                }
            }
            if (action === "cancel") {
                const response = await cancelSubscription();
                toast.success("Lifetime Deal cancelled", {
                    description: response.data.message || "Your lifetime deal has been cancelled."
                });
                const plansData = await getAllPlans();
                setPlans(plansData.data.plans || []);
                setCurrentSubscription(plansData.data.currentSubscription || null);
            }
            if (action === "reactive") {
                const response = await reactiveSubscription();
                if (!response.data.isRequiredToCheckout) {
                    toast.success("Lifetime Deal reactivated", {
                        description: response.data.message || "Your lifetime deal has been reactivated."
                    });
                    const plansData = await getAllPlans();
                    setPlans(plansData.data.plans || []);
                    setCurrentSubscription(plansData.data.currentSubscription || null);
                } else {
                    const checkoutResponse = await createCheckoutSession(response.data.planId);
                    if (checkoutResponse.data.checkoutUrl) {
                        window.open(checkoutResponse.data.checkoutUrl, '_blank');
                    } else {
                        toast.error("Invalid checkout response", {
                            description: "No checkout URL received"
                        });
                    }
                }
            }
        } catch (error) {
            toast.error("Failed to upgrade", {
                description: error.message
            });
        } finally {
            setUpgradeLoading(null);
        }
    };

    const handleConfirmCancel = async () => {
        await executeAction(confirmDialog.planId, confirmDialog.action);
        setConfirmDialog({ open: false, planId: null, action: null });
    };

    const handleCancelDialog = () => {
        setConfirmDialog({ open: false, planId: null, action: null });
    };


    return (
        <>
            {showReactivationBanner && currentSubscription?.isCancelled && currentSubscription?.isActive && (new Date(currentSubscription?.endDate) > new Date()) && (
                <div className="border-violet-500 bg-violet-50/30 shadow-md border rounded-lg px-6 py-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <p className="font-semibold text-violet-800">
                                Your {getCurrentPlanName()} plan is scheduled for cancellation.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-600">
                                You still have access to all premium features until{' '}
                                <span className="font-medium text-violet-700">{formatDate(currentSubscription?.endDate)}</span>.
                                Want to continue enjoying these benefits?
                            </p>
                        </div>
                        <Button
                            onClick={handleReactivePlan}
                            disabled={reactivatingPlan}
                            size="sm"
                            className="bg-violet-600 hover:bg-violet-700 text-white flex-shrink-0"
                        >
                            {reactivatingPlan ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Reactivating...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reactivate Plan
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-8">
                {isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                        <PlanCardSkeleton key={index} />
                    ))
                ) : (
                    activePlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg p-8 flex flex-col h-full relative ${
                                plan.isCurrentPlan
                                    ? 'border-violet-500'
                                    : isRecommendedPlan(index)
                                    ? 'border-violet-500'
                                    : 'border-gray-200'
                            }`}
                        >
                            {plan.isCurrentPlan && (
                                <Badge
                                    className="absolute -top-3 right-4 bg-violet-600 text-white px-3 py-1 text-xs font-semibold shadow-sm"
                                >
                                    <Crown className="w-3 h-3 mr-1" />
                                    Current Plan
                                </Badge>
                            )}
                            {!plan.isCurrentPlan && isRecommendedPlan(index) && (
                                <Badge
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-3 py-1 text-xs font-semibold shadow-sm"
                                >
                                    Recommended
                                </Badge>
                            )}

                            <h3 className="text-2xl font-bold mb-3">{plan.title}</h3>
                            {plan.price && (
                                <div className="mb-3">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="ml-2 text-sm font-medium text-black">one time</span>
                                </div>
                            )}
                            {plan.description && (
                                <p className="text-gray-600 mb-6 text-base min-h-[72px]">{plan.description}</p>
                            )}

                            <Button
                                className="mb-2 text-base py-6"
                                onClick={() => handleUpgrade(plan.planId, plan.action)}
                                disabled={upgradeLoading === plan.planId || plan.action === "none"}
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
                            <p className="text-center text-gray-500 text-sm mb-8">Lifetime access</p>

                            {plan.features && plan.features.length > 0 && (
                                <ul className="text-[#64676C] ml-0 space-y-3 mb-4 list-none">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="text-[#7c3aed] h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                        <TabsList className="grid gap-2 mb-8" style={{ gridTemplateColumns: `repeat(${activePlans.length}, 1fr)` }}>
                            {activePlans.map((plan, index) => (
                                <TabsTrigger
                                    key={plan.id}
                                    value={plan.id}
                                    className={`capitalize relative text-base ${
                                        plan.isCurrentPlan ? 'data-[state=active]:bg-violet-600 data-[state=active]:text-white' : 
                                        isRecommendedPlan(index) ? 'data-[state=active]:bg-violet-600 data-[state=active]:text-white' : ''
                                    }`}
                                >
                                    {plan.title}
                                    {plan.isCurrentPlan && (
                                        <Crown className="w-3 h-3 ml-1" />
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {activePlans.map((plan, index) => (
                            <TabsContent
                                key={plan.id}
                                value={plan.id}
                                className={`border rounded-lg p-8 relative ${
                                    plan.isCurrentPlan
                                        ? 'border-violet-500'
                                        : isRecommendedPlan(index)
                                        ? 'border-violet-500'
                                        : 'border-gray-200'
                                }`}
                            >
                                {plan.isCurrentPlan && (
                                    <Badge
                                        variant="secondary"
                                        className="absolute -top-3 right-4 bg-violet-600 text-white px-3 py-1 text-xs font-semibold shadow-sm"
                                    >
                                        <Crown className="w-3 h-3 mr-1" />
                                        Current Plan
                                    </Badge>
                                )}
                                {!plan.isCurrentPlan && isRecommendedPlan(index) && (
                                    <Badge
                                        variant="secondary"
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-3 py-1 text-xs font-semibold shadow-sm"
                                    >
                                        Recommended
                                    </Badge>
                                )}

                                <h3 className="text-2xl font-bold mb-3">{plan.title}</h3>
                                {plan.price && (
                                    <div className="mb-3">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="ml-2 text-sm font-medium text-black">one time</span>
                                    </div>
                                )}
                                {plan.description && (
                                    <p className="text-gray-600 mb-6 text-base min-h-[72px]">{plan.description}</p>
                                )}

                                <Button
                                    className="w-full mb-2 text-base py-6"
                                    onClick={() => handleUpgrade(plan.planId, plan.action)}
                                    disabled={upgradeLoading === plan.planId || plan.action === "none"}
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
                                <p className="text-center text-gray-500 text-sm mb-8">Lifetime access</p>

                                {plan.features && plan.features.length > 0 && (
                                    <ul className="text-[#64676C] ml-0 space-y-3 mb-4 list-none">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="text-[#7c3aed] h-5 w-5 mt-0.5 flex-shrink-0" />
                                                <span className="text-base">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No plans available
                    </div>
                )}
            </div>

            <ConfirmationDialog
                isConfirmModalOpen={confirmDialog.open}
                setIsConfirmModalOpen={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
                title="Cancel Lifetime Deal"
                description="Are you sure you want to cancel your lifetime deal?"
                onConfirm={handleConfirmCancel}
                onCancel={handleCancelDialog}
                isLoading={upgradeLoading === confirmDialog.planId}
            />
        </>
    );
}