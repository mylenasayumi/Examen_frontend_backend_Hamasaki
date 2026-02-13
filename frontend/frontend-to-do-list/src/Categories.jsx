// Categories.jsx : Le composant fonctionnel affiche toutes les options catégories des tâches
import React from "react";

function Categories({ categories, setCatSelectionnee, valeurSelectionnee, afficherToutesCategories = false }) {
    return (
        <div className="div-categories">
            <select
                className="categories"
                value={valeurSelectionnee}
                onChange={(e) => setCatSelectionnee(e.target.value)}
            >
                {afficherToutesCategories && (
                    <option key="toutes" value="">Toutes les catégories</option>
                )}
                {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                        {categorie.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Categories;