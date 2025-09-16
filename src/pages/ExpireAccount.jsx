import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropDownCom from '@/components/AppLayoutComponents/ProfileDropDownCom';
import SubscriptionPlans from '@/utils/subscriptionPlans';

export default function ExpireAccount() {
    const navigate = useNavigate();

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