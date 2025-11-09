import ApiClient from '@/utils/ApiClient'

export const GetPageLayoutsApi = async () => {
  const response = await ApiClient().get('/page-layout/get', {
    showLoader: true
  })
  return response.data
}

export const CreateFlipbookApi = async data => {
  const response = await ApiClient().post('/flipbook/create', data)
  return response.data
}

export const CreateTemplateApi = async data => {
  const response = await ApiClient().post('/flipbook/create-template', data)
  return response.data
}

export const GetFlipbookApi = async (flipbookId, loader = true) => {
  const response = await ApiClient().get(`/flipbook/get/${flipbookId}`, {
    showLoader: loader
  })
  return response.data
}

export const UpdateFlipbookApi = async (flipbookId, data) => {
  const response = await ApiClient().post(
    `/flipbook/rename-flipbook/${flipbookId}`,
    data
  )
  return response.data
}

export const UpdateFlipbookPageDataApi = async (flipbookId, data) => {
  const response = await ApiClient().put(`/flipbook/edit/${flipbookId}`, data)
  return response.data
}

export const GetFlipbooksApi = async data => {
  const response = await ApiClient().post('/flipbook/get-flipbook', data)
  return response.data
}

export const SaveFlipbookAsTemplateApi = async (
  flipbookId,
  name,
  description
) => {
  const response = await ApiClient().get(
    `/flipbook/save-as-template/${flipbookId}?name=${name}&description=${description}`
  )
  return response.data
}

export const MakeCopyOfFlipbookApi = async flipbookId => {
  const response = await ApiClient().get(
    `/flipbook/copy-flipbook/${flipbookId}`
  )
  return response.data
}

export const MoveToTrashFlipbookApi = async data => {
  const response = await ApiClient().post(`/flipbook/move-to-trash`, data)
  return response.data
}

export const getTrashedFlipbooksApi = async () => {
  const response = await ApiClient().get(`/flipbook/get-trash-flipbook`)
  return response.data
}

export const DeleteFlipbookApi = async data => {
  const response = await ApiClient().post(`/flipbook/delete`, data)
  return response.data
}

export const RecoverFlipbookApi = async data => {
  const response = await ApiClient().post(
    `/flipbook/recover-trash-flipbook`,
    data
  )
  return response.data
}

export const MoveToWorkspaceApi = async data => {
  const response = await ApiClient().post('/flipbook/move-to-workspace', data)
  return response.data
}

export const UploadPdfApi = async data => {
  const response = await ApiClient().post(
    '/flipbook/upload-multi-pdf-image',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const UploadFilesNewApi = async formData => {
  const response = await ApiClient().post(
    '/file-upload/files',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
  return response.data // ✅ not response.data
}

export const GenerateFlipbookApi = async data => {
  const response = await ApiClient().post('/file-upload/generate', data)
  return response.data
}

// SSE Progress stream
export const subscribeToUploadProgress = (sessionId, onMessage, onError) => {
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') // remove trailing slash if any

  const eventSource = new EventSource(
    `${baseUrl}/file-upload/progress/${sessionId}`,
    { withCredentials: true } // optional if backend uses cookies
  )

  eventSource.onmessage = e => {
    try {
      const data = JSON.parse(e.data)
      onMessage?.(data)
    } catch (err) {
      console.warn('SSE parse error', err)
    }
  }

  eventSource.onerror = e => {
    console.error('SSE error', e)
    eventSource.close()
    onError?.(e)
  }

  return eventSource
}

export const GetThumbnailApi = async flipbookId => {
  const response = await ApiClient().get(`/flipbook/thumbnail/${flipbookId}`)
  return response.data
}

export const DomainRestrictionApi = async (flipbookId, data) => {
  const response = await ApiClient().post(
    `/flipbook/domain-restriction/${flipbookId}`,
    data
  )
  return response.data
}

export const GetDomainRestrictionApi = async flipbookId => {
  const response = await ApiClient().get(
    `/flipbook/get-domain-restriction/${flipbookId}`
  )
  return response.data
}
