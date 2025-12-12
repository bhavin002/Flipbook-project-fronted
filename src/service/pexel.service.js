import ApiClient from "@/utils/ApiClient"

export const GetPexelsImages = async (query, page = 1) => {
    const response = await ApiClient().get(`/pexels/photos?query=${query}&page=${page}`);
    return response.data;
}

export const GetPexelsVideos = async (query, page = 1) => {
    const response = await ApiClient().get(`/pexels/videos?query=${query}&page=${page}`);
    return response.data;
}