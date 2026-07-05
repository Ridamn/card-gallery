import type { Card as CardType } from "../../types/card";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

type Props = {
  card: CardType;
  editable?: boolean;
  onEdit?: (card: CardType) => void;
  onDelete?: (id: number) => void;
};

function Card({
  card,
  editable = false,
  onEdit,
  onDelete,
}: Props) {
  const { user } = useAuth();

  const isOwner = user?.id === card.user_id;
  const createdAt = formatDistanceToNow(
    new Date(card.created_at),
    {
      addSuffix: true,
    }
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-[460px]">
      <div className="w-full h-52 overflow-hidden bg-gray-100">
        <img
          src={card.image_url || "/placeholder.png"}
          alt={card.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="self-start bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {card.category?.name ?? "Uncategorized"}
        </span>

        <h2 className="text-2xl font-bold mt-4">
          {card.name}
        </h2>

        <p className="text-gray-600 mt-3 leading-relaxed line-clamp-3 flex-1">
          {card.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
          <FiClock size={14} />
          <span>{createdAt}</span>
        </div>

        {editable && isOwner && (
          <div className="flex gap-3 mt-auto pt-6">
            <button
              onClick={() => onEdit?.(card)}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition"
            >
              <FaRegEdit />
              Edit
            </button>

            <button
              onClick={() => onDelete?.(card.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
            >
              <MdOutlineDelete />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
