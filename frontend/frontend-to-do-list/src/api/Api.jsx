import axios from "axios";

const API_BASE_URL = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur pour gérer les erreurs globalement
API_BASE_URL.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Le serveur a répondu avec un code d'erreur
            console.error('Erreur API:', error.response.data);
        } else if (error.request) {
            // La requête a été envoyée mais aucune réponse n'a été reçue
            console.error('Aucune réponse du serveur');
        } else {
            console.error('Erreur:', error.message);
        }
        return Promise.reject(error);
    }
);

export default API_BASE_URL;