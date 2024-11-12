"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

const UpgradeSuccess = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const upgradeUserPlan = useMutation(api.user.userUpgrade);

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        const verifyAndUpgrade = async () => {
            if (sessionId) {
                try {
                    const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
                    const data = await response.json();
                    if (data.success) {
                        const userEmail = data.userEmail
                        await upgradeUserPlan({ userEmail });
                        toast("Plan Upgradation Successful");
                        setTimeout(() => router.push('/dashboard'), 1000);
                    } else {
                        toast("Payment verification failed.");
                    }
                } catch (error) {
                    console.error("Error during payment verification:", error);
                    toast("An error occurred during payment verification.");
                }
            }
        };

        verifyAndUpgrade();
    }, []);

    return (
        <div>
            <h2>Processing your upgrade, You will be redirected soon...</h2>
        </div>
    );
};

export default UpgradeSuccess;
