// Types pour le frontend Next.js

export interface ResponseApi<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  timestamp: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
}

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface Reservation {
  _id?: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status?: string;
}

export interface Restaurant {
  _id?: string;
  resto_id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  menu?: MenuItem[];
  reservations?: Reservation[];
}
