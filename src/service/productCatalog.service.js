import ApiClient from "@/utils/ApiClient"

export const FieldMappingApi = async () => {
    const response = await ApiClient().get("/product-catalog/field-mappings");
    return response.data;
}