import API_BASE_URL from "./Api";

export const categoriesService = {
    // Récupérer toutes les catégories
    getCategories: async () => {
        const response = await API_BASE_URL.get('/categories/');
        return response.data;
    },

    // Créer une nouvelle catégorie
    createCategorie: async (categorieData) => {
        const response = await API_BASE_URL.post('/categories/', categorieData);
        return response.data;
    },
};

export default categoriesService;