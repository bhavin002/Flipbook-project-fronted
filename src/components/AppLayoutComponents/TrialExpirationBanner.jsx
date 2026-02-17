import { useNavigate } from 'react-router-dom';
import { useTrialExpiration } from '@/hooks/useTrialExpiration';
import { Clock } from 'lucide-react';

export default function TrialExpirationBanner({ hasSearch = false }) {
    const navigate = useNavigate();
    const { daysToExpire, shouldShowBanner } = useTrialExpiration();

    if (!shouldShowBanner) {
        return null;
    }

    const handleUpgradeClick = () => {
        navigate('/settings/billing/lifetime-deal');
    };

    const topClass = hasSearch ? "top-[116px] md:top-16" : "top-16";

    return (
        <div className={`fixed ${topClass} left-0 right-0 z-[20] w-full bg-[#FFE082] shadow-sm h-10`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-3 md:px-6 h-full text-center">
                <div className="flex items-center gap-2 text-black">
                    <Clock className="h-4 w-4 mt-0.5" />
                    <p className="text-sm sm:text-base font-light">
                        Free trial ends in{' '}
                        <span>{daysToExpire} {daysToExpire === 1 ? 'day' : 'days'}</span>.
                        <span className="hidden sm:inline">
                            {' '}Continue using Flipdrag without interruption.{' '}
                        </span>
                        <button
                            onClick={handleUpgradeClick}
                            className="underline"
                        >
                            Upgrade now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

