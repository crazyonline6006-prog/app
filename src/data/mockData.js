import testData from './testData.json';

export const getStoreData = () => {
    return testData.data;
};

export const getAllProducts = () => {
    const allProducts = [];
    const extractProducts = (categories) => {
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
