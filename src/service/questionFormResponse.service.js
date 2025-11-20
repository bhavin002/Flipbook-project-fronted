import ApiClient from "@/utils/ApiClient"

export const CreateQuestionFormResponseApi = async (data) => {
    const response = await ApiClient().post("/question-form-response/create", data);
    return response.data;
}

export const getQuestionFormResponsesApi = async (flipbookId) => {
    const response = await ApiClient().get(`/question-form-response/dropdown/${flipbookId}`);
    return response.data;
}

export const getQuestionFormResponsesByFormIdApi = async (questionFormId) => {
    const response = await ApiClient().get(`/question-form-response/get-by-form-id/${questionFormId}`);
    return response.data;
}