import ApiClient from "@/utils/ApiClient"

export const FieldMappingApi = async () => {
    const response = await ApiClient().get("/product-catalog/field-mappings");
    return response.data;
}

export const UploadCsvApi = async (formData) => {
    const response = await ApiClient().post("/product-catalog/upload", formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const GetTemplateFieldsApi = async (formData) => {
    const response = await ApiClient().post("/product-catalog/upload", formData);
    return response.data;
}

export const CheckFileApi = async (data) => {
    const response = await ApiClient().post("/product-catalog/check-file", data);
    return response.data;
}