// NouvelleCategorie.jsx : Le composant fonctionnel crée une nouvelle catégorie de tache
import React, { useState } from "react";
import categoriesService from "./api/CategoriesService";

function NouvelleCategorie({ categories, setCategories }) {
    const [nouvelleCategorie, setNouvelleCategorie] = useState("");
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState("");

    // Fonction de gestion de l'événement qui ajoute une nouvelle catégorie à une liste
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErreur("");

        if (!nouvelleCategorie.trim()) {
            setErreur("Le nom de la catégorie ne peut pas être vide.");
            return;
        }

        // Vérifier si la catégorie existe déjà localement
        const categoriesFiltrees = categories.filter(c => c.name !== "Toutes les catégories");
        if (categoriesFiltrees.some(c => c.name === nouvelleCategorie.trim())) {
            setErreur("Cette catégorie existe déjà.");
            return;
        }

        try {
            setLoading(true);
            const categorieCree = await categoriesService.createCategorie({
                name: nouvelleCategorie.trim()
            });

            // Ajouter la nouvelle catégorie à la liste
            setCategories(prev => {
                const toutesCategories = prev.find(c => c.id === 0 || c.name === "Toutes les catégories");
                const categoriesSansToutes = prev.filter(c => c.id !== 0 && c.name !== "Toutes les catégories");
                return [
                    toutesCategories,
                    ...categoriesSansToutes,
                    categorieCree
                ];
            });

            // Réinitialise le champ
            setNouvelleCategorie("");
        } catch (err) {
            if (err.response?.data) {
                // Extraire les erreurs de validation du backend
                const erreurs = err.response.data;
                if (erreurs.name) {
                    setErreur(Array.isArray(erreurs.name) ? erreurs.name[0] : erreurs.name);
                } else {
                    setErreur("Erreur lors de la création de la catégorie.");
                }
            } else {
                setErreur("Erreur de connexion au serveur.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-nouvelle-categorie">
            {/* Gestion de la soumission du form */}
            <form onSubmit={handleSubmit}>
                <div style={{ flex: 1 }}>
                    <input
                        type="text"
                        name="nouvelle-categorie"
                        id="nouvelle-categorie"
                        className="nouvelle-categorie"
                        placeholder="Nouvelle catégorie"
                        value={nouvelleCategorie}
                        onChange={(e) => setNouvelleCategorie(e.target.value)}
                        disabled={loading}
                    />
                    {erreur && (
                        <div style={{
                            color: "red",
                            fontSize: "12px",
                            marginTop: "4px",
                            marginBottom: "4px"
                        }}>
                            {erreur}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bouton-categorie"
                    disabled={loading}
                >
                    {loading ? "Ajout..." : "Ajouter catégorie"}
                </button>
            </form>
        </div>
    );
}

export default NouvelleCategorie;