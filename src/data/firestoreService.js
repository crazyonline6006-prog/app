import testData from './testData.json';
import { db } from '../config/firebase';
import { collection, doc, setDoc, getDocs, query } from 'firebase/firestore';

const CATEGORIES_COLLECTION = 'categories';

export const seedInitialData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
        if (!querySnapshot.empty) {
            console.log('Database already seeded. Skipping.');
            return;
        }
        console.log('Seeding initial data to Firestore...');
        const dataToSeed = testData.data;
        for (const category of dataToSeed) {
            const docRef = doc(db, CATEGORIES_COLLECTION, category.category_id.toString());
            await setDoc(docRef, category);
            console.log(`Seeded category: ${category.category_name}`);
        }
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

export const getStoreData = async () => {
    try {
        const q = query(collection(db, CATEGORIES_COLLECTION));
        const querySnapshot = await getDocs(q);
        const categories = [];
        querySnapshot.forEach((docSnap) => {
            categories.push(docSnap.data());
        });
        return categories;
    } catch (error) {
        console.error('Error fetching store data:', error);
        return testData.data;
    }
};

export const getAllProducts = async () => {
    const categories = await getStoreData();
    const allProducts = [];
    const extractProducts = (cats) => {
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
