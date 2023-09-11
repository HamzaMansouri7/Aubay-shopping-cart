export interface CartItem {
  id?: string;
  amount: number;
  product: Product;
  subtotal?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  type?: string;
  imgUrl?: string;
}
