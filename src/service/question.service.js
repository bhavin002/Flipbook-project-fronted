import ApiClient from "@/utils/ApiClient"

export const createQuestionFormApi = async (data) => {
    const response = await ApiClient().post("/question-form/create", data);
    return response.data;
}

export const getQuestionFormApi = async (questionFormId) => {
    const response = await ApiClient().get(`/question-form/get/${questionFormId}`);
    return response.data;
}

export const getPublishedQuestionFormApi = async (questionFormId) => {
    const response = await ApiClient().get(`/question-form/get/publish/${questionFormId}`);
    return response.data;
}

export const updateQuestionFormApi = async (questionFormId, data) => {
    const response = await ApiClient().put(`/question-form/update/${questionFormId}`, data);
    return response.data;
}

export const duplicateQuestionFormApi = async (questionFormId) => {
    const response = await ApiClient().get(`/question-form/duplicate/${questionFormId}`);
    return response.data;
}