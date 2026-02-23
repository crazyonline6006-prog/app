import testData from './testData.json';

export type ProductVariant = {
  variant_id: number;
  variant_name: string;
  price: number;
  quantity: number;
};

export type Product = {
  product_id: number;
  product_name: string;
  description: string;
  product_image: string;
  price_min: number;
  price_max: number;
  variants: ProductVariant[];
  thc_percent: number;
  cat_name: string;
  brand: string;
};

export type Category = {
  category_id: number;
  category_name: string;
  category_description?: string;
  products?: Product[];
  children?: Category[];
};

export const getStoreData = (): Category[] => {
  return testData.data as Category[];
};

export const getAllProducts = (): Product[] => {
  const allProducts: Product[] = [];

  const extractProducts = (categories: Category[]) => {
    for (const cat of categories) {
      if (cat.products && cat.products.length > 0) {
        allProducts.push(...cat.products);
      }
      if (cat.children && cat.children.length > 0) {
        extractProducts(cat.children);
      }
    }
  };

  extractProducts(getStoreData());
  return allProducts;
};
