import ApiClient from "@/utils/ApiClient"

export const ProductImageUploadApi = async (data) => {
    const response = await ApiClient().post("/product-image/upload", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const AddProductApi = async (data) => {
    const response = await ApiClient().post("/product/create", data);
    return response.data;
}