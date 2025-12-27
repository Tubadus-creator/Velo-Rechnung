
const BASE_URL = "https://n8n.velo-automation.de/webhook";

// Helper for headers (can be extended to include Auth Tokens if your n8n flow requires it)
const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('velo_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Safe request wrapper
const request = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
             throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }
        
        // Handle cases where n8n returns just text or empty body
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await res.json();
        } else {
            // If text is returned, wrap it in a structure or return null if empty
            const text = await res.text();
            return text ? { message: text } : {};
        }
    } catch (e) {
        console.error("API Request Failed:", e);
        throw e;
    }
};

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      return request(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    },
    register: async (data: any) => {
      return request(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
  },
  customers: {
    list: async () => request(`${BASE_URL}/customers`, { headers: getHeaders() }),
    create: async (data: any) => request(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }),
    delete: async (id: string) => request(`${BASE_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      }),
  },
  suppliers: {
    list: async () => request(`${BASE_URL}/suppliers`, { headers: getHeaders() }),
    create: async (data: any) => request(`${BASE_URL}/suppliers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }),
    delete: async (id: number | string) => request(`${BASE_URL}/suppliers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      }),
  },
  invoices: {
    list: async () => request(`${BASE_URL}/invoices`, { headers: getHeaders() }),
    create: async (data: any) => request(`${BASE_URL}/invoices`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }),
  },
  audit: {
    list: async () => request(`${BASE_URL}/audit-logs`, { headers: getHeaders() }),
  },
  dsgvo: {
    export: async () => request(`${BASE_URL}/dsgvo/export`, { 
        method: 'POST',
        headers: getHeaders() 
      }),
    deleteAccount: async () => request(`${BASE_URL}/dsgvo/delete`, { 
        method: 'POST',
        headers: getHeaders() 
      }),
  }
};
