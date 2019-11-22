export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface CartState {
  items: Product[];
  total: number;
}

export interface UserState {
  loading: boolean;
  users: User[]
}
