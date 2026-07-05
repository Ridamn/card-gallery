import CardSkeleton from "./CardSkeleton";

function CardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export default CardSkeletonGrid;
