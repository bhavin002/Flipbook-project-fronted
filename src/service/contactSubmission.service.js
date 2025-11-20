import ApiClient from "@/utils/ApiClient";

export const ContactSubmissionApi = async (data) => {
    const response = await ApiClient().post("/contact-submission/create", data);
    return response.data;
}

export const getContactFormsApi = async (flipbookId) => {
    const response = await ApiClient().get(`/contact-submission/dropdown/${flipbookId}`);
    return response.data;
}

export const getContactSubmissionsApi = async (contactFormId) => {
    const response = await ApiClient().get(`/contact-submission/get-by-form-id/${contactFormId}`);
    return response.data;
}

export const getContactSubmissionByIdApi = async (contactSubmissionId) => {
    const response = await ApiClient().get(`/contact-submission/get/submission/${contactSubmissionId}`);
    return response.data;
}