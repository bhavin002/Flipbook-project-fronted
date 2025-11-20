import ApiClient from "@/utils/ApiClient"

export const updateBookShelfPreviewSetting = async (bookshelfId, data) => {
    const response = await ApiClient().post(`/bookshelf-preview-setting/update/${bookshelfId}`, data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const getBookShelfPreviewSetting = async (bookshelfId, loader = false) => {
    const response = await ApiClient().get(`bookshelf-preview-setting/get/${bookshelfId}`, {
        showLoader: loader
    });
    return response.data;
}
    