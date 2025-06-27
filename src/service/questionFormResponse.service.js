import ApiClient from "@/utils/ApiClient"

export const CreateQuestionFormResponseApi = async (data) => {
    const response = await ApiClient().post("/question-form-response/create", data);
    return response.data;
}
