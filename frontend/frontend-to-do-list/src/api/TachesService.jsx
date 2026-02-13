import API_BASE_URL from "./Api";

export const tachesService = {
    // Récupérer toutes les tâches
    getTaches: async () => {
        const response = await API_BASE_URL.get('/tasks/');
        return response.data;
    },

    // Créer une nouvelle tâche
    createTache: async (tacheData) => {
        const response = await API_BASE_URL.post('/tasks/', tacheData);
        return response.data;
    },

    // Mettre à jour une tâche (terminée/non terminée)
    updateTache: async (id, tacheData) => {
        const response = await API_BASE_URL.patch(`/tasks/${id}/`, tacheData);
        return response.data;
    },

    // Supprimer une tâche
    deleteTache: async (id) => {
        const response = await API_BASE_URL.delete(`/tasks/${id}/`);
        return response.data;
    },
};

export default tachesService;