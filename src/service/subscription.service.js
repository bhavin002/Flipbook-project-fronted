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

export const reactiveSubscription = async () => {
    const response = await ApiClient().get(`/stripe/reactive-plan`);
    return response.data;
}

export const getCheckoutSessionInfo = async (sessionId) => {
    const response = await ApiClient().get(`/stripe/get-session-info/${sessionId}`, {
        showLoader: true
    });
    return response.data;
}