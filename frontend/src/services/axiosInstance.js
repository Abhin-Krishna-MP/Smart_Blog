import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: false,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')

    const isPublic = config.method === 'get' &&
      config.url.startsWith('blogs/') &&
      !config.url.includes('myblogs')

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('token/refresh/')
    ) {
      originalRequest._retry = true
      console.log("⏳ Refreshing token...")

      try {
        const refresh = localStorage.getItem('refresh')
        const tokenResponse = await axios.post('http://localhost:8000/api/refresh/', {
          refresh: refresh,
        })

        const newAccess = tokenResponse.data.access
        localStorage.setItem('access', newAccess)

        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return instance(originalRequest)

      } catch (refreshError) {
        console.error('🔴 Refresh failed. Logging out.')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default instance
