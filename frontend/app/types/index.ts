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

export interface Address {
  street: string;
  city: string;
  zipcode: string;
}

export interface MenuItem {
  name: string;
  price: number;
  available: boolean;
}

export interface Category {
  name: string;
  items: MenuItem[];
}

export interface Menu {
  lastUpdate?: Date;
  categories: Category[];
}

export type ReservationStatus = "confirmed" | "cancelled";

export interface Reservation {
  _id?: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
}

export interface Restaurant {
  _id?: string;
  name: string;
  borough: string;
  cuisine: string;
  capacity: number;
  address: Address;
  menu?: Menu;
  reservations?: Reservation[];
}
