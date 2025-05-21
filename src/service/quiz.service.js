import ApiClient from "@/utils/ApiClient"

export const createQuizApi = async (data) => {
    const response = await ApiClient().post("/quiz/create", data);
    return response.data;
}

export const getQuizApi = async (quizId) => {
    const response = await ApiClient().get(`/quiz/get/${quizId}`);
    return response.data;
}
export const updateQuizApi = async (quizId, data) => {
    const response = await ApiClient().put(`/quiz/update/${quizId}`, data);
    return response.data;
}