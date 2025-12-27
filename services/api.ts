
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

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      return res.json();
    },
    register: async (data: any) => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Registration failed');
      return res.json();
    },
  },
  customers: {
    list: async () => {
      const res = await fetch(`${BASE_URL}/customers`, { headers: getHeaders() });
      return res.ok ? res.json() : [];
    },
    create: async (data: any) => {
      const res = await fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return res.json();
    },
    delete: async (id: string) => {
      await fetch(`${BASE_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },
  suppliers: {
    list: async () => {
      const res = await fetch(`${BASE_URL}/suppliers`, { headers: getHeaders() });
      return res.ok ? res.json() : [];
    },
    create: async (data: any) => {
      const res = await fetch(`${BASE_URL}/suppliers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return res.json();
    },
    delete: async (id: number | string) => {
      await fetch(`${BASE_URL}/suppliers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },
  invoices: {
    list: async () => {
      const res = await fetch(`${BASE_URL}/invoices`, { headers: getHeaders() });
      return res.ok ? res.json() : [];
    },
    create: async (data: any) => {
      const res = await fetch(`${BASE_URL}/invoices`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return res.json();
    },
  },
  audit: {
    list: async () => {
      const res = await fetch(`${BASE_URL}/audit-logs`, { headers: getHeaders() });
      return res.ok ? res.json() : [];
    }
  },
  dsgvo: {
    export: async () => {
      const res = await fetch(`${BASE_URL}/dsgvo/export`, { 
        method: 'POST',
        headers: getHeaders() 
      });
      return res.json();
    },
    deleteAccount: async () => {
      const res = await fetch(`${BASE_URL}/dsgvo/delete`, { 
        method: 'POST',
        headers: getHeaders() 
      });
      return res.json();
    }
  }
};
