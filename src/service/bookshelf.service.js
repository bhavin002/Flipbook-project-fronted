import ApiClient from "@/utils/ApiClient"

export const CreateBookShelfApi = async (data) => {
    const response = await ApiClient().post("/bookshelf/create", data);
    return response.data;
}

export const GetShelfFlipbookIdsApi = async (shelfId) => {
    const response = await ApiClient().get(`/bookshelf/get-flipbook-ids/${shelfId}`);
    return response.data;
}

export const UpdateBookShelfApi = async (bookshelfId,data) => {
    const response = await ApiClient().post(`/bookshelf/update/${bookshelfId}`, data);
    return response.data;
}