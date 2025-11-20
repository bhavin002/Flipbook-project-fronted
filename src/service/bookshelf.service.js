import ApiClient from "@/utils/ApiClient"

export const CreateBookShelfApi = async (data) => {
    const response = await ApiClient().post("/bookshelf/create", data, {
        showLoader: true
    });
    return response.data;
}

export const GetShelfFlipbookIdsApi = async (shelfId) => {
    const response = await ApiClient().get(`/bookshelf/get-flipbook-ids/${shelfId}`, {
        showLoader: true
    });
    return response.data;
}

export const UpdateBookShelfApi = async (bookshelfId, data) => {
    const response = await ApiClient().post(`/bookshelf/update/${bookshelfId}`, data);
    return response.data;
}

export const GetShelfPreview = async (shelfId, loader = false) => {
    const response = await ApiClient().get(`/bookshelf/get-flipbook-preview/${shelfId}`, {
        showLoader: loader
    });
    return response.data;
}
