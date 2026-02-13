// GestionnaireToDoList.jsx : La section est un gestionnaire de to-do list
import React, { useState, useEffect } from "react";
import NouvelleCategorie from "./NouvelleCategorie";
import NouvelleTache from "./NouvelleTache";
import Taches from "./Taches";
import Categories from "./Categories";
import categoriesService from "./api/CategoriesService";
import tachesService from "./api/TachesService";

function GestionnaireToDoList() {
    const [categories, setCategories] = useState([]);
    const [listeTaches, setListeTaches] = useState([]);
    const [catSelectionnee, setCatSelectionnee] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les données au montage du composant
    useEffect(() => {
        const chargerDonnees = async () => {
            try {
                setLoading(true);
                setError(null);

                const [categoriesData, tachesData] = await Promise.all([
                    categoriesService.getCategories(),
                    tachesService.getTaches()
                ]);

                // Mettre à jour les catégories en gardant "Toutes les catégories" en premier
                const toutesLesCategories = [
                    { id: 0, name: "Toutes les catégories" },
                    ...categoriesData
                ];
                setCategories(toutesLesCategories);
                setCatSelectionnee(""); // Valeur vide pour "Toutes les catégories"
                setListeTaches(tachesData);
            } catch (err) {
                setError("Erreur lors du chargement des données. Veuillez réessayer.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        chargerDonnees();
    }, []);

    // Filtrer les tâches selon la catégorie sélectionnée (comparaison par ID)
    const tachesFiltrees = catSelectionnee === "" || catSelectionnee === "0"
        ? listeTaches
        : listeTaches.filter((tache) => tache.category === parseInt(catSelectionnee));

    if (loading) {
        return (
            <section>
                <h1>Ma To-Do List par Catégories</h1>
                <p style={{ textAlign: "center" }}>Chargement...</p>
            </section>
        );
    }

    return (
        <section>
            <h1>Ma To-Do List par Catégories</h1>

            {error && (
                <div style={{
                    padding: "10px",
                    backgroundColor: "#ffdfd4",
                    color: "red",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    textAlign: "center"
                }}>
                    {error}
                </div>
            )}

            <div className="gestionnaire-categories">
                <NouvelleCategorie
                    categories={categories}
                    setCategories={setCategories}
                />

                <Categories
                    categories={categories}
                    setCatSelectionnee={setCatSelectionnee}
                    valeurSelectionnee={catSelectionnee}
                    afficherToutesCategories={true}
                />
            </div>

            <div className="gestionnaire-taches">
                <NouvelleTache
                    setListeTaches={setListeTaches}
                    categories={categories}
                />

                {tachesFiltrees.length > 0 ? (
                    tachesFiltrees.map((tache) => (
                        <Taches
                            key={tache.id}
                            tache={tache}
                            setListeTaches={setListeTaches}
                            categories={categories}
                        />
                    ))
                ) : (
                    <p>Aucune tâche à afficher.</p>
                )}
            </div>
        </section>
    );
}

export default GestionnaireToDoList;