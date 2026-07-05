import { useState } from "react";
import { toast } from "react-hot-toast";

import CardGrid from "../components/cards/CardGrid";
import CardModal from "../components/cards/CardModal";
import StatsCard from "../components/dashboard/StatsCard";
import CardSkeletonGrid from "../components/ui/CardSkeletonGrid";

import { useCards } from "../hooks/useCards";
import { useAuth } from "../hooks/useAuth";
import type { Card } from "../types/card";

function Dashboard() {
  const { cards, loading, deleteCard } = useCards();
  const { user } = useAuth();

  const myCards = cards.filter(
    (card) => card.user_id === user?.id
  );

  const totalCards = myCards.length;

  const totalCategories = new Set(
    myCards
      .filter((card) => card.category)
      .map((card) => card.category!.id)
  ).size;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  function handleAdd() {
    setEditingCard(null);
    setIsModalOpen(true);
  }

  function handleEdit(card: Card) {
    setEditingCard(card);
    setIsModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this card?")) return;

    const { error } = await deleteCard(id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Card deleted successfully!");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My Cards
          </h1>

          <p className="text-gray-500 mt-2">
            Create, organize and manage your personal card collection.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-sm transition"
        >
          + Add Card
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <StatsCard
          title="Total Cards"
          value={totalCards}
        />

        <StatsCard
          title="Categories"
          value={totalCategories}
        />
      </div>

      {/* Cards */}
      {loading ? (
        <CardSkeletonGrid />
      ) : (
        <CardGrid
          cards={myCards}
          editable
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyTitle="You haven't created any cards yet."
          emptyDescription="Click + Add Card to create your first one."
        />
      )}

      {/* Modal */}
      <CardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        card={editingCard}
      />
    </div>
  );
}

export default Dashboard;
