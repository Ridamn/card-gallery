import Card from "./Card";
import type { Card as CardType } from "../../types/card";

type Props = {
  cards: CardType[];
  editable?: boolean;
  onEdit?: (card: CardType) => void;
  onDelete?: (id: number) => void;

  emptyTitle?: string;
  emptyDescription?: string;
};

function CardGrid({
  cards,
  editable = false,
  onEdit,
  onDelete,
  emptyTitle = "No cards found",
  emptyDescription = "Try changing your search or category filter.",
}: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-600">
          {emptyTitle}
          <br />
        </h2>
        <p className="text-gray-500 mt-2">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          editable={editable}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CardGrid;
