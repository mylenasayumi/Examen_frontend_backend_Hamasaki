// NouvelleTache.jsx : Composant fonctionnel qui ajout une nouvelle tache
import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import tachesService from "./api/TachesService";

function NouvelleTache({ setListeTaches, categories }) {
    const [nouvelleTache, setNouvelleTache] = useState("");
    const [catSelectionnee, setCatSelectionnee] = useState("");
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState("");

    // Initialiser avec la première catégorie valide
    useEffect(() => {
        // Vérifier que categories existe et n'est pas vide
        if (!categories || categories.length === 0) return;

        const categoriesValides = categories.filter(c => c.name !== "Toutes les catégories");

        if (categoriesValides.length > 0 && !catSelectionnee) {
            setCatSelectionnee(categoriesValides[0].id.toString());
        }
    }, [categories, catSelectionnee]);

    // Fonction de gestion de l'événement qui ajoute une nouvelle tâche à une liste
    const handleAjoutTache = async () => {
        setErreur("");

        if (!nouvelleTache.trim()) {
            setErreur("Le nom de la tâche ne peut pas être vide.");
            return;
        }

        if (!catSelectionnee) {
            setErreur("Veuillez sélectionner une catégorie valide.");
            return;
        }

        try {
            setLoading(true);
            
            const categoryId = parseInt(catSelectionnee);

            const tacheCree = await tachesService.createTache({
                description: nouvelleTache.trim(),
                category: categoryId, // Associe la tâche à la catégorie sélectionnée/ Envoyer l'ID numérique
                is_completed: false
            });

            setListeTaches((tachesPrec) => [...tachesPrec, tacheCree]);
            // Réinitialise le champ
            setNouvelleTache("");
        } catch (err) {
            if (err.response?.data) {
                // Extraire les erreurs de validation du backend
                const erreurs = err.response.data;
                if (erreurs.category) {
                    setErreur(Array.isArray(erreurs.category) ? erreurs.category[0] : erreurs.category);
                } else if (erreurs.description) {
                    setErreur(Array.isArray(erreurs.description) ? erreurs.description[0] : erreurs.description);
                } else {
                    setErreur("Erreur lors de la création de la tâche.");
                }
            } else {
                setErreur("Erreur de connexion au serveur.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Filtrer "Toutes les catégories" pour l'ajout de tâche
    const categoriesPourAjout = categories?.filter(c => c.name !== "Toutes les catégories") || [];

    return (
        <div>
            <div className="nouvelle-tache">
                <input
                    type="text"
                    value={nouvelleTache}
                    onChange={(e) => setNouvelleTache(e.target.value)}
                    placeholder="Nouvelle tâche"
                    disabled={loading}
                />

                <Categories
                    categories={categoriesPourAjout}
                    setCatSelectionnee={setCatSelectionnee}
                    valeurSelectionnee={catSelectionnee}
                />

                <button
                    onClick={handleAjoutTache}
                    className="bouton-ajout-tache"
                    disabled={loading || categoriesPourAjout.length === 0}
                >
                    {loading ? "Ajout..." : "Ajouter"}
                </button>
            </div>
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
    );
}

export default NouvelleTache;