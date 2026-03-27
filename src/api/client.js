const BASE_URL = '/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('sajhagig_token');
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw error;
  }
  return res.json();
}

const api = {
  get: (url) => apiRequest(url),
  post: (url, data) => apiRequest(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => apiRequest(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url) => apiRequest(url, { method: 'DELETE' }),
};

export default api;
