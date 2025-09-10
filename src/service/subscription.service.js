import ApiClient from "@/utils/ApiClient"

export const getAllPlans = async () => {
    const response = await ApiClient().get(`/subscription-plan/get`);
    return response.data;
}

export const createCheckoutSession = async (planId) => {
    const response = await ApiClient().get(`/stripe/create-checkout-session/${planId}`);
    return response.data;
}

export const updateSubscriptionPlan = async (planId) => {
    const response = await ApiClient().get(`/stripe/update-plan/${planId}`);
    return response.data;
}

export const cancelSubscription = async () => {
    const response = await ApiClient().get(`/stripe/cancel-plan`);
    return response.data;
}

export const renewSubscription = async () => {
    const response = await ApiClient().get(`/stripe/renew-plan`);
    return response.data;
}