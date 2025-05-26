import ApiClient from "@/utils/ApiClient"

export const GetActivityLogFilterApi = async () => {
    const response = await ApiClient().get("/workspace-activity-log/get-log-filter");
    return response.data;
}

export const GetActivityLogApi = async (data) => {
    const { activityType, from, to, userId, page, perPage } = data;
    const response = await ApiClient().get(`/workspace-activity-log/get?activityType=${activityType}&from=${from}&to=${to}&userId=${userId}&page=${page}&perPage=${perPage}`);
    return response.data;
}