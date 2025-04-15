export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface OrderData {
    id?: string;
    userId: string;
    items: OrderItem[];
    total: number;
    createdAt: Date;
  }
  