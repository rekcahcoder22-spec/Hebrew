export interface Product {
  id: string;
  name: string;
  rating?: number;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  sizes: Size[];
  stockStatus: StockStatus;
  stock: Record<string, number>;
  tags: string[];
  featured: boolean;
  isNew: boolean;
  content?: {
    overview?: {
      primary?: { en?: string; vi?: string };
      secondary?: { en?: string; vi?: string };
    };
    specs?: {
      material?: { en?: string; vi?: string };
      fit?: { en?: string; vi?: string };
      securePrint?: { en?: string; vi?: string };
      origin?: { en?: string; vi?: string };
    };
  };
  createdAt: string;
  updatedAt: string;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type StockStatus =
  | "in-stock"
  | "low-stock"
  | "sold-out"
  | "coming-soon";

export interface CartItem {
  productId: string;
  size: Size;
  quantity: number;
  product: Product;
}

export interface BrandSettings {
  dropDate: string;
  dropTitle: string;
  heroTagline: string;
  announcement: string;
  instagramUrl: string;
  tiktokUrl: string;
  adminPassword: string;
}

export type CollectionProductFilterMode =
  | "featured"
  | "tag"
  | "category"
  | "ids"
  | "all";

export interface CollectionProductFilter {
  mode: CollectionProductFilterMode;
  tag?: string;
  category?: string;
  ids?: string[];
  limit?: number;
}

export interface CollectionLayout {
  columnsLg?: 2 | 4 | 5;
}

/** Stored in Mongo; used by admin / API */
export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  viewAllHref: string;
  isHome: boolean;
  active: boolean;
  order: number;
  productFilter: CollectionProductFilter;
  layout?: CollectionLayout;
  createdAt: string;
  updatedAt: string;
}

/** Public payload (no secrets) */
export type PublicCollection = Omit<Collection, never>;

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note?: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  district: string;
  ward: string;
  method: "standard" | "express" | "pickup";
}

export interface OrderItem {
  productId: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  shipping: ShippingInfo;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
  updatedAt?: string;
}
