import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropDownCom from '@/components/AppLayoutComponents/ProfileDropDownCom';
import SubscriptionPlans from '@/utils/subscriptionPlans';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Crown, Lock, Shield, Info } from 'lucide-react';

export default function ExpireAccount() {
    const navigate = useNavigate();
    const { permissions } = useAuth();
    console.log("permissions ???", permissions);

    // If the user does not have billing permission (e.g., teammate), show an information page
    if (!permissions?.billing) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
                {/* Subtle animated orbs for depth (mirrors private profile vibe) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse" />
                </div>

                <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                        <div className="cursor-pointer" onClick={() => navigate('/myflipbooks')}>
                            <img src="/assets/logo.png" width={200} />
                        </div>
                        <div className="flex md:gap-6 gap-2 items-center">
                            <ProfileDropDownCom />
                        </div>
                    </div>
                </header>

                <main className="flex-1 md:mt-[64px] max-md:mt-[156px] max-md:mb-[80px] flex items-center justify-center p-4">
                    <div className="relative z-10 w-full max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-8 md:p-10 bg-gradient-to-r from-violet-50 to-violet-100">
                                <div className="flex items-center gap-3">
                                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 shadow">
                                        <Crown className="w-6 h-6 text-white relative z-10" />
                                        <Shield className="absolute -top-1 -right-1 w-4 h-4 text-purple-200" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Workspace needs an upgrade</h1>
                                        <p className="text-slate-600">Your free trial has ended. Only the workspace owner can upgrade.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base md:text-lg font-semibold text-slate-900">Billing access is restricted</p>
                                        <p className="text-slate-600">
                                            You are signed in as a teammate without billing permissions. Upgrading the plan, viewing invoices, or managing subscriptions can only be done by the workspace owner.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base md:text-lg font-semibold text-slate-900">What you can do</p>
                                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                                            <li>Contact the workspace owner to upgrade the plan.</li>
                                            <li>Once upgraded, access will be restored automatically.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <div className="absolute top-10 left-10 w-8 h-8 bg-purple-200 rounded-full opacity-30 animate-ping" />
                <div className="absolute bottom-10 right-10 w-6 h-6 bg-purple-200 rounded-full opacity-30 animate-ping" />
                <div className="absolute top-1/3 right-20 w-4 h-4 bg-purple-300 rounded-full opacity-40 animate-bounce" />
                <div className="absolute bottom-1/3 left-20 w-5 h-5 bg-purple-300 rounded-full opacity-40 animate-bounce" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                    <div className="cursor-pointer" onClick={() => {
                        navigate("/myflipbooks")
                    }}>
                        <img src="/assets/logo.png" width={200} />
                    </div>
                    <div className="flex md:gap-6 gap-2 items-center">
                        <ProfileDropDownCom />
                    </div>
                </div>
            </header>
            <div className="flex-1 max-md:flex md:mt-[64px] max-md:mt-[156px] max-md:mb-[80px] overflow-y-auto">
                <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-4">
                    <SubscriptionPlans showReactivationBanner={true} />
                </div>
            </div>
        </div>
    );
}