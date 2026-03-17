import { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Golden Teacher Spore Print",
    description: "High-quality spore print on heavy-duty foil. Perfect for microscopy and research purposes.",
    price: 25.0,
    image: "https://images.unsplash.com/photo-1594950195709-a14f66c242d7?q=80&w=800&auto=format&fit=crop",
    category: "spores",
    metadata: { strain: "Golden Teacher", format: "Foil Print", microscopy_only: true },
  },
  {
    id: "2",
    name: "Blue Oyster Liquid Culture",
    description: "Vibrant live culture syringe of Pleurotus ostreatus. Ready to inoculate your favorite substrate.",
    price: 30.0,
    image: "https://images.unsplash.com/photo-1528659556633-8a9d18b2890e?q=80&w=800&auto=format&fit=crop",
    category: "cultures",
    metadata: { strain: "Blue Oyster", medium: "Liquid Culture", volume: "10ml" },
  },
  {
    id: "3",
    name: "Sterilized Millet Substrate Bag",
    description: "3lb bag of hydrated and sterilized millet with a self-healing injection port and 0.2 micron filter patch.",
    price: 35.0,
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    category: "substrates",
    metadata: { weight_lbs: 3, grain: "Millet", sterilized: true },
  },
];
