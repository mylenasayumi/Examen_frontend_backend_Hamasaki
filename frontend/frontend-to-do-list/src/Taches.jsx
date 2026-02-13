// Taches.jsx : Composant pour afficher des tâches
import React, { useState } from "react";
import tachesService from "./api/TachesService";

function Taches({ tache, setListeTaches, categories }) {
    const [loading, setLoading] = useState(false);

    // Trouver le nom de la catégorie à partir de son ID
    const nomCategorie = categories.find(c => c.id === tache.category)?.name || "Toutes les catégories";

    // toggleTache : bascule l'état d'une tâche lorsqu'elle est cochée ou décochée.
    const toggleTache = async () => {
        try {
            setLoading(true);
            const tacheModifiee = await tachesService.updateTache(tache.id, {
                is_completed: !tache.is_completed // true -> false, false -> true
            });

            // Mise à jour de l'état de la tâche
            setListeTaches((listePrec) =>
                listePrec.map((t) => (t.id === tache.id ? tacheModifiee : t))
            );
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la tâche:", err);
            alert("Erreur lors de la mise à jour de la tâche.");
        } finally {
            setLoading(false);
        }
    };

    // Supprime une tâche de la liste de tâches
    const handleSupprimeTache = async () => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
            return;
        }

        try {
            setLoading(true);
            await tachesService.deleteTache(tache.id);
            setListeTaches((listePrec) => listePrec.filter((t) => t.id !== tache.id));
        } catch (err) {
            console.error("Erreur lors de la suppression de la tâche:", err);
            alert("Erreur lors de la suppression de la tâche.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tache" style={{ opacity: loading ? 0.5 : 1 }}>
            {/* Checkbox tâche */}
            <input
                type="checkbox"
                checked={tache.is_completed || false}
                onChange={toggleTache}
                disabled={loading}
            />

            {/* Label tâche */}
            <label
                style={{
                    textDecoration: tache.is_completed ? "line-through" : "none",
                    color: tache.is_completed ? "#999999" : "#000000",
                }}
            >
                {tache.description} (
                <span style={{ fontStyle: "italic" }}>{nomCategorie}</span>)
            </label>

            {/* Bouton Supprimer tâche */}
            <button
                onClick={handleSupprimeTache}
                className="bouton-supprimer"
                disabled={loading}
            >
                {loading ? "..." : "Supprimer"}
            </button>
        </div>
    );
}

export default Taches;