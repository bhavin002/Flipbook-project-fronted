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

export const getProductApi = async (productId) => {
    const response = await ApiClient().get(`/product/get/${productId}`);
    return response.data;
}

export const getPublishedProductApi = async (productId) => {
    const response = await ApiClient().get(`/product/get/publish/${productId}`);
    return response.data;
}

export const updateProductApi = async (productId, data) => {
    const response = await ApiClient().put(`/product/update/${productId}`, data);
    return response.data;
}

export const duplicateProductApi = async (productId) => {
    const response = await ApiClient().get(`/product/duplicate/${productId}`);
    return response.data;
}

export const getProductCartInfoApi = async (ids) => {
    const response = await ApiClient().post(`/product/get-product-cart-info`, ids);
    return response.data;
}