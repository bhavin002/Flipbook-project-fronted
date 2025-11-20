import ApiClient from "@/utils/ApiClient"

export const quizAttemptApi = async (data) => {
    const response = await ApiClient().post("/quiz-attempt/create", data);
    return response.data;
}

export const getQuizAttemptApi = async (quizAttemptId) => {
    const response = await ApiClient().get(`/quiz-attempt/get/attempt/${quizAttemptId}`);
    return response.data;
}

export const getQuizByIdApi = async (quizId) => {
    const response = await ApiClient().get(`/quiz-attempt/get-quiz-by-quiz-id/${quizId}`);
    return response.data;
}

export const getPublishedQuizByIdApi = async (quizId) => {
    const response = await ApiClient().get(`/quiz-attempt/get-quiz-by-quiz-id/publish/${quizId}`);
    return response.data;
}

export const getQuizByFlipbookId = async (flipbookId) => {
    const response = await ApiClient().get(`/quiz/dropdown/${flipbookId}`);
    return response.data;
}

export const getQuizSummaryApi = async (quizId) => {
    const response = await ApiClient().get(`/quiz/get-stats/${quizId}`);
    return response.data;
}

export const getQuizRespondentApi = async (quizId) => {
    const response = await ApiClient().get(`/quiz-attempt/dropdown/${quizId}`);
    return response.data;
}
