export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "spores" | "cultures" | "substrates";
  metadata: {
    strain?: string;
    format?: string;
    weight_lbs?: number;
    medium?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
