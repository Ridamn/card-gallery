import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";

import { useCards } from "../../hooks/useCards";
import type { Category } from "../../types/category";
import CategoryAutocomplete from "./CategoryAutocomplete";
import type { Card } from "../../types/card";
import ImageUpload from "./ImageUpload";
import { useAuth } from "../../hooks/useAuth";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onClose: () => void;
  card?: Card | null;
};

function CardModal({ isOpen, onClose, card }: Props) {
  const { addCard, updateCard } = useCards();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    if (card) {
      setName(card.name);
      setDescription(card.description);
      setImageUrl(card.image_url ?? "");

      
      if (card.category) {
        setCategory(card.category);
      } else {
        setCategory(null);
      }
    } else {
      setName("");
      setDescription("");
      setImageUrl("");
      setCategory(null);
    }
  }, [isOpen, card]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !description || !category) {
      toast.error("Please fill all required fields.");
      return;
    }

    const payload = {
      name,
      description,
      image_url: imageUrl,
      category_id: category.id,
      user_id: user!.id,
    };

    const { error } = card
      ? await updateCard(card.id, payload)
      : await addCard(payload);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      card ? "Card updated successfully!" : "Card added successfully!"
    );

    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={card ? "Edit Card" : "Add Card"}
      className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto mt-24 p-6"
      overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center p-4 overflow-y-auto"
    >
      <h2 className="text-2xl font-bold mb-6">
        {card ? "Edit Card" : "Add Card"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Card Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded-lg p-3"
        />

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
        />

        <CategoryAutocomplete
          value={category}
          onChange={setCategory}
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {card ? "Update Card" : "Save Card"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CardModal;
