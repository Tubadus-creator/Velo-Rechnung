
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Supplier, Invoice, Quote, Reminder, CollectionCase } from '../types';
import { MOCK_INVOICES, MOCK_QUOTES, MOCK_REMINDERS, MOCK_COLLECTIONS } from '../constants'; // Keeping some mocks as fallbacks if API is empty
import { api } from '../services/api';
import { useAuth } from './AuthContext';

// Extended Types for internal use
export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  unit: string;
  type: 'service' | 'product';
}

export interface Document {
  id: number;
  name: string;
  date: string;
  size: string;
  category: string;
}

interface DataContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;

  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Promise<void>;
  deleteSupplier: (id: number) => Promise<void>;

  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;

  documents: Document[];
  addDocument: (doc: Omit<Document, 'id'>) => void;
  deleteDocument: (id: number) => void;

  invoices: Invoice[];
  quotes: Quote[];
  reminders: Reminder[];
  collections: CollectionCase[];
  
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Initialize states
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES); // Fallback to mock for now
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);
  const [collections, setCollections] = useState<CollectionCase[]>(MOCK_COLLECTIONS);
  
  // Local state for items without endpoints yet
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Webdesign Pauschale', desc: 'Erstellung einer Landing Page', price: 1500.00, unit: 'Psch', type: 'service' },
    { id: 2, name: 'Wartungsvertrag Basic', desc: 'Monatliche Updates & Backup', price: 49.00, unit: 'Monat', type: 'service' },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Tankbeleg Shell.pdf', date: '2024-05-20', size: '1.2 MB', category: 'Reisekosten' },
  ]);

  const fetchData = async () => {
    if (!isAuthenticated) return;
    
    try {
      const [fetchedCustomers, fetchedSuppliers, fetchedInvoices] = await Promise.all([
        api.customers.list().catch(err => { console.warn(err); return []; }),
        api.suppliers.list().catch(err => { console.warn(err); return []; }),
        api.invoices.list().catch(err => { console.warn(err); return []; }),
      ]);

      // If API returns array, use it. Otherwise keep empty/mock.
      if (Array.isArray(fetchedCustomers)) setCustomers(fetchedCustomers);
      if (Array.isArray(fetchedSuppliers)) setSuppliers(fetchedSuppliers);
      if (Array.isArray(fetchedInvoices) && fetchedInvoices.length > 0) setInvoices(fetchedInvoices);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  // Actions
  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    try {
      // Optimistic update
      const tempId = Math.random().toString(36).substr(2, 9);
      const newCustomer = { ...customer, id: tempId };
      setCustomers(prev => [...prev, newCustomer]);

      await api.customers.create(customer);
      await fetchData(); // Refresh to get real ID
    } catch (e) {
      console.error(e);
      alert("Fehler beim Erstellen des Kunden");
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
        setCustomers(prev => prev.filter(c => c.id !== id));
        await api.customers.delete(id);
    } catch(e) {
        console.error(e);
        fetchData(); // Revert on error
    }
  };

  const addSupplier = async (supplier: Omit<Supplier, 'id'>) => {
    try {
        const tempId = Date.now();
        setSuppliers(prev => [...prev, { ...supplier, id: tempId }]);
        await api.suppliers.create(supplier);
        await fetchData();
    } catch (e) {
        console.error(e);
    }
  };

  const deleteSupplier = async (id: number) => {
    try {
        setSuppliers(prev => prev.filter(s => s.id !== id));
        await api.suppliers.delete(id);
    } catch(e) {
        console.error(e);
    }
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addDocument = (doc: Omit<Document, 'id'>) => {
    const newDoc = { ...doc, id: Date.now() };
    setDocuments([newDoc, ...documents]);
  };

  const deleteDocument = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <DataContext.Provider value={{
      customers, addCustomer, deleteCustomer,
      suppliers, addSupplier, deleteSupplier,
      products, addProduct, deleteProduct,
      documents, addDocument, deleteDocument,
      invoices, quotes, reminders, collections,
      refreshData: fetchData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
