// services/apiService.ts

export function useApi() {
  const fetch = (url: string, options?: object) => {
    return useFetch<any>(url, {
      ...options,
      onRequest({ request, options }) {
        // Handle request start
      },
      onResponse({ request, response }) {
        // Handle response
        return response._data
      },
      onError({ error }) {
        // Handle error
        console.error(error)
      },
    })
  }

  const getUser = (id: string) => {
    return fetch(`/api/users/${id}`, { method: 'GET' })
  }

  const createUser = (userData: object) => {
    return fetch('/api/users', { method: 'POST', body: userData })
  }

  const updateUser = (id: string, userData: object) => {
    return fetch(`/api/users/${id}`, { method: 'PUT', body: userData })
  }

  const deleteUser = (id: string) => {
    return fetch(`/api/users/${id}`, { method: 'DELETE' })
  }

  return {
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }
}
