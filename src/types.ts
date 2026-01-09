  export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  
  export type CartItem = {
    product: Product;
    quantity: number;
  };
  
  export type Role = "admin" | "staff" | "viewer";
  
  export type InventoryItem = {
    id: string;
    name: string;
    stock: number;
  };
  