import testData from './testData.json';
import { db } from '../config/firebase';
import { collection, doc, setDoc, getDocs, query } from 'firebase/firestore';

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

// --- Firestore Integration ---

const CATEGORIES_COLLECTION = 'categories';

/**
 * Seeds the Firestore database if it is empty.
 * In a real app, this would be an admin-only function or backend script.
 */
export const seedInitialData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));

        // If we already have categories, don't overwrite
        if (!querySnapshot.empty) {
            console.log('Database already seeded. Skipping.');
            return;
        }

        console.log('Seeding initial data to Firestore...');
        const dataToSeed = testData.data as Category[];

        for (const category of dataToSeed) {
            // Use category_id as the document ID for simplicity
            const docRef = doc(db, CATEGORIES_COLLECTION, category.category_id.toString());
            await setDoc(docRef, category);
            console.log(`Seeded category: ${category.category_name}`);
        }
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

/**
 * Fetches all categories (including nested products) from Firestore.
 */
export const getStoreData = async (): Promise<Category[]> => {
    try {
        const q = query(collection(db, CATEGORIES_COLLECTION));
        const querySnapshot = await getDocs(q);

        const categories: Category[] = [];
        querySnapshot.forEach((docSnap) => {
            categories.push(docSnap.data() as Category);
        });

        return categories;
    } catch (error) {
        console.error('Error fetching store data:', error);
        // Fallback to local data if Firestore fails
        return testData.data as Category[];
    }
};

/**
 * Extracts all unique products from the nested category structure.
 */
export const getAllProducts = async (): Promise<Product[]> => {
    const categories = await getStoreData();
    const allProducts: Product[] = [];

    const extractProducts = (cats: Category[]) => {
        for (const cat of cats) {
            if (cat.products && cat.products.length > 0) {
                allProducts.push(...cat.products);
            }
            if (cat.children && cat.children.length > 0) {
                extractProducts(cat.children);
            }
        }
    };

    extractProducts(categories);
    return allProducts;
};
